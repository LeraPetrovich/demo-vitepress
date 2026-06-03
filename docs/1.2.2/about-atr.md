---
title: JESM ATR Module
description: JESM ATR documentation — test automation for BPMS, CRM, ERP, and other systems.
---

# JESM ATR Module (1.2.2)

::: info What you will learn

- What the JESM ATR module is and what it is used for
- Key features and characteristics
- Delivery models
- System requirements
- Module architecture and components

:::

## Purpose

JESM ATR (hereinafter ATR, Automation Test Runner) is one of the JESM platform modules. The module is designed for business process test automation.

The module is adapted to work with the systems below, but is not limited to them:

- [BPMSoft](https://bpmsoft.ru)
- [Elma365](https://elma365.com)
- [Jira](https://www.atlassian.com/software/jira)
- [ServiceNow](https://www.servicenow.com)
- [SimpleOne](https://simpleone.ru)

It enables you to:

- **Testing:** run automated tests of business processes, integrations, client and server logic under different user accounts
- **AI assistant:** use modern AI capabilities to speed up writing and debugging test scenarios
- **DevOps integration:** integrate the module with DevOps tools (GitLab, Bitbucket, Jenkins, etc.) for CI/CD practices, or use it without them
- **Reporting:** notify about test results via email, UI, Telegram channels, or message broker
- **Analysis:** save screenshots during testing and when a test fails

JESM ATR combines several functions (storage, execution, and result processing) in a single interface. It replaces a toolchain such as Jenkins + Playwright|Selenium, etc.

JESM ATR supports writing tests in JavaScript for experienced users, as well as using a no-code builder.

JESM ATR includes a library of ready-made testing methods.

## Who uses JESM ATR?

Our users are companies that use systems for internal business process automation and enterprises (BPMS, CRM, ERP class), including:

- system owners
- test engineers
- system administrators and developers
- release engineers

## Delivery models

JESM ATR can be delivered as:

- **SaaS** — cloud service subscription
- **On-Premises** — deployment on your own server

For each delivery option, you can choose an edition that fits your company:

- **Lite** — simplified functionality (no SSO, test builder, or parameterized plans), up to 50 scenarios and 1 environment
- **Standard** — basic functionality (no SSO), up to 2 scenarios and environments
- **Enterprise** — full functionality, unlimited scenarios and environments

## System requirements {#system-requirements}

Minimum system requirements for **On-Premises**. Actual parameters may be higher depending on load.

- **OS:** Ubuntu Server 22+, Debian 11+, Alma Linux 8+
- **CPU:** x86-64, 4 vCPU or more
- **Disk:** 120 GB\*
- **RAM:** 8 GB\*\* or more

\* The main disk consumer is storage of test scenario screenshots.

\*\* When increasing the number of [workers](#architecture), add +2 GB RAM per worker.

## Architecture and module components {#architecture}

JESM ATR is built on Golang, Vue.js, PostgreSQL, Redis, nginx, and Cypress. It uses Docker-based containerization.

The module can be deployed on customer infrastructure and be available on the Internet or Intranet.

Main components:

- **api**
- **ui**
- **db**
- **queue**
- **worker**

**Worker** is software that runs and executes test scenarios and processes results. There can be several workers; **at least two are recommended**. More workers enable parallel testing and faster queue processing. The worker runs tests in the Chrome browser.

Each component has its own version — consider this when upgrading JESM following vendor guides.

## Theme preview (JESM palette)

Built-in VitePress blocks for checking brand and semantic colors in light/dark mode.

**Text:** regular paragraph, [link to Contents](/1.2.2/content), and `inline code`.

::: info INFO
Neutral informational block. Border and background use `--vp-custom-block-info-*` (brand-related in default theme).
:::

::: tip TIP
Hint or best practice. Uses `--vp-c-tip-*` (aligned with brand green after theming).
:::

::: note NOTE
General note, similar to info. Useful to compare with **info** side by side.
:::

::: important IMPORTANT
Highlighted requirement. Uses purple **important** palette (`--vp-c-important-*`).
:::

::: warning WARNING
Non-critical warning. Yellow palette (`--vp-c-warning-*`), comparable to JESM `$warning` (#FFC700).
:::

::: danger DANGER / ERROR
Error or destructive action. Red palette (`--vp-c-danger-*`), comparable to JESM `$danger` (#F1416C).
:::

::: caution CAUTION
Strong caution (red tones, distinct from warning). Uses `--vp-c-caution-*`.
:::

::: details Collapsible block (details)
Content inside **details** is useful for long notes without cluttering the page. Same typography and link colors as the main doc.
:::
