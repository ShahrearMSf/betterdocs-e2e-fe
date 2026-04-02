// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Faq B Tab - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/faq-b-tab/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "FAQ B Tab" [level=1]
      - heading "FA Questions" [level=2]
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
      - heading "Include" [level=2]
      - heading "Frequently Asked Queries" [level=1]
      - img
      - text: MSF
      - heading "Exclude" [level=2]
      - heading "Frequently Asked Questions exclude MSF" [level=2]
      - text: Orders Shipping & Delivery Refund & Exchange
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
  `);
});
