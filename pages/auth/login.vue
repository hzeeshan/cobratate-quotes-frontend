<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <div>
                <h1 class="py-9">Login</h1>
              </div>
              <v-form ref="loginForm" @submit.prevent="submit">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      type="password"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="d-flex justify-start">
                  <v-btn color="primary" @click="submit" class="ml-3 mb-3">
                    Submit
                  </v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Snackbar v-model="showSnackbar" :text="snackbarText" />
  </v-main>
</template>
  
<script setup>
const { $userStore } = useNuxtApp();
let email = ref("");
let password = ref("");

let showSnackbar = ref(false);
let snackbarText = ref("");

let emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
let passwordRules = [(v) => !!v || "Password is required"];

const showSnackbarMessage = (message) => {
  snackbarText.value = message;
  showSnackbar.value = true;
};

let loginForm = ref(null);
const submit = async () => {
  const { valid } = await loginForm.value.validate();
  try {
    if (valid) {
      await $userStore.getToken();
      await $userStore.login(email.value, password.value);
      navigateTo({
        path: `/admin/dashboard`,
      });
    }
  } catch (e) {
    console.log(e);
    showSnackbarMessage(e.response.data.message);
  }
};
</script>