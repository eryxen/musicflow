const WORKER_URL = 'https://musicflow-api.eryxen.workers.dev';

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
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || err.base_resp?.status_msg || `API error: ${response.status}`);
  }

  const data = await response.json();

  // Handle MiniMax error response
  if (data.base_resp?.status_code && data.base_resp.status_code !== 0) {
    throw new Error(data.base_resp.status_msg || 'MiniMax API error');
  }

  const results: GeneratedMusic[] = [];
  
  // MiniMax returns data.data.audio with hex or url
  if (data.data?.audio_file) {
    results.push({
      id: data.id || crypto.randomUUID(),
      url: data.data.audio_file,
      title: req.prompt?.slice(0, 30) || 'AI Generated Music',
      duration: req.duration || 60,
    });
  } else if (data.data?.audio) {
    results.push({
      id: data.id || crypto.randomUUID(),
      url: data.data.audio,
      title: req.prompt?.slice(0, 30) || 'AI Generated Music',
      duration: req.duration || 60,
    });
  } else if (Array.isArray(data.data)) {
    for (const item of data.data) {
      results.push({
        id: item.id || crypto.randomUUID(),
        url: item.audio_file || item.audio || item.url || '',
        title: req.prompt?.slice(0, 30) || 'AI Generated Music',
        duration: req.duration || 60,
      });
    }
  }

  if (results.length === 0) {
    throw new Error('No music generated');
  }

  return results;
}
