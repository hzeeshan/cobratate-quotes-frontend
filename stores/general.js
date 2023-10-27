import { defineStore } from "pinia";
import { useUserStore } from "./user";
import axios from "../plugins/axios";

const $axios = axios().provide.axios;

export const useGeneralStore = defineStore("general", {
  state: () => ({}),

  actions: {
    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        (response) => {
          /* call was successfull */
          return response;
        },
        (error) => {
          console.log(error);
          switch (error.response.status) {
            case 401: /* not logged in */
            case 419: /* session expired */
            case 503 /* down for maintenance */:
              useUserStore().resetState();

              //window.location.href = "/";
              break;
            case 500:
              alert("Oops, something went wrong!");
            default: /* allow indiviual request to handle other errors */
              return Promise.reject(error);
          }
        }
      );
    },
  },
  persist: true,
});
