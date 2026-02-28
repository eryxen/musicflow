import { useRef, useEffect } from 'react';
import { usePlayerStore, formatTime } from '@/store';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic,
} from 'lucide-react';

export function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    playbackMode,
    queue,
    setIsPlaying,
    setProgress,
    setDuration,
    setVolume,
    setPlaybackMode,
    nextTrack,
    prevTrack,
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 0.8);
  };

  const cyclePlaybackMode = () => {
    const modes: Array<'sequential' | 'loop' | 'shuffle' | 'single'> = [
      'sequential',
      'loop',
      'shuffle',
      'single',
    ];
    const currentIndex = modes.indexOf(playbackMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setPlaybackMode(modes[nextIndex]);
  };

  const getPlaybackIcon = () => {
    switch (playbackMode) {
      case 'loop':
        return <Repeat className="w-4 h-4" />;
      case 'shuffle':
        return <Shuffle className="w-4 h-4" />;
      default:
        return <ListMusic className="w-4 h-4" />;
    }
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface/80 backdrop-blur-xl border-t border-border z-40">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-center">
          <p className="text-text-muted text-sm">选择一首音乐开始播放</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface/80 backdrop-blur-xl border-t border-border z-40">
      <audio
        ref={audioRef}
        src={currentTrack.file_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />

      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        {/* 歌曲信息 */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <img
            src={currentTrack.cover_url || 'https://picsum.photos/seed/default/300/300'}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover shadow-card"
          />
          <div className="min-w-0">
            <h4 className="font-medium text-sm truncate">{currentTrack.title}</h4>
            <p className="text-xs text-text-muted truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* 播放控制 */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="flex items-center gap-3">
            <button
              onClick={cyclePlaybackMode}
              className={`p-2 rounded-lg transition-colors ${
                playbackMode !== 'sequential'
                  ? 'text-accent-light bg-accent/20'
                  : 'text-text-muted hover:text-foreground'
              }`}
              title={`播放模式: ${playbackMode}`}
            >
              {getPlaybackIcon()}
            </button>
            <button
              onClick={prevTrack}
              className="p-2 rounded-lg text-text-secondary hover:text-foreground transition-colors"
              disabled={queue.length <= 1}
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white shadow-glow hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="p-2 rounded-lg text-text-secondary hover:text-foreground transition-colors"
              disabled={queue.length <= 1}
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* 进度条 */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-text-muted w-10 text-right">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1.5 rounded-full appearance-none bg-border/50 cursor-pointer accent-accent"
              style={{
                background: `linear-gradient(to right, #7c3aed ${
                  (progress / (duration || 1)) * 100
                }%, #2d2d5a ${(progress / (duration || 1)) * 100}%)`,
              }}
            />
            <span className="text-xs text-text-muted w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* 音量控制 */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg text-text-secondary hover:text-foreground transition-colors"
          >
            {volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1.5 rounded-full appearance-none bg-border/50 cursor-pointer accent-accent"
            style={{
              background: `linear-gradient(to right, #7c3aed ${
                volume * 100
              }%, #2d2d5a ${volume * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
