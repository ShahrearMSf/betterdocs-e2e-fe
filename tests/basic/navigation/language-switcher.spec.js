// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL_2 = process.env.BASE_URL_2;

/**
 * WPML language switcher tests on cbotai (D).
 *
 * cbotai uses WPML for multilingual content. Main-menu has a language
 * switcher listed as a `wpml-ls-menu-item` with sub-language items as
 * children. This file targets the switcher's presence and dropdown structure.
 *
 * Uses BASE_URL_2 (cbotai) because it's the only site with multi-language.
 */

const DOCS_URL = `${BASE_URL_2}/docs/`;

test.describe("WPML Language Switcher - cbotai", () => {
  test("Language switcher menu item is present in main nav", async ({
    page,
  }) => {
    await safeGoto(page, DOCS_URL);
    const switcher = page.locator("li.wpml-ls-menu-item").first();
    await expect(switcher).toBeVisible();
  });

  test("Current-language item is marked with wpml-ls-current-language", async ({
    page,
  }) => {
    await safeGoto(page, DOCS_URL);
    const current = page.locator("li.wpml-ls-current-language").first();
    await expect(current).toBeVisible();
    // Should indicate a language code in the class (e.g., wpml-ls-item-en)
    const cls = await current.getAttribute("class");
    expect(cls).toMatch(/wpml-ls-item-[a-z]{2}/);
  });

  test("Language switcher exposes multiple language options", async ({
    page,
  }) => {
    await safeGoto(page, DOCS_URL);
    // wpml-ls-menu-item is the parent; its slot children are the language options
    const langItems = page.locator(".wpml-ls-menu-item, li.wpml-ls-item");
    const count = await langItems.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("At least one language link points to a locale-prefixed URL", async ({
    page,
  }) => {
    await safeGoto(page, DOCS_URL);
    const langLinks = await page.evaluate(() => {
      const links = document.querySelectorAll("li.wpml-ls-item a[href]");
      return Array.from(links).map((a) => a.getAttribute("href"));
    });
    const hasLocalePrefix = langLinks.some((href) =>
      /\/[a-z]{2}(\/|$)/.test(href || "")
    );
    expect(
      hasLocalePrefix,
      `No locale-prefixed language link found in ${JSON.stringify(langLinks)}`
    ).toBe(true);
  });
});
