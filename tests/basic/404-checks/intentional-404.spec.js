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
  const CASES = [
    { name: "Sports category", url: `${BASE_URL}/docs/sports/missing-doc-xyz/` },
    { name: "Fruits category", url: `${BASE_URL}/docs/fruits/nonexistent-abc/` },
    { name: "Nested category (team/qa)", url: `${BASE_URL}/docs/team/qa/fake-doc-123/` },
  ];

  for (const { name, url } of CASES) {
    test(`${name}: missing doc returns 404 (not soft-200)`, async ({ page }) => {
      const response = await page.goto(url, { timeout: 30000 });
      expect(response.status()).toBe(404);
      // Also make sure it's a real 404 template, not empty single-doc frame
      const bodyText = await page.locator("body").innerText();
      expect(bodyText.toLowerCase()).toMatch(/not found|404|page not found/);
    });
  }
});
