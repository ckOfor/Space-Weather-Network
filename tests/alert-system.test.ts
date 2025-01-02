import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Alert System Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-alert', () => {
    it('should create an alert successfully', async () => {
      const eventType = 'geomagnetic_storm';
      const severity = 90;
      const description = 'Severe geomagnetic storm expected to impact Earth';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new alert ID
      
      const result = await mockContractCall('alert-system', 'create-alert', [eventType, severity, description]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('alert-system', 'create-alert', [eventType, severity, description]);
    });
  });
  
  describe('update-alert-status', () => {
    it('should update alert status successfully', async () => {
      const alertId = 1;
      const newStatus = 'resolved';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('alert-system', 'update-alert-status', [alertId, newStatus]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('alert-system', 'update-alert-status', [alertId, newStatus]);
    });
    
    it('should fail for non-existent alert', async () => {
      const alertId = 999;
      const newStatus = 'resolved';
      
      mockContractCall.mockRejectedValue(new Error('Alert not found'));
      
      await expect(mockContractCall('alert-system', 'update-alert-status', [alertId, newStatus]))
          .rejects.toThrow('Alert not found');
    });
  });
  
  describe('subscribe', () => {
    it('should subscribe successfully', async () => {
      const minSeverity = 70;
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('alert-system', 'subscribe', [minSeverity]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('alert-system', 'subscribe', [minSeverity]);
    });
  });
  
  describe('unsubscribe', () => {
    it('should unsubscribe successfully', async () => {
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('alert-system', 'unsubscribe', []);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('alert-system', 'unsubscribe', []);
    });
  });
  
  describe('get-alert', () => {
    it('should return alert details', async () => {
      const alertId = 1;
      const expectedAlert = {
        event_type: 'geomagnetic_storm',
        severity: 90,
        timestamp: 123456789,
        description: 'Severe geomagnetic storm expected to impact Earth',
        status: 'active'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedAlert });
      
      const result = await mockContractCall('alert-system', 'get-alert', [alertId]);
      
      expect(result.value).toEqual(expectedAlert);
      expect(mockContractCall).toHaveBeenCalledWith('alert-system', 'get-alert', [alertId]);
    });
    
    it('should return null for non-existent alert', async () => {
      const alertId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('alert-system', 'get-alert', [alertId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-subscription', () => {
    it('should return subscription details', async () => {
      const subscriber = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const expectedSubscription = {
        min_severity: 70
      };
      
      mockContractCall.mockResolvedValue({ value: expectedSubscription });
      
      const result = await mockContractCall('alert-system', 'get-subscription', [subscriber]);
      
      expect(result.value).toEqual(expectedSubscription);
      expect(mockContractCall).toHaveBeenCalledWith('alert-system', 'get-subscription', [subscriber]);
    });
    
    it('should return null for non-existent subscription', async () => {
      const subscriber = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('alert-system', 'get-subscription', [subscriber]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-alert-count', () => {
    it('should return the total number of alerts', async () => {
      const expectedCount = 5;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('alert-system', 'get-alert-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('alert-system', 'get-alert-count', []);
    });
  });
});

