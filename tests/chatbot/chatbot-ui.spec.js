// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Chatbot - UI Elements", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);
    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
    await page.locator(".betterdocs-ia-chatbot").click();
    await page.waitForTimeout(1500);
  });

  test("Chatbot header shows title", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("Chatbot");
  });

  test("Chatbot shows response time info", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("MSF typically replies");
  });

  test("Chatbot shows description text", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("better experience");
  });

  test("Welcome message is displayed with Shahrear", async ({ page }) => {
    const firstMessage = page.locator(".message.received").first();
    await expect(firstMessage).toContainText("kingdom of MSF");
    await expect(firstMessage).toContainText("Shahrear");
  });

  test("Message input placeholder is correct", async ({ page }) => {
    const msgInput = page.locator('input[placeholder="Type a message..."]');
    await expect(msgInput).toBeVisible();
  });

  test("Send button is present in chatbot", async ({ page }) => {
    const sendBtn = page.locator(".betterdocs-ia-main-wrapper button").last();
    await expect(sendBtn).toBeVisible();
  });

  test("Switching back to Home tab from Chatbot works", async ({ page }) => {
    await page.locator(".betterdocs-ia-home").click();
    await page.waitForTimeout(500);
    await expect(page.locator(".betterdocs-ia-home")).toHaveClass(/active/);
    await expect(page.locator(".betterdocs-ia-header-group")).toContainText("Get Instant Help");
  });
});
