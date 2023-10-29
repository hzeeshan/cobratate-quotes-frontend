<template>
  <v-container>
    <div>
      <v-list lines="two">
        <v-list-item v-for="quote in quotes" :key="quote.id">
          <div class="d-flex align-center">
            <v-avatar
              image="https://randomuser.me/api/portraits/women/8.jpg"
            ></v-avatar>
            <v-list-item-title class="v-list-item-title ml-3">
              {{ quote.content }}
            </v-list-item-title>
          </div>
          <div class="pt-5">
            <v-divider></v-divider>
          </div>
        </v-list-item>
      </v-list>
    </div>

    <v-row
      v-if="isLoading"
      class="text-center justify-center my-5"
      style="width: 100%; height: 20px"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <div v-if="endOfData" class="end-of-data-message">
      You've seen all the results.
    </div>
  </v-container>
</template>

<script setup>
useSeoMeta({
  title: "My Title",
  description: "My description",
});

const { $axios } = useNuxtApp();
const quotes = ref([]);
const page = ref(1);
const isLoading = ref(false);
const endOfData = ref(false);
const pageSize = ref(10);

const getQuotesList = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.get(`/api/quotes-list?page=${page.value}`);
    quotes.value.push(...response.data);
    page.value++;

    if (response.data.length < pageSize.value) {
      endOfData.value = true;
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};

const onScroll = () => {
  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 500;
  if (nearBottom && !isLoading.value && !endOfData.value) {
    getQuotesList();
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
  getQuotesList();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.v-list-item-title {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;
}
.end-of-data-message {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  color: #666;
}
</style>
