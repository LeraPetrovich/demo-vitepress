# Гайд: добавление новой статьи в документацию JESM (VitePress)

Пошаговая инструкция для разработчиков. Проект: `demo-vitepress/`, контент в `docs/`.

## Как устроена документация

| Слой | Что делает |
|------|------------|
| **Папки `docs/`** | URL страницы = путь к `.md` (отдельного «роутера» нет) |
| **Версии** | `1.2.2` (current), `1.2.1` (archive) — папки `docs/{version}/` и `docs/ru/{version}/` |
| **Языки** | EN — `docs/…`, RU — `docs/ru/…` |
| **Sidebar** | `.vitepress/config/ruSidebar.ts`, `enSidebar.ts` — навигация вручную |
| **Константы** | `.vitepress/config/constants.ts` — версии, current, **точка входа** версии |

```text
docs/
├── index.md                 # разводящая EN (без sidebar)
├── 1.2.2/
│   ├── about-atr.md
│   ├── content.md
│   └── simpleone/login.md
└── ru/
    ├── index.md             # разводящая RU
    └── 1.2.2/
        └── simpleone/login.md
```

---

## Шаг 0. Перед началом

1. Уточните у автора/лида:
   - **в какой версии** появляется команда или статья;
   - нужна ли она только в **current** или также в **archive**;
   - **платформа** (SimpleOne, Jira, Elma365) и **имя команды** (`loginSimpleOne` и т.д.).
2. Запустите локальный просмотр:

```bash
cd demo-vitepress
npm run dev
```

---

## Шаг 1. Выбрать версию

| Сценарий | Действие |
|----------|----------|
| Команда есть только в **текущем** релизе ATR | Создайте файлы в **`1.2.2`** (см. `CURRENT` в `constants.ts`) |
| То же поведение, что в старом релизе | Дублируйте в **`1.2.1`** (archive) |
| Новая **версия документации** (например `1.2.3`) | См. [раздел «Новая версия»](#новая-версия-документации) в конце гайда |

**Current** задаётся в `.vitepress/config/constants.ts`:

```ts
export const VERSIONS = ['1.2.2', '1.2.1'] as const
export const CURRENT = '1.2.2'
export const NODE_VERSION_PAGE = 'about-atr'  // точка входа версии (slug без .md)
```

Переключатель версий в navbar (`VersionDropdown`) и плитки на главной (`VersionGrid`) берут список версий из `VERSIONS` и ведут на страницу **`NODE_VERSION_PAGE`**.

---

## Точка входа версии (обязательно)

У **каждой** версии документации должна быть **одна главная страница** — с неё пользователь начинает чтение после выбора версии.

| Сейчас | Значение |
|--------|----------|
| Slug страницы | `about-atr` |
| Константа | `NODE_VERSION_PAGE` в `.vitepress/config/constants.ts` |
| Файлы контента | `docs/{version}/about-atr.md` и `docs/ru/{version}/about-atr.md` |

**Где используется точка входа:**

- `docs/{version}/index.md` и `docs/ru/{version}/index.md` — `redirect` на эту страницу;
- `VersionDropdown` — переход при смене версии;
- `VersionGrid` — ссылка с плитки версии на разводящей;
- sidebar (блок «Обзор» / «Introduction») — пункт «О модуле» / «About module».

**При добавлении новой версии** обязательно:

1. Создать **`about-atr.md`** (или актуальный slug) **и на RU, и на EN**.
2. Настроить **`index.md`** версии с `redirect` на точку входа (см. [«Новая версия»](#новая-версия-документации)).
3. Добавить пункт в **sidebar** для обеих локалей.

**Если точка входа сменится** (например, с `about-atr` на `getting-started`):

1. Обновить **`NODE_VERSION_PAGE`** в `constants.ts`.
2. Переименовать/создать markdown во **всех** папках версий: `docs/{version}/…` и `docs/ru/{version}/…` для каждого значения из `VERSIONS`.
3. Обновить **`redirect`** во всех `docs/{version}/index.md` и `docs/ru/{version}/index.md`.
4. Обновить ссылки в **`ruSidebar.ts`** и **`enSidebar.ts`** (блок обзора).
5. Проверить вручную: переключатель версий, плитки `VersionGrid`, прямой заход на `/{version}/` и `/ru/{version}/` — везде открывается новая страница без 404.

---

## Шаг 2. Выбрать тип страницы и путь (URL)

### Справочник команды (типичный случай)

Путь по шаблону:

```text
docs/{locale?}/{version}/{platform}/{slug}.md
```

| Поле | Пример | Правило |
|------|--------|---------|
| `locale` | `ru` | Только для русского; EN без префикса |
| `version` | `1.2.2` | Совпадает с папкой версии |
| `platform` | `simpleone`, `jira`, `elma` | Папка платформы, lowercase |
| `slug` | `login`, `get-form` | kebab-case, совпадает с именем файла |

**Итоговые URL:**

- RU: `/ru/1.2.2/simpleone/login`
- EN: `/1.2.2/simpleone/login`

### Обзорные страницы

| Страница | Файлы |
|----------|--------|
| О модуле | `{version}/about-atr.md` |
| Содержание | `{version}/content.md` |

### Разводящие (landing)

`docs/index.md`, `docs/ru/index.md` — **не** добавляют команды в sidebar. У них `sidebar: false` и компонент `<VersionGrid />`.

---

## Шаг 3. Создать markdown на русском (RU)

1. Создайте файл, например:

```text
docs/ru/1.2.2/simpleone/my-command.md
```

2. Заполните **frontmatter** (обязательно для команд):

```yaml
---
title: "[1.2.2] myCommand"
description: "Краткое описание команды одной строкой"
version: "1.2.2"
platform: simpleone
command: myCommand
---
```

| Поле | Зачем |
|------|--------|
| `title` | Вкладка браузера; в поиске помогает отличить версии (`[1.2.2]` не переводить на EN) |
| `description` | SEO / превью |
| `version`, `platform`, `command` | Метаданные для фильтрации и единообразия |

3. Тело страницы — по шаблону существующих команд:

- `# myCommand` — заголовок **без** версии (имя API не меняем)
- `## Синтаксис`, `## Использование`, `## Аргументы`, `## Возвращает`, `## Примеры`
- Внутренние ссылки — **с locale и версией**: `/ru/1.2.2/content#credentials`

4. Блоки кода: `cy.myCommand(...)` — **без** номера версии в коде.

---

## Шаг 4. Создать зеркало на английском (EN)

1. Тот же путь **без** `ru/`:

```text
docs/1.2.2/simpleone/my-command.md
```

2. **Переведите** описание, аргументы, примеры (комментарии в коде — по желанию).
3. **Не переводите:**
   - `title` prefix версии: `"[1.2.2] myCommand"`
   - `command`, `platform`, имена в `cy.*`
4. Ссылки в EN: `/1.2.2/content#credentials` (без `/ru/`).

> Правило: **структура файлов RU и EN должна совпадать** (те же версии, платформы, slug).

---

## Шаг 5. Добавить пункты в sidebar (навигация)

Отдельного роутера нет: страница попадёт в сайт по пути файла, но **в меню слева** она появится только после правки sidebar.

### RU — `.vitepress/config/ruSidebar.ts`

В блок нужной версии (`if (version === "1.2.2")`) добавьте ссылку в группу платформы:

```ts
{
  text: "myCommand",
  link: `/ru/${version}/simpleone/my-command`,
},
```

### EN — `.vitepress/config/enSidebar.ts`

Аналогично:

```ts
{
  text: "myCommand",
  link: `/${version}/simpleone/my-command`,
},
```

Проверьте:

- `text` в sidebar — обычно **имя команды** (`loginSimpleOne`);
- `link` совпадает с реальным путём файла (без `.md`).

Sidebar привязан к префиксу URL в `.vitepress/config.mts`:

```ts
const base = locale === "ru" ? `/ru/${version}/` : `/${version}/`;
sidebars[base] = examplesSidebar(locale, version);
```

---

## Шаг 6. Обновить «Содержание» (при необходимости)

Если команда должна быть в оглавлении:

1. `docs/ru/{version}/content.md` — таблица/список команд RU;
2. `docs/{version}/content.md` — то же на EN.

Используйте ссылки на новую страницу с правильным locale и версией.

---

## Шаг 7. Проверка локально

```bash
npm run dev
```

Чеклист:

- [ ] RU: `/ru/1.2.2/.../my-command` открывается, sidebar виден
- [ ] EN: `/1.2.2/.../my-command` открывается
- [ ] Пункт меню ведёт на ту же страницу (RU и EN)
- [ ] Переключатель версий (navbar) ведёт на точку входа (`NODE_VERSION_PAGE`, сейчас `about-atr`) нужной версии на RU и EN
- [ ] Переключатель языка сохраняет логику путей (`/ru/...` ↔ `/...`)
- [ ] Поиск (Cmd+K): на RU находится RU-страница, на EN — EN; в title виден `[1.2.x]`
- [ ] Внутренние ссылки не ведут на чужой locale/версию
- [ ] `npm run build` проходит без ошибок

```bash
npm run build
npm run preview   # опционально — просмотр production-сборки
```

---

## Шаг 8. Коммит

Рекомендуемый набор файлов в одном MR/коммите:

```text
docs/ru/{version}/.../my-command.md
docs/{version}/.../my-command.md
.vitepress/config/ruSidebar.ts
.vitepress/config/enSidebar.ts
docs/ru/{version}/content.md    # если меняли
docs/{version}/content.md     # если меняли
```

---

## Шаблон frontmatter (команда)

**RU:**

```yaml
---
title: "[1.2.2] commandName"
description: "Описание на русском"
version: "1.2.2"
platform: simpleone | jira | elma365
command: commandName
---
```

**EN:**

```yaml
---
title: "[1.2.2] commandName"
description: "Description in English"
version: "1.2.2"
platform: simpleone | jira | elma365
command: commandName
---
```

---

## Частые ошибки

| Ошибка | Как избежать |
|--------|----------------|
| Страница есть, в меню нет | Забыли `ruSidebar.ts` / `enSidebar.ts` |
| 404 на EN | Файл только в `docs/ru/`, нет зеркала в `docs/` |
| Ссылка ведёт на RU с EN-страницы | В EN-файлах пути без `/ru/` |
| Две версии в поиске не отличить | В `title` frontmatter должен быть `[1.2.x]` |
| Версия в `cy.command()` | Версия только в URL и frontmatter, не в API-примерах |
| Команда только в 1.2.2, но добавлена в sidebar 1.2.1 | Дублируйте файлы и sidebar только там, где команда реально есть |
| 404 после выбора версии | Нет `about-atr.md` (или другого `NODE_VERSION_PAGE`) в этой версии на RU и EN |
| Сменили slug входа, забыли константу | Обновить `NODE_VERSION_PAGE` и все redirect/sidebar/файлы во **всех** версиях |

---

## Новая версия документации

Если появляется, например, **1.2.3**:

1. **`constants.ts`** — добавить в `VERSIONS`, при необходимости сменить `CURRENT`. **`NODE_VERSION_PAGE` не менять**, если точка входа по-прежнему `about-atr`.
2. **Скопировать дерево** `docs/1.2.2/` → `docs/1.2.3/` и `docs/ru/1.2.2/` → `docs/ru/1.2.3/`.
3. **Точка входа (обязательно):** в новой версии должны существовать:
   - `docs/1.2.3/{NODE_VERSION_PAGE}.md` (сейчас `about-atr.md`);
   - `docs/ru/1.2.3/{NODE_VERSION_PAGE}.md`.
   Если файлов нет — переключатель версий и `index.md` отдадут 404.
4. Обновить frontmatter (`version`, `title` с `[1.2.3]`) на всех страницах новой версии.
5. **`ruSidebar.ts` / `enSidebar.ts`** — добавить блок `if (version === "1.2.3")` или обобщить логику; в обзоре — ссылка на точку входа.
6. **`index.md` в версии** — redirect на точку входа (slug = `NODE_VERSION_PAGE`):

```yaml
---
redirect: /1.2.3/about-atr
---
```

   RU: `redirect: /ru/1.2.3/about-atr`

7. **`VersionGrid.vue`** — плитки версий (если нужна новая карточка на разводящей; ссылки строятся из `NODE_VERSION_PAGE` автоматически).
8. Прогнать `npm run build`.

`config.mts` подхватывает новую версию автоматически из `VERSIONS` (цикл `sidebarsForLocale`).

**Чеклист точки входа для каждой версии из `VERSIONS`:**

| Версия | EN `about-atr.md` | RU `about-atr.md` | `index.md` redirect EN | `index.md` redirect RU | Sidebar «О модуле» |
|--------|-------------------|-------------------|------------------------|------------------------|--------------------|
| 1.2.2  | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.2.1  | ☐ | ☐ | ☐ | ☐ | ☐ |
| …новая | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## Справка: ключевые файлы

| Файл | Назначение |
|------|------------|
| `docs/**` | Контент и маршруты (file-based routing) |
| `.vitepress/config.mts` | Locales, search, привязка sidebar к URL |
| `.vitepress/config/constants.ts` | `VERSIONS`, `CURRENT`, `NODE_VERSION_PAGE` (точка входа, сейчас `about-atr`) |
| `.vitepress/config/ruSidebar.ts` | Меню RU по версиям |
| `.vitepress/config/enSidebar.ts` | Меню EN по версиям |
| `.vitepress/theme/components/VersionDropdown.vue` | Переключатель версий |
| `.vitepress/theme/components/VersionGrid.vue` | Плитки на главной |

---

## Быстрый чеклист (новая команда в 1.2.2)

1. [ ] Версия согласована (`1.2.2` / archive / обе)
2. [ ] `docs/ru/1.2.2/{platform}/{slug}.md` создан
3. [ ] `docs/1.2.2/{platform}/{slug}.md` создан (EN)
4. [ ] Frontmatter: `title`, `description`, `version`, `platform`, `command`
5. [ ] `ruSidebar.ts` и `enSidebar.ts` обновлены
6. [ ] `content.md` (RU + EN) при необходимости
7. [ ] Ссылки с `/ru/` и `/` соответственно
8. [ ] `npm run dev` + `npm run build`
