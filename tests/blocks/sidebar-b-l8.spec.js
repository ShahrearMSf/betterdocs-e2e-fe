// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L8 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l8/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L8" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=1]
      - heading "Without Nested" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
        - article:
          - heading "MSF" [level=1]
      - heading "Include – MKB – Fruit – Team Group, Title" [level=2]
      - complementary:
        - article:
          - heading "Apple" [level=1]
        - article:
          - heading "Orange" [level=1]
        - article:
          - heading "Watermelon" [level=1]
      - heading "Include – Slug, Parent Id" [level=2]
      - complementary
      - heading "Exclude – Count, Doc Author" [level=2]
      - complementary:
        - article:
          - heading "MSF" [level=2]
  `);
});
