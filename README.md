# Wealthwise CRM UI

Wealthwise CRM UI is the frontend application for the Wealth Management Service. This repository is a TypeScript-based web UI (approx. 97% TypeScript) that implements the client-side of the CRM system.

---

## Table of contents

- Project overview
- Prerequisites
- Quick start
- Available scripts
- Environment variables
- Project structure
- Coding conventions & patterns
- Styling
- State management
- API integration
- Testing
- Building and deployment
- Docker
- CI / CD
- Troubleshooting
- Contributing
- License

---

## Project overview

This repository contains the UI for the Wealthwise CRM. It is written primarily in TypeScript and uses modern frontend tooling. The UI is designed for high developer productivity with static typing, linting, unit tests, and a straightforward build pipeline.

(If the app uses a specific framework such as React, Vue, or Angular, adapt the sections below to match—e.g. `create-react-app`, `Vite + React`, `Next.js`, or `Angular CLI`.)

---

## Prerequisites

- Node.js LTS (>= 18 recommended)
- npm (>= 9) or yarn (>= 1.22 / yarn v3 compatible) — examples use npm
- Git
- Optional: Docker (for container builds)

---

## Quick start

1. Clone the repo

   git clone https://github.com/sreekrishnah/wealthwise-crm-ui.git
   cd wealthwise-crm-ui

2. Install dependencies

   npm install

3. Run the app in development mode

   npm run dev

4. Open the app

   Visit http://localhost:3000 (or the port printed by the dev server)

---

## Available scripts

The following npm scripts are expected in a TypeScript frontend project. Replace or adapt if your project names differ.

- `npm run dev` — Start the development server with hot-reload
- `npm run build` — Build production-optimized assets
- `npm run start` — Serve the production build (if applicable)
- `npm run lint` — Run ESLint
- `npm run format` — Run Prettier (if configured)
- `npm run test` — Run unit tests (e.g., via Jest or Vitest)
- `npm run type-check` — Run TypeScript compiler for type checks

---

## Environment variables

Place environment-specific variables in `.env` files at the project root (e.g., `.env.development`, `.env.production`). Typical variables:

- `VITE_API_BASE_URL` or `REACT_APP_API_BASE_URL` — Base URL for the backend API
- `NODE_ENV` — `development` | `production`
- `SENTRY_DSN` — (optional) Sentry DSN for error reporting

Never commit secrets to source control. Use CI/CD secret storage for production values.

---

## Project structure (recommended)

This section explains the common folders and files you should find in this repository. Adjust to match the actual project structure in your repo.

- `README.md` — Project README (this file)
- `package.json` — npm scripts and dependencies
- `tsconfig.json` — TypeScript configuration
- `public/` — Static assets served as-is (index.html, favicon, static images)
- `src/` — Application source code
  - `src/main.tsx` or `src/index.tsx` — App entrypoint
  - `src/App.tsx` — Root app component and top-level routing
  - `src/pages/` — Route-level page components (each page maps to a route)
  - `src/components/` — Reusable presentational components (buttons, inputs, cards)
  - `src/features/` or `src/modules/` — Feature-specific folders combining UI, services, and tests (recommended for larger apps)
  - `src/services/` or `src/api/` — API clients and HTTP wrappers (fetch/axios)
  - `src/hooks/` — Reusable custom hooks
  - `src/store/` — Global state (Redux/RTK, Zustand, or context-based stores)
  - `src/styles/` — Global styles, variables, themes (CSS/SCSS/modules)
  - `src/assets/` — Images, icons, and fonts
  - `src/types/` — Shared TypeScript types/interfaces
  - `src/utils/` — Utility helpers and small pure functions
  - `src/routes/` — Route definitions and guards
  - `src/i18n/` — Localization resources (if used)
  - `src/tests/` — Integration or e2e tests (if not colocated)

- `tests/` or `cypress/` — End-to-end test suites (optional)
- `.eslintrc` — ESLint configuration
- `.prettierrc` — Prettier configuration
- `.github/workflows/` — CI workflows
- `Dockerfile` — Container image definition (optional)

Notes on structure:
- For small-to-medium apps, colocate component-specific tests next to the component: `src/components/Button/Button.test.tsx`.
- For larger applications, consider a feature-by-folder approach (aka "domain-driven structure") where each feature contains its components, hooks, styles, and tests together.

---

## Coding conventions & patterns

- Use TypeScript types and interfaces for public component props and service responses
- Keep components small and focused — prefer composition over prop bloat
- Prefer functional components and React hooks (if React is used)
- Use a single source of truth for API base URLs via environment variables
- Centralize error handling and user-facing error messages from the API
- Document complex functions and exported utilities with JSDoc-style comments

---

## Styling

Options you might use—choose one or more and document which is in use:

- CSS Modules
- SCSS/Sass
- Tailwind CSS
- Styled Components / Emotion

Keep design tokens (colors, spacing, fonts) in a central file so they are easy to update.

---

## State management

Common approaches:

- Local component state (useState/useReducer)
- React Context for light cross-cutting state
- Redux Toolkit for complex normalized state
- Zustand or Jotai for smaller global state stores

Document where key application state lives (e.g., auth tokens, current user, feature flags).

---

## API integration

- Keep HTTP details inside `src/services/api.ts` (or similar)
- Use a shared API client and centralize request/response interceptors
- Normalize and validate responses where appropriate
- Gracefully handle network errors and show user-friendly messages

---

## Testing

- Unit tests: Jest + Testing Library (React Testing Library) or Vitest
- Integration tests: React Testing Library with mocked API responses
- E2E tests: Playwright or Cypress (keep in `e2e/` or `cypress/`)

Common commands:

- `npm run test` — run unit tests
- `npm run test:watch` — run unit tests in watch mode
- `npm run test:coverage` — produce coverage report

---

## Building and deployment

- `npm run build` should produce static assets in a `dist/` or `build/` folder
- Serve the static build with a static server, or integrate into a hosting service (Netlify, Vercel, Surge, S3+CloudFront)
- Ensure the CI pipeline runs tests and linting before publishing

---

## Docker (optional)

A basic Dockerfile for a static frontend build:

```dockerfile
# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
