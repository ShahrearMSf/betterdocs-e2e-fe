// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

/**
 * Encyclopedia routing tests for the AI Chatbot Live site (Gutenberg env).
 *
 * Target site: https://aichatbotliveserver.shahrear.site
 *
 * Covers:
 *   - /encyclopedia/ archive renders
 *   - Single entry permalink (/encyclopedia/bp/)
 *   - Trailing-slash redirect for /encyclopedia and entry slugs
 *   - Alphabet filter ?encyclopedia_prefix=X (existing letter, empty letter, out-of-set)
 *   - Invalid entry slug returns 404
 */

const SITE = "https://aichatbotliveserver.shahrear.site";
const ENCYCLOPEDIA_URL = `${SITE}/encyclopedia/`;
const ENTRY_URL = `${SITE}/encyclopedia/bp/`;

test.describe("Encyclopedia Routing - Archive & Entry", () => {
  test("Encyclopedia archive returns 200 with correct title", async ({
    page,
  }) => {
    const res = await page.goto(ENCYCLOPEDIA_URL, { timeout: 30000 });
    expect(res.status()).toBe(200);
    const title = await page.title();
    expect(title.toLowerCase()).toContain("encyclopedia");
  });

  test("Archive page lists the BP entry", async ({ page }) => {
    await safeGoto(page, ENCYCLOPEDIA_URL);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("BP");
  });

  test("Single entry /encyclopedia/bp/ returns 200 with BP heading", async ({
    page,
  }) => {
    const res = await page.goto(ENTRY_URL, { timeout: 30000 });
    expect(res.status()).toBe(200);
    const h1 = page.locator("h1.betterdocs-entry-title, h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("BP");
  });

  test("Encyclopedia URL without trailing slash redirects to canonical", async ({
    page,
  }) => {
    await page.goto(`${SITE}/encyclopedia`, { timeout: 30000 });
    expect(page.url()).toBe(ENCYCLOPEDIA_URL);
  });

  test("Entry URL without trailing slash resolves", async ({ page }) => {
    const res = await page.goto(`${SITE}/encyclopedia/bp`, { timeout: 30000 });
    expect(res.status()).toBe(200);
  });
});

test.describe("Encyclopedia Routing - Alphabet Filter", () => {
  test("?encyclopedia_prefix=B (existing letter) returns 200 and shows BP", async ({
    page,
  }) => {
    const res = await page.goto(
      `${ENCYCLOPEDIA_URL}?encyclopedia_prefix=B`,
      { timeout: 30000 }
    );
    expect(res.status()).toBe(200);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("BP");
  });

  test("?encyclopedia_prefix=A (no entries) still returns 200", async ({
    page,
  }) => {
    const res = await page.goto(
      `${ENCYCLOPEDIA_URL}?encyclopedia_prefix=A`,
      { timeout: 30000 }
    );
    expect(res.status()).toBe(200);
  });

  test("?encyclopedia_prefix=Z (out-of-set) still returns 200", async ({
    page,
  }) => {
    const res = await page.goto(
      `${ENCYCLOPEDIA_URL}?encyclopedia_prefix=Z`,
      { timeout: 30000 }
    );
    expect(res.status()).toBe(200);
  });
});

test.describe("Encyclopedia Routing - Invalid Paths", () => {
  test("Non-existent entry slug returns 404", async ({ page }) => {
    const res = await page.goto(
      `${SITE}/encyclopedia/does-not-exist-xyz/`,
      { timeout: 30000 }
    );
    expect(res.status()).toBe(404);
  });
});
