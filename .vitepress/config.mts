import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress";
import { CURRENT, VERSIONS } from "./config/constants";
import { ruSidebar } from "./config/ruSidebar";
import { enSidebar } from "./config/enSidebar";

function examplesSidebar(
  locale: "en" | "ru",
  version: string,
): DefaultTheme.SidebarItem[] {
  if (locale === "ru") {
    return ruSidebar(version);
  }

  return enSidebar(version)
}

function sidebarsForLocale(locale: "en" | "ru") {
  const sidebars: Record<string, DefaultTheme.SidebarItem[]> = {};
  for (const version of VERSIONS) {
    const base = locale === "ru" ? `/ru/${version}/` : `/${version}/`;
    sidebars[base] = examplesSidebar(locale, version);
  }
  return sidebars;
}

function versionNav(locale: "en" | "ru"): DefaultTheme.NavItem[] {
  const home = locale === "ru" ? "/ru/" : "/";
  const homeLabel = locale === "ru" ? "Главная" : "Home";

  return [
    { text: homeLabel, link: home },
    { component: "VersionDropdown" },
  ];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "Jesm documentation",
  description: "Documentation with methods for JESM project",

  locales: {
    root: {
      label: "English",
      lang: "en",
      title: "",
      description: "Documentation with methods for JESM project",
      themeConfig: {
        nav: versionNav("en"),
        sidebar: sidebarsForLocale("en"),
      },
    },
    ru: {
      label: "Русский",
      lang: "ru",
      link: "/ru/",
      title: "",
      description: "Документация по методам проекта JESM",
      themeConfig: {
        nav: versionNav("ru"),
        sidebar: sidebarsForLocale("ru"),
      },
    },
  },

  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    logo:'/logo.svg'
  },
});
