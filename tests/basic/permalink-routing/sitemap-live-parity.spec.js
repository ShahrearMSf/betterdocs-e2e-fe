// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const SAMPLE_PER_SUBSITEMAP = 3; // keep it fast; enough to catch systemic breakage

/**
 * Sitemap → live URL parity.
 *
 * Existing tests confirm wp-sitemap*.xml files are well-formed XML with
 * <loc> entries. This test goes further: it fetches the sub-sitemaps,
 * samples URLs from each, and HEAD-checks each URL returns 200.
 *
 * Catches: sitemap advertising URLs that 404 (stale sitemap after
 * category rename/delete, plugin regression producing bad slugs, etc.)
 */

async function fetchLocs(request, sitemapUrl) {
  const res = await request.get(sitemapUrl, { failOnStatusCode: false });
  if (res.status() !== 200) return [];
  const body = await res.text();
  return [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

test.describe("Permalink - Sitemap → Live URL Parity", () => {
  test("Sample URLs from each wp-sitemap sub-file resolve to 200", async ({
    request,
  }) => {
    // Get the top-level sitemap and its sub-sitemap URLs
    const subSitemaps = await fetchLocs(request, `${BASE_URL}/wp-sitemap.xml`);
    expect(subSitemaps.length).toBeGreaterThanOrEqual(1);

    const broken = [];
    for (const subUrl of subSitemaps) {
      const locs = await fetchLocs(request, subUrl);
      if (locs.length === 0) continue;
      // Sample up to N URLs (first, middle, last to catch pagination issues)
      const sample = [
        locs[0],
        locs[Math.floor(locs.length / 2)],
        locs[locs.length - 1],
      ].slice(0, SAMPLE_PER_SUBSITEMAP);

      for (const url of new Set(sample)) {
        const res = await request.get(url, {
          failOnStatusCode: false,
          timeout: 15000,
        });
        if (res.status() >= 400) {
          broken.push(`${res.status()} ${url} (from ${subUrl})`);
        }
      }
    }

    expect(
      broken,
      `Sitemap-advertised URLs returned 4xx/5xx:\n${broken.join("\n")}`
    ).toEqual([]);
  });
});
