// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Theme chrome / FSE-compat footer regression sweep.
 *
 * Background: BetterDocs has had multiple incidents where a wrong template
 * (FSE block-template fallback) renders on certain URLs, producing the
 * default "Proudly powered by WordPress" footer instead of the theme footer.
 * The page returns 200 and has content, so status-based 404 sweeps miss it.
 *
 * This sweep visits 5 representative page types and asserts:
 *   1. The default WP "Proudly powered by WordPress" string is ABSENT.
 *   2. At least one theme-specific footer marker is present
 *      (theme footer text: "BetterOmation", "A Site by MSF", "All rights reserved").
 *
 * Covers fbs-79870 and related FSE chrome-leak bug classes.
 */

const PAGES = [
  { name: "Homepage", url: `${BASE_URL}/` },
  { name: "Docs archive", url: `${BASE_URL}/docs/` },
  { name: "Encyclopedia archive", url: `${BASE_URL}/encyclopedia/` },
  { name: "Single doc", url: `${BASE_URL}/docs/cricket-the-gentlemens-game/` },
  { name: "Single encyclopedia entry", url: `${BASE_URL}/encyclopedia/aesthetic/` },
];

const THEME_MARKERS = [
  "BetterOmation",
  "A Site by MSF",
  "All rights reserved",
];

test.describe("Site Chrome - Theme Footer (no FSE compat leak)", () => {
  for (const { name, url } of PAGES) {
    test(`${name} renders theme footer, not WordPress compat footer`, async ({
      page,
    }) => {
      await safeGoto(page, url);
      const bodyText = await page.locator("body").innerText();

      // Must not show the WP-default "Proudly powered" footer.
      expect(
        bodyText,
        `${name} (${url}) is showing the FSE-compat WordPress footer`
      ).not.toContain("Proudly powered by WordPress");

      // Must show at least one theme-specific footer marker.
      const hasThemeMarker = THEME_MARKERS.some((marker) =>
        bodyText.includes(marker)
      );
      expect(
        hasThemeMarker,
        `${name} (${url}) is missing all theme footer markers`
      ).toBe(true);
    });
  }
});
