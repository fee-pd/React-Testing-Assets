import {test, expect, Locator} from "@playwright/test";

let homeLink: Locator, cartLink: Locator;

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

  test("go to cart page", async ({page}) => {
    // Navigate to card link using link
    cartLink.click();
    // Assertions use the expect API.
    await expect(page).toHaveURL("http://localhost:3000/cart");
  });

  test("go to home page when navigate several times", async ({page}) => {
    // Navigate to card link using link
    homeLink.click();
    cartLink.click();
    homeLink.click();
    cartLink.click();
    homeLink.click();
    // Assertions use the expect API.
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("assertions in navigation", async ({page}) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page).not.toHaveURL("http://localhost:3000/cart");

    expect(homeLink).toBeTruthy();
    expect(homeLink).not.toBeFalsy();
    expect(await homeLink.textContent()).toContain("");
    expect(await homeLink.textContent()).toContain(
      "PizzaThe most delicious pizza in the universe"
    );
    expect(await homeLink.textContent()).toEqual(
      "PizzaThe most delicious pizza in the universe"
    );
    expect(await cartLink.textContent()).toBe("$ 00");
    expect(await cartLink.isEnabled).toBeTruthy();
    await expect(cartLink).toHaveCSS("background-color", "rgb(254, 95, 30)");
    await expect(cartLink).toHaveClass("button button--cart");
  });
});
