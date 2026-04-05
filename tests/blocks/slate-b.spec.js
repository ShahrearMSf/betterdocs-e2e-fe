// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Slate B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/slate-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Slate B" [level=1]
      - paragraph:
        - strong: BetterDocs Order
      - article:
        - img
        - heading "Star" [level=2]:
          - link "Star":
            - /url: https://betteromation.shahrear.site/docs/qa/star/
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - article:
        - img
        - heading "MSF" [level=2]:
          - link "MSF":
            - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - list:
          - listitem:
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - paragraph:
        - strong: Exclude
      - article:
        - img
        - heading "MSF" [level=2]:
          - link "MSF":
            - /url: https://betteromation.shahrear.site/docs/qa/msf/
        - list:
          - listitem:
            - link "NBR Chairman signals possible VAT, turnover tax reforms for jewellery businesses":
              - /url: https://betteromation.shahrear.site/docs/nbr-chairman-signals-possible-vat-turnover-tax-reforms-for-jewellery-businesses/
      - paragraph:
        - strong: Name based Order – Include
        - text: –
        - strong: Inner order Name Based
      - article:
        - img
        - heading "Star" [level=2]:
          - link "Star":
            - /url: https://betteromation.shahrear.site/docs/qa/star/
        - list:
          - listitem:
            - link "NBR says most gold entering country is illegal; Bajus urges licenses for genuine traders":
              - /url: https://betteromation.shahrear.site/docs/nbr-says-most-gold-entering-country-is-illegal-bajus-urges-licenses-for-genuine-traders/
      - list:
        - listitem: Inner order name based means, docs under categories are ordered based on name.
  `);
});
