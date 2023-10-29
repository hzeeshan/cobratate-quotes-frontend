<template>
  <div>
    <v-app>
      <SeoKit />
      <NuxtLayout class="bg-ghostWhite">
        <NuxtPage />
      </NuxtLayout>
    </v-app>
  </div>
</template>

<script setup>
const { $userStore } = useNuxtApp();
onMounted(async () => {
  await $userStore.checkAuthStatus();
});
</script>