import { create } from 'zustand';
import type { Track, Playlist, LibraryState } from '@/types';

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: [],
  playlists: [],
  favorites: [],
  isLoading: false,
  setTracks: (tracks) => set({ tracks }),
  addTrack: (track) => set((state) => ({ tracks: [track, ...state.tracks] })),
  updateTrack: (id, updates) =>
    set((state) => ({
      tracks: state.tracks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTrack: (id) =>
    set((state) => ({
      tracks: state.tracks.filter((t) => t.id !== id),
      favorites: state.favorites.filter((t) => t.id !== id),
    })),
  setPlaylists: (playlists) => set({ playlists }),
  addPlaylist: (playlist) =>
    set((state) => ({ playlists: [playlist, ...state.playlists] })),
  setFavorites: (favorites) => set({ favorites }),
  toggleFavorite: (trackId) =>
    set((state) => {
      const track = state.tracks.find((t) => t.id === trackId);
      if (!track) return state;

      const isFavorite = track.is_favorite;
      const updatedTrack = { ...track, is_favorite: !isFavorite };

      return {
        tracks: state.tracks.map((t) => (t.id === trackId ? updatedTrack : t)),
        favorites: isFavorite
          ? state.favorites.filter((t) => t.id !== trackId)
          : [...state.favorites, updatedTrack],
      };
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// 模拟音乐库数据
export const mockTracks: Track[] = [
  {
    id: '1',
    user_id: '1',
    title: '夏日微风',
    artist: 'AI创作',
    album: '原创专辑',
    duration: 180,
    file_url: '/music/summer-breeze.mp3',
    cover_url: 'https://picsum.photos/seed/album1/300/300',
    tags: ['电子', '放松'],
    is_favorite: true,
    play_count: 42,
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    user_id: '1',
    title: '城市节奏',
    artist: 'DJ Mix',
    album: '混音集',
    duration: 240,
    file_url: '/music/urban-rhythm.mp3',
    cover_url: 'https://picsum.photos/seed/album2/300/300',
    tags: ['电子', '嘻哈'],
    is_favorite: false,
    play_count: 28,
    created_at: '2024-01-12T14:00:00Z',
  },
  {
    id: '3',
    user_id: '1',
    title: '星空漫步',
    artist: 'AI创作',
    album: '星空系列',
    duration: 210,
    file_url: '/music/starwalk.mp3',
    cover_url: 'https://picsum.photos/seed/album3/300/300',
    tags: [' ambient', '放松'],
    is_favorite: true,
    play_count: 56,
    created_at: '2024-01-15T09:00:00Z',
  },
  {
    id: '4',
    user_id: '1',
    title: '分离后的人声',
    artist: '处理文件',
    duration: 195,
    file_url: '/music/vocals.mp3',
    cover_url: 'https://picsum.photos/seed/vocals/300/300',
    tags: ['分离', '人声'],
    is_favorite: false,
    play_count: 15,
    created_at: '2024-01-16T11:00:00Z',
  },
  {
    id: '5',
    user_id: '1',
    title: '分离后的伴奏',
    artist: '处理文件',
    duration: 195,
    file_url: '/music/instrumental.mp3',
    cover_url: 'https://picsum.photos/seed/instrumental/300/300',
    tags: ['分离', '伴奏'],
    is_favorite: false,
    play_count: 12,
    created_at: '2024-01-16T11:05:00Z',
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    user_id: '1',
    name: '我的最爱',
    description: '精选收藏',
    cover_url: 'https://picsum.photos/seed/playlist1/300/300',
    is_public: false,
    tracks: ['1', '3'],
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    user_id: '1',
    name: '工作学习',
    description: '专注工作时听的音乐',
    cover_url: 'https://picsum.photos/seed/playlist2/300/300',
    is_public: false,
    tracks: ['3'],
    created_at: '2024-01-12T14:00:00Z',
    updated_at: '2024-01-12T14:00:00Z',
  },
];
