// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb B Box - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-b-box/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB B Box" [level=1]
      - heading "Knowledge based Order" [level=2]
      - link "betterdocs-category-icon Sports 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: 5 Docs
      - link "betterdocs-category-icon Fruits 7 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: 7 Docs
      - link "betterdocs-category-icon Team 6 Docs":
        - /url: https://betteromation.shahrear.site/docs/team/
        - img "betterdocs-category-icon"
        - heading "Team" [level=2]
        - text: 6 Docs
      - link "betterdocs-category-icon Company 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: 2 Docs
      - heading "Include Company" [level=2]:
        - text: Include
        - strong: Company
      - link "betterdocs-category-icon Company 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: 2 Docs
      - heading "Exclude Company Name based Order Descending" [level=2]
      - link "betterdocs-category-icon Team 6 Docs":
        - /url: https://betteromation.shahrear.site/docs/team/
        - img "betterdocs-category-icon"
        - heading "Team" [level=2]
        - text: 6 Docs
      - link "betterdocs-category-icon Sports 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: 5 Docs
      - link "betterdocs-category-icon Fruits 7 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: 7 Docs
      - heading "Custom Suffix and Prefix – Id Ascending" [level=2]
      - link "betterdocs-category-icon Sports Favourite 5 Articles":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: Favourite 5 Articles
      - link "betterdocs-category-icon Fruits Favourite 7 Articles":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: Favourite 7 Articles
      - link "betterdocs-category-icon Team Favourite 6 Articles":
        - /url: https://betteromation.shahrear.site/docs/team/
        - img "betterdocs-category-icon"
        - heading "Team" [level=2]
        - text: Favourite 6 Articles
      - link "betterdocs-category-icon Company Favourite 2 Articles":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: Favourite 2 Articles
  `);
});
