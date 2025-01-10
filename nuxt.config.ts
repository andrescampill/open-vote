// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.css'],
  modules: ['@nuxt/icon', 'nuxt-auth-utils'],
  runtimeConfig: {
    version: '1.0.0-beta'
  }
})