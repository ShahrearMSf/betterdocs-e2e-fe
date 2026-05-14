// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

const ENDPOINTS = [
  { name: "BetterDocs plugin root", url: "/wp-json/betterdocs" },
  { name: "BetterDocs v1 namespace", url: "/wp-json/betterdocs/v1" },
  { name: "BetterDocs v1 search", url: "/wp-json/betterdocs/v1/search" },
  { name: "WP REST doc_category", url: "/wp-json/wp/v2/doc_category" },
  { name: "WP REST knowledge_base", url: "/wp-json/wp/v2/knowledge_base" },
];

test.describe("Permalink - BetterDocs REST API Endpoints", () => {
  for (const { name, url } of ENDPOINTS) {
    test(`${name} (${url}) returns 200`, async ({ request }) => {
      const res = await request.get(`${BASE_URL}${url}`);
      expect(res.status()).toBe(200);
    });
  }

  test("WP REST API root advertises BetterDocs namespace", async ({
    request,
  }) => {
    const res = await request.get(`${BASE_URL}/wp-json/`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    // The discovery JSON should mention the BetterDocs namespace
    expect(body.toLowerCase()).toContain("betterdocs");
  });
});
