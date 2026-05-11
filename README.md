# ChannelCraft MVP

Telegram-native MVP for generating channel covers with AI.

## Stack

- Backend: Node.js + TypeScript + Express + grammy + SQLite
- Frontend: React + Vite (Telegram Mini App)
- AI: OpenAI DALL-E 3 with Telegram cover post-processing (1280x640)
- Payments: Telegram Stars (`XTR`) invoices

## Implemented MVP Scope

- Bot commands: `/start`, `/create`, `/gallery`, `/help`, `/pro`
- Mini App pages: Home, Create, Gallery, Settings
- 6 templates: business, crypto, gaming, minimalist, tech, news
- Core flow: template -> prompt -> 3 variants -> HD payment option
- Freemium: 3 free generations/day (watermarked)
- Stars:
  - 100 Stars for HD export
  - 500 Stars monthly Pro
- Webhook endpoint for Telegram updates
- Docker + Railway/Vercel deployment config

## Project structure

```
channelcraft/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

## Environment

Copy `.env.example` to `.env` and fill values.

## Local Run

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Telegram setup

1. Create bot in `@BotFather`.
2. Set commands:
   - `/start`
   - `/create`
   - `/gallery`
   - `/help`
3. Set bot menu button to open Mini App URL.
4. Set webhook:

```bash
https://api.telegram.org/bot<token>/setWebhook?url=<backend-url>/webhook/<TELEGRAM_WEBHOOK_SECRET>
```

## Notes

- `provider_token` is intentionally empty for Telegram Stars (`XTR`).
- Production migration path: SQLite -> Postgres (Railway managed database).
