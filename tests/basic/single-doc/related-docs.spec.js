// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Related Docs section — content & link resolution.
 *
 * `single-doc-features.spec.js` asserts the container is visible; this
 * asserts that the list actually contains resolving links (guarding against
 * the absint()/`_betterdocs_related_articles` corruption bug class where
 * the section rendered but with broken or empty links).
 */

const DOC_URL = `${BASE_URL}/docs/cricket-the-gentlemens-game/`;

test.describe("Single Doc - Related Docs list integrity", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOC_URL);
  });

  test("Related Docs list contains at least one link", async ({ page }) => {
    const links = page
      .locator(".betterdocs-related-articles-container-front")
      .locator('a[href*="/docs/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("First related doc link resolves without 4xx/5xx", async ({
    page,
    request,
  }) => {
    const firstHref = await page
      .locator(".betterdocs-related-articles-container-front a[href*='/docs/']")
      .first()
      .getAttribute("href");
    expect(firstHref).toBeTruthy();
    if (firstHref) {
      const res = await request.get(firstHref, { failOnStatusCode: false });
      expect(res.status()).toBeLessThan(400);
    }
  });

  test("Related Docs list does NOT contain broken '(.undefined)' rows", async ({
    page,
  }) => {
    // Corruption guard — the fbs release-cycle bug shipped rows rendered as
    // "(.undefined)" from bad post-meta.
    const listText = await page
      .locator(".betterdocs-related-articles-container-front")
      .innerText();
    expect(listText).not.toContain("undefined");
    expect(listText).not.toContain(".undefined");
  });
});
