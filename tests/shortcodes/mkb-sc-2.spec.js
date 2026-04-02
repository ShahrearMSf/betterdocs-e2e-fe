// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb Sc 2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-sc-2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB SC 2" [level=1]
      - link "betterdocs-category-icon Fruits 7 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: 7 Docs
      - link "betterdocs-category-icon Company 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: 2 Docs
      - link "betterdocs-category-icon Sports 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: 5 Docs
      - paragraph:
        - strong: Customized
      - link "betterdocs-category-icon Sports 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=6]
        - text: 5 Docs
      - link "betterdocs-category-icon Fruits 7 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=6]
        - text: 7 Docs
      - link "betterdocs-category-icon Company 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=6]
        - text: 2 Docs
  `);
});
