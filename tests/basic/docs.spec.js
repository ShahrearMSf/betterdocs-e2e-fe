// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Docs - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/docs/`);
  const content = page.locator(".betterdocs-wrapper");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - img
    - text: Search... Search
    - link "betterdocs-category-icon Sports 5 Docs":
      - img "betterdocs-category-icon"
      - heading "Sports" [level=2]
      - text: 5 Docs
    - link "betterdocs-category-icon Fruits 7 Docs":
      - img "betterdocs-category-icon"
      - heading "Fruits" [level=2]
      - text: 7 Docs
    - link "betterdocs-category-icon Team 6 Docs":
      - img "betterdocs-category-icon"
      - heading "Team" [level=2]
      - text: 6 Docs
    - link "betterdocs-category-icon Company 2 Docs":
      - img "betterdocs-category-icon"
      - heading "Company" [level=2]
      - text: 2 Docs
    - heading "Frequently Asked Questions" [level=2]
    - heading "Orders" [level=2]
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
    - heading "Shipping & Delivery" [level=2]
    - list:
      - listitem:
        - paragraph: Do you ship overseas?
        - img
      - listitem:
        - paragraph: Do you offer free shipping?
        - img
      - listitem:
        - paragraph: How long does the delivery take?
        - img
    - heading "Refund & Exchange" [level=2]
    - list:
      - listitem:
        - paragraph: How long does it take to get the Refund?
        - img
        - list:
          - listitem: Once we receive your return, please allow us 3-5 business days for your refund to process.
          - listitem: Refund amount will be automatically debited to the same form of payment originally used for purchase.
      - listitem:
        - paragraph: How do I track my Refund?
        - img
      - listitem:
        - paragraph: What is your Refund & Exchange Policy?
        - img
    - heading "MSF" [level=2]
    - list:
      - listitem:
        - paragraph: What is the minimum order requirement?
        - img
      - listitem:
        - paragraph: What is the expiration date of perfume?
        - img
  `);
});
