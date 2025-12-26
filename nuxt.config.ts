import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  modules: ["@nuxt/eslint", "shadcn-nuxt", "@nuxtjs/color-mode"],
  components: [
    {
      path: "~/components",
      extensions: [".vue"],
    }
  ],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  colorMode: {
    classSuffix: ""
  },
  runtimeConfig: {
    VT_API_KEY: process.env.VT_API_KEY,
    ABDB_API_KEY: process.env.ABDB_API_KEY,
  },
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        commaDangle: "only-multiline",
        quotes: "double",
      }
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui"
  },
});
