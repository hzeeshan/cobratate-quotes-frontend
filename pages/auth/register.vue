<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <div>
                <h1 class="py-9">Register</h1>
              </div>
              <v-form
                ref="registationForm"
                v-model="valid"
                @submit.prevent="submit"
              >
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Name"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="Confirm Password"
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
                  <!--  <v-btn color="error" @click="reset" class="ml-5">
                    Reset
                  </v-btn> -->
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
  
<script setup>
const { $userStore } = useNuxtApp();

let valid = ref(true);
let name = ref("");
let email = ref("");
let password = ref("");
let confirmPassword = ref("");

let nameRules = [(v) => !!v || "Name is required"];
let emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
let passwordRules = [(v) => !!v || "Password is required"];
let confirmPasswordRules = computed(() => {
  return [
    (v) => !!v || "Confirm Password is required",
    (v) => v === password.value || "Password and Confirm Password must match",
  ];
});

let registationForm = ref(null);

const submit = async () => {
  const { valid } = await registationForm.value.validate();
  if (valid) {
    // registration logic goes here

    await $userStore.getToken();
    const res = await $userStore.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    console.log(res);
    console.log("submitted ...");
  }
};

const reset = () => {
  form.value.reset();
};
</script>
  