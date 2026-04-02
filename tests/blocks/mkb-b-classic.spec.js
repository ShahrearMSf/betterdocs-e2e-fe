// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb B Classic - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-b-classic/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB B Classic" [level=1]
      - heading "Name Ascending" [level=2]
      - link "betterdocs-category-icon Company 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: 2 Docs
      - link "betterdocs-category-icon Fruits 7 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: 7 Docs
      - link "betterdocs-category-icon Sports 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: 5 Docs
      - heading "Include Sports Fruits Descending Slug" [level=2]
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
      - heading "Exclude Sports Fruits Knowledge Base Ascending" [level=2]
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
      - link "betterdocs-category-icon Company 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: 2 Docs
      - heading "Custom Suffix Prefix" [level=2]
      - link "betterdocs-category-icon Company Shahrear 2 Blogs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: Shahrear 2 Blogs
      - link "betterdocs-category-icon Sports Shahrear 5 Blogs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: Shahrear 5 Blogs
      - link "betterdocs-category-icon Fruits Shahrear 7 Blogs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: Shahrear 7 Blogs
  `);
});
