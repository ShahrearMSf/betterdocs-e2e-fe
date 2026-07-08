// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Print view — presence & renderability.
 *
 * `enable_print_icon` ships on by default. We assert the print control is
 * present in the DOM and that the emulated print stylesheet renders the
 * doc content (guarding against a broken print CSS that hides everything).
 */

const DOC_URL = `${BASE_URL}/docs/cricket-the-gentlemens-game/`;

test.describe("Single Doc - Print View", () => {
  test("Print button/icon is present on the doc page", async ({ page }) => {
    await safeGoto(page, DOC_URL);
    // Match any element with a betterdocs-print* class (icon, button, wrapper)
    const printControl = page.locator('[class*="betterdocs-print"]').first();
    await expect(printControl).toBeAttached();
  });

  test("Print media renders the doc heading (content not hidden by print CSS)", async ({
    page,
  }) => {
    await safeGoto(page, DOC_URL);
    await page.emulateMedia({ media: "print" });
    // The main <h1> must remain visible under print CSS — a broken print
    // stylesheet that hides everything would fail this.
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });
});
