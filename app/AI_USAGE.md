# AI Usage

## Tools Used

- ChatGPT
- Cursor

## How AI Helped

- Assisted with initial Playwright setup and structure
- Helped debug Playwright configuration issues
- Suggested selectors and locator improvements
- Helped organize the README and QA report

## What Was Decided & Verified Manually

- Test scenarios and priorities
- Which flows to automate
- UI selectors and assertions
- API endpoints and responses
- Actual application behaviour in browser
- Test execution and debugging output

## Example of Correcting AI Output

AI initially suggested selectors that did not exist in the application.

After manually inspecting the DOM, selectors were updated to accessible Playwright locators such as:

```ts
page.getByRole('button', { name: /login/i })
```

