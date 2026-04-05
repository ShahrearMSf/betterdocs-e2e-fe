// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Popular Docs B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/popular-docs-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  // Popular docs order changes dynamically based on view counts
  // Check structure: heading + section labels + lists with items
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Popular Docs B" [level=1]
  `);
  // Verify the 4 section labels exist
  const sections = content.locator("strong");
  await expect(sections.filter({ hasText: "Most Popular" })).toBeVisible();
  await expect(sections.filter({ hasText: "Least Popular" })).toBeVisible();
  await expect(sections.filter({ hasText: "Last Updated" })).toBeVisible();
  await expect(sections.filter({ hasText: "Last Created" })).toBeVisible();
  // Verify lists have items
  const listItems = content.locator("li");
  const count = await listItems.count();
  expect(count).toBeGreaterThan(0);
});
