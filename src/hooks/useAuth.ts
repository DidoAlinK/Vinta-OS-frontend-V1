import { useAuthContext } from '../context/AuthContext';
import { authApi } from '../api/auth';
import { useCallback } from 'react';
import type { LoginRequest, SignupRequest } from '../types/api';
import type { User } from '../types';

/** Build a minimal User from the flat backend auth response */
function buildUser(data: Record<string, any>): User {
  return {
    id: data.user_id || data.id || '',
    academy_id: data.academy_id || '',
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    role: data.role || 'staff',
    avatar_colors: ['#b3872a', '#10b981'],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function useAuth() {
  const ctx = useAuthContext();

  const login = useCallback(async (data: LoginRequest) => {
    const res = await authApi.login(data) as any;
    const token = res.access_token || res.token;
    const academyId = res.academy_id || '';
    if (token) localStorage.setItem('vinta_token', token);
    if (academyId) localStorage.setItem('vinta_academy_id', academyId);
    const user = buildUser(res);
    ctx.setUser(user);
    const profiles = await authApi.getProfiles(academyId);
    ctx.setProfiles(Array.isArray(profiles) ? profiles : []);
    ctx.setScreen('profiles');
    return res;
  }, [ctx]);

  const signup = useCallback(async (data: SignupRequest) => {
    let academyId: string;

    try {
      // Step 1: Create the academy
      const signupRes = await authApi.signup(data) as any;
      academyId = signupRes.academy_id;

      // Step 2: Create the owner profile
      const ownerName = data.name || data.email.split('@')[0];
      try {
        await authApi.createOwner({
          academy_id: academyId,
          name: ownerName,
          email: data.email,
          password: data.password,
          pin: '1234',
        });
      } catch (ownerErr: any) {
        // 409 = owner already exists, that's fine — just login
        if (ownerErr.response?.status !== 409) throw ownerErr;
      }
    } catch {
      // Academy creation failed — try login (academy might already exist)
      const loginRes = await authApi.login({ email: data.email, password: data.password }) as any;
      const token = loginRes.access_token || loginRes.token;
      const existingAcademyId = loginRes.academy_id || '';
      if (token) localStorage.setItem('vinta_token', token);
      if (existingAcademyId) localStorage.setItem('vinta_academy_id', existingAcademyId);
      ctx.setUser(buildUser(loginRes));
      const profiles = await authApi.getProfiles(existingAcademyId);
      ctx.setProfiles(Array.isArray(profiles) ? profiles : []);
      ctx.setScreen('profiles');
      return loginRes;
    }

    // Step 3: Login to get JWT token
    const loginRes = await authApi.login({ email: data.email, password: data.password }) as any;
    const token = loginRes.access_token || loginRes.token;
    if (token) localStorage.setItem('vinta_token', token);
    if (academyId) localStorage.setItem('vinta_academy_id', academyId);
    ctx.setUser(buildUser(loginRes));

    // Step 4: Get profiles
    const profiles = await authApi.getProfiles(academyId);
    ctx.setProfiles(Array.isArray(profiles) ? profiles : []);
    ctx.setScreen('profiles');
    return loginRes;
  }, [ctx]);

  const selectProfile = useCallback(async (userId: string) => {
    ctx.setNeedPin(true);
    const pending = ctx.profiles.find((p) => p.id === userId) || null;
    ctx.setPendingStaff(pending);
  }, [ctx]);

  const verifyPin = useCallback(async (pin: string) => {
    if (!ctx.pendingStaff) return;
    const academyId = localStorage.getItem('vinta_academy_id') || ctx.pendingStaff.academy_id;
    const res = await authApi.verifyPin({ userId: ctx.pendingStaff.id, pin }) as any;
    const token = res.access_token || res.token;
    if (token) localStorage.setItem('vinta_token', token);
    if (res.academy_id) localStorage.setItem('vinta_academy_id', res.academy_id);
    ctx.setUser(buildUser({ ...res, academy_id: res.academy_id || academyId }));
    ctx.setNeedPin(false);
    ctx.setPendingStaff(null);
    ctx.setScreen('success');
    setTimeout(() => ctx.setScreen('app'), 1500);
  }, [ctx]);

  const logout = useCallback(() => {
    ctx.logout();
  }, [ctx]);

  return { ...ctx, login, signup, selectProfile, verifyPin, logout };
}
