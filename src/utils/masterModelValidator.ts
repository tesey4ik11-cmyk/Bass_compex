// Automated verification engine for Master Model and 3D Model Synchronization
// Ensures 100% mathematical fidelity with architectural blueprint BK-26-003-KR

import {
  ARCHITECTURAL_ROOMS,
  POOL_BASIN,
  BUILDING_WIDTH_MM,
  BUILDING_LENGTH_MM,
  SERVICE_BLOCK_WIDTH_MM,
  POOL_HALL_WIDTH_MM,
  DXF_ORIGIN_X,
  DXF_ORIGIN_Y,
  DXF_SCALE
} from '../data/approvedSpaPlanData';

export interface VerificationCheck {
  id: string;
  name: string;
  expected: string;
  actual: string;
  passed: boolean;
  category: 'geometry' | 'rooms' | 'pool' | 'dxf';
}

export interface VerificationResult {
  isFullyCompliant: boolean;
  totalChecks: number;
  passedChecks: number;
  checks: VerificationCheck[];
  timestamp: string;
}

export function runMasterModelVerification(): VerificationResult {
  const checks: VerificationCheck[] = [];

  // 1. Overall Building Geometry
  checks.push({
    id: 'contour_size',
    name: 'Габарит наружного контура',
    expected: '30 200 × 16 000 мм',
    actual: `${BUILDING_WIDTH_MM} × ${BUILDING_LENGTH_MM} мм`,
    passed: BUILDING_WIDTH_MM === 30200 && BUILDING_LENGTH_MM === 16000,
    category: 'geometry'
  });

  // 2. Division into Service Block and Pool Hall
  checks.push({
    id: 'service_block',
    name: 'Банно-сервисный блок (Ширина)',
    expected: '14 200 мм (227.20 м²)',
    actual: `${SERVICE_BLOCK_WIDTH_MM} мм (${((SERVICE_BLOCK_WIDTH_MM * BUILDING_LENGTH_MM) / 1e6).toFixed(2)} м²)`,
    passed: SERVICE_BLOCK_WIDTH_MM === 14200,
    category: 'geometry'
  });

  checks.push({
    id: 'pool_hall',
    name: 'Бассейновый зал (Ширина)',
    expected: '16 000 мм (256.00 м²)',
    actual: `${POOL_HALL_WIDTH_MM} мм (${((POOL_HALL_WIDTH_MM * BUILDING_LENGTH_MM) / 1e6).toFixed(2)} м²)`,
    passed: POOL_HALL_WIDTH_MM === 16000,
    category: 'geometry'
  });

  // 3. Pool Basin Geometry & Coordinates
  const poolExpected = {
    xMin: 16200,
    xMax: 26200,
    yMin: 2000,
    yMax: 12000,
    w: 10000,
    l: 10000
  };
  const poolPassed =
    POOL_BASIN.xMin === poolExpected.xMin &&
    POOL_BASIN.xMax === poolExpected.xMax &&
    POOL_BASIN.yMin === poolExpected.yMin &&
    POOL_BASIN.yMax === poolExpected.yMax &&
    POOL_BASIN.widthMm === poolExpected.w &&
    POOL_BASIN.lengthMm === poolExpected.l;

  checks.push({
    id: 'pool_basin_coords',
    name: 'Чаша бассейна (10×10 м) координаты',
    expected: 'X: 16200..26200, Y: 2000..12000 (100.00 м²)',
    actual: `X: ${POOL_BASIN.xMin}..${POOL_BASIN.xMax}, Y: ${POOL_BASIN.yMin}..${POOL_BASIN.yMax} (${POOL_BASIN.areaM2.toFixed(2)} м²)`,
    passed: poolPassed,
    category: 'pool'
  });

  checks.push({
    id: 'pool_clearances',
    name: 'Проходы вокруг бассейна (Запад/Юг/Восток/Север)',
    expected: 'Запад: 2000 мм, Юг: 2000 мм, Восток: 4000 мм, Север: 4000 мм',
    actual: `Запад: ${POOL_BASIN.westClearanceMm} мм, Юг: ${POOL_BASIN.southClearanceMm} мм, Восток: ${POOL_BASIN.eastClearanceMm} мм, Север: ${POOL_BASIN.northClearanceMm} мм`,
    passed:
      POOL_BASIN.westClearanceMm === 2000 &&
      POOL_BASIN.southClearanceMm === 2000 &&
      POOL_BASIN.eastClearanceMm === 4000 &&
      POOL_BASIN.northClearanceMm === 4000,
    category: 'pool'
  });

  // 4. Room Coordinate Invariants
  const expectedRooms = [
    { id: 'room_tambur', name: 'Тамбур', x1: 0, x2: 3200, y1: 0, y2: 2000, s: 6.4 },
    { id: 'room_hall', name: 'Холл / Ресепшен', x1: 0, x2: 3200, y1: 2000, y2: 8000, s: 19.2 },
    { id: 'room_lounge', name: 'Зона отдыха', x1: 0, x2: 14200, y1: 8000, y2: 11000, s: 42.6 },
    { id: 'room_locker_male', name: 'Мужская раздевалка', x1: 3200, x2: 8700, y1: 3500, y2: 8000, s: 24.75 },
    { id: 'room_locker_female', name: 'Женская раздевалка', x1: 8700, x2: 14200, y1: 3500, y2: 8000, s: 24.75 },
    { id: 'room_shower_male', name: 'Мужская душевая', x1: 3200, x2: 6700, y1: 0, y2: 3500, s: 12.25 },
    { id: 'room_wc_male', name: 'С/У №1', x1: 6700, x2: 8700, y1: 0, y2: 3500, s: 7.0 },
    { id: 'room_wc_female', name: 'С/У №2', x1: 8700, x2: 10700, y1: 0, y2: 3500, s: 7.0 },
    { id: 'room_shower_female', name: 'Женская душевая', x1: 10700, x2: 14200, y1: 0, y2: 3500, s: 12.25 },
    { id: 'room_hamam', name: 'Хамам', x1: 0, x2: 3600, y1: 11000, y2: 16000, s: 18.0 },
    { id: 'room_sauna', name: 'Сауна', x1: 3600, x2: 7200, y1: 11000, y2: 16000, s: 18.0 },
    { id: 'room_steam', name: 'Парная', x1: 7200, x2: 11200, y1: 11000, y2: 16000, s: 20.0 },
    { id: 'room_tech', name: 'Техническое помещение', x1: 11200, x2: 14200, y1: 11000, y2: 16000, s: 15.0 }
  ];

  expectedRooms.forEach(er => {
    const found = ARCHITECTURAL_ROOMS.find(r => r.id === er.id);
    if (!found) {
      checks.push({
        id: `room_${er.id}`,
        name: `Помещение: ${er.name}`,
        expected: `X: ${er.x1}..${er.x2}, Y: ${er.y1}..${er.y2} (${er.s} м²)`,
        actual: 'НЕ НАЙДЕНО В БАЗЕ',
        passed: false,
        category: 'rooms'
      });
      return;
    }

    const matches =
      found.xMin === er.x1 &&
      found.xMax === er.x2 &&
      found.yMin === er.y1 &&
      found.yMax === er.y2 &&
      Math.abs(found.areaM2 - er.s) < 0.01;

    checks.push({
      id: `room_${er.id}`,
      name: `Помещение: ${er.name}`,
      expected: `X: ${er.x1}..${er.x2}, Y: ${er.y1}..${er.y2} (${er.s.toFixed(2)} м²)`,
      actual: `X: ${found.xMin}..${found.xMax}, Y: ${found.yMin}..${found.yMax} (${found.areaM2.toFixed(2)} м²)`,
      passed: matches,
      category: 'rooms'
    });
  });

  // 5. Origin and DXF formula verification
  checks.push({
    id: 'dxf_origin',
    name: 'Базовая точка привязки DXF (Origin)',
    expected: 'X0 = 4742.892832, Y0 = 2214.962910, Scale = 50',
    actual: `X0 = ${DXF_ORIGIN_X}, Y0 = ${DXF_ORIGIN_Y}, Scale = ${DXF_SCALE}`,
    passed: DXF_ORIGIN_X === 4742.892832 && DXF_ORIGIN_Y === 2214.962910 && DXF_SCALE === 50,
    category: 'dxf'
  });

  const passedCount = checks.filter(c => c.passed).length;

  return {
    isFullyCompliant: passedCount === checks.length,
    totalChecks: checks.length,
    passedChecks: passedCount,
    checks,
    timestamp: new Date().toLocaleTimeString('ru-RU')
  };
}
