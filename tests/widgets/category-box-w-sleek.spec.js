// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box W Sleek - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-w-sleek/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box W Sleek" [level=1]
      - heading "Include MKB - BetterDocs Order" [level=2]
      - 'link "Cricket 1 Doc Last Updated: December 15, 2025"':
        - /url: https://betteromation.shahrear.site/docs/sports/cricket/
        - img
        - heading "Cricket" [level=2]
        - text: 1 Doc
        - paragraph: "Last Updated: December 15, 2025"
      - 'link "Football 1 Doc Last Updated: January 27, 2026"':
        - /url: https://betteromation.shahrear.site/docs/sports/football/
        - img
        - heading "Football" [level=2]
        - text: 1 Doc
        - paragraph: "Last Updated: January 27, 2026"
      - 'link "Basketball 1 Doc Last Updated: December 15, 2025"':
        - /url: https://betteromation.shahrear.site/docs/sports/basketball/
        - img
        - heading "Basketball" [level=2]
        - text: 1 Doc
        - paragraph: "Last Updated: December 15, 2025"
      - 'link "Golf 1 Doc Last Updated: December 15, 2025"':
        - /url: https://betteromation.shahrear.site/docs/sports/golf/
        - img
        - heading "Golf" [level=2]
        - text: 1 Doc
        - paragraph: "Last Updated: December 15, 2025"
      - paragraph:
        - strong: Without Nested – Id Descending
      - heading "Excluding - without icon" [level=2]
      - 'link "Star 1 Sub Section | MSF 2 Articles Updated : January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - heading "Star" [level=2]
        - text: 1 Sub Section | MSF 2 Articles
        - paragraph: "Updated : January 15, 2026"
      - heading "Custom" [level=2]
  `);
});
