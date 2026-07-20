// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const BASE_URL_2 = process.env.BASE_URL_2;

/**
 * Chatbot backend wiring on cbotai (SM-12, SM-13).
 *
 * Guards:
 *   - CORS preflight on the chatbot query endpoint (cross-domain widget alive)
 *   - Doc page ships the `betterdocsAIChatbot` localized config
 *     (proves the widget script is enqueued and configured)
 */

test.describe("Chatbot - Backend Wiring", () => {
  test("Chatbot query endpoint CORS preflight succeeds", async ({
    request,
  }) => {
    const res = await request.fetch(
      `${BASE_URL_2}/wp-json/betterdocs-pro/v1/query-post`,
      {
        method: "OPTIONS",
        headers: {
          Origin: "https://x.test",
          "Access-Control-Request-Method": "POST",
        },
        failOnStatusCode: false,
      }
    );
    expect(res.status()).toBe(200);
    const acao = res.headers()["access-control-allow-origin"];
    // Must reflect the origin (or be a wildcard) — either way, CORS is alive
    expect(acao, "No Access-Control-Allow-Origin header").toBeTruthy();
  });

  test("Docs page ships the betterdocsAIChatbot localized config", async ({
    request,
  }) => {
    const res = await request.get(`${BASE_URL_2}/docs/`);
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(
      html,
      "betterdocsAIChatbot localized config not found in page source"
    ).toContain("betterdocsAIChatbot");
  });
});
