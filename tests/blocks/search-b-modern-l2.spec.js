// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search B Modern L2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-b-modern-l2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search B Modern L2" [level=1]
      - img
      - text: Search Search
      - heading "Custom" [level=2]
      - img
      - text: Search Search
  `);
});
