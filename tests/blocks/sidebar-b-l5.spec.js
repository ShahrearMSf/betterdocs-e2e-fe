// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L5 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l5/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L5" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=1]
      - paragraph: Without Nested
      - complementary:
        - article:
          - heading "Star" [level=1]
        - article:
          - heading "MSF" [level=1]
      - heading "Include Mkb – Name" [level=2]
      - complementary:
        - article:
          - heading "Basketball" [level=1]
        - article:
          - heading "Cricket" [level=1]
        - article:
          - heading "Fencing" [level=1]
        - article:
          - heading "Football" [level=1]
        - article:
          - heading "Golf" [level=1]
      - heading "Include – Slug and Random" [level=2]
      - complementary
      - heading "Exclude – ID Descending, Date Ascending" [level=2]
      - complementary
  `);
});
