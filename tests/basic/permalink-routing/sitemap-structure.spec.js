// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Permalink - Sitemap XML Structure", () => {
  test("sitemap.xml is valid XML (urlset or sitemapindex root)", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/sitemap.xml`);
    expect(response.status()).toBe(200);
    const body = await response.text();
    // WordPress sitemaps use either <sitemapindex> (index) or <urlset> (single sitemap)
    const isValid =
      body.includes("<sitemapindex") || body.includes("<urlset");
    expect(isValid).toBe(true);
  });

  test("sitemap.xml lists multiple URLs/sitemaps", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/sitemap.xml`);
    const body = await response.text();
    const locCount = (body.match(/<loc>/g) || []).length;
    expect(locCount).toBeGreaterThanOrEqual(5);
  });
});
