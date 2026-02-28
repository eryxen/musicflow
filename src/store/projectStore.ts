import { create } from 'zustand';
import type { Project, ProjectsState } from '@/types';

export const useProjectStore = create<ProjectsState>()((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      currentProject:
        state.currentProject?.id === id
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject,
    })),
  setCurrentProject: (currentProject) => set({ currentProject }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// 模拟项目数据
export const mockProjects: Project[] = [
  {
    id: '1',
    user_id: '1',
    name: '我的第一首分离歌曲',
    type: 'separation',
    status: 'completed',
    input_file_url: '/tracks/demo.mp3',
    input_file_name: 'demo.mp3',
    output_files: {
      vocals: '/output/vocals.mp3',
      instrumental: '/output/instrumental.mp3',
    },
    settings: { model: 'full' },
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:05:00Z',
  },
  {
    id: '2',
    user_id: '1',
    name: 'AI生成背景音乐',
    type: 'generation',
    status: 'completed',
    input_file_url: '',
    input_file_name: '',
    settings: { genre: 'electronic', mood: 'energetic', duration: 60 },
    created_at: '2024-01-12T14:00:00Z',
    updated_at: '2024-01-12T14:10:00Z',
  },
  {
    id: '3',
    user_id: '1',
    name: '正在处理中...',
    type: 'separation',
    status: 'processing',
    input_file_url: '/tracks/processing.mp3',
    input_file_name: 'processing.mp3',
    settings: { model: 'vocals' },
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:00:00Z',
  },
];
