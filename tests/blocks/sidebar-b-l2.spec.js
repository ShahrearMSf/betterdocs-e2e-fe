// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L2" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=1]
      - heading "Without Nested" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
        - article:
          - heading "MSF" [level=1]
      - heading "MKB Include Fruit" [level=2]
      - complementary:
        - article:
          - heading "Apple" [level=1]
        - article:
          - heading "Orange" [level=1]
        - article:
          - heading "Watermelon" [level=1]
      - heading "Include – Basketball" [level=2]
      - complementary
      - heading "Exclude" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
  `);
});
