## Actions

### Navigation
Most of the tests will start with navigating page to the URL. After that, test will be able to interact with the page elements.


```
tests/2-actions-assertions-hooks.spec.ts
```

```
await page.goto('http://localhost:3000/');
```

Playwright will wait for page to reach the load state prior to moving forward. Learn more about the page.goto() options.

Interactions
Performing actions starts with locating the elements. Playwright uses Locators API for that. Locators represent a way to find element(s) on the page at any moment, learn more about the different types of locators available. Playwright will wait for the element to be actionable prior to performing the action, so there is no need to wait for it to become available.

```
// Create a locator.
const getStarted = page.getByRole('link', { name: 'Get started' });
// Click it.
await getStarted.click();
```

In most cases, it'll be written in one line:

```
await page.getByRole('link', { name: 'Get started' }).click();
```

## Basic actions
This is the list of the most popular Playwright actions. Note that there are many more, so make sure to check the Locator API section to learn more about them.


| Action         |      Description      |
|----------------|:---------------------:|
| locator.check() | Check the input checkbox |
| locator.click() |    Click the element   |
| locator.uncheck() |   Uncheck the input checkbox     |
| locator.hover()  |   Hover mouse over the element       |
| locator.fill()    |    Fill the form field (fast)         |
| locator.focus()   |      Press single key               |
| locator.press()    |      FPress single key          |
| locator.setInputFiles()      |      Pick files to upload                 |
| locator.selectOption()  |   Select option in the drop down                   |
| locator.type()       |        Type text character by character (slow)               |

### Assertions
Playwright includes test assertions in the form of expect function. To make an assertion, call expect(value) and choose a matcher that reflects the expectation.

There are many generic matchers like toEqual, toContain, toBeTruthy that can be used to assert any conditions.

```
expect(success).toBeTruthy();
```

Playwright also includes async matchers that will wait until the expected condition is met. Using these matchers allows making the tests non-flaky and resilient. For example, this code will wait until the page gets the title containing "Playwright":

```
await expect(page).toHaveTitle(/Playwright/);
```

Here is the list of the most popular async assertions. Note that there are many more to get familiar with:

	
	



| Assertion      |      Description      |
|----------------|:---------------------:|
| expect(locator).toBeChecked() | Checkbox is checked |
| expect(locator).toBeEnabled()	| Control is enabled |
| expect(locator).toBeVisible()	| Element is visible |
| expect(locator).toContainText()	| Element contains text |
| expect(locator).toHaveAttribute()	| Element has attribute |
| expect(locator).toHaveCount()	| List of elements has given length |
| expect(locator).toHaveText()	| Element matches text |
| expect(locator).toHaveValue()	| Input element has value |
| expect(page).toHaveTitle()	| Page has title |
| expect(page).toHaveURL()	| Page has URL |
| expect(page).toHaveScreenshot()	| Page has screenshot |

### Test Isolation
Playwright Test is based on the concept of test fixtures such as the built in page fixture, which is passed into your test. Pages are isolated between tests due to the Browser Context, which is equivalent to a brand new browser profile, where every test gets a fresh environment, even when multiple tests run in a single Browser.

```
tests/1-example.md
```
```
test('basic test', async ({ page }) => {
```

Using Test Hooks
You can use various test hooks such as test.describe to declare a group of tests and test.beforeEach and test.afterEach which are executed before/after each test. Other hooks include the test.beforeAll and test.afterAll which are executed once per worker before/after all tests.

```
tests/2-actions-assertions-hooks.spec.ts
```

```
  npx playwright test 2-actions-assertions-hooks.spec.ts
```

```
test.beforeEach(async ({page}) => {
  // Go to the starting url before each test.
  await page.goto("http://localhost:3000/");
  homeLink = await page.getByTestId("home-link");
  cartLink = await page.getByTestId("cart-link");
});

test.describe("navigation", () => {
  test("main navigation", async ({page}) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("http://localhost:3000/");
  });

```