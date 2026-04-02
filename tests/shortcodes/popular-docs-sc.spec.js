// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Popular Docs Sc - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/popular-docs-sc/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Popular Docs SC" [level=1]
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
          - listitem:
            - img
            - link "Watermelon – A Juicy Fruit":
              - /url: https://betteromation.shahrear.site/docs/watermelon-a-juicy-fruit/
          - listitem:
            - img
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - img
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
          - listitem:
            - img
            - link "Golf – The Game of Patience and Dedication":
              - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
          - listitem:
            - img
            - link "Apple – A Daily Fruit":
              - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
          - listitem:
            - img
            - link "Developers, QA, Support – the Engines of A Software Team":
              - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
          - listitem:
            - img
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - paragraph:
        - strong: Customized
      - complementary:
        - heading "Popular Docs" [level=6]
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
          - listitem:
            - img
            - link "Watermelon – A Juicy Fruit":
              - /url: https://betteromation.shahrear.site/docs/watermelon-a-juicy-fruit/
          - listitem:
            - img
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - img
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
          - listitem:
            - img
            - link "Golf – The Game of Patience and Dedication":
              - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
          - listitem:
            - img
            - link "Apple – A Daily Fruit":
              - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
          - listitem:
            - img
            - link "Developers, QA, Support – the Engines of A Software Team":
              - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
          - listitem:
            - img
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - paragraph
  `);
});
