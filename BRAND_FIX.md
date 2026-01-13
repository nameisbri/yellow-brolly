# Brand Name Consistency Issue

## Problem
The company name is stored as `Yellow Brolly Co.` (with space and period) but displays as `YellowBrollyCo` (without space and period) throughout the website.

## Files Found with Inconsistent Usage

### src/data/content.ts
```typescript
brand: {
  name: 'Yellow Brolly Co.',  // ✅ Correct (stored with space and period)
}
```

### src/pages/Home.tsx (Incorrect)
```typescript
eyebrow="YellowBrollyCo"  // ❌ Missing space and period
```

### src/index.html (Incorrect)
```html
<title>YellowBrollyCo | Technology-Forward Strategy. Human-First Results.</title>
<meta name="description" content="YellowBrollyCo - Technology-forward strategy. Human-first results. We make digital make sense." />
```

## Correct Brand Name Display
All instances should show: `YellowBrollyCo.` (with space and period)

## Files Requiring Changes
1. src/pages/Home.tsx
   Line 22: Change `eyebrow="YellowBrollyCo"` to `eyebrow="YellowBrollyCo."`

2. src/index.html (if used)
   Line 7: Change `<title>YellowBrollyCo |` to `<title>YellowBrollyCo. |`
   Line 8: Change meta description to `YellowBrollyCo.` instead of `YellowBrollyCo`
