const { nvdaTest: test } = require("@guidepup/playwright");
const { expect } = require("@playwright/test");

const BASE_URL = "https://frontrange.edu";

async function loadPage(page, nvda, path = "") {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: "load" });
  await expect(page.locator("#header")).toBeVisible();
  await nvda.navigateToWebContent();
}

async function navigateTo(nvda, target, command, maxSteps = 80) {
  for (let i = 0; i < maxSteps; i++) {
    if ((await nvda.itemText()).includes(target)) return;
    await nvda.perform(command);
  }
}

test.describe("Front Range Navigation - NVDA", () => {
  test("can find the skip to main content link", async ({ page, nvda }) => {
    await loadPage(page, nvda);

    await navigateTo(nvda, "Skip to main content", nvda.keyboardCommands.findNextLink);
    expect(await nvda.itemText()).toContain("Skip to main content");
  });

  test("can find the FRCC home page logo link", async ({ page, nvda }) => {
    await loadPage(page, nvda);

    await navigateTo(nvda, "Front Range Community College home page", nvda.keyboardCommands.findNextLink);
    expect(await nvda.itemText()).toContain("Front Range Community College home page");
  });

  test("can open About FRCC dropdown and reach Contact Us", async ({ page, nvda }) => {
    await loadPage(page, nvda);

    await navigateTo(nvda, "About FRCC", nvda.keyboardCommands.findNextControl);
    await nvda.act();

    await navigateTo(nvda, "Contact Us", nvda.keyboardCommands.findNextLink);
    expect(await nvda.itemText()).toContain("Contact Us");
  });
});
