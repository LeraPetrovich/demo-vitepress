import type { DefaultTheme } from "vitepress";

export function ruSidebar(version: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = [
    {
      text: "Обзор",
      items: [
        { text: "О модуле", link: `/ru/${version}/about-atr` },
        { text: "Содержание", link: `/ru/${version}/content` },
      ],
    },
  ];

  if (version === "1.2.1") {
    items.push({
      text: "SimpleOne",
      items: [
        {
          text: "loginSimpleOne",
          link: `/ru/${version}/simpleone/login`,
        },
      ],
    });
  }

  if (version === "1.2.2") {
    items.push({
      text: "SimpleOne",
      items: [
        {
          text: "loginSimpleOne",
          link: `/ru/${version}/simpleone/login`,
        },
        {
          text: "getForm",
          link: `/ru/${version}/simpleone/get-form`,
        },
      ],
    });
    items.push({
      text: "Jira",
      items: [
        {
          text: "jiraLogin",
          link: `/ru/${version}/jira/login`,
        },
        {
          text: "openPortalForm",
          link: `/ru/${version}/jira/open-portal-form`,
        },
      ],
    });
    items.push({
      text: "Elma365",
      items: [
        {
          text: "loginElma",
          link: `/ru/${version}/elma/login`,
        },
        {
          text: "getFormGUID",
          link: `/ru/${version}/elma/get-form-guid`,
        },
      ],
    });
  }

  return items;
}