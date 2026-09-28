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

/**
 * Regression guard for BetterDocs issue #169 (soft-404 on missing doc under
 * a valid category).
 *
 * Previously `/docs/<real-category>/<missing-doc>/` would return HTTP 200
 * with an empty single-doc template — a silent SEO/UX regression. The
 * expected behavior is a hard 404. Covers flat + nested category cases.
 */
test.describe("Intentional 404 - Missing doc under a VALID category", () => {
  // WP core adds `error404` to <body> on the 404 template — theme-agnostic.
  // Text check is a secondary signal; covers hello-elementor ("can’t be found",
  // "nothing was found") and most other themes ("not found", "404").
  const NOT_FOUND_TEXT = /not found|can[’']t be found|nothing was found|\b404\b/i;

  const CASES = [
    { name: "Sports category", url: `${BASE_URL}/docs/sports/missing-doc-xyz/` },
    { name: "Fruits category", url: `${BASE_URL}/docs/fruits/nonexistent-abc/` },
    { name: "Nested category (team/qa)", url: `${BASE_URL}/docs/team/qa/fake-doc-123/` },
    { name: "3-level nested (team/lead)", url: `${BASE_URL}/docs/team/lead/missing-doc-xyz/` },
    { name: "Numeric slug under fruits", url: `${BASE_URL}/docs/fruits/99999/` },
  ];

  for (const { name, url } of CASES) {
    test(`${name}: missing doc returns 404 (not soft-200)`, async ({ page }) => {
      const response = await page.goto(url, { timeout: 30000 });
      expect(response.status()).toBe(404);
      // Real 404 template, not the empty single-doc frame from #169
      await expect(page.locator("body")).toHaveClass(/\berror404\b/);
      await expect(page.locator("body")).not.toHaveClass(/\bsingle-docs\b/);
      await expect(page.locator("main, #main, .site-main").first()).toContainText(NOT_FOUND_TEXT);
    });
  }
});

/**
 * Sanity: 404 responses must be served as HTML, not JSON/plaintext.
 * Guards against a rogue REST endpoint or a plugin filter that swaps
 * Content-Type — search crawlers otherwise fail to classify the page.
 */
test.describe("Intentional 404 - Response headers are crawler-safe", () => {
  test("Missing doc returns Content-Type: text/html", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/docs/sports/missing-doc-xyz/`, {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(404);
    const ct = (res.headers()["content-type"] || "").toLowerCase();
    expect(ct).toContain("text/html");
  });

  test("Missing category returns Content-Type: text/html", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/docs/fake-category-xyz/`, {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(404);
    const ct = (res.headers()["content-type"] || "").toLowerCase();
    expect(ct).toContain("text/html");
  });
});
