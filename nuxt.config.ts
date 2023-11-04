// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/styles/main.sass", "@mdi/font/css/materialdesignicons.css"],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxt/image"],
  extends: ["nuxt-seo-kit"],
  ssr: true,

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      appBaseUrl: process.env.APP_BASE_URL,

      siteUrl: process.env.PUBLIC_SITE_URL || "https://cobratatequotes.com",
      siteName: "Cobra Tate Wisdom - Empowering Quotes Collection",
      siteDescription:
        "Dive into the powerful world of Andrew Tate with a curated selection of his most impactful quotes. Engage, discuss, and be inspired on cobratatequotes.com.",
      language: "en",
    },
  },
});
