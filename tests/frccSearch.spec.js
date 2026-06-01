const { voiceOverTest: test } = require("@guidepup/playwright");
const { expect } = require("@playwright/test");

test.describe("Front Range Search", () => {
  test("I can search for accessibility across all of the website", async ({
    page,
    voiceOver,
  }) => {
    // Navigate to Guidepup GitHub page
    await page.goto("https://frontrange.edu", {
      waitUntil: "load",
    });

    // Wait for page to be ready
    await expect(page.locator('header')).toBeVisible();
    await voiceOver.interact();

    // Interact with the page
    await voiceOver.navigateToWebContent();

    // Move across the page menu to the Guidepup heading using VoiceOver
    while ((await voiceOver.itemText()) !== "Guidepup heading level 1") {
      await voiceOver.perform(voiceOver.keyboardCommands.findNextHeading);
    }

    // Assert that the spoken phrases are as expected
    expect(JSON.stringify(await voiceOver.spokenPhraseLog())).toMatchSnapshot();
  });
});