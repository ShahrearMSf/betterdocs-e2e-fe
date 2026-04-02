// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Grid Sc 1 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-grid-sc-1/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Grid SC 1" [level=1]
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - text: "2"
        - list:
          - listitem:
            - img
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
          - listitem:
            - link "WPD":
              - /url: "#"
      - article:
        - heading "QA" [level=2]
        - text: "5"
        - list:
          - listitem:
            - link "Leads":
              - /url: "#"
      - article:
        - img "betterdocs-category-icon"
        - heading "Developer" [level=2]
        - text: "1"
        - list:
          - listitem:
            - img
            - link "Developers, QA, Support – the Engines of A Software Team":
              - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
      - article:
        - img "betterdocs-category-icon"
        - heading "Watermelon" [level=2]
        - text: "3"
        - list:
          - listitem:
            - img
            - link "Importance of Multi Vitamin in Life":
              - /url: https://betteromation.shahrear.site/docs/importance-of-multi-vitamin-in-life/
          - listitem:
            - img
            - link "Juice vs Direct Fruit":
              - /url: https://betteromation.shahrear.site/docs/juice-vs-direct-fruit/
          - listitem:
            - img
            - link "Watermelon – A Juicy Fruit":
              - /url: https://betteromation.shahrear.site/docs/watermelon-a-juicy-fruit/
      - article:
        - img "betterdocs-category-icon"
        - heading "Orange" [level=2]
        - text: "3"
        - list:
          - listitem:
            - img
            - link "Orange – A Favorite Fruit of Children":
              - /url: https://betteromation.shahrear.site/docs/orange-a-favorite-fruit-of-children/
          - listitem:
            - img
            - link "The Fruit that Named after Color":
              - /url: https://betteromation.shahrear.site/docs/the-fruit-that-named-after-color/
          - listitem:
            - img
            - link "Orange – The Source of Vitamin C":
              - /url: https://betteromation.shahrear.site/docs/orange-the-source-of-vitamin-c/
      - article:
        - img "betterdocs-category-icon"
        - heading "Apple" [level=2]
        - text: "1"
        - list:
          - listitem:
            - img
            - link "Apple – A Daily Fruit":
              - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
      - article:
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - text: "1"
        - list:
          - listitem:
            - img
            - link "Fencing – The Beautiful Sport":
              - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - article:
        - img "betterdocs-category-icon"
        - heading "Golf" [level=2]
        - text: "1"
        - list:
          - listitem:
            - img
            - link "Golf – The Game of Patience and Dedication":
              - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
      - article:
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - text: "1"
        - list:
          - listitem:
            - img
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - article:
        - img "betterdocs-category-icon"
        - heading "Football" [level=2]
        - text: "1"
        - list:
          - listitem:
            - img
            - link "Football World Cup 2014":
              - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
      - article:
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - text: "1"
        - list:
          - listitem:
            - img
            - link "Cricket – The Gentlemen’s Game":
              - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - paragraph: Customized
  `);
});
