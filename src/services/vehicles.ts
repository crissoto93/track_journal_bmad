import { getFirebase } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { 
  Vehicle, 
  CreateVehicleData, 
  UpdateVehicleData, 
  VehicleListResult, 
  VehicleResult,
  VehicleMake,
  VehicleModel
} from '../types/vehicle';

// Sample vehicle makes and models data (in a real app, this would come from an API or database)
const SAMPLE_MAKES: VehicleMake[] = [
  {
    id: '1',
    name: 'Toyota',
    models: [
      { id: '1', name: 'Camry', makeId: '1' },
      { id: '2', name: 'Corolla', makeId: '1' },
      { id: '3', name: 'Prius', makeId: '1' },
      { id: '4', name: 'RAV4', makeId: '1' },
      { id: '5', name: 'Highlander', makeId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Honda',
    models: [
      { id: '6', name: 'Civic', makeId: '2' },
      { id: '7', name: 'Accord', makeId: '2' },
      { id: '8', name: 'CR-V', makeId: '2' },
      { id: '9', name: 'Pilot', makeId: '2' },
      { id: '10', name: 'Odyssey', makeId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Ford',
    models: [
      { id: '11', name: 'F-150', makeId: '3' },
      { id: '12', name: 'Mustang', makeId: '3' },
      { id: '13', name: 'Explorer', makeId: '3' },
      { id: '14', name: 'Escape', makeId: '3' },
      { id: '15', name: 'Focus', makeId: '3' },
    ]
  },
  {
    id: '4',
    name: 'BMW',
    models: [
      { id: '16', name: '3 Series', makeId: '4' },
      { id: '17', name: '5 Series', makeId: '4' },
      { id: '18', name: 'X3', makeId: '4' },
      { id: '19', name: 'X5', makeId: '4' },
      { id: '20', name: 'M3', makeId: '4' },
    ]
  },
  {
    id: '5',
    name: 'Mercedes-Benz',
    models: [
      { id: '21', name: 'C-Class', makeId: '5' },
      { id: '22', name: 'E-Class', makeId: '5' },
      { id: '23', name: 'S-Class', makeId: '5' },
      { id: '24', name: 'GLC', makeId: '5' },
      { id: '25', name: 'GLE', makeId: '5' },
    ]
  },
];

export async function getVehicles(userId: string): Promise<VehicleListResult> {
  try {
    const firebase = await getFirebase();
    if (!firebase) {
      return {
        success: false,
        error: {
          code: 'firebase-not-initialized',
          message: 'Firebase is not properly initialized'
        }
      };
    }

    const vehiclesQuery = query(
      collection(firebase.db, 'vehicles'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(vehiclesQuery);
    const vehicles: Vehicle[] = [];

    querySnapshot.forEach((doc) => {
      vehicles.push({
        id: doc.id,
        ...doc.data()
      } as Vehicle);
    });

    return {
      success: true,
      vehicles
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred while fetching vehicles'
      }
    };
  }
}

export async function getVehicle(vehicleId: string): Promise<VehicleResult> {
  try {
    const firebase = await getFirebase();
    if (!firebase) {
      return {
        success: false,
        error: {
          code: 'firebase-not-initialized',
          message: 'Firebase is not properly initialized'
        }
      };
    }

    const vehicleDoc = await getDoc(doc(firebase.db, 'vehicles', vehicleId));
    
    if (!vehicleDoc.exists()) {
      return {
        success: false,
        error: {
          code: 'vehicle-not-found',
          message: 'Vehicle not found'
        }
      };
    }

    const vehicle: Vehicle = {
      id: vehicleDoc.id,
      ...vehicleDoc.data()
    } as Vehicle;

    return {
      success: true,
      vehicle
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred while fetching vehicle'
      }
    };
  }
}

export async function createVehicle(userId: string, vehicleData: CreateVehicleData): Promise<VehicleResult> {
  try {
    const firebase = await getFirebase();
    if (!firebase) {
      return {
        success: false,
        error: {
          code: 'firebase-not-initialized',
          message: 'Firebase is not properly initialized'
        }
      };
    }

    const vehicle: Omit<Vehicle, 'id'> = {
      userId,
      ...vehicleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(firebase.db, 'vehicles'), vehicle);
    
    const newVehicle: Vehicle = {
      id: docRef.id,
      ...vehicle
    } as Vehicle;

    return {
      success: true,
      vehicle: newVehicle
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred while creating vehicle'
      }
    };
  }
}

export async function updateVehicle(vehicleData: UpdateVehicleData): Promise<VehicleResult> {
  try {
    const firebase = await getFirebase();
    if (!firebase) {
      return {
        success: false,
        error: {
          code: 'firebase-not-initialized',
          message: 'Firebase is not properly initialized'
        }
      };
    }

    const { id, ...updateData } = vehicleData;
    
    await updateDoc(doc(firebase.db, 'vehicles', id), {
      ...updateData,
      updatedAt: serverTimestamp()
    });

    // Fetch the updated vehicle
    return await getVehicle(id);
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred while updating vehicle'
      }
    };
  }
}

export async function deleteVehicle(vehicleId: string): Promise<VehicleResult> {
  try {
    const firebase = await getFirebase();
    if (!firebase) {
      return {
        success: false,
        error: {
          code: 'firebase-not-initialized',
          message: 'Firebase is not properly initialized'
        }
      };
    }

    await deleteDoc(doc(firebase.db, 'vehicles', vehicleId));

    return {
      success: true
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'An unknown error occurred while deleting vehicle'
      }
    };
  }
}

export function subscribeToVehicles(userId: string, callback: (vehicles: Vehicle[]) => void): Unsubscribe {
  const firebase = getFirebase();
  if (!firebase) {
    // Return a no-op function if Firebase is not initialized
    return () => {};
  }

  const vehiclesQuery = query(
    collection(firebase.db, 'vehicles'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(vehiclesQuery, (querySnapshot) => {
    const vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({
        id: doc.id,
        ...doc.data()
      } as Vehicle);
    });
    callback(vehicles);
  });
}

// Vehicle makes and models functions
export async function getVehicleMakes(): Promise<VehicleMake[]> {
  // In a real app, this would fetch from an API
  // For now, return sample data
  return SAMPLE_MAKES;
}

export async function getVehicleModels(makeId: string): Promise<VehicleModel[]> {
  const makes = await getVehicleMakes();
  const make = makes.find(m => m.id === makeId);
  return make?.models || [];
}

export async function searchVehicleMakes(searchTerm: string): Promise<VehicleMake[]> {
  const makes = await getVehicleMakes();
  if (!searchTerm) return makes;
  
  return makes.filter(make => 
    make.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export async function searchVehicleModels(makeId: string, searchTerm: string): Promise<VehicleModel[]> {
  const models = await getVehicleModels(makeId);
  if (!searchTerm) return models;
  
  return models.filter(model => 
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
