// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar W L6 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-w-l6/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar W L6" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=2]
      - paragraph:
        - strong: Without Nested
      - complementary:
        - article:
          - heading "Star" [level=2]
        - article:
          - heading "MSF" [level=2]
      - heading "Include MKB" [level=2]
      - complementary:
        - article:
          - heading "Apple" [level=2]
        - article:
          - heading "Orange" [level=2]
        - article:
          - heading "Watermelon" [level=2]
      - heading "Include - category" [level=2]
      - complementary
      - heading "Exclude - category" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
      - heading "Custom" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
  `);
});
