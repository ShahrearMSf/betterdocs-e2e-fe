// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box W Card - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-w-card/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box W Card" [level=1]
      - heading "Include - Sports - name - ascending" [level=2]
      - link "betterdocs-category-icon Basketball 1":
        - /url: https://betteromation.shahrear.site/docs/sports/basketball/
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - text: "1"
      - link "betterdocs-category-icon Cricket 1":
        - /url: https://betteromation.shahrear.site/docs/sports/cricket/
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - text: "1"
      - link "betterdocs-category-icon Fencing 1":
        - /url: https://betteromation.shahrear.site/docs/sports/fencing/
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - text: "1"
      - link "betterdocs-category-icon Football 1":
        - /url: https://betteromation.shahrear.site/docs/sports/football/
        - img "betterdocs-category-icon"
        - heading "Football" [level=2]
        - text: "1"
      - link "betterdocs-category-icon Golf 1":
        - /url: https://betteromation.shahrear.site/docs/sports/golf/
        - img "betterdocs-category-icon"
        - heading "Golf" [level=2]
        - text: "1"
      - paragraph:
        - strong: Without Nested
      - 'link "Star 1 Sub Category | 1 Doc Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img
        - heading "Star" [level=2]
        - text: 1 Sub Category | 1 Doc
        - paragraph: "Last Updated: January 15, 2026"
      - 'link "MSF 1 Doc Last Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img
        - heading "MSF" [level=2]
        - text: 1 Doc
        - paragraph: "Last Updated: January 15, 2026"
      - heading "exclude" [level=2]
      - 'link "Star 1 Sub Section | 1 Article Updated Time: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img
        - heading "Star" [level=2]
        - text: 1 Sub Section | 1 Article
        - paragraph: "Updated Time: January 15, 2026"
      - 'link "MSF 1 Article Updated Time: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img
        - heading "MSF" [level=2]
        - text: 1 Article
        - paragraph: "Updated Time: January 15, 2026"
      - heading "Custom" [level=2]
      - 'link "MSF 1 Article Updated Time: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img
        - heading "MSF" [level=2]
        - text: 1 Article
        - paragraph: "Updated Time: January 15, 2026"
      - 'link "Star 1 Sub Section | 1 Article Updated Time: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img
        - heading "Star" [level=2]
        - text: 1 Sub Section | 1 Article
        - paragraph: "Updated Time: January 15, 2026"
  `);
});
