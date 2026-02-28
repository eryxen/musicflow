import { useState } from 'react';
import { useProjectStore } from '@/store';
import {
  Sparkles,
  Play,
  Pause,
  Download,
  Loader2,
  CheckCircle,
  Wand2,
} from 'lucide-react';
import type { MusicGenre, MusicMood } from '@/types';

const genres: { id: MusicGenre; name: string }[] = [
  { id: 'pop', name: '流行' },
  { id: 'electronic', name: '电子' },
  { id: 'classical', name: '古典' },
  { id: 'jazz', name: '爵士' },
  { id: 'rock', name: '摇滚' },
  { id: 'hip-hop', name: '嘻哈' },
  { id: 'r&b', name: 'R&B' },
  { id: 'folk', name: '民谣' },
  { id: 'ambient', name: '氛围' },
];

const moods: { id: MusicMood; name: string; emoji: string }[] = [
  { id: 'happy', name: '欢快', emoji: '😊' },
  { id: 'sad', name: '悲伤', emoji: '😢' },
  { id: 'relaxed', name: '放松', emoji: '😌' },
  { id: 'energetic', name: '充满能量', emoji: '⚡' },
  { id: 'romantic', name: '浪漫', emoji: '💕' },
  { id: 'dark', name: '暗黑', emoji: '🌙' },
  { id: 'uplifting', name: '振奋', emoji: '✨' },
  { id: 'melancholic', name: '忧郁', emoji: '🌧' },
];

const durations = [15, 30, 60, 90, 120];

export function GenerationPage() {
  const [description, setDescription] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre>('electronic');
  const [selectedMood, setSelectedMood] = useState<MusicMood>('energetic');
  const [duration, setDuration] = useState(60);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<
    { id: string; url: string; title: string; duration: number }[]
  >([]);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const { addProject } = useProjectStore();

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);

    // 模拟生成过程
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 模拟生成结果
    const newTracks = [
      {
        id: Date.now().toString(),
        url: '/music/generated1.mp3',
        title: `AI生成音乐 - ${description.slice(0, 20)}...`,
        duration: duration,
      },
      {
        id: (Date.now() + 1).toString(),
        url: '/music/generated2.mp3',
        title: `AI生成音乐 2 - ${description.slice(0, 15)}...`,
        duration: duration,
      },
      {
        id: (Date.now() + 2).toString(),
        url: '/music/generated3.mp3',
        title: `AI生成音乐 3 - ${description.slice(0, 15)}...`,
        duration: duration,
      },
    ];

    setGeneratedTracks(newTracks);
    setIsGenerating(false);

    // 添加到项目列表
    addProject({
      id: Date.now().toString(),
      user_id: '1',
      name: description.slice(0, 30),
      type: 'generation',
      status: 'completed',
      input_file_url: '',
      input_file_name: '',
      settings: { genre: selectedGenre, mood: selectedMood, duration },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">AI音乐生成</h1>
        <p className="text-text-secondary">
          描述你想要的音乐风格，AI为你创作独特的旋律
        </p>
      </div>

      {/* 生成表单 */}
      <div className="p-6 rounded-2xl bg-surface/50 border border-border/50 space-y-6">
        {/* 音乐描述 */}
        <div>
          <label className="block text-sm font-medium mb-2">
            描述你想要的音乐
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：欢快的电子舞曲，适合派对氛围，120BPM，有强烈的贝斯线..."
            className="w-full h-32 p-4 rounded-xl bg-surface-elevated border border-border input-focus resize-none"
          />
        </div>

        {/* 音乐风格 */}
        <div>
          <label className="block text-sm font-medium mb-2">音乐风格</label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`py-2 px-3 rounded-lg text-sm transition-all ${
                  selectedGenre === genre.id
                    ? 'bg-accent/20 border-accent text-accent-light'
                    : 'bg-surface-elevated/50 border-border hover:border-accent/50'
                } border`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* 音乐情绪 */}
        <div>
          <label className="block text-sm font-medium mb-2">音乐情绪</label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`py-3 rounded-lg text-sm transition-all flex flex-col items-center gap-1 ${
                  selectedMood === mood.id
                    ? 'bg-accent/20 border-accent text-accent-light'
                    : 'bg-surface-elevated/50 border-border hover:border-accent/50'
                } border`}
              >
                <span className="text-lg">{mood.emoji}</span>
                <span>{mood.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 时长选择 */}
        <div>
          <label className="block text-sm font-medium mb-2">音乐时长</label>
          <div className="flex gap-2">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`py-2 px-4 rounded-lg text-sm transition-all ${
                  duration === d
                    ? 'bg-accent/20 border-accent text-accent-light'
                    : 'bg-surface-elevated/50 border-border hover:border-accent/50'
                } border`}
              >
                {d}秒
              </button>
            ))}
          </div>
        </div>

        {/* 生成按钮 */}
        <button
          onClick={handleGenerate}
          disabled={!description.trim() || isGenerating}
          className="w-full py-4 rounded-xl bg-gradient-accent text-white font-medium text-lg btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              AI 正在创作中...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="w-5 h-5" />
              生成音乐
            </div>
          )}
        </button>
      </div>

      {/* 生成进度 */}
      {isGenerating && (
        <div className="p-8 rounded-2xl bg-surface/50 border border-border/50 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-medium mb-2">AI 正在创作你的音乐</p>
          <p className="text-text-muted text-sm">
            这通常需要几秒钟时间，请稍候...
          </p>
        </div>
      )}

      {/* 生成结果 */}
      {generatedTracks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <h2 className="font-display text-lg font-semibold">生成完成</h2>
          </div>

          <div className="grid gap-4">
            {generatedTracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border/50"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 to-accent-light/30 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent-light" />
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPlaying(currentPlaying === track.id ? null : track.id)
                    }
                    className="absolute inset-0 rounded-xl bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  >
                    {currentPlaying === track.id ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-sm text-text-muted">
                    变体 {index + 1} • {track.duration}秒 • {selectedGenre}
                  </p>
                </div>

                <button className="p-3 rounded-xl bg-gradient-accent text-white hover:scale-105 transition-transform">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setGeneratedTracks([]);
                setDescription('');
              }}
              className="flex-1 py-3 rounded-xl border border-border hover:border-accent/50 transition-colors"
            >
              重新生成
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gradient-accent text-white btn-glow">
              全部保存到音乐库
            </button>
          </div>
        </div>
      )}

      {/* 使用说明 */}
      <div className="p-6 rounded-2xl bg-surface/30 border border-border/30">
        <h3 className="font-medium mb-3">使用技巧</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• 描述越详细，生成的音乐越符合你的期望</li>
          <li>• 可以指定特定的乐器、节奏或音乐元素</li>
          <li>• 每次生成3个不同变体供选择</li>
          <li>• 生成的音乐可直接保存到你的音乐库</li>
        </ul>
      </div>
    </div>
  );
}
