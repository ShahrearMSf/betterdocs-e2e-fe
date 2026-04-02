// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

const PAGES_TO_CHECK = [
  "/",
  "/encyclopedia/",
  "/category-box-b-box/",
  "/category-box-b-card/",
  "/category-grid-b-l1/",
  "/category-handbook-b/",
  "/popular-docs-b/",
  "/related-categories-b/",
  "/faq-b-classic/",
  "/faq-b-modern/",
  "/faq-b-abstract/",
  "/search-b-classic/",
  "/sidebar-b-l1/",
  "/pedia-b-classic/",
  "/category-box-sc/",
  "/category-grid-sc-1/",
  "/faq-sc-2-classic/",
  "/search-sc/",
  "/popular-docs-sc/",
];

test.describe("Removed Script Check - extend-search-modal.js", () => {
  for (const slug of PAGES_TO_CHECK) {
    test(`No extend-search-modal.js on ${slug}`, async ({ page }) => {
      await safeGoto(page, `${BASE_URL}${slug}`);
      const script = await page.evaluate(() => {
        const scripts = document.querySelectorAll("script[src]");
        return Array.from(scripts).some(s => s.src.includes("extend-search-modal"));
      });
      expect(script).toBe(false);
    });
  }
});
