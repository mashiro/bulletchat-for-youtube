import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  autoIcons: {
    grayscaleOnDevelopment: false,
  },
  manifest: {
    name: "Bulletchat for YouTube",
    description: "__MSG_description__",
    default_locale: "en",
  },
});
