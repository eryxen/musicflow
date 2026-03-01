const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export interface MusicGenerationRequest {
  prompt: string;
  lyrics?: string;
  duration?: number;
  genre?: string;
  mood?: string;
}

export interface GeneratedMusic {
  id: string;
  url: string;
  title: string;
  duration: number;
}

export async function generateMusic(req: MusicGenerationRequest): Promise<GeneratedMusic[]> {
  // Build request body according to MiniMax API format
  const body: any = {
    model: 'music-2.5',
    prompt: `${req.genre || ''}, ${req.mood || ''}, ${req.prompt}`.trim(),
    lyrics: req.lyrics || `[Verse]\n${req.prompt}\n[Chorus]\nMusic flows\n[Outro]`,
    audio_setting: {
      sample_rate: 44100,
      bitrate: 256000,
      format: 'mp3',
    },
  };
  
  if (req.duration) {
    body.audio_setting.duration = req.duration;
  }

  const response = await fetch(`${API_BASE}/music_generation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_MINIMAX_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error?.message || error.error || `API error: ${response.status}`);
  }

  const data = await response.json();
  
  const results: GeneratedMusic[] = [];
  if (data.data && Array.isArray(data.data)) {
    for (const item of data.data) {
      results.push({
        id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
        url: item.audio_file?.url || item.audio_file || item.url || '',
        title: req.prompt.slice(0, 30) || 'AI Generated Music',
        duration: req.duration || 60,
      });
    }
  }
  
  if (results.length === 0) {
    throw new Error('No music generated. Please try again.');
  }
  
  return results;
}
