<template>
  <v-container>
    <div class="d-flex justify-space-between align-center py-5">
      <h1>Top Quotes by Andrew Tate</h1>
      <v-btn
        color="secondary"
        v-if="$userStore.isLoggedIn && $userStore.isAdmin"
        @click="navigateTo(`quote/create-new-quote`)"
        >Add new Quote</v-btn
      >
    </div>
    <QuoteList
      v-if="quotes.length > 0"
      :quotes="quotes"
      :hasMore="hasMore"
      :loadMoreQuotes="loadMoreQuotes"
      @quoteDeleted="removeQuote"
    />
  </v-container>
</template>

<script setup>
const { $userStore } = useNuxtApp();
const { quotes, hasMore, loadMoreQuotes } = useInfiniteQuotes("general");
async function fetchData() {
  await loadMoreQuotes();
}
fetchData();
const removeQuote = (id) => {
  console.log("deleted ..." + id);
};
</script>

<style scoped>
</style>
