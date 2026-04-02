// @ts-check
const { test, expect } = require("@playwright/test");
const { safeGoto } = require("../helpers");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

test("Feedback Form Sc - Snapshot", async ({ page }) => {
  await safeGoto(page, `${BASE_URL}/feedback-form-sc/`);
  const content = page.locator("main#content");
  await expect(content).toBeVisible({ timeout: 10000 });
  await expect(content).toMatchAriaSnapshot(`
    - main:
      - heading "Feedback Form SC" [level=1]
      - paragraph:
        - strong: Basic
      - paragraph:
        - text: "Name: *"
        - textbox "Name"
      - paragraph:
        - text: "Email: *"
        - textbox "Email"
      - paragraph:
        - text: "Message: *"
        - textbox "Message"
      - button "Submit": Send
      - paragraph:
        - strong: Customize
      - paragraph:
        - text: "Name: *"
        - textbox "Name"
      - paragraph:
        - text: "Email: *"
        - textbox "Email"
      - paragraph:
        - text: "Message: *"
        - textbox "Message"
      - button "Submit": TAB
  `);
});
