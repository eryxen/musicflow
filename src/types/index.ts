// 用户相关类型定义

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  subscription_plan: 'free' | 'basic' | 'pro';
  storage_used: number;
  storage_limit: number;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

// 项目相关类型定义

export type ProjectType = 'separation' | 'generation';
export type ProjectStatus = 'processing' | 'completed' | 'failed';

export interface SeparationOutput {
  vocals?: string;
  instrumental?: string;
  drums?: string;
  bass?: string;
  piano?: string;
  guitar?: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  input_file_url: string;
  input_file_name: string;
  output_files?: SeparationOutput;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  setLoading: (loading: boolean) => void;
}

// 音乐库相关类型定义

export interface Track {
  id: string;
  user_id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  file_url: string;
  cover_url?: string;
  tags: string[];
  is_favorite: boolean;
  play_count: number;
  created_at: string;
}

export interface Playlist {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  cover_url?: string;
  is_public: boolean;
  tracks: string[];
  created_at: string;
  updated_at: string;
}

export interface LibraryState {
  tracks: Track[];
  playlists: Playlist[];
  favorites: Track[];
  isLoading: boolean;
  setTracks: (tracks: Track[]) => void;
  addTrack: (track: Track) => void;
  updateTrack: (id: string, updates: Partial<Track>) => void;
  deleteTrack: (id: string) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  addPlaylist: (playlist: Playlist) => void;
  setFavorites: (tracks: Track[]) => void;
  toggleFavorite: (trackId: string) => void;
  setLoading: (loading: boolean) => void;
}

// 播放器相关类型定义

export type PlaybackMode = 'sequential' | 'single' | 'shuffle' | 'loop';

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  playbackMode: PlaybackMode;
  queue: Track[];
  queueIndex: number;
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackMode: (mode: PlaybackMode) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

// 音频分离相关类型定义

export type SeparationModel = 'vocals' | 'instrumental' | 'drums' | 'bass' | 'piano' | 'guitar' | 'full';

export interface SeparationOptions {
  model: SeparationModel;
  format: 'mp3' | 'wav' | 'flac';
  quality: '128' | '320' | 'lossless';
}

export interface SeparationJob {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  input_file: string;
  output_files?: SeparationOutput;
  error?: string;
  created_at: string;
}

// AI生成相关类型定义

export type MusicGenre = 'pop' | 'electronic' | 'classical' | 'jazz' | 'rock' | 'hip-hop' | 'r&b' | 'folk' | 'ambient' | 'custom';
export type MusicMood = 'happy' | 'sad' | 'relaxed' | 'energetic' | 'romantic' | 'dark' | 'uplifting' | 'melancholic';

export interface GenerationOptions {
  description: string;
  genre: MusicGenre;
  mood: MusicMood;
  duration: number;
  bpm?: number;
  key?: string;
  model: 'suno' | 'minimax';
}

export interface GeneratedTrack {
  id: string;
  url: string;
  title: string;
  duration: number;
  created_at: string;
}

// UI相关类型定义

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface StatsCard {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
}
