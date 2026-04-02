// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Sidebar B L4 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/sidebar-b-l4/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Sidebar B L4" [level=1]
      - complementary:
        - article:
          - heading "Star" [level=1]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
            - listitem:
              - link "WPD":
                - /url: "#"
      - paragraph: Without Nested
      - complementary:
        - article:
          - heading "Star" [level=1]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
        - article:
          - heading "MSF" [level=1]
          - list:
            - listitem:
              - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
                - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - heading "MKB Inclusion Sports" [level=2]
      - complementary:
        - article:
          - heading "Cricket" [level=1]
          - list:
            - listitem:
              - link "Cricket – The Gentlemen’s Game":
                - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
        - article:
          - heading "Football" [level=1]
          - list:
            - listitem:
              - link "Football World Cup 2014":
                - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
        - article:
          - heading "Basketball" [level=1]
          - list:
            - listitem:
              - link "Basketball – The Game of Sprit":
                - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
        - article:
          - heading "Golf" [level=1]
          - list:
            - listitem:
              - link "Golf – The Game of Patience and Dedication":
                - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
        - article:
          - heading "Fencing" [level=1]
          - list:
            - listitem:
              - link "Fencing – The Beautiful Sport":
                - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - heading "Include" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
        - article:
          - heading "MSF" [level=1]
          - list:
            - listitem:
              - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
                - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - heading "Exclude" [level=2]
      - complementary:
        - article:
          - heading "Star" [level=1]
          - list:
            - listitem:
              - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
                - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
            - listitem:
              - link "WPD":
                - /url: "#"
  `);
});
