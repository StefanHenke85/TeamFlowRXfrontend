/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThreeMaterial } from "../context/ThreeMaterialContext";
import "./Room3D.css";

const Room3D = ({ userId, userName, webcamEnabled = false, multiplayerService = null }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const avatarsRef = useRef(new Map()); // Map zur Verwaltung von Avataren
  const playerAvatarRef = useRef(null); // Avatar des aktuellen Spielers
  const keysRef = useRef({}); // Für Eingabe-Handling
  const [avatarCount, setAvatarCount] = useState(1); // Anzahl der Avatare im Raum
  const multiplayerRef = useRef(multiplayerService);
  const { setHeadMaterial, setCentralCubeMaterial } = useThreeMaterial();
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Update multiplayerRef wenn sich multiplayerService ändert
  useEffect(() => {
    console.log("🔗 Updating multiplayerRef with new service:", multiplayerService ? "present" : "null");
    multiplayerRef.current = multiplayerService;

    if (!multiplayerService || !sceneRef.current) {
      console.log("⏭️ Skipping service setup - scene or service not ready");
      return;
    }

    // Lade Remote-Spieler nach wenn Service aktualisiert wird
    const allPlayers = multiplayerService.getAllPlayers();
    console.log(`📥 Re-loading ${allPlayers.length} players after service update`);
    allPlayers.forEach((player) => {
      if (player.userId !== userId && !avatarsRef.current.has(player.userId)) {
        console.log(`👤 Creating avatar for player after service update: ${player.userName}`);
        const newAvatar = createAvatar(
          sceneRef.current,
          player.userId,
          player.userName,
          false,
          player.hasWebcam
        );
        newAvatar.position.copy({
          x: player.position.x,
          y: player.position.y,
          z: player.position.z,
        });
        avatarsRef.current.set(player.userId, newAvatar);
        setAvatarCount((prev) => prev + 1);
      }
    });

    // Subscribe zu Multiplayer Events
    const unsubscribe = multiplayerService.subscribe(({ type, data }) => {
      switch (type) {
        case "playerJoined":
          if (data.userId !== userId && !avatarsRef.current.has(data.userId)) {
            console.log(`🎮 New player joined: ${data.userName}`);
            const newAvatar = createAvatar(
              sceneRef.current,
              data.userId,
              data.userName,
              false,
              data.hasWebcam
            );
            newAvatar.position.copy({
              x: data.position.x,
              y: data.position.y,
              z: data.position.z,
            });
            avatarsRef.current.set(data.userId, newAvatar);
            setAvatarCount((prev) => prev + 1);
          }
          break;

        case "playerLeft": {
          const avatarToRemove = avatarsRef.current.get(data.userId);
          if (avatarToRemove) {
            console.log(`👋 Player left: ${data.userId}`);
            sceneRef.current.remove(avatarToRemove);
            avatarsRef.current.delete(data.userId);
            setAvatarCount((prev) => Math.max(1, prev - 1));
          }
          break;
        }

        case "playerMoved": {
          const movedAvatar = avatarsRef.current.get(data.userId);
          if (movedAvatar) {
            movedAvatar.position.copy({
              x: data.position.x,
              y: data.position.y,
              z: data.position.z,
            });
          }
          break;
        }

        case "playerRotated": {
          const rotatedAvatar = avatarsRef.current.get(data.userId);
          if (rotatedAvatar) {
            // Verwende Euler-Winkel mit korrekter Order
            const rotEuler = new THREE.Euler(data.rotation.x, data.rotation.y, data.rotation.z, "YXZ");
            rotatedAvatar.quaternion.setFromEuler(rotEuler);
          }
          break;
        }

        default:
          break;
      }
    });

    return unsubscribe;
  }, [multiplayerService, userId]);

  useEffect(() => {
    console.log("📍 Room3D useEffect called, mountRef.current:", mountRef.current);
    if (!mountRef.current) {
      console.log("❌ mountRef.current is null/undefined, returning early");
      return;
    }

    console.log("🎨 Room3D useEffect started - initializing Three.js scene");

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 500, 1000);
    console.log("✓ Scene created with background color");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 0); // First-person Augenhöhe
    camera.lookAt(0, 1.6, -1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    console.log("✓ WebGL Renderer created, size:", window.innerWidth, "x", window.innerHeight);
    console.log("✓ Canvas element appended to DOM:", renderer.domElement);
    console.log("✓ Mount element:", mountRef.current);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Speichere Scene auf dem DOM-Element damit RoomPage es finden kann
    mountRef.current.__three_scene = scene;

    // Canvas muss tabIndex haben damit er Fokus bekommen kann
    renderer.domElement.tabIndex = 0;
    renderer.domElement.focus();
    console.log("✓ Canvas focused and ready for input");

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 200;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -200;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Raum-Geometrie
    createRoom(scene);

    // Zentral Cube für Screen Sharing
    createCentralCube(scene, setCentralCubeMaterial);

    // Erstelle Avatar für aktuellen Spieler
    const playerAvatar = createAvatar(scene, userId, userName, true, webcamEnabled);
    avatarsRef.current.set(userId, playerAvatar);
    playerAvatarRef.current = playerAvatar;

    // WICHTIG: Den eigenen Body unsichtbar machen für First-Person View!
    if (playerAvatar.userData.body) {
      playerAvatar.userData.body.visible = false;
      console.warn("✅ v3.0 - ALL CRITICAL FIXES APPLIED: No duplicate listeners, Error handling, Firebase retry, Pointer lock fix");
    } else {
      console.warn("❌ ERROR: playerAvatar.userData.body ist undefined!");
    }

    setAvatarCount(1);

    // WICHTIG: Head Material sofort in Context speichern damit RoomPage es finden kann!
    if (playerAvatar.userData.headMaterial) {
      setHeadMaterial(playerAvatar.userData.headMaterial);
      console.log("✅ Head material set in Context immediately after avatar creation");
    }

    // Multiplayer handling is now in separate useEffect above

    // Input Handler - werden definiert nachdem renderer verfügbar ist
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Prüfe ob das eine von unseren Steuertasten ist
      if (['w', 'a', 's', 'd', 'shift', 'escape'].includes(key)) {
        keysRef.current[key] = true;
        console.log("🔽 Keydown:", key, "Current keys:", Object.entries(keysRef.current).filter(([, v]) => v === true).map(([k]) => k).join(", "));
        e.preventDefault(); // Prevent default browser behavior
        e.stopPropagation();
      }

      // ESC-Taste: Toggle Pointer Lock (nicht auf keydown registrieren, sondern separat)
      if (key === 'escape') {
        // Verhindere, dass ESC in keysRef gespeichert wird um Input-Spam zu verhindern
        keysRef.current['escape'] = false;

        if (document.pointerLockElement === renderer.domElement) {
          document.exitPointerLock();
          console.log("🔓 Pointer lock deaktiviert");
        } else {
          renderer.domElement.requestPointerLock().catch(err => {
            console.warn("⚠️ Pointer lock request denied:", err);
          });
          console.log("🔒 Pointer lock aktiviert");
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();

      if (['w', 'a', 's', 'd', 'shift', 'escape'].includes(key)) {
        keysRef.current[key] = false;
        console.log("🔼 Keyup:", key);
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleMouseMove = (e) => {
      if (document.pointerLockElement === renderer.domElement) {
        const deltaX = e.movementX;
        const deltaY = e.movementY;

        // Euler-Winkel für Kamera-Rotation
        const euler = new THREE.Euler(0, 0, 0, "YXZ");
        euler.setFromQuaternion(camera.quaternion);

        // Update Euler angles basierend auf Mausbewegung
        euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x - deltaY * 0.005));
        euler.y = euler.y - deltaX * 0.005;

        camera.quaternion.setFromEuler(euler);
      }

      // Speichere Maus-Position für Raycasting (normalisierte Koordinaten)
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleCanvasClick = () => {
      // Stelle sicher, dass Canvas den Focus hat
      renderer.domElement.focus();

      // Wenn pointer lock bereits aktiv ist, führe Raycasting aus um Avatar zu wählen
      if (document.pointerLockElement === renderer.domElement) {
        raycasterRef.current.setFromCamera(mouseRef.current, camera);

        // Sammle alle Avatare (als Bodies, da sie im Group sind)
        const avatarBodies = Array.from(avatarsRef.current.values()).map(avatar => avatar.children[0]); // Body ist erstes Child
        const intersects = raycasterRef.current.intersectObjects(avatarBodies);

        if (intersects.length > 0) {
          console.log("🎯 Avatar clicked:", intersects[0].object.parent.userData.userName);
        }
      } else {
        // Wenn pointer lock nicht aktiv, aktiviere es
        renderer.domElement.requestPointerLock =
          renderer.domElement.requestPointerLock ||
          renderer.domElement.mozRequestPointerLock;
        renderer.domElement.requestPointerLock();
        console.log("🔒 Pointer lock requested");
      }
    };

    // Attach key listeners NUR zu window (nicht document + window = Duplikate!)
    // Window Events propagieren zu document trotzdem
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("click", handleCanvasClick);

    // Animation Loop
    const clock = new THREE.Clock();
    const moveSpeed = 30; // Einheiten pro Sekunde
    const sprintSpeed = 50;

    const animate = () => {
      requestAnimationFrame(animate);

      try {
        const delta = clock.getDelta();

        // Bewegungseingabe verarbeiten - mit delta time für smooth movement
        const speed = keysRef.current["shift"] ? sprintSpeed : moveSpeed;
        const actualSpeed = speed * delta;

        // Berechne Bewegungsrichtung basierend auf Kamera-Rotation
        const moveVector = new THREE.Vector3();

        const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");

        const cameraRight = new THREE.Vector3();
        const cameraForward = new THREE.Vector3();

        cameraForward.x = Math.sin(euler.y);
        cameraForward.y = 0;
        cameraForward.z = Math.cos(euler.y);
        cameraForward.normalize();

        const up = new THREE.Vector3(0, 1, 0);
        cameraRight.crossVectors(cameraForward, up).normalize();

        const forward = cameraForward;
        const right = cameraRight;

        const keysPressed = {
          w: keysRef.current["w"] || false,
          s: keysRef.current["s"] || false,
          a: keysRef.current["a"] || false,
          d: keysRef.current["d"] || false,
        };

        if (keysPressed.w) {
          moveVector.add(forward.clone().multiplyScalar(actualSpeed));
        }
        if (keysPressed.s) {
          moveVector.add(forward.clone().multiplyScalar(-actualSpeed));
        }
        if (keysPressed.a) {
          moveVector.add(right.clone().multiplyScalar(-actualSpeed));
        }
        if (keysPressed.d) {
          moveVector.add(right.clone().multiplyScalar(actualSpeed));
        }

        // Avatar-Position aktualisieren
        playerAvatar.position.add(moveVector);

        // Avatar Rotation mit Kamera synchronisieren
        playerAvatar.quaternion.copy(camera.quaternion);

        // Extrahiere Euler-Winkel für Multiplayer-Sync
        const avatarEuler = new THREE.Euler().setFromQuaternion(playerAvatar.quaternion, "YXZ");

        // Sende Position und Rotation an Multiplayer Service
        if (multiplayerRef.current) {
          try {
            multiplayerRef.current.updatePlayerPosition(userId, {
              x: playerAvatar.position.x,
              y: playerAvatar.position.y,
              z: playerAvatar.position.z,
            });
            multiplayerRef.current.updatePlayerRotation(userId, {
              x: avatarEuler.x,
              y: avatarEuler.y,
              z: avatarEuler.z,
            });
          } catch (syncErr) {
            console.error("❌ Multiplayer sync error:", syncErr);
            // Bewegung funktioniert trotzdem, nur Sync fehlgeschlagen
          }
        }

        // Kamera folgt Avatar (First-Person)
        camera.position.copy(playerAvatar.position);
        camera.position.y = playerAvatar.position.y + 1.6;

        // Begrenzung des Raums
        const maxDist = 150;
        const dist = new THREE.Vector2(playerAvatar.position.x, playerAvatar.position.z).length();
        if (dist > maxDist) {
          const direction = new THREE.Vector2(playerAvatar.position.x, playerAvatar.position.z).normalize();
          playerAvatar.position.x = direction.x * maxDist;
          playerAvatar.position.z = direction.y * maxDist;
          camera.position.copy(playerAvatar.position);
          camera.position.y = playerAvatar.position.y + 1.6;
        }

        renderer.render(scene, camera);
      } catch (err) {
        console.error("❌ Animation loop error:", err);
        // Lösche schädliche Referenzen nicht um Loop weiterlaufen zu lassen
      }
    };

    animate();

    // Fenster-Größen-Anpassung
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Speichere mountRef um in cleanup zu nutzen
    const currentMount = mountRef.current;
    const currentRenderer = renderer;

    // Cleanup
    return () => {
      // Entferne Listener (nur window, nicht document!)
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      currentRenderer.domElement.removeEventListener("mousemove", handleMouseMove);
      currentRenderer.domElement.removeEventListener("click", handleCanvasClick);

      if (currentMount && currentRenderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(currentRenderer.domElement);
      }

      currentRenderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userName, setHeadMaterial, setCentralCubeMaterial]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="room-hud">
        <div className="avatar-count">
          Personen im Raum: {avatarCount}/15
        </div>
        <div className="controls-info">
          <p>W/A/S/D - Bewegen | Maus - Umschauen | Shift - Sprint | Click - Maus sperren | ESC - Maus freigeben | Avatar klicken - Info anzeigen</p>
        </div>
        <div className="user-info">
          <p>Du: {userName}</p>
        </div>
      </div>
    </div>
  );
};

// Hilfsfunktion: Raum-Geometrie erstellen
function createRoom(scene) {
  const floorGeometry = new THREE.PlaneGeometry(300, 300);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a4e,
    roughness: 0.7,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  floor.castShadow = false;
  scene.add(floor);
  console.log("✓ Floor added to scene");

  // Wände (einfache Box-Wände)
  const wallHeight = 100;
  const wallThickness = 1;
  const wallDistance = 150;

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a3a3a,
    roughness: 0.8,
  });

  // Nord und Süd Wände
  for (let z of [-wallDistance, wallDistance]) {
    const wallGeom = new THREE.BoxGeometry(wallDistance * 2, wallHeight, wallThickness);
    const wall = new THREE.Mesh(wallGeom, wallMaterial);
    wall.position.z = z;
    wall.position.y = wallHeight / 2;
    wall.receiveShadow = true;
    scene.add(wall);
  }

  // Ost und West Wände
  for (let x of [-wallDistance, wallDistance]) {
    const wallGeom = new THREE.BoxGeometry(wallThickness, wallHeight, wallDistance * 2);
    const wall = new THREE.Mesh(wallGeom, wallMaterial);
    wall.position.x = x;
    wall.position.y = wallHeight / 2;
    wall.receiveShadow = true;
    scene.add(wall);
  }
}

// Hilfsfunktion: Zentral Cube für Screen Sharing
function createCentralCube(scene, setCentralCubeMaterial) {
  console.log("🎁 Creating central cube");
  const cubeGeometry = new THREE.BoxGeometry(40, 40, 40);
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444,
    roughness: 0.5,
    metalness: 0.3,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0, 30, 0);
  cube.castShadow = true;
  cube.receiveShadow = true;

  // Placeholder-Text-Textur - 1024x1024 damit wir genug Platz für Updates haben
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, 1024, 1024);
  ctx.fillStyle = "#ffffff";
  ctx.font = "64px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Screen Share", 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  cubeMaterial.map = texture;
  cubeMaterial.needsUpdate = true;

  // Speichere Canvas damit RoomPage es aktualisieren kann statt neue Texture zu erstellen
  scene.userData.centralCubeCanvas = canvas;
  scene.userData.centralCubeTexture = texture;

  scene.add(cube);
  scene.userData.centralCube = cube;
  // Nutze Context statt window object
  setCentralCubeMaterial(cubeMaterial);
  console.log("✓ Cube added to scene");
}

// Hilfsfunktion: Avatar erstellen
function createAvatar(scene, userId, userName, isPlayer = false, hasWebcam = false) {
  console.log("👤 Creating avatar for:", userName, "- isPlayer:", isPlayer);
  const group = new THREE.Group();
  group.position.set(
    Math.random() * 80 - 40,
    1,
    Math.random() * 80 - 40
  );

  // Körper (Kapsel-ähnlich)
  const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.4, 8, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: isPlayer ? 0xff6b6b : 0x4ecdc4,
    roughness: 0.7,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.castShadow = true;
  body.receiveShadow = true;
  body.position.y = 0.7;
  group.add(body);

  // Kopf (Kugel) mit Webcam-Unterstützung
  const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);

  // Erstelle Canvas für initiale Textur
  const initialCanvas = document.createElement("canvas");
  initialCanvas.width = 512;
  initialCanvas.height = 512;
  const initialCtx = initialCanvas.getContext("2d");
  initialCtx.fillStyle = "#f4a460";
  initialCtx.fillRect(0, 0, 512, 512);
  initialCtx.fillStyle = "#000";
  initialCtx.font = "32px Arial";
  initialCtx.textAlign = "center";
  initialCtx.fillText(isPlayer && hasWebcam ? "📷 Webcam" : "👤 Head", 256, 256);

  const initialTexture = new THREE.CanvasTexture(initialCanvas);

  const headMaterial = new THREE.MeshStandardMaterial({
    map: initialTexture,
    roughness: 0.6,
    emissive: 0x000000,
    metalness: 0,
  });

  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.castShadow = true;
  head.receiveShadow = true;
  head.position.y = 1.8;
  group.add(head);

  // Namensetikette über dem Kopf
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, 256, 64);
  ctx.fillStyle = "#ffffff";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(userName, 128, 40);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const nameSprite = new THREE.Sprite(spriteMaterial);
  nameSprite.position.y = 2.5;
  nameSprite.scale.set(4, 1, 1);
  group.add(nameSprite);

  group.userData = {
    userId,
    userName,
    isPlayer,
    body,
    head,
    headMaterial,
    nameSprite,
  };

  scene.add(group);
  console.log("✓ Avatar added to scene - position:", group.position);
  return group;
}

export default Room3D;
