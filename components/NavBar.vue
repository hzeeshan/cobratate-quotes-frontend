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
            src="/images/logo3.png"
            class="align-center"
            to="/"
          ></v-img>
        </NuxtLink>
      </v-app-bar-title>

      <!-- <v-spacer v-if="mobile"></v-spacer> -->

      <v-spacer v-if="!mobile"></v-spacer>

      <v-toolbar-items v-if="!mobile">
        <v-btn flat to="/" nuxt> Home </v-btn>
        <v-btn flat to="/contact" nuxt> Contact </v-btn>
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
          v-for="item in navItems"
          :key="item.title"
          @click="navigateTo(item.path)"
          class="d-flex align-sm-center"
          :prepend-icon="item.icon"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { useTheme, useDisplay } from "vuetify";

const { $axios } = useNuxtApp();
const { mobile } = useDisplay();
const { $userStore } = useNuxtApp();
const config = useRuntimeConfig();
const darkIcon = "mdi-theme-light-dark";
const lightIcon = "mdi-lightbulb-on";
const switchTheme = ref(false);
const theme = useTheme();

let drawer = ref(false);

const navItems = [
  { title: "Home", icon: "mdi-home", path: "/" },
  { title: "Contact Us", icon: "mdi-contacts", path: "/contact" },
  { title: "Login", icon: "mdi-login", path: "/auth/login" },
];

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  switchTheme.value = theme.global.current.value.dark;
};

const loginWithGoogle = () => {
  window.location.href = `${config.public.apiBaseUrl}/login/google`;
};

const logout = async () => {
  $userStore.logout();
};
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
