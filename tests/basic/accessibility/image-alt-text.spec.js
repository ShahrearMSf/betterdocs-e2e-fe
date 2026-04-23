// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Check all images in main content have alt attributes.
 * Decorative background/SVG images are excluded.
 */
async function checkImagesHaveAlt(page, locator) {
  const images = locator.locator("img").filter({
    hasNot: page.locator("svg"),
  });
  const count = await images.count();
  const missingAlt = [];

  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    const alt = await img.getAttribute("alt");
    const src = await img.getAttribute("src");
    // alt should be non-null (empty string is OK for decorative)
    if (alt === null && src) {
      missingAlt.push(src);
    }
  }
  return { total: count, missingAlt };
}

test.describe("Accessibility - Image Alt Text", () => {
  test("Homepage main content images have alt attributes", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/`);
    const result = await checkImagesHaveAlt(page, page.locator("main, body"));
    expect(
      result.missingAlt,
      `Missing alt on: ${result.missingAlt.join(", ")}`
    ).toHaveLength(0);
  });

  test("Docs page images have alt attributes", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    const result = await checkImagesHaveAlt(page, page.locator("body"));
    expect(
      result.missingAlt,
      `Missing alt on: ${result.missingAlt.join(", ")}`
    ).toHaveLength(0);
  });

  test("Encyclopedia page images have alt attributes", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/encyclopedia/`);
    const result = await checkImagesHaveAlt(page, page.locator("body"));
    expect(
      result.missingAlt,
      `Missing alt on: ${result.missingAlt.join(", ")}`
    ).toHaveLength(0);
  });

  test("Single doc images have alt attributes", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/cricket-the-gentlemens-game/`);
    const result = await checkImagesHaveAlt(page, page.locator("body"));
    expect(
      result.missingAlt,
      `Missing alt on: ${result.missingAlt.join(", ")}`
    ).toHaveLength(0);
  });
});
