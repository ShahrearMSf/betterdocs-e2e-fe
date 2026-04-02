// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search Sc - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-sc/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search SC" [level=1]
      - paragraph:
        - strong: Basic
      - img
      - textbox "Search Input":
        - /placeholder: Search
      - paragraph:
        - strong: Customize
      - heading "What a beautiful day" [level=1]
      - paragraph: It's been a good day
      - img
      - textbox "Search Input":
        - /placeholder: Search...
      - combobox "Select a category":
        - option "All Categories" [selected]
        - option "Cricket"
        - option "Football"
        - option "Basketball"
        - option "Golf"
        - option "Fencing"
        - option "Apple"
        - option "Orange"
        - option "Watermelon"
        - option "Leads"
        - option "Coleads"
        - option "Developer"
        - option "JuniorQA"
        - option "QA"
        - option "Star"
        - option "WPD"
        - option "MSF"
      - button "Submit search": Search
      - text: Popular Search orange Cricket mer ora gold
  `);
});
