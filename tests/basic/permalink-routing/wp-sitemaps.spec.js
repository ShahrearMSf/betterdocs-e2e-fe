// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

const SITEMAPS = [
  "wp-sitemap.xml",
  "wp-sitemap-posts-post-1.xml",
  "wp-sitemap-posts-page-1.xml",
  "wp-sitemap-taxonomies-doc_category-1.xml",
  "wp-sitemap-users-1.xml",
];

test.describe("Permalink - WordPress Core Sitemap Sub-Files", () => {
  for (const sitemap of SITEMAPS) {
    test(`/${sitemap} is available`, async ({ request }) => {
      const res = await request.get(`${BASE_URL}/${sitemap}`);
      expect(res.status()).toBe(200);
      const body = await res.text();
      // Each sub-sitemap should contain valid XML structure
      expect(
        body.includes("<urlset") || body.includes("<sitemapindex")
      ).toBe(true);
    });
  }

  test("wp-sitemap.xml lists doc_category sub-sitemap", async ({
    request,
  }) => {
    const res = await request.get(`${BASE_URL}/wp-sitemap.xml`);
    const body = await res.text();
    expect(body).toContain("wp-sitemap-taxonomies-doc_category-1.xml");
  });
});
