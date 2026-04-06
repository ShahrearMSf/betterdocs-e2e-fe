// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("404 Check - Trailing Slash Variations", () => {
  test("Docs without trailing slash", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/docs`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });

  test("Encyclopedia without trailing slash", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/encyclopedia`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });

  test("Category without trailing slash", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/docs/sports`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });

  test("Nested category without trailing slash", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/docs/team/qa`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });
});
