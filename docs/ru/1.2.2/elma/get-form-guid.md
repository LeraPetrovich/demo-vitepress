---
title: "[1.2.2] getFormGUID"
description: "Возвращает уникальный идентификатор элемента на форме Elma365"
version: "1.2.2"
platform: elma365
command: getFormGUID
---

# getFormGUID

Возвращает уникальный идентификатор элемента при нахождении на форме.
Предварительно форму необходимо открыть вызовом команды `cy.openAppItemEditForm()` или `cy.openAppItemByIndexOnList()`.

## Синтаксис

```javascript
await cy.getFormGUID();
```

## Использование

**Правильное использование**

```javascript
await cy.getFormGUID();
```

**Неправильное использование**

```javascript
cy.getFormGUID();
```

## Аргументы

- нет

## Возвращает

- строку с идентификатором, например:

```
0197122f-6a6a-77ba-9399-010aebb6870d
```

## Примеры

### Получить GUID формы открытой записи

```js
describe('Сценарий getFormGUID', () => {
    before(() => {
        cy.loginElma("crm_user");
    });

    it('Пример использования getFormGUID на форме', () => {
        const appUrl = '_clients/_contacts';

        cy.openApplication(appUrl);

        _asyncRun();

        async function _asyncRun() {
            await cy.openAppItemByIndexOnList(0);

            const guid = await cy.getFormGUID();
            expect(guid).to.not.be.empty;

            cy.task('log', `GUID is ${guid}`);
            cy.setExecutionContextValue('elm_guid', guid);
        }
    });
});
```

## См. также

- [loginElma](/ru/1.2.2/elma/login)
