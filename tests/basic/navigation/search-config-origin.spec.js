// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const BASE_URL_2 = process.env.BASE_URL_2;

/**
 * Regression guard for BetterDocs issue #84512 — cross-origin AJAX.
 *
 * The search widget ships `betterdocsSearchConfig.ajax_url` inline. If a
 * subdomain-migrated site inherits a stale ajax_url pointing at the wrong
 * origin, the live search silently fails (CORS blocks the XHR).
 *
 * The guarantee: ajax_url MUST be same-origin as the page — either
 * root-relative (starts with `/`) or an absolute URL on the same host.
 */

function assertAjaxUrlIsSameOrigin(scriptBody, pageOrigin) {
  const match = scriptBody.match(/"ajax_url"\s*:\s*"([^"]+)"/);
  expect(match, "betterdocsSearchConfig.ajax_url not found in page HTML").not.toBeNull();
  if (!match) return;
  const ajaxUrl = match[1].replace(/\\\//g, "/");
  if (ajaxUrl.startsWith("/")) return; // root-relative is fine
  const ajaxHost = new URL(ajaxUrl).host;
  const pageHost = new URL(pageOrigin).host;
  expect(
    ajaxHost,
    `ajax_url "${ajaxUrl}" is cross-origin — expected host ${pageHost}, got ${ajaxHost}`
  ).toBe(pageHost);
}

test.describe("Search Config - ajax_url same-origin guard (issue #84512)", () => {
  test("betteromation /docs/: ajax_url is same-origin", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    const html = await page.content();
    assertAjaxUrlIsSameOrigin(html, BASE_URL);
  });

  test("cbotai /docs/: ajax_url is same-origin", async ({ page }) => {
    await safeGoto(page, `${BASE_URL_2}/docs/`);
    const html = await page.content();
    assertAjaxUrlIsSameOrigin(html, BASE_URL_2);
  });
});
