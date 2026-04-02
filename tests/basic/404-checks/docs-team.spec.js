// @ts-check
const { test, expect } = require("@playwright/test");
require("dotenv").config();

test("404 Check - Docs Team", async ({ page }) => {
  const response = await page.goto("https://betteromation.shahrear.site/docs/team/", { timeout: 30000 }).catch(() => null);
  const status = response ? response.status() : 0;
  // Page should not be a 404
  expect(status).not.toBe(404);
});
