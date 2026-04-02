// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

test("404 Check - Cbotai Docs (/ko/docs/)", async ({ page }) => {
  await safeGoto(page, "https://cbotai.shahrear.site/ko/docs/");
  const bodyText = await page.locator("body").innerText();
  expect(bodyText.toLowerCase()).not.toContain("404");
  expect(bodyText.toLowerCase()).not.toContain("page not found");
});
