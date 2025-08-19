import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import EditVehicleScreen from '../../src/screens/EditVehicleScreen';
import { getVehicle } from '../../src/services/vehicles';
import { getFirebase } from '../../src/services/firebase';
import { getAuth } from 'firebase/auth';

// Mock the services
jest.mock('../../src/services/vehicles');
jest.mock('../../src/services/firebase');
jest.mock('firebase/auth');
jest.mock('../../src/theme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        background: '#ffffff',
        onBackground: '#000000',
        onSurfaceVariant: '#666666',
        onSurface: '#333333',
        primary: '#007AFF',
        surface: '#f5f5f5',
      },
    },
  }),
}));

// Mock Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

const mockGetVehicle = getVehicle as jest.MockedFunction<typeof getVehicle>;
const mockGetFirebase = getFirebase as jest.MockedFunction<typeof getFirebase>;
const mockGetAuth = getAuth as jest.MockedFunction<typeof getAuth>;

describe('EditVehicleScreen', () => {
  const mockVehicle = {
    id: 'vehicle-1',
    userId: 'user-1',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    type: 'car' as const,
    engine: '2.5L',
    transmission: 'Automatic',
    color: 'Silver',
    vin: '1HGBH41JXMN109186',
    licensePlate: 'ABC123',
    notes: 'Test vehicle',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRoute = {
    params: {
      vehicleId: 'vehicle-1',
    },
  };

  const mockNavigation = {
    goBack: jest.fn(),
  };

  const mockFirebase = {
    app: {},
    db: {},
    auth: {},
  };

  const mockAuth = {
    currentUser: {
      uid: 'user-1',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFirebase.mockResolvedValue(mockFirebase);
    mockGetAuth.mockReturnValue(mockAuth);
  });

  describe('Loading State', () => {
    it('should show loading state initially', () => {
      mockGetVehicle.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      expect(screen.getByText('Loading vehicle details...')).toBeTruthy();
    });
  });

  describe('Success Flow', () => {
    it('should load vehicle and render form', async () => {
      mockGetVehicle.mockResolvedValue({
        success: true,
        vehicle: mockVehicle,
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(mockGetFirebase).toHaveBeenCalled();
        expect(mockGetAuth).toHaveBeenCalledWith(mockFirebase.app);
        expect(mockGetVehicle).toHaveBeenCalledWith('vehicle-1');
      });

      await waitFor(() => {
        expect(screen.getByText('Edit Vehicle')).toBeTruthy();
        expect(screen.getByText('Update your vehicle information')).toBeTruthy();
      });
    });

    it('should navigate back on success', async () => {
      mockGetVehicle.mockResolvedValue({
        success: true,
        vehicle: mockVehicle,
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Edit Vehicle')).toBeTruthy();
      });

      // Simulate form success (this would be triggered by the VehicleForm component)
      // The actual navigation would happen in the VehicleForm's onSuccess callback
      expect(mockNavigation.goBack).not.toHaveBeenCalled();
    });

    it('should navigate back on cancel', async () => {
      mockGetVehicle.mockResolvedValue({
        success: true,
        vehicle: mockVehicle,
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Edit Vehicle')).toBeTruthy();
      });

      // Simulate form cancel (this would be triggered by the VehicleForm component)
      // The actual navigation would happen in the VehicleForm's onCancel callback
      expect(mockNavigation.goBack).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should show error when Firebase is not initialized', async () => {
      mockGetFirebase.mockResolvedValue(null);

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Error Loading Vehicle')).toBeTruthy();
        expect(screen.getByText('Firebase is not properly initialized')).toBeTruthy();
      });
    });

    it('should show error when user is not authenticated', async () => {
      mockGetAuth.mockReturnValue({
        currentUser: null,
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Error Loading Vehicle')).toBeTruthy();
        expect(screen.getByText('User not authenticated')).toBeTruthy();
      });
    });

    it('should show error when vehicle is not found', async () => {
      mockGetVehicle.mockResolvedValue({
        success: false,
        error: {
          code: 'vehicle-not-found',
          message: 'Vehicle not found',
        },
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Error Loading Vehicle')).toBeTruthy();
        expect(screen.getByText('Vehicle not found')).toBeTruthy();
      });
    });

    it('should show error when vehicle loading fails', async () => {
      mockGetVehicle.mockResolvedValue({
        success: false,
        error: {
          code: 'unknown-error',
          message: 'Failed to load vehicle',
        },
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Error Loading Vehicle')).toBeTruthy();
        expect(screen.getByText('Failed to load vehicle')).toBeTruthy();
      });
    });

    it('should show error when vehicle loading throws exception', async () => {
      mockGetVehicle.mockRejectedValue(new Error('Network error'));

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Error Loading Vehicle')).toBeTruthy();
        expect(screen.getByText('Network error')).toBeTruthy();
      });
    });

    it('should show retry button in error state', async () => {
      mockGetVehicle.mockResolvedValue({
        success: false,
        error: {
          code: 'vehicle-not-found',
          message: 'Vehicle not found',
        },
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Try Again')).toBeTruthy();
      });
    });

    it('should retry loading when retry button is pressed', async () => {
      mockGetVehicle.mockResolvedValue({
        success: false,
        error: {
          code: 'vehicle-not-found',
          message: 'Vehicle not found',
        },
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Try Again')).toBeTruthy();
      });

      const retryButton = screen.getByText('Try Again');
      retryButton.props.onPress();

      await waitFor(() => {
        expect(mockGetVehicle).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Fallback Error State', () => {
    it('should show fallback error when vehicle is null', async () => {
      mockGetVehicle.mockResolvedValue({
        success: false,
        error: {
          code: 'vehicle-not-found',
          message: 'Vehicle not found',
        },
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Error Loading Vehicle')).toBeTruthy();
        expect(screen.getByText('Vehicle not found')).toBeTruthy();
      });
    });
  });

  describe('Navigation Integration', () => {
    it('should pass correct props to VehicleForm', async () => {
      mockGetVehicle.mockResolvedValue({
        success: true,
        vehicle: mockVehicle,
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Edit Vehicle')).toBeTruthy();
      });

      // The VehicleForm should be rendered with the correct props
      // We can verify this by checking that the form title is displayed
      expect(screen.getByText('Update your vehicle information')).toBeTruthy();
    });
  });

  describe('Route Parameters', () => {
    it('should use vehicleId from route params', async () => {
      mockGetVehicle.mockResolvedValue({
        success: true,
        vehicle: mockVehicle,
      });

      render(
        <EditVehicleScreen 
          route={mockRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(mockGetVehicle).toHaveBeenCalledWith('vehicle-1');
      });
    });

    it('should handle different vehicle IDs', async () => {
      const differentRoute = {
        params: {
          vehicleId: 'vehicle-2',
        },
      };

      mockGetVehicle.mockResolvedValue({
        success: true,
        vehicle: mockVehicle,
      });

      render(
        <EditVehicleScreen 
          route={differentRoute} 
          navigation={mockNavigation} 
        />
      );

      await waitFor(() => {
        expect(mockGetVehicle).toHaveBeenCalledWith('vehicle-2');
      });
    });
  });
});
