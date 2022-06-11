<template>
  <div>
    <!-- <v-card class="mx-auto overflow-hidden">

  </v-card> -->

    <v-app>
      <v-app-bar app fixed elevation="1" color="blue darken-3" dark>
        <v-app-bar-nav-icon @click.stop="openDrawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title v-text="title" class="text-uppercase" />
        <v-spacer></v-spacer>
      </v-app-bar>

      <sidebar ref="sidebar" />

      <v-main>
        <Nuxt />
      </v-main>

      <v-footer app>
        <v-row no-gutters class="mx-15">
          <div>&copy; {{ title }} 2022. All Rights Reserved.</div>
          <v-spacer></v-spacer>
          <span
            >Built with ❤️ by:
            <a
              style="text-decoration: none"
              href="https://www.github.com/iamnomana"
              target="_blank"
              rel="noopener noreferrer"
              >Divine Nomana Azianka</a
            >
          </span>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "Nuxt Express Boilerplate",
    miniVariant: false,
    drawer: null,
    fixed: false,
    group: null,

    setups: [],
  }),

  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    async signOut() {
      await this.$auth.logout();
      this.$router.push("auth/login");
    },

    openDrawer() {
      this.$refs.sidebar.drawer == false
        ? (this.$refs.sidebar.drawer = true)
        : (this.$refs.sidebar.drawer = false);
    },
  },
};
</script>

<style >
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 20px !important;
}

::-webkit-scrollbar-thumb {
  background: #a7a5a5;
  border-radius: 30px !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #868588;
}
</style>
