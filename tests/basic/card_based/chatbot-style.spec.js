// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Chatbot Launcher Styling", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);
  });

  test("Launcher button is visible", async ({ page }) => {
    const launcher = page.locator(".betterdocs-ia-launcher");
    await expect(launcher).toBeVisible({ timeout: 10000 });
  });

  test("Launcher has correct background color", async ({ page }) => {
    const launcher = page.locator(".betterdocs-ia-launcher");
    await expect(launcher).toBeVisible({ timeout: 10000 });
    const bgColor = await launcher.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe("rgb(0, 182, 130)");
  });

  test("Launcher has circular shape", async ({ page }) => {
    const launcher = page.locator(".betterdocs-ia-launcher");
    await expect(launcher).toBeVisible({ timeout: 10000 });
    const borderRadius = await launcher.evaluate(el => window.getComputedStyle(el).borderRadius);
    expect(borderRadius).toBe("100%");
  });

  test("Launcher color changes on hover", async ({ page }) => {
    const launcher = page.locator(".betterdocs-ia-launcher");
    await expect(launcher).toBeVisible({ timeout: 10000 });

    const colorBefore = await launcher.evaluate(el => window.getComputedStyle(el).color);
    await launcher.hover();
    await page.waitForTimeout(500);
    const colorAfter = await launcher.evaluate(el => window.getComputedStyle(el).color);

    expect(colorAfter).toBe("rgb(255, 255, 255)");
  });

  test("Clicking launcher opens instant answer panel", async ({ page }) => {
    const launcher = page.locator(".betterdocs-ia-launcher");
    await expect(launcher).toBeVisible({ timeout: 10000 });
    await launcher.click({ force: true });
    await page.waitForTimeout(1000);

    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toBeVisible();
  });
});
