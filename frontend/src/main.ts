/// <reference path="./vite-env.d.ts" />
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { applySeo } from "./config/seo";
import { applyTheme } from "./config/theme";

applyTheme();
applySeo();

createApp(App).mount("#app");
