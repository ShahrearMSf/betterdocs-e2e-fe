// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Instant Answer - Chatbot Tab", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);
    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
    await page.locator(".betterdocs-ia-chatbot").click();
    await page.waitForTimeout(1500);
  });

  test("Chatbot tab becomes active on click", async ({ page }) => {
    const chatbotTab = page.locator(".betterdocs-ia-chatbot");
    await expect(chatbotTab).toHaveClass(/active/);
  });

  test("Response time info is displayed", async ({ page }) => {
    const wrapper = page.locator(".betterdocs-ia-main-wrapper");
    await expect(wrapper).toContainText("MSF typically replies");
  });

  test("Welcome message is displayed", async ({ page }) => {
    const messages = page.locator(".message.received");
    await expect(messages.first()).toContainText("welcome to the kingdom of MSF");
  });

  test("Welcome message mentions Shahrear", async ({ page }) => {
    const messages = page.locator(".message.received");
    await expect(messages.first()).toContainText("Shahrear");
  });

  test("Email input field is visible", async ({ page }) => {
    const emailInput = page.locator("input#email");
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("placeholder", "Enter your email");
  });

  test("Continue as Guest link is visible", async ({ page }) => {
    const guestLink = page.locator("a.continue-guest");
    await expect(guestLink).toBeVisible();
    await expect(guestLink).toHaveText("Continue as a Guest");
  });

  test("Message input field is visible", async ({ page }) => {
    const msgInput = page.locator('input[placeholder="Type a message..."]');
    await expect(msgInput).toBeVisible();
  });

  test("Email field disappears after entering email", async ({ page }) => {
    const emailInput = page.locator("input#email");
    await emailInput.fill("test@example.com");
    await emailInput.press("Enter");
    await page.waitForTimeout(1500);

    const emailWrapper = page.locator(".email-field-wrapper");
    await expect(emailWrapper).not.toBeVisible();
  });

  test("Guest mode hides email field", async ({ page }) => {
    await page.locator("a.continue-guest").click();
    await page.waitForTimeout(1000);

    const emailWrapper = page.locator(".email-field-wrapper");
    await expect(emailWrapper).not.toBeVisible();
  });
});
