// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * RSS feed body-content validation.
 *
 * `feed-permalinks.spec.js` covers status codes and that main feed body
 * starts with <?xml + <rss. This file goes one step deeper: parses the
 * feed content to assert structural completeness across main + docs feeds.
 */

const FEEDS = [
  { name: "Main site RSS feed", url: "/feed/" },
  { name: "Docs feed", url: "/docs/feed/" },
  { name: "Doc category feed (sports)", url: "/docs/sports/feed/" },
];

test.describe("Permalink - RSS Feed Body Content", () => {
  for (const { name, url } of FEEDS) {
    test(`${name} body contains valid <rss><channel><title>`, async ({
      request,
    }) => {
      const res = await request.get(`${BASE_URL}${url}`);
      expect(res.status()).toBe(200);
      const body = await res.text();
      // Must be RSS envelope with a channel + at least one title tag
      expect(body).toContain("<rss");
      expect(body).toContain("<channel");
      expect(body).toContain("<title");
      // Content-type should identify as XML (not text/html misconfig)
      const ct = res.headers()["content-type"] || "";
      expect(ct).toMatch(/xml/i);
    });
  }
});
