// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box W Box - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-w-box/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box W Box" [level=1]
      - heading "Name ascending" [level=2]
      - link "betterdocs-category-icon Basketball 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/basketball/
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Cricket 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/cricket/
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Fencing 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/fencing/
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Football 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/football/
        - img "betterdocs-category-icon"
        - heading "Football" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Golf 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/golf/
        - img "betterdocs-category-icon"
        - heading "Golf" [level=2]
        - text: 1 Doc
      - paragraph:
        - strong: Without Nested
      - heading "Exclude id descending" [level=2]
      - link "betterdocs-category-icon MSF 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Star 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: 1 Doc
      - heading "Custom" [level=2]
      - link "betterdocs-category-icon Star 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: 2 Docs
  `);
});
