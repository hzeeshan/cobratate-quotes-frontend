<template>
  <v-main>
    <Head>
      <Title>Contact Us</Title>
    </Head>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <div>
                <h2 class="py-5">Contact Us</h2>
              </div>
              <v-form ref="formRef" v-model="valid">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.name"
                      :rules="nameRules"
                      label="Name"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.email"
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
                      v-model="formData.subject"
                      :rules="subjectRules"
                      label="Subject"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.message"
                      :rules="messageRules"
                      label="Message"
                      required
                      variant="outlined"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row class="d-flex justify-start">
                  <v-btn color="error" class="ml-5"> Reset </v-btn>
                  <v-btn color="primary" @click="submit" class="ml-3 mb-3">
                    Send
                  </v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <section>
      <Snackbar v-model="showSnackbar" :text="snackbarText" />
    </section>
    <section>
      <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </section>
  </v-main>
</template>
  

<script setup>
const { $axios } = useNuxtApp();
const valid = ref(true);
let formData = reactive({
  name: ref(""),
  email: ref(""),
  subject: ref(""),
  message: ref(""),
});

let showSnackbar = ref(false);
let snackbarText = ref("");
let overlay = ref(false);

const nameRules = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
];

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const showSnackbarMessage = (message) => {
  snackbarText.value = message;
  showSnackbar.value = true;
};
const subjectRules = [(v) => !!v || "Subject is required"];
const messageRules = [(v) => !!v || "Message is required"];

const formRef = ref(null);
const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    try {
      overlay.value = true;
      const res = await $axios.post("/api/public/contact-form", {
        data: formData,
      });
      console.log(res);
      if (res.data.success === true) {
        showSnackbarMessage("Sent successfully ");
        formReset();
      }
      overlay.value = false;
    } catch (e) {
      console.log(e);
      showSnackbarMessage("There was some error. Please try again later");
    }
  }
};

const formReset = () => {
  formRef.value.reset();
};
</script>
