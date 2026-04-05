// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb Sc 4 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-sc-4/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB SC 4" [level=1]
      - link "Sports":
        - /url: "#"
      - link "Fruits":
        - /url: "#"
      - link "Team":
        - /url: "#"
      - link "Company":
        - /url: "#"
      - article:
        - img "betterdocs-category-icon"
        - heading "Cricket" [level=2]
        - list:
          - listitem:
            - img
            - link "Cricket – The Gentlemen’s Game":
              - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
        - link "Explore More":
          - /url: https://betteromation.shahrear.site/docs/sports/cricket/
      - article:
        - img "betterdocs-category-icon"
        - heading "Football" [level=2]
        - list:
          - listitem:
            - img
            - link "Football World Cup 2014":
              - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
        - link "Explore More":
          - /url: https://betteromation.shahrear.site/docs/sports/football/
      - article:
        - img "betterdocs-category-icon"
        - heading "Basketball" [level=2]
        - list:
          - listitem:
            - img
            - link "Basketball – The Game of Sprit":
              - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
        - link "Explore More":
          - /url: https://betteromation.shahrear.site/docs/sports/basketball/
      - article:
        - img "betterdocs-category-icon"
        - heading "Golf" [level=2]
        - list:
          - listitem:
            - img
            - link "Golf – The Game of Patience and Dedication":
              - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
        - link "Explore More":
          - /url: https://betteromation.shahrear.site/docs/sports/golf/
      - article:
        - img "betterdocs-category-icon"
        - heading "Fencing" [level=2]
        - list:
          - listitem:
            - img
            - link "Fencing – The Beautiful Sport":
              - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
        - link "Explore More":
          - /url: https://betteromation.shahrear.site/docs/sports/fencing/
      - paragraph:
        - strong: Customized
      - link "Team":
        - /url: "#"
      - link "Sports":
        - /url: "#"
      - link "Fruits":
        - /url: "#"
      - link "Company":
        - /url: "#"
      - article:
        - heading "QA" [level=6]
        - list:
          - listitem:
            - link "Leads":
              - /url: "#"
        - link "Explore More":
          - /url: https://betteromation.shahrear.site/docs/team/qa/
      - article:
        - img "betterdocs-category-icon"
        - heading "Developer" [level=6]
        - list:
          - listitem:
            - img
            - link "Developers, QA, Support – the Engines of A Software Team":
              - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
        - link "Explore More":
          - /url: https://betteromation.shahrear.site/docs/team/developer/
  `);
});
