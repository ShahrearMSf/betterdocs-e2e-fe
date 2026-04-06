// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Docs Page - Category Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
  });

  test("Category boxes are visible with correct names", async ({ page }) => {
    const categories = page.locator(".betterdocs-single-category-wrapper");
    await expect(categories).toHaveCount(4);

    await expect(categories.nth(0)).toContainText("Sports");
    await expect(categories.nth(1)).toContainText("Fruits");
    await expect(categories.nth(2)).toContainText("Team");
    await expect(categories.nth(3)).toContainText("Company");
  });

  test("Category boxes display doc counts", async ({ page }) => {
    const counts = page.locator(".betterdocs-category-items-counts");
    await expect(counts).toHaveCount(4);

    await expect(counts.nth(0)).toContainText("5 Docs");
    await expect(counts.nth(1)).toContainText("7 Docs");
    await expect(counts.nth(2)).toContainText("6 Docs");
    await expect(counts.nth(3)).toContainText("2 Docs");
  });

  test("Category icons are visible", async ({ page }) => {
    const icons = page.locator(".betterdocs-category-icon-img");
    await expect(icons).toHaveCount(4);

    for (let i = 0; i < 4; i++) {
      await expect(icons.nth(i)).toBeVisible();
    }
  });

  test("Click Sports category navigates to archive", async ({ page }) => {
    await page.locator(".betterdocs-single-category-wrapper").filter({ hasText: "Sports" }).click();
    await expect(page).toHaveURL(/\/docs\/sports\//);
  });

  test("Click Fruits category navigates to archive", async ({ page }) => {
    await page.locator(".betterdocs-single-category-wrapper").filter({ hasText: "Fruits" }).click();
    await expect(page).toHaveURL(/\/docs\/fruits\//);
  });

  test("Click Company category navigates to archive", async ({ page }) => {
    await page.locator(".betterdocs-single-category-wrapper").filter({ hasText: "Company" }).click();
    await expect(page).toHaveURL(/\/docs\/qa\//);
  });
});
