// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb B Sleek - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-b-sleek/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB B Sleek" [level=1]
      - 'link "Company 3 Categories | 2 Docs Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img
        - heading "Company" [level=2]
        - text: 3 Categories | 2 Docs
        - paragraph: "Last Updated: January 15, 2026"
      - 'link "Fruits 3 Categories | 7 Docs Last Updated: October 12, 2025"':
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img
        - heading "Fruits" [level=2]
        - text: 3 Categories | 7 Docs
        - paragraph: "Last Updated: October 12, 2025"
      - 'link "Sports 5 Categories | 5 Docs Last Updated: January 27, 2026"':
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img
        - heading "Sports" [level=2]
        - text: 5 Categories | 5 Docs
        - paragraph: "Last Updated: January 27, 2026"
  `);
});
