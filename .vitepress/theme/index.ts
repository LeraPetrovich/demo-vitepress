import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import VersionDropdown from "./components/VersionDropdown.vue";
import VersionGrid from "./components/VersionGrid.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("VersionGrid", VersionGrid);
    app.component("VersionDropdown", VersionDropdown);
  },
};
