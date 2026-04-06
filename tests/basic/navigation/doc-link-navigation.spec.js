// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Doc Link Navigation - Single Doc Pages", () => {
  test("Click doc from Sports category loads article", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/sports/`);
    const docLink = page.getByRole("link", { name: /Cricket/ }).first();
    await expect(docLink).toBeVisible();
    await docLink.click();
    // Nested URL pattern: /docs/sports/cricket-.../ or /docs/cricket-...
    await expect(page).toHaveURL(/\/docs\/.*cricket/);
    const article = page.locator(
      ".betterdocs-content-wrapper, .betterdocs-entry-content, article"
    );
    await expect(article.first()).toBeVisible();
  });

  test("Click doc from Fruits category loads article", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/fruits/`);
    const docLink = page.getByRole("link", { name: /Apple/ }).first();
    await expect(docLink).toBeVisible();
    await docLink.click();
    await expect(page).toHaveURL(/\/docs\/.*apple/);
    const article = page.locator(
      ".betterdocs-content-wrapper, .betterdocs-entry-content, article"
    );
    await expect(article.first()).toBeVisible();
  });

  test("Single doc page has content area visible", async ({ page }) => {
    await safeGoto(
      page,
      `${BASE_URL}/docs/cricket-the-gentlemens-game/`
    );
    const content = page.locator(
      ".betterdocs-content-wrapper, .betterdocs-entry-content, article, main"
    );
    await expect(content.first()).toBeVisible();
    await expect(page.locator("body")).not.toContainText("page not found", {
      ignoreCase: true,
    });
  });

  test("Category archive shows multiple doc links", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/sports/`);
    // Category archive lists docs as article elements with doc links
    const docArticles = page.locator("article");
    const count = await docArticles.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("Nested category archive loads with docs", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/team/qa/`);
    await expect(page.locator("body")).not.toContainText("page not found", {
      ignoreCase: true,
    });
    const content = page.locator("main, .betterdocs-content-area, article");
    await expect(content.first()).toBeVisible();
  });
});
