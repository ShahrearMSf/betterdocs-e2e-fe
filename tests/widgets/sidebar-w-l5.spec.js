// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar W L5 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-w-l5/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar W L5" [level=1]
      - complementary:
        - img
        - text: Search... ⌘ K
        - article:
          - img
          - heading "Star" [level=2]
          - text: "2"
      - paragraph:
        - strong: Without Nested and Search
      - complementary:
        - article:
          - img
          - heading "Star" [level=2]
          - text: "1"
        - article:
          - img
          - heading "MSF" [level=2]
          - text: "1"
      - heading "Include - MKB" [level=2]
      - complementary:
        - article:
          - img
          - heading "Leads" [level=2]
          - text: "1"
        - article:
          - img
          - heading "JuniorQA" [level=2]
          - text: "2"
        - article:
          - img
          - heading "Developer" [level=2]
          - text: "1"
        - article:
          - heading "Coleads" [level=2]
          - text: "2"
      - heading "Include category" [level=2]
      - complementary:
        - article:
          - img
          - heading "Star" [level=2]
          - text: "1"
      - heading "Exclude - Category" [level=2]
      - complementary:
        - article:
          - img
          - heading "Star" [level=2]
          - text: "1"
      - heading "Custom" [level=2]
      - complementary:
        - img
        - text: Search... ⌘ K
        - article:
          - img
          - heading "Star" [level=2]
          - text: "2"
  `);
});
