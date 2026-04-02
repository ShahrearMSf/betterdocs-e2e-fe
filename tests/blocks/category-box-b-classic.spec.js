// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box B Classic - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-b-classic/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box B Classic" [level=1]
      - paragraph:
        - strong: BetterDocs Order
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
      - heading "Name Based Order Descending" [level=2]:
        - strong: Name Based Order
        - text: Descending
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
      - heading "MKB Based Sports ID Based" [level=2]:
        - text: MKB Based
        - strong: Sports
        - text: ID Based
      - heading "Include – BetterDocs Order" [level=2]:
        - strong: Include
        - text: – BetterDocs Order
      - heading "Exclude – BetterDocs Order" [level=2]:
        - strong: Exclude
        - text: – BetterDocs Order
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
  `);
});
