// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Sidebar - Category Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/sidebar-b-l1/`);
  });

  test("Sidebar categories are visible with doc counts", async ({ page }) => {
    const sidebar = page.locator(
      "main#content aside, main#content [role='complementary']"
    );
    await expect(sidebar.first()).toBeVisible();
    await expect(sidebar.first()).toContainText("Star");
  });

  test("Sidebar shows multiple category sections", async ({ page }) => {
    const categories = page.locator("main#content article");
    const count = await categories.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("Sidebar category has icon and doc count", async ({ page }) => {
    const firstCategory = page.locator("main#content article").first();
    await expect(firstCategory).toBeVisible();
    // Should have category icon
    const icon = firstCategory.locator('img[alt="betterdocs-category-icon"]');
    await expect(icon).toBeVisible();
    // Should have a doc count
    await expect(firstCategory).toContainText(/\d/);
  });
});
