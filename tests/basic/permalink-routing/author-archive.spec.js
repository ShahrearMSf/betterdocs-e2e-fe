// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("404 Check - Author Archive Permalinks", () => {
  test("Author archive - author 1", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/authors/1/`);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("Author archive without pagination", async ({ page }) => {
    const response = await page
      .goto(`${BASE_URL}/docs/authors/`, { timeout: 30000 })
      .catch(() => null);
    const status = response ? response.status() : 0;
    // Should either load or redirect, not crash
    expect(status).toBeLessThan(500);
  });
});
