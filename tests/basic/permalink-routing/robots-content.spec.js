// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Permalink - robots.txt Content", () => {
  test("robots.txt declares User-agent directive", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/robots.txt`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body.toLowerCase()).toContain("user-agent");
  });

  test("robots.txt disallows /wp-admin/", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/robots.txt`);
    const body = await res.text();
    expect(body.toLowerCase()).toContain("disallow: /wp-admin/");
  });

  test("robots.txt references a Sitemap directive", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/robots.txt`);
    const body = await res.text();
    expect(body.toLowerCase()).toContain("sitemap:");
    expect(body).toContain("wp-sitemap.xml");
  });
});
