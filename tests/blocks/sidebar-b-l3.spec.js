// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L3 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l3/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L3" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=1]
      - paragraph: Without Nested
      - complementary:
        - article:
          - heading "Star" [level=1]
        - article:
          - heading "MSF" [level=1]
      - heading "MKB Included Team" [level=2]
      - complementary:
        - article:
          - heading "Leads" [level=1]
        - article:
          - heading "Coleads" [level=1]
        - article:
          - heading "Developer" [level=1]
        - article:
          - heading "JuniorQA" [level=1]
      - heading "Include" [level=2]
      - complementary:
        - article:
          - heading "MSF" [level=1]
      - heading "Exclude" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
  `);
});
