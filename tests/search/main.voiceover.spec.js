const { voiceOverTest: test } = require("@guidepup/playwright");
const { expect } = require("@playwright/test");

test.use({ voiceOverStartOptions: { capture: "initial" } });

test.describe("Front Range Search", () => {
  test("VoiceOver can navigate to the page heading", async ({
    page,
    voiceOver,
  }) => {
    await page.goto("https://frontrange.edu", { waitUntil: "load" });

    // The page has two <header> elements; use the ID to avoid a strict mode violation
    await expect(page.locator("#header")).toBeVisible();

    await voiceOver.navigateToWebContent();

    // The H1 is "Front Range Community College" (visually hidden but read by VoiceOver)
    while (!(await voiceOver.itemText()).includes("Front Range Community College")) {
      await voiceOver.perform(voiceOver.keyboardCommands.findNextHeading);
    }

    expect(await voiceOver.itemText()).toContain("Front Range Community College");
  });

  test("VoiceOver can open the search drawer and submit a query", async ({
    page,
    voiceOver,
  }) => {

    // Load the page and ensure the header is visible before starting VoiceOver interactions
    await page.goto("https://frontrange.edu", { waitUntil: "load" });
    await expect(page.locator("#header")).toBeVisible();

    // Interact with the page
    await voiceOver.navigateToWebContent();

    // Search and Select the "Toggle Search Drawer" button
    while (!(await voiceOver.itemText()).includes("Toggle Search Drawer")) {
      await voiceOver.perform(voiceOver.keyboardCommands.findNextControl);
    }

    // Activate the search drawer
    await voiceOver.act();

    // Focus on the search input field
    await voiceOver.press("Tab");

    // Type a search query and submit it
    await voiceOver.type("accessibility");
    await voiceOver.press("Enter");

    // Verify VoiceOver can announce content on the results page
    const spokenLog = await voiceOver.spokenPhraseLog();
    expect(spokenLog.join(" ")).toMatch(/search|result/i);

    // Verify there is a heading that includes "Search Results"
    while (!(await voiceOver.itemText()).includes("Search Results")) {
      await voiceOver.perform(voiceOver.keyboardCommands.findNextHeading);
    }

    // H2 is "Search Results"
    expect(await voiceOver.itemText()).toContain("Search Results");
  });
});