const { nvdaTest: test } = require("@guidepup/playwright");
const { expect } = require("@playwright/test");

test.describe("Front Range Search - NVDA", () => {
  test("NVDA can navigate to the page heading", async ({ page, nvda }) => {
    await page.goto("https://frontrange.edu", { waitUntil: "load" });
    await expect(page.locator("#header")).toBeVisible();
    await nvda.navigateToWebContent();

    while (!(await nvda.itemText()).includes("Front Range Community College")) {
      await nvda.perform(nvda.keyboardCommands.findNextHeading);
    }

    expect(await nvda.itemText()).toContain("Front Range Community College");
  });

  test("NVDA can open the search drawer and submit a query", async ({ page, nvda }) => {
    await page.goto("https://frontrange.edu", { waitUntil: "load" });
    await expect(page.locator("#header")).toBeVisible();
    await nvda.navigateToWebContent();

    while (!(await nvda.itemText()).includes("Toggle Search Drawer")) {
      await nvda.perform(nvda.keyboardCommands.findNextControl);
    }

    await nvda.act();
    await nvda.press("Tab");
    await nvda.type("accessibility");
    await nvda.press("Enter");

    const spokenLog = await nvda.spokenPhraseLog();
    expect(spokenLog.join(" ")).toMatch(/search|result/i);

    while (!(await nvda.itemText()).includes("Search Results")) {
      await nvda.perform(nvda.keyboardCommands.findNextHeading);
    }

    expect(await nvda.itemText()).toContain("Search Results");
  });
});
