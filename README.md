# Veris corporate website

The standalone corporate website for Veris, the parent company behind LeadFlow, AfriScore, and Veris Marketing.

## Local development

```bash
npm install
npm run dev
```

The local preview uses `http://127.0.0.1:5174/` when LeadFlow is already running on port 5173.

## Production build

```bash
npm run build
```

The production output is written to `dist/`.

## Browser checks

```bash
npm run test:e2e
```

The script starts a temporary local server and checks the desktop and phone layouts in Chromium. Install Playwright's Chromium browser first with `npx playwright install chromium` if needed.

## Current experience

- Expanded company story and three-venture portfolio
- Scroll-driven, interactive explanations of LeadFlow and AfriScore
- Animated Veris Marketing concept and shared operating principles
- Responsive mobile navigation and visual scenes
- Original editorial identity with warm neutrals, blue, citrus and coral
- Reduced-motion accessibility support

## Future integration

- Replace GitHub development links with product destinations when the final domains are available
- Add a company contact channel when the Veris inbox is configured
- Add production analytics and consent controls
- Configure hosting for `veris.org` and links to product subdomains
