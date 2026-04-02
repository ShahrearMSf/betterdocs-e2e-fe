// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb W Classic - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-w-classic/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB W Classic" [level=1]
      - link "betterdocs-category-icon Sports MSF 5 Articles":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: MSF 5 Articles
      - link "betterdocs-category-icon Fruits MSF 7 Articles":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: MSF 7 Articles
      - link "betterdocs-category-icon Company MSF 2 Articles":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: MSF 2 Articles
      - heading "Include" [level=2]
      - link "Sports MSF 5 Articles":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - heading "Sports" [level=2]
        - text: MSF 5 Articles
      - link "Fruits MSF 7 Articles":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - heading "Fruits" [level=2]
        - text: MSF 7 Articles
      - link "Team MSF 6 Articles":
        - /url: https://betteromation.shahrear.site/docs/team/
        - heading "Team" [level=2]
        - text: MSF 6 Articles
      - heading "Exclude" [level=2]
      - link "betterdocs-category-icon MSF 5 Blogs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - text: MSF 5 Blogs
      - link "betterdocs-category-icon MSF 2 Blogs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - text: MSF 2 Blogs
      - link "betterdocs-category-icon MSF 7 Blogs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - text: MSF 7 Blogs
      - heading "Custom" [level=2]
      - link "betterdocs-category-icon Sports MSF 5 Articles":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=3]
        - text: MSF 5 Articles
      - link "betterdocs-category-icon Company MSF 2 Articles":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=3]
        - text: MSF 2 Articles
  `);
});
