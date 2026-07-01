// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();
const BASE_URL_2 = process.env.BASE_URL_2;

test("404 Check - Cbotai Encyclopedia", async ({ page }) => {
  await safeGoto(page, `${BASE_URL_2}/encyclopedia/`);
  const bodyText = await page.locator("body").innerText();
  expect(bodyText.toLowerCase()).not.toContain("404");
  expect(bodyText.toLowerCase()).not.toContain("page not found");
});
