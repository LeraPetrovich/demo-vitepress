import type { Router } from "vitepress";

export interface YandexMetrikaOptions {
  enabled?: boolean;
  counter: YandexMetrikaCounter | YandexMetrikaCounter[];
  cdn?: {
    tag?: string;
    watch?: string;
  };
}

export interface YandexMetrikaCounter {
  id: number;
  initParams?: {
    defer?: boolean;
    clickmap?: boolean;
    trackLinks?: boolean;
    accurateTrackBounce?: boolean;
    webvisor?: boolean;
    ecommerce?: boolean | string | Array<string | boolean>;
    trustedDomains?: string[];
    childIframe?: boolean;
    type?: number;
    triggerEvent?: boolean;
  };
}

function loadTagScript(src?: string) {
  const script = document.createElement("script");
  script.src = src ?? "https://mc.yandex.ru/metrika/tag.js";
  script.async = true;
  document.body.appendChild(script);
}

function ensureYmStub() {
  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      (window.ym.a = window.ym.a || []).push(args);
    };
  window.ym.l = new Date().getTime();
}

function initCounter(counter: YandexMetrikaCounter, watchBase?: string) {
  if (!window.ym) return;

  window.ym(counter.id, "init", counter.initParams);

  const pixel = document.createElement("img");
  pixel.src = `${watchBase ?? "https://mc.yandex.ru/watch"}/${counter.id}`;
  pixel.style.position = "absolute";
  pixel.style.left = "-9999px";
  const wrap = document.createElement("div");
  wrap.append(pixel);
  document.body.append(wrap);
}

/** SPA-хиты для VitePress 2 (логика @hywax/vitepress-yandex-metrika без peer на VP 1.x). */
export function yandexMetrika(router: Router, options: YandexMetrikaOptions) {
  if (options.enabled === false || typeof window === "undefined") {
    return;
  }

  loadTagScript(options.cdn?.tag);
  ensureYmStub();

  const counters = Array.isArray(options.counter)
    ? options.counter
    : [options.counter];
  for (const counter of counters) {
    initCounter(counter, options.cdn?.watch);
  }

  const previous = router.onAfterRouteChange;
  router.onAfterRouteChange = (href) => {
    const countersMap = window.Ya?._metrika?.counters;
    if (countersMap) {
      Object.values(countersMap).forEach((entry) => entry?.hit(href));
    }
    return previous?.(href);
  };
}

declare global {
  interface Window {
    ym: {
      (...args: unknown[]): void;
      a?: unknown[][];
      l?: number;
    };
    Ya?: {
      _metrika?: {
        counters?: Record<string, { hit?: (href: string) => void }>;
      };
    };
  }
}
