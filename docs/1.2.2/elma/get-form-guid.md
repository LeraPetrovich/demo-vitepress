---
title: "[1.2.2] getFormGUID"
description: "Returns the unique identifier of an element on an Elma365 form"
version: "1.2.2"
platform: elma365
command: getFormGUID
---

# getFormGUID

Returns the unique identifier of an element when on a form.
The form must be opened first by calling `cy.openAppItemEditForm()` or `cy.openAppItemByIndexOnList()`.

## Syntax

```javascript
await cy.getFormGUID();
```

## Usage

**Correct usage**

```javascript
await cy.getFormGUID();
```

**Incorrect usage**

```javascript
cy.getFormGUID();
```

## Arguments

- none

## Returns

- a string identifier, for example:

```
0197122f-6a6a-77ba-9399-010aebb6870d
```

## Examples

### Get the GUID of an open record form

```js
describe('getFormGUID scenario', () => {
    before(() => {
        cy.loginElma("crm_user");
    });

    it('getFormGUID example on a form', () => {
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

## See also

- [loginElma](/1.2.2/elma/login)
