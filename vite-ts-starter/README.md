# vite-ts-starter

Default starter for every new project going forward. Vite + TypeScript, with linting,
formatting, and CI wired up from day one so a new repo is productive in minutes, not hours.

## Stack

- **[Vite](https://vitejs.dev/)** — dev server + build (`vanilla-ts` template)
- **TypeScript** — `tsc --noEmit` for typechecking, Vite for transpilation
- **ESLint** (flat config) — `typescript-eslint`'s **type-checked** recommended rules
  (catches things like unsafe `any` usage and floating promises, not just syntax-level issues)
- **Prettier** — formatting, wired through `eslint-config-prettier` so lint and format never fight
- **Husky + lint-staged** — lint/format staged files on every commit
- **GitHub Actions** — lint, format check, typecheck, and build on every PR to `main`

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Start the Vite dev server                     |
| `pnpm build`        | Typecheck (`tsc`) then build for production   |
| `pnpm preview`      | Preview the production build locally          |
| `pnpm lint`         | Run ESLint over the project                   |
| `pnpm lint:fix`     | Run ESLint with `--fix`                       |
| `pnpm format`       | Format the project with Prettier              |
| `pnpm format:check` | Check formatting without writing (used in CI) |
| `pnpm typecheck`    | Run `tsc --noEmit`                            |

## Git hooks

`pnpm install` runs `prepare`, which installs Husky. On every commit, the `pre-commit` hook
runs `lint-staged`, which:

- Runs `eslint --fix` and `prettier --write` on staged `.ts`/`.tsx`/`.js`/`.jsx` files
- Runs `prettier --write` on staged `.json`/`.css`/`.md`/`.html` files

## Editor setup

Open the project in VS Code and install the recommended extensions
(`.vscode/extensions.json`: Prettier, ESLint). `.vscode/settings.json` turns on
**Format on Save** with Prettier and applies ESLint auto-fixes on save, so this works
out of the box with no per-developer configuration.

## CI

`.github/workflows/ci.yml` runs on every PR and push to `main`:

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. `pnpm lint`
3. `pnpm format:check`
4. `pnpm typecheck`
5. `pnpm build`

A PR can't merge with lint errors, formatting drift, type errors, or a broken build.

## Using this as a starter for a new project

```bash
git clone https://github.com/<you>/vite-ts-starter.git my-new-project
cd my-new-project
rm -rf .git
git init
# update package.json "name", README, and repo URL
pnpm install
git add -A && git commit -m "chore: bootstrap from vite-ts-starter"
```

Or use GitHub's **"Use this template"** button if the repo is marked as a template.

## Releases

- `v0.1` — initial starter: Vite + TS + ESLint (flat config) + Prettier + Husky/lint-staged + CI.
