---
title: "[1.2.2] loginElma"
description: "Выполнить вход в Elma365 под заданной учётной записью"
version: "1.2.2"
platform: elma365
command: loginElma
---

# loginElma

Выполнить вход в Elma365 под заданной учётной записью.

## Синтаксис

```javascript
cy.loginElma(credentialName, timeout, path);
```

## Использование

**Правильное использование**

```javascript
cy.loginElma("crm_user");
```

**Неправильное использование**

```javascript
cy.loginElma();
```

## Аргументы

**credentialName** _(String)_

Наименование учётной записи из раздела [Учётные записи](/ru/1.2.2/content#credentials). Обязательный параметр.

**timeout** _(Number)_

Таймаут в мс. Необязательный параметр. Значение по умолчанию — `6000`.

**path** _(String)_

Относительный путь к странице входа в систему. Необязательный параметр. Значение по умолчанию — `'/_login'`.

## Возвращает

- ничего

## Примеры

### Войти в систему под учётной записью crm_user

```js
describe('Сценарий loginElma', () => {
    before(() => {
        cy.loginElma('crm_user');
    });

    it('Тест 1', () => {
        // код
    });
});
```
