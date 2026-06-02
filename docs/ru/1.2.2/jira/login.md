---
title: "[1.2.2] jiraLogin"
description: "Выполнить вход в Jira под заданной учётной записью"
version: "1.2.2"
platform: jira
command: jiraLogin
---

# jiraLogin

Выполнить вход в Jira под заданной учётной записью.
Работает при условии возможности входа с логином и паролем через страницу `/login`, либо указанную в параметре `path`.

## Синтаксис

```javascript
cy.jiraLogin(credentialName);
```

## Использование

**Правильное использование**

```javascript
cy.jiraLogin("demo_jesm_test");
```

**Неправильное использование**

```javascript
cy.jiraLogin();
```

## Аргументы

**credentialName** _(String)_

Наименование учётной записи из раздела [Учётные записи](/ru/1.2.2/content#credentials). Обязательный параметр.

## Возвращает

- не возвращает ничего

## Примеры

### Войти в систему под учётной записью demo_jesm_test

```js
describe('Сценарий jiraLogin', () => {
    before(() => {
        cy.jiraLogin("demo_jesm_test");
    });

    it('Проверка команды jiraLogin', () => {
        cy.get('[data-cy="login-error"]').should("not.exist");
    });
});
```
