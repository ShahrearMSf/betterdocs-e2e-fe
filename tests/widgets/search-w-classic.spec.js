// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Search W Classic - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/search-w-classic/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Search W Classic" [level=1]
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
      - paragraph:
        - strong: Without Search, Category, Popular Searches Options
      - img
      - textbox "Search Input":
        - /placeholder: Search
      - button "Submit search": Search
      - paragraph: Custom
      - heading "What are you looking for?" [level=1]
      - paragraph: Grab it!
      - img
      - textbox "Search Input":
        - /placeholder: Find me
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
      - text: Frequent Search orange Cricket mer ora gold
  `);
});
