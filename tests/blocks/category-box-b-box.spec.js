// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box B Box - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-b-box/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box B Box" [level=1]
      - paragraph:
        - strong: BetterDocs Order
      - link "betterdocs-category-icon Star 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: 1 Doc
      - paragraph:
        - strong: Name Based Order
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
      - paragraph:
        - strong: Include
      - link "betterdocs-category-icon Star 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: 1 Doc
      - paragraph:
        - strong: Exclude
      - link "betterdocs-category-icon Star 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon MSF 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - text: 1 Doc
      - paragraph
  `);
});
