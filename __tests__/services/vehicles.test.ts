import { 
  getVehicleMakes,
  getVehicleModels
} from '../../src/services/vehicles';

describe('Vehicles Service', () => {
  describe('getVehicleMakes', () => {
    it('should return sample vehicle makes', async () => {
      const result = await getVehicleMakes();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('models');
      expect(Array.isArray(result[0].models)).toBe(true);
    });
  });

  describe('getVehicleModels', () => {
    it('should return models for a specific make', async () => {
      const makes = await getVehicleMakes();
      const firstMake = makes[0];
      const result = await getVehicleModels(firstMake.id);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('makeId');
      expect(result[0].makeId).toBe(firstMake.id);
    });

    it('should return empty array for non-existent make', async () => {
      const result = await getVehicleModels('999');

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('Vehicle makes and models data', () => {
    it('should contain valid vehicle makes and models', async () => {
      const makes = await getVehicleMakes();
      
      expect(makes).toBeDefined();
      expect(Array.isArray(makes)).toBe(true);
      expect(makes.length).toBeGreaterThan(0);

      makes.forEach(make => {
        expect(make).toHaveProperty('id');
        expect(make).toHaveProperty('name');
        expect(make).toHaveProperty('models');
        expect(Array.isArray(make.models)).toBe(true);
        expect(make.models.length).toBeGreaterThan(0);

        make.models.forEach(model => {
          expect(model).toHaveProperty('id');
          expect(model).toHaveProperty('name');
          expect(model).toHaveProperty('makeId');
          expect(model.makeId).toBe(make.id);
        });
      });
    });

    it('should have unique make IDs', async () => {
      const makes = await getVehicleMakes();
      const makeIds = makes.map(make => make.id);
      const uniqueIds = new Set(makeIds);
      expect(uniqueIds.size).toBe(makeIds.length);
    });

    it('should have unique model IDs across all makes', async () => {
      const makes = await getVehicleMakes();
      const allModelIds = makes.flatMap(make => make.models.map(model => model.id));
      const uniqueModelIds = new Set(allModelIds);
      expect(uniqueModelIds.size).toBe(allModelIds.length);
    });
  });
});
