// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Instant Answer - Assets Tab", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);
    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
    await page.locator(".betterdocs-ia-tabs li").nth(3).click();
    await page.waitForTimeout(1000);
  });

  test("Assets tab becomes active on click", async ({ page }) => {
    const assetsTab = page.locator(".betterdocs-ia-tabs li").nth(3);
    await expect(assetsTab).toHaveClass(/active/);
  });

  test("Doc Categories section is visible", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("Doc Categories");
  });

  test("Category items are listed", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("Apple");
    await expect(wrapper).toContainText("Cricket");
    await expect(wrapper).toContainText("Developer");
  });

  test("Q&A section is visible with questions", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("Q&A");
    await expect(wrapper).toContainText("payment options");
  });
});
