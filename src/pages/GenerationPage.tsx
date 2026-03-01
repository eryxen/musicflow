import { useState } from 'react';
import { useProjectStore } from '@/store';
import { generateMusic } from '@/lib/music';
import {
  Sparkles,
  Play,
  Pause,
  Download,
  Loader2,
  CheckCircle,
  Wand2,
  AlertCircle,
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

const durations = [15, 30, 60];

export function GenerationPage() {
  const [description, setDescription] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre>('electronic');
  const [selectedMood, setSelectedMood] = useState<MusicMood>('energetic');
  const [duration, setDuration] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedTracks, setGeneratedTracks] = useState<
    { id: string; url: string; title: string; duration: number }[]
  >([]);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const { addProject } = useProjectStore();

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('请输入音乐描述');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const tracks = await generateMusic({
        prompt: description,
        duration,
        genre: selectedGenre,
        mood: selectedMood,
      });

      setGeneratedTracks(tracks);

      // Save to project store
      addProject({
        id: crypto.randomUUID(),
        user_id: '',
        name: `AI生成 - ${description.slice(0, 20)}`,
        type: 'generation',
        status: 'completed',
        input_file_url: '',
        input_file_name: description,
        output_files: {},
        settings: { genre: selectedGenre, mood: selectedMood },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || '生成失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = (url: string) => {
    if (currentPlaying === url) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(url);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          AI 音乐生成
        </h1>
        <p className="text-gray-400 mt-1">用 AI 创作独特的音乐</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Input Section */}
      <div className="bg-[#16162a] border border-[#2d2d5a] rounded-2xl p-6 mb-6">
        <label className="text-sm text-gray-400 mb-2 block">音乐描述</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="描述你想要什么样的音乐... 例如：欢快的电子舞曲，适合派对"
          className="w-full h-24 bg-[#1e1e3f] border border-[#2d2d5a] rounded-lg p-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
        />

        {/* Genre Selection */}
        <div className="mt-4">
          <label className="text-sm text-gray-400 mb-2 block">音乐风格</label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  selectedGenre === genre.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#1e1e3f] text-gray-300 hover:bg-purple-600/20'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Selection */}
        <div className="mt-4">
          <label className="text-sm text-gray-400 mb-2 block">音乐情绪</label>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  selectedMood === mood.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#1e1e3f] text-gray-300 hover:bg-purple-600/20'
                }`}
              >
                {mood.emoji} {mood.name}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mt-4">
          <label className="text-sm text-gray-400 mb-2 block">时长</label>
          <div className="flex gap-2">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  duration === d
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#1e1e3f] text-gray-300 hover:bg-purple-600/20'
                }`}
              >
                {d}秒
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !description.trim()}
          className="w-full mt-6 h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 rounded-lg font-medium flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              生成音乐
            </>
          )}
        </button>
      </div>

      {/* Generated Results */}
      {generatedTracks.length > 0 && (
        <div className="bg-[#16162a] border border-[#2d2d5a] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            生成完成
          </h2>
          <div className="space-y-3">
            {generatedTracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-4 bg-[#1e1e3f] rounded-lg"
              >
                <button
                  onClick={() => handlePlay(track.url)}
                  className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition"
                >
                  {currentPlaying === track.url ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>
                <div className="flex-1">
                  <p className="text-white text-sm">{track.title}</p>
                  <p className="text-gray-500 text-xs">{track.duration}秒</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-white transition">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
