import process from 'node:process'

import { pwa } from './app/config/pwa'
import { appDescription } from './app/config/site'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-og-image',
    'compodium',
    '@vueuse/motion/nuxt',
    '@nuxtjs/supabase',
  ],

  ssr: true,

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      script: [
        {
          'src': 'https://static.cloudflareinsights.com/beacon.min.js',
          'defer': true,
          'data-cf-beacon': '{"token":"042d75339566430ea96243c5fcafbd79"}',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    title: 'Hackathon',
    description: appDescription,
    url: 'https://hackathon.kevinbeier.com',
  },

  ui: {
    prefix: 'Nuxt',
  },

  runtimeConfig: {
    public: {
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            },
          },
        },
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-11-27',

  nitro: {
    preset: process.env.CF_PAGES === '1' ? 'cloudflare-pages' : undefined,
    cloudflare: {
      nodeCompat: true,
    },
    experimental: {
      openAPI: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: [],
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  image: {
    // dir: 'assets/images',
    // format: ['webp', 'jpeg', 'jpg', 'png', 'avif'],
    format: ['webp', 'jpeg', 'jpg', 'png'], // Supported formats
    // domains: ['localhost', 'kevinbeier.com'],
    provider: 'ipx',
  },

  pwa,

  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/dashboard'], // Only guard /dashboard
      // exclude: [],
    },
  },
})
