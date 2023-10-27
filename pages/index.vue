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
  </v-container>
</template>

<script setup>
useSeoMeta({
  title: "My Title",
  description: "My description",
});

const { $axios } = useNuxtApp();
const quotes = ref([]);
const getQuotesList = async () => {
  try {
    const res = await $axios.get("/api/quotes-list");
    quotes.value = res.data;
    //console.log(res.data);
  } catch (e) {
    console.log(e);
  }
  //console.log(res);
};

getQuotesList();
onMounted(async () => {});
</script>

<style scoped>
.v-list-item-title {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;
}
</style>
