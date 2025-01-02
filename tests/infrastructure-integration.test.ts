import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Infrastructure Integration Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('register-infrastructure', () => {
    it('should register infrastructure successfully', async () => {
      const id = 'GRID001';
      const name = 'Northeast Power Grid';
      const type = 'power_grid';
      const location = 'Northeast USA';
      const vulnerabilityThreshold = 80;
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('infrastructure-integration', 'register-infrastructure', [id, name, type, location, vulnerabilityThreshold]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('infrastructure-integration', 'register-infrastructure', [id, name, type, location, vulnerabilityThreshold]);
    });
  });
  
  describe('trigger-mitigation-action', () => {
    it('should trigger mitigation action successfully', async () => {
      const infrastructureId = 'GRID001';
      const alertId = 1;
      const actionType = 'power_reduction';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new action ID
      
      const result = await mockContractCall('infrastructure-integration', 'trigger-mitigation-action', [infrastructureId, alertId, actionType]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('infrastructure-integration', 'trigger-mitigation-action', [infrastructureId, alertId, actionType]);
    });
    
    it('should fail for non-existent infrastructure', async () => {
      const infrastructureId = 'NONEXISTENT';
      const alertId = 1;
      const actionType = 'power_reduction';
      
      mockContractCall.mockRejectedValue(new Error('Infrastructure not found'));
      
      await expect(mockContractCall('infrastructure-integration', 'trigger-mitigation-action', [infrastructureId, alertId, actionType]))
          .rejects.toThrow('Infrastructure not found');
    });
  });
  
  describe('update-action-status', () => {
    it('should update action status successfully', async () => {
      const actionId = 1;
      const newStatus = 'completed';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('infrastructure-integration', 'update-action-status', [actionId, newStatus]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('infrastructure-integration', 'update-action-status', [actionId, newStatus]);
    });
    
    it('should fail for non-existent action', async () => {
      const actionId = 999;
      const newStatus = 'completed';
      
      mockContractCall.mockRejectedValue(new Error('Action not found'));
      
      await expect(mockContractCall('infrastructure-integration', 'update-action-status', [actionId, newStatus]))
          .rejects.toThrow('Action not found');
    });
  });
  
  describe('get-infrastructure', () => {
    it('should return infrastructure details', async () => {
      const id = 'GRID001';
      const expectedInfrastructure = {
        name: 'Northeast Power Grid',
        type: 'power_grid',
        location: 'Northeast USA',
        vulnerability_threshold: 80
      };
      
      mockContractCall.mockResolvedValue({ value: expectedInfrastructure });
      
      const result = await mockContractCall('infrastructure-integration', 'get-infrastructure', [id]);
      
      expect(result.value).toEqual(expectedInfrastructure);
      expect(mockContractCall).toHaveBeenCalledWith('infrastructure-integration', 'get-infrastructure', [id]);
    });
    
    it('should return null for non-existent infrastructure', async () => {
      const id = 'NONEXISTENT';
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('infrastructure-integration', 'get-infrastructure', [id]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-mitigation-action', () => {
    it('should return mitigation action details', async () => {
      const actionId = 1;
      const expectedAction = {
        infrastructure_id: 'GRID001',
        alert_id: 1,
        action_type: 'power_reduction',
        timestamp: 123456789,
        status: 'completed'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedAction });
      
      const result = await mockContractCall('infrastructure-integration', 'get-mitigation-action', [actionId]);
      
      expect(result.value).toEqual(expectedAction);
      expect(mockContractCall).toHaveBeenCalledWith('infrastructure-integration', 'get-mitigation-action', [actionId]);
    });
    
    it('should return null for non-existent action', async () => {
      const actionId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('infrastructure-integration', 'get-mitigation-action', [actionId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-action-count', () => {
    it('should return the total number of mitigation actions', async () => {
      const expectedCount = 3;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('infrastructure-integration', 'get-action-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('infrastructure-integration', 'get-action-count', []);
    });
  });
});

