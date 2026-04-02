// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Archive Doc List W L3 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/archive-doc-list-w-l3/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Archive Doc List W L3" [level=1]
      - heading "BetterDocs Order" [level=2]
      - text: "Last Updated: December 15, 2025"
      - heading "Fencing – The Beautiful Sport" [level=3]:
        - link "Fencing – The Beautiful Sport":
          - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - paragraph: Passion Fencing is more than just a sport; it’s a way of life for...
      - text: "Last Updated: December 15, 2025"
      - heading "Basketball – The Game of Sprit" [level=3]:
        - link "Basketball – The Game of Sprit":
          - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - paragraph: Introduction Basketball is not just a game; it’s a spirit that unites players through...
      - text: "Last Updated: December 15, 2025"
      - heading "Cricket – The Gentlemen’s Game" [level=3]:
        - link "Cricket – The Gentlemen’s Game":
          - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - paragraph: Squad The squad refers to the group of players selected to represent a team...
      - text: "Last Updated: January 27, 2026"
      - heading "Football World Cup 2014" [level=3]:
        - link "Football World Cup 2014":
          - /url: https://betteromation.shahrear.site/docs/football-world-cup-2014/
      - paragraph: Final Match The final match of the 2014 FIFA World Cup took place on...
      - text: "Last Updated: December 15, 2025"
      - heading "Golf – The Game of Patience and Dedication" [level=3]:
        - link "Golf – The Game of Patience and Dedication":
          - /url: https://betteromation.shahrear.site/docs/golf-the-game-of-patience-and-dedication/
      - paragraph: Introduction Golf is a sport that emphasizes the importance of patience, focus, and dedication....
      - text: "Last Updated: October 12, 2025"
      - heading "Watermelon – A Juicy Fruit" [level=3]:
        - link "Watermelon – A Juicy Fruit":
          - /url: https://betteromation.shahrear.site/docs/watermelon-a-juicy-fruit/
      - paragraph: Introduction Watermelon is a refreshing and popular summer fruit known for its sweet flavor...
      - text: "Last Updated: October 12, 2025"
      - heading "Juice vs Direct Fruit" [level=3]:
        - link "Juice vs Direct Fruit":
          - /url: https://betteromation.shahrear.site/docs/juice-vs-direct-fruit/
      - paragraph: Introduction The debate between consuming juice and direct fruit often arises in discussions about...
      - text: "Last Updated: October 12, 2025"
      - heading "Apple – A Daily Fruit" [level=3]:
        - link "Apple – A Daily Fruit":
          - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
      - paragraph: Introduction Apples are one of the most popular fruits consumed worldwide. Known for their...
      - text: "Last Updated: October 12, 2025"
      - heading "Orange – The Source of Vitamin C" [level=3]:
        - link "Orange – The Source of Vitamin C":
          - /url: https://betteromation.shahrear.site/docs/orange-the-source-of-vitamin-c/
      - paragraph: Introduction Oranges are one of the most popular fruits in the world and are...
      - text: "Last Updated: October 12, 2025"
      - heading "Orange – A Favorite Fruit of Children" [level=3]:
        - link "Orange – A Favorite Fruit of Children":
          - /url: https://betteromation.shahrear.site/docs/orange-a-favorite-fruit-of-children/
      - paragraph: Introduction Oranges are one of the most popular fruits around the world, known for...
      - list:
        - listitem:
          - link "1":
            - /url: https://betteromation.shahrear.site/archive-doc-list-w-l3/page/1
        - listitem:
          - link "2":
            - /url: https://betteromation.shahrear.site/archive-doc-list-w-l3/page/2
        - listitem:
          - link "❯":
            - /url: https://betteromation.shahrear.site/archive-doc-list-w-l3/page/2
      - paragraph:
        - strong: Without Nested
      - text: "Last Updated: October 12, 2025"
      - heading "Apple – A Daily Fruit" [level=3]:
        - link "Apple – A Daily Fruit":
          - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
      - paragraph: Introduction Apples are one of the most popular fruits consumed worldwide. Known for their...
      - text: "Last Updated: December 15, 2025"
      - heading "Basketball – The Game of Sprit" [level=3]:
        - link "Basketball – The Game of Sprit":
          - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - paragraph: Introduction Basketball is not just a game; it’s a spirit that unites players through...
      - text: "Last Updated: December 15, 2025"
      - heading "Cricket – The Gentlemen’s Game" [level=3]:
        - link "Cricket – The Gentlemen’s Game":
          - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - paragraph: Squad The squad refers to the group of players selected to represent a team...
      - text: "Last Updated: October 12, 2025"
      - heading "Developers, QA, Support – the Engines of A Software Team" [level=3]:
        - link "Developers, QA, Support – the Engines of A Software Team":
          - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
      - paragraph: Introduction In the world of software development, three critical roles drive the success and...
      - text: "Last Updated: December 15, 2025"
      - heading "Fencing – The Beautiful Sport" [level=3]:
        - link "Fencing – The Beautiful Sport":
          - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - paragraph: Passion Fencing is more than just a sport; it’s a way of life for...
      - heading "Custom ID - Descending" [level=2]
      - text: "Last Updated: March 31, 2026"
      - heading "QA Glossary Test for BetterDocs" [level=3]:
        - link "QA Glossary Test for BetterDocs":
          - /url: https://betteromation.shahrear.site/docs/qa-glossary-test-for-betterdocs/
      - paragraph: Understanding key terms is essential in any learning or professional environment. Certain words starting...
      - text: "Last Updated: January 15, 2026"
      - heading "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses" [level=3]:
        - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
          - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - paragraph: If VAT is properly applied on value addition with full input tax credit, the...
      - text: "Last Updated: January 15, 2026"
      - heading "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders" [level=3]:
        - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
          - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - paragraph: "Representational image. Picture: Collected Most of the gold currently in the country, as well..."
      - text: "Last Updated: January 15, 2026"
      - heading "Junior QA – The Sprit House" [level=3]:
        - link "Junior QA – The Sprit House":
          - /url: https://betteromation.shahrear.site/docs/junior-qa-the-sprit-house/
      - paragraph: Overview This documentation provides an overview of the Junior QA position at The Sprit...
      - text: "Last Updated: October 12, 2025"
      - heading "Developers, QA, Support – the Engines of A Software Team" [level=3]:
        - link "Developers, QA, Support – the Engines of A Software Team":
          - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
      - paragraph: Introduction In the world of software development, three critical roles drive the success and...
  `);
});
