<template>
  <div>
    <v-container>
      <h1>Fitness Tips By Andrew Tate</h1>
    </v-container>
  </div>
</template>

<script setup>
const { $axios } = useNuxtApp();

const { $userStore } = useNuxtApp();
const { quotes, hasMore, loadMoreQuotes } = useInfiniteQuotes();
async function fetchData() {
  await loadMoreQuotes("fitness");
}
fetchData();
</script>