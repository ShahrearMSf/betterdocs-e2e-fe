// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Permalink - Legacy ?p= / ?page_id= Redirects", () => {
  test("?p=1 redirects to friendly post URL", async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/?p=1`, { timeout: 30000 });
    expect(res.status()).toBe(200);
    // Should redirect away from /?p=1 to a friendly URL
    expect(page.url()).not.toContain("?p=1");
    expect(page.url()).not.toBe(`${BASE_URL}/?p=1`);
  });

  test("?page_id=2 redirects to friendly page URL", async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/?page_id=2`, { timeout: 30000 });
    expect(res.status()).toBe(200);
    expect(page.url()).not.toContain("?page_id=2");
  });
});

test.describe("Permalink - Multi-Page & Encyclopedia Pagination", () => {
  test("Single doc /page/2/ resolves (multi-page doc support)", async ({
    page,
  }) => {
    const res = await page.goto(
      `${BASE_URL}/docs/cricket-the-gentlemens-game/page/2/`,
      { timeout: 30000 }
    );
    expect(res.status()).toBe(200);
  });

  test("Encyclopedia /page/2/ paginates correctly", async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/encyclopedia/page/2/`, {
      timeout: 30000,
    });
    expect(res.status()).toBe(200);
    const title = await page.title();
    expect(title.toLowerCase()).toContain("page 2");
  });

  test("Docs page accepts ?paged= query parameter", async ({ page }) => {
    const res = await page.goto(
      `${BASE_URL}/docs/cricket-the-gentlemens-game/?paged=2`,
      { timeout: 30000 }
    );
    expect(res.status()).toBe(200);
  });
});
