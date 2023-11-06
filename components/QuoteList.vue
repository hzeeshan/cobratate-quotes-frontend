<template>
  <div>
    <div v-for="quote in quotes" :key="quote.id">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          :elevation="isHovering ? 8 : 1"
          :class="{ 'on-hover': isHovering }"
          v-bind="props"
          class="py-5 px-3 mt-3"
        >
          <div class="d-flex align-center px-5">
            <v-avatar image="/images/avatar.jpg"></v-avatar>
            <v-list-item-title class="v-list-item-title ml-3">
              {{ quote.content }}
            </v-list-item-title>
          </div>
          <div class="d-flex justify-end pr-6 mt-3">
            <div class="pr-2 cursor-pointer" @click="copyQuote(quote.content)">
              <v-tooltip activator="parent" location="top">Copy</v-tooltip>
              <v-icon>mdi-content-copy</v-icon>
            </div>

            <div class="cursor-pointer" @click="toggleQuoteLike(quote)">
              <v-icon :color="quote.isLikedByUser ? 'primary' : 'default'"
                >mdi-heart</v-icon
              >
              <!-- <span> {{ quote.liked_by_users_count }} </span> -->
            </div>
          </div>
        </v-card>
      </v-hover>
      <div class="pt-1"></div>
    </div>
    <!-- Display endOfData message -->
    <div v-if="endOfData" class="end-of-data-message">
      You've seen all the results.
    </div>
    <!-- snackbar -->
    <Snackbar
      :modelValue="showSnackbar"
      :text="snackbarText"
      :color="snackbarColor"
      @update:modelValue="showSnackbar = $event"
    />
    <!-- Display loading icon -->
    <v-row
      v-if="isLoading"
      class="text-center justify-center my-5"
      style="width: 100%; height: 20px"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <!-- login dialog -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card class="pa-6">
          <div class="text-right">
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </div>
          <v-card-title class="text-center">
            Sign up to like this quote
          </v-card-title>
          <v-card-text class="text-center">
            <v-btn @click="loginWithGoogle" class="elevation-2" color="primary">
              <v-icon start>mdi-google</v-icon>
              Sign in with Google
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  quotes: Array,
  hasMore: Boolean, // Indicates if there are more quotes to load
  loadMoreQuotes: Function, // Function to call when more quotes need to be loaded
});
const { $userStore } = useNuxtApp();
const { $axios } = useNuxtApp();
const config = useRuntimeConfig();
const isLoading = ref(false);
const showSnackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");
const dialog = ref(false);
const endOfData = computed(() => !props.hasMore);

const copyQuote = async (content) => {
  try {
    await navigator.clipboard.writeText(content);
    console.log("Quote copied to clipboard:", content);

    setSnackbar("Quote copied to clipboard! 📋", "", true);
  } catch (err) {
    console.error("Failed to copy quote: ", err);
  }
};
const loginWithGoogle = () => {
  window.location.href = `${config.public.apiBaseUrl}/login/google`;
};
const setSnackbar = (text, color, visibility) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  showSnackbar.value = visibility;
};

const onScroll = () => {
  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 500;
  if (nearBottom && !isLoading.value && props.hasMore) {
    isLoading.value = true;
    props.loadMoreQuotes().then(() => {
      isLoading.value = false;
    });
  }
};
onMounted(() => {
  if (props.hasMore) {
    window.addEventListener("scroll", onScroll);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
watch(
  () => props.hasMore,
  (hasMore) => {
    if (hasMore) {
      window.addEventListener("scroll", onScroll);
    } else {
      window.removeEventListener("scroll", onScroll);
    }
  }
);
const toggleQuoteLike = async (quote) => {
  if (!$userStore.isLoggedIn) {
    dialog.value = true;
    return; // exit if the user is not logged in
  }

  const quoteId = quote.id;
  try {
    if (quote.isLikedByUser) {
      // If the user has already liked the quote, we'll unlike it
      const response = await $axios.delete(`/api/quotes/${quoteId}/unlike`);
      if (response.data.success === true) {
        setSnackbar("Quote unliked. ❌", "", true);
      }

      // Update the local state to reflect that the user has unliked the quote
      quote.isLikedByUser = false;
    } else {
      // If the user hasn't liked the quote yet, we'll like it
      const response = await $axios.post(`/api/quotes/${quoteId}/like`);
      if (response.data.success === true) {
        setSnackbar("Quote liked! 🌟", "", true);
      }

      // Update the local state to reflect that the user has liked the quote
      quote.isLikedByUser = true;
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
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
.end-of-data-message {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  color: #666;
}
</style>