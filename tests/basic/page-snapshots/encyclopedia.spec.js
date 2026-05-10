// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Encyclopedia - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/encyclopedia/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Encyclopedia" [level=1]
      - list:
        - listitem:
          - link "All"
        - listitem:
          - link "A"
        - listitem:
          - link "B"
        - listitem:
          - link "C"
        - listitem:
          - link "D"
        - listitem:
          - link "E"
        - listitem:
          - link "F"
        - listitem:
          - link "G"
        - listitem:
          - link "H"
        - listitem:
          - link "I"
        - listitem:
          - link "J"
        - listitem:
          - link "K"
        - listitem:
          - link "L"
        - listitem:
          - link "M"
        - listitem:
          - link "N"
        - listitem:
          - link "O"
        - listitem:
          - link "P"
        - listitem:
          - link "Q"
        - listitem:
          - link "R"
        - listitem:
          - link "S"
        - listitem:
          - link "T"
        - listitem:
          - link "U"
        - listitem:
          - link "V"
        - listitem:
          - link "W"
        - listitem:
          - link "X"
        - listitem:
          - link "Y"
        - listitem:
          - link "Z"
      - text: A
      - heading "Aesthetic" [level=2]
      - heading "Altruism" [level=2]
      - heading "Ambition" [level=2]
      - heading "Ample" [level=2]
      - heading "Analogy" [level=2]
      - heading "Anomaly" [level=2]
      - heading "Anticipate" [level=2]
      - heading "Apple" [level=2]
      - heading "Arbitrary" [level=2]
      - heading "Ascend" [level=2]
      - heading "Authentic" [level=2]
      - text: B
      - heading "Ball" [level=2]
      - text: C
      - heading "Cat" [level=2]
      - text: D
      - heading "Dog" [level=2]
      - text: E
      - heading "Egg" [level=2]
      - text: Load More
  `);
});
