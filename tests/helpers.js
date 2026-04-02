// @ts-check
const { expect } = require("@playwright/test");

const DB_ERROR_TEXT = "Error establishing a database connection";
const DB_RETRY_WAIT_MS = 2 * 60 * 1000; // 2 minutes

const CHATBOT_THINKING_WAIT_MS = 60 * 1000; // 1 minute
const CHATBOT_ERROR_TEXT = "experiencing";

/**
 * Navigate to a URL with automatic retry on database connection errors.
 */
async function safeGoto(page, url) {
  const response = await page.goto(url, { timeout: 60000 }).catch(() => null);
  await page.waitForLoadState("domcontentloaded");

  const bodyText = await page.locator("body").innerText();
  if (bodyText.toLowerCase().includes(DB_ERROR_TEXT.toLowerCase())) {
    console.log(`DB connection error detected at ${url}. Waiting 2 minutes before retry...`);
    await page.waitForTimeout(DB_RETRY_WAIT_MS);
    await page.goto(url, { timeout: 60000 }).catch(() => null);
    await page.waitForLoadState("domcontentloaded");

    const retryText = await page.locator("body").innerText();
    expect(
      retryText.toLowerCase().includes(DB_ERROR_TEXT.toLowerCase()),
      `DB connection error persists at ${url} after retry`
    ).toBe(false);
  }
}

/**
 * Open the chatbot panel, login (email or guest), send a message, and wait for AI response.
 * Handles "thinking" status (waits up to 1 min) and technical errors (reloads + retries).
 *
 * @param {import("@playwright/test").Page} page - Must already be on a page with the IA widget
 * @param {string} message - The message to send
 * @param {object} [options]
 * @param {string} [options.email] - If provided, logs in with this email
 * @param {boolean} [options.guest] - If true, continues as guest
 * @returns {Promise<string>} Combined text of all received messages
 */
async function sendChatbotMessage(page, message, options = {}) {
  const openAndSend = async () => {
    // Wait for launcher and open IA panel
    const launcher = page.locator(".betterdocs-ia-launcher");
    await expect(launcher).toBeVisible({ timeout: 10000 });
    await launcher.click({ force: true });
    await page.waitForTimeout(1000);

    // Go to chatbot tab
    await page.locator(".betterdocs-ia-chatbot").click();
    await page.waitForTimeout(1500);

    // Login with email or continue as guest (skip if already logged in)
    const emailField = page.locator("input#email");
    const guestLink = page.locator("a.continue-guest");
    const isLoginVisible = await emailField.isVisible().catch(() => false);

    if (isLoginVisible) {
      if (options.email) {
        await emailField.fill(options.email);
        await emailField.press("Enter");
        await page.waitForTimeout(1500);
      } else {
        await guestLink.click();
        await page.waitForTimeout(1000);
      }
    }

    // Send message
    const msgInput = page.locator('input[placeholder="Type a message..."]');
    await expect(msgInput).toBeVisible({ timeout: 5000 });
    await msgInput.fill(message);
    await msgInput.press("Enter");

    // Wait for AI response — combined text must grow well beyond welcome message
    const received = page.locator(".message.received");
    await expect(async () => {
      const allText = await received.allInnerTexts();
      const combined = allText.join(" ");
      expect(combined.length).toBeGreaterThan(200);
    }).toPass({ timeout: CHATBOT_THINKING_WAIT_MS });

    const allText = await received.allInnerTexts();
    return allText.join(" ").toLowerCase();
  };

  // First attempt
  let result = await openAndSend();

  // If got technical error, reload page and retry once
  if (result.includes(CHATBOT_ERROR_TEXT)) {
    console.log(`Chatbot error detected for "${message}". Reloading and retrying...`);
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);
    result = await openAndSend();
  }

  return result;
}

/**
 * Check all links in the chatbot response area are not 404.
 * Opens each link in a new page (same context), checks the page loaded properly.
 *
 * @param {import("@playwright/test").Page} page
 * @param {import("@playwright/test").BrowserContext} context
 */
async function checkChatbotResponseLinks(page, context) {
  const received = page.locator(".message.received");
  const links = received.locator("a[href]");
  const count = await links.count();

  const hrefs = [];
  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute("href");
    if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
      hrefs.push(href);
    }
  }

  // Deduplicate
  const uniqueHrefs = [...new Set(hrefs)];

  for (const href of uniqueHrefs) {
    const newPage = await context.newPage();
    await newPage.goto(href, { waitUntil: "domcontentloaded", timeout: 30000 });

    const bodyText = await newPage.locator("body").innerText();
    const bodyLower = bodyText.toLowerCase();
    const is404 = bodyLower.includes("page not found") || (bodyLower.includes("404") && bodyLower.includes("not found"));

    expect(is404, `Link "${href}" returned a 404 page`).toBe(false);
    await newPage.close();
  }
}

module.exports = { safeGoto, sendChatbotMessage, checkChatbotResponseLinks };
