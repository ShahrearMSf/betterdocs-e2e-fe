// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search B Modern L1 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-b-modern-l1/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search B Modern L1" [level=1]
      - heading "How are you?" [level=2]
      - heading "I'm Fine" [level=3]
      - img
      - text: Search Search
      - heading "Default+Custom" [level=2]
      - img
      - text: Khuje Nao Amake
  `);
});
