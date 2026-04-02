// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar W L1 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-w-l1/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar W L1" [level=1]
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "Star" [level=2]
          - text: "2"
      - paragraph:
        - strong: Without Nested
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "Star" [level=2]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "MSF" [level=2]
          - text: "1"
      - heading "Include - MKB" [level=2]
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "Cricket" [level=2]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "Football" [level=2]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "Basketball" [level=2]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "Golf" [level=2]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "Fencing" [level=2]
          - text: "1"
      - heading "Include - Category" [level=2]
      - complementary
      - heading "Exclude - Category" [level=2]
      - complementary
      - heading "Custom" [level=2]
      - complementary:
        - article:
          - img "betterdocs-category-icon"
          - heading "Star" [level=2]
          - text: "1"
        - article:
          - img "betterdocs-category-icon"
          - heading "MSF" [level=2]
          - text: "1"
      - link:
        - /url: "#"
        - img
  `);
});
