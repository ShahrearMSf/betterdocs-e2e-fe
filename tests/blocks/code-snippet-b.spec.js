// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Code Snippet B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/code-snippet-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Code Snippet B" [level=1]
      - img "File icon"
      - text: msf.js
      - button "Copy code to clipboard":
        - img
      - heading "The default one" [level=2]
      - text: filename.js
      - button "Copy code to clipboard":
        - img
  `);
});
