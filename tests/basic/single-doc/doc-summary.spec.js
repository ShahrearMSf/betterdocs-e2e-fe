// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * AI-powered Doc Summary feature tests.
 *
 * On single-doc pages, BetterDocs renders a "Doc Summary" section powered
 * by AI. The section shows a "Thinking" loader initially, then populates
 * with generated summary text.
 *
 * We assert only structural/loading behavior. The actual summary text is
 * AI-generated and variable, so we don't compare content.
 */

const DOC_URL = `${BASE_URL}/docs/hurram-the-co-lead-of-security-team/`;
const AI_SUMMARY_TIMEOUT = 30000; // AI response can take up to 30s

test.describe("Single Doc - AI Doc Summary", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOC_URL);
  });

  test("Doc Summary section is present on the doc page", async ({ page }) => {
    const header = page.locator(".betterdocs-summary-header");
    await expect(header).toBeVisible();
  });

  test("Doc Summary header shows 'Doc Summary' title", async ({ page }) => {
    const title = page.locator(".betterdocs-summary-title");
    await expect(title).toBeVisible();
    await expect(title).toContainText(/doc summary/i);
  });

  test("Summary content area exists", async ({ page }) => {
    const content = page.locator(".betterdocs-summary-content");
    await expect(content).toBeAttached();
  });

  test("Summary eventually shows text (not stuck in loading forever)", async ({
    page,
  }) => {
    // Loading indicator should disappear or summary text should appear
    const summaryText = page.locator(".betterdocs-summary-text");
    await expect(async () => {
      const text = await summaryText.innerText().catch(() => "");
      const loading = await page
        .locator(".betterdocs-summary-loading")
        .isVisible()
        .catch(() => true);
      // Either loading finished OR text has appeared
      expect(text.length > 0 || !loading).toBe(true);
    }).toPass({ timeout: AI_SUMMARY_TIMEOUT });
  });

  test("Summary header shows arrow toggle indicator", async ({ page }) => {
    const arrow = page.locator(".betterdocs-summary-arrow");
    await expect(arrow).toBeVisible();
  });
});
