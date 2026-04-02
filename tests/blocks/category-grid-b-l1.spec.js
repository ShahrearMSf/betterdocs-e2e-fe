// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Grid B L1 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-grid-b-l1/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Grid B L1" [level=1]
      - paragraph:
        - strong: Grid
        - text: –
        - strong: BetterDocs Order
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
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
        - strong: Masonry
        - text: –
        - strong: Name
      - article:
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - paragraph:
        - strong: Grid – Nested – Include
        - text: –
        - strong: Descending
      - paragraph:
        - strong: Masonry – Nested – Include
        - text: –
        - strong: Ascending
      - article:
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "1"
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
  `);
});
