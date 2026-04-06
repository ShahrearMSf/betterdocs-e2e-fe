// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("404 Check - Search Result Permalinks", () => {
  test("WordPress docs search results page", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/?s=test&post_type=docs`);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("Encyclopedia search results", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/?s=test&post_type=betterdocs_encyclopedia`);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });
});
