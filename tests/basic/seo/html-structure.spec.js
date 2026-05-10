// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

const KEY_PAGES = [
  { name: "Homepage", path: "/" },
  { name: "Docs page", path: "/docs/" },
  { name: "Encyclopedia page", path: "/encyclopedia/" },
  { name: "Single doc", path: "/docs/cricket-the-gentlemens-game/" },
];

test.describe("SEO - HTML Structure & Document Validity", () => {
  for (const { name, path: urlPath } of KEY_PAGES) {
    test(`${name} has HTML5 doctype`, async ({ page }) => {
      await safeGoto(page, `${BASE_URL}${urlPath}`);
      const doctype = await page.evaluate(() => {
        const dt = document.doctype;
        return dt ? dt.name : null;
      });
      expect(doctype).toBe("html");
    });

    test(`${name} has <html lang> attribute`, async ({ page }) => {
      await safeGoto(page, `${BASE_URL}${urlPath}`);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBeTruthy();
      if (lang) expect(lang.length).toBeGreaterThanOrEqual(2);
    });
  }

  test("Homepage has UTF-8 charset meta tag", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/`);
    const charset = await page
      .locator("meta[charset]")
      .first()
      .getAttribute("charset");
    expect(charset).toBeTruthy();
    if (charset) expect(charset.toUpperCase()).toBe("UTF-8");
  });
});
