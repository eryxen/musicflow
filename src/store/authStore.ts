import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User, AuthState } from '@/types';

// Mock user for development without Supabase
export const mockUser: User = {
  id: 'mock-user-1',
  email: 'demo@musicflow.app',
  name: 'Demo User',
  avatar_url: '',
  subscription_plan: 'free',
  storage_used: 0,
  storage_limit: 524288000,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: async () => {
        if (isSupabaseConfigured()) {
          await supabase.auth.signOut();
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);

// Supabase auth helpers
export async function signUpWithEmail(email: string, password: string, name: string) {
  if (!isSupabaseConfigured()) {
    // Mock mode
    useAuthStore.getState().setUser({ ...mockUser, email, name });
    return { user: mockUser, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) return { user: null, error: error.message };

  if (data.user) {
    const profile = await fetchProfile(data.user.id);
    if (profile) useAuthStore.getState().setUser(profile);
  }

  return { user: data.user, error: null };
}

export async function signInWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    useAuthStore.getState().setUser(mockUser);
    return { user: mockUser, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { user: null, error: error.message };

  if (data.user) {
    const profile = await fetchProfile(data.user.id);
    if (profile) useAuthStore.getState().setUser(profile);
  }

  return { user: data.user, error: null };
}

export async function signInWithGoogle() {
  if (!isSupabaseConfigured()) {
    useAuthStore.getState().setUser(mockUser);
    return { error: null };
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/dashboard' },
  });

  return { error: error?.message || null };
}

export async function signInWithGithub() {
  if (!isSupabaseConfigured()) {
    useAuthStore.getState().setUser(mockUser);
    return { error: null };
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: window.location.origin + '/dashboard' },
  });

  return { error: error?.message || null };
}

async function fetchProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    email: '', // will be filled from auth
    name: data.name || '',
    avatar_url: data.avatar_url || '',
    subscription_plan: data.subscription_plan,
    storage_used: data.storage_used,
    storage_limit: data.storage_limit,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

// Listen for auth state changes
if (isSupabaseConfigured()) {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const profile = await fetchProfile(session.user.id);
      if (profile) {
        profile.email = session.user.email || '';
        useAuthStore.getState().setUser(profile);
      }
    } else if (event === 'SIGNED_OUT') {
      useAuthStore.getState().setUser(null);
    }
  });
}
