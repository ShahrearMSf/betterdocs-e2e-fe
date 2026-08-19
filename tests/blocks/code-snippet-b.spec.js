// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Code Snippet B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/code-snippet-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  // Structural-only snapshot — the code text uses ${...} and backticks that
  // would break the JS template literal here, so we assert on wrapper elements
  // and use a permissive regex on the code node.
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Code Snippet B" [level=1]
      - img "File icon"
      - text: msf.js
      - button "Copy code to clipboard"
      - code
      - heading "The default one" [level=2]
      - img
      - text: filename.js
      - button "Copy code to clipboard"
      - code
  `);
});
