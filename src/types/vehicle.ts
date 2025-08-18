export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  engine?: string;
  transmission?: string;
  color?: string;
  vin?: string;
  licensePlate?: string;
  notes?: string;
  createdAt: any; // Firestore timestamp
  updatedAt: any; // Firestore timestamp
}

export type VehicleType = 'car' | 'motorcycle' | 'truck' | 'bike';

export interface CreateVehicleData {
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  engine?: string;
  transmission?: string;
  color?: string;
  vin?: string;
  licensePlate?: string;
  notes?: string;
}

export interface UpdateVehicleData extends Partial<CreateVehicleData> {
  id: string;
}

export interface VehicleListResult {
  success: boolean;
  vehicles?: Vehicle[];
  error?: {
    code: string;
    message: string;
  };
}

export interface VehicleResult {
  success: boolean;
  vehicle?: Vehicle;
  error?: {
    code: string;
    message: string;
  };
}

export interface VehicleMake {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface VehicleModel {
  id: string;
  name: string;
  makeId: string;
}

// Vehicle validation
export interface VehicleValidationErrors {
  make?: string;
  model?: string;
  year?: string;
  type?: string;
  engine?: string;
  transmission?: string;
  color?: string;
  vin?: string;
  licensePlate?: string;
  notes?: string;
}

export const VEHICLE_TYPES: { value: VehicleType; label: string; icon: string }[] = [
  { value: 'car', label: 'Car', icon: 'car' },
  { value: 'motorcycle', label: 'Motorcycle', icon: 'motorbike' },
  { value: 'truck', label: 'Truck', icon: 'truck' },
  { value: 'bike', label: 'Bike', icon: 'bike' },
];

export const TRANSMISSION_TYPES = [
  'Manual',
  'Automatic',
  'CVT',
  'Semi-Automatic',
  'Dual-Clutch',
] as const;

export type TransmissionType = typeof TRANSMISSION_TYPES[number];
