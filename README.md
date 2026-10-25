# danjietang.github.io

Personal website built with React, TypeScript and Vite. Live at https://danjietang.github.io/.

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
npm run lint
```

## Deploying

Pushing to `main` deploys automatically: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site and publishes `dist/` to GitHub Pages. Progress shows under the repo's **Actions** tab.

## Editing content

All text, links and image paths live in [`src/content.ts`](src/content.ts). The components only handle layout.

Anything not filled in yet is wrapped in `todo('...')`:

- `npm run dev` shows it as an `OWNER: ...` chip (or a striped box for images) so you can see what's left.
- `npm run build` leaves it out, so you can deploy before every blank is filled.

To fill one in, replace the `todo(...)` with the real value:

```ts
{ label: 'GitHub', href: todo('GitHub profile URL') }
// becomes
{ label: 'GitHub', href: 'https://github.com/your-handle' }
```

The note text inside `todo(...)` still ends up in the JavaScript bundle even though it isn't shown, so don't put anything private in it.

## Images and files

Put them in `public/` and reference them without a leading slash:

| File                                 | In `content.ts`                 |
| ------------------------------------ | ------------------------------- |
| `public/images/diffusion-cifar10.webp` | `src: 'images/diffusion-cifar10.webp'` |
| `public/files/Danjie_resume.pdf`       | `href: 'files/Danjie_resume.pdf'`      |

## Layout

```
src/
  content.ts              all site copy and links
  index.css               design tokens (colours, fonts) and all styles
  App.tsx                 page order
  components/
    Hero.tsx              name, bio, links, experience list
    ProjectCard.tsx       shared project layout (+ reading list)
    BenchmarkTable.tsx    speedup table (supported, currently unused)
    GemmaDiagram.tsx      GemmaLLM architecture sketch
    PhotoAlbum.tsx        photo tile / swipeable carousel in Personal
    Publications.tsx, Personal.tsx, Header.tsx, Footer.tsx, ...
  lib/todo.ts             the todo() placeholder helper
```

Fonts are self-hosted through Fontsource: Inter for body text, Tinos for headings, Cousine for mono. The footer's "Last updated" date is set automatically at build time.

Original photos and screenshots are kept out of git (see `.gitignore`); only the web copies in `public/images/` are published.
