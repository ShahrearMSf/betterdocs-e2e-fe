// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Permalink - Structure & Redirects", () => {
  test("Missing trailing slash on single doc redirects to canonical URL", async ({
    page,
  }) => {
    const response = await page.goto(
      `${BASE_URL}/docs/cricket-the-gentlemens-game`,
      { timeout: 30000 }
    );
    expect(response.status()).toBe(200);
    // Final URL after redirect should end with trailing slash
    expect(page.url()).toBe(
      `${BASE_URL}/docs/cricket-the-gentlemens-game/`
    );
  });

  test("Query params (UTM) don't break single doc rendering", async ({
    page,
  }) => {
    const response = await page.goto(
      `${BASE_URL}/docs/cricket-the-gentlemens-game/?utm_source=email&utm_campaign=test`,
      { timeout: 30000 }
    );
    expect(response.status()).toBe(200);
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("Double forward slash in URL normalizes correctly", async ({ page }) => {
    const response = await page.goto(
      `${BASE_URL}/docs//cricket-the-gentlemens-game/`,
      { timeout: 30000 }
    );
    expect(response.status()).toBe(200);
    // Final URL should be the single-slash version
    expect(page.url()).toContain("/docs/cricket-the-gentlemens-game");
    expect(page.url()).not.toContain("//cricket");
  });
});

test.describe("Permalink - Category Archive Coverage", () => {
  const categories = [
    { slug: "sports", label: "Sports" },
    { slug: "fruits", label: "Fruits" },
    { slug: "team", label: "Team" },
    { slug: "qa", label: "Company/QA" },
  ];

  for (const { slug, label } of categories) {
    test(`/docs/${slug}/ category archive loads`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/docs/${slug}/`, {
        timeout: 30000,
      });
      expect(response.status()).toBe(200);
      const bodyText = await page.locator("body").innerText();
      expect(bodyText.toLowerCase(), `${label} category body`).not.toContain(
        "page not found"
      );
    });
  }
});

test.describe("Permalink - Encyclopedia Entry URLs", () => {
  const entries = ["aesthetic", "altruism", "ball", "cat", "dog"];

  for (const slug of entries) {
    test(`/encyclopedia/${slug}/ entry loads`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/encyclopedia/${slug}/`, {
        timeout: 30000,
      });
      expect(response.status()).toBe(200);
    });
  }
});
