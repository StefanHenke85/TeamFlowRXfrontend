import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as THREE from "three";
import Room3D from "../components/Room3D";
import WebcamCapture from "../components/WebcamCapture";
import DebugConsole from "../components/DebugConsole";
import FirebaseMultiplayerService from "../services/firebaseMultiplayerService";
import { ThreeMaterialProvider, useThreeMaterial } from "../context/ThreeMaterialContext";
import "./RoomPage.css";

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room3DRef = useRef(null);
  const headMeshRef = useRef(null);

  const [userId] = useState(() => {
    // Erzeuge oder hole userID
    let id = localStorage.getItem("userId");
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userId", id);
    }
    return id;
  });

  const [userName, setUserName] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [multiplayerService, setMultiplayerService] = useState(null);

  // Multiplayer Service initialisieren
  useEffect(() => {
    if (isReady) {
      const service = new FirebaseMultiplayerService(roomId, userId, userName);
      service.addPlayer(userId, userName, true); // Registriere lokalen Spieler
      setMultiplayerService(service);

      return () => {
        service.removePlayer(userId);
        service.dispose();
      };
    }
  }, [isReady, roomId, userId, userName]);

  useEffect(() => {
    // Nur Auto-Login wenn in der gleichen Session (userName State wurde nicht geleert)
    // Aber nicht wenn man gerade erst die Seite lädt
    // Der User sollte beim Betreten des Raums immer nach seinem Namen gefragt werden
    // es sei denn, er will den gespeicherten Namen verwenden
  }, []);

  const handleStartRoom = () => {
    if (userName.trim()) {
      localStorage.setItem("userName", userName);
      setIsReady(true);
    }
  };

  const handleLeaveRoom = () => {
    navigate("/rooms");
  };

  const handleWebcamToggle = () => {
    setWebcamEnabled(!webcamEnabled);
  };

  // Update head mesh reference wenn WebcamCapture Frames sendet
  useEffect(() => {
    if (webcamEnabled && room3DRef.current) {
      // Die headMeshRef wird von Room3D gepflegt, wir brauchen nur einen Weg, das zu aktualisieren
      console.log("🎥 Webcam enabled - ready to receive frames");
    }
  }, [webcamEnabled]);

  const handleMicToggle = () => {
    setMicEnabled(!micEnabled);
  };

  const handleScreenShareToggle = (centralCubeMaterial) => {
    return async () => {
      // TODO: Screenshare Feature - WebGL Texture Immutability Problem needs fixing
      alert("⚠️ Screenshare wird noch entwickelt - bitte konzentrieren Sie sich auf WASD und Webcam");
      console.log("⏳ Screenshare Feature wird noch entwickelt");
    };
  };

  if (!isReady) {
    return (
      <div className="room-setup-container">
        <div className="setup-card">
          <h1>Bereit zum Betreten?</h1>
          <div className="form-group">
            <label>Dein Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Gib deinen Namen ein..."
              maxLength={30}
              onKeyPress={(e) => e.key === "Enter" && handleStartRoom()}
            />
          </div>

          <div className="device-settings">
            <div className="device-toggle">
              <input
                type="checkbox"
                id="webcam"
                checked={webcamEnabled}
                onChange={handleWebcamToggle}
              />
              <label htmlFor="webcam">Webcam aktivieren</label>
            </div>

            <div className="device-toggle">
              <input
                type="checkbox"
                id="mic"
                checked={micEnabled}
                onChange={handleMicToggle}
              />
              <label htmlFor="mic">Mikrofon aktivieren</label>
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={handleStartRoom}>
              Raum betreten
            </button>
            <button className="btn btn-secondary" onClick={handleLeaveRoom}>
              Zurück
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThreeMaterialProvider>
      <RoomPageContent
        roomId={roomId}
        userId={userId}
        userName={userName}
        webcamEnabled={webcamEnabled}
        multiplayerService={multiplayerService}
        screenShareEnabled={screenShareEnabled}
        handleWebcamToggle={handleWebcamToggle}
        handleMicToggle={handleMicToggle}
        handleScreenShareToggle={handleScreenShareToggle}
        handleLeaveRoom={handleLeaveRoom}
        micEnabled={micEnabled}
      />
    </ThreeMaterialProvider>
  );
};

const RoomPageContent = ({
  roomId,
  userId,
  userName,
  webcamEnabled,
  multiplayerService,
  screenShareEnabled,
  handleWebcamToggle,
  handleMicToggle,
  handleScreenShareToggle,
  handleLeaveRoom,
  micEnabled,
}) => {
  const { headMaterial, centralCubeMaterial } = useThreeMaterial();
  const webcamTextureRef = React.useRef(null);

  // Cleanup wenn Webcam ausgeschaltet wird
  React.useEffect(() => {
    if (!webcamEnabled) {
      if (webcamTextureRef.current) {
        webcamTextureRef.current.dispose();
        webcamTextureRef.current = null;
      }
      if (headMaterial) {
        headMaterial.map = null;
        headMaterial.needsUpdate = true;
      }
    }
  }, [webcamEnabled, headMaterial]);

  // Memoize die onCaptureFrame Callback damit sie nicht bei jedem Render neu erstellt wird
  const handleCaptureFrame = React.useCallback((canvas) => {
    // Update head mesh texture über Context
    if (headMaterial) {
      // Erstelle Texture nur einmal beim ersten Frame
      if (!webcamTextureRef.current) {
        // Verwende DataTexture statt CanvasTexture für besseres Update-Handling
        const canvas2D = document.createElement('canvas');
        canvas2D.width = 512;
        canvas2D.height = 512;

        const texture = new THREE.CanvasTexture(canvas2D);
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false; // Wichtig: Disable mipmaps für Canvas

        headMaterial.map = texture;
        headMaterial.emissive = new THREE.Color(0x000000);
        headMaterial.emissiveIntensity = 0;
        headMaterial.roughness = 0.6;
        headMaterial.metalness = 0;

        webcamTextureRef.current = texture;
        webcamTextureRef.current.internalCanvas = canvas2D;
        console.log("✅ Webcam texture erstellt");
      }

      // Update: Zeichne neues Bild auf die interne Canvas
      if (webcamTextureRef.current && webcamTextureRef.current.internalCanvas) {
        const internalCanvas = webcamTextureRef.current.internalCanvas;
        const ctx = internalCanvas.getContext('2d');

        // Zeichne Webcam-Canvas auf interne Canvas
        ctx.clearRect(0, 0, 512, 512);
        ctx.drawImage(canvas, 0, 0, 512, 512);

        // Wichtig: Texture nur updaten wenn wirklich nötig
        webcamTextureRef.current.needsUpdate = true;
        headMaterial.needsUpdate = true;
      }
    } else {
      console.warn("❌ headMaterial not available!");
    }
  }, [headMaterial]);

  return (
    <div className="room-page">
      <Room3D
        roomId={roomId}
        userId={userId}
        userName={userName}
        webcamEnabled={webcamEnabled}
        multiplayerService={multiplayerService}
      />

      <WebcamCapture
        enabled={webcamEnabled}
        onCaptureFrame={handleCaptureFrame}
      />

      {multiplayerService && (
        <DebugConsole
          multiplayerService={multiplayerService}
          userName={userName}
        />
      )}

      <div className="room-controls">
        <button
          className={`control-btn ${webcamEnabled ? "active" : ""}`}
          onClick={handleWebcamToggle}
          title="Webcam"
        >
          📷
        </button>
        <button
          className={`control-btn ${micEnabled ? "active" : ""}`}
          onClick={handleMicToggle}
          title="Mikrofon"
        >
          🎤
        </button>
        <button
          className={`control-btn ${screenShareEnabled ? "active" : ""}`}
          onClick={handleScreenShareToggle(centralCubeMaterial)}
          title="Bildschirm teilen"
        >
          🖥️
        </button>
        <button
          className="control-btn"
          onClick={handleLeaveRoom}
          title="Raum verlassen"
        >
          🚪
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
