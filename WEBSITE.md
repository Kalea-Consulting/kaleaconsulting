# Kalea Consulting — Website Reference
*Last updated: July 3, 2026 (Roadmap added)*

---

## Overview

**Live URL:** https://kaleafirm.com
**GitHub Repo:** https://github.com/Kalea-Consulting/kaleaconsulting
**Local Repo (Blake):** `D:\CodeProjects\kalea_website`
**Hosting:** Cloudflare Pages (auto-deploys on push to `main`)
**Build system:** Jekyll (Cloudflare Pages runs `jekyll build` automatically)
**DNS:** Cloudflare — root CNAME points to `kaleaconsulting.pages.dev`

---

## How Deployment Works

1. Make changes locally in `D:\CodeProjects\kalea_website`
2. `git add .` → `git commit -m "descriptive message"` → `git push`
3. Cloudflare Pages detects the push, runs `jekyll build`, deploys to CDN
4. Live in ~60 seconds

**Important:** Always test changes in an incognito window or use `Ctrl+Shift+R` after deploy — Cloudflare's CDN caches aggressively and stale styles are a common gotcha.

**Commit message convention:** Be descriptive — `Add House2Home case study to work.html` not `Update index.html`. Four consecutive `Update index.html` commits make it very hard to track what changed and debug issues later.

---

## Architecture — Hybrid Model

The site uses a **hybrid structure**: the homepage is a single scroll page, while deeper content (Services, Pricing, Our Work, About) lives on dedicated pages with their own URLs for SEO.

Jekyll handles shared components (nav, footer, `<head>`) via includes and a layout, so editing the nav or footer in one file updates every page automatically.

---

## File Structure

```
kalea-website/
├── _config.yml                  # Jekyll config — site title, URL, excludes
├── _layouts/
│   └── default.html             # Shared page shell — <head>, nav, footer, scripts
├── _includes/
│   ├── nav.html                 # Shared navigation (edit here to update everywhere)
│   └── footer.html              # Shared footer (edit here to update everywhere)
├── styles.css                   # ALL shared CSS — one file for the whole site
├── main.js                      # Shared JS — nav scroll, mobile menu, fade-up, form
├── index.html                   # Homepage (Jekyll front matter + body only)
├── services.html                # Our Services page
├── pricing.html                 # How We Work / Engagement Models page
├── work.html                    # Our Work / Case Studies page
├── about.html                   # About Us page (in progress — see below)
├── consulting-k.png             # K mark logo (used in nav and footer)
└── consulting-banner.png        # Hero banner image (used on homepage)
```

---

## How Pages Are Built

Every page uses this pattern at the top:

```yaml
---
layout: default          # pulls in _layouts/default.html
active: services         # highlights the correct nav link
title: Services          # sets <title> and OG title
description: "..."       # sets meta description for SEO
---
```

Then just HTML body content below — no `<html>`, `<head>`, `<nav>`, or `<footer>` tags needed.

The `active:` value must match one of the nav conditions in `_includes/nav.html`:
- `home`
- `services`
- `work`
- `pricing`
- `about`

---

## Current Navigation

Nav links in order (as of July 2026):

| Label | URL | Notes |
|---|---|---|
| Home | `/` | |
| Our Services | `/services.html` | Label is "Our Services" not "Services" |
| Our Work | `/work.html` | |
| How We Work | `/pricing.html` | Label is "How We Work" not "Pricing" |
| About | `/about.html` | Standalone page — moved from `/#about` anchor |
| Get in Touch | `/#contact` | Navy CTA button |

**Important:** The nav labels on the live site differ from the original build. `services.html` is labeled "Our Services" and `pricing.html` is labeled "How We Work". Keep these labels in sync if adding new pages.

**Note on URL structure:** `/pricing.html` is intentionally kept as the filename even though the page is labeled "How We Work." Renaming the file to match would require a `_redirects` file to avoid 404s on any existing links. Low priority for now.

---

## Pages — Current Live State

### Homepage (`index.html`)

Single scroll page. Sections:

**Hero**
- Headline: *"Helping businesses run better."*
- Subtext: *"We align people, operations, and technology to build stronger businesses through practical execution and long-term thinking."*
- Eyebrow: "Operations · Systems · Execution"
- CTAs: "Start a Conversation" → `/#contact` | "Meet the team" → `/about.html`
- Stats row: Operations (People | Process | Performance) · Systems (Infrastructure | Cloud | Security) · Execution (Implementation | Integration | Automation)

**Services Strip** (navy band)
- Three pills: Operations & Decision Support · Systems & Infrastructure · Execution
- CTA link: "Start Your Journey" → `/pricing.html`

**Who We Are Section** (`#about`)
- Label: "Who We Are"
- Heading: *"Built for businesses that do real work."*
- Three Mission/Vision cards:
  - **Our Mission** — combine operational leadership and technical expertise into practical solutions
  - **Our Vision** — businesses not held back by systems; trades/SMB owners with infrastructure to grow
  - **Who We Serve** — owner-operated businesses, trades, field services, growing SMBs
- CTA button: "Meet the Team" → `/about.html`
- Team cards and bios moved to dedicated `/about.html` page

**Contact Section** (`#contact`)
- Heading: *"Let's talk about business."*
- Subtext: *"Tell us what you're working on, where you're running into challenges, or where you want to take your business next."*
- Two phone numbers: USA (623) 738-5101 · CAN (604) 332-0157
- Email: hello@kaleafirm.com
- Location: Sarasota, FL
- Contact form dropdown options: Build the Foundation (Start Better) · Optimize the Business (Run Better) · Lead with Confidence (Grow Better) · I'm not sure · Existing Client · General Question

---

### Our Services (`services.html`)

Page title: "Our Services | Kalea Consulting"
Hero: *"Practical work that makes the business run better."*
Subtext updated to: *"We believe the best results come from aligning people, operations, and technology rather than treating them as separate problems."*

Three service blocks (significantly rewritten from original):

**Operations & Decision Support**
- Focuses on structure, team accountability, and decision-making information
- Bullet points: business process reviews/SOPs, KPI dashboards, profitability analysis/forecasting, business operations assessments

**Systems & Infrastructure**
- Focuses on secure reliable systems that scale
- Bullet points: UniFi networking, Microsoft 365/Azure/Entra ID/Intune, remote access/backups/continuity, website development/systems integration

**Business Transformation** *(was "Execution" in original build)*
- Focuses on technology that improves operations, not just implementation
- Bullet points: home service and business software implementation, workflow automation & AI integration, business systems integration, Fractional COO & CIO leadership

Closes with: *"Not sure where to start?"* section → contact CTA (no navy CTA band).

---

### How We Work (`pricing.html`)

Page title: "Pricing | Kalea Consulting"
**Note:** The page `<title>` still says "Pricing" but the nav label and page hero say "How We Work." Worth aligning at some point.

Hero: *"Every business is on a different journey. We meet you where you are."*

**Completely overhauled from original build.** No longer uses the three engagement model cards (Project-Based / Hourly / Fractional). Now uses a journey-based framework:

**Start Better** — Build the Foundation
- For new businesses, new software implementations, laying groundwork
- Common engagements: Jobber Implementation, Website Development, Microsoft 365 & Azure Deployment, Business Process Design, KPI Reporting, Network Infrastructure

**Run Better** — Optimize the Business
- For growing businesses where inefficiencies are getting expensive
- Common engagements: Jobber Optimization, Workflow Automation & AI Integration, Microsoft 365 & Azure Administration, Website Management, Business Software Optimization, Performance Reporting

**Grow Better** — Lead with Confidence
- For businesses ready to focus on leadership and long-term growth
- Common engagements: Fractional COO & CIO Leadership, Strategic Planning, Business Scaling, Organizational Development, Technology Roadmaps, Operational Leadership

Closes with a values block (Practical Execution · Clear Communication · Long-Term Thinking · One Team) and a CTA section.

**Note on pricing:** The $100/hr framing from the original build was removed during Matt and Blake's edits. The page no longer references specific rates. This was an intentional decision — the journey framework positions value over price point.

---

### Our Work (`work.html`)

Largely intact from original build structurally. Filter tabs, two sections (Systems / Operations), case study cards.

**Pending:** Matt's operations case studies to be added to the Operations section. Placeholder card is live.

---

### About (`about.html`)

**Status: Live as of July 3, 2026.**

Full resume-style page with:
- Page hero: *"Two disciplines. One firm."*
- Blake section: full bio, AZ-104 credential, skills grid (Cloud & Infrastructure / Networking / Business Systems), Upwork profile link
- Matt section: full bio, CMA Candidate credential, skills grid (Operations / Finance & Performance / Leadership), Upwork profile link
- Philosophy section: *"Built for businesses that do real work."* — blue collar/SMB niche positioning, four values
- CTA band

All deployment steps completed — `about.html` in repo, styles appended, homepage section replaced, nav updated.

---

## Roadmap / Next Steps

Open items, roughly grouped. Nothing here has been built yet — these are tracked for planning purposes.

### Content
- **Matt's case studies** — operations/financial performance engagements to be added to `work.html`. Placeholder card is live. Source material: Matt's Upwork profile history (manual copy required — Upwork blocks automated fetching).
- **Matt's additional credentials** — Bachelor of Science in Business (Arizona State University) and CMA Candidate are live on `about.html`. Matt mentioned other credentials to add but hasn't specified them yet.
- **Blue collar / SMB niche messaging** — currently only explicit in the About page philosophy section. Worth considering whether this positioning should surface more directly on the homepage or services page as the niche solidifies.

### Jobber Partner Program
Kalea was recently accepted as a Jobber Partner. Two components under discussion, neither built yet:
- **Partner badge** — need to pull the actual badge asset and brand usage guidelines from the Jobber Partner dashboard (not accessible to Claude). Placement leaning toward moderate visibility — near the Jobber-related content on the Services page and/or footer — rather than homepage-prominent, to avoid the site reading as a Jobber reseller page rather than Kalea's own brand.
- **Referral link** — a CTA for prospects who want to sign up for Jobber directly, likely placed near the Systems & Infrastructure service block. Link/tracking format TBD once pulled from the partner dashboard.

### Payment Processing
Still being scoped — two distinct possible directions, not yet decided:
1. **Kalea invoicing** — clients pay Kalea directly through the site (e.g., Stripe integration). Real financial infrastructure, more involved.
2. **Jobber Payments promotion** — content-only addition describing Jobber Payments as part of the Jobber implementation service offering. Low lift.
3. Possibly both, but worth deciding which problem is actually being solved before scoping either.

### Housekeeping
- **`pricing.html` URL** — file is named `pricing.html` but labeled "How We Work" in nav and on page. Renaming would require a `_redirects` file for backwards compatibility. Low priority.
- **Commit message discipline** — ongoing conversation with Matt about descriptive commit messages given Cloudflare Pages deploys directly on push with no staging step.

---

## Design System

### Fonts
- **Cormorant Garamond** — headings, logo, card titles (serif, elegant)
- **Jost** — body text, nav links, labels, buttons (sans-serif, clean)

### Color Palette (Web)
This is the **warm web palette** — intentionally separate from the cool teal document palette in `kalea_base.js`.

| Variable | Hex | Used for |
|---|---|---|
| `--navy` | `#2a3d53` | Primary — headings, nav, buttons, footer |
| `--mauve` | `#bc948d` | Accent — labels, tags, underlines, icons |
| `--cream` | `#feebc7` | Hero background wash |
| `--cream-light` | `#fdf6ec` | Section backgrounds, form inputs |
| `--navy-light` | `#3a5068` | Button hover state |
| `--white` | `#ffffff` | Card backgrounds, text on navy |
| `--text-body` | `#4a4a4a` | Body text |

### Key Patterns
- **Section label:** small mauve uppercase text above headings (`.section-label`)
- **Headings:** Cormorant Garamond, font-weight 300 (light), navy
- **Italic accent:** `<em>` inside headings renders in mauve italic
- **Buttons:** navy fill, 2px border-radius, uppercase Jost, slight hover lift
- **Cards:** white background, `rgba(42,61,83,0.10)` border, hover lift + shadow
- **Mauve dash list:** `::before` pseudo-element — `width: 18–20px; height: 1.5px; background: var(--mauve)` — used consistently for bullet lists
- **Fade-up animation:** add class `fade-up` to any element; JS adds `visible` on scroll

---

## Voice, Tone & Copy Notes

This section documents the writing style used across the site so future copy stays consistent.

### Overall Voice
**Direct, outcome-focused, no consulting fluff.** The site deliberately avoids the language patterns common in consulting firms — no "synergies," no "holistic approaches," no "leverage" as a verb. The voice is plain English, confident, and specific.

### Key Tone Markers
- **Short declarative sentences.** *"We align people, operations, and technology."* Not *"Our comprehensive approach leverages cross-functional alignment."*
- **Outcomes over process.** Copy leads with what the client gets, not what Kalea does. *"Save time through better systems"* not *"We implement process improvements."*
- **Honest and direct.** The pricing page says *"Every recommendation is based on your goals, not a predefined package."* The work page says problems are told *"plainly, without the consulting theatre."*
- **"Run better" as a through-line.** This phrase appears on the homepage headline, services page hero, and pricing page. It's the core positioning statement — keep it consistent.
- **People, Operations, Systems** — this triad appears multiple times (homepage eyebrow, about heading, pricing footer). It's a deliberate pattern, not accidental repetition.

### What Changed From the Original Build
The original copy (written by Claude) was slightly more formal and led with Kalea's process. Matt and Blake rewrote it to:
- Lead more with client outcomes ("your business runs better") rather than Kalea's methods
- Soften the "we own everything" tone to "we work with you"
- Add the journey framework (Start Better / Run Better / Grow Better) which is more aspirational than the original model-card approach
- Remove the specific $100/hr rate reference from the pricing page
- Rename "Execution" to "Business Transformation" on the services page — signals bigger thinking
- Add AI integration explicitly to the services list (Workflow Automation & AI Integration)

### Blue Collar / SMB Niche
An emerging positioning direction — not yet explicit on the site but present in the About page philosophy section being built. The pitch: *"owner-operated businesses where the people doing the work are exceptional at it, and need a partner to help the business keep up with them."* Trades, field services, home services (Jobber appears prominently in service listings). This should inform future case study copy and any homepage refresh.

### CTAs
- Primary CTA across all pages: **"Start a Conversation"** → `/#contact`
- Pricing page uses journey-specific CTAs: "Start Better" / "Run Better" / "Grow Better"
- About page (in progress) uses: **"Get in Touch"**
- Services page closes with: **"Start a Conversation"**
- Keep CTA language consistent with page context — avoid generic "Learn More"

---

## Contact Form

Provider: **Formspree**
Endpoint: `https://formspree.io/f/mykogdvw`
Handled by: `handleSubmit()` in `main.js`
Fields: Name, Company, Email, Interest (dropdown), Message

Dropdown options (current):
- Build the Foundation (Start Better)
- Optimize the Business (Run Better)
- Lead with Confidence (Grow Better)
- I'm not sure
- Existing Client
- General Question

---

## Known Notes & Gotchas

- **Do not put Liquid tags (`{% %}`) inside HTML comments** in any `_includes/` file — Jekyll parses Liquid inside comments and causes infinite include loops (hit this on first deploy)
- **Line endings:** Git on Windows will warn about LF → CRLF conversion. Harmless — ignore it
- **Browser cache:** Cloudflare caches aggressively — always test in incognito or hard refresh (`Ctrl+Shift+R`) after deploy
- **`styles.css` typo (fixed):** A stray `model` word was inserted into the `body` font-family rule during editing. Fixed with a targeted commit. Watch for this kind of thing when editing CSS directly in GitHub's web editor
- **`pricing.html` filename vs label:** File is named `pricing.html` but displayed as "How We Work" everywhere. The `<title>` now correctly reads "How We Work." The filename mismatch is intentional for now — renaming would need a `_redirects` entry
- **Two brand palettes:** Warm navy/mauve/cream (this site) and cool teal (Word documents in `kalea_base.js`). Intentionally separate — do not mix
- **Mobile nav:** Hamburger menu implemented in `main.js` and `styles.css` — was missing from the original single-file site
- **Upwork blocks automated fetching** — profile content must be copied manually for case studies

---

## Upwork Profiles

- **Blake:** https://www.upwork.com/freelancers/~01bff2df6c91d4093b
- **Matt:** https://www.upwork.com/freelancers/~01e8d5e5555738f465

Matt's project history from Upwork is the primary source for future operations case studies on `work.html`.

---

## Adding a New Page

1. Create `pagename.html` in the repo root
2. Add front matter:
   ```yaml
   ---
   layout: default
   active: pagename
   title: Page Title
   description: "Meta description."
   ---
   ```
3. Add nav link to `_includes/nav.html`:
   ```html
   <li><a href="/pagename.html"{% if include.active == "pagename" %} class="active"{% endif %}>Label</a></li>
   ```
4. Add any new CSS to `styles.css`
5. Commit with a descriptive message and push
