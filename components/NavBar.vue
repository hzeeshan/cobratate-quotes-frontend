<template>
  <div>
    <v-app-bar color="primary" dense dark height="80">
      <v-btn icon @click="drawer = !drawer" v-if="mobile">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-app-bar-title>
        <NuxtLink to="/">
          <v-img
            max-height="100"
            width="300"
            src="/images/logo.png"
            class="align-center"
            to="/"
          ></v-img>
        </NuxtLink>
      </v-app-bar-title>

      <!-- <v-spacer v-if="mobile"></v-spacer> -->

      <v-spacer v-if="!mobile"></v-spacer>

      <v-toolbar-items v-if="!mobile">
        <v-btn flat to="/" nuxt> Home </v-btn>
        <v-btn flat to="/user/favourites" nuxt v-if="$userStore.isLoggedIn">
          Favourites
        </v-btn>
        <v-btn flat to="/contact" nuxt> Request Feature </v-btn>
        <v-btn flat v-if="$userStore.isLoggedIn" @click="logout" nuxt>
          Logout
        </v-btn>
        <v-btn flat v-else @click="loginWithGoogle" nuxt> Login </v-btn>

        <v-btn flat class="switch-theme-btn-padding">
          <v-switch
            v-model="switchTheme"
            inset
            @update:modelValue="toggleTheme"
          >
            <template #label>
              <v-icon v-if="switchTheme">{{ darkIcon }}</v-icon>
              <v-icon v-else>{{ lightIcon }}</v-icon>
            </template>
          </v-switch>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app temporary v-model="drawer" v-if="mobile">
      <v-list density="compact" nav>
        <v-list-item
          class="d-flex align-sm-center"
          prepend-icon="mdi-home"
          @click="navigateTo('/')"
        >
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item>
        <v-list-item
          class="d-flex align-sm-center"
          prepend-icon="mdi-contacts"
          @click="navigateTo('/contact')"
        >
          <v-list-item-title> Contact </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="$userStore.isLoggedIn"
          class="d-flex align-sm-center"
          prepend-icon="mdi-login"
          @click="logout"
        >
          <v-list-item-title> logout </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-else
          class="d-flex align-sm-center"
          prepend-icon="mdi-login"
          @click="loginWithGoogle"
        >
          <v-list-item-title> Login </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { useTheme, useDisplay } from "vuetify";

const { mobile } = useDisplay();
const { $userStore } = useNuxtApp();
const config = useRuntimeConfig();
const darkIcon = "mdi-theme-light-dark";
const lightIcon = "mdi-lightbulb-on";
const switchTheme = ref(false);
const theme = useTheme();
const THEME_KEY = "user_theme_preference";
let drawer = ref(false);

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? "light" : "dark";
  theme.global.name.value = newTheme;
  localStorage.setItem(THEME_KEY, newTheme);
  switchTheme.value = theme.global.current.value.dark;
};

const loginWithGoogle = () => {
  window.location.href = `${config.public.apiBaseUrl}/login/google`;
};

const logout = async () => {
  $userStore.logout();
};

onMounted(() => {
  const storedThemePreference = localStorage.getItem(THEME_KEY);
  if (storedThemePreference) {
    theme.global.name.value = storedThemePreference;
    switchTheme.value = storedThemePreference === "dark";
  } else {
    // If no preference is stored, you can use system preference or default to 'light'
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    theme.global.name.value = prefersDark ? "dark" : "light";
    switchTheme.value = prefersDark;
  }
});
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
.v-btn--active {
  background-color: #000000;
}
.switch-theme-btn-padding {
  padding-top: 5px;
  padding-right: 50px;
}
</style>
