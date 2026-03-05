# emberstories-site — Claude Guide

## Commands
- Dev server: `npm run dev` → http://localhost:5173
- Build check: `npm run build`
- Deploy: `git commit -am "..." && git push` (Netlify auto-deploys)
- Add component: `npx shadcn@latest add <name>`

## Stack
- React 19 + Vite 6 + React Router v6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui — components in `src/components/ui/`

## Adding a Page
1. Create `src/pages/MyPage.jsx`
2. Add `<Route path="/my-page" element={<MyPage />} />` in `src/App.jsx`

## Design System (`src/index.css`)
- **Palette**: `bg-ember-purple-500`, `text-ember-gray-900`, etc.
- **Semantic**: `bg-primary` (purple500 #9E18AC), `bg-muted` (gray50), `bg-background` (white), `border-border` (gray200)
- **Headings**: `text-foreground` (black)
- **Body**: `text-muted-foreground` (gray500)
- Theme changes → edit `:root` variables in `src/index.css` only

## Key Files
| File | Purpose |
|------|---------|
| `src/index.css` | Design system — all color tokens |
| `src/App.jsx` | Route definitions |
| `src/main.jsx` | App bootstrap + BrowserRouter |
| `src/pages/` | One file per route |
| `src/components/ui/` | shadcn/ui components |
| `src/lib/utils.js` | `cn()` Tailwind merge utility |
| `public/_redirects` | Netlify SPA routing |
| `components.json` | shadcn/ui config |

## Full Reference
`emberstories-site-kb/0_Site_Overview.md`
