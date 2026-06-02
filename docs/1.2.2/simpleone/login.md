---
title: "[1.2.2] loginSimpleOne"
description: "Sign in to SimpleOne under the specified user account"
version: "1.2.2"
platform: simpleone
command: loginSimpleOne
---

# loginSimpleOne

Sign in to SimpleOne under the specified user account.
Works when login with username and password is available via the `/login` page or the path specified in the `path` parameter.

## Syntax

```javascript
cy.loginSimpleOne(credentialName, timeout, path);
```

## Usage

**Correct usage**

```javascript
cy.loginSimpleOne("itsm_agent");
```

**Incorrect usage**

```javascript
cy.loginSimpleOne();
```

## Arguments

**credentialName** _(String)_

Name of the user account from the [Credentials](/1.2.2/content#credentials) section. Required parameter.

**timeout** _(Number)_

Timeout in ms. Optional parameter. Default value is `2000`.

**path** _(String)_

Relative path to the login page. Optional parameter. Default value is `'/login'`.

## Returns

- nothing

## Examples

### Sign in via side-door path under the itsm_agent account

```js
describe('Scenario', () => {
    before(() => {
        cy.loginSimpleOne('itsm_agent', null, '/side-door');
    });

    it('Test 1', () => {
        // code
    });
});
```
