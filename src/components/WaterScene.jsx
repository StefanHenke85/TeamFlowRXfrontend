import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const WaterScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);  // Renderer auf die gesamte Bildschirmgröße anpassen
    mountRef.current.appendChild(renderer.domElement);

    // Licht hinzufügen
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Wasser-Geometrie als großer Kreis
    const waterGeometry = new THREE.CircleGeometry(320, 400);  // Größeren Kreis (320) und feinere Auflösung (400)
    waterGeometry.rotateX(-Math.PI / 2);  // Rotation für flache Position

    // Wasser-Material (Shader-Material) mit animiertem Effekt
    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 }, // Zeit-Uniform für Animation
        uColor: { value: new THREE.Color(0x1e3a4e) }, // Wasserfarbe
      },
      vertexShader: `
        uniform float uTime;
        varying float vWave;

        void main() {
          vec3 pos = position;

          // Kombination von verschiedenen Wellen für eine realistische Bewegung
          float wave1 = sin(pos.x * 0.1 + uTime * 0.5) * 0.5; // Langsame Wellen
          float wave2 = sin(pos.x * 0.2 + uTime * 1.2) * 0.3; // Schnellere Wellen
          float wave3 = sin(pos.x * 0.4 + uTime * 2.5) * 0.2; // Noch schnellere Wellen
          
          // Das Z-Koordinatenupdate sorgt für eine Wellenbewegung
          pos.z += wave1 + wave2 + wave3; 

          vWave = wave1 + wave2 + wave3; // Bereitstellung der Wellenhöhe für das Fragment-Shader

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vWave;

        void main() {
          // Farbverlauf basierend auf der Wellenhöhe (Realismus)
          float colorFactor = 0.5 + vWave * 0.5;
          gl_FragColor = vec4(uColor.r, uColor.g, uColor.b + colorFactor * 0.3, 0.8);
        }
      `,
      wireframe: false,
      side: THREE.DoubleSide,
      transparent: true, // Transparenz hinzufügen
    });

    // Wasser-Mesh hinzufügen
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    scene.add(water);

    // Positionierung des Wassers
    water.position.set(25, 60, 0);  // Position des Wassers anpassen (x, y, z)

    // Skalierung des Wassers
    water.scale.set(1, 1, 1);  // Größeren Kreis machen (z.B. 2x Skalierung)

    // Kamera weiter entfernt positionieren, um mehr von der Wasserfläche zu sehen
    camera.position.set(0, 550, 3);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Animationsfunktion
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      // Zeit-Uniform für Shader aktualisieren
      waterMaterial.uniforms.uTime.value = clock.getElapsedTime();

      renderer.render(scene, camera);
    };
    animate();

    // Fenstergröße dynamisch anpassen (falls Benutzer das Fenster ändert)
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Cleanup beim Entfernen der Komponente
    return () => {
      // Null-Prüfung vor dem Entfernen des Renderers
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        margin: "0",
        padding: "0",
        position: "absolute",
        top: "0",
        left: "0",
      }}
    />
  );
};

export default WaterScene;
