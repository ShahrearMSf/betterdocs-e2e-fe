// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Docs Page - Search", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
  });

  test("Search bar is visible on docs page", async ({ page }) => {
    const searchBar = page.locator(".search-bar");
    await expect(searchBar).toBeVisible();
  });

  test("Search placeholder text is displayed", async ({ page }) => {
    const placeholder = page.locator(".search-input");
    await expect(placeholder).toContainText("Search...");
  });

  test("Click search bar opens search modal", async ({ page }) => {
    await page.locator(".search-bar").click();
    const searchInput = page.locator(".betterdocs-search-field");
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });

  test("Type in search modal shows results", async ({ page }) => {
    await page.locator(".search-bar").click();
    const searchInput = page.locator(".betterdocs-search-field");
    await expect(searchInput).toBeVisible({ timeout: 5000 });

    await searchInput.fill("Cricket");
    await page.waitForTimeout(1000);

    // Check that some search results appear
    const results = page.locator(".betterdocs-search-modal-layout-1");
    await expect(results).toBeVisible();
  });

  test("Search button is visible", async ({ page }) => {
    const searchButton = page.locator(".search-button");
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toHaveText("Search");
  });
});
