# DAWG

Game wishlist app that loads catalogue data from RAWG and stores your wishlist in local storage.

## Deploying To Vercel

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. In Vercel, open `Project Settings -> Environment Variables`.
4. Add:
   - Name: `RAWG_API_KEY`
   - Value: your RAWG API key
   - Environments: Production, Preview, Development
5. Redeploy.

The app reads games through a serverless endpoint at `/api/games`, so your RAWG key stays on the server.

## Local Development

Use Vercel dev so the `/api/games` function runs locally:

```bash
vercel dev
```
