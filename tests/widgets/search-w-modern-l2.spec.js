// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search W Modern L2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-w-modern-l2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search W Modern L2" [level=1]
      - img
      - text: Search Search
      - paragraph:
        - strong: Without Content Options, Right
      - img
      - text: Search
      - heading "Custom" [level=2]
      - img
      - text: Find me please Search
  `);
});
