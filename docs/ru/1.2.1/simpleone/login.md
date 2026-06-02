---
title: "[1.2.1] loginSimpleOne"
description: "Выполнить вход в SimpleOne под заданной учётной записью"
version: "1.2.1"
platform: simpleone
command: loginSimpleOne
---

# loginSimpleOne

Выполнить вход в SimpleOne под заданной учётной записью.
Работает при условии возможности входа с логином и паролем через страницу `/login`, либо указанную в параметре `path`.

## Синтаксис

```javascript
cy.loginSimpleOne(credentialName, timeout, path);
```

## Использование

**Правильное использование**

```javascript
cy.loginSimpleOne("itsm_agent");
```

**Неправильное использование**

```javascript
cy.loginSimpleOne();
```

## Аргументы

**credentialName** _(String)_

Наименование учётной записи из раздела [Учётные записи](/ru/1.2.1/content#credentials). Обязательный параметр.

**timeout** _(Number)_

Таймаут в мс. Необязательный параметр. Значение по умолчанию — `2000`.

**path** _(String)_

Относительный путь к странице входа в систему. Необязательный параметр. Значение по умолчанию — `'/login'`.

## Возвращает

- ничего

## Примеры

### Войти в систему по пути side-door под учётной записью itsm_agent

```js
describe('Сценарий', () => {
    before(() => {
        cy.loginSimpleOne('itsm_agent', null, '/side-door');
    });

    it('Тест 1', () => {
        // код
    });
});
```
