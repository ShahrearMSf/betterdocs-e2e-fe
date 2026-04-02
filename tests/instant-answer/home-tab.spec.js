// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Instant Answer - Home Tab", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);
    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
  });

  test("Home tab is active by default", async ({ page }) => {
    const homeTab = page.locator(".betterdocs-ia-home");
    await expect(homeTab).toHaveClass(/active/);
  });

  test("Header shows correct title and subtitle", async ({ page }) => {
    const header = page.locator(".betterdocs-ia-header-group");
    await expect(header).toContainText("Get Instant Help");
    await expect(header).toContainText("Need any assistance?");
  });

  test("Search input is visible in home tab", async ({ page }) => {
    const search = page.locator(".betterdocs-ia-search-field");
    await expect(search).toBeVisible();
  });

  test("Docs list is visible with content items", async ({ page }) => {
    const docsList = page.locator(".betterdocs-ia-home-content-list");
    await expect(docsList).toBeVisible();

    const docsHeading = page.locator(".betterdocs-ia-docs-heading").first();
    await expect(docsHeading).toContainText("Docs");
  });

  test("Content items are listed under Docs", async ({ page }) => {
    const items = page.locator(".betterdocs-ia-docs-content");
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test("All 4 navigation tabs are visible with correct names", async ({ page }) => {
    const tabs = page.locator(".betterdocs-ia-tabs li");
    await expect(tabs).toHaveCount(4);

    await expect(tabs.nth(0)).toContainText("Home");
    await expect(tabs.nth(1)).toContainText("Chatbot");
    await expect(tabs.nth(2)).toContainText("Query");
    await expect(tabs.nth(3)).toContainText("Assets");
  });
});
