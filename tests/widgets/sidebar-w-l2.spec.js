// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar W L2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-w-l2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar W L2" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=2]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
            - listitem:
              - link "WPD":
                - /url: "#"
      - paragraph:
        - strong: Without Nested
      - complementary:
        - article:
          - heading "Star" [level=2]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
        - article:
          - heading "MSF" [level=2]
          - list:
            - listitem:
              - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
                - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - heading "include mkb" [level=2]
      - complementary:
        - article:
          - heading "Watermelon" [level=2]
          - list:
            - listitem:
              - link "Watermelon – A Juicy Fruit":
                - /url: https://betteromation.shahrear.site/docs/watermelon-a-juicy-fruit/
            - listitem:
              - link "Juice vs Direct Fruit":
                - /url: https://betteromation.shahrear.site/docs/juice-vs-direct-fruit/
            - listitem:
              - link "Importance of Multi Vitamin in Life":
                - /url: https://betteromation.shahrear.site/docs/importance-of-multi-vitamin-in-life/
        - article:
          - heading "Orange" [level=2]
          - list:
            - listitem:
              - link "Orange – The Source of Vitamin C":
                - /url: https://betteromation.shahrear.site/docs/orange-the-source-of-vitamin-c/
            - listitem:
              - link "Orange – A Favorite Fruit of Children":
                - /url: https://betteromation.shahrear.site/docs/orange-a-favorite-fruit-of-children/
            - listitem:
              - link "The Fruit that Named after Color":
                - /url: https://betteromation.shahrear.site/docs/the-fruit-that-named-after-color/
        - article:
          - heading "Apple" [level=2]
          - list:
            - listitem:
              - link "Apple – A Daily Fruit":
                - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
      - heading "Include - category" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
        - article:
          - heading "MSF" [level=2]
          - list:
            - listitem:
              - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
                - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - heading "exclude" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
            - listitem:
              - link "WPD":
                - /url: "#"
      - heading "Custom" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=2]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
            - listitem:
              - link "WPD":
                - /url: "#"
  `);
});
