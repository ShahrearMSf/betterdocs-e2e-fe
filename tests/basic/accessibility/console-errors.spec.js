// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../../helpers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.BASE_URL;

/**
 * Navigate and collect JS console errors. Ignores non-critical warnings and
 * known third-party noise (e.g. AI chatbot, analytics).
 */
async function collectConsoleErrors(page, url) {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      // Filter noisy third-party errors
      if (
        text.includes("cdnjs") ||
        text.includes("gstatic") ||
        text.includes("google") ||
        text.includes("favicon") ||
        text.includes("analytics") ||
        text.includes("chatbot") ||
        text.includes("betterdocs-ia")
      ) {
        return;
      }
      errors.push(text);
    }
  });
  await safeGoto(page, url);
  return errors;
}

test.describe("Accessibility - Console Errors on Key Pages", () => {
  const pagesToCheck = [
    { name: "Homepage", path: "/" },
    { name: "Docs page", path: "/docs/" },
    { name: "Encyclopedia page", path: "/encyclopedia/" },
    { name: "Single doc", path: "/docs/cricket-the-gentlemens-game/" },
    { name: "Single encyclopedia", path: "/encyclopedia/aesthetic/" },
  ];

  for (const { name, path: urlPath } of pagesToCheck) {
    test(`${name} has no critical JS console errors`, async ({ page }) => {
      const errors = await collectConsoleErrors(page, `${BASE_URL}${urlPath}`);
      expect(errors, `Errors on ${name}: ${errors.join(", ")}`).toHaveLength(0);
    });
  }
});
