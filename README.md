# FRCC Accessibility Automation

This repository is configured for accessibility testing using Guidepup with Playwright.

## Overview

The project uses Guidepup to automate real screen reader interactions in browser tests.
The current setup is focused on macOS VoiceOver via `@guidepup/playwright`.

## What’s included

- `package.json` with Guidepup and Playwright dependencies
- `playwright.config.js` configured with `screenReaderConfig`
- `tests/example.spec.js` showing a VoiceOver-driven accessibility test

## Prerequisites

- macOS
- Node.js
- Xcode command line tools (recommended for Playwright browser installation)

## Install

```bash
npm install
npx playwright install
```

## Run tests

Run the full Playwright test suite:

```bash
npx playwright test
```

Run the configured WebKit project explicitly:

```bash
npx playwright test --project=webkit
```

## Current configuration

The repository uses `@guidepup/playwright` to enable screen reader testing.

Key setup:

- `playwright.config.js` imports `screenReaderConfig` from `@guidepup/playwright`
- A `webkit` project is configured with `Desktop Safari` and `headless: false`
- This lets VoiceOver run interactively during tests

## Example test

The sample test in `tests/example.spec.js` demonstrates:

- navigating to `https://frontrange.edu`
- waiting for page content to render
- using VoiceOver interaction APIs
- moving to the web content region
- finding a heading using VoiceOver navigation
- asserting the VoiceOver speech log

## Writing new Guidepup tests

Use the pattern in `tests/example.spec.js`:

1. Import `voiceOverTest` from `@guidepup/playwright`
2. Use Playwright `page` to navigate and locate elements
3. Use VoiceOver methods such as:
   - `voiceOver.interact()`
   - `voiceOver.navigateToWebContent()`
   - `voiceOver.perform(...)`
   - `voiceOver.itemText()`
   - `voiceOver.spokenPhraseLog()`
4. Assert accessibility behavior using Playwright `expect`

## Guidepup API

Guidepup provides APIs for automating real screen readers.
The repository currently uses the VoiceOver integration, but Guidepup also supports NVDA on Windows.

The relevant Guidepup documentation is:

- https://www.guidepup.dev/docs/api/class-guidepup

## Notes

- The current test expects interactive VoiceOver support and is therefore run with `headless: false`.
- Add `npm` scripts to `package.json` if you want shortcuts such as `npm test` or `npm run test:webkit`.


TODO:
- Add NVDA tests
- Add mobile
- LightHouse integration
- Screen recording integration
- 