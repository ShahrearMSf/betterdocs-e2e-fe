// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box B Card - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-b-card/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box B Card" [level=1]
      - link "betterdocs-category-icon Star 1":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "1"
      - heading "Name based order" [level=2]:
        - strong: Name based order
      - link "betterdocs-category-icon MSF 1":
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - text: "1"
      - link "betterdocs-category-icon Star 1":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "1"
      - heading "MKB Fruit" [level=2]
      - heading "Include Descending" [level=2]
      - heading "Exclude BetterDocs Order" [level=2]
      - link "betterdocs-category-icon Star 1":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "1"
  `);
});
