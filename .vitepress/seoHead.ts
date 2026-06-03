import type { HeadConfig, TransformContext } from "vitepress";

function pagePathToUrl(page: string, cleanUrls: boolean): string {
  let url = page.replace(/\\/g, "/");
  url = url.replace(/(^|\/)index\.md$/, "$1");
  url = url.replace(/\.md$/, cleanUrls ? "" : ".html");
  if (!url.startsWith("/")) {
    url = `/${url}`;
  }
  return url.replace(/\/+/g, "/");
}

export function createTransformHead(siteHostname: string) {
  const ogImage = `${siteHostname}/og-image.png`;

  return (_ctx: TransformContext): HeadConfig[] => {
    const cleanUrls = _ctx.siteConfig.cleanUrls ?? false;
    const pageUrl = `${siteHostname}${pagePathToUrl(_ctx.page, cleanUrls)}`;
    const ogTitle = _ctx.title;
    const ogDescription = _ctx.description;

    return [
      ["meta", { property: "og:title", content: ogTitle }],
      ["meta", { property: "og:description", content: ogDescription }],
      ["meta", { property: "og:url", content: pageUrl }],
      ["meta", { property: "og:image", content: ogImage }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: ogTitle }],
      ["meta", { name: "twitter:description", content: ogDescription }],
      ["meta", { name: "twitter:image", content: ogImage }],
    ];
  };
}
