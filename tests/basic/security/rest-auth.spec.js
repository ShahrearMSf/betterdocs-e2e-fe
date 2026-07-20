// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * REST auth guards for privileged BetterDocs endpoints.
 *
 * These endpoints must reject unauthenticated calls to prevent data leaks
 * and unauthorized writes. Guards SM-09 and SM-10 from the smoke suite.
 */

test.describe("Security - BetterDocs REST Auth", () => {
  test("Analytics overview endpoint rejects unauth requests (no data leak)", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL}/wp-json/betterdocs/v1/overview`,
      { failOnStatusCode: false }
    );
    // Should be 401 (unauthorized). Body should not contain analytics data.
    expect(res.status()).toBe(401);
    const body = await res.text();
    // Common analytics field names that would indicate a leak
    expect(body.toLowerCase()).not.toContain("total_views");
    expect(body.toLowerCase()).not.toContain("total_reactions");
  });

  test("Feedback ingest POST rejects requests without a valid nonce", async ({
    request,
  }) => {
    // POST without nonce header must be rejected (4xx). This is the nonce
    // regression guard — a missing/bad nonce must never be treated as valid.
    const res = await request.post(
      `${BASE_URL}/wp-json/betterdocs/v1/feedback/17`,
      { failOnStatusCode: false, data: { reaction: "up" } }
    );
    expect(res.status(), `Expected 4xx rejection, got ${res.status()}`).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(500);
  });
});
