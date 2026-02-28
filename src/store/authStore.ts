import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// 模拟用户数据，用于演示
export const mockUser: User = {
  id: '1',
  email: 'demo@musicflow.app',
  name: '音乐创作者',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=musicflow',
  subscription_plan: 'pro',
  storage_used: 1024 * 1024 * 500, // 500MB
  storage_limit: 1024 * 1024 * 1024, // 1GB
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
};
