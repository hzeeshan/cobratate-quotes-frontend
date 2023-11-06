<template>
  <v-container>
    <h2>Quote ID: {{ $route.params.id }}</h2>

    <v-row>
      <v-col cols="10">
        <Editor v-model="quoteContent" />
      </v-col>
      <v-col cols="10">
        <v-btn color="primary" @click="handleSubmit">Submit </v-btn>
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
const route = useRoute();
const quoteContent = ref("");
const showSnackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");

const setSnackbar = (text, color, visibility) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  showSnackbar.value = visibility;
};

const getQuoteDetails = async () => {
  try {
    const response = await $axios.get(`/quote/${route.params.id}`);
    console.log(response.data);
    quoteContent.value = response.data.content;
  } catch (e) {
    console.error("Error fetching quote details:", e);
  }
};

const handleSubmit = async () => {
  try {
    const response = await $axios.put(`/quote/${route.params.id}`, {
      content: quoteContent.value,
    });
    if (response.data.success === true) {
      setSnackbar("Quote Updated successfully", "", true);
    }
  } catch (error) {
    console.error("Error updating quote:", error);
  }
};

getQuoteDetails();
</script>