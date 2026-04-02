// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Feedback Form W - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/feedback-form-w/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Feedback Form W" [level=1]
      - link "Still stuck? How can we help?":
        - /url: "#betterdocs-form-modal"
        - img
        - text: Still stuck? How can we help?
      - heading "Custom Feedback form" [level=2]
      - link "Problem? Tell me, how we can help you.":
        - /url: "#betterdocs-form-modal"
        - img
        - text: Problem? Tell me, how we can help you.
      - paragraph: Miscellaneous
      - heading [level=1]
      - text: Updated on February 18, 2026
      - heading "Share This Article :" [level=5]
      - list:
        - listitem:
          - link "Facebook":
            - /url: https://www.facebook.com/sharer/sharer.php?u=https://betteromation.shahrear.site/feedback-form-w/
            - img "Facebook"
        - listitem:
          - link "X":
            - /url: https://twitter.com/intent/tweet?url=https://betteromation.shahrear.site/feedback-form-w/
            - img "X"
        - listitem:
          - link "LinkedIn":
            - /url: https://www.linkedin.com/shareArticle?mini=true&url=https://betteromation.shahrear.site/feedback-form-w/
            - img "LinkedIn"
        - listitem:
          - link "Pinterest":
            - /url: https://pinterest.com/pin/create/button/?url=https://betteromation.shahrear.site/feedback-form-w/
            - img "Pinterest"
      - heading "What are your feelings" [level=5]
      - list:
        - listitem:
          - link:
            - /url: "#"
            - img
        - listitem:
          - link:
            - /url: "#"
            - img
        - listitem:
          - link:
            - /url: "#"
            - img
      - navigation:
        - list:
          - listitem:
            - link "Home":
              - /url: https://betteromation.shahrear.site
          - listitem
          - listitem:
            - link "Docs":
              - /url: https://betteromation.shahrear.site/docs/
      - paragraph:
        - img
        - text: < 1 min read
      - img
      - link "muammar-shahrear-famous Updated on February 18, 2026":
        - /url: https://betteromation.shahrear.site/docs/authors/1/page/1
  `);
});
