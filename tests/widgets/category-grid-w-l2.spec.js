// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Category Grid W L2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/category-grid-w-l2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Category Grid W L2" [level=1]
      - paragraph:
        - strong: Without Nested – slug descending
      - article:
        - text: "1"
        - heading "Star" [level=2]
        - list:
          - listitem:
            - text: 
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - paragraph:
        - strong: Fit to Screen – include mkb – term id
      - article:
        - text: "1"
        - heading "Fencing" [level=2]
        - list:
          - listitem:
            - text: 
            - link "Fencing – The Beautiful Sport":
              - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - article:
        - text: "1"
        - heading "Golf" [level=2]
        - list:
          - listitem:
            - text: 
            - link "Golf – The Game of Patience and Dedication":
              - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
      - article:
        - text: "1"
        - heading "Basketball" [level=2]
        - list:
          - listitem:
            - text: 
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - article:
        - text: "1"
        - heading "Football" [level=2]
        - list:
          - listitem:
            - text: 
            - link "Football World Cup 2014":
              - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
      - article:
        - text: "1"
        - heading "Cricket" [level=2]
        - list:
          - listitem:
            - text: 
            - link "Cricket – The Gentlemen’s Game":
              - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - paragraph:
        - strong: Masonry – include – name ascending
      - heading "Custom" [level=2]
  `);
});
