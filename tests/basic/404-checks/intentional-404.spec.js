// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Intentional 404 - Verify 404 Page Renders Correctly", () => {
  test("Non-existent doc slug returns 404", async ({ page }) => {
    const response = await page.goto(
      `${BASE_URL}/docs/this-doc-does-not-exist-xyz/`,
      { timeout: 30000 }
    );
    expect(response.status()).toBe(404);
  });

  test("Non-existent category returns 404", async ({ page }) => {
    const response = await page.goto(
      `${BASE_URL}/docs/fake-category-xyz/`,
      { timeout: 30000 }
    );
    expect(response.status()).toBe(404);
  });

  test("Double slug returns 404", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/docs/docs/`, {
      timeout: 30000,
    });
    expect(response.status()).toBe(404);
  });
});
