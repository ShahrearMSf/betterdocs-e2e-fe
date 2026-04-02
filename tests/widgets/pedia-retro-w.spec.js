// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Pedia Retro W - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/pedia-retro-w/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Pedia Retro W" [level=1]
      - list:
        - listitem:
          - link "All":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/
        - listitem:
          - link "A":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=A
        - listitem:
          - link "B":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=B
        - listitem:
          - link "C":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=C
        - listitem:
          - link "D":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=D
        - listitem:
          - link "E":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=E
        - listitem:
          - link "F":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=F
        - listitem:
          - link "G":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=G
        - listitem:
          - link "H":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=H
        - listitem:
          - link "I":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=I
        - listitem:
          - link "J":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=J
        - listitem:
          - link "K":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=K
        - listitem:
          - link "L":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=L
        - listitem:
          - link "M":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=M
        - listitem:
          - link "N":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=N
        - listitem:
          - link "O":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=O
        - listitem:
          - link "P":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=P
        - listitem:
          - link "Q":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=Q
        - listitem:
          - link "R":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=R
        - listitem:
          - link "S":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=S
        - listitem:
          - link "T":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=T
        - listitem:
          - link "U":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=U
        - listitem:
          - link "V":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=V
        - listitem:
          - link "W":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=W
        - listitem:
          - link "X":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=X
        - listitem:
          - link "Y":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=Y
        - listitem:
          - link "Z":
            - /url: https://betteromation.shahrear.site/pedia-retro-w/?encyclopedia_prefix=Z
      - text: A
      - link "Aesthetic":
        - /url: https://betteromation.shahrear.site/encyclopedia/aesthetic/
      - link "Altruism":
        - /url: https://betteromation.shahrear.site/encyclopedia/altruism/
      - link "Ambition":
        - /url: https://betteromation.shahrear.site/encyclopedia/ambition/
      - link "Ample":
        - /url: https://betteromation.shahrear.site/encyclopedia/ample/
      - link "Analogy":
        - /url: https://betteromation.shahrear.site/encyclopedia/analogy/
      - link "Anomaly":
        - /url: https://betteromation.shahrear.site/encyclopedia/anomaly/
      - link "Anticipate":
        - /url: https://betteromation.shahrear.site/encyclopedia/anticipate/
      - link "Apple":
        - /url: https://betteromation.shahrear.site/encyclopedia/apple/
      - link "Arbitrary":
        - /url: https://betteromation.shahrear.site/encyclopedia/arbitrary/
      - link "Ascend":
        - /url: https://betteromation.shahrear.site/encyclopedia/ascend/
      - link "Authentic":
        - /url: https://betteromation.shahrear.site/encyclopedia/authentic/
      - text: B
      - link "Ball":
        - /url: https://betteromation.shahrear.site/encyclopedia/ball/
      - text: C
      - link "Cat":
        - /url: https://betteromation.shahrear.site/encyclopedia/cat/
      - text: D
      - link "Dog":
        - /url: https://betteromation.shahrear.site/encyclopedia/dog/
      - text: E
      - link "Egg":
        - /url: https://betteromation.shahrear.site/encyclopedia/egg/
      - text: Load More
  `);
});
