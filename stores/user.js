import { defineStore } from "pinia";
import axios from "../plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
  }),

  actions: {
    async checkAuthStatus() {
      try {
        const response = await $axios.get("/api/check-logged-in");
        this.isLoggedIn = response.data.loggedIn;
      } catch (e) {
        console.error("Error during logout:", e);
      }
    },
    async logout() {
      try {
        await $axios.get(`/api/logout`);
        this.isLoggedIn = false;
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },

  persist: true,
});
