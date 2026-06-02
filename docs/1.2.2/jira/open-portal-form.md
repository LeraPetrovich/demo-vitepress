---
title: "[1.2.2] openPortalForm"
description: "Open a Jira portal form by theme and form identifiers"
version: "1.2.2"
platform: jira
command: openPortalForm
---

# openPortalForm

Open a Jira portal form by theme and form identifiers.

## Syntax

```javascript
cy.openPortalForm(themeID, formID);
```

## Usage

**Correct usage**

```javascript
cy.openPortalForm("4", "53");
```

**Incorrect usage**

```javascript
cy.openPortalForm();
```

## Arguments

**themeID** _(Number)_

Portal theme identifier. Required parameter.

**formID** _(Number)_

Form identifier. Required parameter.

## Returns

- nothing

## Examples

### Open a portal request form

```js
describe('openPortalForm scenario', () => {
  it('openPortalForm command check', () => {
    cy.jiraLoginPortal("z_jesm_admin", 6000, "/plugins/servlet/desk");

    cy.openPortalForm("4", "53");
  });
});
```

## See also

- `cy.jiraLoginPortal()`
