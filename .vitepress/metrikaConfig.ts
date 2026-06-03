import type { YandexMetrikaOptions } from "./yandexMetrika";

export function getYandexMetrikaOptions(): YandexMetrikaOptions | null {
  const id = Number(import.meta.env.VITE_YANDEX_METRIKA_ID);
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }

  const siteHost = (import.meta.env.VITE_SITE_HOSTNAME as string | undefined)?.trim();
  const trustedDomains = siteHost
    ? [siteHost.replace(/^https?:\/\//, "").replace(/\/+$/, "")]
    : undefined;

  return {
    enabled: import.meta.env.PROD,
    counter: {
      id,
      initParams: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false,
        trustedDomains,
      },
    },
  };
}
