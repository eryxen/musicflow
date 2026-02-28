import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore, useProjectStore, useLibraryStore, mockUser, mockProjects, mockTracks } from '@/store';
import {
  Music,
  Volume2,
  Sparkles,
  HardDrive,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  Play,
} from 'lucide-react';

const stats = [
  {
    title: '总处理次数',
    value: '156',
    change: 12,
    icon: Volume2,
    color: 'from-violet-500 to-purple-500',
  },
  {
    title: 'AI生成音乐',
    value: '89',
    change: 8,
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: '存储空间',
    value: '500MB',
    change: 0,
    icon: HardDrive,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: '使用时长',
    value: '12h',
    change: 15,
    icon: Clock,
    color: 'from-emerald-500 to-teal-500',
  },
];

export function DashboardPage() {
  const { user, setUser } = useAuthStore();
  const { projects, setProjects } = useProjectStore();
  const { tracks, setTracks, setFavorites } = useLibraryStore();

  useEffect(() => {
    // 初始化模拟数据
    if (!user) {
      setUser(mockUser);
    }
    if (projects.length === 0) {
      setProjects(mockProjects);
    }
    if (tracks.length === 0) {
      setTracks(mockTracks);
      setFavorites(mockTracks.filter((t) => t.is_favorite));
    }
  }, [user, projects.length, tracks.length, setUser, setProjects, setTracks, setFavorites]);

  const recentProjects = projects.slice(0, 4);
  const recentTracks = tracks.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-surface to-primary border border-accent/20 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                欢迎回来，{user?.name || '创作者'}！
              </h1>
              <p className="text-text-secondary">
                今天想要创作什么音乐？继续你上次的项目或开始新的创作。
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-light text-sm capitalize">
                  {user?.subscription_plan} 会员
                </span>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/separation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-accent text-white btn-glow"
            >
              <Volume2 className="w-5 h-5" />
              音频分离
            </Link>
            <Link
              to="/generation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-elevated border border-border hover:border-accent/50 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              AI生成
            </Link>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-elevated border border-border hover:border-accent/50 transition-colors"
            >
              <Music className="w-5 h-5" />
              音乐库
            </Link>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-5 rounded-xl bg-surface/50 border border-border/50 backdrop-blur-sm card-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              {stat.change !== 0 && (
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{stat.change}%</span>
                </div>
              )}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-text-muted">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 最近项目和音乐 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 最近项目 */}
        <div className="p-6 rounded-2xl bg-surface/50 border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold">最近项目</h2>
            <Link
              to="/projects"
              className="flex items-center gap-1 text-sm text-accent-light hover:text-accent transition-colors"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-elevated/50 hover:bg-surface-elevated transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    project.type === 'separation'
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'bg-pink-500/20 text-pink-400'
                  }`}
                >
                  {project.type === 'separation' ? (
                    <Volume2 className="w-6 h-6" />
                  ) : (
                    <Sparkles className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{project.name}</p>
                  <p className="text-sm text-text-muted">
                    {project.status === 'processing' ? '处理中...' : '已完成'}
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    project.status === 'completed'
                      ? 'bg-success'
                      : project.status === 'processing'
                      ? 'bg-warning animate-pulse'
                      : 'bg-error'
                  }`}
                />
              </div>
            ))}

            {recentProjects.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>暂无项目</p>
                <Link
                  to="/separation"
                  className="inline-flex items-center gap-1 mt-2 text-accent-light hover:text-accent"
                >
                  <Plus className="w-4 h-4" />
                  创建第一个项目
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 最近音乐 */}
        <div className="p-6 rounded-2xl bg-surface/50 border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold">最近音乐</h2>
            <Link
              to="/library"
              className="flex items-center gap-1 text-sm text-accent-light hover:text-accent transition-colors"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentTracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-elevated/50 hover:bg-surface-elevated transition-colors group"
              >
                <div className="relative">
                  <img
                    src={track.cover_url || 'https://picsum.photos/seed/default/300/300'}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-sm text-text-muted truncate">
                    {track.artist}
                  </p>
                </div>
                <div className="text-sm text-text-muted">
                  {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                </div>
              </div>
            ))}

            {recentTracks.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>暂无音乐</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 会员升级提示 */}
      {user?.subscription_plan === 'free' && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-accent-light/10 border border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">
                升级到专业版
              </h3>
              <p className="text-text-secondary text-sm">
                解锁更多功能：无限存储空间、高品质导出、优先处理
              </p>
            </div>
            <Link
              to="/pricing"
              className="px-6 py-2.5 rounded-xl bg-gradient-accent text-white btn-glow whitespace-nowrap"
            >
              查看方案
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
