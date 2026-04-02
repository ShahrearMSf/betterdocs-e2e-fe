// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L1 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l1/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L1" [level=1]
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "Star" [level=1]
          - text: "2"
      - heading "Without Nested" [level=2]
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "MSF" [level=1]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "Star" [level=1]
          - text: "1"
      - heading "Include – MKB" [level=2]
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "Star" [level=1]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "MSF" [level=1]
          - text: "1"
      - heading "Include – Apple" [level=2]
      - complementary
      - heading "Exclude – Apple" [level=2]
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "Star" [level=1]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "MSF" [level=1]
          - text: "1"
  `);
});
