// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

const FEEDS = [
  { name: "Main site RSS feed", url: "/feed/" },
  { name: "Atom feed", url: "/feed/atom/" },
  { name: "RSS2 feed", url: "/feed/rss2/" },
  { name: "Docs feed", url: "/docs/feed/" },
  { name: "Doc category feed (sports)", url: "/docs/sports/feed/" },
];

test.describe("Permalink - Feed URLs", () => {
  for (const { name, url } of FEEDS) {
    test(`${name} (${url}) returns 200`, async ({ request }) => {
      const res = await request.get(`${BASE_URL}${url}`);
      expect(res.status()).toBe(200);
    });
  }

  test("Main RSS feed returns XML content", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/feed/`);
    const body = await res.text();
    expect(body.startsWith("<?xml")).toBe(true);
    expect(body).toContain("<rss");
  });
});
