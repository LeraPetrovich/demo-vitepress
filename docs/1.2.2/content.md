---
title: "[1.2.2] Contents"
description: Test scenarios, commands, hooks, and async usage in JESM ATR.
outline: deep
version: "1.2.2"
module: Automation Test Runner
---

# Contents

::: info What you will learn

- How to compose a test scenario and its structure
- What the command library is and how to use it
- Which commands ATR supports
- What Hooks are
- Asynchronous commands
- How to create custom commands

:::

## Test scenarios {#test-cases}

Test scenarios in ATR are written in Javascript using the Cypress framework and the [Chai](https://github.com/chaijs/chai) library.

Each scenario must be wrapped in a `describe(...)` block.
A scenario can contain several tests. Each test is defined in its own `it(...)` block.

**Empty scenario template with one test**

```js
describe('Scenario name', () => {
    // Hook
    before(() => {
        // Commands
        // ...
    });

    it('Test name', () => {
        // Commands
        // ...
    });
});
```

Scenarios can use `before`, `beforeEach`, `after`, and `afterEach` blocks that run before or after tests. See [Hooks](#hooks) for details.

A test is a set of commands from different categories.
Commands always start with `cy.` and can be invoked by name (e.g. `cy.get(...)`) or by argument (e.g. `cy.task('log', ...)`).

**Example scenario with multiple tests and hooks**

```js
// Global variable(s) available from anywhere in the scenario
var g_ticketSubject = generateUniqueTicketName();

describe('Creating an Incident from the Self-Service Portal', () => {
    before(() => {
        cy.loginSimpleOne("z_end_user");
        cy.visit('/portal');
        cy.visit('/portal/record?table_name=itsm_incident&view=Service%20Catalogue');
    });

    it('Cannot create an Incident without Subject on the Portal', () => {
        cy.get('[data-test="form_button__save-ui-button"]').should('be.disabled');
        cy.task('log', `Filling the field with ${g_ticketSubject}`);
        cy.get('[data-test="subject-field-textarea"]').find("textarea").type(g_ticketSubject);
        cy.get('[data-test="form_button__save-ui-button"]').should('be.enabled');
        cy.get('[data-test="form_button__save-ui-button"]').click();
    });

    it('...', () => {
        ...
    });

    afterEach(() => {
        cy.task('log', 'Test completed');
    });
});

function generateUniqueTicketName() {
    var uuid = 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {
        const r = Math.floor(Math.random() * 16);
        return r.toString(16);
    });

    return "Test Incident (" + uuid + ")";
}
```

In a test scenario, you can access scenario fields using environment variables:

- `test_case_name` — scenario name;
- `test_case_description` — scenario description;
- `test_case_folder_name` — folder where the scenario is stored;
- `execution_plan_name` — execution plan that runs the scenario;
- `environment_name` — environment name;
- `environment_url` — environment URL;

In JESM ATR, test scenario fields are stored in the `Cypress.env()` object.

**Example: accessing test scenario fields**

```js
it('Using environment variables for test scenario fields', () => {
    const case_name = Cypress.env('test_case_name');
    cy.task("log", `Scenario name: ${case_name}`);
    Cypress.env('test_case_name', `${case_name}_DONE`);
});
```

## Commands

JESM ATR ships with a ready-made command set and also allows you to create [custom commands](#custom-commands).

Commands can be classified as follows:

- `query` — commands that read your application state
- `assertion` — commands that verify a given state
- `action` — interact with your application as a user would
- `other` — any other command useful for writing tests
- `library` — commands adapted for a specific action in the target system

Commands can be chained; each command passes the subject to the next until the chain ends or an error occurs.

Read more: [Introduction to command chains](https://docs.cypress.io/app/core-concepts/introduction-to-cypress#Chains-of-Commands).

### Queries

Queries read your application state. They yield a subject for further actions or assertions and retry when needed.

| Commands | Usage |
| --- | --- |
| `.as()` | Assign an alias for later use in `cy.get()` or `cy.wait()`. |
| `.children()` | Get child DOM elements of each element in the set. |
| `.closest()` | Get the first parent element matching the selector. |
| `.contains()` | Select a DOM element by text content. |
| `.document()` | Get the active page `window.document` object. |
| `.eq()` | Select a DOM element by index from a collection. |
| `.filter()` | Filter elements by selector. |
| `.first()` | Select the first element in a collection. |
| `.get()` | Find DOM elements by selector or get an alias from `.as()`. |
| `.hash()` | Get the active page URL hash. |
| `.its()` | Get a property value from the previously yielded object. |
| `.last()` | Select the last element in a collection. |
| `.location()` | Get the active page `window.location` object. |
| `.not()` | Filter out elements matching the selector. |
| `.parentsUntil()` | Get all parent elements up to the given selector. |
| `.prev()` | Get the previous sibling element. |
| `.prevAll()` | Get all previous sibling elements. |
| `.prevUntil()` | Get all previous siblings up to the given selector. |
| `.shadow()` | Traverse into the element shadow DOM. |
| `.siblings()` | Get all sibling elements. |
| `.title()` | Get the active page `document.title`. |
| `.url()` | Get the active page URL. |
| `.window()` | Get the active page `window` object. |

### Assertions

Assertions verify application state. They pause the test until the condition passes or times out.

| Command | Usage |
| --- | --- |
| `.and()` | Alias for `.should()`. Asserts application state. |
| `.should()` | Asserts application state with automatic retries until pass or timeout. |

### Actions

Actions interact with your application as a user would. They wait for elements to become actionable.

| Command | Usage |
| --- | --- |
| `.check()` | Check checkbox or radio elements. |
| `.clear()` | Clear an input or textarea value. |
| `.click()` | Click a DOM element. |
| `.dblclick()` | Double-click a DOM element. |
| `.rightclick()` | Right-click a DOM element. |
| `.scrollIntoView()` | Scroll an element into view. |
| `.scrollTo()` | Scroll to a specific position. |
| `.select()` | Select an `<option>` inside a `<select>`. |
| `.selectFile()` | Select a file or simulate drag-and-drop. |
| `.type()` | Type text into a DOM element. |
| `.uncheck()` | Uncheck checkbox(es). |

### Other commands

| Command | Usage |
| --- | --- |
| `.blur()` | Remove focus from an element. |
| `.clock()` | Override browser time objects for control via `cy.tick()`. |
| `.each()` | Invoke a callback for each element in an array. |
| `.editTextInExcelFile()` | Edit an Excel file. |
| `.end()` | Explicitly end the JESM command chain. |
| `.focus()` | Focus a DOM element. |
| `.getExecutionContextValue()` | Get a value from the Execution Plan context. |
| `.go()` | Go back or forward in browser history. |
| `.log()` | Print a message to the JESM command log. |
| `.pause()` | Pause the test for manual interaction. |
| `.reload()` | Reload the page. |
| `.request()` | Make an HTTP request. |
| `.screenshot()` | Take a screenshot. |
| `.sendEmail()` | Send an email. |
| `.session()` | Cache and restore session data between tests. |
| `.setExecutionContextValue()` | Save a value in the Execution Plan context. |
| `.spread()` | Invoke a callback with multiple arguments. |
| `.stub()` | Replace a method and control its behavior. |
| `.submit()` | Submit a form. |
| `.then()` | Invoke a callback with the current subject. |
| `.tick()` | Advance time after `cy.clock()`. |
| `.viewport()` | Control screen size and orientation. |
| `.visit()` | Visit a remote URL. |
| `.wait()` | Wait for milliseconds or a resource. |
| `.within()` | Limit subsequent commands to an element. |
| `.wrap()` | Yield a wrapped value or resolved promise. |
| `.writeFile()` | Write data to a file. |

### Method libraries

JESM ATR provides a library of ready-made commands adapted to the target system.
See the corresponding section for the full library.

## Utilities

| Utility | Usage |
| --- | --- |
| `Cypress.$` | JESM includes [jQuery](http://jquery.com/) as `Cypress.$`. |
| `Cypress._` | JESM includes [lodash](https://lodash.com/) as `Cypress._`. |

## Hooks {#hooks}

Hooks run command(s) at a defined point in the test scenario lifecycle.
For example, in a `before` hook you can sign in once instead of in every test.

## Credentials {#credentials}

JESM ATR supports testing under different users by specifying an account in sign-in commands such as [`.loginSimpleOne()`](/1.2.2/simpleone/login).

Accounts must be added first in the corresponding menu section.

## Asynchronous commands {#async-commands}

Some commands must be called with `await` to wait for completion.

::: warning
These commands must be called only inside an async function:

```js
_asyncRun();

async function _asyncRun() {
    // code
}

(async () => {
    // code
})();
```
:::

**Correct usage of commands with await**

```js
describe('Scenario 1', () => {
    before(() => {
        // ... sign in ...
    });

    it('Test 1.1', () => {
        cy.openRecord('sys_email_account', '157425284611357796');
        cy.waitFormLoaded();
        _asyncRun();

        async function _asyncRun() {
            var form = await cy.getForm();
            expect(form).to.not.be.empty;
            cy.openRecord('itsm_incident', '157425284611357782');
            cy.waitFormLoaded();
        }
    });
});
```

**Incorrect usage (await outside async function)**

```js
describe('Scenario 2', () => {
    it('Test 2.1', () => {
        var form = await cy.getForm();
        expect(form).to.not.be.empty;
    });
});
```

**Incorrect usage (missing await)**

```js
describe('Scenario 3', () => {
    it('Test 3.1', () => {
        var form = cy.getForm();
        expect(form).to.not.be.empty;
    });
});
```

## Custom commands {#custom-commands}

When ready-made commands are not enough, users can create custom reusable commands in the module UI under **Commands**.

::: info
Use a prefix in custom command names (e.g. `u_`) to distinguish them from built-in commands.
:::

**Example custom command**

```js
Cypress.Commands.add("u_loginKeycloak", (credentialName, authUrl, redirectURL, btnLoginSelector = '#kc-login') => {
    if (!credentialName) {
        throw new Error(`u_loginKeycloak: Specify the account name!`);
    }
    if (!authUrl) {
        throw new Error(`u_loginKeycloak: Specify authUrl!`);
    }
    if (!redirectURL) {
        throw new Error(`u_loginKeycloak: Specify redirectURL!`);
    }

    const username = Cypress.env(credentialName + "_login")
    const password = Cypress.env(credentialName + "_password")

    cy.origin(authUrl, { args: { username, password, btnLoginSelector } }, ({ username, password, btnLoginSelector }) => {
        cy.get('#username').type(username)
        cy.get('#password').type(password, { log: false })
        cy.get(btnLoginSelector).click();
        cy.get('#input-error-container-username').should('not.exist');
    })

    cy.url().should('equal', redirectURL)
});
```

**Example: using a custom command in a test**

```js
describe('Scenario 1', () => {
    before(() => {
        cy.u_loginKeycloak("crm_user", "https://iam.example.com/idp", "https://system.example.com/");
    });

    it('Test 1.1', () => {
        ...
    });
});
```
