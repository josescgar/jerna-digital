# ADR 0003: Form Handling with Web3Forms

## Status

Accepted

## Context

The contact page needs a working form that:

- Collects name, email, and message
- Sends submissions to the business owner
- Works on a static site (no server-side code)
- Has spam protection
- Is privacy-conscious

Options considered:

1. Formspree
2. Netlify Forms
3. Web3Forms
4. Custom serverless function

## Decision

Use **Web3Forms** for form handling.

## Rationale

1. **No Server Required:** Works with any static host including GitHub Pages.

2. **Free Tier:** Unlimited submissions on the free plan.

3. **Privacy-Focused:** GDPR compliant, doesn't store submissions indefinitely.

4. **Simple Integration:** Just a POST request to their API endpoint.

5. **Spam Protection:** Built-in spam filtering plus we add a honeypot field.

6. **Customizable:** Can customize email templates and receive notifications.

## Implementation

### Client-Side

```typescript
const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    access_key: process.env.PUBLIC_WEB3FORMS_ACCESS_KEY,
    name: formData.name,
    email: formData.email,
    message: formData.message,
    subject: 'New contact from Jerna Digital',
  }),
});
```

### Spam Protection

1. **Honeypot Field:** Hidden field that bots fill out but humans don't.
2. **Client-side Validation:** Reduces obvious spam attempts.
3. **Web3Forms Filtering:** Server-side spam detection.

## Consequences

### Positive

- No backend infrastructure to maintain
- Free unlimited submissions
- Quick to implement
- Good deliverability

### Negative

- Depends on third-party service
- Limited customization compared to custom solution
- Need to manage API key securely

### Neutral

- Submissions go to email (no dashboard)
- Rate limits may apply (generous for portfolio site)

## Environment Setup

```bash
# .env.local
PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

Get access key from: https://web3forms.com/

## Alternatives Rejected

**Formspree:** Fewer free submissions, similar feature set.

**Netlify Forms:** Would require hosting on Netlify.

**Custom Lambda:** More complexity, maintenance burden, cost.
