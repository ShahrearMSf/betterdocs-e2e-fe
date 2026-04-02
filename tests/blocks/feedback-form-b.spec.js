// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Feedback Form B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/feedback-form-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Feedback Form B" [level=1]
      - link "Still stuck? How can we help?":
        - /url: "#betterdocs-form-modal"
        - img
        - text: Still stuck? How can we help?
      - heading "Customize Feedback Form B" [level=2]
      - link "Hey Buddy! What’s wrong?":
        - /url: "#betterdocs-form-modal"
        - img
        - text: Hey Buddy! What’s wrong?
      - paragraph
      - paragraph
      - heading "Miscellaneous" [level=3]
      - heading "What are your feelings" [level=4]
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
      - paragraph:
        - img
        - text: < 1 min read
      - heading "Share This Article:" [level=4]
      - list:
        - listitem:
          - link "Facebook":
            - /url: https://www.facebook.com/sharer/sharer.php?u=https://betteromation.shahrear.site/feedback-form-b/
            - img "Facebook"
        - listitem:
          - link "X":
            - /url: https://twitter.com/intent/tweet?url=https://betteromation.shahrear.site/feedback-form-b/
            - img "X"
        - listitem:
          - link "LinkedIn":
            - /url: https://www.linkedin.com/shareArticle?mini=true&url=https://betteromation.shahrear.site/feedback-form-b/
            - img "LinkedIn"
        - listitem:
          - link "Pinterest":
            - /url: https://pinterest.com/pin/create/button/?url=https://betteromation.shahrear.site/feedback-form-b/
            - img "Pinterest"
      - paragraph
  `);
});
