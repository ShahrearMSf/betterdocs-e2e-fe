// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

test("404 Check - Docs Junior QA The Sprit House", async ({ page }) => {
  await safeGoto(page, "https://betteromation.shahrear.site/docs/junior-qa-the-sprit-house/");
  const bodyText = await page.locator("body").innerText();
  expect(bodyText.toLowerCase()).not.toContain("404");
  expect(bodyText.toLowerCase()).not.toContain("page not found");
});
