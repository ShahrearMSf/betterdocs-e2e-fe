// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const DOC_URL = `${BASE_URL}/docs/cricket-the-gentlemens-game/`;

test.describe("Single Doc Page - Core Features", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOC_URL);
  });

  test("Breadcrumb is visible with Home link", async ({ page }) => {
    const breadcrumb = page.locator(".betterdocs-breadcrumb");
    await expect(breadcrumb).toBeVisible();
    const homeLink = breadcrumb.locator(".item-home a");
    await expect(homeLink).toBeVisible();
  });

  test("Breadcrumb home link navigates to homepage", async ({ page }) => {
    const homeLink = page.locator(".betterdocs-breadcrumb .item-home a");
    await homeLink.click();
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/?$`));
  });

  test("Table of Contents (TOC) is present", async ({ page }) => {
    // TOC exists in DOM (sidebar version may be hidden on smaller viewports)
    const tocs = page.locator(".betterdocs-toc");
    const count = await tocs.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // At least one TOC should list heading-2 items
    const tocItems = page.locator("li.betterdocs-toc-heading-level-2");
    const itemCount = await tocItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(1);
  });

  test("Docs sidebar is visible on single doc page", async ({ page }) => {
    const sidebar = page.locator(".betterdocs-sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("Docs navigation (prev/next) is present at the bottom", async ({
    page,
  }) => {
    const docsNav = page.locator(".docs-navigation, .docs-nav");
    await expect(docsNav.first()).toBeVisible();
  });

  test("Related articles section is visible", async ({ page }) => {
    const related = page.locator(".betterdocs-related-articles-container-front");
    await expect(related).toBeVisible();
  });

  test("Single doc renders theme chrome, NOT FSE compat footer", async ({
    page,
  }) => {
    // Regression guard for fbs-79870 (FSE chrome leak).
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toContain("Proudly powered by WordPress");
  });

  test("Single doc has correct body class", async ({ page }) => {
    // Wrong body class means the wrong template loaded (e.g., MKB grid on a
    // doc URL).
    const bodyClass = await page
      .locator("body")
      .evaluate((el) => el.className);
    expect(bodyClass).toContain("single-docs");
  });
});
