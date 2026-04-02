// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Archive Doc List W L2 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/archive-doc-list-w-l2/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Archive Doc List W L2" [level=1]
      - heading "Apple – A Daily Fruit" [level=3]:
        - img
        - link "Apple – A Daily Fruit":
          - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
      - text: "Last Updated: October 12, 2025"
      - paragraph: Introduction Apples are one of the most popular fruits consumed worldwide. Known for their crisp texture and sweet, tart flavor, apples are not only delicious but also highly nutritious. Rich in essential vitamins, minerals, and antioxidants, they are often touted for their health benefits. This documentation provides insights into the benefits of including apples in...
      - heading "Basketball – The Game of Sprit" [level=3]:
        - img
        - link "Basketball – The Game of Sprit":
          - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - text: "Last Updated: December 15, 2025"
      - paragraph: Introduction Basketball is not just a game; it’s a spirit that unites players through teamwork and dedication. It emphasizes the importance of collaboration and practice to refine one’s skills. Teamwork Teamwork is the cornerstone of basketball. The game requires players to communicate effectively, share the ball, and support one another on and off the court....
      - heading "Cricket – The Gentlemen’s Game" [level=3]:
        - img
        - link "Cricket – The Gentlemen’s Game":
          - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - text: "Last Updated: December 15, 2025"
      - paragraph: Squad The squad refers to the group of players selected to represent a team in a cricket competition. A typical cricket squad consists of 15 to 20 players, from which the playing XI is chosen. Teams often include a mix of specialist batsmen, bowlers, all-rounders, and wicketkeepers. Playing XI The playing XI is the final...
      - heading "Developers, QA, Support – the Engines of A Software Team" [level=3]:
        - img
        - link "Developers, QA, Support – the Engines of A Software Team":
          - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
      - text: "Last Updated: October 12, 2025"
      - paragraph: "Introduction In the world of software development, three critical roles drive the success and efficiency of a project: developers, quality assurance (QA) professionals, and support teams. Each role is essential, and together they create a robust framework that not only delivers quality software but also ensures that the software meets user needs and provides a..."
      - heading "Fencing – The Beautiful Sport" [level=3]:
        - img
        - link "Fencing – The Beautiful Sport":
          - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - text: "Last Updated: December 15, 2025"
      - paragraph: Passion Fencing is more than just a sport; it’s a way of life for many. The passion that drives fencers to the next level is evident in their dedication to practice and competition. This sport, derived from centuries of tradition, inspires a love for physical fitness, strategy, and elegance. Each bout showcases an artist’s flair...
      - paragraph:
        - strong: Without Nested
      - heading "Apple – A Daily Fruit" [level=3]:
        - img
        - link "Apple – A Daily Fruit":
          - /url: https://betteromation.shahrear.site/docs/apple-a-daily-fruit/
      - text: "Last Updated: October 12, 2025"
      - paragraph: Introduction Apples are one of the most popular fruits consumed worldwide. Known for their crisp texture and sweet, tart flavor, apples are not only delicious but also highly nutritious. Rich in essential vitamins, minerals, and antioxidants, they are often touted for their health benefits. This documentation provides insights into the benefits of including apples in...
      - heading "Basketball – The Game of Sprit" [level=3]:
        - img
        - link "Basketball – The Game of Sprit":
          - /url: https://betteromation.shahrear.site/docs/basketball-the-game-of-sprit/
      - text: "Last Updated: December 15, 2025"
      - paragraph: Introduction Basketball is not just a game; it’s a spirit that unites players through teamwork and dedication. It emphasizes the importance of collaboration and practice to refine one’s skills. Teamwork Teamwork is the cornerstone of basketball. The game requires players to communicate effectively, share the ball, and support one another on and off the court....
      - heading "Cricket – The Gentlemen’s Game" [level=3]:
        - img
        - link "Cricket – The Gentlemen’s Game":
          - /url: https://betteromation.shahrear.site/docs/cricket-the-gentlemens-game/
      - text: "Last Updated: December 15, 2025"
      - paragraph: Squad The squad refers to the group of players selected to represent a team in a cricket competition. A typical cricket squad consists of 15 to 20 players, from which the playing XI is chosen. Teams often include a mix of specialist batsmen, bowlers, all-rounders, and wicketkeepers. Playing XI The playing XI is the final...
      - heading "Developers, QA, Support – the Engines of A Software Team" [level=3]:
        - img
        - link "Developers, QA, Support – the Engines of A Software Team":
          - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
      - text: "Last Updated: October 12, 2025"
      - paragraph: "Introduction In the world of software development, three critical roles drive the success and efficiency of a project: developers, quality assurance (QA) professionals, and support teams. Each role is essential, and together they create a robust framework that not only delivers quality software but also ensures that the software meets user needs and provides a..."
      - heading "Fencing – The Beautiful Sport" [level=3]:
        - img
        - link "Fencing – The Beautiful Sport":
          - /url: https://betteromation.shahrear.site/docs/fencing-the-beautiful-sport/
      - text: "Last Updated: December 15, 2025"
      - paragraph: Passion Fencing is more than just a sport; it’s a way of life for many. The passion that drives fencers to the next level is evident in their dedication to practice and competition. This sport, derived from centuries of tradition, inspires a love for physical fitness, strategy, and elegance. Each bout showcases an artist’s flair...
  `);
});
