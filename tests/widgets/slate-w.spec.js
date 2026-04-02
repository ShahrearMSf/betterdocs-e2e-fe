// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Slate W - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/slate-w/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Slate W" [level=1]
      - heading "MKB Name Descending - Docs ID Ascending" [level=2]
      - article:
        - img
        - heading "Leads" [level=2]
        - list:
          - listitem:
            - link "Sejuti – The Leader of QA Team":
              - /url: https://betteromation.shahrear.site/docs/sejuti-the-leader-of-qa-team/
      - article:
        - img
        - heading "JuniorQA" [level=2]
        - list:
          - listitem:
            - link "Junior QA – The Sprit House":
              - /url: https://betteromation.shahrear.site/docs/junior-qa-the-sprit-house/
          - listitem:
            - link "QA Glossary Test for BetterDocs":
              - /url: https://betteromation.shahrear.site/docs/qa-glossary-test-for-betterdocs/
      - article:
        - img
        - heading "Developer" [level=2]
        - list:
          - listitem:
            - link "Developers, QA, Support – the Engines of A Software Team":
              - /url: https://betteromation.shahrear.site/docs/developers-qa-support-the-engines-of-a-software-team/
      - article:
        - heading "Coleads" [level=2]
        - list:
          - listitem:
            - link "Hurram – The Co Lead of Security Team":
              - /url: https://betteromation.shahrear.site/docs/hurram-the-co-lead-of-security-team/
          - listitem:
            - link "Ovi – The Co Lead of QA Team":
              - /url: https://betteromation.shahrear.site/docs/ovi-the-co-lead-of-qa-team/
      - heading "Include - ID Ascending" [level=2]
      - heading "Exclude - Parent Ascending - Menu Order Descending" [level=2]
      - heading "Custom" [level=2]
  `);
});
