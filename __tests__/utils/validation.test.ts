// Vehicle validation utilities
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

export interface CreateVehicleData {
  make: string;
  model: string;
  year: number;
  type: 'car' | 'motorcycle' | 'truck' | 'bike';
  engine?: string;
  transmission?: string;
  color?: string;
  vin?: string;
  licensePlate?: string;
  notes?: string;
}

export function validateVehicle(data: CreateVehicleData): VehicleValidationErrors {
  const errors: VehicleValidationErrors = {};

  // Required fields
  if (!data.make || data.make.trim().length === 0) {
    errors.make = 'Make is required';
  } else if (data.make.trim().length > 50) {
    errors.make = 'Make must be 50 characters or less';
  }

  if (!data.model || data.model.trim().length === 0) {
    errors.model = 'Model is required';
  } else if (data.model.trim().length > 50) {
    errors.model = 'Model must be 50 characters or less';
  }

  if (!data.year) {
    errors.year = 'Year is required';
  } else if (data.year < 1900 || data.year > new Date().getFullYear() + 1) {
    errors.year = `Year must be between 1900 and ${new Date().getFullYear() + 1}`;
  }

  if (!data.type) {
    errors.type = 'Vehicle type is required';
  } else if (!['car', 'motorcycle', 'truck', 'bike'].includes(data.type)) {
    errors.type = 'Invalid vehicle type';
  }

  // Optional fields with validation
  if (data.engine && data.engine.trim().length > 100) {
    errors.engine = 'Engine must be 100 characters or less';
  }

  if (data.transmission && data.transmission.trim().length > 50) {
    errors.transmission = 'Transmission must be 50 characters or less';
  }

  if (data.color && data.color.trim().length > 30) {
    errors.color = 'Color must be 30 characters or less';
  }

  if (data.vin && data.vin.trim().length > 17) {
    errors.vin = 'VIN must be 17 characters or less';
  }

  if (data.licensePlate && data.licensePlate.trim().length > 20) {
    errors.licensePlate = 'License plate must be 20 characters or less';
  }

  if (data.notes && data.notes.trim().length > 500) {
    errors.notes = 'Notes must be 500 characters or less';
  }

  return errors;
}

export function validateEmail(email: string): string | null {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }

  // Simple but effective email regex for testing
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  if (email.length > 254) {
    return 'Email must be 254 characters or less';
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password || password.length === 0) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  if (password.length > 128) {
    return 'Password must be 128 characters or less';
  }

  return null;
}

describe('Validation Utils', () => {
  const validVehicleData: CreateVehicleData = {
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    type: 'car',
    engine: '2.5L',
    transmission: 'Automatic',
    color: 'Silver',
    vin: '1HGBH41JXMN109186',
    licensePlate: 'ABC123',
    notes: 'Test vehicle',
  };

  describe('validateVehicle', () => {
    it('should pass validation for valid vehicle data', () => {
      const errors = validateVehicle(validVehicleData);
      expect(errors).toEqual({});
    });

    it('should fail validation for missing make', () => {
      const invalidData = { ...validVehicleData, make: '' };
      const errors = validateVehicle(invalidData);
      expect(errors.make).toBe('Make is required');
    });

    it('should fail validation for missing model', () => {
      const invalidData = { ...validVehicleData, model: '' };
      const errors = validateVehicle(invalidData);
      expect(errors.model).toBe('Model is required');
    });

    it('should fail validation for missing year', () => {
      const invalidData = { ...validVehicleData, year: 0 };
      const errors = validateVehicle(invalidData);
      expect(errors.year).toBe('Year is required');
    });

    it('should fail validation for invalid year (too old)', () => {
      const invalidData = { ...validVehicleData, year: 1899 };
      const errors = validateVehicle(invalidData);
      expect(errors.year).toBe(`Year must be between 1900 and ${new Date().getFullYear() + 1}`);
    });

    it('should fail validation for invalid year (too new)', () => {
      const invalidData = { ...validVehicleData, year: new Date().getFullYear() + 2 };
      const errors = validateVehicle(invalidData);
      expect(errors.year).toBe(`Year must be between 1900 and ${new Date().getFullYear() + 1}`);
    });

    it('should fail validation for missing type', () => {
      const invalidData = { ...validVehicleData, type: '' as any };
      const errors = validateVehicle(invalidData);
      expect(errors.type).toBe('Vehicle type is required');
    });

    it('should fail validation for invalid type', () => {
      const invalidData = { ...validVehicleData, type: 'invalid' as any };
      const errors = validateVehicle(invalidData);
      expect(errors.type).toBe('Invalid vehicle type');
    });

    it('should pass validation for all valid vehicle types', () => {
      const types = ['car', 'motorcycle', 'truck', 'bike'] as const;
      
      types.forEach(type => {
        const data = { ...validVehicleData, type };
        const errors = validateVehicle(data);
        expect(errors.type).toBeUndefined();
      });
    });

    it('should fail validation for make that is too long', () => {
      const invalidData = { ...validVehicleData, make: 'a'.repeat(51) };
      const errors = validateVehicle(invalidData);
      expect(errors.make).toBe('Make must be 50 characters or less');
    });

    it('should fail validation for model that is too long', () => {
      const invalidData = { ...validVehicleData, model: 'a'.repeat(51) };
      const errors = validateVehicle(invalidData);
      expect(errors.model).toBe('Model must be 50 characters or less');
    });

    it('should fail validation for engine that is too long', () => {
      const invalidData = { ...validVehicleData, engine: 'a'.repeat(101) };
      const errors = validateVehicle(invalidData);
      expect(errors.engine).toBe('Engine must be 100 characters or less');
    });

    it('should fail validation for transmission that is too long', () => {
      const invalidData = { ...validVehicleData, transmission: 'a'.repeat(51) };
      const errors = validateVehicle(invalidData);
      expect(errors.transmission).toBe('Transmission must be 50 characters or less');
    });

    it('should fail validation for color that is too long', () => {
      const invalidData = { ...validVehicleData, color: 'a'.repeat(31) };
      const errors = validateVehicle(invalidData);
      expect(errors.color).toBe('Color must be 30 characters or less');
    });

    it('should fail validation for VIN that is too long', () => {
      const invalidData = { ...validVehicleData, vin: 'a'.repeat(18) };
      const errors = validateVehicle(invalidData);
      expect(errors.vin).toBe('VIN must be 17 characters or less');
    });

    it('should fail validation for license plate that is too long', () => {
      const invalidData = { ...validVehicleData, licensePlate: 'a'.repeat(21) };
      const errors = validateVehicle(invalidData);
      expect(errors.licensePlate).toBe('License plate must be 20 characters or less');
    });

    it('should fail validation for notes that is too long', () => {
      const invalidData = { ...validVehicleData, notes: 'a'.repeat(501) };
      const errors = validateVehicle(invalidData);
      expect(errors.notes).toBe('Notes must be 500 characters or less');
    });

    it('should pass validation for vehicle with only required fields', () => {
      const minimalData: CreateVehicleData = {
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        type: 'car',
      };
      const errors = validateVehicle(minimalData);
      expect(errors).toEqual({});
    });

    it('should handle whitespace in string fields', () => {
      const invalidData = { ...validVehicleData, make: '   ', model: '   ' };
      const errors = validateVehicle(invalidData);
      expect(errors.make).toBe('Make is required');
      expect(errors.model).toBe('Model is required');
    });

    it('should handle special characters in fields', () => {
      const specialCharData = {
        ...validVehicleData,
        make: 'BMW & Co.',
        model: 'X3-M',
        notes: 'Vehicle with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
      };
      const errors = validateVehicle(specialCharData);
      expect(errors).toEqual({});
    });
  });

  describe('validateEmail', () => {
    it('should pass validation for valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@numbers.com',
        'test.email@subdomain.example.com',
      ];

      validEmails.forEach(email => {
        const error = validateEmail(email);
        expect(error).toBeNull();
      });
    });

    it('should fail validation for missing email', () => {
      const error = validateEmail('');
      expect(error).toBe('Email is required');
    });

    it('should fail validation for email with only whitespace', () => {
      const error = validateEmail('   ');
      expect(error).toBe('Email is required');
    });

    it('should fail validation for invalid email format', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test@.com',
      ];

      invalidEmails.forEach(email => {
        const error = validateEmail(email);
        expect(error).toBe('Please enter a valid email address');
      });
    });

    it('should fail validation for email that is too long', () => {
      const longEmail = 'a'.repeat(255) + '@example.com';
      const error = validateEmail(longEmail);
      expect(error).toBe('Email must be 254 characters or less');
    });

    it('should handle special characters in email', () => {
      const specialEmail = 'test+tag@example.com';
      const error = validateEmail(specialEmail);
      expect(error).toBeNull();
    });

    it('should handle email with multiple dots', () => {
      const multiDotEmail = 'test.email@subdomain.example.com';
      const error = validateEmail(multiDotEmail);
      expect(error).toBeNull();
    });
  });

  describe('validatePassword', () => {
    it('should pass validation for valid passwords', () => {
      const validPasswords = [
        'password123',
        'P@ssw0rd!',
        '123456',
        'a'.repeat(128),
      ];

      validPasswords.forEach(password => {
        const error = validatePassword(password);
        expect(error).toBeNull();
      });
    });

    it('should fail validation for missing password', () => {
      const error = validatePassword('');
      expect(error).toBe('Password is required');
    });

    it('should fail validation for password that is too short', () => {
      const error = validatePassword('12345');
      expect(error).toBe('Password must be at least 6 characters long');
    });

    it('should fail validation for password that is too long', () => {
      const error = validatePassword('a'.repeat(129));
      expect(error).toBe('Password must be 128 characters or less');
    });

    it('should handle special characters in password', () => {
      const specialPassword = 'P@ssw0rd!@#$%^&*()_+-=[]{}|;:,.<>?';
      const error = validatePassword(specialPassword);
      expect(error).toBeNull();
    });

    it('should handle password with exactly minimum length', () => {
      const minPassword = '123456';
      const error = validatePassword(minPassword);
      expect(error).toBeNull();
    });

    it('should handle password with exactly maximum length', () => {
      const maxPassword = 'a'.repeat(128);
      const error = validatePassword(maxPassword);
      expect(error).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null and undefined values gracefully', () => {
      // These tests ensure the validation functions don't crash on unexpected input
      expect(() => validateEmail(null as any)).not.toThrow();
      expect(() => validateEmail(undefined as any)).not.toThrow();
      expect(() => validatePassword(null as any)).not.toThrow();
      expect(() => validatePassword(undefined as any)).not.toThrow();
    });

    it('should handle very large numbers for year validation', () => {
      const largeYearData = { ...validVehicleData, year: 999999 };
      const errors = validateVehicle(largeYearData);
      expect(errors.year).toBe(`Year must be between 1900 and ${new Date().getFullYear() + 1}`);
    });

    it('should handle negative numbers for year validation', () => {
      const negativeYearData = { ...validVehicleData, year: -1 };
      const errors = validateVehicle(negativeYearData);
      expect(errors.year).toBe(`Year must be between 1900 and ${new Date().getFullYear() + 1}`);
    });

    it('should handle floating point numbers for year validation', () => {
      const floatYearData = { ...validVehicleData, year: 2020.5 };
      const errors = validateVehicle(floatYearData);
      expect(errors.year).toBeUndefined(); // Should pass as it's still a valid year
    });
  });
});
