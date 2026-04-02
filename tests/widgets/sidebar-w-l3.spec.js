// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar W L3 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-w-l3/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar W L3" [level=1]
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
      - heading "Include - MKB" [level=2]
      - complementary:
        - article:
          - heading "Leads" [level=2]
        - article:
          - heading "Coleads" [level=2]
        - article:
          - heading "Developer" [level=2]
        - article:
          - heading "JuniorQA" [level=2]
      - heading "Include - Category" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
      - heading "Exclude - Category" [level=2]
      - complementary
      - heading "Custom" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
  `);
});
