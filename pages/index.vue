<template>
  <v-container>
    <div>
      <h1 class="py-5">Top Quotes by Andrew Tate</h1>
    </div>
    <QuoteList
      :quotes="quotes"
      :hasMore="hasMore"
      :loadMoreQuotes="loadMoreQuotes"
    />
  </v-container>
</template>

<script setup>
const { quotes, hasMore, loadMoreQuotes } = useInfiniteQuotes();
async function fetchData() {
  await loadMoreQuotes();
}
fetchData();
</script>

<style scoped>
</style>
