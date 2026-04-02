// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search B Modern L3 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-b-modern-l3/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search B Modern L3" [level=1]
      - img
      - text: Find Me ⌘ K
      - heading "Custom" [level=2]
      - img
      - text: Search ⌘ K
  `);
});
