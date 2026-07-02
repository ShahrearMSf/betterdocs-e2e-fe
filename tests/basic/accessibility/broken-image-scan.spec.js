// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Broken-image scan.
 *
 * Walks every <img src> on a set of representative pages, HEAD-requests each
 * unique src, and asserts none return 404. Catches deleted media library
 * uploads, CDN misconfigs, dead editor-embedded images.
 *
 * Only checks pages that actually have <img> elements (homepage and
 * encyclopedia archive use CSS backgrounds, no <img>).
 */

const PAGES_WITH_IMAGES = [
  { name: "Docs archive", url: `${BASE_URL}/docs/` },
  { name: "Sports category archive", url: `${BASE_URL}/docs/sports/` },
  { name: "Single doc", url: `${BASE_URL}/docs/cricket-the-gentlemens-game/` },
  {
    name: "Glossary-embedded doc",
    url: `${BASE_URL}/docs/qa-glossary-test-for-betterdocs/`,
  },
];

test.describe("Accessibility - Broken Image Scan", () => {
  for (const { name, url } of PAGES_WITH_IMAGES) {
    test(`${name}: no <img src> returns 404`, async ({ page, request }) => {
      await safeGoto(page, url);

      // Collect every unique http(s) src on the page
      const srcs = await page
        .locator("img[src]")
        .evaluateAll((imgs) =>
          imgs.map((img) => img.getAttribute("src")).filter(Boolean)
        );
      const unique = [
        ...new Set(
          srcs.filter((s) => s && (s.startsWith("http://") || s.startsWith("https://")))
        ),
      ];

      // Skip test cleanly if the page has no absolute-URL images to check
      if (unique.length === 0) {
        test.skip(true, `No absolute-URL <img> found on ${url}`);
        return;
      }

      const broken = [];
      for (const src of unique) {
        const res = await request
          .get(src, { failOnStatusCode: false, timeout: 15000 })
          .catch(() => null);
        if (!res) {
          broken.push(`${src} — request failed`);
          continue;
        }
        if (res.status() === 404) {
          broken.push(`${src} → 404`);
        }
      }

      expect(broken, `Broken images on ${name}:\n${broken.join("\n")}`).toEqual(
        []
      );
    });
  }
});
