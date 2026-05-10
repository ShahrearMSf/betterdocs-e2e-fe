// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

test.describe("Security - Headers & Access Control", () => {
  test("Homepage sends X-Frame-Options header (clickjacking defense)", async ({
    page,
  }) => {
    const response = await page.goto(`${BASE_URL}/`, { timeout: 30000 });
    const headers = response.headers();
    expect(headers["x-frame-options"]).toBeTruthy();
  });

  test("Homepage sends X-Content-Type-Options: nosniff", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/`, { timeout: 30000 });
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });

  test("/wp-admin/ redirects unauthenticated user to login", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/wp-admin/`, { timeout: 30000 });
    // After redirect, URL should contain wp-login.php
    expect(page.url()).toContain("wp-login.php");
  });

  test("WP REST API root (/wp-json/) is accessible", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/wp-json/`, {
      timeout: 30000,
    });
    expect(response.status()).toBe(200);
  });

  test("Comments RSS feed (/comments/feed/) returns 200", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/comments/feed/`, {
      timeout: 30000,
    });
    expect(response.status()).toBe(200);
  });
});
