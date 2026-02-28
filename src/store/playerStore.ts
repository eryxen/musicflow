import { create } from 'zustand';
import type { Track, PlayerState, PlaybackMode } from '@/types';

export const usePlayerStore = create<PlayerState>()((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.8,
  playbackMode: 'sequential',
  queue: [],
  queueIndex: -1,
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setPlaybackMode: (playbackMode) => set({ playbackMode }),
  setQueue: (tracks, startIndex = 0) =>
    set({
      queue: tracks,
      queueIndex: startIndex,
      currentTrack: tracks[startIndex] || null,
    }),
  nextTrack: () => {
    const { queue, queueIndex, playbackMode } = get();
    if (queue.length === 0) return;

    let nextIndex: number;

    switch (playbackMode) {
      case 'shuffle':
        nextIndex = Math.floor(Math.random() * queue.length);
        break;
      case 'loop':
        nextIndex = (queueIndex + 1) % queue.length;
        break;
      case 'single':
        nextIndex = queueIndex;
        break;
      case 'sequential':
      default:
        nextIndex = queueIndex + 1;
        if (nextIndex >= queue.length) {
          nextIndex = 0; // 循环回到开始
        }
        break;
    }

    set({
      queueIndex: nextIndex,
      currentTrack: queue[nextIndex],
      progress: 0,
    });
  },
  prevTrack: () => {
    const { queue, queueIndex } = get();
    if (queue.length === 0) return;

    let prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    set({
      queueIndex: prevIndex,
      currentTrack: queue[prevIndex],
      progress: 0,
    });
  },
}));

// 格式化时间
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
