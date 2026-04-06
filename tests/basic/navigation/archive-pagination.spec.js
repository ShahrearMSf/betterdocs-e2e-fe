// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Archive Doc List - Pagination Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/archive-doc-list-b-l1/`);
  });

  test("Pagination controls are visible", async ({ page }) => {
    const pagination = page.locator(".betterdocs-pagination, .page-numbers");
    await expect(pagination.first()).toBeVisible();
  });

  test("Click page 2 loads next set of docs", async ({ page }) => {
    await page
      .getByRole("link", { name: "2", exact: true })
      .first()
      .click();
    await expect(page).toHaveURL(/page\/2/);
    await expect(page.locator("body")).not.toContainText("page not found", {
      ignoreCase: true,
    });
  });

  test("Click next page arrow navigates forward", async ({ page }) => {
    const nextArrow = page.getByRole("link", { name: "❯" }).first();
    await expect(nextArrow).toBeVisible();
    await nextArrow.click();
    await expect(page).toHaveURL(/page\/2/);
  });

  test("Doc list link is clickable and loads correctly", async ({ page }) => {
    const firstDocLink = page
      .locator("main#content")
      .getByRole("link", { name: "Fencing" })
      .first();
    await expect(firstDocLink).toBeVisible();
    await firstDocLink.click();
    await expect(page).toHaveURL(/\/docs\/fencing/);
    await expect(page.locator("body")).not.toContainText("page not found", {
      ignoreCase: true,
    });
  });
});
