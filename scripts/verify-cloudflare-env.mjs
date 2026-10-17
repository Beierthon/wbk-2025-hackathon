import process from 'node:process'

const url = process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY
if (!url || !key || url.includes('migration-build-placeholder') || key.includes('migration-build-placeholder')) {
  throw new Error('Configure the existing production Supabase URL and public client key before building for Cloudflare.')
}
