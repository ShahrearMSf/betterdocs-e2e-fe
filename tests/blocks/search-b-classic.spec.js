// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search B Classic - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-b-classic/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search B Classic" [level=1]
      - heading "Default" [level=2]
      - img
      - textbox "Search Input":
        - /placeholder: Search
      - heading "Custom with Advanced" [level=2]
      - heading "What a Beautiful Lie" [level=2]
      - heading "Life is Beautiful" [level=3]
      - img
      - textbox "Search Input":
        - /placeholder: Search
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
      - heading "Custom with Advanced" [level=2]
      - heading "What a Beautiful Lie" [level=2]
      - heading "Life is Beautiful" [level=3]
      - img
      - textbox "Search Input":
        - /placeholder: Khojo
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
