export interface Room {
  id: string;
  name: string;
  category: 'pool' | 'bath' | 'service' | 'tech' | 'lounge';
  color: string;
  borderColor: string;
  x: number; // in meters
  y: number; // in meters
  width: number; // in meters
  height: number; // in meters
  area: number; // in m² (computed exactly as width * height)
  description: string;
  equipment?: string[];
  capacity?: string;
  hygieneZone?: 'clean' | 'wet' | 'thermal' | 'tech' | 'street';
}

export interface Door {
  id: string;
  code: string;
  name: string;
  type: 'main_entry' | 'tech_entry' | 'interior' | 'thermal_glass' | 'portal';
  x: number;
  y: number;
  width: number; // in mm
  orientation: 'horizontal' | 'vertical';
  swingDirection: 'left' | 'right' | 'up' | 'down' | 'sliding' | 'open_portal';
  fromRoomName: string;
  toRoomName: string;
  isExterior?: boolean;
}

export interface RouteWaypoint {
  id: string;
  x: number;
  y: number;
  label: string;
  action: string;
  roomName: string;
}

export interface FlowRoute {
  id: string;
  name: string;
  color: string;
  dashArray?: string;
  waypoints: RouteWaypoint[];
  description: string;
}

export interface ClearanceCheck {
  id: string;
  name: string;
  required: number; // in meters
  actual: number; // in meters
  isCompliant: boolean;
  formula: string;
  locationDescription: string;
}

export interface PlanVariant {
  id: 'variant_a' | 'variant_b' | 'variant_c';
  title: string;
  subtitle: string;
  conceptDescription: string;
  keyFeature: string;
  poolPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
    volume: number;
  };
  loungeZone: {
    x: number;
    y: number;
    width: number;
    height: number;
    area: number;
    description: string;
  };
  rooms: Room[];
  doors: Door[];
  visitorRoute: FlowRoute;
  technicalRoute: FlowRoute;
  clearanceChecks: ClearanceCheck[];
  grossArea: number;
  netArea: number;
  wallsArea: number;
  pros: string[];
  cons: string[];
}
