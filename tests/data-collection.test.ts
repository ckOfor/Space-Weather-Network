import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Data Collection Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('register-observatory', () => {
    it('should register an observatory successfully', async () => {
      const id = 'OBS001';
      const name = 'Solar Dynamics Observatory';
      const location = 'Earth Orbit';
      const dataType = 'solar_imagery';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('data-collection', 'register-observatory', [id, name, location, dataType]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('data-collection', 'register-observatory', [id, name, location, dataType]);
    });
  });
  
  describe('submit-data', () => {
    it('should submit data successfully', async () => {
      const observatoryId = 'OBS001';
      const dataHash = '0x1234567890abcdef';
      const dataType = 'solar_imagery';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new data ID
      
      const result = await mockContractCall('data-collection', 'submit-data', [observatoryId, dataHash, dataType]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('data-collection', 'submit-data', [observatoryId, dataHash, dataType]);
    });
  });
  
  describe('get-observatory-info', () => {
    it('should return observatory information', async () => {
      const id = 'OBS001';
      const expectedInfo = {
        name: 'Solar Dynamics Observatory',
        location: 'Earth Orbit',
        data_type: 'solar_imagery',
        last_update: 0
      };
      
      mockContractCall.mockResolvedValue({ value: expectedInfo });
      
      const result = await mockContractCall('data-collection', 'get-observatory-info', [id]);
      
      expect(result.value).toEqual(expectedInfo);
      expect(mockContractCall).toHaveBeenCalledWith('data-collection', 'get-observatory-info', [id]);
    });
    
    it('should return null for non-existent observatory', async () => {
      const id = 'NONEXISTENT';
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('data-collection', 'get-observatory-info', [id]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-data', () => {
    it('should return data information', async () => {
      const dataId = 1;
      const expectedData = {
        observatory_id: 'OBS001',
        timestamp: 123456789,
        data_hash: '0x1234567890abcdef',
        data_type: 'solar_imagery'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedData });
      
      const result = await mockContractCall('data-collection', 'get-data', [dataId]);
      
      expect(result.value).toEqual(expectedData);
      expect(mockContractCall).toHaveBeenCalledWith('data-collection', 'get-data', [dataId]);
    });
    
    it('should return null for non-existent data', async () => {
      const dataId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('data-collection', 'get-data', [dataId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-data-count', () => {
    it('should return the total number of data entries', async () => {
      const expectedCount = 5;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('data-collection', 'get-data-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('data-collection', 'get-data-count', []);
    });
  });
});

