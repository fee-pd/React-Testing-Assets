import {test} from "@playwright/test";

test.only('focus this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});

test.skip('skip this test', async ({ page }) => {
  // This test is not run
});

// You can skip certain test based on the condition.

test('skip this test', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});

// You can group tests to give them a logical name or to scope before/after hooks to the group.

test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});