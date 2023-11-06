<template>
  <v-container>
    <div class="d-flex justify-space-between align-center py-5">
      <h1>Top Quotes by Andrew Tate</h1>
      <v-btn color="secondary" @click="navigateTo(`quote/create-new-quote`)"
        >Add new Quote</v-btn
      >
    </div>
    <QuoteList
      :quotes="quotes"
      :hasMore="hasMore"
      :loadMoreQuotes="loadMoreQuotes"
      @quoteDeleted="removeQuote"
    />
  </v-container>
</template>

<script setup>
const { quotes, hasMore, loadMoreQuotes } = useInfiniteQuotes();
async function fetchData() {
  await loadMoreQuotes();
}
fetchData();
const removeQuote = (id) => {
  console.log("deleted ..." + id);
  fetchData();
  //quotes.value = quotes.value.filter((quote) => quote.id !== id);
};
</script>

<style scoped>
</style>
