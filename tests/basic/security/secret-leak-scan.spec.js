// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Secret / credential leak scan.
 *
 * Loads representative frontend pages and asserts the rendered HTML +
 * inline <script> localized settings expose NONE of:
 *   - OpenAI-shaped keys (`sk-` followed by 40+ alphanumerics/dashes)
 *   - Common secret keys (`api_key`, `api_secret`, `license_key`,
 *     `access_token`, `autowrite_api_key`)
 *   - A full `betterdocs_settings` blob dump
 *
 * Guards against a real regression class: settings/secret values
 * accidentally reaching `wp_localize_script()` or `wp_add_inline_script()`.
 */

const PAGES = [
  { name: "Homepage", url: `${BASE_URL}/` },
  { name: "Docs archive", url: `${BASE_URL}/docs/` },
  { name: "Encyclopedia archive", url: `${BASE_URL}/encyclopedia/` },
  { name: "Category archive", url: `${BASE_URL}/docs/sports/` },
  { name: "Single doc", url: `${BASE_URL}/docs/cricket-the-gentlemens-game/` },
  {
    name: "FAQ-heavy doc",
    url: `${BASE_URL}/docs/qa-glossary-test-for-betterdocs/`,
  },
];

// Regexes are strict on purpose to avoid false-positives from CSS class
// names that happen to contain substrings like "sk-".
const SECRET_PATTERNS = [
  // OpenAI-style keys: sk- (and sk-proj-) followed by 40+ base62 chars
  { name: "OpenAI-style key", re: /\bsk-[A-Za-z0-9_-]{40,}\b/ },
  // Anthropic (Claude) API keys: sk-ant-api03-... typically ~95 chars
  { name: "Anthropic (Claude) key", re: /\bsk-ant-(?:api\d{2}-)?[A-Za-z0-9_-]{40,}\b/ },
  // Google API keys (Gemini and other Google APIs): AIza + 35 chars
  { name: "Google API key (Gemini)", re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  // Google OAuth 2.0 authorization/refresh tokens: begin "1//" or "AQ."
  {
    name: "Google OAuth token (AQ.)",
    re: /\bAQ\.[A-Za-z0-9_-]{20,}\b/,
  },
  { name: "Google OAuth refresh token", re: /\b1\/\/0[A-Za-z0-9_-]{40,}\b/ },
  // Explicit key names with a non-empty value assigned
  { name: "api_key with value", re: /"api_key"\s*:\s*"[^"]{8,}"/i },
  { name: "api_secret with value", re: /"api_secret"\s*:\s*"[^"]{8,}"/i },
  { name: "license_key with value", re: /"license_key"\s*:\s*"[^"]{8,}"/i },
  { name: "access_token with value", re: /"access_token"\s*:\s*"[^"]{8,}"/i },
  {
    name: "autowrite_api_key with value",
    re: /"autowrite_api_key"\s*:\s*"[^"]{8,}"/i,
  },
  // AWS-style access keys
  { name: "AWS-style secret", re: /AKIA[0-9A-Z]{16}/ },
];

test.describe("Security - Frontend Secret / Credential Leak Scan", () => {
  for (const { name, url } of PAGES) {
    test(`${name}: no secrets/tokens leaked in HTML or inline scripts`, async ({
      request,
    }) => {
      const res = await request.get(url, {
        failOnStatusCode: false,
        timeout: 15000,
      });
      const html = await res.text();

      const hits = SECRET_PATTERNS.filter((p) => p.re.test(html)).map(
        (p) => p.name
      );
      expect(
        hits,
        `${name} (${url}) may leak secrets: ${hits.join(", ")}`
      ).toEqual([]);
    });
  }
});
