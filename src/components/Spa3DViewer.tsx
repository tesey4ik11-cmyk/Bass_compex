import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  ARCHITECTURAL_ROOMS,
  POOL_BASIN,
  ArchitecturalRoom
} from '../data/approvedSpaPlanData';
import {
  createWoodTexture,
  createTravertineTexture,
  createMosaicTexture,
  createMarbleTexture,
  updateWaterCanvas
} from '../utils/proceduralTextures';

interface Props {
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
  initialPreset?: 'axonometric' | 'top' | 'south' | 'north' | 'pool' | 'lounge';
  className?: string;
}

/**
 * Spa3DViewer: 1:1 Synchronized 3D Model with 2D Master Blueprint (BK-26-003-KR)
 * 
 * COORDINATE SYSTEM (Exact match to 2D Plan Orientation):
 * X-axis: 0 (West / Entrance, Reception) -> 30.2 m (East / Panoramic Pool Facade)
 * Z-axis: 0 (North / Hamam, Saunas, Russian Banya, Tech) -> 16.0 m (South / Lockers, Showers, Entrance)
 *         16.0 -> 20.0 m (South Summer Terrace with Canopy Columns)
 * Y-axis: 0 (Ground level) -> 3.8 m (Ceiling height)
 * 
 * Coordinate transformation from 2D Blueprint (yMm):
 * to3dZ(yMm) = (16 000 - yMm) / 1000
 * In Top View (and on screen):
 * - NORTH (Z = 0) is at the TOP (Сверху)
 * - SOUTH (Z = 16) is at the BOTTOM (Снизу)
 * - WEST (X = 0) is at the LEFT (Слева)
 * - EAST (X = 30.2) is at the RIGHT (Справа)
 */
export const Spa3DViewer: React.FC<Props> = ({
  selectedRoomId,
  onSelectRoom,
  initialPreset = 'axonometric',
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cameraPreset, setCameraPreset] = useState<'axonometric' | 'top' | 'south' | 'north' | 'pool' | 'lounge'>(initialPreset);
  const [wallHeightMode, setWallHeightMode] = useState<'cutaway' | 'full'>('cutaway');
  const [hoveredRoom, setHoveredRoom] = useState<ArchitecturalRoom | null>(null);

  // References to Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const wallsGroupRef = useRef<THREE.Group | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const roomMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());

  const WALL_FULL_H = 3.8;
  const WALL_CUT_H = 1.35;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0e17);
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.012);

    // Procedural PBR Textures
    const woodDark = createWoodTexture(true);
    woodDark.map.repeat.set(10, 2);
    if (woodDark.normalMap) woodDark.normalMap.repeat.set(10, 2);

    const woodCedar = createWoodTexture(false);
    woodCedar.map.repeat.set(4, 4);

    const travertine = createTravertineTexture();
    travertine.map.repeat.set(4, 4);

    const mosaic = createMosaicTexture();
    const marble = createMarbleTexture();
    marble.map.repeat.set(2, 2);

    // 2. Initial Dimensions & Camera Setup
    const initW = Math.max(container.clientWidth || 320, 200);
    const initH = Math.max(container.clientHeight || 450, 200);
    const aspect = initW / initH;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.5, 250);
    cameraRef.current = camera;
    camera.up.set(0, 1, 0);
    camera.position.set(6.0, 26.0, 36.0);

    // 3. Renderer Setup (Mobile optimized & high compatibility)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Ensure proper canvas styling and touch interactions
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';

    // Clear any previous child in container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls Setup (Optimized for Mobile touch gestures)
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 4;
    controls.maxDistance = 120;
    controls.target.set(15.1, 0, 8.0);
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };

    // 5. High-fidelity Architectural Lighting (No black screens, 100% reliable)
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.95);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 0.5);
    hemiLight.position.set(15.1, 30, 8.0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff1dc, 1.6);
    sunLight.position.set(25, 45, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-20, 25, -25);
    scene.add(fillLight);

    // 6. Ground Grid & Landscape Plane
    const groundGeo = new THREE.PlaneGeometry(180, 180);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x070a10,
      roughness: 0.95,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(15.1, -0.05, 8.0);
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(120, 120, 0x1e2433, 0x0f131f);
    gridHelper.position.set(15.1, -0.04, 8.0);
    scene.add(gridHelper);

    // ==========================================
    // 7. FOUNDATION SLAB & TERRACE
    // ==========================================
    const slabGeo = new THREE.BoxGeometry(30.2, 0.25, 16.0);
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e26,
      roughness: 0.8
    });
    const slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.set(15.1, -0.125, 8.0);
    slab.receiveShadow = true;
    scene.add(slab);

    // South Outdoor Terrace: 30.2 x 4.0 m (Z: 16.0 to 20.0, along South facade)
    const terraceGeo = new THREE.BoxGeometry(30.2, 0.15, 4.0);
    const terraceMat = new THREE.MeshStandardMaterial({
      map: woodDark.map,
      normalMap: woodDark.normalMap,
      roughness: 0.65,
      metalness: 0.08
    });
    const terrace = new THREE.Mesh(terraceGeo, terraceMat);
    terrace.position.set(15.1, -0.075, 18.0);
    terrace.receiveShadow = true;
    scene.add(terrace);

    // West Side Terrace / Entry Walk: 4.0 x 16.0 m (X: -4.0 to 0)
    const westTerraceGeo = new THREE.BoxGeometry(4.0, 0.15, 16.0);
    const westTerrace = new THREE.Mesh(westTerraceGeo, terraceMat);
    westTerrace.position.set(-2.0, -0.075, 8.0);
    westTerrace.receiveShadow = true;
    scene.add(westTerrace);

    // South Terrace Canopy Columns (at South boundary Z = 20.0)
    const colMat = new THREE.MeshStandardMaterial({ color: 0x0e1219, roughness: 0.35, metalness: 0.8 });
    [-15.1, -9.0, -3.0, 3.0, 9.0, 15.1].forEach(colX => {
      const colGeo = new THREE.BoxGeometry(0.22, 3.4, 0.22);
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(15.1 + colX, 1.7, 20.0);
      col.castShadow = true;
      scene.add(col);
    });

    // ==========================================
    // 8. INTERACTIVE ROOM FLOORS
    // ==========================================
    const roomMap = new Map<string, THREE.Mesh>();

    ARCHITECTURAL_ROOMS.forEach(r => {
      const w = r.widthMm / 1000;
      const l = r.lengthMm / 1000;
      const cx = (r.xMin + r.xMax) / 2000;
      const cz = (16000 - (r.yMin + r.yMax) / 2) / 1000;

      if (r.id === 'room_pool_hall') {
        const poolSurroundGroup = new THREE.Group();
        const tileMat = new THREE.MeshStandardMaterial({
          map: travertine.map,
          roughness: 0.7,
          metalness: 0.05
        });

        const subFloors = [
          { w: 2.0, l: 16.0, cx: 15.2, cz: 8.0 },
          { w: 4.0, l: 16.0, cx: 28.2, cz: 8.0 },
          { w: 10.0, l: 4.0, cx: 21.2, cz: 2.0 },
          { w: 10.0, l: 2.0, cx: 21.2, cz: 15.0 }
        ];

        subFloors.forEach(sf => {
          const sfMesh = new THREE.Mesh(new THREE.PlaneGeometry(sf.w, sf.l), tileMat);
          sfMesh.rotation.x = -Math.PI / 2;
          sfMesh.position.set(sf.cx, 0.01, sf.cz);
          sfMesh.receiveShadow = true;
          poolSurroundGroup.add(sfMesh);
        });

        scene.add(poolSurroundGroup);
        return;
      }

      const floorGeo = new THREE.PlaneGeometry(w - 0.04, l - 0.04);
      let floorMat: THREE.Material;

      if (r.id === 'room_hamam') {
        floorMat = new THREE.MeshStandardMaterial({
          map: marble.map,
          roughness: 0.25,
          metalness: 0.1
        });
      } else if (r.id === 'room_sauna' || r.id === 'room_steam') {
        floorMat = new THREE.MeshStandardMaterial({
          map: woodCedar.map,
          roughness: 0.7,
          metalness: 0.05
        });
      } else if (r.id === 'room_lounge') {
        floorMat = new THREE.MeshStandardMaterial({
          map: woodDark.map,
          roughness: 0.6,
          metalness: 0.1
        });
      } else if (r.category === 'wet') {
        floorMat = new THREE.MeshStandardMaterial({
          map: travertine.map,
          roughness: 0.55,
          metalness: 0.1
        });
      } else {
        floorMat = new THREE.MeshStandardMaterial({
          color: r.category === 'tech' ? 0x475569 : 0xcbd5e1,
          roughness: 0.6,
          metalness: 0.1
        });
      }

      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.set(cx, 0.01, cz);
      floorMesh.receiveShadow = true;
      floorMesh.userData = { roomId: r.id };
      scene.add(floorMesh);
      roomMap.set(r.id, floorMesh);
    });

    roomMeshesRef.current = roomMap;

    // Helper: Create 3D Floor Text Plaque / Badge
    function createFloorBadge(
      num: string,
      name: string,
      area: number,
      zone: string,
      cx: number,
      cz: number,
      bW = 2.4,
      bH = 0.9
    ) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 192;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.roundRect(8, 8, 496, 176, 18);
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = zone.includes('ЮГ')
        ? 'rgba(56, 189, 248, 0.9)'
        : zone.includes('СЕВЕР')
        ? 'rgba(192, 132, 252, 0.9)'
        : 'rgba(251, 191, 36, 0.8)';
      ctx.stroke();

      ctx.fillStyle = zone.includes('ЮГ') ? '#38bdf8' : zone.includes('СЕВЕР') ? '#c084fc' : '#fbbf24';
      ctx.font = 'bold 26px monospace';
      ctx.fillText(`${num}. [${zone}]`, 24, 46);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(name, 24, 102);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '28px monospace';
      ctx.fillText(`${area.toFixed(1)} м²`, 24, 154);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 4;
      const badgeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.92
      });
      const badgeMesh = new THREE.Mesh(new THREE.PlaneGeometry(bW, bH), badgeMat);
      badgeMesh.rotation.x = -Math.PI / 2;
      badgeMesh.position.set(cx, 0.03, cz);
      scene.add(badgeMesh);
    }

    // ARCHITECTURAL BADGES ON FLOORS
    createFloorBadge('10', 'ХАМАМ', 18.0, 'СЕВЕР', 1.8, 2.5, 2.2, 0.85);
    createFloorBadge('11', 'САУНА', 18.0, 'СЕВЕР', 5.4, 2.5, 2.2, 0.85);
    createFloorBadge('12', 'РУССКАЯ ПАРНАЯ', 20.0, 'СЕВЕР', 9.2, 2.5, 2.4, 0.85);
    createFloorBadge('13', 'ТЕХ. ПОМЕЩЕНИЕ', 15.0, 'СЕВЕР', 12.7, 2.5, 2.2, 0.85);

    createFloorBadge('03', 'ЗОНА ОТДЫХА', 42.6, 'ЦЕНТР', 7.1, 6.5, 3.5, 1.0);

    createFloorBadge('02', 'ХОЛЛ / РЕСЕПШЕН', 19.2, 'ЮГ-ЗАПАД', 1.6, 11.0, 2.2, 0.85);
    createFloorBadge('01', 'ТАМБУР', 6.4, 'ЮГ-ВХОД', 1.6, 15.0, 1.8, 0.7);

    createFloorBadge('04', 'МУЖСКАЯ РАЗДЕВАЛКА', 24.75, 'ЮГ', 5.95, 10.25, 3.2, 1.0);
    createFloorBadge('05', 'ЖЕНСКАЯ РАЗДЕВАЛКА', 24.75, 'ЮГ', 11.45, 10.25, 3.2, 1.0);

    createFloorBadge('06', 'МУЖСКАЯ ДУШЕВАЯ', 12.25, 'ЮГ', 4.95, 14.25, 2.3, 0.85);
    createFloorBadge('07', 'С/У №1 (МУЖ)', 7.0, 'ЮГ', 7.7, 14.25, 1.7, 0.75);
    createFloorBadge('08', 'С/У №2 (ЖЕН)', 7.0, 'ЮГ', 9.7, 14.25, 1.7, 0.75);
    createFloorBadge('09', 'ЖЕНСКАЯ ДУШЕВАЯ', 12.25, 'ЮГ', 12.45, 14.25, 2.3, 0.85);

    createFloorBadge('14', 'БАССЕЙН 10×10 М', 100.0, 'ВОСТОК', 21.2, 9.0, 4.0, 1.1);

    // ==========================================
    // 9. CARDINAL DIRECTION BANNERS IN 3D
    // ==========================================
    function createCompassRibbon(text: string, x: number, z: number, rotY = 0, color = '#38bdf8') {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.roundRect(8, 8, 1008, 112, 16);
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = 'bold 42px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 512, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(10.0, 1.2), mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = rotY;
      mesh.position.set(x, 0.05, z);
      scene.add(mesh);
    }

    createCompassRibbon('▲ СЕВЕРНЫЙ ФАСАД • ХАМАМ, САУНА, РУССКАЯ ПАРНАЯ, ТЕХ. БЛОК', 15.1, -1.5, 0, '#c084fc');
    createCompassRibbon('▼ ЮЖНЫЙ ФАСАД • РАЗДЕВАЛКИ, ДУШЕВЫЕ, ВХОД, ТЕРРАСА', 15.1, 21.5, 0, '#38bdf8');
    createCompassRibbon('◀ ЗАПАДНЫЙ ФАСАД • ГЛАВНЫЙ ВХОД', -1.5, 8.0, Math.PI / 2, '#fbbf24');
    createCompassRibbon('▶ ВОСТОЧНЫЙ ФАСАД • ВИТРАЖНОЕ ОСТЕКЛЕНИЕ БАССЕЙНА', 31.7, 8.0, -Math.PI / 2, '#34d399');

    // ==========================================
    // 10. POOL BASIN 10.0 x 10.0 m (RECESSED)
    // ==========================================
    const poolGroup = new THREE.Group();
    const pX = (POOL_BASIN.xMin + POOL_BASIN.xMax) / 2000; // 21.2 m
    const pZ = (16000 - (POOL_BASIN.yMin + POOL_BASIN.yMax) / 2) / 1000; // 9.0 m
    const pW = POOL_BASIN.widthMm / 1000; // 10.0 m
    const pL = POOL_BASIN.lengthMm / 1000; // 10.0 m
    const pD = 1.6;

    const pBottomGeo = new THREE.PlaneGeometry(pW, pL);
    const pTileMat = new THREE.MeshStandardMaterial({
      map: mosaic.map,
      roughness: 0.25,
      metalness: 0.2
    });
    const pBottom = new THREE.Mesh(pBottomGeo, pTileMat);
    pBottom.rotation.x = -Math.PI / 2;
    pBottom.position.set(pX, -pD, pZ);
    pBottom.receiveShadow = true;
    poolGroup.add(pBottom);

    const pWallNorth = new THREE.Mesh(new THREE.PlaneGeometry(pW, pD), pTileMat);
    pWallNorth.position.set(pX, -pD / 2, pZ - pL / 2);
    poolGroup.add(pWallNorth);

    const pWallSouth = new THREE.Mesh(new THREE.PlaneGeometry(pW, pD), pTileMat);
    pWallSouth.position.set(pX, -pD / 2, pZ + pL / 2);
    pWallSouth.rotation.y = Math.PI;
    poolGroup.add(pWallSouth);

    const pWallWest = new THREE.Mesh(new THREE.PlaneGeometry(pL, pD), pTileMat);
    pWallWest.position.set(pX - pW / 2, -pD / 2, pZ);
    pWallWest.rotation.y = Math.PI / 2;
    poolGroup.add(pWallWest);

    const pWallEast = new THREE.Mesh(new THREE.PlaneGeometry(pL, pD), pTileMat);
    pWallEast.position.set(pX + pW / 2, -pD / 2, pZ);
    pWallEast.rotation.y = -Math.PI / 2;
    poolGroup.add(pWallEast);

    // Physical Water Surface
    const waterCanvas = document.createElement('canvas');
    waterCanvas.width = 128;
    waterCanvas.height = 128;
    const waterNormTex = new THREE.CanvasTexture(waterCanvas);
    waterNormTex.wrapS = THREE.RepeatWrapping;
    waterNormTex.wrapT = THREE.RepeatWrapping;
    waterNormTex.repeat.set(4, 4);

    const waterGeo = new THREE.PlaneGeometry(pW - 0.05, pL - 0.05, 16, 16);
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.8,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.333,
      normalMap: waterNormTex
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(pX, -0.15, pZ);
    waterMeshRef.current = water;
    poolGroup.add(water);

    // Underwater spotlights
    const underWater1 = new THREE.PointLight(0x38bdf8, 2.2, 8, 1.5);
    underWater1.position.set(pX - 2.5, -0.8, pZ);
    poolGroup.add(underWater1);

    const underWater2 = new THREE.PointLight(0x38bdf8, 2.2, 8, 1.5);
    underWater2.position.set(pX + 2.5, -0.8, pZ);
    poolGroup.add(underWater2);

    // Roman Stairs inside pool at South side
    for (let step = 0; step < 4; step++) {
      const sH = 0.35;
      const sD = 0.45;
      const sW = 3.5;
      const sMesh = new THREE.Mesh(
        new THREE.BoxGeometry(sW, (4 - step) * sH, sD),
        pTileMat
      );
      sMesh.position.set(pX, -pD + ((4 - step) * sH) / 2, pZ + pL / 2 - step * sD - sD / 2);
      poolGroup.add(sMesh);
    }

    scene.add(poolGroup);

    // ==========================================
    // 11. WALLS & ARCHITECTURAL PARTITIONS
    // ==========================================
    const wallsGroup = new THREE.Group();
    wallsGroupRef.current = wallsGroup;
    scene.add(wallsGroup);

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.8
    });

    buildWalls(WALL_CUT_H);

    function buildWalls(height: number) {
      if (!wallsGroupRef.current) return;
      while (wallsGroupRef.current.children.length > 0) {
        wallsGroupRef.current.remove(wallsGroupRef.current.children[0]);
      }

      const wallThick = 0.24;

      // EXTERIOR WALLS:
      addWallBox(15.1, 0, 30.2, wallThick, height, wallMat);

      // South Exterior Wall (Z = 16.0)
      addWallBox(0.8, 16.0, 1.6, wallThick, height, wallMat);
      addWallBox(8.3, 16.0, 11.8, wallThick, height, wallMat);
      addWallBox(22.2, 16.0, 16.0, 0.15, height, glassMat);

      // West Wall (X = 0)
      addWallBox(0, 8.0, wallThick, 16.0, height, wallMat);

      // East Wall (X = 30.2): Panoramic Glass Wall
      addWallBox(30.2, 8.0, 0.15, 16.0, height, glassMat);

      // INTERIOR PARTITIONS:
      addWallBox(3.2, 15.0, wallThick, 2.0, height, wallMat);
      addWallBox(3.2, 11.5, wallThick, 3.0, height, wallMat);
      addWallBox(3.2, 9.0, wallThick, 2.0, height, wallMat);

      addWallBox(6.7, 14.25, wallThick, 3.5, height, wallMat);

      addWallBox(8.7, 14.25, wallThick, 3.5, height, wallMat);
      addWallBox(8.7, 10.25, wallThick, 4.5, height, wallMat);

      addWallBox(10.7, 14.25, wallThick, 3.5, height, wallMat);

      // Dividing wall between Service Block and Pool Hall (X = 14.2)
      addWallBox(14.2, 12.0, wallThick, 8.0, height, wallMat);
      addWallBox(14.2, 6.5, 0.1, 3.0, height, glassMat);
      addWallBox(14.2, 2.5, wallThick, 5.0, height, wallMat);

      // NORTH THERMAL BLOCK VERTICAL PARTITIONS (Z: 0..5.0 m):
      addWallBox(3.6, 2.5, wallThick, 5.0, height, wallMat);
      addWallBox(7.2, 2.5, wallThick, 5.0, height, wallMat);
      addWallBox(11.2, 2.5, wallThick, 5.0, height, wallMat);

      // HORIZONTAL AXES:
      addWallBox(0.5, 5.0, 1.0, wallThick, height, wallMat);
      addWallBox(3.6, 5.0, 2.6, wallThick, height, wallMat);
      addWallBox(7.3, 5.0, 2.8, wallThick, height, wallMat);
      addWallBox(11.0, 5.0, 2.6, wallThick, height, wallMat);
      addWallBox(13.6, 5.0, 1.2, wallThick, height, wallMat);

      addWallBox(0.5, 8.0, 1.0, wallThick, height, wallMat);
      addWallBox(3.8, 8.0, 2.8, wallThick, height, wallMat);
      addWallBox(8.7, 8.0, 3.5, wallThick, height, wallMat);
      addWallBox(13.2, 8.0, 2.0, wallThick, height, wallMat);

      addWallBox(3.8, 12.5, 1.2, wallThick, height, wallMat);
      addWallBox(6.1, 12.5, 1.6, wallThick, height, wallMat);
      addWallBox(8.7, 12.5, 1.6, wallThick, height, wallMat);
      addWallBox(11.4, 12.5, 1.6, wallThick, height, wallMat);
      addWallBox(13.5, 12.5, 1.4, wallThick, height, wallMat);

      addWallBox(0.8, 14.0, 1.6, wallThick, height, wallMat);
      addWallBox(2.6, 14.0, 1.2, wallThick, height, wallMat);
    }

    function addWallBox(cx: number, cz: number, w: number, l: number, h: number, mat: THREE.Material) {
      const geo = new THREE.BoxGeometry(w, h, l);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cx, h / 2, cz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      wallsGroupRef.current?.add(mesh);
    }

    // ==========================================
    // 12. DETAILED 3D FURNITURE & EQUIPMENT
    // ==========================================
    const furnitureGroup = new THREE.Group();

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.6 });
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const lockerCabinetMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.3 });
    const benchWoodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.1, metalness: 0.95 });

    // A. SOUTH ZONE - MALE LOCKER ROOM
    const mLockers1 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 0.55), lockerCabinetMat);
    mLockers1.position.set(5.95, 0.9, 8.8);
    furnitureGroup.add(mLockers1);

    const mBench1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 0.4), benchWoodMat);
    mBench1.position.set(5.95, 0.2, 9.5);
    furnitureGroup.add(mBench1);

    const mLockers2 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 0.55), lockerCabinetMat);
    mLockers2.position.set(5.95, 0.9, 11.8);
    furnitureGroup.add(mLockers2);

    const mBench2 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 0.4), benchWoodMat);
    mBench2.position.set(5.95, 0.2, 11.1);
    furnitureGroup.add(mBench2);

    // B. SOUTH ZONE - FEMALE LOCKER ROOM
    const fLockers1 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 0.55), lockerCabinetMat);
    fLockers1.position.set(11.45, 0.9, 8.8);
    furnitureGroup.add(fLockers1);

    const fBench1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 0.4), benchWoodMat);
    fBench1.position.set(11.45, 0.2, 9.5);
    furnitureGroup.add(fBench1);

    const fLockers2 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 0.55), lockerCabinetMat);
    fLockers2.position.set(11.45, 0.9, 11.8);
    furnitureGroup.add(fLockers2);

    const fVanity = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.75, 0.45), woodMat);
    fVanity.position.set(11.45, 0.38, 10.4);
    furnitureGroup.add(fVanity);

    // C. SOUTH ZONE - MALE SHOWER
    [3.8, 4.5, 5.3, 6.0].forEach(sx => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8), chromeMat);
      post.position.set(sx, 0.9, 13.0);
      furnitureGroup.add(post);

      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03), chromeMat);
      head.position.set(sx, 1.8, 13.2);
      furnitureGroup.add(head);
    });

    // D. SOUTH ZONE - FEMALE SHOWER
    [11.3, 12.0, 12.8, 13.5].forEach(sx => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8), chromeMat);
      post.position.set(sx, 0.9, 13.0);
      furnitureGroup.add(post);

      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03), chromeMat);
      head.position.set(sx, 1.8, 13.2);
      furnitureGroup.add(head);
    });

    // E. SOUTH ZONE - WCs #1 & #2
    const wcMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.2 });
    const wc1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.65), wcMat);
    wc1.position.set(7.7, 0.23, 15.4);
    furnitureGroup.add(wc1);

    const wc2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.65), wcMat);
    wc2.position.set(9.7, 0.23, 15.4);
    furnitureGroup.add(wc2);

    // F. NORTH ZONE - HAMAM
    const marbleBenchMat = new THREE.MeshStandardMaterial({ color: 0xede9fe, roughness: 0.15 });
    const hamamBench1 = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.6, 0.9), marbleBenchMat);
    hamamBench1.position.set(1.8, 0.3, 0.8);
    furnitureGroup.add(hamamBench1);

    const kurna = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 0.75, 16), marbleBenchMat);
    kurna.position.set(1.8, 0.4, 2.5);
    furnitureGroup.add(kurna);

    // G. NORTH ZONE - FINNISH SAUNA
    const cedarMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 });
    const saunaBenchUpper = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 0.8), cedarMat);
    saunaBenchUpper.position.set(5.4, 0.9, 0.7);
    furnitureGroup.add(saunaBenchUpper);

    const saunaBenchLower = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 0.8), cedarMat);
    saunaBenchLower.position.set(5.4, 0.45, 1.5);
    furnitureGroup.add(saunaBenchLower);

    const saunaStove = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.9, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    saunaStove.position.set(4.2, 0.45, 4.2);
    furnitureGroup.add(saunaStove);

    // H. NORTH ZONE - RUSSIAN BANYA
    const brickMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.9 });
    const banyaStove = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 1.2), brickMat);
    banyaStove.position.set(7.9, 0.7, 4.0);
    furnitureGroup.add(banyaStove);

    const banyaBench = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.85, 1.3), cedarMat);
    banyaBench.position.set(9.2, 0.45, 1.0);
    furnitureGroup.add(banyaBench);

    // I. CENTRAL LOUNGE
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });

    [3.5, 7.1, 11.5].forEach(xCenter => {
      const sofa = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.65, 0.9), sofaMat);
      sofa.position.set(xCenter, 0.35, 6.2);
      sofa.castShadow = true;
      furnitureGroup.add(sofa);

      const cTable = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.7), tableMat);
      cTable.position.set(xCenter, 0.2, 7.2);
      furnitureGroup.add(cTable);
    });

    // J. WEST ENTRANCE - RECEPTION DESK
    const recepDesk = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.1, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.5 })
    );
    recepDesk.position.set(1.6, 0.55, 12.0);
    furnitureGroup.add(recepDesk);

    // K. EAST POOL HALL - LOUNGERS
    for (let i = 0; i < 8; i++) {
      const zPos = 2.4 + i * 1.55;
      const lBase = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.22, 0.68), woodMat);
      lBase.position.set(28.2, 0.11, zPos);
      lBase.castShadow = true;
      furnitureGroup.add(lBase);

      const lCushion = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.08, 0.62), cushionMat);
      lCushion.position.set(28.2, 0.26, zPos);
      furnitureGroup.add(lCushion);
    }

    for (let j = 0; j < 8; j++) {
      const xPos = 16.8 + j * 1.55;
      const lBase = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.22, 1.9), woodMat);
      lBase.position.set(xPos, 0.11, 2.0);
      lBase.castShadow = true;
      furnitureGroup.add(lBase);

      const lCushion = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.08, 1.85), cushionMat);
      lCushion.position.set(xPos, 0.26, 2.0);
      furnitureGroup.add(lCushion);
    }

    scene.add(furnitureGroup);

    // ==========================================
    // 13. RAYCASTER FOR INTERACTIVE ROOM SELECTION
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const floorMeshes = Array.from(roomMeshesRef.current.values());
      const intersects = raycaster.intersectObjects(floorMeshes);

      if (intersects.length > 0) {
        const hitRoomId = intersects[0].object.userData.roomId;
        const room = ARCHITECTURAL_ROOMS.find(r => r.id === hitRoomId);
        setHoveredRoom(room || null);
        container.style.cursor = 'pointer';
      } else {
        setHoveredRoom(null);
        container.style.cursor = 'default';
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const floorMeshes = Array.from(roomMeshesRef.current.values());
      const intersects = raycaster.intersectObjects(floorMeshes);
      if (intersects.length > 0) {
        const hitRoomId = intersects[0].object.userData.roomId;
        onSelectRoom(hitRoomId);
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    // ==========================================
    // 14. RESIZE OBSERVER (BULLETPROOF CONTAINER SIZING)
    // ==========================================
    const updateSize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Trigger one initial size sync on next frame
    requestAnimationFrame(updateSize);

    // Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = -0.15 + Math.sin(elapsedTime * 1.8) * 0.015;
        updateWaterCanvas(waterCanvas, elapsedTime);
        waterNormTex.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleWindowResize = () => {
      updateSize();
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('click', onClick);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update wall heights
  useEffect(() => {
    if (!sceneRef.current || !wallsGroupRef.current) return;
    const targetH = wallHeightMode === 'cutaway' ? WALL_CUT_H : WALL_FULL_H;
    wallsGroupRef.current.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        child.scale.y = targetH / WALL_CUT_H;
        child.position.y = (WALL_CUT_H * (targetH / WALL_CUT_H)) / 2;
      }
    });
  }, [wallHeightMode]);

  // Initial preset
  useEffect(() => {
    if (initialPreset) {
      applyCameraPreset(initialPreset);
    }
  }, [initialPreset]);

  // Highlight selected room
  useEffect(() => {
    roomMeshesRef.current.forEach((mesh, id) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (id === selectedRoomId) {
        mat.emissive.setHex(0x06b6d4);
        mat.emissiveIntensity = 0.55;
      } else {
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
      }
    });

    if (selectedRoomId) {
      const room = ARCHITECTURAL_ROOMS.find(r => r.id === selectedRoomId);
      if (room && cameraRef.current && controlsRef.current) {
        const cx = (room.xMin + room.xMax) / 2000;
        const cz = (16000 - (room.yMin + room.yMax) / 2) / 1000;
        controlsRef.current.target.set(cx, 0.8, cz);
        cameraRef.current.position.set(cx - 2, 12, cz + 10);
      }
    }
  }, [selectedRoomId]);

  // CAMERA PRESETS
  const applyCameraPreset = (preset: typeof cameraPreset) => {
    if (!cameraRef.current || !controlsRef.current) return;
    setCameraPreset(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (preset) {
      case 'axonometric':
        camera.up.set(0, 1, 0);
        camera.position.set(6.0, 26.0, 36.0);
        controls.target.set(15.1, 0, 8.0);
        break;

      case 'top':
        // North is TOP (towards -Z), South is BOTTOM (towards +Z)
        camera.up.set(0, 0, -1);
        camera.position.set(15.1, 46.0, 8.0);
        controls.target.set(15.1, 0, 8.0);
        break;

      case 'south':
        camera.up.set(0, 1, 0);
        camera.position.set(8.7, 14.0, 24.0);
        controls.target.set(8.7, 0, 12.0);
        break;

      case 'north':
        camera.up.set(0, 1, 0);
        camera.position.set(7.5, 14.0, -8.0);
        controls.target.set(7.5, 0, 2.5);
        break;

      case 'pool':
        camera.up.set(0, 1, 0);
        camera.position.set(28.0, 14.0, 22.0);
        controls.target.set(21.2, 0, 9.0);
        break;

      case 'lounge':
        camera.up.set(0, 1, 0);
        camera.position.set(7.5, 10.0, 14.0);
        controls.target.set(7.5, 0.5, 6.5);
        break;
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[420px] bg-slate-950 overflow-hidden flex flex-col select-none ${className}`}>
      {/* 3D TOOLBAR (Responsive with horizontal scrolling on mobile) */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs z-10 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span className="font-extrabold text-white tracking-wide uppercase text-[11px] truncate">
            3D МОДЕЛЬ (МБ 1:50)
          </span>
          <span className="text-slate-500 font-mono hidden md:inline">|</span>
          <span className="text-cyan-300 font-mono text-[11px] hidden md:inline truncate">
            Север (сверху) • Юг (снизу)
          </span>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center bg-slate-950 p-0.5 sm:p-1 rounded-lg border border-slate-800 gap-1 text-[11px] shrink-0">
            <button
              onClick={() => applyCameraPreset('axonometric')}
              className={`px-2 py-1 rounded font-medium transition whitespace-nowrap ${
                cameraPreset === 'axonometric' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              📐 Изометрия
            </button>
            <button
              onClick={() => applyCameraPreset('top')}
              className={`px-2 py-1 rounded font-medium transition whitespace-nowrap ${
                cameraPreset === 'top' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              План 3D
            </button>
            <button
              onClick={() => applyCameraPreset('south')}
              className={`px-2 py-1 rounded font-medium transition whitespace-nowrap ${
                cameraPreset === 'south' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Юг (Раздевалки)
            </button>
            <button
              onClick={() => applyCameraPreset('north')}
              className={`px-2 py-1 rounded font-medium transition whitespace-nowrap ${
                cameraPreset === 'north' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Север (Парные)
            </button>
            <button
              onClick={() => applyCameraPreset('pool')}
              className={`px-2 py-1 rounded font-medium transition whitespace-nowrap ${
                cameraPreset === 'pool' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Бассейн
            </button>
            <button
              onClick={() => applyCameraPreset('lounge')}
              className={`px-2 py-1 rounded font-medium transition whitespace-nowrap ${
                cameraPreset === 'lounge' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Лаундж
            </button>
          </div>

          <button
            onClick={() => setWallHeightMode(prev => prev === 'cutaway' ? 'full' : 'cutaway')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition shrink-0 whitespace-nowrap ${
              wallHeightMode === 'cutaway'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {wallHeightMode === 'cutaway' ? '✂ Разрез (1.35 м)' : '🏢 Стены (3.8 м)'}
          </button>
        </div>
      </div>

      {/* Floating HUD Compass & Orientation Legend (Hidden on very small screens to give space) */}
      <div className="hidden sm:flex absolute top-14 sm:top-16 right-3 sm:right-4 z-10 bg-slate-900/90 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-slate-800 text-[10px] sm:text-xs shadow-xl flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-300 border-b border-slate-800 pb-1">
          <span className="text-amber-400">🧭</span>
          <span>ОРИЕНТАЦИЯ:</span>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] font-mono">
          <div className="text-purple-300 font-bold">▲ СЕВЕР: Парные</div>
          <div className="text-cyan-300 font-bold">▼ ЮГ: Раздевалки</div>
          <div className="text-amber-300">◀ ЗАПАД: Вход</div>
          <div className="text-emerald-300">▶ ВОСТОК: Бассейн</div>
        </div>
      </div>

      {/* Touch Navigation Hint on Mobile */}
      <div className="sm:hidden absolute top-12 left-3 z-10 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded border border-slate-800 text-[10px] text-slate-400 font-mono pointer-events-none">
        1 палец: поворот • 2 пальца: масштаб
      </div>

      {/* Hovered / Touched Room Info Overlay */}
      {hoveredRoom && (
        <div className="absolute bottom-3 left-3 sm:left-4 z-10 bg-slate-900/95 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-cyan-500/40 shadow-2xl text-xs pointer-events-none animate-fadeIn max-w-[85%]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-mono text-cyan-300 font-bold text-[10px]">
              №{hoveredRoom.num}. {hoveredRoom.zoneName}
            </span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
            {hoveredRoom.name}
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-slate-400">
            {hoveredRoom.areaM2.toFixed(1)} м² • {(hoveredRoom.widthMm / 1000).toFixed(1)} × {(hoveredRoom.lengthMm / 1000).toFixed(1)} м
          </div>
        </div>
      )}

      {/* ACTUAL THREE.JS CANVAS MOUNT POINT (CRITICAL FIX: ref={mountRef} connected!) */}
      <div
        ref={mountRef}
        className="flex-1 w-full h-full min-h-0 relative overflow-hidden"
      />
    </div>
  );
};
