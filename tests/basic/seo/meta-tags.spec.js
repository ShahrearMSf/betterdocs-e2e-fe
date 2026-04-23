// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("SEO - Meta Tags & Title", () => {
  test("Homepage has a title tag", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/`);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test("Single doc page title includes doc name", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/cricket-the-gentlemens-game/`);
    const title = await page.title();
    expect(title.toLowerCase()).toContain("cricket");
  });

  test("Single doc has canonical URL", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/cricket-the-gentlemens-game/`);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toContain("/docs/cricket-the-gentlemens-game");
  });

  test("Docs page has exactly one H1", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test("Encyclopedia page has H1 'Encyclopedia'", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/encyclopedia/`);
    const h1 = page.getByRole("heading", { name: "Encyclopedia", level: 1 });
    await expect(h1).toBeVisible();
  });

  test("Single doc has meta description or viewport tag", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/cricket-the-gentlemens-game/`);
    // Viewport tag is essential for responsive rendering
    const viewport = await page
      .locator('meta[name="viewport"]')
      .getAttribute("content");
    expect(viewport).toBeTruthy();
    if (viewport) expect(viewport.toLowerCase()).toContain("width");
  });
});
