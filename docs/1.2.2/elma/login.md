---
title: "[1.2.2] loginElma"
description: "Sign in to Elma365 under the specified user account"
version: "1.2.2"
platform: elma365
command: loginElma
---

# loginElma

Sign in to Elma365 under the specified user account.

## Syntax

```javascript
cy.loginElma(credentialName, timeout, path);
```

## Usage

**Correct usage**

```javascript
cy.loginElma("crm_user");
```

**Incorrect usage**

```javascript
cy.loginElma();
```

## Arguments

**credentialName** _(String)_

Name of the user account from the [Credentials](/1.2.2/content#credentials) section. Required parameter.

**timeout** _(Number)_

Timeout in ms. Optional parameter. Default value is `6000`.

**path** _(String)_

Relative path to the login page. Optional parameter. Default value is `'/_login'`.

## Returns

- nothing

## Examples

### Sign in under the crm_user account

```js
describe('loginElma scenario', () => {
    before(() => {
        cy.loginElma('crm_user');
    });

    it('Test 1', () => {
        // code
    });
});
```
