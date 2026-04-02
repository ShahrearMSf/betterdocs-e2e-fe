// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Related Categories B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/related-categories-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Related Categories B" [level=1]
      - heading "Related Categories" [level=2]
      - img "betterdocs-category-image"
      - heading "Apple" [level=2]:
        - link "Apple":
          - /url: https://betteromation.shahrear.site/docs/fruits/apple/
      - text: "1"
      - img "betterdocs-category-image"
      - heading "Basketball" [level=2]:
        - link "Basketball":
          - /url: https://betteromation.shahrear.site/docs/sports/basketball/
      - text: "1"
      - img "betterdocs-category-image"
      - heading "Cricket" [level=2]:
        - link "Cricket":
          - /url: https://betteromation.shahrear.site/docs/sports/cricket/
      - text: "1"
      - img "betterdocs-category-image"
      - heading "Developer" [level=2]:
        - link "Developer":
          - /url: https://betteromation.shahrear.site/docs/team/developer/
      - text: "1"
      - button "Load More":
        - paragraph: Load More
      - list:
        - listitem:
          - link "All":
            - /url: https://betteromation.shahrear.site/related-categories-b/
        - listitem:
          - link "A":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=A
        - listitem:
          - link "B":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=B
        - listitem:
          - link "C":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=C
        - listitem:
          - link "D":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=D
        - listitem:
          - link "E":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=E
        - listitem:
          - link "F":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=F
        - listitem:
          - link "G":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=G
        - listitem:
          - link "H":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=H
        - listitem:
          - link "I":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=I
        - listitem:
          - link "J":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=J
        - listitem:
          - link "K":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=K
        - listitem:
          - link "L":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=L
        - listitem:
          - link "M":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=M
        - listitem:
          - link "N":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=N
        - listitem:
          - link "O":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=O
        - listitem:
          - link "P":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=P
        - listitem:
          - link "Q":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=Q
        - listitem:
          - link "R":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=R
        - listitem:
          - link "S":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=S
        - listitem:
          - link "T":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=T
        - listitem:
          - link "U":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=U
        - listitem:
          - link "V":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=V
        - listitem:
          - link "W":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=W
        - listitem:
          - link "X":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=X
        - listitem:
          - link "Y":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=Y
        - listitem:
          - link "Z":
            - /url: https://betteromation.shahrear.site/related-categories-b/?encyclopedia_prefix=Z
  `);
});
