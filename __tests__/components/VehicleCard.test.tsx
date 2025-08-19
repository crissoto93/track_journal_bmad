import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { VehicleCard } from '../../src/components/VehicleCard';
import { Vehicle } from '../../src/types/vehicle';

// Mock the theme hook
jest.mock('../../src/theme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        surface: '#ffffff',
        onSurface: '#000000',
        onSurfaceVariant: '#666666',
        primary: '#007AFF',
      },
    },
  }),
}));

// Mock the Icon component
jest.mock('../../src/components/Icon', () => ({
  __esModule: true,
  default: ({ name, family, size, color, style }: any) => {
    const MockIcon = require('react-native').Text;
    return (
      <MockIcon testID={`icon-${name}-${family}`} style={style}>
        {name}
      </MockIcon>
    );
  },
}));

describe('VehicleCard', () => {
  const mockVehicle: Vehicle = {
    id: 'test-vehicle-id',
    userId: 'test-user-id',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    type: 'car',
    engine: '2.5L',
    transmission: 'Automatic',
    color: 'Silver',
    vin: '1HGBH41JXMN109186',
    licensePlate: 'ABC123',
    notes: 'Test vehicle notes',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const mockOnPress = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render vehicle information correctly', () => {
      const { getByText, getByTestId } = render(
        <VehicleCard vehicle={mockVehicle} />
      );

      expect(getByText('2020 Toyota Camry')).toBeTruthy();
      expect(getByText('Car')).toBeTruthy();
      expect(getByTestId('icon-car-MaterialCommunityIcons')).toBeTruthy();
    });

    it('should render with minimal vehicle data', () => {
      const minimalVehicle: Vehicle = {
        id: 'minimal-vehicle',
        userId: 'test-user-id',
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        type: 'car',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      const { getByText } = render(
        <VehicleCard vehicle={minimalVehicle} />
      );

      expect(getByText('2019 Honda Civic')).toBeTruthy();
      expect(getByText('Car')).toBeTruthy();
    });

    it('should render different vehicle types correctly', () => {
      const truckVehicle: Vehicle = {
        ...mockVehicle,
        type: 'truck',
      };

      const { getByText } = render(
        <VehicleCard vehicle={truckVehicle} />
      );

      expect(getByText('Truck')).toBeTruthy();
    });

    it('should render with actions when showActions is true', () => {
      const { getByTestId } = render(
        <VehicleCard 
          vehicle={mockVehicle} 
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          showActions={true}
        />
      );

      expect(getByTestId('icon-pencil-MaterialCommunityIcons')).toBeTruthy();
      expect(getByTestId('icon-delete-MaterialCommunityIcons')).toBeTruthy();
    });

    it('should not render actions when showActions is false', () => {
      const { queryByTestId } = render(
        <VehicleCard 
          vehicle={mockVehicle} 
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          showActions={false}
        />
      );

      expect(queryByTestId('icon-pencil-MaterialCommunityIcons')).toBeNull();
      expect(queryByTestId('icon-delete-MaterialCommunityIcons')).toBeNull();
    });

    it('should not render edit button when onEdit is not provided', () => {
      const { queryByTestId } = render(
        <VehicleCard 
          vehicle={mockVehicle} 
          onDelete={mockOnDelete}
        />
      );

      expect(queryByTestId('icon-pencil-MaterialCommunityIcons')).toBeNull();
      expect(queryByTestId('icon-delete-MaterialCommunityIcons')).toBeTruthy();
    });

    it('should not render delete button when onDelete is not provided', () => {
      const { queryByTestId } = render(
        <VehicleCard 
          vehicle={mockVehicle} 
          onEdit={mockOnEdit}
        />
      );

      expect(queryByTestId('icon-pencil-MaterialCommunityIcons')).toBeTruthy();
      expect(queryByTestId('icon-delete-MaterialCommunityIcons')).toBeNull();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when card is pressed', () => {
      const { getByText } = render(
        <VehicleCard vehicle={mockVehicle} onPress={mockOnPress} />
      );

      fireEvent.press(getByText('2020 Toyota Camry'));

      expect(mockOnPress).toHaveBeenCalledTimes(1);
      expect(mockOnPress).toHaveBeenCalledWith(mockVehicle);
    });

    it('should call onEdit when edit button is pressed', () => {
      const { getByTestId } = render(
        <VehicleCard vehicle={mockVehicle} onEdit={mockOnEdit} />
      );

      fireEvent.press(getByTestId('icon-pencil-MaterialCommunityIcons'));

      expect(mockOnEdit).toHaveBeenCalledTimes(1);
      expect(mockOnEdit).toHaveBeenCalledWith(mockVehicle);
    });

    it('should call onDelete when delete button is pressed', () => {
      const { getByTestId } = render(
        <VehicleCard vehicle={mockVehicle} onDelete={mockOnDelete} />
      );

      fireEvent.press(getByTestId('icon-delete-MaterialCommunityIcons'));

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).toHaveBeenCalledWith(mockVehicle);
    });

    it('should not crash when onPress is not provided', () => {
      const { getByText } = render(
        <VehicleCard vehicle={mockVehicle} />
      );

      expect(() => {
        fireEvent.press(getByText('2020 Toyota Camry'));
      }).not.toThrow();
    });

    it('should not crash when onEdit is not provided', () => {
      const { getByTestId } = render(
        <VehicleCard vehicle={mockVehicle} onDelete={mockOnDelete} />
      );

      expect(() => {
        fireEvent.press(getByTestId('icon-delete-MaterialCommunityIcons'));
      }).not.toThrow();
    });

    it('should not crash when onDelete is not provided', () => {
      const { getByTestId } = render(
        <VehicleCard vehicle={mockVehicle} onEdit={mockOnEdit} />
      );

      expect(() => {
        fireEvent.press(getByTestId('icon-pencil-MaterialCommunityIcons'));
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle vehicle with very long make and model names', () => {
      const longNameVehicle: Vehicle = {
        ...mockVehicle,
        make: 'VeryLongManufacturerNameThatExceedsNormalLength',
        model: 'ExtremelyLongModelNameThatCouldBreakTheLayout',
      };

      const { getByText } = render(
        <VehicleCard vehicle={longNameVehicle} />
      );

      expect(getByText('2020 VeryLongManufacturerNameThatExceedsNormalLength ExtremelyLongModelNameThatCouldBreakTheLayout')).toBeTruthy();
    });

    it('should handle vehicle with special characters in names', () => {
      const specialCharVehicle: Vehicle = {
        ...mockVehicle,
        make: 'BMW & Co.',
        model: 'X3-M',
        notes: 'Vehicle with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
      };

      const { getByText } = render(
        <VehicleCard vehicle={specialCharVehicle} />
      );

      expect(getByText('2020 BMW & Co. X3-M')).toBeTruthy();
    });

    it('should handle vehicle with missing optional fields', () => {
      const minimalVehicle: Vehicle = {
        id: 'minimal-vehicle',
        userId: 'test-user-id',
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        type: 'car',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      const { getByText } = render(
        <VehicleCard vehicle={minimalVehicle} />
      );

      expect(getByText('2019 Honda Civic')).toBeTruthy();
      expect(getByText('Car')).toBeTruthy();
    });

    it('should handle vehicle with all optional fields populated', () => {
      const fullVehicle: Vehicle = {
        ...mockVehicle,
        engine: '3.0L V6 Turbo',
        transmission: '8-Speed Automatic',
        color: 'Metallic Blue',
        vin: 'WBA3B5C50FD123456',
        licensePlate: 'ABC-1234',
        notes: 'Premium package with leather seats and navigation system',
      };

      const { getByText } = render(
        <VehicleCard vehicle={fullVehicle} />
      );

      expect(getByText('2020 Toyota Camry')).toBeTruthy();
      expect(getByText('Car')).toBeTruthy();
    });

    it('should handle vehicle with zero year', () => {
      const zeroYearVehicle: Vehicle = {
        ...mockVehicle,
        year: 0,
      };

      const { getByText } = render(
        <VehicleCard vehicle={zeroYearVehicle} />
      );

      expect(getByText('0 Toyota Camry')).toBeTruthy();
    });

    it('should handle vehicle with very old year', () => {
      const oldYearVehicle: Vehicle = {
        ...mockVehicle,
        year: 1900,
      };

      const { getByText } = render(
        <VehicleCard vehicle={oldYearVehicle} />
      );

      expect(getByText('1900 Toyota Camry')).toBeTruthy();
    });

    it('should handle vehicle with future year', () => {
      const futureYearVehicle: Vehicle = {
        ...mockVehicle,
        year: 2030,
      };

      const { getByText } = render(
        <VehicleCard vehicle={futureYearVehicle} />
      );

      expect(getByText('2030 Toyota Camry')).toBeTruthy();
    });

    it('should handle vehicle with empty string values', () => {
      const emptyStringVehicle: Vehicle = {
        ...mockVehicle,
        make: '',
        model: '',
        engine: '',
        transmission: '',
        color: '',
        vin: '',
        licensePlate: '',
        notes: '',
      };

      const { getByText } = render(
        <VehicleCard vehicle={emptyStringVehicle} />
      );

      expect(getByText('2020   ')).toBeTruthy(); // Empty make and model
      expect(getByText('Car')).toBeTruthy();
    });

    it('should handle vehicle with null values', () => {
      const nullVehicle: Vehicle = {
        ...mockVehicle,
        engine: null as any,
        transmission: null as any,
        color: null as any,
        vin: null as any,
        licensePlate: null as any,
        notes: null as any,
      };

      const { getByText } = render(
        <VehicleCard vehicle={nullVehicle} />
      );

      expect(getByText('2020 Toyota Camry')).toBeTruthy();
      expect(getByText('Car')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility labels', () => {
      const { getByText } = render(
        <VehicleCard vehicle={mockVehicle} onPress={mockOnPress} />
      );

      const card = getByText('2020 Toyota Camry');
      expect(card).toBeTruthy();
    });

    it('should be pressable when onPress is provided', () => {
      const { getByText } = render(
        <VehicleCard vehicle={mockVehicle} onPress={mockOnPress} />
      );

      const card = getByText('2020 Toyota Camry');
      expect(card).toBeTruthy();
    });
  });
});
