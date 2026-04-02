// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Popular Docs B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/popular-docs-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Popular Docs B" [level=1]
      - paragraph:
        - strong: Most Popular
      - complementary:
        - heading "Popular Docs" [level=2]
        - list:
          - listitem:
            - img
            - link "Cricket – The Gentlemen’s Game":
              - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
          - listitem:
            - img
            - link "Juice vs Direct Fruit":
              - /url: https://betteromation.shahrear.site/docs/juice-vs-direct-fruit/
          - listitem:
            - img
            - link "Orange – A Favorite Fruit of Children":
              - /url: https://betteromation.shahrear.site/docs/orange-a-favorite-fruit-of-children/
      - paragraph:
        - strong: Least Popular
      - complementary:
        - heading "Popular Docs" [level=2]
        - list:
          - listitem:
            - img
            - link "QA Glossary Test for BetterDocs":
              - /url: https://betteromation.shahrear.site/docs/qa-glossary-test-for-betterdocs/
          - listitem:
            - img
            - link "Ovi – The Co Lead of QA Team":
              - /url: https://betteromation.shahrear.site/docs/ovi-the-co-lead-of-qa-team/
          - listitem:
            - img
            - link "Sejuti – The Leader of QA Team":
              - /url: https://betteromation.shahrear.site/docs/sejuti-the-leader-of-qa-team/
          - listitem:
            - img
            - link "Importance of Multi Vitamin in Life":
              - /url: https://betteromation.shahrear.site/docs/importance-of-multi-vitamin-in-life/
          - listitem:
            - img
            - link "The Fruit that Named after Color":
              - /url: https://betteromation.shahrear.site/docs/the-fruit-that-named-after-color/
          - listitem:
            - img
            - link "Orange – The Source of Vitamin C":
              - /url: https://betteromation.shahrear.site/docs/orange-the-source-of-vitamin-c/
      - paragraph:
        - strong: Last Updated
      - complementary:
        - heading "Popular Docs" [level=2]
        - list:
          - listitem:
            - img
            - link "QA Glossary Test for BetterDocs":
              - /url: https://betteromation.shahrear.site/docs/qa-glossary-test-for-betterdocs/
          - listitem:
            - img
            - link "Football World Cup 2014":
              - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
          - listitem:
            - img
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - paragraph:
        - strong: Last Created
      - complementary:
        - heading "Popular Docs" [level=2]
        - list:
          - listitem:
            - img
            - link "QA Glossary Test for BetterDocs":
              - /url: https://betteromation.shahrear.site/docs/qa-glossary-test-for-betterdocs/
          - listitem:
            - img
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
          - listitem:
            - img
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - img
            - link "Junior QA – The Sprit House":
              - /url: https://betteromation.shahrear.site/docs/junior-qa-the-sprit-house/
          - listitem:
            - img
            - link "Developers, QA, Support – the Engines of A Software Team":
              - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
  `);
});
