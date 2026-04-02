// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Faq Sc 4 - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/faq-sc-4/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "FAQ SC 4" [level=1]
      - heading "Frequently Asked Questions" [level=2]
      - text: Orders Shipping & Delivery Refund & Exchange
      - img
      - text: MSF
      - list:
        - listitem:
          - paragraph: How do I cancel or change my order?
          - img
        - listitem:
          - paragraph: How to track my order?
          - img
        - listitem:
          - paragraph: What are my payment options?
          - img
          - paragraph: We accept all the popular payment methods such as PayPal, Visa, MasterCard, Discover, Amazon Pay, American Express and Google Pay.
      - paragraph:
        - strong: Customized
      - heading "Listen to Me" [level=2]
      - text: Shipping & Delivery
  `);
});
