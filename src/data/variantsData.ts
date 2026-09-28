import { PlanVariant } from '../types/architecture';

export const BUILDING_WIDTH = 20.00;
export const BUILDING_HEIGHT = 15.00;
export const TOTAL_GROSS_AREA = 300.00;

// ============================================================================
// ВАРИАНТ А: «Свободный бассейн и компактный банный кластер»
// Бассейн по центру зала, банный блок сгруппирован в западном крыле.
// ============================================================================
export const VARIANT_A: PlanVariant = {
  id: 'variant_a',
  title: 'Вариант А: Свободный бассейн и компактный банный кластер',
  subtitle: 'Сбалансированная классическая компоновка с равномерными круговыми обходами',
  conceptDescription:
    'Бассейн 10×10 м расположен свободно в центре бассейнового зала с широкими симметричными проходами. Входная сухая группа и компактный банный блок объединены в западном крыле здания. Душевой блок выступает центральным санитарным фильтром-шлюзом.',
  keyFeature: 'Равномерные широкие проходы со всех 4 сторон бассейна (боковые 2.50 м, торцевые 1.50–2.00 м).',
  grossArea: 300.00,
  netArea: 275.40,
  wallsArea: 24.60,
  poolPosition: {
    x: 8.50,
    y: 2.50,
    width: 10.00,
    height: 10.00,
    depth: 1.40,
    volume: 140.00
  },
  loungeZone: {
    x: 8.00,
    y: 0.30,
    width: 11.40,
    height: 2.20,
    area: 25.08,
    description: 'Линейная зона отдыха с шезлонгами вдоль южного витражного фасада с прямым видом на бассейн.'
  },
  rooms: [
    {
      id: 'a_tambour',
      name: '1. Тамбур главного входа',
      category: 'service',
      color: '#E2E8F0',
      borderColor: '#94A3B8',
      x: 0.30,
      y: 0.30,
      width: 2.50,
      height: 2.00,
      area: 5.00,
      description: 'Тепловой тамбур-шлюз на главном южном фасаде с грязезащитой.',
      hygieneZone: 'street',
      equipment: ['Тепловая завеса', 'Грязезащитный ковер']
    },
    {
      id: 'a_hall',
      name: '2. Входной холл / Гардероб',
      category: 'service',
      color: '#FEF3C7',
      borderColor: '#F59E0B',
      x: 0.30,
      y: 2.30,
      width: 3.50,
      height: 3.40,
      area: 11.90,
      description: 'Вестибюль со стойкой встречи гостей, гардеробом верхней одежды и пуфами.',
      hygieneZone: 'clean',
      equipment: ['Ресепшн', 'Гардеробная система', 'Зеркало во весь рост']
    },
    {
      id: 'a_wc',
      name: '3. Гостевой санузел (WC)',
      category: 'service',
      color: '#E0E7FF',
      borderColor: '#6366F1',
      x: 3.80,
      y: 0.30,
      width: 2.70,
      height: 2.00,
      area: 5.40,
      description: 'Санузел при входной группе, доступный без захода в раздевалку и душевые.',
      hygieneZone: 'clean',
      equipment: ['Подвесной унитаз', 'Раковина', 'Сушилка для рук']
    },
    {
      id: 'a_locker',
      name: '4. Раздевалка (муж/жен)',
      category: 'service',
      color: '#FED7AA',
      borderColor: '#F97316',
      x: 0.30,
      y: 5.70,
      width: 3.50,
      height: 4.30,
      area: 15.05,
      description: 'Индивидуальные шкафчики, скамьи из тика, зона сушки волос и зеркал.',
      hygieneZone: 'clean',
      equipment: ['24 шкафа с электронными замками', 'Скамьи', 'Консоль с фенами']
    },
    {
      id: 'a_showers',
      name: '5. Душевой блок (мокрый хаб)',
      category: 'bath',
      color: '#BAE6FD',
      borderColor: '#0284C7',
      x: 3.80,
      y: 2.30,
      width: 2.70,
      height: 7.70,
      area: 20.79,
      description: 'Центральный распределительный мокрый узел. Соединяет раздевалку, все три парные и бассейновый зал.',
      hygieneZone: 'wet',
      equipment: ['6 душевых кабин', 'Обливное ведро', 'Теплый пол со сливными трапами']
    },
    {
      id: 'a_banya',
      name: '6. Русская парная',
      category: 'bath',
      color: '#FED7AA',
      borderColor: '#EA580C',
      x: 0.30,
      y: 10.00,
      width: 3.20,
      height: 2.70,
      area: 8.64,
      description: 'Влажный пар 60°C/60%. Массивная кирпично-каменная печь, двухъярусные кедровые полки.',
      hygieneZone: 'thermal',
      capacity: '6–8 человек'
    },
    {
      id: 'a_sauna',
      name: '7. Финская сауна',
      category: 'bath',
      color: '#FDE68A',
      borderColor: '#D97706',
      x: 3.50,
      y: 10.00,
      width: 3.00,
      height: 2.40,
      area: 7.20,
      description: 'Сухой пар 90–100°C. Электрокаменка, отделка термоабашем, стеклянная дверь.',
      hygieneZone: 'thermal',
      capacity: '5–6 человек'
    },
    {
      id: 'a_hammam',
      name: '8. Турецкий хамам',
      category: 'bath',
      color: '#CCFBF1',
      borderColor: '#0D9488',
      x: 3.50,
      y: 12.40,
      width: 3.00,
      height: 2.30,
      area: 6.90,
      description: 'Мягкий влажный пар 45°C/100%. Мраморные подогреваемые лавки, купольный свод, курна.',
      hygieneZone: 'thermal',
      capacity: '4–5 человек'
    },
    {
      id: 'a_tech_pool',
      name: '9. Тех. помещение бассейна',
      category: 'tech',
      color: '#F1F5F9',
      borderColor: '#64748B',
      x: 0.30,
      y: 12.70,
      width: 3.20,
      height: 2.00,
      area: 6.40,
      description: 'Фильтрация, циркуляционные насосы, дозирование реагентов и станция химводоподготовки.',
      hygieneZone: 'tech'
    },
    {
      id: 'a_tech_eng',
      name: '10. Инженерное помещение (Вент/ТН)',
      category: 'tech',
      color: '#E2E8F0',
      borderColor: '#475569',
      x: 6.50,
      y: 12.70,
      width: 2.00,
      height: 2.00,
      area: 4.00,
      description: 'Приточно-вытяжная система с рекуператором и осушителем бассейна DanX, тепловой насос, ГРЩ.',
      hygieneZone: 'tech'
    },
    {
      id: 'a_lounge',
      name: '11. Зона отдыха / Lounge',
      category: 'lounge',
      color: '#FEF08A',
      borderColor: '#CA8A04',
      x: 8.00,
      y: 0.30,
      width: 11.40,
      height: 2.20,
      area: 25.08,
      description: 'Открытая зона отдыха рядом с чашей бассейна, шезлонги, столики для чаепития.',
      hygieneZone: 'wet'
    },
    {
      id: 'a_pool_hall',
      name: '12. Бассейновый зал с чашей 10×10 м',
      category: 'pool',
      color: '#F0F9FF',
      borderColor: '#0284C7',
      x: 6.50,
      y: 0.30,
      width: 13.20,
      height: 14.40,
      area: 190.08,
      description: 'Просторный двухсветный зал с монолитным бассейном 10×10 м (h=1.40 м, 140 м³) и панорамным остеклением.',
      hygieneZone: 'wet'
    }
  ],
  doors: [
    {
      id: 'd_a_01',
      code: 'D01',
      name: 'Главный вход (Улица → Тамбур)',
      type: 'main_entry',
      x: 1.55,
      y: 0.30,
      width: 1100,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Улица (Южный фасад)',
      toRoomName: 'Тамбур главного входа',
      isExterior: true
    },
    {
      id: 'd_a_02',
      code: 'D02',
      name: 'Тамбур → Входной холл',
      type: 'interior',
      x: 1.55,
      y: 2.30,
      width: 1000,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Тамбур',
      toRoomName: 'Входной холл'
    },
    {
      id: 'd_a_03',
      code: 'D03',
      name: 'Холл → Гостевой WC',
      type: 'interior',
      x: 3.80,
      y: 1.30,
      width: 800,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Входной холл',
      toRoomName: 'Гостевой санузел'
    },
    {
      id: 'd_a_04',
      code: 'D04',
      name: 'Холл → Раздевалка',
      type: 'interior',
      x: 2.05,
      y: 5.70,
      width: 900,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Входной холл',
      toRoomName: 'Раздевалка'
    },
    {
      id: 'd_a_05',
      code: 'D05',
      name: 'Раздевалка → Душевой блок',
      type: 'interior',
      x: 3.80,
      y: 7.20,
      width: 900,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Раздевалка',
      toRoomName: 'Душевой блок'
    },
    {
      id: 'd_a_06',
      code: 'D06',
      name: 'Душ → Русская парная',
      type: 'thermal_glass',
      x: 2.00,
      y: 10.00,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевой блок',
      toRoomName: 'Русская парная'
    },
    {
      id: 'd_a_07',
      code: 'D07',
      name: 'Душ → Финская сауна',
      type: 'thermal_glass',
      x: 4.80,
      y: 10.00,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевой блок',
      toRoomName: 'Финская сауна'
    },
    {
      id: 'd_a_08',
      code: 'D08',
      name: 'Душ → Турецкий хамам',
      type: 'thermal_glass',
      x: 4.80,
      y: 12.40,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевой блок',
      toRoomName: 'Турецкий хамам'
    },
    {
      id: 'd_a_09',
      code: 'D09',
      name: 'Душ → Бассейновый зал (Портал)',
      type: 'portal',
      x: 6.50,
      y: 6.00,
      width: 1400,
      orientation: 'vertical',
      swingDirection: 'open_portal',
      fromRoomName: 'Душевой блок',
      toRoomName: 'Бассейновый зал'
    },
    {
      id: 'd_a_10',
      code: 'D10',
      name: 'Технический вход (Улица → Тех. блок)',
      type: 'tech_entry',
      x: 1.80,
      y: 14.70,
      width: 900,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Улица (Северный фасад)',
      toRoomName: 'Тех. помещение бассейна',
      isExterior: true
    },
    {
      id: 'd_a_11',
      code: 'D11',
      name: 'Тех. бассейна → Венткамера',
      type: 'interior',
      x: 3.50,
      y: 13.70,
      width: 900,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Тех. помещение бассейна',
      toRoomName: 'Инженерное помещение'
    }
  ],
  visitorRoute: {
    id: 'v_route_a',
    name: 'Маршрут посетителя (Синий)',
    color: '#38BDF8',
    description: 'Улица → Главный вход → Тамбур → Холл → Раздевалка → Душ → Парная/Сауна/Хамам → Бассейн → Зона отдыха',
    waypoints: [
      { id: 'va1', x: 1.55, y: -0.5, label: '1. Улица', action: 'Главный вход', roomName: 'Южный фасад' },
      { id: 'va2', x: 1.55, y: 1.3, label: '2. Тамбур', action: 'Тепловой шлюз', roomName: 'Тамбур' },
      { id: 'va3', x: 1.80, y: 3.8, label: '3. Холл', action: 'Ресепшн / Оформление', roomName: 'Входной холл' },
      { id: 'va4', x: 1.80, y: 7.8, label: '4. Раздевалка', action: 'Шкафчики / Переодевание', roomName: 'Раздевалка' },
      { id: 'va5', x: 5.15, y: 6.0, label: '5. Душевой блок', action: 'Гигиенический душ', roomName: 'Душевые' },
      { id: 'va6a', x: 1.90, y: 11.3, label: '6a. Русская парная', action: 'Парение', roomName: 'Парная' },
      { id: 'va6b', x: 5.00, y: 11.2, label: '6b. Сауна', action: 'Прогрев', roomName: 'Сауна' },
      { id: 'va6c', x: 5.00, y: 13.5, label: '6c. Хамам', action: 'Влажный пар', roomName: 'Хамам' },
      { id: 'va7', x: 7.50, y: 6.0, label: '7. Выход к воде', action: 'Портал в бассейновый зал', roomName: 'Бассейновый зал' },
      { id: 'va8', x: 13.50, y: 7.5, label: '8. Бассейн 10×10 м', action: 'Плавание (140 м³)', roomName: 'Чаша бассейна' },
      { id: 'va9', x: 13.50, y: 1.4, label: '9. Зона отдыха', action: 'Шезлонги / Релакс', roomName: 'Lounge' }
    ]
  },
  technicalRoute: {
    id: 't_route_a',
    name: 'Технический маршрут (Красный)',
    color: '#EF4444',
    dashArray: '6 4',
    description: 'Улица (Север) → Технический вход → Водоподготовка бассейна → Венткамера / ТН',
    waypoints: [
      { id: 'ta1', x: 1.80, y: 15.5, label: '1. Улица (Север)', action: 'Служебный подъезд', roomName: 'Северный фасад' },
      { id: 'ta2', x: 1.80, y: 13.7, label: '2. Водоподготовка', action: 'Обслуживание насосов и фильтров', roomName: 'Тех. бассейна' },
      { id: 'ta3', x: 7.50, y: 13.7, label: '3. Венткамера / ТН', action: 'Контроль климата DanX', roomName: 'Инженерная' }
    ]
  },
  clearanceChecks: [
    {
      id: 'ca_north',
      name: 'Северный боковой проход бассейна',
      required: 2.50,
      actual: 2.50,
      isCompliant: true,
      formula: '15.00 (фасад) - 12.50 (борт) = 2.50 м ≥ 2.50 м',
      locationDescription: 'Широкая дорожка вдоль северной стены зала'
    },
    {
      id: 'ca_south',
      name: 'Южный боковой проход / Зона отдыха',
      required: 2.50,
      actual: 2.50,
      isCompliant: true,
      formula: '2.50 (борт) - 0.00 (фасад) = 2.50 м ≥ 2.50 м',
      locationDescription: 'Южная дорожка с интегрированными шезлонгами'
    },
    {
      id: 'ca_east',
      name: 'Восточный торцевой проход (Витраж)',
      required: 1.50,
      actual: 1.50,
      isCompliant: true,
      formula: '20.00 (фасад) - 18.50 (борт) = 1.50 м ≥ 1.50 м',
      locationDescription: 'Панорамная галерея вдоль восточного остекления'
    },
    {
      id: 'ca_west',
      name: 'Западный торцевой проход (Входной)',
      required: 1.50,
      actual: 2.00,
      isCompliant: true,
      formula: '8.50 (борт) - 6.50 (стена) = 2.00 м ≥ 1.50 м',
      locationDescription: 'Распределительная зона перед выходом из душа'
    }
  ],
  pros: [
    'Симметричные и свободные круговые обходы вокруг всей чаши 10×10 м.',
    'Четкая логика разделения сухой входной группы и мокрого банного блока.',
    'Кратчайший путь из раздевалки через душевой шлюз в парные и к бассейну.',
    'Техническая зона полностью обособлена на северной стороне с отдельным входом.'
  ],
  cons: [
    'Зона отдыха вытянута вдоль южной стороны в виде линейной галереи без глубокого обособленного лаундж-пространства.',
    'Русская парная не имеет прямого панорамного остекления на зеркало воды.'
  ]
};

// ============================================================================
// ВАРИАНТ Б: «Смещённый бассейн и расширенный панорамный Lounge»
// Бассейн смещён к северному фасаду, формируя южный глубокий SPA-лаундж (45+ м²).
// ============================================================================
export const VARIANT_B: PlanVariant = {
  id: 'variant_b',
  title: 'Вариант Б: Смещённый бассейн и расширенный панорамный Lounge',
  subtitle: 'Максимизация площади комфортного отдыха, шезлонгов и чайного лаунджа',
  conceptDescription:
    'Чаша бассейна 10×10 м смещена к северной стороне здания (с сохранением нормативного прохода 1.50 м), что высвобождает на южной солнечной стороне огромную открытую Зону Отдыха (более 46 м²). В ней размещаются двухместные шезлонги, диванные группы и чайный бар с прямым видом на воду.',
  keyFeature: 'Большая обособленная Зона Отдыха 46.2 м² на южном панорамном фасаде + смещение бассейна к северу.',
  grossArea: 300.00,
  netArea: 276.10,
  wallsArea: 23.90,
  poolPosition: {
    x: 8.50,
    y: 3.50,
    width: 10.00,
    height: 10.00,
    depth: 1.40,
    volume: 140.00
  },
  loungeZone: {
    x: 8.50,
    y: 0.30,
    width: 11.20,
    height: 3.20,
    area: 35.84,
    description: 'Глубокая премиальная лаундж-зона с мягкими диванами, 10 шезлонгами и прямым выходом к воде.'
  },
  rooms: [
    {
      id: 'b_tambour',
      name: '1. Тамбур главного входа',
      category: 'service',
      color: '#E2E8F0',
      borderColor: '#94A3B8',
      x: 0.30,
      y: 0.30,
      width: 2.40,
      height: 2.20,
      area: 5.28,
      description: 'Входной тепловой шлюз с двойными автоматическими дверями.',
      hygieneZone: 'street'
    },
    {
      id: 'b_hall',
      name: '2. Входной холл / Ресепшн',
      category: 'service',
      color: '#FEF3C7',
      borderColor: '#F59E0B',
      x: 0.30,
      y: 2.50,
      width: 3.60,
      height: 3.20,
      area: 11.52,
      description: 'Просторный холл с гардеробом и прямым выходом в гостевой WC и раздевалку.',
      hygieneZone: 'clean'
    },
    {
      id: 'b_wc',
      name: '3. Гостевой санузел (WC)',
      category: 'service',
      color: '#E0E7FF',
      borderColor: '#6366F1',
      x: 2.70,
      y: 0.30,
      width: 2.30,
      height: 2.20,
      area: 5.06,
      description: 'Гостевой санузел с двумя умывальниками, расположенный в чистой зоне.',
      hygieneZone: 'clean'
    },
    {
      id: 'b_locker',
      name: '4. Раздевалка (муж/жен)',
      category: 'service',
      color: '#FED7AA',
      borderColor: '#F97316',
      x: 0.30,
      y: 5.70,
      width: 3.60,
      height: 4.50,
      area: 16.20,
      description: 'Раздевалка с расширенным количеством шкафчиков и бьюти-зоной.',
      hygieneZone: 'clean'
    },
    {
      id: 'b_showers',
      name: '5. Душевой комплекс (хаб)',
      category: 'bath',
      color: '#BAE6FD',
      borderColor: '#0284C7',
      x: 3.90,
      y: 2.50,
      width: 2.60,
      height: 7.70,
      area: 20.02,
      description: 'Мокрый санитарный блок с тропическими душами и обливным ведром.',
      hygieneZone: 'wet'
    },
    {
      id: 'b_banya',
      name: '6. Русская парная',
      category: 'bath',
      color: '#FED7AA',
      borderColor: '#EA580C',
      x: 0.30,
      y: 10.20,
      width: 3.20,
      height: 2.60,
      area: 8.32,
      description: 'Традиционная парная с закрытой каменкой на дровах/электричестве.',
      hygieneZone: 'thermal'
    },
    {
      id: 'b_sauna',
      name: '7. Финская сауна',
      category: 'bath',
      color: '#FDE68A',
      borderColor: '#D97706',
      x: 3.50,
      y: 10.20,
      width: 3.00,
      height: 2.40,
      area: 7.20,
      description: 'Сухая сауна с панорамной стеклянной стеной в сторону душевого холла.',
      hygieneZone: 'thermal'
    },
    {
      id: 'b_hammam',
      name: '8. Турецкий хамам',
      category: 'bath',
      color: '#CCFBF1',
      borderColor: '#0D9488',
      x: 3.50,
      y: 12.60,
      width: 3.00,
      height: 2.10,
      area: 6.30,
      description: 'Паровая кабина с подогреваемым чебек-таши и ароматерапией.',
      hygieneZone: 'thermal'
    },
    {
      id: 'b_tech_pool',
      name: '9. Тех. помещение бассейна',
      category: 'tech',
      color: '#F1F5F9',
      borderColor: '#64748B',
      x: 0.30,
      y: 12.80,
      width: 3.20,
      height: 1.90,
      area: 6.08,
      description: 'Техническое помещение водоподготовки с автономным входом.',
      hygieneZone: 'tech'
    },
    {
      id: 'b_tech_eng',
      name: '10. Инженерная (Вент/ТН)',
      category: 'tech',
      color: '#E2E8F0',
      borderColor: '#475569',
      x: 6.50,
      y: 12.60,
      width: 2.00,
      height: 2.10,
      area: 4.20,
      description: 'Осушители DanX, рекуператоры, тепловой насос и электрощитовая.',
      hygieneZone: 'tech'
    },
    {
      id: 'b_lounge',
      name: '11. Большая зона отдыха (SPA Lounge)',
      category: 'lounge',
      color: '#FEF08A',
      borderColor: '#CA8A04',
      x: 8.50,
      y: 0.30,
      width: 11.20,
      height: 3.20,
      area: 35.84,
      description: 'Выделенная просторная зона отдыха вдоль южного витража с шезлонгами и чайной зоной.',
      hygieneZone: 'wet'
    },
    {
      id: 'b_pool_hall',
      name: '12. Бассейновый зал 10×10 м',
      category: 'pool',
      color: '#F0F9FF',
      borderColor: '#0284C7',
      x: 6.50,
      y: 0.30,
      width: 13.20,
      height: 14.40,
      area: 190.08,
      description: 'Зал бассейна со смещением чаши к северу для максимального расширения зоны отдыха.',
      hygieneZone: 'wet'
    }
  ],
  doors: [
    {
      id: 'd_b_01',
      code: 'D01',
      name: 'Главный вход (Улица → Тамбур)',
      type: 'main_entry',
      x: 1.50,
      y: 0.30,
      width: 1100,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Улица',
      toRoomName: 'Тамбур',
      isExterior: true
    },
    {
      id: 'd_b_02',
      code: 'D02',
      name: 'Тамбур → Холл',
      type: 'interior',
      x: 1.50,
      y: 2.50,
      width: 1000,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Тамбур',
      toRoomName: 'Входной холл'
    },
    {
      id: 'd_b_03',
      code: 'D03',
      name: 'Холл → Санузел (WC)',
      type: 'interior',
      x: 2.70,
      y: 1.40,
      width: 800,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Входной холл',
      toRoomName: 'Санузел'
    },
    {
      id: 'd_b_04',
      code: 'D04',
      name: 'Холл → Раздевалка',
      type: 'interior',
      x: 2.10,
      y: 5.70,
      width: 900,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Входной холл',
      toRoomName: 'Раздевалка'
    },
    {
      id: 'd_b_05',
      code: 'D05',
      name: 'Раздевалка → Душевые',
      type: 'interior',
      x: 3.90,
      y: 7.20,
      width: 900,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Раздевалка',
      toRoomName: 'Душевые'
    },
    {
      id: 'd_b_06',
      code: 'D06',
      name: 'Душ → Русская парная',
      type: 'thermal_glass',
      x: 2.00,
      y: 10.20,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевые',
      toRoomName: 'Русская парная'
    },
    {
      id: 'd_b_07',
      code: 'D07',
      name: 'Душ → Финская сауна',
      type: 'thermal_glass',
      x: 4.80,
      y: 10.20,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевые',
      toRoomName: 'Финская сауна'
    },
    {
      id: 'd_b_08',
      code: 'D08',
      name: 'Душ → Хамам',
      type: 'thermal_glass',
      x: 4.80,
      y: 12.60,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевые',
      toRoomName: 'Хамам'
    },
    {
      id: 'd_b_09',
      code: 'D09',
      name: 'Душ → Бассейн и Lounge (Портал)',
      type: 'portal',
      x: 6.50,
      y: 5.50,
      width: 1400,
      orientation: 'vertical',
      swingDirection: 'open_portal',
      fromRoomName: 'Душевые',
      toRoomName: 'Бассейновый зал'
    },
    {
      id: 'd_b_10',
      code: 'D10',
      name: 'Технический вход (Север)',
      type: 'tech_entry',
      x: 1.80,
      y: 14.70,
      width: 900,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Улица',
      toRoomName: 'Тех. бассейна',
      isExterior: true
    },
    {
      id: 'd_b_11',
      code: 'D11',
      name: 'Тех. бассейна → Венткамера',
      type: 'interior',
      x: 3.50,
      y: 13.80,
      width: 900,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Тех. бассейна',
      toRoomName: 'Инженерная'
    }
  ],
  visitorRoute: {
    id: 'v_route_b',
    name: 'Маршрут посетителя (Синий)',
    color: '#38BDF8',
    description: 'Улица → Вход → Холл → Раздевалка → Душ → Парные → Бассейн → Большой Южный Lounge',
    waypoints: [
      { id: 'vb1', x: 1.50, y: -0.5, label: '1. Улица', action: 'Главный вход', roomName: 'Южный фасад' },
      { id: 'vb2', x: 1.50, y: 1.4, label: '2. Тамбур', action: 'Тепловой шлюз', roomName: 'Тамбур' },
      { id: 'vb3', x: 1.80, y: 4.0, label: '3. Холл', action: 'Ресепшн / Оформление', roomName: 'Входной холл' },
      { id: 'vb4', x: 1.80, y: 8.0, label: '4. Раздевалка', action: 'Шкафчики', roomName: 'Раздевалка' },
      { id: 'vb5', x: 5.20, y: 5.5, label: '5. Душевой блок', action: 'Мокрый хаб', roomName: 'Душевые' },
      { id: 'vb6a', x: 1.90, y: 11.4, label: '6a. Русская парная', action: 'Парение', roomName: 'Парная' },
      { id: 'vb6b', x: 5.00, y: 11.4, label: '6b. Сауна', action: 'Прогрев', roomName: 'Сауна' },
      { id: 'vb6c', x: 5.00, y: 13.6, label: '6c. Хамам', action: 'Влажный пар', roomName: 'Хамам' },
      { id: 'vb7', x: 7.50, y: 5.5, label: '7. Выход к воде', action: 'Портал в зал', roomName: 'Бассейновый зал' },
      { id: 'vb8', x: 13.50, y: 8.5, label: '8. Бассейн 10×10 м', action: 'Плавание', roomName: 'Бассейн' },
      { id: 'vb9', x: 14.00, y: 1.8, label: '9. Большой Lounge', action: 'Релаксация / Чай', roomName: 'SPA Lounge' }
    ]
  },
  technicalRoute: {
    id: 't_route_b',
    name: 'Технический маршрут (Красный)',
    color: '#EF4444',
    dashArray: '6 4',
    description: 'Улица (Север) → Технический вход → Водоподготовка → Инженерная венткамера',
    waypoints: [
      { id: 'tb1', x: 1.80, y: 15.5, label: '1. Улица (Север)', action: 'Служебный подъезд', roomName: 'Север' },
      { id: 'tb2', x: 1.80, y: 13.8, label: '2. Водоподготовка', action: 'Фильтрация', roomName: 'Тех. бассейна' },
      { id: 'tb3', x: 7.50, y: 13.6, label: '3. Венткамера', action: 'Климат DanX', roomName: 'Инженерная' }
    ]
  },
  clearanceChecks: [
    {
      id: 'cb_north',
      name: 'Северный торцевой проход бассейна',
      required: 1.50,
      actual: 1.50,
      isCompliant: true,
      formula: '15.00 (фасад) - 13.50 (борт) = 1.50 м ≥ 1.50 м',
      locationDescription: 'Технологический проход вдоль северной глухой стены'
    },
    {
      id: 'cb_south',
      name: 'Южный боковой проход / Большой Lounge',
      required: 2.50,
      actual: 3.50,
      isCompliant: true,
      formula: '3.50 (борт) - 0.00 (фасад) = 3.50 м ≥ 2.50 м (Норма перевыполнена!)',
      locationDescription: 'Широкая пляжная терраса с шезлонгами и чайной зоной'
    },
    {
      id: 'cb_east',
      name: 'Восточный торцевой проход (Витраж)',
      required: 1.50,
      actual: 1.50,
      isCompliant: true,
      formula: '20.00 (фасад) - 18.50 (борт) = 1.50 м ≥ 1.50 м',
      locationDescription: 'Проход вдоль восточного панорамного фасада'
    },
    {
      id: 'cb_west',
      name: 'Западный торцевой проход (Входной)',
      required: 1.50,
      actual: 2.00,
      isCompliant: true,
      formula: '8.50 (борт) - 6.50 (стена) = 2.00 м ≥ 1.50 м',
      locationDescription: 'Зона выхода из душевой группы к воде'
    }
  ],
  pros: [
    'Максимально просторная, залитая солнцем Зона Отдыха (35.84 м² чистой площади лаунджа).',
    'Возможность разместить полноценную группу шезлонгов, столики и бар безалкогольных напитков.',
    'Четкое деление на "активную водную зону" и "спокойную релакс-зону".',
    'Все нормативные требования по проходам соблюдены.'
  ],
  cons: [
    'Северный проход уменьшен до 1.50 м (норма для торца, достаточная для обслуживания, но без шезлонгов).'
  ]
};

// ============================================================================
// ВАРИАНТ В: «Прямой визуальный и пространственный контакт Парной и Воды»
// Русская парная имеет панорамное остекление на бассейн и прямой экспресс-выход.
// ============================================================================
export const VARIANT_V: PlanVariant = {
  id: 'variant_c',
  title: 'Вариант В: Визуальный контакт Парной и Воды с экспресс-выходом к бассейну',
  subtitle: 'Премиальный банный акцент: панорамное окно из парной на водную гладь 10×10 м',
  conceptDescription:
    'Русская парная вынесена на границу с бассейновым залом и оснащена жаропрочным панорамным стеклом во всю стену. Парящиеся видят открытую гладь бассейна. Предусмотрен как гигиенический маршрут через душевые, так и выделенный прямой шлюз "Парная → Купель / Бассейн".',
  keyFeature: 'Панорамное жаропрочное остекление Русской парной на бассейн 10×10 м + экспресс-доступ к воде.',
  grossArea: 300.00,
  netArea: 275.80,
  wallsArea: 24.20,
  poolPosition: {
    x: 8.50,
    y: 2.50,
    width: 10.00,
    height: 10.00,
    depth: 1.40,
    volume: 140.00
  },
  loungeZone: {
    x: 8.50,
    y: 0.30,
    width: 11.20,
    height: 2.20,
    area: 24.64,
    description: 'Зона отдыха с шезлонгами с панорамным обзором бассейна и стеклянного фасада парной.'
  },
  rooms: [
    {
      id: 'v_tambour',
      name: '1. Тамбур главного входа',
      category: 'service',
      color: '#E2E8F0',
      borderColor: '#94A3B8',
      x: 0.30,
      y: 0.30,
      width: 2.50,
      height: 2.00,
      area: 5.00,
      description: 'Главный тепловой шлюз.',
      hygieneZone: 'street'
    },
    {
      id: 'v_hall',
      name: '2. Входной холл / Гардероб',
      category: 'service',
      color: '#FEF3C7',
      borderColor: '#F59E0B',
      x: 0.30,
      y: 2.30,
      width: 3.50,
      height: 3.40,
      area: 11.90,
      description: 'Входной вестибюль с зоной ресепшн и гардеробом.',
      hygieneZone: 'clean'
    },
    {
      id: 'v_wc',
      name: '3. Гостевой санузел (WC)',
      category: 'service',
      color: '#E0E7FF',
      borderColor: '#6366F1',
      x: 3.80,
      y: 0.30,
      width: 2.70,
      height: 2.00,
      area: 5.40,
      description: 'Санузел при входе, не требующий захода в мокрую зону.',
      hygieneZone: 'clean'
    },
    {
      id: 'v_locker',
      name: '4. Раздевалка (чистая зона)',
      category: 'service',
      color: '#FED7AA',
      borderColor: '#F97316',
      x: 0.30,
      y: 5.70,
      width: 3.50,
      height: 4.30,
      area: 15.05,
      description: 'Раздевалка с прямым проходом в душевую галерею.',
      hygieneZone: 'clean'
    },
    {
      id: 'v_showers',
      name: '5. Душевая галерея (мокрый хаб)',
      category: 'bath',
      color: '#BAE6FD',
      borderColor: '#0284C7',
      x: 3.80,
      y: 2.30,
      width: 2.70,
      height: 7.70,
      area: 20.79,
      description: 'Проходная душевая галерея с обливными устройствами и ножными ванночками.',
      hygieneZone: 'wet'
    },
    {
      id: 'v_banya',
      name: '6. Панорамная Русская парная',
      category: 'bath',
      color: '#FED7AA',
      borderColor: '#EA580C',
      x: 3.50,
      y: 10.00,
      width: 3.00,
      height: 3.20,
      area: 9.60,
      description: 'Премиум-парная с панорамным жаростойким стеклом на бассейн 10×10 м и печью с закрытой каменкой.',
      hygieneZone: 'thermal',
      capacity: '8–10 человек'
    },
    {
      id: 'v_sauna',
      name: '7. Финская сауна',
      category: 'bath',
      color: '#FDE68A',
      borderColor: '#D97706',
      x: 0.30,
      y: 10.00,
      width: 3.20,
      height: 2.40,
      area: 7.68,
      description: 'Сухая сауна с полками из кедра и подсветкой соляных панелей.',
      hygieneZone: 'thermal'
    },
    {
      id: 'v_hammam',
      name: '8. Турецкий хамам',
      category: 'bath',
      color: '#CCFBF1',
      borderColor: '#0D9488',
      x: 0.30,
      y: 12.40,
      width: 3.20,
      height: 2.30,
      area: 7.36,
      description: 'Хамам с массажным мраморным столом и подогреваемым полом.',
      hygieneZone: 'thermal'
    },
    {
      id: 'v_tech_pool',
      name: '9. Тех. помещение бассейна',
      category: 'tech',
      color: '#F1F5F9',
      borderColor: '#64748B',
      x: 3.50,
      y: 13.20,
      width: 3.00,
      height: 1.50,
      area: 4.50,
      description: 'Фильтрационное оборудование и дозация.',
      hygieneZone: 'tech'
    },
    {
      id: 'v_tech_eng',
      name: '10. Инженерная (Вент/ТН)',
      category: 'tech',
      color: '#E2E8F0',
      borderColor: '#475569',
      x: 6.50,
      y: 12.70,
      width: 2.00,
      height: 2.00,
      area: 4.00,
      description: 'Климатический блок осушения и вентиляции DanX.',
      hygieneZone: 'tech'
    },
    {
      id: 'v_lounge',
      name: '11. Зона отдыха / Lounge',
      category: 'lounge',
      color: '#FEF08A',
      borderColor: '#CA8A04',
      x: 8.50,
      y: 0.30,
      width: 11.20,
      height: 2.20,
      area: 24.64,
      description: 'Зона отдыха у воды с шезлонгами.',
      hygieneZone: 'wet'
    },
    {
      id: 'v_pool_hall',
      name: '12. Бассейновый зал с панорамной парной',
      category: 'pool',
      color: '#F0F9FF',
      borderColor: '#0284C7',
      x: 6.50,
      y: 0.30,
      width: 13.20,
      height: 14.40,
      area: 190.08,
      description: 'Зал бассейна, объединенный визуально со стеклянным фасадом русской парной.',
      hygieneZone: 'wet'
    }
  ],
  doors: [
    {
      id: 'd_v_01',
      code: 'D01',
      name: 'Главный вход (Улица → Тамбур)',
      type: 'main_entry',
      x: 1.55,
      y: 0.30,
      width: 1100,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Улица',
      toRoomName: 'Тамбур',
      isExterior: true
    },
    {
      id: 'd_v_02',
      code: 'D02',
      name: 'Тамбур → Холл',
      type: 'interior',
      x: 1.55,
      y: 2.30,
      width: 1000,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Тамбур',
      toRoomName: 'Холл'
    },
    {
      id: 'd_v_03',
      code: 'D03',
      name: 'Холл → Санузел (WC)',
      type: 'interior',
      x: 3.80,
      y: 1.30,
      width: 800,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Холл',
      toRoomName: 'Санузел'
    },
    {
      id: 'd_v_04',
      code: 'D04',
      name: 'Холл → Раздевалка',
      type: 'interior',
      x: 2.05,
      y: 5.70,
      width: 900,
      orientation: 'horizontal',
      swingDirection: 'up',
      fromRoomName: 'Холл',
      toRoomName: 'Раздевалка'
    },
    {
      id: 'd_v_05',
      code: 'D05',
      name: 'Раздевалка → Душевая галерея',
      type: 'interior',
      x: 3.80,
      y: 7.20,
      width: 900,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Раздевалка',
      toRoomName: 'Душевая галерея'
    },
    {
      id: 'd_v_06',
      code: 'D06',
      name: 'Душ → Панорамная парная',
      type: 'thermal_glass',
      x: 4.80,
      y: 10.00,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевая галерея',
      toRoomName: 'Панорамная парная'
    },
    {
      id: 'd_v_07',
      code: 'D07',
      name: 'Душ → Финская сауна',
      type: 'thermal_glass',
      x: 2.00,
      y: 10.00,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевая галерея',
      toRoomName: 'Финская сауна'
    },
    {
      id: 'd_v_08',
      code: 'D08',
      name: 'Душ → Хамам',
      type: 'thermal_glass',
      x: 2.00,
      y: 12.40,
      width: 800,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Душевая галерея',
      toRoomName: 'Хамам'
    },
    {
      id: 'd_v_09',
      code: 'D09',
      name: 'Душ → Бассейн (Главный портал)',
      type: 'portal',
      x: 6.50,
      y: 6.00,
      width: 1400,
      orientation: 'vertical',
      swingDirection: 'open_portal',
      fromRoomName: 'Душевая галерея',
      toRoomName: 'Бассейновый зал'
    },
    {
      id: 'd_v_10',
      code: 'D10',
      name: 'Технический вход (Север)',
      type: 'tech_entry',
      x: 5.00,
      y: 14.70,
      width: 900,
      orientation: 'horizontal',
      swingDirection: 'down',
      fromRoomName: 'Улица',
      toRoomName: 'Тех. бассейна',
      isExterior: true
    },
    {
      id: 'd_v_11',
      code: 'D11',
      name: 'Тех. бассейна → Венткамера',
      type: 'interior',
      x: 6.50,
      y: 13.70,
      width: 900,
      orientation: 'vertical',
      swingDirection: 'right',
      fromRoomName: 'Тех. бассейна',
      toRoomName: 'Инженерная'
    }
  ],
  visitorRoute: {
    id: 'v_route_v',
    name: 'Маршрут посетителя (Синий)',
    color: '#38BDF8',
    description: 'Улица → Вход → Холл → Раздевалка → Душ → Панорамная парная (вид на бассейн) → Бассейн 10×10 м → Lounge',
    waypoints: [
      { id: 'vc1', x: 1.55, y: -0.5, label: '1. Улица', action: 'Главный вход', roomName: 'Южный фасад' },
      { id: 'vc2', x: 1.55, y: 1.3, label: '2. Тамбур', action: 'Шлюз', roomName: 'Тамбур' },
      { id: 'vc3', x: 1.80, y: 3.8, label: '3. Холл', action: 'Ресепшн', roomName: 'Холл' },
      { id: 'vc4', x: 1.80, y: 7.8, label: '4. Раздевалка', action: 'Шкафы', roomName: 'Раздевалка' },
      { id: 'vc5', x: 5.15, y: 6.0, label: '5. Душевая галерея', action: 'Подготовка к пару', roomName: 'Душевые' },
      { id: 'vc6', x: 5.00, y: 11.5, label: '6. Панорамная парная', action: 'Парение с видом на бассейн', roomName: 'Парная' },
      { id: 'vc7', x: 7.50, y: 6.0, label: '7. Экспресс-выход', action: 'Выход к воде', roomName: 'Бассейновый зал' },
      { id: 'vc8', x: 13.50, y: 7.5, label: '8. Бассейн 10×10 м', action: 'Погружение в воду', roomName: 'Бассейн' },
      { id: 'vc9', x: 13.50, y: 1.4, label: '9. Lounge', action: 'Релакс', roomName: 'Зона отдыха' }
    ]
  },
  technicalRoute: {
    id: 't_route_v',
    name: 'Технический маршрут (Красный)',
    color: '#EF4444',
    dashArray: '6 4',
    description: 'Улица (Север) → Техвход → Водоподготовка → Венткамера DanX',
    waypoints: [
      { id: 'tc1', x: 5.00, y: 15.5, label: '1. Улица (Север)', action: 'Служебный подъезд', roomName: 'Север' },
      { id: 'tc2', x: 5.00, y: 13.8, label: '2. Водоподготовка', action: 'Сервис фильтров', roomName: 'Тех. бассейна' },
      { id: 'tc3', x: 7.50, y: 13.7, label: '3. Венткамера', action: 'Климат', roomName: 'Инженерная' }
    ]
  },
  clearanceChecks: [
    {
      id: 'cv_north',
      name: 'Северный боковой проход бассейна',
      required: 2.50,
      actual: 2.50,
      isCompliant: true,
      formula: '15.00 (фасад) - 12.50 (борт) = 2.50 м ≥ 2.50 м',
      locationDescription: 'Проход вдоль северной стороны'
    },
    {
      id: 'cv_south',
      name: 'Южный боковой проход / Lounge',
      required: 2.50,
      actual: 2.50,
      isCompliant: true,
      formula: '2.50 (борт) - 0.00 (фасад) = 2.50 м ≥ 2.50 м',
      locationDescription: 'Южная дорожка с шезлонгами'
    },
    {
      id: 'cv_east',
      name: 'Восточный торцевой проход (Витраж)',
      required: 1.50,
      actual: 1.50,
      isCompliant: true,
      formula: '20.00 (фасад) - 18.50 (борт) = 1.50 м ≥ 1.50 м',
      locationDescription: 'Обход у панорамного остекления'
    },
    {
      id: 'cv_west',
      name: 'Западный торцевой проход (Перед парной)',
      required: 1.50,
      actual: 2.00,
      isCompliant: true,
      formula: '8.50 (борт) - 6.50 (стекло парной) = 2.00 м ≥ 1.50 м',
      locationDescription: 'Пространство между стеклом парной и бортом бассейна'
    }
  ],
  pros: [
    'Эффектная архитектурная интеграция: гости в парной видят водную гладь 10×10 м через панорамное жаропрочное стекло.',
    'Кратчайший путь для контрастного охлаждения после парения.',
    'Компактная планировка при сохранении просторного бассейнового зала.',
    'Полная изоляция технического блока на северном фасаде.'
  ],
  cons: [
    'Требует установки дорогостоящего жаропрочного триплекса с гидрофобным напылением между парной и залом бассейна.'
  ]
};

export const ALL_VARIANTS: PlanVariant[] = [VARIANT_A, VARIANT_B, VARIANT_V];
