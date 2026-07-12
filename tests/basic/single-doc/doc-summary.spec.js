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

/**
 * AI-degradation & content-safety guards for Doc Summary.
 *
 * If the upstream AI provider fails (bad key, quota, network), the frontend
 * must NOT ship raw provider-error text to the visitor. Also, since summary
 * output is HTML-injected, we assert no script/iframe/dangerous markup
 * appears — the surface for provider-varied output should stay sanitized.
 */

const PROVIDER_ERROR_MARKERS = [
  "Request had invalid authentication credentials",
  "invalid authentication",
  "RESOURCE_EXHAUSTED",
  "insufficient_quota",
  "API key not valid",
  "PERMISSION_DENIED",
  "quota exceeded",
  "rate limit",
  "AuthenticationError",
];

test.describe("Single Doc - Doc Summary AI Degradation & Content Safety", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOC_URL);
    // Give the summary time to load (or fail cleanly)
    await page.waitForTimeout(4000);
  });

  test("Summary text never leaks raw provider error strings", async ({
    page,
  }) => {
    const text = await page
      .locator(".betterdocs-summary-content, .betterdocs-summary-text")
      .innerText()
      .catch(() => "");
    const leaked = PROVIDER_ERROR_MARKERS.filter((m) =>
      text.toLowerCase().includes(m.toLowerCase())
    );
    expect(
      leaked,
      `Summary leaked upstream provider error: ${leaked.join(", ")}`
    ).toEqual([]);
  });

  test("Summary HTML contains no <script> or <iframe> injection", async ({
    page,
  }) => {
    const html = await page
      .locator(".betterdocs-summary-content")
      .innerHTML()
      .catch(() => "");
    expect(html.toLowerCase()).not.toContain("<script");
    expect(html.toLowerCase()).not.toContain("<iframe");
    expect(html.toLowerCase()).not.toContain("javascript:");
    expect(html.toLowerCase()).not.toContain(" onerror=");
    expect(html.toLowerCase()).not.toContain(" onclick=");
  });

  test("Summary HTML has balanced tags (no obvious unclosed / broken markup)", async ({
    page,
  }) => {
    const html = await page
      .locator(".betterdocs-summary-content")
      .innerHTML()
      .catch(() => "");
    // Rough sanity: open/close tag counts of common tags should match.
    for (const tag of ["div", "p", "span", "strong", "em"]) {
      const open = (html.match(new RegExp(`<${tag}[\\s>]`, "gi")) || []).length;
      const close = (html.match(new RegExp(`</${tag}>`, "gi")) || []).length;
      expect(
        open,
        `Summary has unbalanced <${tag}> tags: open=${open}, close=${close}`
      ).toBe(close);
    }
  });
});
