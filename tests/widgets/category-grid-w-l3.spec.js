// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Grid W L3 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-grid-w-l3/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Grid W L3" [level=1]
      - paragraph:
        - strong: Without Nested – Include MKB – ID – Descending
      - article:
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - list:
          - listitem:
            - link "Fencing – The Beautiful Sport":
              - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - article:
        - img "betterdocs-category-icon"
        - heading "Golf" [level=2]
        - list:
          - listitem:
            - link "Golf – The Game of Patience and Dedication":
              - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
      - article:
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - list:
          - listitem:
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - article:
        - img "betterdocs-category-icon"
        - heading "Football" [level=2]
        - list:
          - listitem:
            - link "Football World Cup 2014":
              - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
      - article:
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - list:
          - listitem:
            - link "Cricket – The Gentlemen’s Game":
              - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - paragraph:
        - strong: Fit to Screen – Include – Name – Ascending
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - paragraph:
        - strong: Masonry
      - heading "Custom" [level=2]
      - article:
        - img "betterdocs-category-icon"
        - heading "Star" [level=2]:
          - link "Star":
            - /url: https://betteromation.shahrear.site/docs/qa/star/
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
  `);
});
