// =======================================================================
// EXACT ARCHITECTURAL COORDINATES & MATHEMATICAL MODEL (IN MILLIMETERS)
// According to Master Blueprint & Project BK-26-003-KR:
//
// ORIGIN:
// DXF X = 4742.892832
// DXF Y = 2214.962910
// LOCAL X = (DXF X - 4742.892832) * 50
// LOCAL Y = (DXF Y - 2214.962910) * 50
// Local Units = mm, X -> right, Y -> up
//
// BUILDING OUTLINE:
// P1 = (0, 0)
// P2 = (30200, 0)
// P3 = (30200, 16000)
// P4 = (0, 16000)
// OVERALL FOOTPRINT: 30 200 x 16 000 mm (483.20 m²)
// TERRACE / CANOPY: 30 200 x 4 000 mm (Total complex footprint 30.2 x 20.0 m = 604.0 m²)
// =======================================================================

export const DXF_ORIGIN_X = 4742.892832;
export const DXF_ORIGIN_Y = 2214.962910;
export const DXF_SCALE = 50;

export function localToDxf(localX: number, localY: number): { dxfX: number; dxfY: number } {
  return {
    dxfX: (localX / DXF_SCALE) + DXF_ORIGIN_X,
    dxfY: (localY / DXF_SCALE) + DXF_ORIGIN_Y
  };
}

export function dxfToLocal(dxfX: number, dxfY: number): { localX: number; localY: number } {
  return {
    localX: (dxfX - DXF_ORIGIN_X) * DXF_SCALE,
    localY: (dxfY - DXF_ORIGIN_Y) * DXF_SCALE
  };
}

export interface ArchitecturalRoom {
  id: string;
  num: string;
  name: string;
  category: 'dry' | 'wet' | 'bath' | 'pool' | 'tech';
  zoneName: string;
  // Exact coordinates in millimeters (origin: bottom-left corner = [0, 0])
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  widthMm: number;
  lengthMm: number;
  areaM2: number; // Computed: (widthMm * lengthMm) / 1_000_000
  targetOrientM2: number;
  color: string;
  borderColor: string;
  description: string;
  features: string[];
  equipment: string[];
}

export interface ArchitecturalDoor {
  id: string;
  code: string;
  name: string;
  fromRoom: string;
  toRoom: string;
  xMm: number;
  yMm: number;
  widthMm: number;
  orientation: 'horizontal' | 'vertical';
  swing: 'inward' | 'outward' | 'left' | 'right' | 'portal';
  isExterior?: boolean;
  type: 'main' | 'tech' | 'interior' | 'thermal' | 'portal';
}

// Master Building Constants
export const BUILDING_WIDTH_MM = 30200;
export const BUILDING_LENGTH_MM = 16000;
export const TOTAL_BUILDING_AREA_M2 = 483.20; // 30.20 x 16.00 m
export const TERRACE_DEPTH_MM = 4000;
export const TOTAL_COMPLEX_AREA_WITH_TERRACE_M2 = 604.00; // 30.20 x 20.00 m

export const BUILDING_WIDTH = 30.20;
export const BUILDING_HEIGHT = 16.00;
export const TOTAL_GROSS_AREA = 483.20;
export const TOTAL_NET_AREA = 483.20;

// Grid Partitions Axes
export const GRID_X_AXES = [0, 3200, 3600, 6700, 7200, 8700, 10700, 11200, 14200, 16200, 26200, 30200];
export const GRID_Y_AXES = [0, 2000, 3500, 8000, 11000, 12000, 16000];

// Main Functional Blocks
export const SERVICE_BLOCK_WIDTH_MM = 14200;
export const SERVICE_BLOCK_LENGTH_MM = 16000;
export const SERVICE_BLOCK_AREA_M2 = 227.20; // 14.20 x 16.00 m

export const POOL_HALL_WIDTH_MM = 16000; // 30200 - 14200 = 16000
export const POOL_HALL_LENGTH_MM = 16000;
export const POOL_HALL_AREA_M2 = 256.00; // 16.00 x 16.00 m

// Pool Basin Exact Geometry
export const POOL_BASIN = {
  xMin: 16200,
  xMax: 26200,
  yMin: 2000,
  yMax: 12000,
  widthMm: 10000,
  lengthMm: 10000,
  depthMinM: 1.40,
  depthMaxM: 1.80,
  depthM: 1.60,
  areaM2: 100.00,
  volumeM3: 160.00,
  // Clearances in pool hall:
  westClearanceMm: 2000,  // 16200 - 14200 = 2000 mm (проход слева)
  eastClearanceMm: 4000,  // 30200 - 26200 = 4000 mm (пляжная лаундж-зона справа)
  southClearanceMm: 2000, // 2000 - 0 = 2000 mm (проход снизу)
  northClearanceMm: 4000  // 16000 - 12000 = 4000 mm (лаундж и спа-зона сверху)
};

export const POOL_DIMENSIONS = {
  width: 10.0,
  length: 10.0,
  depthMin: 1.4,
  depthMax: 1.8,
  area: 100.0,
  volume: 160.0
};

export const REST_ZONE = {
  widthMm: 14200,
  lengthMm: 3000,
  areaM2: 42.60,
  totalPoolHallSurroundAreaM2: 156.00, // 256.00 - 100.00
  eastLoungeAreaM2: 64.00, // 4.0 x 16.0 m
  northLoungeAreaM2: 40.00, // 10.0 x 4.0 m
  westPassageAreaM2: 32.00, // 2.0 x 16.0 m
  southPassageAreaM2: 20.00  // 10.0 x 2.0 m
};

// =======================================================================
// EXACT ARCHITECTURAL ROOMS (VERIFIED FROM BLUEPRINT AND DXF COORDINATES)
// =======================================================================
export const ARCHITECTURAL_ROOMS: ArchitecturalRoom[] = [
  {
    id: 'room_tambur',
    num: '1',
    name: 'Тамбур',
    category: 'dry',
    zoneName: 'Входная группа',
    xMin: 0,
    xMax: 3200,
    yMin: 0,
    yMax: 2000,
    widthMm: 3200,
    lengthMm: 2000,
    areaM2: 6.40,
    targetOrientM2: 6.40,
    color: '#FEF08A',
    borderColor: '#EAB308',
    description: 'Входной тамбур с тепловой отсечкой холодного воздуха на южном фасаде. Защищает микроклимат комплекса.',
    features: [
      'Главный вход D1 шириной 1 200 мм с улицы',
      'Грязезащитный алюминиевый поддон с решёткой',
      'Воздушно-тепловая завеса скрытого монтажа',
      'Дверь D2 во Входной холл / ресепшен'
    ],
    equipment: ['Тепловая завеса 6 кВт', 'Грязезащитная решетка 1800x1000', 'Влагостойкий светильник IP65']
  },
  {
    id: 'room_hall',
    num: '2',
    name: 'Холл / Ресепшен',
    category: 'dry',
    zoneName: 'Входная группа',
    xMin: 0,
    xMax: 3200,
    yMin: 2000,
    yMax: 8000,
    widthMm: 3200,
    lengthMm: 6000,
    areaM2: 19.20,
    targetOrientM2: 19.20,
    color: '#FEF08A',
    borderColor: '#EAB308',
    description: 'Входной вестибюль с административной стойкой, зоной гардероба и распределением гостей.',
    features: [
      'Стойка ресепшен с терминалом бронирования',
      'Гардеробные шкафы для верхней одежды и обуви',
      'Мягкая зона ожидания с пуфами и столиком',
      'Дверь D3 в Мужскую раздевалку (X=3200)',
      'Широкий портал выхода в Зону отдыха (Y=8000)'
    ],
    equipment: ['Стойка администратора', 'Гардеробная система на 40 вешалок', 'Инфо-панель 55"', 'Кофе-станция']
  },
  {
    id: 'room_lounge',
    num: '3',
    name: 'Зона отдыха',
    category: 'dry',
    zoneName: 'Зона отдыха и релаксации',
    xMin: 0,
    xMax: 14200,
    yMin: 8000,
    yMax: 11000,
    widthMm: 14200,
    lengthMm: 3000,
    areaM2: 42.60,
    targetOrientM2: 42.60,
    color: '#BBF7D0',
    borderColor: '#22C55E',
    description: 'Центральный распределительный лаундж-холл 14.2 × 3.0 м. Объединяет банные парные, раздевалки и бассейновый зал.',
    features: [
      'Прямой доступ ко всем трем парным: Хамам, Сауна, Парная',
      'Выходы из Мужской и Женской раздевалок',
      'Широкий открытый портал D_pool (X=14200) в Бассейновый зал',
      'Диванные группы, чайный фито-бар, столы из массива дуба',
      'Шумопоглощающие стеновые панели и мягкая теплая подсветка'
    ],
    equipment: ['Модульные диваны на 16 персон', 'Чайный бар с самоваром', 'Фито-витрина', 'Акустическая система мультирум']
  },
  {
    id: 'room_locker_male',
    num: '4',
    name: 'Мужская раздевалка',
    category: 'dry',
    zoneName: 'Раздевальный блок',
    xMin: 3200,
    xMax: 8700,
    yMin: 3500,
    yMax: 8000,
    widthMm: 5500,
    lengthMm: 4500,
    areaM2: 24.75,
    targetOrientM2: 24.75,
    color: '#FED7AA',
    borderColor: '#F97316',
    description: 'Просторная мужская раздевалка 5.5 × 4.5 м с прямым доступом в мужскую душевую, с/у №1, холл и зону отдыха.',
    features: [
      '24 двухсекционных шкафчика с электронными RFID-замками',
      'Скамьи из натурального ясеня',
      'Зеркала в полный рост с профессиональными фенами',
      'Выход в Мужскую душевую (D_m_shw) и С/У №1 (D_m_wc)',
      'Выход в центральную Зону отдыха (D_m_out)'
    ],
    equipment: ['Шкафы индивидуальные 24 шт.', 'Скамьи гардеробные 4 шт.', 'Зеркала с LED подсветкой 3 шт.', 'Фены Dyson Pro 3 шт.']
  },
  {
    id: 'room_locker_female',
    num: '5',
    name: 'Женская раздевалка',
    category: 'dry',
    zoneName: 'Раздевальный блок',
    xMin: 8700,
    xMax: 14200,
    yMin: 3500,
    yMax: 8000,
    widthMm: 5500,
    lengthMm: 4500,
    areaM2: 24.75,
    targetOrientM2: 24.75,
    color: '#FED7AA',
    borderColor: '#F97316',
    description: 'Изолированная женская раздевалка 5.5 × 4.5 м с бьюти-зоной, отдельной душевой, с/у №2 и выходом в зону отдыха.',
    features: [
      '24 двухсекционных шкафчика с RFID-замками',
      'Туалетные столики для макияжа и ухода',
      'Ростовые зеркала, фены высокой мощности',
      'Выход в Женскую душевую (D_w_shw) и С/У №2 (D_w_wc)',
      'Выход в центральную Зону отдыха (D_w_out)'
    ],
    equipment: ['Шкафы индивидуальные 24 шт.', 'Бьюти-столы с зеркалами 4 шт.', 'Профессиональные фены 4 шт.', 'Банкетки мягкие']
  },
  {
    id: 'room_shower_male',
    num: '6',
    name: 'Мужская душевая',
    category: 'wet',
    zoneName: 'Водно-санитарный блок',
    xMin: 3200,
    xMax: 6700,
    yMin: 0,
    yMax: 3500,
    widthMm: 3500,
    lengthMm: 3500,
    areaM2: 12.25,
    targetOrientM2: 12.25,
    color: '#BAE6FD',
    borderColor: '#0284C7',
    description: 'Мужская душевая 3.5 × 3.5 м на 4 поста с обливным устройством «Ливень» и теплыми полами.',
    features: [
      '4 душевых поста со скрытыми смесителями термостатами',
      'Обливное ведро-водопад 50 л из лиственницы',
      'Щелевые трапы из нержавеющей стали AISI 316',
      'Влагостойкая отделка крупноформатным керамогранитом'
    ],
    equipment: ['Душевые стойки Hansgrohe 4 шт.', 'Обливное ведро «Каскад» 50л', 'Щелевой трап Viega 3000мм']
  },
  {
    id: 'room_wc_male',
    num: '7',
    name: 'С/У №1 (Мужской)',
    category: 'wet',
    zoneName: 'Водно-санитарный блок',
    xMin: 6700,
    xMax: 8700,
    yMin: 0,
    yMax: 3500,
    widthMm: 2000,
    lengthMm: 3500,
    areaM2: 7.00,
    targetOrientM2: 7.00,
    color: '#BAE6FD',
    borderColor: '#0284C7',
    description: 'Санузел мужской зоны с индивидуальными закрытыми кабинками, писсуаром и умывальниками.',
    features: [
      '2 изолированные кабины с инсталляциями унитазов',
      '1 настенный писсуар с сенсорным смывом',
      'Двойной умывальник с сенсорными смесителями и дозаторами',
      'Принудительная вытяжная вентиляция'
    ],
    equipment: ['Подвесные унитазы Geberit 2 шт.', 'Писсуар с сенсором 1 шт.', 'Столешница с 2 раковинами']
  },
  {
    id: 'room_wc_female',
    num: '8',
    name: 'С/У №2 (Женский)',
    category: 'wet',
    zoneName: 'Водно-санитарный блок',
    xMin: 8700,
    xMax: 10700,
    yMin: 0,
    yMax: 3500,
    widthMm: 2000,
    lengthMm: 3500,
    areaM2: 7.00,
    targetOrientM2: 7.00,
    color: '#BAE6FD',
    borderColor: '#0284C7',
    description: 'Санузел женской зоны с индивидуальными закрытыми кабинками, биде и умывальниками.',
    features: [
      '2 изолированные кабины с унитазами и гигиеническим душем',
      'Двойная раковина со скрытыми смесителями',
      'Большое зеркало с подсветкой и сенсорные сушилки',
      'Принудительная вентиляция 150 м³/ч'
    ],
    equipment: ['Подвесные унитазы 2 шт.', 'Гигиенические души 2 шт.', 'Раковины в монолите 2 шт.', 'Сушилка для рук Dyson']
  },
  {
    id: 'room_shower_female',
    num: '9',
    name: 'Женская душевая',
    category: 'wet',
    zoneName: 'Водно-санитарный блок',
    xMin: 10700,
    xMax: 14200,
    yMin: 0,
    yMax: 3500,
    widthMm: 3500,
    lengthMm: 3500,
    areaM2: 12.25,
    targetOrientM2: 12.25,
    color: '#BAE6FD',
    borderColor: '#0284C7',
    description: 'Женская душевая 3.5 × 3.5 м на 4 поста с мягким тропическим душем, обливным устройством и спа-полками.',
    features: [
      '4 душевых поста с тропическими лейками 300 мм',
      'Обливной каскадный душ 35 л',
      'Ниши для спа-косметики с LED-подсветкой',
      'Противоскользящий керамогранит R11'
    ],
    equipment: ['Тропические души 4 шт.', 'Обливной душ 35 л', 'Трап с сухим затвором 3000 мм']
  },
  {
    id: 'room_hamam',
    num: '10',
    name: 'Хамам',
    category: 'bath',
    zoneName: 'Термальный блок',
    xMin: 0,
    xMax: 3600,
    yMin: 11000,
    yMax: 16000,
    widthMm: 3600,
    lengthMm: 5000,
    areaM2: 18.00,
    targetOrientM2: 18.00,
    color: '#DDD6FE',
    borderColor: '#8B5CF6',
    description: 'Восточный хамам 3.6 × 5.0 м. Влажный микроклимат (100% влажность, 45-50°C), подогреваемые мраморные лежаки.',
    features: [
      'Анатомические лежаки из натурального мрамора с водяным подогревом',
      'Купольный потолок с системой «Звёздное небо» на оптоволокне',
      'Курна из цельного оникса с медными чашами и кранами',
      'Парогенератор с дозатором натуральных эвкалиптовых ароматов',
      'Дверь из закаленного стекла 8 мм с магнитной фиксацией'
    ],
    equipment: ['Парогенератор TyloHelo 18 кВт', 'Мраморные чебек-таши 3 шт.', 'Ониксовая курна', 'Оптоволоконное звездное небо 150 точек']
  },
  {
    id: 'room_sauna',
    num: '11',
    name: 'Сауна',
    category: 'bath',
    zoneName: 'Термальный блок',
    xMin: 3600,
    xMax: 7200,
    yMin: 11000,
    yMax: 16000,
    widthMm: 3600,
    lengthMm: 5000,
    areaM2: 18.00,
    targetOrientM2: 18.00,
    color: '#DDD6FE',
    borderColor: '#8B5CF6',
    description: 'Финская сухая сауна 3.6 × 5.0 м (90-110°C, 10-15% влажность). Отделка термокедром и гималайской солью.',
    features: [
      '3-уровневые парящие полки из канадского кедра и абаша',
      'Мощная электрическая каменка Harvia Club с выносным пультом',
      'Панно из блоков розовой гималайской соли с янтарной подсветкой',
      'Система мягкой вентиляции с притоком под каменку'
    ],
    equipment: ['Электрокаменка Harvia Club Pro 20 кВт', 'Блоки гималайской соли 4.5 м²', 'Полки из абаша 3 яруса', 'Стеклянный фасад']
  },
  {
    id: 'room_steam',
    num: '12',
    name: 'Парная (Русская баня)',
    category: 'bath',
    zoneName: 'Термальный блок',
    xMin: 7200,
    xMax: 11200,
    yMin: 11000,
    yMax: 16000,
    widthMm: 4000,
    lengthMm: 5000,
    areaM2: 20.00,
    targetOrientM2: 20.00,
    color: '#DDD6FE',
    borderColor: '#8B5CF6',
    description: 'Классическая русская парная 4.0 × 5.0 м (60-70°C, 50-65% влажность) с кирпичной печью и широкими полками.',
    features: [
      'Массивная теплоемкая печь в талькохлорите с закрытой чугунной каменкой',
      'Широкие полки 1 200 мм для парения вениками двумя мастерами',
      'Специфическая приточно-вытяжная вентиляция «Басту»',
      'Потолок из сухостойной карельской сосны Kelo'
    ],
    equipment: ['Печь с закрытой каменкой на 250 кг жадеита', 'Широкие банные полки Kelo', 'Система вентиляции Басту', 'Купель/трап']
  },
  {
    id: 'room_tech',
    num: '13',
    name: 'Техническое помещение',
    category: 'tech',
    zoneName: 'Технический блок',
    xMin: 11200,
    xMax: 14200,
    yMin: 11000,
    yMax: 16000,
    widthMm: 3000,
    lengthMm: 5000,
    areaM2: 15.00,
    targetOrientM2: 15.00,
    color: '#E2E8F0',
    borderColor: '#64748B',
    description: 'Инженерный узел 3.0 × 5.0 м: вентиляционная установка бассейна, водоподготовка, щиты автоматики.',
    features: [
      'Приточно-вытяжная вентиляция с осушением и рекуперацией тепла',
      'Станция фильтрации, дезинфекции и подогрева воды бассейна',
      'Главный распределительный щит комплекса (ГРЩ)',
      'Бойлерная группа косвенного нагрева ГВС'
    ],
    equipment: ['Вентмашина с осушителем Dantherm 3500 м³/ч', 'Песочные фильтры 2x800 мм', 'УФ-обеззараживатель 80 Вт', 'Щит ГРЩ 100 кВт']
  },
  {
    id: 'room_pool_hall',
    num: '14',
    name: 'Бассейновый зал',
    category: 'pool',
    zoneName: 'Аква-зона бассейна',
    xMin: 14200,
    xMax: 30200,
    yMin: 0,
    yMax: 16000,
    widthMm: 16000,
    lengthMm: 16000,
    areaM2: 256.00,
    targetOrientM2: 256.00,
    color: '#E0F2FE',
    borderColor: '#38BDF8',
    description: 'Грандиозный зал бассейна 16.0 × 16.0 м (256 м²). Включает чашу 10×10 м и 156 м² пляжной зоны и обходных дорожек.',
    features: [
      'Чаша бассейна 10.0 × 10.0 м (глубина 1.40–1.80 м, объем 160 м³)',
      'Восточная пляжная зона шириной 4.0 м с шезлонгами у витража',
      'Северная зона отдыха шириной 4.0 м с лежаками и гидромассажем',
      'Западный проход 2.0 м к зоне отдыха и банному блоку',
      'Южный обходной проход 2.0 м с выходом на летнюю террасу',
      'Витражное панорамное остекление на восток и юг'
    ],
    equipment: [
      'Чаша монолитная железобетонная 10x10 м',
      'Противоток UWE JetStream 70 м³/ч',
      'Водопад «Кобра» полированная нержавеющая сталь',
      '12 эргономичных шезлонгов из тика',
      'Подводные светодиодные RGBW прожекторы 8 шт.'
    ]
  }
];

// Functional zones summary for zoning map
export interface FunctionalZone {
  id: string;
  name: string;
  area: number;
  color: string;
  borderColor: string;
  rooms: string[];
}

export const FUNCTIONAL_ZONES: FunctionalZone[] = [
  {
    id: 'zone_pool',
    name: 'Аква-зона бассейна',
    area: 256.00,
    color: '#0284c7',
    borderColor: '#38bdf8',
    rooms: ['Чаша бассейна 10×10 м (100.0 м²)', 'Пляжная зона отдыха и обходные дорожки (156.0 м²)']
  },
  {
    id: 'zone_thermal',
    name: 'Термально-банный блок',
    area: 56.00,
    color: '#8b5cf6',
    borderColor: '#a78bfa',
    rooms: ['Хамам (18.0 м²)', 'Финская сауна (18.0 м²)', 'Русская парная (20.0 м²)']
  },
  {
    id: 'zone_lounge',
    name: 'Центральная зона отдыха (Лаундж)',
    area: 42.60,
    color: '#10b981',
    borderColor: '#34d399',
    rooms: ['Центральный распределительный лаундж 14.2×3.0 м (42.6 м²)']
  },
  {
    id: 'zone_lockers',
    name: 'Раздевальный блок (Муж/Жен)',
    area: 49.50,
    color: '#f97316',
    borderColor: '#fb923c',
    rooms: ['Мужская раздевалка (24.75 м²)', 'Женская раздевалка (24.75 м²)']
  },
  {
    id: 'zone_wet',
    name: 'Водно-санитарный блок',
    area: 38.50,
    color: '#06b6d4',
    borderColor: '#22d3ee',
    rooms: ['Мужская душевая (12.25 м²)', 'С/У №1 Мужской (7.0 м²)', 'С/У №2 Женский (7.0 м²)', 'Женская душевая (12.25 м²)']
  },
  {
    id: 'zone_entrance',
    name: 'Входная группа',
    area: 25.60,
    color: '#eab308',
    borderColor: '#fde047',
    rooms: ['Тамбур (6.4 м²)', 'Холл / Ресепшен (19.2 м²)']
  },
  {
    id: 'zone_tech',
    name: 'Инженерно-технический узел',
    area: 15.00,
    color: '#64748b',
    borderColor: '#94a3b8',
    rooms: ['Техническое помещение венткамеры и водоподготовки (15.0 м²)']
  }
];

// =======================================================================
// DOORS SCHEDULE (EXACT CODES, LOCATIONS, SIZES)
// =======================================================================
export const ARCHITECTURAL_DOORS: ArchitecturalDoor[] = [
  {
    id: 'door_d1',
    code: 'D1',
    name: 'Главный вход в комплекс',
    fromRoom: 'Улица (Южный фасад)',
    toRoom: 'Тамбур',
    xMm: 1600,
    yMm: 0,
    widthMm: 1200,
    orientation: 'horizontal',
    swing: 'outward',
    isExterior: true,
    type: 'main'
  },
  {
    id: 'door_d2',
    code: 'D2',
    name: 'Входной тамбурный шлюз',
    fromRoom: 'Тамбур',
    toRoom: 'Холл / Ресепшен',
    xMm: 1600,
    yMm: 2000,
    widthMm: 1000,
    orientation: 'horizontal',
    swing: 'inward',
    type: 'interior'
  },
  {
    id: 'door_d3_hall_male',
    code: 'D3',
    name: 'Вход в мужскую раздевалку',
    fromRoom: 'Холл / Ресепшен',
    toRoom: 'Мужская раздевалка',
    xMm: 3200,
    yMm: 5750,
    widthMm: 1000,
    orientation: 'vertical',
    swing: 'right',
    type: 'interior'
  },
  {
    id: 'door_d4_hall_lounge',
    code: 'D4',
    name: 'Портал из холла в зону отдыха',
    fromRoom: 'Холл / Ресепшен',
    toRoom: 'Зона отдыха',
    xMm: 1600,
    yMm: 8000,
    widthMm: 1800,
    orientation: 'horizontal',
    swing: 'portal',
    type: 'portal'
  },
  {
    id: 'door_d5_male_lounge',
    code: 'D5',
    name: 'Выход из мужской раздевалки в зону отдыха',
    fromRoom: 'Мужская раздевалка',
    toRoom: 'Зона отдыха',
    xMm: 5950,
    yMm: 8000,
    widthMm: 1000,
    orientation: 'horizontal',
    swing: 'outward',
    type: 'interior'
  },
  {
    id: 'door_d6_female_lounge',
    code: 'D6',
    name: 'Выход из женской раздевалки в зону отдыха',
    fromRoom: 'Женская раздевалка',
    toRoom: 'Зона отдыха',
    xMm: 11450,
    yMm: 8000,
    widthMm: 1000,
    orientation: 'horizontal',
    swing: 'outward',
    type: 'interior'
  },
  {
    id: 'door_d7_male_shower',
    code: 'D7',
    name: 'Вход в мужскую душевую',
    fromRoom: 'Мужская раздевалка',
    toRoom: 'Мужская душевая',
    xMm: 4950,
    yMm: 3500,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'inward',
    type: 'interior'
  },
  {
    id: 'door_d8_male_wc',
    code: 'D8',
    name: 'Вход в мужской санузел №1',
    fromRoom: 'Мужская раздевалка',
    toRoom: 'С/У №1 (Мужской)',
    xMm: 7700,
    yMm: 3500,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'inward',
    type: 'interior'
  },
  {
    id: 'door_d9_female_wc',
    code: 'D9',
    name: 'Вход в женский санузел №2',
    fromRoom: 'Женская раздевалка',
    toRoom: 'С/У №2 (Женский)',
    xMm: 9700,
    yMm: 3500,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'inward',
    type: 'interior'
  },
  {
    id: 'door_d10_female_shower',
    code: 'D10',
    name: 'Вход в женскую душевую',
    fromRoom: 'Женская раздевалка',
    toRoom: 'Женская душевая',
    xMm: 12450,
    yMm: 3500,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'inward',
    type: 'interior'
  },
  {
    id: 'door_d11_hamam',
    code: 'D11',
    name: 'Вход в хамам',
    fromRoom: 'Зона отдыха',
    toRoom: 'Хамам',
    xMm: 1800,
    yMm: 11000,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'outward',
    type: 'thermal'
  },
  {
    id: 'door_d12_sauna',
    code: 'D12',
    name: 'Вход в финскую сауну',
    fromRoom: 'Зона отдыха',
    toRoom: 'Сауна',
    xMm: 5400,
    yMm: 11000,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'outward',
    type: 'thermal'
  },
  {
    id: 'door_d13_steam',
    code: 'D13',
    name: 'Вход в русскую парную',
    fromRoom: 'Зона отдыха',
    toRoom: 'Парная (Русская баня)',
    xMm: 9200,
    yMm: 11000,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'outward',
    type: 'thermal'
  },
  {
    id: 'door_d14_tech',
    code: 'D14',
    name: 'Вход в техническое помещение',
    fromRoom: 'Зона отдыха',
    toRoom: 'Техническое помещение',
    xMm: 12700,
    yMm: 11000,
    widthMm: 900,
    orientation: 'horizontal',
    swing: 'inward',
    type: 'tech'
  },
  {
    id: 'door_d15_pool_portal',
    code: 'D15',
    name: 'Панорамный портал в бассейновый зал',
    fromRoom: 'Зона отдыха',
    toRoom: 'Бассейновый зал',
    xMm: 14200,
    yMm: 9500,
    widthMm: 3000,
    orientation: 'vertical',
    swing: 'portal',
    type: 'portal'
  },
  {
    id: 'door_d16_terrace',
    code: 'D16',
    name: 'Раздвижной портал на террасу',
    fromRoom: 'Бассейновый зал',
    toRoom: 'Летняя терраса (Юг)',
    xMm: 21200,
    yMm: 0,
    widthMm: 3000,
    orientation: 'horizontal',
    swing: 'portal',
    isExterior: true,
    type: 'portal'
  }
];

// Routes for visitor flow & staff flow
export const VISITOR_ROUTE_POINTS = [
  { x: 1600, y: 0, label: 'Вход с улицы' },
  { x: 1600, y: 1000, label: 'Тамбур' },
  { x: 1600, y: 5000, label: 'Ресепшен' },
  { x: 5950, y: 5750, label: 'Мужская раздевалка' },
  { x: 4950, y: 1750, label: 'Душевая' },
  { x: 5950, y: 9500, label: 'Зона отдыха' },
  { x: 1800, y: 13500, label: 'Хамам' },
  { x: 5400, y: 13500, label: 'Сауна' },
  { x: 9200, y: 13500, label: 'Русская парная' },
  { x: 14200, y: 9500, label: 'Проход в бассейн' },
  { x: 21200, y: 7000, label: 'Бассейн 10х10 м' },
  { x: 28200, y: 7000, label: 'Пляжная зона отдыха' }
];

export const TECHNICAL_ROUTE_POINTS = [
  { x: 12700, y: 16000, label: 'Северный сервисный вход' },
  { x: 12700, y: 13500, label: 'Техническое помещение' },
  { x: 12700, y: 9500, label: 'Обслуживание лаунджа' },
  { x: 15200, y: 14000, label: 'Трасса водоподготовки бассейна' }
];
