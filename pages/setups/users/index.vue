<template>
  <div class="px-7 pt-8 pb-10">
    <v-card>
      <v-card-title class="justify-md-space-between">
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-btn color="primary" dark @click="create">
          <v-icon left>mdi-account-plus</v-icon>
          User
        </v-btn>

        <v-col sm="12" md="4">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
            @change="getData"
          ></v-text-field>
        </v-col>
      </v-card-title>

      <v-card-text>
        <b-table
          responsive
          :busy="isLoading"
          show-empty
          outlined
          :items="users"
          :fields="headers"
          :search="search"
        >
          <template #cell(action)="data" class="align-right">
            <b-button class="btn-info" size="sm" @click="editBtn(data.item)">
              <v-icon color="white">mdi-pencil</v-icon>
            </b-button>

            <b-button
              class="btn-dark"
              size="sm"
              @click="disableUserBtn(data.item.id)"
            >
              <v-icon color="white">mdi-cog</v-icon>
            </b-button>
          </template>
        </b-table>
      </v-card-text>
    </v-card>

    <!-- Form Dialog -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-form v-model="valid" ref="form" @submit.prevent="saveData">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model.trim="formData.name"
                    label="Name"
                    required
                    :rules="[() => !!formData.name || 'This field is required']"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model.trim="formData.username"
                    label="Username"
                    required
                    :rules="[
                      () => !!formData.username || 'This field is required',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    label="Select Role"
                    :items="['Administrator', 'Member']"
                    v-model="formData.role"
                    autocomplete
                    :rules="[() => !!formData.role || 'This field is required']"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" :disabled="!valid" type="submit" text>
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Confirm Dialog -->
    <confirm-dialog ref="confirm" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.title,
    };
  },

  data: () => ({
    title: "Users",

    snackbarText: "",
    snackbarColor: "",
    search: "",
    dialog: false,

    showPass: false,
    valid: true,
    isLoading: true,
    editedIndex: -1,
    headers: [
      {
        key: "name",
        sortable: true,
      },
      {
        key: "username",
        sortable: true,
      },
      {
        key: "role",
        sortable: true,
      },
      {
        key: "action",
        class: ["text-center"],
      },
      ,
      "action",
    ],
    users: [],
    formData: {},
    currentUser: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    create() {
      this.dialog = true;
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.$refs.form.reset();
        this.editedIndex = -1;
      });
    },

    getData() {
      // AUTH USER ID
      this.currentUser = this.$store.getters.getUserInfo;

      this.$axios
        .get("users", {
          params: {
            search: this.search,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.isLoading = false;
            this.users = res.data;
          }
        });
    },

    saveData() {
      this.formData.user_id = this.currentUser.id;
      if (this.editedIndex == -1) {
        this.newUser();
      } else {
        this.updateUser();
      }
    },

    newUser() {
      this.$axios
        .post("user", this.formData)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.$toast.success(res.data.message, { icon: "check-bold" });
            this.close();
            this.getData();
          }
        })
        .catch((e) => {
          this.$toast.error(e.response.data.message, { icon: "close-thick" });
        });
    },

    updateUser() {
      this.$axios
        .put("user/" + this.editedIndex, this.formData)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success(res.data.message, { icon: "check-bold" });

            this.close();
            this.getData();
          }
        })
        .catch((e) => {
          this.$toast.error(e.response.data.message, { icon: "close-thick" });
        });
    },

    editBtn(item) {
      this.editedIndex = item.id;
      this.formData = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteBtn(id) {
      if (await this.$refs.confirm.open("Do you wish to delete this data?")) {
        await this.confirmDelete(id);
      }
    },

    confirmDelete(id) {
      this.$axios
        .delete("user/" + id)
        .then((res) => {
          this.$toast.success(res.data.message, { icon: "check-bold" });

          this.getData();
        })
        .catch((e) => {
          this.$toast.error(e.response.data.message, { icon: "close-thick" });
        });
    },

    async disableUserBtn(id) {
      if (
        await this.$refs.confirm.open("Do you wish to reset users password?")
      ) {
        await this.disableUser(id);
      }
    },

    async disableUser(id) {
      this.$axios
        .put("user/reset-password/" + id)
        .then((res) => {
          this.$toast.success(res.data.message, { icon: "check-bold" });

          this.getData();
        })
        .catch((e) => {
          this.$toast.error(e.response.data.message, { icon: "close-thick" });
        });
    },
  },
};
</script>


