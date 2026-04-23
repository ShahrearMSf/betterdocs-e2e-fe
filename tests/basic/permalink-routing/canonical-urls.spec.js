// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Permalink - Canonical URL Consistency", () => {
  test("Single doc canonical strips query parameters", async ({ page }) => {
    await safeGoto(
      page,
      `${BASE_URL}/docs/cricket-the-gentlemens-game/?utm_source=test&ref=x`
    );
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toBe(
      `${BASE_URL}/docs/cricket-the-gentlemens-game/`
    );
  });

  test("Single doc canonical matches clean URL", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/cricket-the-gentlemens-game/`);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toBe(
      `${BASE_URL}/docs/cricket-the-gentlemens-game/`
    );
  });

  test("Encyclopedia archive has canonical URL", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/encyclopedia/`);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toContain("/encyclopedia");
  });

  test("Canonical tag persists across multiple doc pages", async ({
    page,
  }) => {
    const docs = [
      "cricket-the-gentlemens-game",
      "fencing-the-beautiful-sport",
      "apple-a-daily-fruit",
    ];
    for (const slug of docs) {
      await safeGoto(page, `${BASE_URL}/docs/${slug}/`);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical, `Missing canonical on ${slug}`).toBe(
        `${BASE_URL}/docs/${slug}/`
      );
    }
  });
});
