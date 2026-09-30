# Sevqo corporate website

The standalone corporate website for Sevqo, the parent company behind LeadFlow, AfriScore, and Sevqo Marketing.

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
- Animated Sevqo Marketing concept and shared operating principles
- Responsive mobile navigation and visual scenes
- Sevqo ribbon identity with electric blue, deep navy and device-responsive light/dark themes
- Reduced-motion accessibility support

## Future integration

- Replace generic Sevqo GitHub links with product destinations when the renamed repositories are supplied
- Add a company contact channel when the Sevqo inbox is configured
- Add production analytics and consent controls
- Configure hosting for `sevqo.com` and links to product subdomains
