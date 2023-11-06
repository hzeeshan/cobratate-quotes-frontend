<template>
  <v-container>
    <h1 class="py-3">Create New Quote</h1>
    <v-row>
      <v-col cols="12">
        <Editor v-model="quote" />
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="submitQuote">Submit</v-btn>
      </v-col>
    </v-row>

    <Snackbar
      :modelValue="showSnackbar"
      :text="snackbarText"
      :color="snackbarColor"
      @update:modelValue="showSnackbar = $event"
    />
  </v-container>
</template>

<script setup>
const { $axios } = useNuxtApp();
const quote = ref("");
const showSnackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");

const setSnackbar = (text, color, visibility) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  showSnackbar.value = visibility;
};

const submitQuote = async () => {
  if (confirm("Are you sure ?")) {
    try {
      const response = await $axios.post("/api/quotes", {
        content: quote.value,
      });
      if (response.data.success === true) {
        setSnackbar("Quote Inserted successfully", "", true);
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
  }
};
</script>