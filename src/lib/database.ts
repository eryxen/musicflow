import { supabase, isSupabaseConfigured } from './supabase';
import type { Project, Track, Playlist } from '@/types';

export const db = {
  // Projects
  async getProjects(userId: string): Promise<Project[]> {
    if (!isSupabaseConfigured()) return [];
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return data || [];
  },

  async createProject(project: Partial<Project>): Promise<Project | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    if (error) { console.error(error); return null; }
    return data;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('projects').update(updates).eq('id', id);
    return !error;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    return !error;
  },

  // Tracks
  async getTracks(userId: string): Promise<Track[]> {
    if (!isSupabaseConfigured()) return [];
    const { data } = await supabase
      .from('tracks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return data || [];
  },

  async createTrack(track: Partial<Track>): Promise<Track | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('tracks')
      .insert(track)
      .select()
      .single();
    if (error) { console.error(error); return null; }
    return data;
  },

  async updateTrack(id: string, updates: Partial<Track>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('tracks').update(updates).eq('id', id);
    return !error;
  },

  async deleteTrack(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('tracks').delete().eq('id', id);
    return !error;
  },

  // Storage
  async uploadAudio(userId: string, file: File, bucket = 'audio-uploads'): Promise<string | null> {
    if (!isSupabaseConfigured()) return null;
    const path = `${userId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) { console.error(error); return null; }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },
};
