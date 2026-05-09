# QA Report — Cloudya Lite

App under test: [http://localhost:3000](http://localhost:3000)  
Test accounts:  

- [admin@cloudya.com](mailto:admin@cloudya.com) / Test1234!  
- [user@cloudya.com](mailto:user@cloudya.com) / Welcome1!

---

# Test Approach

Manual exploratory testing focused on:

- Login flow
- Logout/session handling
- Contact search
- API behaviour
- Responsive layouts
- Keyboard interactions
- Negative and edge cases

Automated coverage was added using Playwright for:

- UI login flow
- Contact search
- API authentication
- Negative login scenarios
- Mobile viewport testing

---

# Test Environment


| Item            | Value                                          |
| --------------- | ---------------------------------------------- |
| OS              | macOS                                          |
| Browser         | Chromium (Playwright)                          |
| Node Version    | 18+                                            |
| Application URL | [http://localhost:3000](http://localhost:3000) |


---

# Severity Scale


| Severity | Description                                       |
| -------- | ------------------------------------------------- |
| Critical | Broken security expectation or core functionality |
| High     | Major functional issue                            |
| Medium   | UX, validation, or robustness issue               |
| Low      | Minor polish or improvement                       |


---

# Findings Checklist


| ID  | Finding                                                  | Severity |
| --- | -------------------------------------------------------- | -------- |
| C1  | Logout + refresh still opens Contacts view               | Critical |
| C2  | No loading feedback during login/search                  | Medium   |
| C3  | Search does not work for phone numbers                   | Medium   |
| C4  | Clearing search does not restore full list automatically | High     |
| C5  | Email login is case-sensitive                            | High     |
| C6  | Generic “Invalid credentials” feedback                   | Medium   |
| C7  | Old login error persists after logout                    | Medium   |
| C8  | Password visible as plain text                           | Critical |
| C9  | Enter key does not submit login form                     | Medium   |
| C10 | Empty fields are not highlighted                         | Low      |
| C11 | Missing hover states on buttons                          | Low      |
| C12 | Search controls misaligned on smaller screens            | Medium   |
| C13 | Login layout cramped on iPhone SE widths                 | Medium   |


---

# Detailed Findings

## C8 — Password is shown as plain text

### Steps

1. Open login page
2. Type in the password field

### Expected

Password should be masked using a password input field.

### Actual

Characters are fully visible.

### Severity

Critical

---

## C1 — Logout then refresh still opens Contacts

### Steps

1. Login successfully
2. Click Logout
3. Refresh the page

### Expected

User should return to a clean login state.

### Actual

Contacts view still appears and application state becomes inconsistent.

### Severity

Critical

---

## C5 — Login email is case-sensitive

### Steps

1. Attempt login using:
  - [ADMIN@cloudya.com](mailto:ADMIN@cloudya.com)
  - Correct password

### Expected

Login succeeds regardless of email casing.

### Actual

Login fails with “Invalid credentials”.

### Severity

High

---

## C4 — Clearing search does not restore contacts automatically

### Steps

1. Login successfully
2. Search for a contact
3. Clear the search input

### Expected

Full contact list should return automatically.

### Actual

List remains filtered until Search is clicked again.

### Severity

High

---

## C2 — No loading state during actions

### Steps

1. Login
2. Trigger search actions

### Expected

Loading indicator, disabled button, or skeleton state.

### Actual

No visible loading feedback.

### Severity

Medium

---

## C3 — Cannot search by phone number

### Steps

1. Login successfully
2. Search using a visible phone number fragment

### Expected

Matching contact appears.

### Actual

No relevant results are returned.

### Severity

Medium

---

## C6 — Generic login error feedback

### Steps

1. Enter valid email format
2. Enter incorrect password

### Expected

Clearer, policy-safe validation feedback.

### Actual

Only generic “Invalid credentials” message is shown.

### Severity

Medium

---

## C7 — Stale login error after logout

### Steps

1. Fail login attempt
2. Login successfully
3. Logout

### Expected

Previous errors should be cleared.

### Actual

Old login error may still appear.

### Severity

Medium

---

## C9 — Enter key does not submit login form

### Steps

1. Fill login fields
2. Press Enter

### Expected

Form submits successfully.

### Actual

Nothing happens.

### Severity

Medium

---

## C12 — Search controls misaligned on small screens

### Steps

1. Open app on smaller mobile viewport
2. Navigate to contacts

### Expected

Search controls align consistently with layout.

### Actual

Search controls become visually misaligned.

### Severity

Medium

---

## C13 — Login layout cramped on very small screens

### Steps

1. Open app at iPhone SE width (~320px)

### Expected

Comfortable spacing and responsive layout.

### Actual

Layout feels cramped and spacing is limited.

### Severity

Medium

---

## C10 — Empty fields are not highlighted

### Steps

1. Leave login fields empty
2. Click Sign In

### Expected

Field-level validation and guidance.

### Actual

Very limited feedback.

### Severity

Low

---

## C11 — Missing hover feedback on buttons

### Steps

1. Hover buttons such as:
  - Sign In
  - Search
  - Logout

### Expected

Clear hover/focus feedback.

### Actual

Minimal visual interaction feedback.

### Severity

Low

---

# API Observations

### Verified

- Successful login returns authentication token
- Invalid credentials return error response
- API response structure is generally consistent

### Suggestions

- Standardize error response schema
- Add rate limiting for repeated failed logins
- Improve validation messaging consistency

---

# Responsive & Mobile Testing

### Devices Tested

- iPhone 13
- iPhone SE-class width

### Findings

- Core functionality works on mobile
- Minor alignment and spacing issues exist on smaller screens
- Search layout could be improved for narrow widths

---

# Recommendations

## Login & Validation

- Use proper password input type
- Submit form on Enter key
- Trim/lowercase email before authentication
- Clear errors on successful login/logout
- Highlight empty required fields

## Search & Contacts

- Restore full list automatically when search is cleared
- Include phone number in search logic or clarify supported search types

## Session Handling

- Fully clear session state on logout
- Ensure refresh always returns correct authenticated state

## UX & Feedback

- Add loading indicators and disabled states
- Improve hover/focus-visible states
- Improve error messaging clarity

## Responsive Improvements

- Improve spacing on very small devices
- Align search controls consistently across breakpoints

---

# If I Had One More Day

- Add cross-browser testing (Firefox, WebKit)
- Add accessibility checks
- Improve mobile coverage for more screen sizes
- Add CI/CD integration with automated reports
- Refactor tests using Page Object Model (POM)
- Add more negative and edge-case scenarios
- Add API schema and response validation
- Improve test data management and reusability

