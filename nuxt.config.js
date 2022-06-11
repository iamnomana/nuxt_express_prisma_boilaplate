const colors = require("vuetify/es5/util/colors");

module.exports = {
  dev: process.env.NODE_ENV !== "production",

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Nuxt Express Template",
    title: "Loading",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Nuxt Express Boilerplate, Nuxt Express Template, Express Prisma Template, ExpressJs, NuxtJs, Prisma, MySql, Sqlite",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/toast",
    "@nuxtjs/auth-next",
    "bootstrap-vue/nuxt",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/api/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
        },
      },
    },
  },

  server: {
    host: "0.0.0.0",
    port: 8080,
  },

  auth: {
    localStorage: true,
    strategies: {
      local: {
        token: {
          property: "accessToken", //property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          global: true,
        },
        user: {
          property: "user",
          autoFetch: true,
        },

        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
          },
          user: {
            url: "/auth/currentUser",
            method: "get",
          },
          logout: false,
        },
      },
    },
    watchLoggedIn: true,
    localStorage: {
      prefix: "auth.",
    },
    redirects: {
      login: "/auth/login",
      logout: "/auth/login",
      // callback: "/",
      home: "/",
    },
  },

  telemetry: false,

  // Toast
  toast: {
    position: "top-right",
    duration: 3000,
    iconPack: "mdi",
    register: [
      // Register custom toasts
      {
        name: "my-error",
        message: "Oops...Something went wrong",
        options: {
          type: "error",
        },
      },
    ],
  },

  router: {
    middleware: ["authenticated"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
