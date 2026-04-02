// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb W Box - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-w-box/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB W Box" [level=1]
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
      - heading "Include" [level=2]
      - link "betterdocs-category-icon Fruits MSF 7 Articles":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: MSF 7 Articles
      - link "betterdocs-category-icon Sports MSF 5 Articles":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: MSF 5 Articles
      - heading "Exclude" [level=2]
      - link "betterdocs-category-icon Company 2026 December 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: 2026 December 2 Docs
      - link "betterdocs-category-icon Fruits 2026 December 7 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: 2026 December 7 Docs
      - link "betterdocs-category-icon Sports 2026 December 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: 2026 December 5 Docs
      - heading "Custom" [level=2]
      - link "betterdocs-category-icon Company 2026 December 2 Docs":
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img "betterdocs-category-icon"
        - heading "Company" [level=2]
        - text: 2026 December 2 Docs
      - link "betterdocs-category-icon Fruits 2026 December 7 Docs":
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img "betterdocs-category-icon"
        - heading "Fruits" [level=2]
        - text: 2026 December 7 Docs
      - link "betterdocs-category-icon Sports 2026 December 5 Docs":
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img "betterdocs-category-icon"
        - heading "Sports" [level=2]
        - text: 2026 December 5 Docs
  `);
});
