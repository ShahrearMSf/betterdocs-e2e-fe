// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Regression test for BetterDocs issue #57:
 *   "Bug: Multi-category feed URL returns 404 status code (regression since 4.3.8)"
 *   https://github.com/WPDevelopers/betterdocs/issues/57
 *
 * Bug summary:
 *   Any `docs-category` URL containing comma-separated category slugs returns
 *   HTTP 404, even though the page renders content. This was introduced in
 *   commit 30cde30e8 (shipped in 4.3.8) and affects every machine consumer of
 *   the URL — RSS readers, JSON feeds, sitemap parsers, SEO crawlers, CDN
 *   layers — that respects HTTP status.
 *
 * Test intent:
 *   Each assertion below mirrors the issue's acceptance criteria. The
 *   assertions encode the CORRECT, expected behavior so that once this is
 *   fixed and deployed, the regression cannot silently come back.
 *
 * NOTE — Until issue #57 is fixed and deployed to the test environment,
 *   some assertions in this file may fail. That failure is the signal: the
 *   bug is still live. Do not weaken the assertions to make them green.
 *   When the fix ships, the file should turn fully green automatically.
 *
 * Site-specific context:
 *   betteromation.shahrear.site uses `/docs/` as the doc-category permalink
 *   base (not the BetterDocs default `/docs-category/`). The bug applies to
 *   whichever base the site uses, since the root cause is in
 *   `validate_single_docs_category_redirect()` in `includes/Core/Request.php`.
 *   These tests therefore target `/docs/{cat1,cat2}/` etc.
 */

test.describe("BetterDocs #57 - Multi-Category Archive HTTP Status", () => {
  test("Multi-category archive returns 200 (not 404)", async ({ request }) => {
    // Acceptance: /docs-category/cat-1,cat-2/ → 200 OK
    const res = await request.get(`${BASE_URL}/docs/sports,fruits/`);
    expect(res.status()).toBe(200);
  });

  test("Multi-category RSS feed returns 200 (not 404)", async ({ request }) => {
    // Acceptance: /docs-category/cat-1,cat-2/feed/ → 200 OK
    const res = await request.get(`${BASE_URL}/docs/sports,fruits/feed/`);
    expect(res.status()).toBe(200);
  });

  test("Multi-category JSON feed returns 200 (not 404)", async ({
    request,
  }) => {
    // Acceptance: /docs-category/cat-1,cat-2/feed/json → 200 OK
    //
    // *** THIS IS THE PRIMARY REGRESSION TEST FOR #57 ***
    // This is the exact URL pattern the customer reported:
    //   "example.com/docs-category/management,e-mail/feed/json returns 404"
    // It currently fails on the live site (404) and will turn green once the
    // fix from issue #57 is merged into BetterDocs and deployed.
    const res = await request.get(`${BASE_URL}/docs/sports,fruits/feed/json/`);
    expect(res.status()).toBe(200);
  });

  test("Multi-category with three categories returns 200", async ({
    request,
  }) => {
    // Comma-OR has always been a supported WordPress query pattern. Any
    // number of categories joined by commas should resolve.
    const res = await request.get(
      `${BASE_URL}/docs/sports,fruits,team/feed/`
    );
    expect(res.status()).toBe(200);
  });
});

test.describe("BetterDocs #57 - Control Cases (must remain unchanged)", () => {
  test("Single-category archive still returns 200", async ({ request }) => {
    // Acceptance: /docs-category/cat-1/ continues to return 200 OK
    const res = await request.get(`${BASE_URL}/docs/sports/`);
    expect(res.status()).toBe(200);
  });

  test("Single-category RSS feed still returns 200", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/docs/sports/feed/`);
    expect(res.status()).toBe(200);
  });

  test("Invalid single-doc URL still returns 404", async ({ request }) => {
    // Acceptance: /docs/non-existent-post continues to return 404
    // The fix must not weaken legitimate 404 responses.
    const res = await request.get(
      `${BASE_URL}/docs/non-existent-post-xyz-zzz/`
    );
    expect(res.status()).toBe(404);
  });

  test("Invalid category URL still returns 404", async ({ request }) => {
    // Acceptance: /docs-category/non-existent/ continues to return 404
    const res = await request.get(
      `${BASE_URL}/docs/non-existent-category-xyz-zzz/`
    );
    expect(res.status()).toBe(404);
  });
});

test.describe("BetterDocs #57 - Content Renders Even When Status Is Wrong", () => {
  // The customer's original observation: page body renders, but HTTP status
  // says 404. This test makes sure that distinction is captured — content
  // and status are checked separately so the bug is visible even if a future
  // change inadvertently swaps which one is broken.
  test("Multi-category page renders BetterDocs content", async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/sports,fruits/`, { timeout: 30000 });
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
    // Should display category-archive content (heading, doc list, etc.)
    const hasContent = await page
      .locator("article, .betterdocs-wrapper, main")
      .first()
      .isVisible();
    expect(hasContent).toBe(true);
  });
});
