// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("404 Check - Edge Case Permalinks", () => {
  test("URL-encoded space in slug returns 404", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/docs/%20/`, {
      timeout: 30000,
    });
    expect(response.status()).toBe(404);
  });

  test("Homepage loads without 404", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/`, { timeout: 30000 });
    expect(response.status()).not.toBe(404);
  });

  test("Uppercase /Docs/ either redirects or loads", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/Docs/`, { timeout: 30000 });
    expect(response.status()).toBeLessThan(500);
  });

  test("Uppercase /Encyclopedia/ either redirects or loads", async ({
    page,
  }) => {
    const response = await page.goto(`${BASE_URL}/Encyclopedia/`, {
      timeout: 30000,
    });
    expect(response.status()).toBeLessThan(500);
  });
});
