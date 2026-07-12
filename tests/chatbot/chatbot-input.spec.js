// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Chatbot input send behaviors — focused on send flow correctness.
 *
 * Complements existing chatbot-ui.spec.js which asserts the input placeholder
 * and send button ARE visible. This file asserts what happens WHEN you send.
 *
 * All tests run on betteromation (stable). Guest login is used to reach the
 * message input quickly.
 */

async function openChatbotAsGuest(page) {
  await safeGoto(page, `${BASE_URL}/docs/`);
  await page.locator(".betterdocs-ia-launcher").click({ force: true });
  await page.waitForTimeout(800);
  await page.locator(".betterdocs-ia-chatbot").click();
  await page.waitForTimeout(800);
  const guest = page.locator("a.continue-guest");
  if (await guest.isVisible().catch(() => false)) {
    await guest.click();
    await page.waitForTimeout(800);
  }
  const input = page.locator('input[placeholder="Type a message..."]');
  await expect(input).toBeVisible({ timeout: 5000 });
  return input;
}

test.describe("Chatbot Input - Send Behaviors", () => {
  test("Empty input + Enter does NOT create a sent message", async ({
    page,
  }) => {
    const input = await openChatbotAsGuest(page);
    const before = await page.locator(".message.sent").count();
    await input.press("Enter");
    await page.waitForTimeout(500);
    const after = await page.locator(".message.sent").count();
    expect(after).toBe(before);
  });

  test("Enter key sends the typed message", async ({ page }) => {
    const input = await openChatbotAsGuest(page);
    const before = await page.locator(".message.sent").count();
    await input.fill("hello via enter");
    await input.press("Enter");
    await page.waitForTimeout(1000);
    const after = await page.locator(".message.sent").count();
    expect(after).toBe(before + 1);
    // Sent message should contain the typed text
    const sentText = await page
      .locator(".message.sent .query")
      .last()
      .innerText();
    expect(sentText.toLowerCase()).toContain("hello via enter");
  });

  test("Send button click also sends the typed message", async ({ page }) => {
    const input = await openChatbotAsGuest(page);
    const sendBtn = page.locator(".message-input button").first();
    await expect(sendBtn).toBeVisible();
    await input.fill("hello via button");
    await sendBtn.click();
    await page.waitForTimeout(1000);
    const sentText = await page
      .locator(".message.sent .query")
      .last()
      .innerText();
    expect(sentText.toLowerCase()).toContain("hello via button");
  });

  test("Input clears after successful send", async ({ page }) => {
    const input = await openChatbotAsGuest(page);
    await input.fill("clear me after");
    await input.press("Enter");
    await page.waitForTimeout(800);
    const value = await input.inputValue();
    expect(value).toBe("");
  });

  test("Whitespace-only input does NOT create a sent message", async ({
    page,
  }) => {
    const input = await openChatbotAsGuest(page);
    const before = await page.locator(".message.sent").count();
    await input.fill("   ");
    await input.press("Enter");
    await page.waitForTimeout(500);
    const after = await page.locator(".message.sent").count();
    expect(after).toBe(before);
  });
});

/**
 * Chatbot AI-degradation guard.
 *
 * When the upstream provider (OpenAI / Claude / Gemini / etc.) fails, the
 * chatbot must show a friendly fallback — NOT the raw provider error text.
 * We send a message, wait for a reply, and assert the received bubble text
 * contains no known provider-error markers.
 */

const PROVIDER_ERROR_MARKERS = [
  "Request had invalid authentication credentials",
  "invalid authentication",
  "RESOURCE_EXHAUSTED",
  "insufficient_quota",
  "API key not valid",
  "PERMISSION_DENIED",
  "quota exceeded",
  "AuthenticationError",
  "openai.error",
  "anthropic",
];

test.describe("Chatbot - Provider Error Leak Guard", () => {
  test("AI reply text never leaks raw provider-error strings", async ({
    page,
  }) => {
    const input = await openChatbotAsGuest(page);
    await input.fill("what is life");
    await input.press("Enter");

    // Wait for at least one AI reply bubble (up to 60s — matches existing helper)
    const received = page.locator(".message.received");
    await expect(async () => {
      const count = await received.count();
      expect(count).toBeGreaterThan(1); // welcome + at least one reply
    }).toPass({ timeout: 60000 });

    const all = (await received.allInnerTexts()).join(" ");
    const leaked = PROVIDER_ERROR_MARKERS.filter((m) =>
      all.toLowerCase().includes(m.toLowerCase())
    );
    expect(
      leaked,
      `Chatbot leaked provider error to visitor: ${leaked.join(", ")}`
    ).toEqual([]);
  });
});
