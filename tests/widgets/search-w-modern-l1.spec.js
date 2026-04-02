// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search W Modern L1 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-w-modern-l1/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search W Modal L1" [level=1]
      - img
      - text: Search Search
      - paragraph: Without Content Options
      - img
      - text: MSF
  `);
});
