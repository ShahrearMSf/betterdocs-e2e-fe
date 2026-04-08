// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Search - Category Filter & Popular Tags", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/search-b-classic/`);
  });

  test("Category dropdown has all categories", async ({ page }) => {
    const dropdown = page
      .getByRole("combobox", { name: "Select a category" })
      .first();
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toContainText("All Categories");
    await expect(dropdown).toContainText("Cricket");
    await expect(dropdown).toContainText("Football");
    await expect(dropdown).toContainText("Apple");
  });

  test("Select a category from dropdown changes selection", async ({ page }) => {
    const dropdown = page
      .getByRole("combobox", { name: "Select a category" })
      .first();
    await dropdown.selectOption({ label: "Cricket" });
    await expect(dropdown).toHaveValue(/cricket/i);
  });

  test("Popular search tags are visible", async ({ page }) => {
    const content = page.locator("main#content");
    await expect(content).toContainText("Popular Search");
    await expect(content).toContainText("Cricket");
    await expect(content).toContainText("orange");
    await expect(content).toContainText("gold");
  });

  test("Search submit button is visible and clickable", async ({ page }) => {
    const submitBtn = page
      .getByRole("button", { name: "Submit search" })
      .first();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });
});
