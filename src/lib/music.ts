import { supabase } from './supabase';

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

// MiniMax Music API call
async function callMiniMaxMusic(req: MusicGenerationRequest): Promise<GeneratedMusic[]> {
  if (!MINIMAX_API_KEY) {
    throw new Error('MiniMax API key not configured');
  }

  const response = await fetch(`${MINIMAX_API_URL}/music_generation`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MINIMAX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'music-2.5',
      prompt: `${req.genre}, ${req.mood}, ${req.prompt}`,
      lyrics: req.lyrics || '',
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
  
  // Parse response - MiniMax returns audio URLs in data.audio
  const results: GeneratedMusic[] = [];
  if (data.data && Array.isArray(data.data)) {
    for (const item of data.data) {
      results.push({
        id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
        url: item.audio || item.url || '',
        title: req.prompt.slice(0, 30),
        duration: req.duration || 60,
      });
    }
  }
  
  return results;
}

// Main function to generate music
export async function generateMusic(req: MusicGenerationRequest): Promise<GeneratedMusic[]> {
  try {
    // Try MiniMax first
    if (MINIMAX_API_KEY) {
      return await callMiniMaxMusic(req);
    }
  } catch (error) {
    console.error('MiniMax generation failed:', error);
    throw error;
  }
  
  throw new Error('No music generation API available');
}
