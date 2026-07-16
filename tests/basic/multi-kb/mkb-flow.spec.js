// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const BASE_URL_4 = process.env.BASE_URL_4;

/**
 * Multi Knowledge Base (MKB) navigation flow tests.
 *
 * Target site: https://aichatbotliveserver.shahrear.msf.bd (Gutenberg block environment)
 *
 * Flow under test:
 *   1. Visit /docs/                → Multi KB block renders with the "Alpha" KB card
 *   2. Click MKB card              → land on /docs/alpha/ (KB archive)
 *   3. Category Grid block renders → categories (Configurations, Installation, Setup Process, ...)
 *   4. Click a category card       → land on a single doc page
 *   5. Single doc content renders  → article/content area visible
 *
 * Hardcoded URL because this site is independent of BASE_URL (which targets
 * betteromation). Same pattern as 404-checks/cross-domain.spec.js.
 */

const SITE = BASE_URL_4;
const DOCS_URL = `${SITE}/docs/`;
const KB_ARCHIVE_URL = `${SITE}/docs/alpha/`;
const CATEGORY_ARCHIVE_URL = `${SITE}/docs/alpha/installation/`;

test.describe("MKB Flow - Step 1: /docs/ shows Multi Knowledge Base block", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOCS_URL);
  });

  test("Multi KB block wrapper is visible", async ({ page }) => {
    const mkbWrapper = page.locator(".betterdocs-multiple-kb-wrapper");
    await expect(mkbWrapper).toBeVisible();
  });

  test("MKB block contains at least one KB entry (link to a KB archive)", async ({
    page,
  }) => {
    // Robust to DOM refactors: assert user-observable behavior — a clickable
    // link to a KB archive must exist inside the MKB block. We deliberately
    // avoid coupling to internal class names like
    // ".betterdocs-single-category-wrapper" which have been renamed before.
    const kbLinks = page
      .locator(".betterdocs-multiple-kb-wrapper")
      .locator('a[href*="/docs/"]');
    const count = await kbLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("Alpha knowledge base card is present", async ({ page }) => {
    const alphaCard = page
      .locator(".betterdocs-multiple-kb-wrapper")
      .getByText(/alpha/i)
      .first();
    await expect(alphaCard).toBeVisible();
  });
});

test.describe("MKB Flow - Step 2: Click MKB card navigates to KB archive", () => {
  test("Clicking Alpha KB card navigates to /docs/alpha/", async ({ page }) => {
    await safeGoto(page, DOCS_URL);
    const alphaLink = page
      .locator(".betterdocs-multiple-kb-wrapper a[href*='/docs/alpha']")
      .first();
    await expect(alphaLink).toBeVisible();
    await alphaLink.click();
    await expect(page).toHaveURL(/\/docs\/alpha\/?$/);
  });

  test("KB archive page shows 'Alpha' as title or heading", async ({ page }) => {
    await safeGoto(page, KB_ARCHIVE_URL);
    const title = await page.title();
    expect(title.toLowerCase()).toContain("alpha");
  });
});

test.describe("MKB Flow - Step 3: KB archive shows Category Grid block", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, KB_ARCHIVE_URL);
  });

  test("Category Grid block wrapper is visible", async ({ page }) => {
    const grid = page.locator(".betterdocs-category-grid-wrapper");
    await expect(grid).toBeVisible();
  });

  test("Category Grid contains the 3 expected categories", async ({ page }) => {
    const grid = page.locator(".betterdocs-category-grid-wrapper");
    await expect(grid).toContainText("Configurations");
    await expect(grid).toContainText("Installation");
    await expect(grid).toContainText("Setup Process");
  });

  test("Each category card has a category title heading", async ({ page }) => {
    const titles = page
      .locator(".betterdocs-category-grid-wrapper")
      .locator(".betterdocs-category-title");
    const count = await titles.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

test.describe("MKB Flow - Step 4 & 5: Click category card lands on a doc page", () => {
  test("Clicking first category card navigates to a /docs/ URL", async ({
    page,
  }) => {
    await safeGoto(page, KB_ARCHIVE_URL);
    const firstCategoryLink = page
      .locator(".betterdocs-category-grid-wrapper .betterdocs-single-category-wrapper")
      .first()
      .locator("a")
      .first();
    await expect(firstCategoryLink).toBeVisible();
    await firstCategoryLink.click();
    // Lands on either a single doc or subcategory page, both under /docs/
    await expect(page).toHaveURL(/\/docs\//);
  });

  test("Single doc page renders content area", async ({ page }) => {
    await safeGoto(page, KB_ARCHIVE_URL);
    await page
      .locator(".betterdocs-category-grid-wrapper .betterdocs-single-category-wrapper")
      .first()
      .locator("a")
      .first()
      .click();

    // Doc content should be visible (article, content-wrapper, or main heading)
    const docHeading = page.locator("h1").first();
    await expect(docHeading).toBeVisible();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });
});

test.describe("MKB Flow - Template Integrity (body-class & chrome)", () => {
  test("KB archive /docs/alpha/ has tax-knowledge_base body class", async ({
    page,
  }) => {
    await safeGoto(page, KB_ARCHIVE_URL);
    const bodyClass = await page
      .locator("body")
      .evaluate((el) => el.className);
    expect(bodyClass).toContain("tax-knowledge_base");
  });

  test("Category archive /docs/alpha/installation/ has tax-doc_category body class", async ({
    page,
  }) => {
    // Regression guard: if MKB grid template renders on a category URL
    // (wrong-template bug), this body class will not contain tax-doc_category.
    await safeGoto(page, CATEGORY_ARCHIVE_URL);
    const bodyClass = await page
      .locator("body")
      .evaluate((el) => el.className);
    expect(bodyClass).toContain("tax-doc_category");
  });

  test("Category page does NOT render FSE compat footer", async ({ page }) => {
    await safeGoto(page, CATEGORY_ARCHIVE_URL);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toContain("Proudly powered by WordPress");
  });
});

test.describe("MKB Flow - Category Archive → Single Doc (deeper path)", () => {
  test("Category archive lists multiple doc links", async ({ page }) => {
    await safeGoto(page, CATEGORY_ARCHIVE_URL);
    // Count unique doc URLs on the page (exclude /alpha/ subcategory and /feed/)
    const hrefs = await page
      .locator(`a[href*="${SITE}/docs/"]`)
      .evaluateAll((els) => els.map((a) => a.getAttribute("href")));
    const uniqueDocHrefs = [
      ...new Set(
        hrefs.filter(
          (h) =>
            h &&
            !h.includes("/docs/alpha") &&
            !h.includes("/docs/feed") &&
            h.includes(`${SITE}/docs/`)
        )
      ),
    ];
    expect(uniqueDocHrefs.length).toBeGreaterThanOrEqual(2);
  });

  test("Clicking a doc from category archive opens single doc", async ({
    page,
  }) => {
    await safeGoto(page, CATEGORY_ARCHIVE_URL);
    // Get the first VISIBLE doc link (exclude /alpha/ subcategories and feed URLs)
    const visibleDocHref = await page
      .locator(`a[href*="${SITE}/docs/"]`)
      .evaluateAll((els) => {
        const docs = els.filter((a) => {
          const href = a.getAttribute("href") || "";
          return (
            href.includes("/docs/") &&
            !href.includes("/docs/alpha") &&
            !href.includes("/docs/feed")
          );
        });
        const visible = docs.find((a) => {
          const r = a.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        });
        return visible ? visible.getAttribute("href") : null;
      });
    expect(visibleDocHref).toBeTruthy();
    await page.goto(visibleDocHref);
    await expect(page.locator("h1").first()).toBeVisible();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });
});

test.describe("MKB Flow - End-to-End Navigation Chain", () => {
  test("Full chain: /docs/ → MKB click → category click → doc renders", async ({
    page,
  }) => {
    // Step 1: visit /docs/
    await safeGoto(page, DOCS_URL);
    await expect(
      page.locator(".betterdocs-multiple-kb-wrapper")
    ).toBeVisible();

    // Step 2: click MKB card (alpha)
    await page
      .locator(".betterdocs-multiple-kb-wrapper a[href*='/docs/alpha']")
      .first()
      .click();
    await expect(page).toHaveURL(/\/docs\/alpha\/?$/);

    // Step 3: verify Category Grid renders
    await expect(
      page.locator(".betterdocs-category-grid-wrapper")
    ).toBeVisible();

    // Step 4: click a category card
    await page
      .locator(".betterdocs-category-grid-wrapper .betterdocs-single-category-wrapper")
      .first()
      .locator("a")
      .first()
      .click();

    // Step 5: single doc lands and renders
    await expect(page).toHaveURL(/\/docs\//);
    await expect(page.locator("h1").first()).toBeVisible();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });
});
