// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

const ENDPOINTS = [
  { name: "BetterDocs plugin root", url: "/wp-json/betterdocs" },
  { name: "BetterDocs v1 namespace", url: "/wp-json/betterdocs/v1" },
  { name: "BetterDocs v1 search", url: "/wp-json/betterdocs/v1/search" },
  { name: "BetterDocs v1 search with keyword", url: "/wp-json/betterdocs/v1/search?search=wordpress" },
  { name: "WP REST doc_category", url: "/wp-json/wp/v2/doc_category" },
  { name: "WP REST knowledge_base", url: "/wp-json/wp/v2/knowledge_base" },
  { name: "WP REST docs (per_page=1)", url: "/wp-json/wp/v2/docs?per_page=1" },
  { name: "WP REST betterdocs_faq", url: "/wp-json/wp/v2/betterdocs_faq?per_page=1" },
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

  test("WP REST /wp/v2/docs exposes pagination headers (X-WP-Total, X-WP-TotalPages)", async ({
    request,
  }) => {
    // API-contract check for consumers that paginate over the docs list.
    const res = await request.get(`${BASE_URL}/wp-json/wp/v2/docs?per_page=5`);
    expect(res.status()).toBe(200);
    const total = res.headers()["x-wp-total"];
    const totalPages = res.headers()["x-wp-totalpages"];
    expect(total, "missing X-WP-Total header").toBeTruthy();
    expect(totalPages, "missing X-WP-TotalPages header").toBeTruthy();
    // Values must be numeric strings
    expect(Number(total)).toBeGreaterThanOrEqual(1);
    expect(Number(totalPages)).toBeGreaterThanOrEqual(1);
  });
});
