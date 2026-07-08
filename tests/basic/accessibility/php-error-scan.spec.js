// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * PHP-error-leakage scan.
 *
 * Existing `console-errors.spec.js` only checks the browser JS console, so
 * PHP warnings/notices/deprecations rendered INLINE into the HTML body were
 * completely undetected. This test greps the rendered body of representative
 * pages for common PHP error prefixes and asserts none leak to end users.
 *
 * Cheapest, broadest safety net: catches ~any misconfigured error_reporting
 * or freshly introduced Fatal / Notice / Warning that ships to production.
 */

const PAGES = [
  { name: "Homepage", url: `${BASE_URL}/` },
  { name: "Docs archive", url: `${BASE_URL}/docs/` },
  { name: "Encyclopedia archive", url: `${BASE_URL}/encyclopedia/` },
  { name: "Category archive", url: `${BASE_URL}/docs/sports/` },
  { name: "Single doc", url: `${BASE_URL}/docs/cricket-the-gentlemens-game/` },
  {
    name: "Glossary doc",
    url: `${BASE_URL}/docs/qa-glossary-test-for-betterdocs/`,
  },
  { name: "Encyclopedia entry", url: `${BASE_URL}/encyclopedia/aesthetic/` },
];

const PHP_ERROR_PATTERNS = [
  "Fatal error",
  "Warning:",
  "Notice:",
  "Deprecated:",
  "Parse error",
  "property_exists(",
  "Uncaught Error",
  "Uncaught TypeError",
  "Stack trace:",
  "on line ",
];

test.describe("Accessibility - PHP Error Leakage Scan", () => {
  for (const { name, url } of PAGES) {
    test(`${name}: no PHP error strings in rendered HTML`, async ({
      page,
      request,
    }) => {
      // Fetch raw HTML (not innerText) — inline errors may sit outside the
      // rendered <body> visible text (e.g. in <p><b>Warning:</b>...</p>).
      const res = await request.get(url, {
        failOnStatusCode: false,
        timeout: 15000,
      });
      const html = await res.text();

      const leaked = PHP_ERROR_PATTERNS.filter((p) => html.includes(p));
      expect(
        leaked,
        `${name} (${url}) leaked PHP error strings: ${leaked.join(", ")}`
      ).toEqual([]);
    });
  }
});
