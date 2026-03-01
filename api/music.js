import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, lyrics, genre, mood, duration } = request.body;
  const apiKey = process.env.MINIMAX_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'API key not configured' });
  }

  try {
    const res = await fetch('https://api.minimax.io/v1/music_generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'music-2.5',
        prompt: `${genre}, ${mood}, ${prompt}`,
        lyrics: lyrics || `[Verse]\n${prompt}\n[Chorus]\nMusic flows\n[Outro]`,
        audio_setting: {
          sample_rate: 44100,
          bitrate: 256000,
          format: 'mp3',
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return response.status(res.status).json(data);
    }

    return response.status(200).json(data);
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}
