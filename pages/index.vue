<template>
  <v-container>
    <div>
      <h1 class="py-5">Top Quotes by Andrew Tate</h1>
    </div>
    <div>
      <v-list lines="two">
        <v-list-item v-for="quote in quotes" :key="quote.id" class="px-3">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 8 : 1"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              class="py-5"
            >
              <div class="d-flex align-center px-5">
                <v-avatar image="/images/avatar.jpg"></v-avatar>
                <v-list-item-title class="v-list-item-title ml-3">
                  {{ quote.content }}
                </v-list-item-title>
              </div>
              <div class="d-flex justify-end pr-6 mt-3">
                <div class="pr-2 cursor-pointer" @click="copyQuote">
                  <v-icon>mdi-content-copy</v-icon>
                </div>
                <div class="cursor-pointer">
                  <v-icon>mdi-heart</v-icon>
                  <span> 123 </span>
                </div>
              </div>
            </v-card>
          </v-hover>
          <div class="pt-1"></div>
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

const copyQuote = () => {
  console.log("copy ...");
};
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
.on-hover {
  /* Your desired styles for the hovered state */
  background-color: rgba(
    0,
    0,
    0,
    0.1
  ); /* Just an example, could be any other style */
}
.cursor-pointer {
  cursor: pointer;
}
</style>
