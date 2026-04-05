// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box B Sleek - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-b-sleek/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box B Sleek" [level=1]
      - paragraph:
        - strong: BetterDocs Order
      - 'link "Star 1 Sub Category | 1 Doc Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img
        - heading "Star" [level=2]
        - text: 1 Sub Category | 1 Doc
        - paragraph: "Last Updated: January 15, 2026"
      - heading "Name Based Order" [level=2]:
        - strong: Name Based Order
      - 'link "MSF 1 Doc Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img
        - heading "MSF" [level=2]
        - text: 1 Doc
        - paragraph: "Last Updated: January 15, 2026"
      - 'link "Star 1 Sub Category | 1 Doc Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img
        - heading "Star" [level=2]
        - text: 1 Sub Category | 1 Doc
        - paragraph: "Last Updated: January 15, 2026"
      - heading "MKB Based – Team – ID – Descending" [level=2]
      - heading "Include – BetterDocs" [level=2]
      - 'link "MSF 1 Doc Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img
        - heading "MSF" [level=2]
        - text: 1 Doc
        - paragraph: "Last Updated: January 15, 2026"
      - heading "Exclude – Slug – Descending" [level=2]
      - 'link "Star 1 Sub Category | 1 Doc Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img
        - heading "Star" [level=2]
        - text: 1 Sub Category | 1 Doc
        - paragraph: "Last Updated: January 15, 2026"
  `);
});
