// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Grid B L2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-grid-b-l2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Grid B L2" [level=1]
      - paragraph:
        - strong: Grid
        - text: – BetterDocs
      - article:
        - text: "1"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - heading "Grid- Slug – Descending – MKB Company" [level=2]
      - article:
        - text: "1"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - article:
        - text: "1"
        - heading "MSF" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - heading "Grid – Include – Term – Descending" [level=2]
      - article:
        - text: "1"
        - heading "MSF" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - heading "Grid – Exclude – ID – Ascending – Nested" [level=2]
      - article:
        - text: "2"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - link "WPD":
              - /url: "#"
      - heading "Masonry" [level=2]:
        - strong: Masonry
      - paragraph: BetterDocs Order
      - heading "Masonry – Slug – Descending – Nested" [level=2]
      - article:
        - text: "2"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - link "WPD":
              - /url: "#"
      - heading "Masonry – MKB – Name – Ascending" [level=2]
      - article:
        - text: "1"
        - heading "MSF" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - article:
        - text: "1"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - heading "Masonry – Include – BetterDocs – Nested" [level=2]
      - heading "Masonry – Exclude – Term – Ascending" [level=2]
  `);
});
