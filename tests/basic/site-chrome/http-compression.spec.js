// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * HTTP compression on key HTML responses.
 *
 * Every text/html response should be gzip/br compressed by the server or
 * CDN. A regression here (e.g. Nginx config drift) instantly doubles page
 * weight for every visitor.
 */

const PAGES = [
  { name: "Homepage", url: "/" },
  { name: "Docs archive", url: "/docs/" },
  { name: "Encyclopedia archive", url: "/encyclopedia/" },
  { name: "Single doc", url: "/docs/cricket-the-gentlemens-game/" },
];

test.describe("Site Chrome - HTTP Compression", () => {
  for (const { name, url } of PAGES) {
    test(`${name} response ships gzip or brotli`, async ({ request }) => {
      const res = await request.get(`${BASE_URL}${url}`, {
        headers: { "Accept-Encoding": "gzip, br" },
      });
      expect(res.status()).toBe(200);
      const encoding = res.headers()["content-encoding"] || "";
      expect(
        encoding.toLowerCase(),
        `${name} missing content-encoding header (got "${encoding}")`
      ).toMatch(/gzip|br|deflate/);
    });
  }
});
