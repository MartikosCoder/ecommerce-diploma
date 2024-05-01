export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  tailwindcss: {
    exposeConfig: true,
  },
  ssr: false,
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@nuxtjs/i18n",
  ],
  googleFonts: {
    families: {
      "Open+Sans": true,
    },
    display: "swap",
  },
  i18n: {
    locales: [
      {
        code: "ru",
        file: "ru.json",
      },
      {
        code: "ua",
        file: "ua.json",
      },
      {
        code: "en",
        file: "en.json",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "ua",
    strategy: "no_prefix",
  },
  srcDir: "frontend/",
  serverDir: "backend/",
});
