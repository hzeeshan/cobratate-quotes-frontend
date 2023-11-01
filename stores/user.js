import { defineStore } from "pinia";
import axios from "../plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    user: null,
    csrfToken: null,
  }),

  actions: {
    async checkAuthStatus() {
      try {
        const response = await $axios.get("/api/check-logged-in");
        this.isLoggedIn = response.data.loggedIn;

        // Store the CSRF token
        if (response.data.csrfToken) {
          this.csrfToken = response.data.csrfToken;
          // Set this token as a default Axios header
          $axios.defaults.headers.common["X-CSRF-TOKEN"] = this.csrfToken;
        }

        // Set the user data if the user is logged in
        if (this.isLoggedIn) {
          this.user = response.data.user;
        } else {
          this.user = null;
        }
      } catch (e) {
        console.error("Error during checkAuthStatus:", e);
      }
    },

    async logout() {
      try {
        await $axios.get(`/api/logout`);
        this.isLoggedIn = false;
        this.user = null;
        this.csrfToken = null;
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },

  persist: true,
});
