// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * AI-powered search → chatbot connection tests.
 *
 * When typing in the docs search bar, an "Ask BetterDocs AI" suggestion
 * block appears alongside regular search results. The block prompts users
 * to send the typed query to the AI chatbot.
 *
 * We assert the suggestion block renders with the expected structure
 * (sparkle icon, prompt label, echoed query, clickable target). We do NOT
 * assert the downstream chatbot response, which is variable and slow.
 */

const DOCS_URL = `${BASE_URL}/docs/`;

async function openSearchAndType(page, query) {
  await safeGoto(page, DOCS_URL);
  await page.locator(".search-bar").click();
  const searchInput = page.locator(".betterdocs-search-field");
  await expect(searchInput).toBeVisible({ timeout: 5000 });
  await searchInput.fill(query);
  // Suggestion is debounced — give it a moment to render
  await expect(page.locator(".betterdocs-ai-suggestion")).toBeVisible({
    timeout: 10000,
  });
}

test.describe("Search - AI Suggestion Block", () => {
  test("AI suggestion block appears when typing in search", async ({
    page,
  }) => {
    await openSearchAndType(page, "what is life");
    const suggestion = page.locator(".betterdocs-ai-suggestion");
    await expect(suggestion).toBeVisible();
  });

  test("AI suggestion contains the typed query text", async ({ page }) => {
    await openSearchAndType(page, "what is life");
    const query = page.locator(".ai-suggestion-query");
    await expect(query).toContainText("what is life");
  });

  test("AI suggestion shows the sparkle icon", async ({ page }) => {
    await openSearchAndType(page, "cricket");
    const sparkle = page.locator(".ai-sparkle-icon");
    await expect(sparkle).toBeVisible();
  });

  test("AI suggestion shows the 'Ask BetterDocs AI' prompt label", async ({
    page,
  }) => {
    await openSearchAndType(page, "cricket");
    const label = page.locator(".ai-suggestion-label");
    await expect(label).toBeVisible();
    await expect(label).toContainText(/BetterDocs AI/i);
  });

  test("AI suggestion prompt has cursor:pointer styling (clickable)", async ({
    page,
  }) => {
    await openSearchAndType(page, "cricket");
    const prompt = page.locator(".ai-suggestion-prompt");
    const cursor = await prompt.evaluate(
      (el) => window.getComputedStyle(el).cursor
    );
    expect(cursor).toBe("pointer");
  });

  test("Query text updates when user changes the search input", async ({
    page,
  }) => {
    await openSearchAndType(page, "first query");
    await expect(page.locator(".ai-suggestion-query")).toContainText(
      "first query"
    );

    // Change the query
    const searchInput = page.locator(".betterdocs-search-field");
    await searchInput.fill("second different query");
    await expect(page.locator(".ai-suggestion-query")).toContainText(
      "second different query",
      { timeout: 5000 }
    );
  });
});
