// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb W Card - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-w-card/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB W Card" [level=1]
      - link "betterdocs-category-icon Company 2":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: "2"
      - link "betterdocs-category-icon Fruits 7":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: "7"
      - link "betterdocs-category-icon Sports 5":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: "5"
      - link "betterdocs-category-icon Team 6":
        - /url: https://betteromation.shahrear.site/docs/team/
        - img "betterdocs-category-icon"
        - heading "Team" [level=2]
        - text: "6"
      - heading "Include" [level=2]
      - link "betterdocs-category-icon Sports 5":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=1]
        - text: "5"
      - link "betterdocs-category-icon Company 2":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=1]
        - text: "2"
      - heading "Exclude" [level=2]
      - link "Company 2":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - heading "Company" [level=1]
        - text: "2"
      - link "Team 6":
        - /url: https://betteromation.shahrear.site/docs/team/
        - heading "Team" [level=1]
        - text: "6"
      - link "Sports 5":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - heading "Sports" [level=1]
        - text: "5"
      - heading "Custom" [level=2]
      - link "betterdocs-category-icon Team 6":
        - /url: https://betteromation.shahrear.site/docs/team/
        - img "betterdocs-category-icon"
        - heading "Team" [level=1]
        - text: "6"
      - link "betterdocs-category-icon Company 2":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=1]
        - text: "2"
  `);
});
