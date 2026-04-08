// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test.describe("Docs Page - FAQ Interaction", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, `${BASE_URL}/docs/`);
  });

  test("FAQ section heading is visible", async ({ page }) => {
    const heading = page.locator(".betterdocs-faq-section-title");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Frequently Asked Questions");
  });

  test("FAQ groups are visible - Orders, Shipping, Refund, MSF", async ({ page }) => {
    const titles = page.locator(".betterdocs-faq-title-tag");
    await expect(titles).toHaveCount(4);

    await expect(titles.nth(0)).toHaveText("Orders");
    await expect(titles.nth(1)).toHaveText("Shipping & Delivery");
    await expect(titles.nth(2)).toHaveText("Refund & Exchange");
    await expect(titles.nth(3)).toHaveText("MSF");
  });

  test("Click FAQ question expands answer", async ({ page }) => {
    const firstQuestion = page.locator(".betterdocs-faq-group").first();
    const faqPost = firstQuestion.locator(".betterdocs-faq-post");

    // Initially not active
    await expect(firstQuestion).not.toHaveClass(/active/);

    // Click to expand
    await faqPost.click();
    await expect(firstQuestion).toHaveClass(/active/);
  });

  test("Click expanded FAQ question collapses answer", async ({ page }) => {
    const firstQuestion = page.locator(".betterdocs-faq-group").first();
    const faqPost = firstQuestion.locator(".betterdocs-faq-post");

    // Expand
    await faqPost.click();
    await expect(firstQuestion).toHaveClass(/active/);

    // Collapse
    await faqPost.click();
    await expect(firstQuestion).not.toHaveClass(/active/);
  });

  test("Multiple FAQ answers can be expanded simultaneously", async ({ page }) => {
    const faqGroups = page.locator(".betterdocs-faq-list").first().locator(".betterdocs-faq-group");

    // Click first question
    await faqGroups.nth(0).locator(".betterdocs-faq-post").click();
    await expect(faqGroups.nth(0)).toHaveClass(/active/);

    // Click second question - both should be expanded
    await faqGroups.nth(1).locator(".betterdocs-faq-post").click();
    await expect(faqGroups.nth(1)).toHaveClass(/active/);
    await expect(faqGroups.nth(0)).toHaveClass(/active/);
  });

  test("FAQ answer content is visible when expanded", async ({ page }) => {
    const firstGroup = page.locator(".betterdocs-faq-group").first();
    const faqPost = firstGroup.locator(".betterdocs-faq-post");
    const content = firstGroup.locator(".betterdocs-faq-main-content");

    await faqPost.click();
    await expect(content).toBeVisible();
  });
});
