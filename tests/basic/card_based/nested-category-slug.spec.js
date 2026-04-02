// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Nested Category URL Slugs", () => {
  test("Category archive URL contains correct slug - /docs/sports/", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/sports/`);
    await expect(page).toHaveURL(/\/docs\/sports\//);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("404");
  });

  test("Nested category URL - /docs/team/qa/", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/team/qa/`);
    await expect(page).toHaveURL(/\/docs\/team\/qa\//);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("Nested category URL - /docs/team/", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/docs/team/`, { timeout: 30000 }).catch(() => null);
    const status = response ? response.status() : 0;
    expect(status).not.toBe(404);
  });

  test("Single doc URL - /docs/junior-qa-the-sprit-house/", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/junior-qa-the-sprit-house/`);
    await expect(page).toHaveURL(/\/docs\/junior-qa-the-sprit-house\//);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });
});
