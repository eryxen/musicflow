const MINIMAX_API_URL = 'https://api.minimax.io/v1';
const MINIMAX_API_KEY = import.meta.env.VITE_MINIMAX_API_KEY;

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

// Default lyrics template
const DEFAULT_LYRICS = `[Verse]
Melody floating in the air
节奏轻快 心跳同步
[ Chorus ]
Music flows like water
All around the world
[Outro]`;

async function callMiniMaxMusic(req: MusicGenerationRequest): Promise<GeneratedMusic[]> {
  if (!MINIMAX_API_KEY) {
    throw new Error('MiniMax API key not configured. Please set VITE_MINIMAX_API_KEY in environment.');
  }

  const lyrics = req.lyrics || DEFAULT_LYRICS;
  const prompt = `${req.genre}, ${req.mood}, ${req.prompt}`;

  const response = await fetch(`${MINIMAX_API_URL}/music_generation`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MINIMAX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'music-2.5',
      prompt: prompt,
      lyrics: lyrics,
      audio_setting: {
        sample_rate: 44100,
        bitrate: 256000,
        format: 'mp3',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`MiniMax API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  
  // Parse response - check for audio_file in the response
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
    throw new Error('No music generated. Please check your API key and try again.');
  }
  
  return results;
}

export async function generateMusic(req: MusicGenerationRequest): Promise<GeneratedMusic[]> {
  if (!MINIMAX_API_KEY) {
    throw new Error('MiniMax API key not configured. Please set VITE_MINIMAX_API_KEY in environment.');
  }
  
  return await callMiniMaxMusic(req);
}
