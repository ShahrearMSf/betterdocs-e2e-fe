// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Code Snippet B - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/code-snippet-b/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  // Structural-only snapshot — the code text uses ${...} and backticks
  // that would break the JS template literal here, so we assert on wrapper
  // elements and skip the code content with a bare `- code` matcher.
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Code Snippet B" [level=1]
      - img "File icon"
      - text: msf.js
      - button "Copy code to clipboard"
      - code: "import { test, expect } from '@playwright/test'; test.describe('Category Archive List L1 Tests', () => { test.beforeEach(async ({ page }) => { await page.goto(\`\${process.env.BASE_URL_MSF}/category-archive-list-l1/\`); }); test('should have correct main heading', async ({ page }) => { await expect(page.getByRole('heading')).toMatchAriaSnapshot(\`- heading \\"Category Archive List L1\\" [level=1]\`); }); test('should navigate to doc from div click', async ({ page }) => { await page.locator('div').filter({ hasText: '1% import duty threatens' }).nth(2).click(); }); test('should expand list item with icon click', async ({ page }) => { await page.locator('li').filter({ hasText: '1% import duty threatens' }).locator('i').click(); }); test('should go to the article via link click', async ({ page }) => { await page.getByRole('link', { name: '1% import duty threatens' }).click(); await page.locator('#betterdocs-breadcrumb').click(); }); test('should open specific doc page and click breadcrumb', async ({ page }) => { await page.goto(\`\${process.env.BASE_URL_MSF}/docs/client/1-import-duty-threatens-foreign-investment-in-economic-zones-stakeholders/\`); await page.getByText('Home Docs MSF Muammar Test').click(); await page.goto(\`\${process.env.BASE_URL_MSF}/docs/client/1-import-duty-threatens-foreign-investment-in-economic-zones-stakeholders/\`); await page.locator('#betterdocs-breadcrumb').click(); }); test('should interact with headings and related link', async ({ page }) => { await page.goto(\`\${process.env.BASE_URL_MSF}/docs/client/1-import-duty-threatens-foreign-investment-in-economic-zones-stakeholders/\`); await page.getByRole('heading', { name: '1% import duty threatens' }).click(); await page.getByRole('link', { name: 'muammar-shahrear-famous' }).click(); }); test('should interact with reading time and content', async ({ page }) => { await page.goto(\`\${process.env.BASE_URL_MSF}/docs/client/1-import-duty-threatens-foreign-investment-in-economic-zones-stakeholders/\`); await page.locator('div').filter({ hasText: '< 1 min read' }).nth(4).click(); await page.locator('#betterdocs-single-content').click(); }); });"
      - heading "The default one" [level=2]
      - text: 🐍 filename.js
      - button "Copy code to clipboard"
      - code: "# Demo Python Program def greet_user(name): return f\\"Hello, {name}! Welcome to Python.\\" def calculate_square(number): return number ** 2 # Main program if __name__ == \\"__main__\\": print(\\"=== Python Demo Program ===\\") name = input(\\"Enter your name: \\") print(greet_user(name)) print(\\"\\\\nSquares of numbers from 1 to 5:\\") for i in range(1, 6): print(f\\"{i} squared is {calculate_square(i)}\\") print(\\"\\\\nDemo finished successfully.\\")"
  `);
});
