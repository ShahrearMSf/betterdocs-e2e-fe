// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box Sc 2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-sc-2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box SC 2" [level=1]
      - link "betterdocs-category-icon Cricket 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/cricket/
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Football 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/football/
        - img "betterdocs-category-icon"
        - heading "Football" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Basketball 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/basketball/
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Golf 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/golf/
        - img "betterdocs-category-icon"
        - heading "Golf" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Fencing 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/fencing/
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Apple 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/fruits/apple/
        - img "betterdocs-category-icon"
        - heading "Apple" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon Orange 3 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/orange/
        - img "betterdocs-category-icon"
        - heading "Orange" [level=2]
        - text: 3 Docs
      - link "betterdocs-category-icon Watermelon 3 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/watermelon/
        - img "betterdocs-category-icon"
        - heading "Watermelon" [level=2]
        - text: 3 Docs
      - link "betterdocs-category-icon Developer 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/team/developer/
        - img "betterdocs-category-icon"
        - heading "Developer" [level=2]
        - text: 1 Doc
      - link "QA 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/team/qa/
        - heading "QA" [level=2]
        - text: 5 Docs
      - link "betterdocs-category-icon Star 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: 2 Docs
      - paragraph: Customized
      - link "betterdocs-category-icon Star 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/QA/star/
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: 1 Doc
      - link "betterdocs-category-icon MSF 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/QA/msf/
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - text: 1 Doc
  `);
});
