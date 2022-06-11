<template>
  <v-row justify="center">
    <v-dialog v-model="trigger" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5 text-center">
          Confirm Action
        </v-card-title>
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel"> No, Cancel </v-btn>
          <v-btn color="green darken-1" text @click="agree">
            Yes, Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    trigger: false,
    message: null,
    resolve: null,
    reject: null,
    options: {
      noconfirm: false,
    },
  }),
  methods: {
    open(message, options) {
      this.trigger = true;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    agree() {
      this.resolve(true);
      this.trigger = false;
    },

    cancel() {
      this.resolve(false);
      this.trigger = false;
    },
  },
};
</script>


