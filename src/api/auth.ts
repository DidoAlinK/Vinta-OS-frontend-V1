import client from './client';
import type { AuthResponse, User, ProfileSelectResponse, PinVerifyResponse } from '../types';
import type { LoginRequest, SignupRequest, VerifyPinRequest, CreateOwnerRequest, SignupResponse, CreateOwnerResponse } from '../types/api';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await client.post('/auth/login', data);
    return res.data;
  },

  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const res = await client.post('/auth/signup', data);
    return res.data;
  },

  createOwner: async (data: CreateOwnerRequest): Promise<CreateOwnerResponse> => {
    const res = await client.post('/auth/create-owner', data, {
      headers: { 'X-Academy-Id': data.academy_id },
    });
    return res.data;
  },

  getProfiles: async (academyId?: string): Promise<User[]> => {
    const res = await client.get('/auth/profiles', {
      headers: academyId ? { 'X-Academy-Id': academyId } : undefined,
    });
    return res.data?.profiles || res.data;
  },

  selectProfile: async (userId: string): Promise<ProfileSelectResponse> => {
    const res = await client.post('/auth/select-profile', { userId });
    return res.data;
  },

  verifyPin: async (data: VerifyPinRequest): Promise<PinVerifyResponse> => {
    const res = await client.post('/auth/verify-pin', data);
    return res.data;
  },

  createProfile: async (data: { name: string; pin: string; role?: string; phone?: string }) => {
    const academyId = localStorage.getItem('vinta_academy_id') || '';
    const res = await client.post('/auth/create-profile', data, {
      headers: { 'X-Academy-Id': academyId },
    });
    return res.data;
  },
};
