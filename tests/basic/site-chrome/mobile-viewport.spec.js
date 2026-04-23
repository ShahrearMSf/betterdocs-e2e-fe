// @ts-check
const { test, expect, devices } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const MOBILE_VIEWPORT = { width: 375, height: 812 };

test.describe("Site Chrome - Mobile Viewport Rendering", () => {
  test.use({ viewport: MOBILE_VIEWPORT });

  test("Homepage renders on mobile without horizontal scroll", async ({
    page,
  }) => {
    await safeGoto(page, `${BASE_URL}/`);
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    // Allow 2px tolerance for scrollbars/subpixel rendering
    expect(bodyScrollWidth).toBeLessThanOrEqual(viewportWidth + 2);
  });

  test("Docs page renders on mobile", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    const mainContent = page.locator(".betterdocs-wrapper, main");
    await expect(mainContent.first()).toBeVisible();
  });

  test("Encyclopedia page renders on mobile", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/encyclopedia/`);
    const heading = page.getByRole("heading", {
      name: "Encyclopedia",
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("Single doc main heading is visible on mobile", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/cricket-the-gentlemens-game/`);
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});
