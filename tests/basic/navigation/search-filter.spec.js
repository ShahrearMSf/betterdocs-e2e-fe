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

  test("Popular Search section renders with at least one non-empty term", async ({
    page,
  }) => {
    // Structural check only — Popular Search terms are admin-configurable and
    // change often. We assert the section exists and has *some* content
    // rather than pinning specific terms like "gold" or "Cricket".
    const content = page.locator("main#content");
    await expect(content).toContainText("Popular Search");

    // Extract the text right after "Popular Search" and assert it has real content
    const text = await content.innerText();
    const match = text.match(/Popular Search\s*([\s\S]{1,200})/);
    expect(match, "'Popular Search' label found but no following text").not.toBeNull();
    if (match) {
      const tail = match[1].trim();
      // At least one non-whitespace term must follow the label
      expect(tail.length).toBeGreaterThan(0);
    }
  });

  test("Search submit button is visible and clickable", async ({ page }) => {
    const submitBtn = page
      .getByRole("button", { name: "Submit search" })
      .first();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });
});
