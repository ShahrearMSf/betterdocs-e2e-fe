// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

const PAGES_TO_CHECK = [
  "/",
  "/docs/",
  "/encyclopedia/",
  "/category-box-b-box/",
  "/category-grid-b-l1/",
  "/popular-docs-b/",
  "/faq-b-classic/",
  "/search-b-classic/",
  "/sidebar-b-l1/",
  "/pedia-b-classic/",
  "/category-box-sc/",
  "/faq-sc-2-classic/",
];

test.describe("Deprecated Elementor Code Check", () => {
  for (const slug of PAGES_TO_CHECK) {
    test(`No .elementor-widget-container on ${slug}`, async ({ page }) => {
      await safeGoto(page, `${BASE_URL}${slug}`);
      const deprecated = page.locator(".elementor-widget-container");
      const count = await deprecated.count();
      expect(count).toBe(0);
    });
  }
});
