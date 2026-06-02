---
title: "[1.2.2] getForm"
description: "Get the form object of the current record in the SimpleOne agent interface"
version: "1.2.2"
platform: simpleone
command: getForm
---

# getForm

Get the form object of the current record in the agent interface.
Must be preceded by calling `cy.openRecord()` and `cy.waitFormLoaded()`.

## Syntax

```javascript
await cy.getForm(name, timeout);
```

## Usage

**Correct usage**

```javascript
await cy.getForm();
await cy.getForm('custom_view');
await cy.getForm('custom_view', 10000);
```

**Incorrect usage**

```javascript
cy.getForm();
```

## Arguments

**name** _(String)_

View name. Optional parameter. Default is `'Default'`.

**timeout** _(Number)_

Timeout in ms that determines how long the command will try to get the object. Optional parameter. Default is `10000`.

## Returns

- an instance of the [`SimpleForm`](https://docs.simpleone.ru/ru/platform/developer-help/developer-api/client-side-api/simpleform) class

## Examples

### Open a record and check the name field value

```js
describe('getForm scenario', () => {
    before(() => {
        cy.loginSimpleOne("s1_admin");
        cy.visit('/');
    });

    it('getForm command example', () => {
        cy.openRecord('itsm_incident', '157425284611357796');
        cy.waitFormLoaded();

        _asyncRun();

        async function _asyncRun() {
            // getForm returns a SimpleForm class object
            var form = await cy.getForm();
            expect(form).to.not.be.empty;

            // form supports getValue, setValue, etc. per vendor documentation
            // Test failure: name equals 'SMTP (Default)', not 'Name'
            expect(form.getValue('name')).to.equal("Name");
        }
    });
});
```
