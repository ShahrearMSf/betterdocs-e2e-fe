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
 */

const DOCS_URL = `${BASE_URL_2}/docs/`;

/**
 * Open Instant Answer panel, switch to Chatbot tab, log in as guest, and
 * send one message. Local helper (does NOT wait for AI reply — the kebab is
 * available as soon as the user has sent a message).
 */
async function openChatbotWithMessage(page) {
  await safeGoto(page, DOCS_URL);
  // Open the IA launcher
  await page.locator(".betterdocs-ia-launcher").click({ force: true });
  await page.waitForTimeout(1000);
  // Switch to chatbot tab
  await page.locator(".betterdocs-ia-chatbot").click();
  await page.waitForTimeout(1000);
  // Guest login if the form is showing
  const guest = page.locator("a.continue-guest");
  if (await guest.isVisible().catch(() => false)) {
    await guest.click();
    await page.waitForTimeout(800);
  }
  // Send one message
  const msgInput = page.locator('input[placeholder="Type a message..."]');
  await expect(msgInput).toBeVisible({ timeout: 5000 });
  await msgInput.fill("hello");
  await msgInput.press("Enter");
  // Wait for kebab to appear (it renders once a message is sent)
  await expect(page.locator(".transcript-menu__trigger")).toBeVisible({
    timeout: 10000,
  });
}

test.describe("Chatbot Transcript Menu - Visibility & Structure", () => {
  test("Kebab (transcript-menu) trigger is visible after chat starts", async ({
    page,
  }) => {
    await openChatbotWithMessage(page);
    const kebab = page.locator(".transcript-menu__trigger");
    await expect(kebab).toBeVisible();
  });

  test("Kebab has accessible aria-label 'Transcript options'", async ({
    page,
  }) => {
    await openChatbotWithMessage(page);
    const kebab = page.locator(".transcript-menu__trigger");
    await expect(kebab).toHaveAttribute("aria-label", /transcript options/i);
  });

  test("Clicking kebab reveals all 3 expected menu options", async ({
    page,
  }) => {
    await openChatbotWithMessage(page);
    await page.locator(".transcript-menu__trigger").click();
    await expect(page.getByText("Download Transcript", { exact: false })).toBeVisible();
    await expect(page.getByText("Send Transcript", { exact: false })).toBeVisible();
    await expect(page.getByText("Start a New Chat", { exact: false })).toBeVisible();
  });
});

test.describe("Chatbot Transcript Menu - Download Transcript", () => {
  test("Download Transcript triggers a .txt file download", async ({
    page,
  }) => {
    await openChatbotWithMessage(page);
    await page.locator(".transcript-menu__trigger").click();

    const downloadPromise = page.waitForEvent("download", { timeout: 15000 });
    await page.getByText("Download Transcript", { exact: false }).click();
    const download = await downloadPromise;

    expect(download).toBeTruthy();
    const filename = download.suggestedFilename();
    // Expected pattern: chatbot-transcript-YYYY-MM-DD.txt (or similar)
    expect(filename).toMatch(/transcript.*\.(txt|log|json)$/i);
  });
});

test.describe("Chatbot Transcript Menu - Send Transcript", () => {
  test("Send Transcript opens email input form", async ({ page }) => {
    await openChatbotWithMessage(page);
    await page.locator(".transcript-menu__trigger").click();
    await page.getByText("Send Transcript", { exact: false }).click();

    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible();
  });

  test("Send Transcript email input has helpful placeholder", async ({
    page,
  }) => {
    await openChatbotWithMessage(page);
    await page.locator(".transcript-menu__trigger").click();
    await page.getByText("Send Transcript", { exact: false }).click();

    const emailInput = page.locator('input[type="email"]').first();
    const placeholder = await emailInput.getAttribute("placeholder");
    expect(placeholder).toBeTruthy();
    if (placeholder) expect(placeholder.toLowerCase()).toContain("email");
  });
});

test.describe("Chatbot Transcript Menu - Start a New Chat", () => {
  test("'Start a New Chat' option is present and clickable", async ({
    page,
  }) => {
    await openChatbotWithMessage(page);
    await page.locator(".transcript-menu__trigger").click();
    const startNew = page.getByText("Start a New Chat", { exact: false });
    await expect(startNew).toBeVisible();
    await expect(startNew).toBeEnabled();
  });

  test("Clicking 'Start a New Chat' does not throw a client-side error", async ({
    page,
  }) => {
    const jsErrors = [];
    page.on("pageerror", (err) => jsErrors.push(err.message));

    await openChatbotWithMessage(page);
    await page.locator(".transcript-menu__trigger").click();
    await page.getByText("Start a New Chat", { exact: false }).click();
    await page.waitForTimeout(1500);

    expect(jsErrors, `Client errors: ${jsErrors.join(" | ")}`).toEqual([]);
  });
});
