# Veris corporate website

The standalone corporate website for Veris, the parent company behind LeadFlow, Veris Marketing, and AfriCore.

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

## Current experience

- Responsive corporate landing page with mobile navigation
- Animated hero infrastructure map and pointer-aware motion
- Venture portfolio for LeadFlow, Veris Marketing, and AfriCore
- Interactive operating-model and company-stage sections
- AfriCore architecture preview
- Light/dark editorial sections with an independent Veris identity
- Reduced-motion accessibility support
- Contact-interest form prepared for a future backend connection

## Future integration

- Replace placeholder venture/contact links when the final domains are available
- Connect the contact form to the selected CRM or Supabase endpoint
- Add production analytics and consent controls
- Configure hosting for `veris.org` and links to product subdomains
