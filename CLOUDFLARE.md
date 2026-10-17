# Cloudflare Pages hosting

Repository: `Beierthon/wbk-2025-hackathon`, production branch: `main`.
Pages project: `com-kevinbeier-hackathon-2025-wbk`.
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

The Cloudflare build checks that production Supabase configuration is present. Local packaging was verified using the existing public production Supabase configuration; authenticated workflows still require a separate production smoke check.

## Cloudflare protection and logging baseline

The active kevinbeier.com zone uses Full (strict) TLS, minimum TLS 1.2 and HTTPS
redirects. Browser cache TTL is set to respect origin headers. Keep the free
Managed WAF enabled and public custom domains accessible without a login gate.
Browser Integrity Check is disabled only for the existing /api/, /assets/,
/static/, /_next/, /_nuxt/ and /webhooks/ path prefixes; keep Managed WAF active
on these paths. Do not enable blanket Bot Fight Mode. These are shared zone
settings, not Wrangler application settings; deployments must not reset them.
Keep nameservers and iCloud MX, DKIM and TXT records unchanged. Do not enable
R2, paid plans or a registrar transfer, or delete Vercel projects.

This Pages application uses Functions. Pages offers live function log streams,
not the persisted Workers Logs configuration; do not add unsupported Worker-only
observability keys to its Pages Wrangler configuration. Do not log query strings,
tokens or request bodies. Existing Web Analytics and zone security settings remain.

Before proxying wbk.2025.hackathon.kevinbeier.com, confirm that an active
certificate covers this exact deeply nested hostname. The zone's usual wildcard
certificate alone does not cover it. Do not buy a certificate product or switch
DNS while certificate coverage or production checks are unresolved.

## Public production entry points

Keep `main` as the production branch. The additional production `pages.dev` hostname redirects to the official custom domain, preserving path and query. Deployment-specific Pages URLs require Kevin's existing Cloudflare Access login; automatic preview deployments remain disabled. Do not remove the Access protection for the private Planner or Plutos services.
