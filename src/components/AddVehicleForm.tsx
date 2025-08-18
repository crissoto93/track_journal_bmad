import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, HelperText } from 'react-native-paper';
import { useTheme } from '../theme';
import { 
  CreateVehicleData, 
  VehicleType, 
  VEHICLE_TYPES, 
  TRANSMISSION_TYPES,
  VehicleValidationErrors 
} from '../types/vehicle';
import { getVehicleMakes, getVehicleModels, createVehicle } from '../services/vehicles';
import SearchableDropdown from './SearchableDropdown';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface AddVehicleFormProps {
  userId: string;
  onSuccess?: (vehicleId: string) => void;
  onCancel?: () => void;
  initialData?: Partial<CreateVehicleData>;
}

export function AddVehicleForm({ 
  userId, 
  onSuccess, 
  onCancel,
  initialData 
}: AddVehicleFormProps): React.JSX.Element {
  const { theme } = useTheme();
  const [_loading, _setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState<CreateVehicleData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'car',
    engine: '',
    transmission: '',
    color: '',
    vin: '',
    licensePlate: '',
    notes: '',
    ...initialData
  });

  // Validation errors
  const [errors, setErrors] = useState<VehicleValidationErrors>({});

  // Dropdown data
  const [makes, setMakes] = useState<Array<{ id: string; name: string }>>([]);
  const [models, setModels] = useState<Array<{ id: string; name: string }>>([]);
  const [makesLoading, setMakesLoading] = useState(true);
  const [modelsLoading, setModelsLoading] = useState(false);

  // Load makes on component mount
  useEffect(() => {
    loadMakes();
  }, []);

  // Load models when make changes
  useEffect(() => {
    if (formData.make) {
      loadModels(formData.make);
    } else {
      setModels([]);
    }
  }, [formData.make]);

  const loadMakes = async () => {
    try {
      setMakesLoading(true);
      const makesData = await getVehicleMakes();
      setMakes(makesData.map(make => ({ id: make.id, name: make.name })));
    } catch (err) {
      setError('Failed to load vehicle makes');
    } finally {
      setMakesLoading(false);
    }
  };

  const loadModels = async (makeId: string) => {
    try {
      setModelsLoading(true);
      const modelsData = await getVehicleModels(makeId);
      setModels(modelsData.map(model => ({ id: model.id, name: model.name })));
    } catch (err) {
      setError('Failed to load vehicle models');
    } finally {
      setModelsLoading(false);
    }
  };

  const updateFormData = (field: keyof CreateVehicleData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: VehicleValidationErrors = {};

    if (!formData.make) {
      newErrors.make = 'Make is required';
    }

    if (!formData.model) {
      newErrors.model = 'Model is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Year must be between 1900 and next year';
    }

    if (!formData.type) {
      newErrors.type = 'Vehicle type is required';
    }

    if (formData.vin && formData.vin.length < 17) {
      newErrors.vin = 'VIN must be 17 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const result = await createVehicle(userId, formData);
      
      if (result.success && result.vehicle) {
        Alert.alert(
          'Success',
          'Vehicle added successfully!',
          [
            {
              text: 'OK',
              onPress: () => onSuccess?.(result.vehicle!.id)
            }
          ]
        );
      } else {
        setError(result.error?.message || 'Failed to create vehicle');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel',
      'Are you sure you want to cancel? All entered data will be lost.',
      [
        { text: 'Continue Editing', style: 'cancel' },
        { text: 'Cancel', style: 'destructive', onPress: onCancel }
      ]
    );
  };

  if (_loading) {
    return <LoadingState message="Loading form..." />;
  }

  if (error && !submitting) {
    return (
      <ErrorState
        title="Error Loading Form"
        message={error}
        onRetry={loadMakes}
      />
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
          Add Vehicle
        </Text>
        <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Enter your vehicle details to start tracking sessions
        </Text>
      </View>

      <View style={styles.form}>
        {/* Vehicle Type */}
        <View style={styles.section}>
          <Text variant="titleSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Vehicle Type
          </Text>
          <SegmentedButtons
            value={formData.type}
            onValueChange={(value) => updateFormData('type', value as VehicleType)}
            buttons={VEHICLE_TYPES.map(type => ({
              value: type.value,
              label: type.label,
            }))}
            style={styles.segmentedButtons}
          />
          {errors.type && (
            <HelperText type="error" visible={!!errors.type}>
              {errors.type}
            </HelperText>
          )}
        </View>

        {/* Make and Model */}
        <View style={styles.section}>
          <Text variant="titleSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Make & Model
          </Text>
          
          <SearchableDropdown
            label="Make"
            value={formData.make}
            onValueChange={(value) => updateFormData('make', value)}
            data={makes}
            placeholder="Select vehicle make"
            loading={makesLoading}
            error={errors.make}
            searchPlaceholder="Search makes..."
            noDataMessage="No makes found"
          />

          <SearchableDropdown
            label="Model"
            value={formData.model}
            onValueChange={(value) => updateFormData('model', value)}
            data={models}
            placeholder="Select vehicle model"
            loading={modelsLoading}
            error={errors.model}
            disabled={!formData.make}
            searchPlaceholder="Search models..."
            noDataMessage="No models found"
          />
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text variant="titleSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Basic Information
          </Text>
          
          <TextInput
            label="Year"
            value={formData.year.toString()}
            onChangeText={(text) => updateFormData('year', parseInt(text) || 0)}
            keyboardType="numeric"
            mode="outlined"
            error={!!errors.year}
            style={styles.input}
          />
          {errors.year && (
            <HelperText type="error" visible={!!errors.year}>
              {errors.year}
            </HelperText>
          )}

          <TextInput
            label="Color"
            value={formData.color}
            onChangeText={(text) => updateFormData('color', text)}
            mode="outlined"
            style={styles.input}
          />
        </View>

        {/* Technical Details */}
        <View style={styles.section}>
          <Text variant="titleSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Technical Details
          </Text>
          
          <TextInput
            label="Engine"
            value={formData.engine}
            onChangeText={(text) => updateFormData('engine', text)}
            mode="outlined"
            placeholder="e.g., 2.0L Turbo, V8, etc."
            style={styles.input}
          />

          <SearchableDropdown
            label="Transmission"
            value={formData.transmission || ''}
            onValueChange={(value) => updateFormData('transmission', value)}
            data={TRANSMISSION_TYPES.map(type => ({ id: type, name: type }))}
            placeholder="Select transmission type"
            searchPlaceholder="Search transmission types..."
          />
        </View>

        {/* Registration */}
        <View style={styles.section}>
          <Text variant="titleSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Registration
          </Text>
          
          <TextInput
            label="License Plate"
            value={formData.licensePlate}
            onChangeText={(text) => updateFormData('licensePlate', text.toUpperCase())}
            mode="outlined"
            autoCapitalize="characters"
            style={styles.input}
          />

          <TextInput
            label="VIN (Vehicle Identification Number)"
            value={formData.vin}
            onChangeText={(text) => updateFormData('vin', text.toUpperCase())}
            mode="outlined"
            autoCapitalize="characters"
            error={!!errors.vin}
            style={styles.input}
          />
          {errors.vin && (
            <HelperText type="error" visible={!!errors.vin}>
              {errors.vin}
            </HelperText>
          )}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text variant="titleSmall" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Additional Information
          </Text>
          
          <TextInput
            label="Notes"
            value={formData.notes}
            onChangeText={(text) => updateFormData('notes', text)}
            mode="outlined"
            multiline
            numberOfLines={3}
            placeholder="Any additional notes about your vehicle..."
            style={styles.input}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={handleCancel}
          style={[styles.button, styles.cancelButton]}
          contentStyle={styles.buttonContent}
          disabled={submitting}
        >
          Cancel
        </Button>
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={submitting}
          disabled={submitting}
          style={[styles.button, styles.submitButton]}
          contentStyle={styles.buttonContent}
        >
          Add Vehicle
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
  },
  subtitle: {
    lineHeight: 20,
  },
  form: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    // Styling handled by theme
  },
  submitButton: {
    // Styling handled by theme
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default AddVehicleForm;
