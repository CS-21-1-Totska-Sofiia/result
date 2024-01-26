// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    define: {
      API_URL: JSON.stringify(process.env.API_URL)
    }
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  devServer: {
    port: 5010
  }
})
