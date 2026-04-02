// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Mkb W Sleek - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/mkb-w-sleek/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "MKB W Sleek" [level=1]
      - 'link "Sports 5 Categories | 5 Articles Last Modified: January 27, 2026"':
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img
        - heading "Sports" [level=2]
        - text: 5 Categories | 5 Articles
        - paragraph: "Last Modified: January 27, 2026"
      - 'link "Fruits 3 Categories | 7 Articles Last Modified: October 12, 2025"':
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img
        - heading "Fruits" [level=2]
        - text: 3 Categories | 7 Articles
        - paragraph: "Last Modified: October 12, 2025"
      - 'link "Company 3 Categories | 2 Articles Last Modified: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img
        - heading "Company" [level=2]
        - text: 3 Categories | 2 Articles
        - paragraph: "Last Modified: January 15, 2026"
      - heading "Include" [level=2]
      - 'link "5 Categories | 5 Articles Last Modified: January 27, 2026"':
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img
        - text: 5 Categories | 5 Articles
        - paragraph: "Last Modified: January 27, 2026"
      - 'link "3 Categories | 7 Articles Last Modified: October 12, 2025"':
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img
        - text: 3 Categories | 7 Articles
        - paragraph: "Last Modified: October 12, 2025"
      - 'link "5 Categories | 6 Articles Last Modified: March 31, 2026"':
        - /url: https://betteromation.shahrear.site/docs/team/
        - img
        - text: 5 Categories | 6 Articles
        - paragraph: "Last Modified: March 31, 2026"
      - heading "Exclude" [level=2]
      - 'link "Sports 5 Categories | MSF 5 Blogs Updated: January 27, 2026"':
        - /url: https://betteromation.shahrear.site/docs/sports/
        - heading "Sports" [level=2]
        - text: 5 Categories | MSF 5 Blogs
        - paragraph: "Updated: January 27, 2026"
      - 'link "Fruits 3 Categories | MSF 7 Blogs Updated: October 12, 2025"':
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - heading "Fruits" [level=2]
        - text: 3 Categories | MSF 7 Blogs
        - paragraph: "Updated: October 12, 2025"
      - 'link "Company 3 Categories | MSF 2 Blogs Updated: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/
        - heading "Company" [level=2]
        - text: 3 Categories | MSF 2 Blogs
        - paragraph: "Updated: January 15, 2026"
      - heading "Custom" [level=2]
      - 'link "Sports 5 Categories | MSF 5 Blogs Modified: January 27, 2026"':
        - /url: https://betteromation.shahrear.site/docs/sports/
        - img
        - heading "Sports" [level=2]
        - text: 5 Categories | MSF 5 Blogs
        - paragraph: "Modified: January 27, 2026"
      - 'link "Company 3 Categories | MSF 2 Blogs Modified: January 15, 2026"':
        - /url: https://betteromation.shahrear.site/docs/qa/
        - img
        - heading "Company" [level=2]
        - text: 3 Categories | MSF 2 Blogs
        - paragraph: "Modified: January 15, 2026"
      - 'link "Fruits 3 Categories | MSF 7 Blogs Modified: October 12, 2025"':
        - /url: https://betteromation.shahrear.site/docs/fruits/
        - img
        - heading "Fruits" [level=2]
        - text: 3 Categories | MSF 7 Blogs
        - paragraph: "Modified: October 12, 2025"
  `);
});
