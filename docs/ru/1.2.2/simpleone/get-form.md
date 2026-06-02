---
title: "[1.2.2] getForm"
description: "Получить объект формы текущей записи в агентском интерфейсе SimpleOne"
version: "1.2.2"
platform: simpleone
command: getForm
---

# getForm

Получить объект формы текущей записи в агентском интерфейсе.
Сопровождается предварительным вызовом команд `cy.openRecord()` и `cy.waitFormLoaded()`.

## Синтаксис

```javascript
await cy.getForm(name, timeout);
```

## Использование

**Правильное использование**

```javascript
await cy.getForm();
await cy.getForm('custom_view');
await cy.getForm('custom_view', 10000);
```

**Неправильное использование**

```javascript
cy.getForm();
```

## Аргументы

**name** _(String)_

Название вью. Необязательный параметр. По умолчанию — `'Default'`.

**timeout** _(Number)_

Таймаут в мс, который определяет, сколько времени команда будет пытаться получить объект. Необязательный параметр. По умолчанию — `10000`.

## Возвращает

- объект класса [`SimpleForm`](https://docs.simpleone.ru/ru/platform/developer-help/developer-api/client-side-api/simpleform)

## Примеры

### Открыть запись и проверить значение поля name

```js
describe('Сценарий getForm', () => {
    before(() => {
        cy.loginSimpleOne("s1_admin");
        cy.visit('/');
    });

    it('Пример использования команды getForm', () => {
        cy.openRecord('itsm_incident', '157425284611357796');
        cy.waitFormLoaded();

        _asyncRun();

        async function _asyncRun() {
            // getForm возвращает объект класса SimpleForm
            var form = await cy.getForm();
            expect(form).to.not.be.empty;

            // к form можно применять getValue, setValue и т.д. по документации вендора
            // Ошибка в тесте: name равно 'SMTP (Default)', а не 'Имя'
            expect(form.getValue('name')).to.equal("Имя");
        }
    });
});
```
