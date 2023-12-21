export default function useInfiniteQuotes() {
  const { $axios } = useNuxtApp();
  const quotes = ref([]);
  const page = ref(1);
  const hasMore = ref(true);
  const isLoading = ref(false);

  const loadMoreQuotes = async (category) => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
      const response = await $axios.get(
        `/api/quotes-list?page=${page.value}&category=${category}`
      );
      //console.log(response.data);
      quotes.value.push(...response.data);
      if (response.data.length === 0) hasMore.value = false;
      page.value++;
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    quotes,
    hasMore,
    loadMoreQuotes,
  };
}
