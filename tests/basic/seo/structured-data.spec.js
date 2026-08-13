// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * JSON-LD structured data on pages that ship schema.
 *
 * Currently the FAQ block page exposes FAQPage schema. Guards against
 * SEO regressions where schema drops silently (Yoast/RankMath drop-out,
 * template refactor, JSON generation breakage).
 */

function extractTypes(jsonText) {
  try {
    const parsed = JSON.parse(jsonText);
    const items = parsed["@graph"] || [].concat(parsed);
    return items.map((x) => x["@type"]).filter(Boolean);
  } catch {
    return [];
  }
}

test.describe("SEO - JSON-LD Structured Data", () => {
  test("FAQ block page exposes FAQPage JSON-LD schema", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/faq-b-classic/`);
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    const allTypes = scripts.flatMap(extractTypes);
    expect(allTypes).toContain("FAQPage");
  });

  test("FAQ JSON-LD is valid parseable JSON", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/faq-b-classic/`);
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    for (const s of scripts) {
      expect(() => JSON.parse(s), `JSON-LD block is not valid JSON`).not.toThrow();
    }
  });
});
