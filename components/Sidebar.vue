<template>
  <v-navigation-drawer app dark color="blue darken-3" v-model="drawer">
    <v-list nav dense>
      <v-list-item class="justify-content-center">
        <v-list-item-avatar height="80" width="80">
          <v-img src="/placeholder.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <!-- Account Profile -->
      <v-list-group active-class="text-white">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize mb-1">
              {{ getUserInfo.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ getUserInfo.username }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <!-- AUTH -->
        <v-list-item @click="signOut" v-if="$auth.loggedIn">
          <v-list-item-action>
            <v-icon color="red">mdi-power</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Sign Out </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-divider></v-divider>

    <v-list expand nav>
      <template v-for="(item, i) in items">
        <!-- use v-if to determine if 2nd level nesting is needed -->
        <!-- if it's a menu item with no children -->
        <v-list-item
          class="text-decoration-none"
          v-if="!item.children"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <!-- else if it has children -->
        <v-list-group v-else :group="item.to" :key="i" color="white">
          <template #activator>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>

          <!-- this template is for the children/sub-items (2nd level) -->
          <template v-for="subItem in item.children">
            <!-- another v-if to determine if there's a 3rd level -->
            <!-- if there is NOT a 3rd level -->
            <v-list-item
              class="text-decoration-none pl-8"
              v-if="!subItem.children"
              :key="subItem.title"
              :to="item.to + subItem.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "mdi-view-dashboard-outline",
        title: "Dashboard",
        to: "/",
      },

      {
        icon: "mdi-cogs",
        title: "Setups",
        to: "/setups",
        children: [
          {
            icon: "mdi-account-cog",
            title: "Users",
            to: "/users",
          },
        ],
      },
    ],
  }),

  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },

  methods: {
    async signOut() {
      await this.$auth.logout();
      this.$router.push("auth/login");
    },
  },
};
</script>


