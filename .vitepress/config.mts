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

  return enSidebar(version);
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

  return [{ text: homeLabel, link: home }, { component: "VersionDropdown" }];
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
    logo: "/logo.svg",
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search",
              },
              modal: {
                displayDetails: "Display detailed list",
                resetButtonTitle: "Reset search",
                backButtonTitle: "Close search",
                noResultsText: "No results for",
                footer: {
                  selectText: "to select",
                  selectKeyAriaLabel: "enter",
                  navigateText: "to navigate",
                  navigateUpKeyAriaLabel: "up arrow",
                  navigateDownKeyAriaLabel: "down arrow",
                  closeText: "to close",
                  closeKeyAriaLabel: "escape",
                },
              },
            },
          },
          ru: {
            translations: {
              button: {
                buttonText: "Поиск",
                buttonAriaLabel: "Поиск",
              },
              modal: {
                displayDetails: "Подробный список",
                resetButtonTitle: "Сбросить поиск",
                backButtonTitle: "Закрыть поиск",
                noResultsText: "Ничего не найдено по запросу",
                footer: {
                  selectText: "выбрать",
                  selectKeyAriaLabel: "Enter",
                  navigateText: "навигация",
                  navigateUpKeyAriaLabel: "стрелка вверх",
                  navigateDownKeyAriaLabel: "стрелка вниз",
                  closeText: "закрыть",
                  closeKeyAriaLabel: "Escape",
                },
              },
            },
          },
        },
      },
    },
  },
});
