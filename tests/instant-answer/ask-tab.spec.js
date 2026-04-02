// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Instant Answer - Query Tab", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);
    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
    await page.locator(".betterdocs-ia-tabs li").nth(2).click();
    await page.waitForTimeout(1000);
  });

  test("Query tab shows header text", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("Need help? Shoot us a query.");
  });

  test("Response time info is shown", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("MSF typically respond within 24-48 hours");
  });

  test("Email Address field is visible", async ({ page }) => {
    const inputs = page.locator("input.ia-input");
    await expect(inputs.nth(0)).toBeVisible();
  });

  test("Name field is visible", async ({ page }) => {
    const inputs = page.locator("input.ia-input");
    await expect(inputs.nth(1)).toBeVisible();
  });

  test("Subject field is visible", async ({ page }) => {
    const inputs = page.locator("input.ia-input");
    await expect(inputs.nth(2)).toBeVisible();
  });

  test("Message textarea is visible", async ({ page }) => {
    const textarea = page.locator("textarea.ia-message");
    await expect(textarea).toBeVisible();
  });

  test("File upload area is visible", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("Click To Upload Or Drag and Drop");
  });

  test("Send button is visible", async ({ page }) => {
    const sendBtn = page.locator("button").filter({ hasText: "Send" });
    await expect(sendBtn).toBeVisible();
  });
});
