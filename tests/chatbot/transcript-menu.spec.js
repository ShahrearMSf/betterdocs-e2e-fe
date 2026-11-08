// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const BASE_URL_2 = process.env.BASE_URL_2;

/**
 * Tests for the chatbot transcript-options kebab menu on cbotai.
 *
 * Flow: /docs/ → Instant Answer → Chatbot tab → guest login → send a message
 *        → click "..." (transcript-menu__trigger) in top-right of chatbot header
 *        → 3 options: Download Transcript, Send Transcript, Start a New Chat
 *
 * These tests target functional behavior only (visual layout issues in the
 * dropdown are known and intentionally out of scope).
 *
 * Note: mode:serial is required because transcript menu items (Download,
 * Send, Start-New) only render after the AI has fully replied, and the
 * cbotai server fails to enable them under concurrent session load.
 */

const DOCS_URL = `${BASE_URL_2}/docs/`;

/**
 * Open Instant Answer panel, switch to Chatbot tab, log in as guest, and
 * send one message. The kebab trigger is visible as soon as a message is sent.
 * "Download Transcript", "Send Transcript" and "Start a New Chat" only appear
 * in the menu AFTER the AI has replied, so use openChatbotWithReply() for
 * tests that need those items.
 */
async function openChatbotWithMessage(page) {
  await safeGoto(page, DOCS_URL);
  await page.locator(".betterdocs-ia-launcher").click({ force: true });
  await page.waitForTimeout(1000);
  await page.locator(".betterdocs-ia-chatbot").click();
  await page.waitForTimeout(1000);
  const guest = page.locator("a.continue-guest");
  if (await guest.isVisible().catch(() => false)) {
    await guest.click();
    await page.waitForTimeout(800);
  }
  const msgInput = page.locator('#betterdocs-ia textarea.composer-textarea');
  await expect(msgInput).toBeVisible({ timeout: 5000 });
  await msgInput.fill("hello");
  await msgInput.press("Enter");
  await expect(page.locator(".transcript-menu__trigger")).toBeVisible({
    timeout: 10000,
  });
}

/** Same as openChatbotWithMessage but also waits for the AI reply. */
async function openChatbotWithReply(page) {
  await openChatbotWithMessage(page);
  const received = page.locator('.message.received');
  await expect(async () => {
    expect(await received.count()).toBeGreaterThan(1);
  }).toPass({ timeout: 90000 });
  // Brief settle to allow UI state to propagate after AI reply
  await page.waitForTimeout(500);
}

test.describe("Chatbot Transcript Menu", () => {
  // Serial mode: transcript menu items only appear when the AI fully responds
  // per session; running tests concurrently causes the server to suppress them.
  test.describe.configure({ mode: "serial", timeout: 120000 });

  test.describe("Visibility & Structure", () => {
    test("Kebab (transcript-menu) trigger is visible after chat starts", async ({
      page,
    }) => {
      await openChatbotWithMessage(page);
      const kebab = page.locator(".transcript-menu__trigger");
      await expect(kebab).toBeVisible();
    });

    test("Kebab has accessible aria-label 'Chat options'", async ({
      page,
    }) => {
      await openChatbotWithMessage(page);
      const kebab = page.locator(".transcript-menu__trigger");
      await expect(kebab).toHaveAttribute("aria-label", /chat options/i);
    });

    test("Clicking kebab reveals all 4 expected menu options", async ({
      page,
    }) => {
      await openChatbotWithReply(page);
      await page.locator(".transcript-menu__trigger").click();
      await expect(page.getByText("Talk to a person", { exact: false })).toBeVisible({ timeout: 15000 });
      await expect(page.getByText("Download Transcript", { exact: false })).toBeVisible({ timeout: 15000 });
      await expect(page.getByText("Send Transcript", { exact: false })).toBeVisible({ timeout: 15000 });
      await expect(page.locator(".transcript-menu__item--new-chat")).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe("Download Transcript", () => {
    test("Download Transcript triggers a .txt file download", async ({
      page,
    }) => {
      await openChatbotWithReply(page);
      await page.locator(".transcript-menu__trigger").click();

      const downloadPromise = page.waitForEvent("download", { timeout: 15000 });
      await page.getByText("Download Transcript", { exact: false }).click({ timeout: 15000 });
      const download = await downloadPromise;

      expect(download).toBeTruthy();
      const filename = download.suggestedFilename();
      // Expected pattern: chatbot-transcript-YYYY-MM-DD.txt (or similar)
      expect(filename).toMatch(/transcript.*\.(txt|log|json)$/i);
    });
  });

  test.describe("Send Transcript", () => {
    test("Send Transcript opens email input form", async ({ page }) => {
      await openChatbotWithReply(page);
      await page.locator(".transcript-menu__trigger").click();
      await page.getByText("Send Transcript", { exact: false }).click({ timeout: 15000 });

      const emailInput = page.locator('input[type="email"]').first();
      await expect(emailInput).toBeVisible();
    });

    test("Send Transcript email input has helpful placeholder", async ({
      page,
    }) => {
      await openChatbotWithReply(page);
      await page.locator(".transcript-menu__trigger").click();
      await page.getByText("Send Transcript", { exact: false }).click({ timeout: 15000 });

      const emailInput = page.locator('input[type="email"]').first();
      const placeholder = await emailInput.getAttribute("placeholder");
      expect(placeholder).toBeTruthy();
      if (placeholder) expect(placeholder.toLowerCase()).toContain("email");
    });
  });

  test.describe("Start a New Chat", () => {
    test("'Start a New Chat' option is present and clickable", async ({
      page,
    }) => {
      await openChatbotWithReply(page);
      await page.locator(".transcript-menu__trigger").click();
      const startNew = page.locator(".transcript-menu__item--new-chat");
      await expect(startNew).toBeVisible({ timeout: 15000 });
      await expect(startNew).toBeEnabled();
    });

    test("Clicking 'Start a New Chat' does not throw a client-side error", async ({
      page,
    }) => {
      const jsErrors = [];
      page.on("pageerror", (err) => jsErrors.push(err.message));

      await openChatbotWithReply(page);
      await page.locator(".transcript-menu__trigger").click();
      await page.locator(".transcript-menu__item--new-chat").click({ timeout: 15000 });
      await page.waitForTimeout(1500);

      expect(jsErrors, `Client errors: ${jsErrors.join(" | ")}`).toEqual([]);
    });
  });
});
