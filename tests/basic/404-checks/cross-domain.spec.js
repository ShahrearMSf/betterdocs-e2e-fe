// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

test.describe("404 Check - Cross-Domain Parity", () => {
  test("Cbotai - docs root", async ({ page }) => {
    await safeGoto(page, "https://cbotai.shahrear.site/docs/");
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("404");
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("Cbotai - encyclopedia prefix A", async ({ page }) => {
    await safeGoto(
      page,
      "https://cbotai.shahrear.site/encyclopedia/?encyclopedia_prefix=A"
    );
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("404");
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("MSF - encyclopedia root", async ({ page }) => {
    await safeGoto(
      page,
      "https://betterdocs.msf.shahrear.site/index.php/encyclopedia/"
    );
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("404");
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });

  test("MSF - docs search", async ({ page }) => {
    await safeGoto(
      page,
      "https://betterdocs.msf.shahrear.site/index.php/?s=test&post_type=docs"
    );
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
  });
});
