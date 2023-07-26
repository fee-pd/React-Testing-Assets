# Test generator
Playwright comes with the ability to generate tests for you as you perform actions in the browser and is a great way to quickly get started with testing. Playwright will look at your page and figure out the best locator, prioritizing role, text and test id locators. If the generator finds multiple elements matching the locator, it will improve the locator to make it resilient that uniquely identify the target element.

## Generate tests in VS Code
Install the VS Code extension and generate tests directly from VS Code. The extension is available on the VS Code Marketplace. Check out our guide on getting started with VS Code.

```
https://www.youtube.com/watch?v=LM4yqrOzmFE
```

Generage test with the follow command:

```
  npx playwright codegen
```

