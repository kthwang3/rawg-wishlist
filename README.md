# DAWG

Game wishlist app that loads catalogue data from RAWG and stores your wishlist in local storage.

## Current Features

- Browse a live RAWG game catalogue (40 games per fetch).
- Search by game name, tags, or genres.
- Filter catalogue by genre.
- Add games to your wishlist with duplicate-prevention checks.
- Reorder wishlist priority with up/down controls.
- Remove games from the wishlist.
- Persist wishlist data in browser `localStorage` (including date added).
- View game metadata in wishlist cards:
  - release date
  - community rating stars
  - ESRB badge
  - genre/tag chips
- Keep API credentials server-side using a Vercel function (`/api/games`) and `RAWG_API_KEY`.

## Responsive Design

- Uses viewport scaling in `index.html` and global `box-sizing: border-box`.
- Breakpoints:
  - `1660px`: reduces wishlist image width and lets card metadata wrap to prevent clipping.
  - `1100px`: stacks catalogue and wishlist sections; switches catalogue grid to one column.
  - `800px`: changes wishlist cards to a vertical mobile layout.
  - `500px`: reduces page/chip sizing and increases delete button tap target.

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
