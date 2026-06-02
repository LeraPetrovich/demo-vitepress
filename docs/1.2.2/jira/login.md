---
title: "[1.2.2] jiraLogin"
description: "Sign in to Jira under the specified user account"
version: "1.2.2"
platform: jira
command: jiraLogin
---

# jiraLogin

Sign in to Jira under the specified user account.
Works when login with username and password is available via the `/login` page or the path specified in the `path` parameter.

## Syntax

```javascript
cy.jiraLogin(credentialName);
```

## Usage

**Correct usage**

```javascript
cy.jiraLogin("demo_jesm_test");
```

**Incorrect usage**

```javascript
cy.jiraLogin();
```

## Arguments

**credentialName** _(String)_

Name of the user account from the [Credentials](/1.2.2/content#credentials) section. Required parameter.

## Returns

- nothing

## Examples

### Sign in under the demo_jesm_test account

```js
describe('jiraLogin scenario', () => {
    before(() => {
        cy.jiraLogin("demo_jesm_test");
    });

    it('jiraLogin command check', () => {
        cy.get('[data-cy="login-error"]').should("not.exist");
    });
});
```
