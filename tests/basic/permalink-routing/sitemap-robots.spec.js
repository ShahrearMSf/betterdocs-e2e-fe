// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Permalink - Sitemap & Robots.txt", () => {
  test("sitemap.xml returns 200 with XML content-type", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/sitemap.xml`, {
      timeout: 30000,
    });
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"] || "";
    expect(contentType.toLowerCase()).toContain("xml");
  });

  test("robots.txt returns 200", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/robots.txt`, {
      timeout: 30000,
    });
    expect(response.status()).toBe(200);
  });
});
