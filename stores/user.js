import { defineStore } from "pinia";
import axios from "../plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({}),

  actions: {
    async getToken() {},

    async login() {},

    async logout() {},

    async register() {},

    async getUser() {},
    resetState() {},
  },

  persist: true,
});
