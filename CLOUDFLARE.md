# Cloudflare Pages hosting

Repository: `Beierthon/wbk-2025-hackathon`, production branch: `main`.
Pages project: `kevinbeier-hackathon-2025`.
Canonical domain: `wbk.2025.hackathon.kevinbeier.com`.

Use Node 22 and pnpm 10.6.1. Build with `pnpm build:cloudflare`;
output is `dist`, including Nitro's generated `_worker.js`.
The existing Vercel build keeps its default preset when `CF_PAGES` is unset.

Nuxt Content uses the D1 binding `DB` declared in `wrangler.jsonc`. This is
separate from the existing Supabase application data, which stays in Supabase.
Do not move or reseed the Supabase database during this hosting migration.

Before building production, transfer the existing public Supabase URL and
client key directly from Vercel configuration into Cloudflare build variables:
`SUPABASE_URL`, `SUPABASE_KEY`, `NUXT_PUBLIC_SUPABASE_URL`,
`NUXT_PUBLIC_SUPABASE_KEY`. Preserve the production `NUXT_PUBLIC_SITE_URL`.
These values must represent the existing project, not placeholders.

Verify login/confirmation redirects and the protected dashboard without sending
login emails or changing live records during smoke checks. Supabase's existing
allowed canonical callback URL remains unchanged.

Cloudflare Web Analytics replaces the Vercel components. The public beacon token
is in `nuxt.config.ts`; disable automatic Pages beacon injection.

Verify Pages HTML, APIs, static files, image processing, dashboard authentication,
PWA behavior, and custom-domain HTTPS before removing Vercel. Preview builds
must stay disabled until access protection is configured.

The Cloudflare build checks that production Supabase configuration is present. Local packaging was tested using explicit placeholder values; production authentication and data parity still require real configuration.
