// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    "prerender:routes"({routes}) {
      routes.clear()
    }
  },

  experimental: {
    crossOriginPrefetch: true
  },

  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/icon'],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',
  ssr: false,

  router: {
      options: {
        hashMode: true
      }
  },

})