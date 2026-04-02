// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar W L4 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-w-l4/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar W L4" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=2]
      - paragraph:
        - strong: Without Nested
      - complementary:
        - article:
          - heading "MSF" [level=2]
        - article:
          - heading "Star" [level=2]
      - heading "Include - mkb" [level=2]
      - complementary:
        - article:
          - heading "MSF" [level=2]
        - article:
          - heading "Star" [level=2]
      - heading "Include - Category" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
      - heading "Exclude - Category" [level=2]
      - complementary:
        - article:
          - heading "MSF" [level=2]
      - heading "Heading" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
  `);
});
