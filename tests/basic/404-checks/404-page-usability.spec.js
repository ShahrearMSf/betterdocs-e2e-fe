// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * 404-page usability guard.
 *
 * When a URL 404s, users must still see the theme chrome (site header,
 * main navigation, footer) so they can navigate away. Guards against
 * regressions where the 404 template loses layout (e.g., blank page,
 * WP-default fallback, or FSE compat leak leaving only "Proudly powered by
 * WordPress").
 */

const NON_EXISTENT_URL = `${BASE_URL}/does-not-exist-page-xyz-123/`;

test.describe("404 Page - Chrome & Navigability", () => {
  test.beforeEach(async ({ page }) => {
    const res = await page.goto(NON_EXISTENT_URL, { timeout: 30000 });
    expect(res.status()).toBe(404);
  });

  test("404 page renders the site's theme header/logo", async ({ page }) => {
    const body = await page.locator("body").innerText();
    expect(body).toContain("BetterOmation");
  });

  test("404 page shows the main navigation menu", async ({ page }) => {
    const mainNav = page.locator('nav[aria-label*="Main menu" i], .site-navigation');
    await expect(mainNav.first()).toBeVisible();
  });

  test("404 page shows theme footer (not FSE compat fallback)", async ({
    page,
  }) => {
    const body = await page.locator("body").innerText();
    // Must show theme footer marker
    expect(body).toMatch(/All rights reserved|A Site by MSF/);
    // Must NOT show the bare WP-default footer
    expect(body).not.toContain("Proudly powered by WordPress");
  });
});
