// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto, sendChatbotMessage, checkChatbotResponseLinks } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Chatbot - Guest Mode", () => {
  test("Guest can login and type a message", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);

    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
    await page.locator(".betterdocs-ia-chatbot").click();
    await page.waitForTimeout(1500);
    await page.locator("a.continue-guest").click();
    await page.waitForTimeout(1000);

    const msgInput = page.locator('input[placeholder="Type a message..."]');
    await msgInput.fill("Orange");
    await msgInput.press("Enter");

    const sentMessages = page.locator(".message.sent");
    await expect(sentMessages.last()).toContainText("Orange");
  });

  test("Guest search 'Orange' gets a response and links are valid", async ({ page, context }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);

    const response = await sendChatbotMessage(page, "Orange", { guest: true });
    expect(response.length).toBeGreaterThan(200);

    await checkChatbotResponseLinks(page, context);
  });
});
