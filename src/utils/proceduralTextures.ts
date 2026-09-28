import * as THREE from 'three';

// Generates high-resolution photorealistic procedural PBR textures for architectural rendering
// Creates diffuse/albedo maps, normal maps, roughness maps, and environmental maps on HTML5 Canvas

export interface TextureSet {
  map: THREE.CanvasTexture;
  normalMap?: THREE.CanvasTexture;
  roughnessMap?: THREE.CanvasTexture;
}

// 1. Photorealistic Natural Thermowood / Cedar Texture
export function createWoodTexture(isDark = false): TextureSet {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return { map: new THREE.CanvasTexture(canvas) };

  // Base wood colors
  const baseColor = isDark ? '#4a2817' : '#92562d';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Planks configuration
  const plankWidth = 64; // 16 planks
  const plankCount = size / plankWidth;

  for (let p = 0; p < plankCount; p++) {
    const px = p * plankWidth;
    // Slight color shift per plank for natural wood diversity
    const hueShift = (Math.sin(p * 12.3) * 6);
    const lightShift = (Math.cos(p * 7.7) * 8);
    ctx.fillStyle = isDark
      ? `hsl(${22 + hueShift}, 48%, ${20 + lightShift}%)`
      : `hsl(${26 + hueShift}, 52%, ${38 + lightShift}%)`;
    ctx.fillRect(px, 0, plankWidth, size);

    // Fine wood grain lines inside each plank
    ctx.strokeStyle = isDark ? 'rgba(20, 10, 5, 0.25)' : 'rgba(60, 30, 12, 0.2)';
    for (let i = 0; i < 30; i++) {
      ctx.lineWidth = 0.5 + Math.random() * 1.5;
      ctx.beginPath();
      const startX = px + Math.random() * plankWidth;
      ctx.moveTo(startX, 0);
      ctx.bezierCurveTo(
        startX + (Math.random() - 0.5) * 15,
        size * 0.33,
        startX + (Math.random() - 0.5) * 15,
        size * 0.66,
        startX + (Math.random() - 0.5) * 10,
        size
      );
      ctx.stroke();
    }

    // Occasional subtle wood knots
    if (p % 3 === 0) {
      const knotY = (p * 230) % size;
      const knotX = px + plankWidth / 2;
      const knotGrad = ctx.createRadialGradient(knotX, knotY, 2, knotX, knotY, 18);
      knotGrad.addColorStop(0, isDark ? '#261107' : '#4d2410');
      knotGrad.addColorStop(0.5, isDark ? '#3d1d0c' : '#733b1b');
      knotGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = knotGrad;
      ctx.beginPath();
      ctx.ellipse(knotX, knotY, 8, 16, Math.PI / 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // Groove between planks (dark shadow line)
    ctx.fillStyle = 'rgba(10, 5, 2, 0.65)';
    ctx.fillRect(px + plankWidth - 2, 0, 2, size);
    // Plank bevel highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(px, 0, 1, size);
  }

  // Generate Normal Map for Wood Planks
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = size;
  normalCanvas.height = size;
  const nCtx = normalCanvas.getContext('2d');
  if (nCtx) {
    nCtx.fillStyle = 'rgb(128, 128, 255)'; // Flat normal base
    nCtx.fillRect(0, 0, size, size);

    for (let p = 0; p < plankCount; p++) {
      const px = p * plankWidth;
      // Normal groove indent
      nCtx.fillStyle = 'rgb(80, 128, 240)';
      nCtx.fillRect(px + plankWidth - 3, 0, 2, size);
      nCtx.fillStyle = 'rgb(180, 128, 240)';
      nCtx.fillRect(px, 0, 2, size);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const normalMap = new THREE.CanvasTexture(normalCanvas);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;

  return { map, normalMap };
}

// 2. Natural Travertine / Limestone Pool Deck Tile Texture
export function createTravertineTexture(): TextureSet {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return { map: new THREE.CanvasTexture(canvas) };

  // Warm travertine stone base
  ctx.fillStyle = '#dfd6c8';
  ctx.fillRect(0, 0, size, size);

  // Large stone slab tile grid (e.g. 600x600 mm slabs)
  const tileSize = 256;
  const tilesAcross = size / tileSize;

  for (let r = 0; r < tilesAcross; r++) {
    for (let c = 0; c < tilesAcross; c++) {
      const tx = c * tileSize;
      const ty = r * tileSize;

      // Slight natural shade variance per slab
      const shade = (Math.sin(r * 4.3 + c * 2.7) * 6);
      ctx.fillStyle = `hsl(38, 22%, ${82 + shade}%)`;
      ctx.fillRect(tx, ty, tileSize, tileSize);

      // Travertine porous streaks (horizontal strata)
      for (let s = 0; s < 12; s++) {
        const sy = ty + Math.random() * tileSize;
        const sLen = 30 + Math.random() * 80;
        const sX = tx + Math.random() * (tileSize - sLen);
        ctx.fillStyle = 'rgba(180, 165, 148, 0.4)';
        ctx.fillRect(sX, sy, sLen, 1.5 + Math.random() * 2);
      }

      // Tile grout joint (recessed cement line)
      ctx.strokeStyle = 'rgba(120, 110, 98, 0.55)';
      ctx.lineWidth = 3;
      ctx.strokeRect(tx + 1.5, ty + 1.5, tileSize - 3, tileSize - 3);
    }
  }

  // Micro-noise for realistic matte stone grain
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  return { map };
}

// 3. Pool Mosaic Glass Tile Texture (Aegean Cyan Mosaic)
export function createMosaicTexture(): TextureSet {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return { map: new THREE.CanvasTexture(canvas) };

  ctx.fillStyle = '#024b78';
  ctx.fillRect(0, 0, size, size);

  const tileSize = 16;
  const count = size / tileSize;

  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      const tileX = x * tileSize;
      const tileY = y * tileSize;

      // Subtle hue/lightness jitter per mosaic tessera
      const jitter = (Math.sin(x * 17.1 + y * 23.3) * 14);
      ctx.fillStyle = `hsl(${198 + (jitter * 0.4)}, 85%, ${42 + jitter}%)`;
      ctx.fillRect(tileX + 1, tileY + 1, tileSize - 2, tileSize - 2);

      // Glass specular reflection highlight in top-left corner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(tileX + 1, tileY + 1, tileSize - 6, 2);
      ctx.fillRect(tileX + 1, tileY + 1, 2, tileSize - 6);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(16, 16);

  return { map };
}

// 4. Italian Carrara White Marble Texture (for Hamam)
export function createMarbleTexture(): TextureSet {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return { map: new THREE.CanvasTexture(canvas) };

  // Base off-white marble
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, size, size);

  // Soft charcoal and subtle gold veins
  ctx.lineCap = 'round';
  for (let v = 0; v < 8; v++) {
    ctx.beginPath();
    let vx = (v * 160) % size;
    let vy = 0;
    ctx.moveTo(vx, vy);

    ctx.strokeStyle = v % 3 === 0 ? 'rgba(180, 160, 120, 0.22)' : 'rgba(120, 130, 145, 0.28)';
    ctx.lineWidth = 1 + Math.random() * 4;

    while (vy < size) {
      vx += (Math.random() - 0.45) * 35;
      vy += 20 + Math.random() * 30;
      ctx.lineTo(vx, vy);
    }
    ctx.stroke();
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  return { map };
}

// 5. Basalt / Dark Charcoal Slate Texture
export function createBasaltTexture(): TextureSet {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return { map: new THREE.CanvasTexture(canvas) };

  ctx.fillStyle = '#1c1f26';
  ctx.fillRect(0, 0, size, size);

  // Micro granular noise
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    data[i] = Math.min(255, Math.max(0, data[i] + n));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  return { map };
}

// 6. Realistic Equirectangular Architectural Sky & Environment Dome
export function createEnvironmentSkyTexture(time: 'twilight' | 'day' | 'night' = 'twilight'): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createLinearGradient(0, 0, 0, height);

  if (time === 'twilight') {
    grad.addColorStop(0, '#0a0d18'); // Zenit dark blue
    grad.addColorStop(0.45, '#1e243b');
    grad.addColorStop(0.65, '#452b36'); // Warm dusk purple
    grad.addColorStop(0.78, '#9c4d28'); // Glowing amber horizon
    grad.addColorStop(0.85, '#e0833a'); // Sunset glow
    grad.addColorStop(0.88, '#1b120c'); // Horizon line
    grad.addColorStop(1, '#08080a'); // Dark ground reflection
  } else if (time === 'day') {
    grad.addColorStop(0, '#1d4ed8');
    grad.addColorStop(0.5, '#60a5fa');
    grad.addColorStop(0.8, '#dbeafe');
    grad.addColorStop(0.88, '#f8fafc');
    grad.addColorStop(1, '#1e293b');
  } else {
    grad.addColorStop(0, '#020408');
    grad.addColorStop(0.7, '#0a0e1a');
    grad.addColorStop(0.86, '#131b2e');
    grad.addColorStop(1, '#05070a');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Soft distant pine tree horizon line
  ctx.fillStyle = '#06080d';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.88);
  for (let x = 0; x < width; x += 15) {
    const treeH = height * 0.88 - (Math.random() * 25 + 10);
    ctx.lineTo(x, treeH);
  }
  ctx.lineTo(width, height * 0.88);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
}

// 7. Water Ripple Normal Map Canvas Generator (animated in render loop)
export function updateWaterCanvas(canvas: HTMLCanvasElement, timeSec: number): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  // Compute 2-layer overlapping sinusoidal wave normal map
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;

      const wave1 = Math.sin(x * 0.08 + timeSec * 2.2) * Math.cos(y * 0.08 + timeSec * 1.8);
      const wave2 = Math.sin(x * 0.14 - timeSec * 1.5 + y * 0.1) * 0.5;
      const combined = (wave1 + wave2);

      // Normal vector components encoded into RGB:
      // Red = Nx, Green = Ny, Blue = Nz
      const nx = Math.floor(128 + combined * 45);
      const ny = Math.floor(128 + Math.cos(x * 0.08 + y * 0.08) * 35);
      const nz = 245;

      data[idx] = Math.min(255, Math.max(0, nx));
      data[idx + 1] = Math.min(255, Math.max(0, ny));
      data[idx + 2] = nz;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
}
