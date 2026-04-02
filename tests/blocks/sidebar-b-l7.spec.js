// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L7 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l7/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L7" [level=1]
      - complementary:
        - img
        - text: Search... ⌘ K
        - article:
          - img
          - heading "Star" [level=1]
          - text: "2"
      - paragraph
      - heading "Without Nested" [level=2]
      - complementary:
        - img
        - text: Search... ⌘ K
        - article:
          - img
          - heading "Star" [level=1]
          - text: "1"
        - article:
          - img
          - heading "MSF" [level=1]
          - text: "1"
      - paragraph
      - heading "Include – MKB – Fruits – Name & Menu Order" [level=2]
      - complementary:
        - img
        - text: Search... ⌘ K
        - article:
          - img
          - heading "Watermelon" [level=1]
          - text: "3"
        - article:
          - img
          - heading "Orange" [level=1]
          - text: "3"
        - article:
          - img
          - heading "Apple" [level=1]
          - text: "1"
      - paragraph
      - heading "Include – ID & Doc ID" [level=2]
      - complementary:
        - img
        - text: Search... ⌘ K
        - article:
          - img
          - heading "Star" [level=1]
          - text: "1"
      - paragraph
      - heading "Exclude – Slug & Parent ID" [level=2]
      - complementary:
        - img
        - text: Search... ⌘ K
  `);
});
