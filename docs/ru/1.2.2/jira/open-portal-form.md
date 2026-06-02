---
title: "[1.2.2] openPortalForm"
description: "Открыть форму портала Jira по идентификаторам темы и формы"
version: "1.2.2"
platform: jira
command: openPortalForm
---

# openPortalForm

Открыть форму портала Jira по идентификаторам темы и формы.

## Синтаксис

```javascript
cy.openPortalForm(themeID, formID);
```

## Использование

**Правильное использование**

```javascript
cy.openPortalForm("4", "53");
```

**Неправильное использование**

```javascript
cy.openPortalForm();
```

## Аргументы

**themeID** _(Number)_

Идентификатор темы портала. Обязательный параметр.

**formID** _(Number)_

Идентификатор формы. Обязательный параметр.

## Возвращает

- не возвращает ничего

## Примеры

### Открыть форму запроса портальной формы

```js
describe('Сценарий openPortalForm', () => {
  it('Проверка команды openPortalForm', () => {
    cy.jiraLoginPortal("z_jesm_admin", 6000, "/plugins/servlet/desk");

    cy.openPortalForm("4", "53");
  });
});
```

## См. также

- `cy.jiraLoginPortal()`
