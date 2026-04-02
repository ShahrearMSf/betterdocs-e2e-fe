// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Box Sc - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-box-sc/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Box SC 1" [level=1]
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
      - link "Cricket 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/cricket/
        - heading "Cricket" [level=2]
        - text: 1 Doc
      - link "Football 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/football/
        - heading "Football" [level=2]
        - text: 1 Doc
      - link "Basketball 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/basketball/
        - heading "Basketball" [level=2]
        - text: 1 Doc
      - link "Golf 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/golf/
        - heading "Golf" [level=2]
        - text: 1 Doc
      - link "Fencing 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/sports/fencing/
        - heading "Fencing" [level=2]
        - text: 1 Doc
      - link "Apple 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/fruits/apple/
        - heading "Apple" [level=2]
        - text: 1 Doc
      - link "Orange 3 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/orange/
        - heading "Orange" [level=2]
        - text: 3 Docs
      - link "Watermelon 3 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/watermelon/
        - heading "Watermelon" [level=2]
        - text: 3 Docs
      - link "Leads 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/team/lead/
        - heading "Leads" [level=2]
        - text: 1 Doc
      - link "Coleads 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/team/coleads/
        - heading "Coleads" [level=2]
        - text: 2 Docs
      - link "Developer 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/team/developer/
        - heading "Developer" [level=2]
        - text: 1 Doc
      - link "JuniorQA 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/team/juniorqa/
        - heading "JuniorQA" [level=2]
        - text: 2 Docs
      - link "Star 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/star/
        - heading "Star" [level=2]
        - text: 1 Doc
      - link "MSF 1 Doc":
        - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - heading "MSF" [level=2]
        - text: 1 Doc
  `);
});
