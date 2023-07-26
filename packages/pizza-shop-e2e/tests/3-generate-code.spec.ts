import {test, expect} from "@playwright/test";

test("test", async ({page}) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("link", {
      name: "Pizza logo Pizza The most delicious pizza in the universe",
    })
    .click();
  await page.getByText("Meat").click();
  await page.getByText("Vegetarian").click();
  await page.getByText("Grill").click();
  await page.getByText("Spicy").click();
  await page.getByText("Closed").click();
  await page.locator("div").filter({hasText: /^Add$/}).first().click();
  await page.locator("div").filter({hasText: /^Add$/}).first().click();
  await page.getByRole("link", {name: "Pizza Pepperoni"}).click();
  await page.getByRole("button", {name: "Add"}).click();
  await page.getByText("traditional").click();
  await page.getByText("30 cm.").click();
  await page.getByText("40 cm.").click();
  await page.getByRole("button", {name: "Add"}).click();
  await page.getByRole("link", {name: "$ 2195 4"}).click();
  await page
    .locator("div")
    .filter({hasText: /^Margaritathin dough, 26 cm\.1\$ 450$/})
    .getByRole("button")
    .nth(1)
    .click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator("div:nth-child(2) > .cart__item-remove > .button").click();
  await page
    .locator("div")
    .filter({hasText: /^Pay now$/})
    .click();
  // Note expect has been added every test must provide a least one assertion.
  const total = await page.getByTestId("total-price");

  expect(await total.textContent()).toBe("$ 2645");
});
