// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const SITES = [
  { name: "betteromation (BASE_URL)", url: process.env.BASE_URL },
  { name: "cbotai (BASE_URL_2)", url: process.env.BASE_URL_2 },
  { name: "betterdocs.msf (BASE_URL_3)", url: process.env.BASE_URL_3 },
  { name: "aichatbotliveserver (BASE_URL_4)", url: process.env.BASE_URL_4 },
];

/**
 * Cross-domain homepage smoke.
 *
 * Uptime alarm — the homepage of all 4 sites must return 200 and render a
 * non-empty <title>. Currently secondary sites only have deep-page checks;
 * this closes the gap.
 */
test.describe("Cross-Domain - Homepage Smoke", () => {
  for (const { name, url } of SITES) {
    test(`${name} homepage returns 200 with non-empty <title>`, async ({
      page,
    }) => {
      expect(url, `Env var not set for ${name}`).toBeTruthy();
      const res = await page.goto(url, { timeout: 30000 });
      expect(res.status()).toBe(200);
      const title = await page.title();
      expect(title.trim().length).toBeGreaterThan(0);
    });
  }
});
