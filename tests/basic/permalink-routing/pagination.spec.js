// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("404 Check - Pagination Permalinks", () => {
  test("Docs page 1", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/page/1/`);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("Category pagination - sports page 1", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/docs/sports/page/1/`, {
      timeout: 30000,
    });
    expect(response.status()).not.toBe(404);
  });

  test("Out-of-range page returns 404", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/docs/page/9999/`, {
      timeout: 30000,
    });
    // High page number should return 404 — confirms 404 handling works
    expect(response.status()).toBe(404);
  });
});
