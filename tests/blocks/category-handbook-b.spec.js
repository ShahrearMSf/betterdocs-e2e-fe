// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Handbook B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-handbook-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Handbook B" [level=1]
      - paragraph:
        - strong: Order by Name
        - text: (Doc Order Date)
      - article:
        - img "betterdocs-category-image"
        - heading "MSF" [level=2]
        - text: "1"
        - list:
          - listitem:
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
              - text: NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses
              - img
      - article:
        - img "betterdocs-category-image"
        - heading "Star" [level=2]
        - text: "2"
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
              - text: NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders
              - img
          - listitem:
            - link "WPD":
              - /url: "#"
      - article:
        - img "betterdocs-category-image"
        - heading "WPD" [level=2]
        - text: "1"
        - list:
          - listitem:
            - link "MSF":
              - /url: "#"
      - paragraph:
        - strong: Without Nested
      - paragraph: Betterdocs order
      - article:
        - img "betterdocs-category-image"
        - heading "Star" [level=2]
        - text: "1"
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
              - text: NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders
              - img
      - article:
        - img "betterdocs-category-image"
        - heading "MSF" [level=2]
        - text: "1"
        - list:
          - listitem:
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
              - text: NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses
              - img
      - paragraph:
        - strong: Include
        - text: – KB
      - article:
        - img "betterdocs-category-image"
        - heading "MSF" [level=2]
        - text: "1"
        - list:
          - listitem:
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
              - text: NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses
              - img
      - article:
        - img "betterdocs-category-image"
        - heading "Star" [level=2]
        - text: "1"
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
              - text: NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders
              - img
      - paragraph:
        - strong: Exclude
        - text: – KB
  `);
});
