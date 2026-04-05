// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Grid W Default - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-grid-w-default/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Grid W Default" [level=1]
      - paragraph:
        - strong: Default – betterdocs order
      - paragraph:
        - strong: Without Nested – Name Descending – exclude
      - article:
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - paragraph:
        - strong: Fit to Screen – Include MKB Sports
      - article:
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - article:
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "Cricket – The Gentlemen’s Game":
              - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - article:
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "Fencing – The Beautiful Sport":
              - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - paragraph:
        - strong: Masonry – ID – Descending – including
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "2"
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - link "WPD":
              - /url: "#"
      - heading "Custom - slug descending" [level=2]
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]:
          - link "Star":
            - /url: https://betteromation.shahrear.site/docs/qa/star/
        - text: "2"
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - link "WPD":
              - /url: "#"
        - link "Find More ":
          - /url: https://betteromation.shahrear.site/docs/qa/star/
  `);
});
