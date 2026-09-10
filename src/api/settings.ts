import client from './client';
import type { Academy, AcademySettings, User, AcademySettingsResponse } from '../types';

export const settingsApi = {
  getAcademy: async (): Promise<AcademySettingsResponse> => {
    const res = await client.get('/settings/academy');
    return res.data;
  },

  updateAcademy: async (data: Partial<Academy>): Promise<Academy> => {
    const res = await client.put('/settings/academy', data);
    return res.data;
  },

  updatePreferences: async (data: Partial<AcademySettings>): Promise<AcademySettings> => {
    const res = await client.put('/settings/preferences', data);
    return res.data;
  },

  getStaff: async (): Promise<User[]> => {
    const res = await client.get('/settings/staff');
    return res.data;
  },

  createStaff: async (data: Partial<User>): Promise<User> => {
    const res = await client.post('/settings/staff', data);
    return res.data;
  },

  updateStaff: async (id: string, data: Partial<User>): Promise<User> => {
    const res = await client.put(`/settings/staff/${id}`, data);
    return res.data;
  },

  deleteStaff: async (id: string): Promise<void> => {
    await client.delete(`/settings/staff/${id}`);
  },

  updateBilling: async (data: Partial<AcademySettings>): Promise<AcademySettings> => {
    const res = await client.put('/settings/billing', data);
    return res.data;
  },

  updateAutomations: async (data: Partial<AcademySettings>): Promise<AcademySettings> => {
    const res = await client.put('/settings/automations', data);
    return res.data;
  },
};
