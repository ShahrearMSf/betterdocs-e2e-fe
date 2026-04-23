// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;
const DOC_URL = `${BASE_URL}/docs/cricket-the-gentlemens-game/`;

test.describe("Single Doc - Reactions & Feedback", () => {
  test.beforeEach(async ({ page }) => {
    await safeGoto(page, DOC_URL);
  });

  test("Article reactions section is visible", async ({ page }) => {
    const reactions = page.locator(".betterdocs-article-reactions");
    await expect(reactions).toBeVisible();
  });

  test("Reaction links/buttons exist", async ({ page }) => {
    const reactionLinks = page.locator(".betterdocs-article-reaction-links");
    await expect(reactionLinks).toBeVisible();
  });

  test("Feedback form container is present", async ({ page }) => {
    const feedback = page.locator(".betterdocs-feedback-form, .feedback-form");
    await expect(feedback.first()).toBeVisible();
  });
});
