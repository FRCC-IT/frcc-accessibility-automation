const { voiceOverTest: test } = require("@guidepup/playwright");
const { expect } = require("@playwright/test");

test.use({ voiceOverStartOptions: { capture: "initial" } });

const BASE_URL = "https://frontrange.edu";

async function loadPage(page, voiceOver, path = "") {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: "load" });
  await expect(page.locator("#header")).toBeVisible();
  await voiceOver.navigateToWebContent();
}

// Navigate with a VoiceOver command until itemText includes target (max 80 steps)
async function navigateTo(voiceOver, target, command, maxSteps = 80) {
  for (let i = 0; i < maxSteps; i++) {
    if ((await voiceOver.itemText()).includes(target)) return;
    await voiceOver.perform(command);
  }
  // Check one final time so test assertion reflects the actual state
}

test.describe("Front Range Navigation - VoiceOver", () => {
  test("can find the skip to main content link", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Skip to main content", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Skip to main content");
  });

  test("can find the FRCC home page logo link", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Front Range Community College home page", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Front Range Community College home page");
  });

  test("can find Request Info utility link", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Request Info", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Request Info");
  });

  test("can find the Apply utility link", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Apply", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Apply");
  });

  test("can find the Visit utility link", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Visit", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Visit");
  });

  test("can open About FRCC dropdown and reach sub-links", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "About FRCC", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "About FRCC Overview", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("About FRCC Overview");
  });

  test("can open About FRCC dropdown and reach Contact Us", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "About FRCC", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "Contact Us", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Contact Us");
  });

  test("can open Programs & Degrees dropdown and reach Program Finder", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Programs & Degrees", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "Program Finder", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Program Finder");
  });

  test("can open Programs & Degrees dropdown and reach Register For Classes", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Programs & Degrees", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "Register For Classes", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Register For Classes");
  });

  test("can open Admissions & Aid dropdown and reach Apply to FRCC", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Admissions & Aid", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "Apply to FRCC", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Apply to FRCC");
  });

  test("can open Admissions & Aid dropdown and reach Paying For College", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Admissions & Aid", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "Paying For College", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Paying For College");
  });

  test("can open Student Experience dropdown and reach Disability Support Services", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Student Experience", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "Disability Support Services", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Disability Support Services");
  });

  test("can open Student Experience dropdown and reach Career Services", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Student Experience", voiceOver.keyboardCommands.findNextControl);
    await voiceOver.act();

    await navigateTo(voiceOver, "Career Services", voiceOver.keyboardCommands.findNextLink);

    expect(await voiceOver.itemText()).toContain("Career Services");
  });

  test("can reach Business & Community link and navigate to its page", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Business & Community", voiceOver.keyboardCommands.findNextLink);
    expect(await voiceOver.itemText()).toContain("Business & Community");

    await voiceOver.act();
    await page.waitForLoadState("load");

    await expect(page).toHaveURL(/business-community/);
  });

  test("can find the Toggle Search Drawer button in the navigation", async ({ page, voiceOver }) => {
    await loadPage(page, voiceOver);

    await navigateTo(voiceOver, "Toggle Search Drawer", voiceOver.keyboardCommands.findNextControl);

    expect(await voiceOver.itemText()).toContain("Toggle Search Drawer");
  });
});
