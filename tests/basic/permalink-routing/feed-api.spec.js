// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("404 Check - Feed & API Permalinks", () => {
  test("Docs RSS feed", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/docs/feed/`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });

  test("REST API docs endpoint", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/wp-json/wp/v2/docs`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });

  test("REST API docs categories endpoint", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/wp-json/wp/v2/doc_category`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });
});
