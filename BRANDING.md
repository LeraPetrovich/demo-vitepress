# Брендинг JESM UI → VitePress

PoC: визуальная тема документации приведена к токенам **jesm-ui** (`_variables.custom.scss`).  
Вне scope PoC: кастомный footer, шрифты Metronic, полная тёмная обводка code blocks (см. [ниже](#что-не-входило-в-poc)).

## Что изменили: VitePress default → JESM

### Цвета и семантика

| Было (VitePress default) | Стало (JESM) | CSS |
|--------------------------|--------------|-----|
| Brand / ссылки — зелёный accent темы | **Primary** `#3E97FF` | `--vp-c-brand-*` |
| Tip — brand или нейтральный soft | **Success** `#50CD89` | `--vp-c-tip-*` |
| Note / info block — серый soft | Фон **primary-light** `#F1FAFF` | `--vp-custom-block-info-*`, `--vp-custom-block-note-*` |
| Important — отдельный фиолетовый VP | **Info** `#7239EA` + фон `#F8F5FF` | `--vp-c-important-*`, `--vp-custom-block-important-*` |
| Warning / danger | **JESM** `#FFC700` / `#F1416C` | `--vp-c-warning-*`, `--vp-c-danger-*`, `--vp-c-caution-*` |
| Ссылки в `::: info` / `::: details` | **Фиолетовый info**, не primary | `.vp-doc .custom-block.info a` |
| Ссылки в `::: important` | **Фиолетовый info** | `.vp-doc .custom-block.important a` |
| Фон контента light | `#FFFFFF` / neutral | **`#FCFCFC`** | `--vp-c-bg` = `--jesm-bg-app` |
| Фон контента dark | VP dark palette | **`#1C1C1C`** | `.dark { --vp-c-bg }` |

### Navbar (синхронно с doc sidebar)

| Было | Стало (light) | Стало (dark) |
|------|---------------|--------------|
| Navbar всегда один фон / серый текст | Фон **`#FFFFFF`**, текст **`#252F4A`** (как sidebar) | Фон **`#131313`**, текст **белый** `#FFFFFF` |
| Hover пунктов — brand | Hover — **primary** `#3E97FF` | Hover — белый (без приглушения) |
| Колонка логотипа при `has-sidebar` — общий селектор `.title` | Только **колонка логотипа** `> .wrapper > .container > .title` (без ломания меню языка) | то же |
| Логотип | Без фильтра | **`filter: invert`** для белого SVG на тёмном navbar |
| Поиск | VP default | Фон **`#F7F8FB`**, рамка `#E4E6EF`, текст `#252F4A` / белый |
| Встроенный **VPNavBarTranslations** | Текущий язык — **primary**, жирный, без фона | то же |
| Разделители между иконками | VP divider | `#E4E6EF` / `#282A3D` |

### Doc sidebar

| Было | Стало (light) | Стало (dark) |
|------|---------------|--------------|
| VP sidebar colors | **`#FFFFFF`**, текст `#252F4A`, muted `#99A1B7` | **`#131313`**, текст `#CDCDDE`, dashed border `#393945` |
| Active item | Brand text | Фон active **`#F7F8FB`** / `#1C1C21`, текст active — **primary** |

### Custom blocks, код (только светлая тема)

| Было | Стало |
|------|--------|
| Рамка блоков `transparent` — сливаются с `#FCFCFC` | **Цветная рамка** по типу блока + `box-shadow: var(--vp-shadow-1)` |
| Inline `code` — `--vp-c-default-soft` | Белый фон, рамка `#E4E6EF`, лёгкая тень |
| Блоки ` ``` ` + кнопка Copy | Белый фон, рамка `#E4E6EF`, тень; кнопка copy с явной рамкой |
| `code` внутри callout | Доп. рамка `rgba(37, 47, 74, 0.1)` |

Тёмная тема: фоны блоков — **`*-light-dark`** из JESM; отдельные рамки/тени для кода **не добавляли** (контраст на тёмном фоне достаточный).

### Компоненты темы

| Было | Стало |
|------|--------|
| Только встроенный version/locale UI | **VersionDropdown** в nav (как flyout, active версия — primary через `VPMenuLink.active`) |
| Landing версий — plain links | **VersionGrid**: badge «current» — градиент **info → primary** (`#7239EA` → `#3E97FF`), белый текст, рамка |
| GitHub в navbar | Убран (`socialLinks` не задан) |

---

## Токены JESM (справочник)

Источник: `jesm-ui` → `--jesm-*` в `:root` / `.dark` в `custom.css`.

| Токен | Light / общий | Dark |
|-------|----------------|------|
| primary | `#3E97FF` | `#5CADFF` (brand-1 в dark) |
| success (tip) | `#50CD89` | то же |
| info (important links) | `#7239EA` | `#C8ABFA` (important-1) |
| warning | `#FFC700` | то же |
| danger | `#F1416C` | `#F66F81` (danger-1) |
| bg app / body | `#FCFCFC` | `#1C1C1C` |
| header / sidebar bg | `#FFFFFF` (light) | `#131313` |
| sidebar text | `#252F4A` | `#CDCDDE` |
| sidebar active bg | `#F7F8FB` | `#1C1C21` |
| border sidebar | `#E4E6EF` | `#393945` (dashed) |

---

## Проверка

```bash
cd demo-vitepress && npm run dev
```

| URL | Что смотреть |
|-----|----------------|
| `/1.2.2/about-atr` | Callout-блоки, inline code, code + Copy; светлая/тёмная тема |
| `/` или `/ru/` | VersionGrid, badge current |
| Любая doc-страница | Navbar + sidebar: light = белый бар + тёмный текст; dark = `#131313` + белый текст |
| Меню языка (глобус) | Текущий язык — **primary**, без чёрного фона |
| Меню версии | Active версия — **primary** |

Переключатель light/dark: **navbar и doc sidebar меняются вместе** (не «всегда тёмный sidebar»).
