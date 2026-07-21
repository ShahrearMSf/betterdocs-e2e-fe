// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Heading-hierarchy accessibility guard for single doc pages.
 *
 * Verifies that a single doc page has:
 *   - Exactly ONE <h1> in the article/content region
 *   - At least one <h2> (real content should have section headings)
 *
 * Guards regressions where a template refactor accidentally introduces a
 * second h1 or drops all h2s (breaks screen-reader outline).
 */

const DOC_URL = `${BASE_URL}/docs/cricket-the-gentlemens-game/`;

test.describe("Accessibility - Single Doc Heading Hierarchy", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOC_URL);
  });

  test("Single doc has exactly one <h1> heading", async ({ page }) => {
    // Accessibility rule: one and only one h1 per page.
    const count = await page.locator("h1").count();
    expect(count, `Expected exactly 1 <h1>, found ${count}`).toBe(1);
  });

  test("Single doc has at least one section-level <h2>", async ({ page }) => {
    const count = await page.locator("h2").count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("The single <h1> is not empty", async ({ page }) => {
    const h1 = page.locator("h1").first();
    const text = (await h1.innerText()).trim();
    expect(text.length).toBeGreaterThan(0);
  });
});
