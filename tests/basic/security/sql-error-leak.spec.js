// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * SQL error-leak smoke test on public endpoints.
 *
 * Sends benign injection markers to the public search + BetterDocs REST
 * endpoints and asserts the response is stable (no DB / PHP error signature
 * leaks). Frontend-observable guard for the class of bug that recently
 * shipped as a CVE.
 */

const INJECTION_MARKERS = ["'", "1' OR '1'='1", "'; DROP TABLE--"];

const ENDPOINTS = [
  { name: "WP search (?s=)", template: (payload) => `${BASE_URL}/?s=${encodeURIComponent(payload)}` },
  {
    name: "BetterDocs REST search",
    template: (payload) =>
      `${BASE_URL}/wp-json/betterdocs/v1/search?keyword=${encodeURIComponent(payload)}`,
  },
];

const ERROR_SIGNATURES = [
  "SQL syntax",
  "mysqli",
  "wpdb",
  "Fatal error",
  "Warning:",
  "Uncaught",
  "sql_query",
  "You have an error in your SQL",
];

test.describe("Security - SQL Error Leak Smoke", () => {
  for (const endpoint of ENDPOINTS) {
    for (const marker of INJECTION_MARKERS) {
      test(`${endpoint.name} handles "${marker}" without leaking DB internals`, async ({
        request,
      }) => {
        const url = endpoint.template(marker);
        const res = await request.get(url, {
          failOnStatusCode: false,
          timeout: 15000,
        });
        expect(res.status()).toBeLessThan(500);
        const body = await res.text();
        const leaked = ERROR_SIGNATURES.filter((s) => body.includes(s));
        expect(
          leaked,
          `${endpoint.name} with "${marker}" leaked: ${leaked.join(", ")}`
        ).toEqual([]);
      });
    }
  }
});
