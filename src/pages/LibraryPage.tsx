import { useState, useEffect } from 'react';
import { useLibraryStore, usePlayerStore } from '@/store';
import {
  Music,
  Search,
  Play,
  Pause,
  Heart,
  MoreVertical,
  Plus,
  ListMusic,
  Clock,
  Disc3,
} from 'lucide-react';

type ViewMode = 'all' | 'favorites' | 'playlists';

export function LibraryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { tracks, playlists, favorites, setTracks, setPlaylists, setFavorites, toggleFavorite } = useLibraryStore();
  const { currentTrack, isPlaying, setCurrentTrack, setQueue, setIsPlaying } = usePlayerStore();

  useEffect(() => {
    // 初始化模拟数据
    if (tracks.length === 0) {
      const mockTracks = [
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
          tags: ['ambient', '放松'],
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
      ];
      setTracks(mockTracks);
      setFavorites(mockTracks.filter((t) => t.is_favorite));
      setPlaylists([
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
      ]);
    }
  }, [tracks.length, setTracks, setPlaylists, setFavorites]);

  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayTracks = viewMode === 'favorites' ? favorites : filteredTracks;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayTrack = (track: typeof tracks[0], index: number) => {
    setCurrentTrack(track);
    setQueue(displayTracks, index);
    setIsPlaying(true);
  };

  const handlePlayAll = () => {
    if (displayTracks.length > 0) {
      setQueue(displayTracks, 0);
      setCurrentTrack(displayTracks[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和搜索 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">音乐库</h1>
          <p className="text-text-secondary">
            {tracks.length} 首音乐 • {playlists.length} 个歌单
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索音乐..."
              className="pl-10 pr-4 py-2 rounded-xl bg-surface-elevated border border-border input-focus w-64"
            />
          </div>
        </div>
      </div>

      {/* 视图切换和播放按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'all'
                ? 'bg-accent/20 text-accent-light'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <Music className="w-4 h-4" />
            全部音乐
          </button>
          <button
            onClick={() => setViewMode('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'favorites'
                ? 'bg-accent/20 text-accent-light'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <Heart className="w-4 h-4" />
            收藏
          </button>
          <button
            onClick={() => setViewMode('playlists')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'playlists'
                ? 'bg-accent/20 text-accent-light'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <ListMusic className="w-4 h-4" />
            歌单
          </button>
        </div>

        {viewMode !== 'playlists' && displayTracks.length > 0 && (
          <button
            onClick={handlePlayAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-accent text-white btn-glow"
          >
            <Play className="w-4 h-4" />
            播放全部
          </button>
        )}
      </div>

      {/* 音乐列表 */}
      {viewMode === 'playlists' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* 新建歌单卡片 */}
          <button className="p-6 rounded-2xl bg-surface/30 border-2 border-dashed border-border hover:border-accent/50 transition-colors flex flex-col items-center justify-center gap-3 min-h-[200px]">
            <div className="w-14 h-14 rounded-xl bg-surface-elevated flex items-center justify-center">
              <Plus className="w-6 h-6 text-text-muted" />
            </div>
            <span className="text-text-muted">创建歌单</span>
          </button>

          {/* 歌单列表 */}
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="p-4 rounded-2xl bg-surface/50 border border-border/50 card-hover cursor-pointer"
            >
              <div className="aspect-square rounded-xl bg-surface-elevated mb-3 overflow-hidden">
                <img
                  src={playlist.cover_url || 'https://picsum.photos/seed/default/300/300'}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium truncate">{playlist.name}</h3>
              <p className="text-sm text-text-muted truncate">
                {playlist.tracks.length} 首音乐
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {displayTracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => handlePlayTrack(track, index)}
              className={`flex items-center gap-4 p-4 rounded-xl transition-colors cursor-pointer ${
                currentTrack?.id === track.id
                  ? 'bg-accent/20 border border-accent/30'
                  : 'bg-surface/30 border border-transparent hover:bg-surface/50'
              }`}
            >
              {/* 封面 */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={track.cover_url || 'https://picsum.photos/seed/default/300/300'}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                {currentTrack?.id === track.id && isPlaying && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="audio-visualizer">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-1 bg-accent-light rounded-full"
                          style={{
                            height: `${Math.random() * 20 + 8}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 歌曲信息 */}
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-accent-light' : ''}`}>
                  {track.title}
                </p>
                <p className="text-sm text-text-muted truncate">{track.artist}</p>
              </div>

              {/* 时长 */}
              <div className="text-sm text-text-muted">
                {formatDuration(track.duration)}
              </div>

              {/* 收藏按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(track.id);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  track.is_favorite
                    ? 'text-error'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={track.is_favorite ? 'currentColor' : 'none'}
                />
              </button>

              {/* 更多按钮 */}
              <button className="p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}

          {displayTracks.length === 0 && (
            <div className="text-center py-16">
              <Music className="w-16 h-16 mx-auto mb-4 text-text-muted opacity-50" />
              <p className="text-lg font-medium mb-2">暂无音乐</p>
              <p className="text-text-muted">
                {viewMode === 'favorites'
                  ? '去收藏一些喜欢的音乐吧'
                  : '开始创建你的音乐库'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 统计信息 */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 mx-auto mb-2">
            <Music className="w-6 h-6 text-accent-light" />
          </div>
          <p className="text-2xl font-bold">{tracks.length}</p>
          <p className="text-sm text-text-muted">总音乐数</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-500/20 mx-auto mb-2">
            <Heart className="w-6 h-6 text-pink-400" />
          </div>
          <p className="text-2xl font-bold">{favorites.length}</p>
          <p className="text-sm text-text-muted">收藏数</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mx-auto mb-2">
            <ListMusic className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-2xl font-bold">{playlists.length}</p>
          <p className="text-sm text-text-muted">歌单数</p>
        </div>
      </div>
    </div>
  );
}
