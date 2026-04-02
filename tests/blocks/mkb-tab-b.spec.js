// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb Tab B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-tab-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB Tab B" [level=1]
      - heading "Knowledge Based Order" [level=2]
      - link "Sports":
        - /url: "#"
      - link "Fruits":
        - /url: "#"
      - link "Company":
        - /url: "#"
      - article:
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - list:
          - listitem:
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - article:
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - list:
          - listitem:
            - link "Cricket – The Gentlemen’s Game":
              - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - article:
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - list:
          - listitem:
            - link "Fencing – The Beautiful Sport":
              - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - article:
        - img "betterdocs-category-icon"
        - heading "Football" [level=2]
        - list:
          - listitem:
            - link "Football World Cup 2014":
              - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
      - article:
        - img "betterdocs-category-icon"
        - heading "Golf" [level=2]
        - list:
          - listitem:
            - link "Golf – The Game of Patience and Dedication":
              - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
      - heading "Without Nested Name Based Order" [level=2]:
        - strong: Without Nested
        - text: Name Based Order
      - link "Company":
        - /url: "#"
      - link "Fruits":
        - /url: "#"
      - link "Sports":
        - /url: "#"
      - article:
        - img "betterdocs-category-icon"
        - heading "MSF" [level=2]
        - list:
          - listitem:
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - heading "Custom" [level=2]
      - link "Fruits":
        - /url: "#"
      - link "Company":
        - /url: "#"
      - link "Sports":
        - /url: "#"
      - article:
        - img "betterdocs-category-icon"
        - heading "Apple" [level=2]
        - list:
          - listitem:
            - link "Apple – A Daily Fruit":
              - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
      - article:
        - img "betterdocs-category-icon"
        - heading "Orange" [level=2]
        - list:
          - listitem:
            - link "Orange – A Favorite Fruit of Children":
              - /url: https://betteromation.shahrear.site/docs/orange-a-favorite-fruit-of-children/
          - listitem:
            - link "Orange – The Source of Vitamin C":
              - /url: https://betteromation.shahrear.site/docs/orange-the-source-of-vitamin-c/
        - link "Explore MSF":
          - /url: https://betteromation.shahrear.site/docs/fruits/orange/
      - article:
        - img "betterdocs-category-icon"
        - heading "Watermelon" [level=2]
        - list:
          - listitem:
            - link "Importance of Multi Vitamin in Life":
              - /url: https://betteromation.shahrear.site/docs/importance-of-multi-vitamin-in-life/
          - listitem:
            - link "Juice vs Direct Fruit":
              - /url: https://betteromation.shahrear.site/docs/juice-vs-direct-fruit/
        - link "Explore MSF":
          - /url: https://betteromation.shahrear.site/docs/fruits/watermelon/
  `);
});
