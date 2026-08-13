// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const DOC_URL = `${BASE_URL}/docs/cricket-the-gentlemens-game/`;

/**
 * Reading-time display on single doc pages.
 *
 * Verifies the "X min read" indicator renders with a plausible number.
 * Guards regressions where the calculation returns 0, NaN, or the label
 * is dropped entirely.
 */

test.describe("Single Doc - Reading Time", () => {
  test("Single doc displays 'X min read' with a positive number", async ({
    page,
  }) => {
    await safeGoto(page, DOC_URL);
    const body = await page.locator("body").innerText();
    const match = body.match(/(\d+)\s*min\s*read/i);
    expect(match, "'min read' label not found on single doc").not.toBeNull();
    if (match) {
      const minutes = Number(match[1]);
      expect(minutes).toBeGreaterThanOrEqual(1);
    }
  });
});
