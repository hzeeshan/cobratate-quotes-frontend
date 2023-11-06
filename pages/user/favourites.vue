<template>
  <v-container>
    <h1 class="py-5">{{ $userStore.user.name }}'s Favorite Quotes</h1>

    <v-row
      v-if="likedQuotes.length === 0"
      justify="center"
      align="center"
      class="fill-height"
    >
      <v-col cols="12" class="text-center" style="padding-top: 50px">
        <h3>
          You haven't liked any quotes yet. Take a moment to explore and like
          the quotes that resonate with you!
        </h3>
      </v-col>
    </v-row>

    <QuoteList
      v-else
      :quotes="likedQuotes"
      :hasMore="false"
      @quote-unliked="fetchLikedQuotes"
      :showEndOfDataMessage="false"
    />
  </v-container>
</template>

<script setup>
useSeoMeta({
  title: "My Favorites - Cobra Tate Quotes",
  description:
    "Review your favorite Andrew Tate quotes all in one place. Return to the wisdom that resonates with you and curate your personal collection of motivational quotes.",
});

const { $axios } = useNuxtApp();
const { $userStore } = useNuxtApp();
const likedQuotes = ref([]);

const fetchLikedQuotes = async () => {
  try {
    const response = await $axios.get("/api/user/liked-quotes");
    likedQuotes.value = response.data.map((quote) => ({
      ...quote,
      isLikedByUser: true,
    }));
    console.log();
  } catch (error) {
    console.error("Error fetching liked quotes:", error);
  }
};

onMounted(fetchLikedQuotes);
</script>