<template>
  <v-container>
    <h2>Quote ID: {{ $route.params.id }}</h2>

    <v-row>
      <v-col cols="10">
        <Editor v-model="quoteContent" />
      </v-col>

      <v-col cols="10">
        <v-select
          label="Category"
          variant="outlined"
          :items="categories"
          item-title="name"
          item-value="id"
          v-model="selectdCategory"
        ></v-select>
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
const selectdCategory = ref("");
const categories = ref([]);

const setSnackbar = (text, color, visibility) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  showSnackbar.value = visibility;
};

const getQuoteDetails = async () => {
  try {
    const response = await $axios.get(`/quote/${route.params.id}`);
    quoteContent.value = response.data.content;
    selectdCategory.value = response.data.category_id;
  } catch (e) {
    console.error("Error fetching quote details:", e);
  }
};

const handleSubmit = async () => {
  if (confirm("Are you sure ?")) {
    try {
      const response = await $axios.put(`/quote/${route.params.id}`, {
        content: quoteContent.value,
        category: selectdCategory.value,
      });
      if (response.data.success === true) {
        setSnackbar("Quote Updated successfully", "", true);
      }
    } catch (error) {
      console.error("Error updating quote:", error);
    }
  }
};

const getListOfCategories = async () => {
  try {
    const response = await $axios.get(`/api/categories`);
    categories.value = response.data;
  } catch (e) {
    console.log(e);
  }
};

getListOfCategories();

getQuoteDetails();
</script>