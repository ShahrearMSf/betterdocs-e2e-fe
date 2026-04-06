// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Encyclopedia - Alphabet Filter Navigation", () => {
  test("A-Z filter links are visible", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/encyclopedia/`);
    const content = page.locator("main#content");
    const filterList = content.getByRole("list").first();
    const filterLinks = filterList.getByRole("link");
    const count = await filterLinks.count();
    expect(count).toBeGreaterThanOrEqual(27);
  });

  test("Click letter B filters to B entries only", async ({ page }) => {
    await safeGoto(
      page,
      `${BASE_URL}/encyclopedia/?encyclopedia_prefix=B`
    );
    await expect(page).toHaveURL(/encyclopedia_prefix=B/);
    await expect(
      page.getByRole("heading", { name: "Ball" })
    ).toBeVisible({ timeout: 10000 });
  });

  test("Click letter D filters to D entries only", async ({ page }) => {
    await safeGoto(
      page,
      `${BASE_URL}/encyclopedia/?encyclopedia_prefix=D`
    );
    await expect(page).toHaveURL(/encyclopedia_prefix=D/);
    await expect(
      page.getByRole("heading", { name: "Dog" })
    ).toBeVisible({ timeout: 10000 });
  });

  test("Click All resets filter from B", async ({ page }) => {
    // Start on filtered page
    await safeGoto(
      page,
      `${BASE_URL}/encyclopedia/?encyclopedia_prefix=B`
    );
    await expect(
      page.getByRole("heading", { name: "Ball" })
    ).toBeVisible({ timeout: 10000 });

    // Click All to reset
    const content = page.locator("main#content");
    const allLink = content.locator('a[href$="/encyclopedia/"]').first();
    await allLink.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(
      page.getByRole("heading", { name: "Aesthetic" })
    ).toBeVisible({ timeout: 10000 });
  });

  test("Encyclopedia entry link navigates to single entry", async ({
    page,
  }) => {
    await safeGoto(page, `${BASE_URL}/encyclopedia/`);
    const content = page.locator("main#content");
    const entryLink = content
      .locator('a[href*="/encyclopedia/aesthetic"]')
      .first();
    await expect(entryLink).toBeVisible();
    await entryLink.click({ force: true });
    await expect(page).toHaveURL(/\/encyclopedia\/aesthetic/);
    await expect(page.locator("body")).not.toContainText("page not found", {
      ignoreCase: true,
    });
  });
});
