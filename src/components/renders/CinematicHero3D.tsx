import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createWoodTexture,
  createTravertineTexture,
  createMosaicTexture,
  createEnvironmentSkyTexture,
  updateWaterCanvas
} from '../../utils/proceduralTextures';

interface Props {
  timeOfDay?: 'twilight' | 'day' | 'night';
  className?: string;
}

export const CinematicHero3D: React.FC<Props> = ({ timeOfDay = 'twilight', className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const envTexture = createEnvironmentSkyTexture(timeOfDay);
    scene.environment = envTexture;
    scene.background = envTexture;

    // Atmospheric fog
    const fogColor = timeOfDay === 'twilight' ? 0x161c28 : timeOfDay === 'day' ? 0x93c5fd : 0x070a12;
    scene.fog = new THREE.FogExp2(fogColor, 0.015);

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(36, aspect, 0.5, 300);
    // Cinematic wide-angle camera positioned to capture the south facade and terrace
    camera.position.set(-18, 12, -28);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = timeOfDay === 'twilight' ? 1.25 : timeOfDay === 'day' ? 1.0 : 1.4;
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(
      timeOfDay === 'twilight' ? 0x4a5568 : timeOfDay === 'day' ? 0xdbeafe : 0x1a202c,
      timeOfDay === 'day' ? 1.1 : 0.8
    );
    scene.add(ambientLight);

    // Main Sun / Dusk Directional Light
    const sunLight = new THREE.DirectionalLight(
      timeOfDay === 'twilight' ? 0xff9944 : timeOfDay === 'day' ? 0xffffff : 0x38bdf8,
      timeOfDay === 'day' ? 1.8 : 1.2
    );
    sunLight.position.set(45, 35, -25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 140;
    sunLight.shadow.camera.left = -35;
    sunLight.shadow.camera.right = 35;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // 5. Procedural Textures
    const woodTex = createWoodTexture(true);
    woodTex.map.repeat.set(8, 2);
    if (woodTex.normalMap) woodTex.normalMap.repeat.set(8, 2);

    const travertineTex = createTravertineTexture();
    travertineTex.map.repeat.set(6, 6);

    const mosaicTex = createMosaicTexture();

    // 6. Ground Landscape & Forest Podium
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0f141a,
      roughness: 0.95,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(15.1, -0.08, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // 7. South Terrace (30.2 x 4.0 m)
    const terraceGeo = new THREE.BoxGeometry(30.2, 0.25, 4.0);
    const terraceMat = new THREE.MeshStandardMaterial({
      map: woodTex.map,
      normalMap: woodTex.normalMap,
      roughness: 0.65,
      metalness: 0.1
    });
    const terrace = new THREE.Mesh(terraceGeo, terraceMat);
    terrace.position.set(15.1, 0.125, -2.0);
    terrace.receiveShadow = true;
    terrace.castShadow = true;
    scene.add(terrace);

    // 8. Main Pavilion Building Volume (30.2 x 16.0 m, Height 3.8 m)
    // Left: Service & Bath block (14.2 x 16.0 m) with Basalt/Wood Slat Cladding
    const serviceMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      roughness: 0.85,
      metalness: 0.2
    });
    const serviceBlock = new THREE.Mesh(new THREE.BoxGeometry(14.2, 3.8, 16.0), serviceMat);
    serviceBlock.position.set(7.1, 1.9, 8.0);
    serviceBlock.castShadow = true;
    serviceBlock.receiveShadow = true;
    scene.add(serviceBlock);

    // Thermowood Slats feature facade on South side of service block
    const slatFeatureGeo = new THREE.BoxGeometry(13.8, 3.4, 0.15);
    const slatMat = new THREE.MeshStandardMaterial({
      map: woodTex.map,
      roughness: 0.5,
      metalness: 0.15
    });
    const slatFeature = new THREE.Mesh(slatFeatureGeo, slatMat);
    slatFeature.position.set(7.1, 1.9, -0.05);
    slatFeature.castShadow = true;
    scene.add(slatFeature);

    // Right: Pool Hall (16.0 x 16.0 m) with Full-Height Panoramic Glazing
    // Rear & North structural walls of pool hall
    const poolRearWall = new THREE.Mesh(new THREE.BoxGeometry(16.0, 3.8, 0.3), serviceMat);
    poolRearWall.position.set(22.2, 1.9, 16.0);
    scene.add(poolRearWall);

    const poolEastWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.8, 16.0), serviceMat);
    poolEastWall.position.set(30.2, 1.9, 8.0);
    scene.add(poolEastWall);

    // Panoramic Glass Windows (South & East)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.52,
      reflectivity: 0.9
    });

    const poolGlassSouth = new THREE.Mesh(new THREE.BoxGeometry(15.9, 3.6, 0.08), glassMat);
    poolGlassSouth.position.set(22.2, 1.9, 0.05);
    scene.add(poolGlassSouth);

    // Slender Dark Metal Window Mullions (every 2.5m)
    for (let x = 14.2; x <= 30.2; x += 2.65) {
      const mullion = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 3.8, 0.18),
        new THREE.MeshStandardMaterial({ color: 0x090c10, roughness: 0.3, metalness: 0.8 })
      );
      mullion.position.set(x, 1.9, 0.05);
      mullion.castShadow = true;
      scene.add(mullion);
    }

    // 9. Cantilevered Architectural Roof (30.8 x 20.6 m with 0.8m overhang)
    const roofGeo = new THREE.BoxGeometry(31.2, 0.35, 20.8);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x14171d,
      roughness: 0.4,
      metalness: 0.7
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(15.1, 3.95, 6.0);
    roof.castShadow = true;
    scene.add(roof);

    // Slim Terrace Columns supporting the roof canopy
    [-14.8, -8.8, -2.8, 3.2, 9.2, 14.8].forEach(colX => {
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 3.8, 16),
        new THREE.MeshStandardMaterial({ color: 0x0f131a, roughness: 0.3, metalness: 0.85 })
      );
      col.position.set(15.1 + colX, 1.9, -3.9);
      col.castShadow = true;
      scene.add(col);

      // Warm in-ground LED uplight at base of each column
      const uplight = new THREE.PointLight(0xffb050, 0.9, 6, 1.5);
      uplight.position.set(15.1 + colX, 0.3, -3.8);
      scene.add(uplight);
    });

    // 10. Warm Interior Lighting Glow spilling through glass
    const interiorLight1 = new THREE.PointLight(0xffa844, 2.8, 22, 1.2);
    interiorLight1.position.set(22.2, 2.4, 6.0);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffb866, 2.2, 18, 1.2);
    interiorLight2.position.set(7.1, 2.4, 2.0);
    scene.add(interiorLight2);

    // 11. Reflective Mirror Water Basin on Foreground
    // Creates high-end architectural water reflections of the illuminated facade
    const pondGeo = new THREE.PlaneGeometry(36, 14);
    const pondCanvas = document.createElement('canvas');
    pondCanvas.width = 256;
    pondCanvas.height = 256;
    const pondNormTex = new THREE.CanvasTexture(pondCanvas);
    pondNormTex.wrapS = THREE.RepeatWrapping;
    pondNormTex.wrapT = THREE.RepeatWrapping;
    pondNormTex.repeat.set(4, 2);

    const pondMat = new THREE.MeshStandardMaterial({
      color: 0x051d33,
      roughness: 0.04,
      metalness: 0.85,
      normalMap: pondNormTex
    });
    const pond = new THREE.Mesh(pondGeo, pondMat);
    pond.rotation.x = -Math.PI / 2;
    pond.position.set(15.1, 0.02, -12);
    pond.receiveShadow = true;
    scene.add(pond);

    // 12. Distant Pine Tree Silhouettes around perimeter
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x080c10, roughness: 0.95 });
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const dist = 55 + Math.random() * 20;
      const tx = 15.1 + Math.cos(angle) * dist;
      const tz = 8.0 + Math.sin(angle) * dist;
      const treeH = 14 + Math.random() * 12;

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, treeH * 0.4, 8), treeMat);
      trunk.position.set(tx, treeH * 0.2, tz);
      scene.add(trunk);

      const crown = new THREE.Mesh(new THREE.ConeGeometry(3.5 + Math.random() * 2, treeH * 0.8, 8), treeMat);
      crown.position.set(tx, treeH * 0.6, tz);
      scene.add(crown);
    }

    // 13. Smooth Cinematic Camera Drift Animation Loop
    let clock = new THREE.Clock();
    const target = new THREE.Vector3(15.1, 2.0, 2.0);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Dynamic water ripples update on normal map
      updateWaterCanvas(pondCanvas, elapsed);
      pondNormTex.needsUpdate = true;

      // Gentle, slow cinematic pan & tilt across the 30-meter pavilion
      const camX = -18 + Math.sin(elapsed * 0.08) * 6;
      const camZ = -28 + Math.cos(elapsed * 0.07) * 4;
      const camY = 10 + Math.sin(elapsed * 0.06) * 1.5;

      camera.position.set(camX, camY, camZ);
      camera.lookAt(target);

      renderer.render(scene, camera);
    };

    animate();

    // 14. Responsive Resize Listener
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [timeOfDay]);

  return (
    <div ref={mountRef} className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {/* Subtle cinematic photographic film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle, transparent 40%, rgba(0,0,0,0.65) 100%)`
        }}
      />
    </div>
  );
};
