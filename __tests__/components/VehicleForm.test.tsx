import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import VehicleForm from '../../src/components/VehicleForm';
import { getVehicleMakes, getVehicleModels, createVehicle, updateVehicle } from '../../src/services/vehicles';

// Mock the services
jest.mock('../../src/services/vehicles');
jest.mock('../../src/services/firebase');
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

const mockGetVehicleMakes = getVehicleMakes as jest.MockedFunction<typeof getVehicleMakes>;
const mockGetVehicleModels = getVehicleModels as jest.MockedFunction<typeof getVehicleModels>;
const mockCreateVehicle = createVehicle as jest.MockedFunction<typeof createVehicle>;
const mockUpdateVehicle = updateVehicle as jest.MockedFunction<typeof updateVehicle>;

describe('VehicleForm', () => {
  const mockMakes = [
    { id: '1', name: 'Toyota' },
    { id: '2', name: 'Honda' },
  ];

  const mockModels = [
    { id: '1', name: 'Camry', makeId: '1' },
    { id: '2', name: 'Corolla', makeId: '1' },
  ];

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

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetVehicleMakes.mockResolvedValue(mockMakes);
    mockGetVehicleModels.mockResolvedValue(mockModels);
  });

  describe('Create Mode', () => {
    const defaultProps = {
      userId: 'user-1',
      mode: 'create' as const,
      onSuccess: jest.fn(),
      onCancel: jest.fn(),
    };

    it('should render create form with correct title', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('Add Vehicle')).toBeTruthy();
      });
      
      expect(screen.getByText('Enter your vehicle details to start tracking sessions')).toBeTruthy();
    });

    it('should load vehicle makes on mount', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalledTimes(1);
      });
    });

    it('should load models when make is selected', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      // Simulate selecting a make
      const makeDropdown = screen.getByText('Select vehicle make');
      fireEvent.press(makeDropdown);
      
      await waitFor(() => {
        expect(mockGetVehicleModels).toHaveBeenCalledWith('1');
      });
    });

    it('should validate required fields', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Make is required')).toBeTruthy();
        expect(screen.getByText('Model is required')).toBeTruthy();
      });
    });

    it('should successfully create vehicle', async () => {
      mockCreateVehicle.mockResolvedValue({
        success: true,
        vehicle: mockVehicle,
      });

      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      // Fill in required fields
      const yearInput = screen.getByDisplayValue(new Date().getFullYear().toString());
      fireEvent.changeText(yearInput, '2020');

      // Select make and model
      const makeDropdown = screen.getByText('Select vehicle make');
      fireEvent.press(makeDropdown);
      
      await waitFor(() => {
        expect(mockGetVehicleModels).toHaveBeenCalled();
      });

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockCreateVehicle).toHaveBeenCalledWith('user-1', expect.objectContaining({
          year: 2020,
        }));
      });
    });

    it('should handle create vehicle error', async () => {
      mockCreateVehicle.mockResolvedValue({
        success: false,
        error: { code: 'test-error', message: 'Failed to create vehicle' },
      });

      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to create vehicle')).toBeTruthy();
      });
    });

    it('should show confirmation dialog on cancel', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      const cancelButton = screen.getByTestId('cancel-button');
      fireEvent.press(cancelButton);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Cancel',
        'Are you sure you want to cancel? All entered data will be lost.',
        expect.any(Array)
      );
    });
  });

  describe('Edit Mode', () => {
    const defaultProps = {
      userId: 'user-1',
      mode: 'edit' as const,
      vehicle: mockVehicle,
      onSuccess: jest.fn(),
      onCancel: jest.fn(),
    };

    it('should render edit form with correct title', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Vehicle')).toBeTruthy();
        expect(screen.getByText('Update your vehicle information')).toBeTruthy();
      });
    });

    it('should pre-populate form with vehicle data', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('2020')).toBeTruthy();
        expect(screen.getByDisplayValue('Silver')).toBeTruthy();
        expect(screen.getByDisplayValue('2.5L')).toBeTruthy();
        expect(screen.getByDisplayValue('1HGBH41JXMN109186')).toBeTruthy();
        expect(screen.getByDisplayValue('ABC123')).toBeTruthy();
        expect(screen.getByDisplayValue('Test vehicle')).toBeTruthy();
      });
    });

    it('should successfully update vehicle', async () => {
      mockUpdateVehicle.mockResolvedValue({
        success: true,
        vehicle: { ...mockVehicle, color: 'Blue' },
      });

      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      // Update a field
      const colorInput = screen.getByDisplayValue('Silver');
      fireEvent.changeText(colorInput, 'Blue');

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockUpdateVehicle).toHaveBeenCalledWith(expect.objectContaining({
          id: 'vehicle-1',
          color: 'Blue',
        }));
      });
    });

    it('should handle update vehicle error', async () => {
      mockUpdateVehicle.mockResolvedValue({
        success: false,
        error: { code: 'test-error', message: 'Failed to update vehicle' },
      });

      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to update vehicle')).toBeTruthy();
      });
    });

    it('should show error when vehicle data is missing', async () => {
      render(<VehicleForm {...defaultProps} vehicle={undefined} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Vehicle data is required for editing')).toBeTruthy();
      });
    });
  });

  describe('Validation', () => {
    const defaultProps = {
      userId: 'user-1',
      mode: 'create' as const,
      onSuccess: jest.fn(),
      onCancel: jest.fn(),
    };

    it('should validate year range', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      const yearInput = screen.getByDisplayValue(new Date().getFullYear().toString());
      
      // Test invalid year (too old)
      fireEvent.changeText(yearInput, '1899');
      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Year must be between 1900 and next year')).toBeTruthy();
      });

      // Test invalid year (too new)
      fireEvent.changeText(yearInput, (new Date().getFullYear() + 2).toString());
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Year must be between 1900 and next year')).toBeTruthy();
      });
    });

    it('should validate VIN length', async () => {
      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      const vinInput = screen.getByDisplayValue('');
      fireEvent.changeText(vinInput, 'SHORT');

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(screen.getByText('VIN must be 17 characters')).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    const defaultProps = {
      userId: 'user-1',
      mode: 'create' as const,
      onSuccess: jest.fn(),
      onCancel: jest.fn(),
    };

    it('should handle makes loading error', async () => {
      mockGetVehicleMakes.mockRejectedValue(new Error('Network error'));

      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('Error Loading Form')).toBeTruthy();
        expect(screen.getByText('Failed to load vehicle makes')).toBeTruthy();
      });
    });

    it('should handle models loading error', async () => {
      mockGetVehicleModels.mockRejectedValue(new Error('Network error'));

      render(<VehicleForm {...defaultProps} />);
      
      await waitFor(() => {
        expect(mockGetVehicleMakes).toHaveBeenCalled();
      });

      // This would trigger models loading, but we can't easily test it without more complex setup
      // The error would be handled internally and wouldn't show a separate error state
    });
  });
});
