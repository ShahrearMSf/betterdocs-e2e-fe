// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const DOC_URL = `${BASE_URL}/docs/cricket-the-gentlemens-game/`;
const DOC_PATH = "/docs/cricket-the-gentlemens-game/";

/**
 * Social-share intent URLs on single doc pages.
 *
 * Verifies Facebook / Twitter / LinkedIn share links point at the correct
 * share-intent endpoint AND include the current doc URL. Guards against
 * templating regressions (wrong URL, missing URL param, hardcoded example.com).
 */

test.describe("Single Doc - Social Share Links", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOC_URL);
  });

  test("Social-share section renders on doc page", async ({ page }) => {
    const shareSection = page.locator(".betterdocs-social-share");
    await expect(shareSection.first()).toBeVisible();
  });

  test("Facebook share link points to sharer.php with encoded doc URL", async ({
    page,
  }) => {
    const fb = page
      .locator('.betterdocs-social-share a[href*="facebook.com"]')
      .first();
    const href = await fb.getAttribute("href");
    expect(href).toContain("facebook.com/sharer");
    expect(href).toContain(DOC_PATH);
  });

  test("Twitter/X share link points to intent/tweet with doc URL", async ({
    page,
  }) => {
    const tw = page
      .locator(
        '.betterdocs-social-share a[href*="twitter.com"], .betterdocs-social-share a[href*="x.com"]'
      )
      .first();
    const href = await tw.getAttribute("href");
    expect(href).toMatch(/intent\/tweet/);
    expect(href).toContain(DOC_PATH);
  });

  test("LinkedIn share link points to shareArticle with doc URL", async ({
    page,
  }) => {
    const li = page
      .locator('.betterdocs-social-share a[href*="linkedin.com"]')
      .first();
    const href = await li.getAttribute("href");
    expect(href).toContain("linkedin.com/shareArticle");
    expect(href).toContain(DOC_PATH);
  });
});
