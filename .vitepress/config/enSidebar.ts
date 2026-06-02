import type { DefaultTheme } from "vitepress";

export function enSidebar(version: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = [
    {
      text: "Introduction",
      items: [
        { text: "About module", link: `/${version}/about-atr` },
        { text: "Content", link: `/${version}/content` },
      ],
    },
  ];

  if (version === "1.2.1") {
    items.push({
      text: "SimpleOne",
      items: [
        {
          text: "loginSimpleOne",
          link: `/${version}/simpleone/login`,
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
          link: `/${version}/simpleone/login`,
        },
        {
          text: "getForm",
          link: `/${version}/simpleone/get-form`,
        },
      ],
    });
    items.push({
      text: "Jira",
      items: [
        {
          text: "jiraLogin",
          link: `/${version}/jira/login`,
        },
        {
          text: "openPortalForm",
          link: `/${version}/jira/open-portal-form`,
        },
      ],
    });
    items.push({
      text: "Elma365",
      items: [
        {
          text: "loginElma",
          link: `/${version}/elma/login`,
        },
        {
          text: "getFormGUID",
          link: `/${version}/elma/get-form-guid`,
        },
      ],
    });
  }

  return items;
}