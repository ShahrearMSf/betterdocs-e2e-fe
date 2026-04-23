// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Site Chrome - Header & Footer Navigation", () => {
  test("Footer is visible on homepage", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/`);
    const footer = page.locator("footer.site-footer, footer");
    await expect(footer.first()).toBeVisible();
  });

  test("Footer is visible on docs page", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    const footer = page.locator("footer.site-footer, footer");
    await expect(footer.first()).toBeVisible();
  });

  test("Site logo/title link navigates to homepage from docs page", async ({
    page,
  }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    const logoLink = page
      .locator('header a[href$="/"], .site-branding a')
      .first();
    await expect(logoLink).toBeVisible();
    await logoLink.click();
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/?$`));
  });

  test("Main navigation menu is present on homepage", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/`);
    const mainNav = page.getByRole("navigation", { name: /main menu/i });
    await expect(mainNav.first()).toBeVisible();
  });

  test("Skip to content link exists for accessibility", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/`);
    const skipLink = page.locator('a[href="#content"], a.skip-link').first();
    // Skip link may be visually hidden but should exist in DOM
    const count = await skipLink.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
