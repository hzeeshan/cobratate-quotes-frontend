<template>
  <div>
    <v-container>
      <div>
        <h1>Fitness Tips By Andrew Tate</h1>
      </div>

      <QuoteList
        v-if="quotes.length > 0"
        :quotes="quotes"
        :hasMore="hasMore"
        :loadMoreQuotes="loadMoreQuotes"
        @quoteDeleted="removeQuote"
      />
    </v-container>
  </div>
</template>

<script setup>
const { quotes, hasMore, loadMoreQuotes } = useInfiniteQuotes("fitness");
async function fetchData() {
  await loadMoreQuotes();
}
fetchData();
const removeQuote = (id) => {
  console.log("deleted ..." + id);
};
</script>