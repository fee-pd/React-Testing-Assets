### Writing tests
Playwright tests are simple, they

* perform actions, and
* assert the state against expectations.
  
There is no need to wait for anything prior to performing an action: Playwright automatically waits for the wide range of actionability checks to pass prior to performing each action.

There is also no need to deal with the race conditions when performing the checks - Playwright assertions are designed in a way that they describe the expectations that need to be eventually met.

That's it! These design choices allow Playwright users to forget about flaky timeouts and racy checks in their tests altogether.


First test
Take a look at the following example to see how to write a test.
```
tests/1-example.spec.ts
```
```
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
```

## Command

```
  npx playwright test 1-example.spec.ts
```

***NOTE:**
Add // @ts-check at the start of each test file when using JavaScript in VS Code to get automatic type checking.
