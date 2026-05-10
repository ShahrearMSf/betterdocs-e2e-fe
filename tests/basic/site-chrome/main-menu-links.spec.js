// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Site Chrome - Main Menu Link Resolution", () => {
  test("All visible top-level menu links resolve without 4xx/5xx", async ({
    page,
    request,
  }) => {
    await safeGoto(page, `${BASE_URL}/`);
    // Collect hrefs of top-level main menu items
    const hrefs = await page
      .locator('nav[aria-label="Main menu" i] > ul > li > a')
      .evaluateAll((links) =>
        links.map((a) => a.getAttribute("href")).filter(Boolean)
      );

    // Sanity: site has a main menu with items
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      // Only check internal links to avoid hitting third parties
      if (!href.startsWith(BASE_URL) && href.startsWith("http")) continue;
      const target = href.startsWith("http") ? href : `${BASE_URL}${href}`;
      const res = await request.get(target, { failOnStatusCode: false });
      expect(
        res.status(),
        `${href} returned ${res.status()}`
      ).toBeLessThan(400);
    }
  });
});
