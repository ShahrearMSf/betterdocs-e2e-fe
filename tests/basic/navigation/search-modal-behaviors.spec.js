// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Search modal behavior tests (F).
 *
 * Complements existing search.spec.js which asserts the modal opens and
 * results appear. This file targets escape/dismiss + result click-through
 * — critical UX behaviors not currently tested.
 */

async function openSearchModal(page) {
  await safeGoto(page, `${BASE_URL}/docs/`);
  await page.locator(".search-bar").click();
  const searchInput = page.locator(".betterdocs-search-field");
  await expect(searchInput).toBeVisible({ timeout: 5000 });
  return searchInput;
}

test.describe("Search Modal - Dismiss & Result Behaviors", () => {
  test("Escape key closes the search modal", async ({ page }) => {
    const input = await openSearchModal(page);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    await expect(input).not.toBeVisible();
  });

  test("Clicking a search result navigates to that doc", async ({ page }) => {
    const input = await openSearchModal(page);
    await input.fill("Cricket");
    await page.waitForTimeout(1000);
    const firstResult = page
      .locator(".betterdocs-search-modal-layout-1 a.hasperma")
      .first();
    await expect(firstResult).toBeVisible();
    const href = await firstResult.getAttribute("href");
    expect(href).toBeTruthy();
    await firstResult.click();
    // URL should change to the result doc
    if (href) {
      await expect(page).toHaveURL(href);
    }
    // Content should render (no page-not-found)
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("Search returns no results for gibberish query", async ({ page }) => {
    const input = await openSearchModal(page);
    await input.fill("zzzxyxzzxyzq123nomatch");
    await page.waitForTimeout(1000);
    // No result links should be present
    const results = page.locator(
      ".betterdocs-search-modal-layout-1 a.hasperma"
    );
    const count = await results.count();
    expect(count).toBe(0);
  });
});
