// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Popular Docs Sc - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/popular-docs-sc/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  // Popular docs order changes dynamically based on view counts
  // Check structure only: heading + list with items
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Popular Docs SC" [level=1]
  `);
  // Verify popular docs list has items
  const listItems = content.locator("li");
  const count = await listItems.count();
  expect(count).toBeGreaterThan(0);
});
