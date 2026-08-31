// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Code Snippet W - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/code-snippet-w/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  // Structural-only snapshot — the code text contains ${...} and backticks
  // that would break the JS template literal here; we assert on wrapper
  // elements and skip the code content with a bare `- code` matcher.
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Code Snippet W" [level=1]
      - img "File icon"
      - text: msf.js
      - button "Copy code to clipboard"
      - code
      - heading "Custom" [level=2]
      - img "File icon"
      - text: msf.py
      - button "Copy code to clipboard"
      - code
      - heading "Leave a Reply" [level=2]
      - paragraph: Your email address will not be published. Required fields are marked *
      - paragraph:
        - text: Comment *
        - textbox "Comment *"
      - paragraph:
        - text: Name *
        - textbox "Name *"
      - paragraph:
        - text: Email *
        - textbox "Email *"
      - paragraph:
        - text: Website
        - textbox "Website"
      - paragraph:
        - checkbox "Save my name, email, and website in this browser for the next time I comment."
        - text: Save my name, email, and website in this browser for the next time I comment.
      - paragraph:
        - button "Post Comment"
  `);
});
