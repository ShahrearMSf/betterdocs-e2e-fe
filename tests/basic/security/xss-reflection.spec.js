// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * XSS reflection guard.
 *
 * Sends malicious payloads through common reflection surfaces (search
 * query, 404 slug) and asserts:
 *   1. Response is stable (2xx or 4xx, not 5xx)
 *   2. Raw `<script>` tag is NOT reflected into the body
 *   3. Payload appears escaped (`&lt;script&gt;`) — proving the sink is
 *      encoding, not just silently dropping the input
 *
 * Guards against injection reflection regressions (CVE-2026-15104 class).
 */

const PAYLOAD_QUERY = '"><script>alert(1)</script>';
const PAYLOAD_QUERY_ENCODED = encodeURIComponent(PAYLOAD_QUERY);
const PAYLOAD_SLUG = "%22%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E"; // in URL path

test.describe("Security - XSS Reflection Guard", () => {
  test("Search query with <script> payload is HTML-escaped, not reflected raw", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL}/?s=${PAYLOAD_QUERY_ENCODED}`,
      { failOnStatusCode: false, timeout: 15000 }
    );
    expect(res.status(), "Search returned 5xx").toBeLessThan(500);
    const html = await res.text();

    // Raw executable payload must NOT appear
    expect(html).not.toContain("<script>alert(1)</script>");
    // Encoded form should appear somewhere (proves the input was accepted and
    // escaped, not silently discarded)
    expect(html).toContain("&lt;script&gt;");
  });

  test("404 slug with <script> payload does not reflect executable HTML", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL}/docs/${PAYLOAD_SLUG}/`,
      { failOnStatusCode: false, timeout: 15000 }
    );
    // Expected: 404. Regardless, must not be 5xx and must not reflect raw
    expect(res.status()).toBeLessThan(500);
    const html = await res.text();
    expect(html).not.toContain("<script>alert(1)</script>");
  });

  test("XSS-payload response contains no PHP/SQL error signature", async ({
    request,
  }) => {
    // A page that survives injection should NOT leak DB / PHP internals
    const res = await request.get(
      `${BASE_URL}/?s=${PAYLOAD_QUERY_ENCODED}`,
      { failOnStatusCode: false, timeout: 15000 }
    );
    const html = await res.text();
    const forbidden = [
      "SQL syntax",
      "mysqli",
      "wpdb",
      "Fatal error",
      "Warning:",
      "Uncaught",
    ];
    const leaked = forbidden.filter((s) => html.includes(s));
    expect(
      leaked,
      `Injection response leaked internals: ${leaked.join(", ")}`
    ).toEqual([]);
  });
});
