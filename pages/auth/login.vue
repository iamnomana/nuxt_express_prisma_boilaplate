<template>
  <div>
    <v-card elevation="4" width="500" class="text-left" color="">
      <v-card-title class="justify-center text-uppercase mb-10">
        Login
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="signIn" ref="form" v-model="valid">
          <v-row class="mx-auto">
            <v-text-field
              class="rounded-0"
              label="Username"
              prepend-inner-icon="mdi-account-outline"
              type="text"
              v-model.trim="auth.username"
              outlined
              :rules="[(v) => !!v || 'Username is required']"
            ></v-text-field>
          </v-row>
          <v-row class="mx-auto">
            <v-text-field
              class="rounded-0 mb-3"
              label="Password"
              prepend-inner-icon="mdi-form-textbox-password"
              v-model="auth.password"
              outlined
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
              min="6"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) =>
                  (v && v.length >= 6) ||
                  'Password should be at least 6 characters long',
              ]"
            ></v-text-field>
          </v-row>
          <v-btn
            x-large
            block
            dark
            type="submit"
            color="black"
            class="rounded-0"
          >
            Sign In
            <v-icon right>mdi-login-variant</v-icon>
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="mx-2">
        <!-- <span class="text-uppercase align-right" >forgot password?</span> -->
        <!-- <NuxtLink
          to="/auth/reset_password"
          class="text-capitalize display-none text-right"
          >forgot password?</NuxtLink
        > -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "auth",
  head() {
    return {
      title: "Login",
    };
  },

  data: () => ({
    showPass: false,
    valid: false,
    auth: {},
  }),

  async mounted() {
    this.addAdmin();
  },

  methods: {
    async addAdmin() {
      await this.$axios.post("auth/admin");
    },

    async signIn() {
      if (this.$refs.form.validate()) {
        try {
          const res = await this.$auth.loginWith("local", {
            data: this.auth,
          });

          this.$toast.success(res.data.message, { icon: "check-bold" });
          this.$router.push("/");
        } catch (e) {
          const res = e.response;
          this.$toast.error(res.data.message, { icon: "close-thick" });
        }
      }
    },

    forgotPassword() {},
  },
};
</script>


