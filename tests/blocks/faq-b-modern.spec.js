// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Faq B Modern - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/faq-b-modern/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "FAQ B Modern" [level=1]
      - text: Updated on February 1, 2026
      - heading "Frequently Asked Queries Include 2" [level=2]
      - heading "Orders" [level=3]
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
      - heading "Refund & Exchange" [level=3]
      - list:
        - listitem:
          - paragraph: How long does it take to get the Refund?
          - img
          - list:
            - listitem: Once we receive your return, please allow us 3-5 business days for your refund to process.
            - listitem: Refund amount will be automatically debited to the same form of payment originally used for purchase.
            - listitem:
              - img "😃"
            - listitem:
              - link "Refund amount will be automatically debited to the same form of payment originally used for purchase":
                - /url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
        - listitem:
          - paragraph: How do I track my Refund?
          - img
        - listitem:
          - paragraph: What is your Refund & Exchange Policy?
          - img
      - heading "Exclude" [level=2]
      - heading "Frequently Asked Questions Include MSF" [level=1]
      - heading "Shipping & Delivery" [level=2]
      - list:
        - listitem:
          - img
          - paragraph: Do you ship overseas?
        - listitem:
          - img
          - paragraph: Do you offer free shipping?
        - listitem:
          - img
          - paragraph: How long does the delivery take?
      - heading "MSF" [level=2]
      - list:
        - listitem:
          - img
          - paragraph: What is the minimum order requirement?
          - heading "The minimum order requirement is the lowest quantity of items or products that must be purchased in a single order." [level=1]
          - paragraph:
            - strong:
              - emphasis:
                - insertion: This requirement helps to ensure that orders are worth processing and fulfill the operational needs of the business. Minimum order requirements vary depending on the supplier or retailer, and they are typically specified on the product listing or during the checkout process.
          - paragraph:
            - code:
              - deletion: Be sure to review the minimum order requirement before placing your order to avoid any issues.
        - listitem:
          - img
          - paragraph: What is the expiration date of perfume?
          - paragraph:
            - strong: Perfumes typically do not have a set expiration date like food products do. When stored properly in a cool, dry place away from direct sunlight and extreme temperatures, perfumes can last for several years. However, over time, the scent profile of a perfume may change or weaken. It’s a good practice to use perfumes within 1-2 years of opening to ensure optimal fragrance quality. Additionally, check for
  `);
});
