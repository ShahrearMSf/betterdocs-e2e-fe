// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;
const GLOSSARY_DOC = `${BASE_URL}/docs/qa-glossary-test-for-betterdocs/`;

test.describe("Glossary - Tooltip & Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, GLOSSARY_DOC);
  });

  test("Glossary terms are present in the doc", async ({ page }) => {
    const glossaryItems = page.locator(".glossary-tooltip-container");
    const count = await glossaryItems.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("Glossary term shows tooltip on hover", async ({ page }) => {
    const firstGlossary = page.locator(".glossary-tooltip-container").first();
    await expect(firstGlossary).toBeVisible();

    // Hover to trigger tooltip — check data-tooltip attribute exists
    const tooltip = await firstGlossary.getAttribute("data-tooltip");
    expect(tooltip).toBeTruthy();
    expect(tooltip.length).toBeGreaterThan(10);
  });

  test("Glossary term links to encyclopedia entry", async ({ page }) => {
    const glossaryLink = page
      .locator(".glossary-tooltip-container a[href*='/encyclopedia/']")
      .first();
    await expect(glossaryLink).toBeVisible();
    const href = await glossaryLink.getAttribute("href");
    expect(href).toContain("/encyclopedia/");
  });

  test("Click glossary link opens encyclopedia entry in new tab", async ({
    page,
    context,
  }) => {
    const glossaryLink = page
      .locator(".glossary-tooltip-container a[href*='/encyclopedia/']")
      .first();
    await expect(glossaryLink).toBeVisible();

    // target="_blank" opens in new tab — listen for it
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      glossaryLink.click(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toContain("/encyclopedia/");
    await expect(newPage.locator("body")).not.toContainText("page not found", {
      ignoreCase: true,
    });
    await newPage.close();
  });

  test("Multiple glossary terms link to different encyclopedia entries", async ({
    page,
  }) => {
    const glossaryLinks = page.locator(
      ".glossary-tooltip-container a[href*='/encyclopedia/']"
    );
    const count = await glossaryLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Collect unique hrefs
    const hrefs = new Set();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const href = await glossaryLinks.nth(i).getAttribute("href");
      hrefs.add(href);
    }
    // Should have multiple different encyclopedia entries
    expect(hrefs.size).toBeGreaterThanOrEqual(3);
  });

  test("Glossary encyclopedia links are all valid (not 404)", async ({
    page,
    context,
  }) => {
    const glossaryLinks = page.locator(
      ".glossary-tooltip-container a[href*='/encyclopedia/']"
    );
    const count = await glossaryLinks.count();

    // Collect unique hrefs
    const hrefs = new Set();
    for (let i = 0; i < count; i++) {
      const href = await glossaryLinks.nth(i).getAttribute("href");
      if (href) hrefs.add(href);
    }

    // Check each unique link is not 404
    for (const href of hrefs) {
      const checkPage = await context.newPage();
      const response = await checkPage
        .goto(href, { timeout: 30000 })
        .catch(() => null);
      const status = response ? response.status() : 0;
      expect(status, `${href} returned ${status}`).not.toBe(404);
      await checkPage.close();
    }
  });
});
