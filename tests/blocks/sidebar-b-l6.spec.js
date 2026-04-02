// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L6 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l6/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L6" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=1]
          - text: "2"
      - heading "Without Nested" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
          - text: "1"
        - article:
          - heading "MSF" [level=1]
          - text: "1"
      - heading "Mkb Include – Team" [level=2]
      - complementary:
        - article:
          - heading "Leads" [level=1]
          - text: "1"
        - article:
          - heading "Coleads" [level=1]
          - text: "2"
        - article:
          - heading "Developer" [level=1]
          - text: "1"
        - article:
          - heading "JuniorQA" [level=1]
          - text: "2"
      - heading "Include – Name, ID" [level=2]
      - complementary:
        - article:
          - heading "MSF" [level=1]
          - text: "1"
        - article:
          - heading "Star" [level=1]
          - text: "1"
      - heading "Exclude – ID, BetterDocs" [level=2]
      - complementary:
        - article:
          - heading "MSF" [level=1]
          - text: "1"
        - article:
          - heading "Star" [level=1]
          - text: "1"
  `);
});
