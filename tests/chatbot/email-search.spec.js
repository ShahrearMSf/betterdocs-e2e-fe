// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto, sendChatbotMessage, checkChatbotResponseLinks } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Chatbot - Email Login Search", () => {
  test("Email login with msf@pro.automation is accepted", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);

    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
    await page.locator(".betterdocs-ia-chatbot").click();
    await page.waitForTimeout(1500);

    const emailInput = page.locator("input#email");
    await emailInput.fill("msf@pro.automation");
    await emailInput.press("Enter");
    await page.waitForTimeout(1500);

    const emailWrapper = page.locator(".email-field-wrapper");
    await expect(emailWrapper).not.toBeVisible();
  });

  test("Email user search 'Fencing' gets a response and links are valid", async ({ page, context }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);

    const response = await sendChatbotMessage(page, "Fencing", { email: "msf@pro.automation" });
    expect(response.length).toBeGreaterThan(200);

    // Verify response links don't lead to 404
    await checkChatbotResponseLinks(page, context);
  });

  test("Sent message 'Fencing' appears in chat", async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
    await page.waitForTimeout(2000);

    await page.locator(".betterdocs-ia-launcher").click({ force: true });
    await page.waitForTimeout(1000);
    await page.locator(".betterdocs-ia-chatbot").click();
    await page.waitForTimeout(1500);

    const emailInput = page.locator("input#email");
    await emailInput.fill("msf@pro.automation");
    await emailInput.press("Enter");
    await page.waitForTimeout(1500);

    const msgInput = page.locator('input[placeholder="Type a message..."]');
    await msgInput.fill("Fencing");
    await msgInput.press("Enter");

    const sentMessages = page.locator(".message.sent");
    await expect(sentMessages.last()).toContainText("Fencing");
  });
});
