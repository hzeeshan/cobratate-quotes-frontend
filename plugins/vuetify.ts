import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxt) => {
  const customLightTheme = {
    dark: false,
    colors: {
      background: "#f5f5f5",
      surface: "#FFFFFF",
      primary: "#03A9F4",
      secondary: "#424242",
      error: "#B00020",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  };

  const customDarkTheme = {
    dark: true,
    colors: {
      background: "#2E3440",
      surface: "#3B4252",
      primary: "#81A1C1",
      secondary: "#88C0D0",
      error: "#BF616A",
      info: "#5E81F4",
      success: "#A3BE8C",
      warning: "#EBCB8B",
    },
  };

  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        light: customLightTheme,
        dark: customDarkTheme,
      },
    },
  });
  nuxt.vueApp.use(vuetify);
});
