import type { Theme } from "vitepress";
import { yandexMetrika } from "@hywax/vitepress-yandex-metrika";
import DefaultTheme from "vitepress/theme";
import { getYandexMetrikaOptions } from "../metrikaConfig";
import Layout from "./Layout.vue";
import VersionDropdown from "./components/VersionDropdown.vue";
import VersionGrid from "./components/VersionGrid.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component("VersionGrid", VersionGrid);
    app.component("VersionDropdown", VersionDropdown);

    const metrikaOptions = getYandexMetrikaOptions();
    if (metrikaOptions) {
      yandexMetrika(router, metrikaOptions);
    }
  },
} satisfies Theme;
