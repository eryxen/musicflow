# 🎵 MusicFlow

三位一体音乐创作平台：音频分离 + AI音乐生成 + 音乐库管理

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (Auth + PostgreSQL + Storage)
- **UI**: Radix UI + shadcn/ui
- **State**: Zustand

## Quick Start

```bash
pnpm install
cp .env.example .env  # fill in Supabase keys and VITE_MINIMAX_API_KEY
pnpm dev
```

## API Setup

### Development
The dev server uses Vite proxy to forward `/api` requests to MiniMax API.
Make sure to set `VITE_MINIMAX_API_KEY` in your `.env` file.

### Production
Zeabur does not support Vercel-style API routes. For production:

**Option 1: Cloudflare Worker (Recommended)**
```bash
# Create wrangler.toml and worker.js in /api folder
# Deploy with: npx wrangler deploy
```

**Option 2: Use the frontend directly**
Set `VITE_API_BASE=https://api.minimax.io` and configure CORS on MiniMax dashboard.

## Deployment

- **URL**: https://musicflow.zeabur.app/
- **Platform**: Zeabur
