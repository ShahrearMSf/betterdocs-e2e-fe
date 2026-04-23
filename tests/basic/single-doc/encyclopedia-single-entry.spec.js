// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const ENTRY_URL = `${BASE_URL}/encyclopedia/aesthetic/`;

test.describe("Encyclopedia - Single Entry Page", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, ENTRY_URL);
  });

  test("Entry page loads without 404", async ({ page }) => {
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("Entry page has single title", async ({ page }) => {
    const title = page.locator(".docs-single-title");
    await expect(title).toBeVisible();
  });

  test("Entry page shows alphabet list for navigation", async ({ page }) => {
    const alphabetList = page.locator(".encyclopedia-alphabet-list, .encyclopedia-alphabets");
    await expect(alphabetList.first()).toBeVisible();
  });

  test("Entry URL matches slug", async ({ page }) => {
    await expect(page).toHaveURL(/\/encyclopedia\/aesthetic\/?$/);
  });
});
