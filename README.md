# QA challenge — Cloudya Lite

How to install, run the app, and run the Playwright test suite.

## Structure of the solution


| Path                   | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `server.js`            | Express server; serves the demo app from `public/`.                         |
| `public/`              | Static frontend (`index.html`, assets).                                     |
| `pages/`               | Page Object Model helpers for UI tests (`App`, `LoginPage`, `ContactPage`). |
| `tests/ui/`            | Browser UI specs (login, search, mobile viewport).                          |
| `tests/api/`           | API specs (e.g. auth) using Playwright’s request context.                   |
| `playwright.config.js` | Projects (`ui`, `api`, `mobile`), `baseURL`, and `webServer` hook.          |
| `QA_REPORT.md`         | Bug findings and test documentation for the challenge.                      |


## Tools used

- **Node.js** — runtime for the server and Playwright.
- **npm** — dependency install and scripts (`npm start`, `npm test`).
- **Express** — HTTP server for the app under test.
- **Playwright (`@playwright/test`)** — end-to-end and API tests; TypeScript specs, multi-project layout, built-in test runner.
- **TypeScript** — test and page-object sources (`.ts`); executed by Playwright without a separate `tsc` build step for tests.

---

## Install dependencies

```bash
npm install
npx playwright install
```

---

## Start application

```bash
npm start
```

App runs at:

```
http://localhost:3000
```

---

## Run tests

You can use `npm test` (same as `npx playwright test`).

### Run all tests

```bash
npx playwright test
npm test
npx playwright test --headed
```

### Run UI tests only

```bash
npx playwright test --project=ui
```

### Run API tests only

```bash
npx playwright test --project=api
```

### Run mobile tests only

```bash
npx playwright test --project=mobile
```

---

## Debug tests

### Debug API tests

```bash
npx playwright test tests/api --debug
```

### Debug UI tests

```bash
npx playwright test tests/ui --debug
```

---

## Notes

- `npx playwright show-report` may not work unless tests were run with the HTML reporter enabled.
- Most tests were executed using terminal output and Playwright debug mode.
