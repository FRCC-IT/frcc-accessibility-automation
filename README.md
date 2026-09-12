# FRCC Accessibility Automation

This repository is configured for accessibility testing using Guidepup with Playwright.

## Overview

The project uses Guidepup to automate real screen reader interactions in browser tests.
The current setup is focused on macOS VoiceOver via `@guidepup/playwright`.

## What’s included

- `package.json` with Guidepup and Playwright dependencies
- `playwright.config.js` configured with `screenReaderConfig`
- scoped screen reader test files in `tests/navigation` and `tests/search`

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

Run VoiceOver tests on macOS:

```bash
npm run test:voiceover
```

Run NVDA tests on Windows:

```bash
npm run test:nvda
```

Run the configured WebKit project explicitly:

```bash
npx playwright test --project=webkit
```

## Current configuration

The repository uses `@guidepup/playwright` to enable screen reader testing.

Key setup:

- `playwright.config.js` imports `screenReaderConfig` from `@guidepup/playwright`
- `webkit` and `windows` projects are configured for macOS VoiceOver and Windows screen reader runs
- This lets tests target VoiceOver on macOS and NVDA-style workflows on Windows

## Example test

The sample test in `tests/example.spec.js` demonstrates:

- navigating to `https://frontrange.edu`
- waiting for page content to render
- using VoiceOver interaction APIs
- moving to the web content region
- finding a heading using VoiceOver navigation
- asserting the VoiceOver speech log

## Writing new Guidepup tests

Use the naming pattern: `tests/<feature>.<voiceover|nvda>.spec.js`.

1. Import the appropriate test fixture from `@guidepup/playwright`, such as `voiceOverTest` or `nvdaTest`
2. Use Playwright `page` to navigate and locate elements
3. Use screen reader methods such as:
   - `voiceOver.interact()` or `nvda.interact()`
   - `voiceOver.navigateToWebContent()` or `nvda.navigateToWebContent()`
   - `voiceOver.perform(...)` or `nvda.perform(...)`
   - `voiceOver.itemText()` or `nvda.itemText()`
   - `voiceOver.spokenPhraseLog()` or `nvda.spokenPhraseLog()`
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