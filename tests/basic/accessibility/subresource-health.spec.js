// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Subresource health sweep + inline global-error guard.
 *
 * On each key page, tracks:
 *   1. `pageerror` — any uncaught JavaScript exception
 *   2. Every same-origin subresource response (CSS/JS/font/img/XHR/fetch)
 *      and fails if any returns HTTP >= 500 (server / plugin regression)
 *
 * Catches: broken enqueues, deleted assets, failing REST/admin-ajax,
 * silent JS regressions. Content-agnostic — never false-fails on editor
 * edits.
 */

const PAGES = [
  { name: "Homepage", url: `${BASE_URL}/` },
  { name: "Docs archive", url: `${BASE_URL}/docs/` },
  { name: "Encyclopedia archive", url: `${BASE_URL}/encyclopedia/` },
  { name: "Sports category", url: `${BASE_URL}/docs/sports/` },
  { name: "Single doc (cricket)", url: `${BASE_URL}/docs/cricket-the-gentlemens-game/` },
  { name: "Glossary doc", url: `${BASE_URL}/docs/qa-glossary-test-for-betterdocs/` },
  { name: "Encyclopedia entry", url: `${BASE_URL}/encyclopedia/aesthetic/` },
  { name: "Sample page", url: `${BASE_URL}/sample-page/` },
];

const BASE_HOST = new URL(BASE_URL).hostname;

test.describe("Accessibility - Subresource Health & Error Guard", () => {
  for (const { name, url } of PAGES) {
    test(`${name}: no pageerror + no same-origin subresource ≥500`, async ({
      page,
    }) => {
      const pageErrors = [];
      const failedSubresources = [];

      page.on("pageerror", (err) => pageErrors.push(err.message));
      page.on("response", (res) => {
        const rurl = res.url();
        let host;
        try {
          host = new URL(rurl).hostname;
        } catch {
          return;
        }
        if (host !== BASE_HOST) return; // ignore third-party
        if (rurl === url) return; // ignore the main document response (own status is asserted by page.goto)
        if (res.status() >= 500) {
          failedSubresources.push(`${res.status()} ${rurl}`);
        }
      });

      await safeGoto(page, url);
      // Small settle to let async subresource fetches complete
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});

      expect(
        pageErrors,
        `${name} threw uncaught JS errors: ${pageErrors.join(" | ")}`
      ).toEqual([]);
      expect(
        failedSubresources,
        `${name} loaded broken subresource(s): ${failedSubresources.join(" | ")}`
      ).toEqual([]);
    });
  }
});
