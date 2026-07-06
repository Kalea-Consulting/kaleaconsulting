# Kalea Consulting — Website Reference
*Last updated: July 6, 2026 (Deep dive — homepage, work, and about pages substantially rewritten)*

---

## Overview

**Live URL:** https://kaleafirm.com
**GitHub Repo:** https://github.com/Kalea-Consulting/kaleaconsulting
**Local Repo (Blake — desktop):** `C:\Users\blake\Dev\kalea-website`
**Local Repo (Blake — laptop):** `D:\CodeProjects\kalea_website`
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
- CTAs: "Start a Conversation" → `/#contact` | **"Our Story"** → `/about.html` *(changed from "Meet the team")*
- Stats row: Operations (People | Process | Performance) · Systems (Infrastructure | Cloud | Security) · Execution (Implementation | Integration | Automation)

**Services Strip** (navy band)
- Three pills: Operations & Decision Support · Systems & Infrastructure · Execution
- CTA link: "Start Your Journey" → `/pricing.html`

**"Our Promise" Section** (`#about`) — *rewritten again, replaces the earlier Mission/Vision version*
- Label: "Our Promise"
- Heading: *"Built on **integrity**. Guided by **practical leadership**. Driven by **execution**."* — three separate `<em>` accents in one heading (confirm CSS handles multiple `em` spans per heading — it should, since the rule targets the element not a count, but worth a visual check)
- Three text blocks (no longer cards — appears to be plain text blocks now, not the bordered `.mission-block` cards from the original build):
  - **Why we exist** — "We help businesses run better by aligning people, operations, and technology through practical execution."
  - **Where we're going** — vision statement about growing businesses having access to practical leadership, modern technology, and operational support
  - **How we help** — ties back to the people/operations/systems triad
- CTA: **"Our Philosophy"** → `/about.html#better-together` — links to a specific anchor on the About page (see below)

**Contact Section** (`#contact`)
- Heading: *"Let's talk about your business."* *(changed from "Let's talk about business.")*
- Subtext: *"Tell us what you're working on, where you're running into challenges, or where you want to take your business next. We'll help you determine the best path forward."*
- Two phone numbers: USA (623) 738-5101 · CAN (604) 332-0157
- Email: hello@kaleafirm.com
- Location: Sarasota, FL
- Contact form dropdown options: Build the Foundation (Start Better) · Optimize the Business (Run Better) · Lead with Confidence (Grow Better) · I'm not sure · Existing Client · General Question

**Note:** The homepage `#about` section has now been rewritten twice since the original build (first to Mission/Vision cards, now to the "Our Promise" three-block version). If `.mission-block`/`.mission-grid` CSS classes are no longer used anywhere in the HTML, they're dead weight in `styles.css` — worth a cleanup pass next time you're in there.

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

**Substantially expanded.** Filter tabs renamed: All Work · Systems & Infrastructure · **Operations & Strategy** *(was "Operations & Automation")*.

**Systems & Infrastructure — now three case studies (was two):**

1. **NEW — UniFi VLAN Design** ("Home network redesigned for security, clarity, and long-term growth") — includes a **5-star client testimonial quote**, credited by first name in the review text ("...I sought guidance from Matt and his team...")
2. **Tailscale Remote Access** (unchanged problem/solution/outcome copy) — **now also has a 5-star testimonial** quoting the client praising Blake by name
3. **UniFi Network Segmentation** (unchanged) — no testimonial

This is new: **case cards can now include a star-rating + client quote block.** If this doesn't have dedicated CSS yet, that's likely part of what needs styling — a blockquote-style testimonial with star icons, distinct from the Problem/Solution/Outcome body text.

**Operations & Strategy — Matt's case studies have landed, placeholder card is gone:**

The House2Home engagement is now split into **two parallel ongoing case studies** rather than one combined card:

1. **Fractional CIO / Technology Strategy** (Blake's side) — Jobber optimization, **Claude AI and MCP integration**, workflow automation, business systems planning
2. **Fractional COO / Operations Strategy** (Matt's side) — Jobber + QuickBooks, pricing strategy, job costing, bookkeeping workflows, KPI reporting, SOPs

Both tagged "Ongoing," both industry-tagged "Landscaping & Field Services," both use the Problem/Solution/"Current Progress" structure (renamed from "The Outcome" since these are active, not completed).

**Closing CTA changed:** *"Your business could be the next success story."* → "Start a Conversation" (was "Running a business that's great at what it does?")

---

### About (`about.html`)

**Status: Substantially rewritten — live as of July 2026.** This is no longer the resume-style page from the original build; it's grown into a much more personal, narrative page.

**Page hero**
- Label: "Our Story"
- Heading: *"Built because people **deserve better.**"*
- Intro: people/operations/systems-first philosophy — "Build, sustain, and grow the business around people first. When people thrive, businesses thrive."

**Blake Rice — Technology & Infrastructure** (Chilliwack, BC — Canada)
- *Education:* B.Sc. Bachelor of Computer Science — University of the Fraser Valley (Major: Computer Information Systems · Minor: Business Administration); PCC — Professional Communications Certificate, UFV
- *Certifications:* AZ-104 — Microsoft Certified Azure Administrator
- Professional bio paragraph (expanded from original)
- **New — personal paragraph:** family (wife + five kids), hockey/lacrosse, camping, hiking, curling, football, dreams of sailing the coast
- **New — closing pull-quote:** *"Though the mountains be shaken and the hills be removed, yet my unfailing love for you will not be shaken nor my covenant of peace be removed"* — Isaiah 54:10
- Upwork profile link

**Matt Schlagel — Operations & Strategy** (Sarasota, FL — USA)
- *Education:* B.S. Bachelor of Science — Arizona State University (Major: Business Data Analytics · **4.0 Summa Cum Laude**) — *updated from the earlier "Bachelor of Science in Business"*
- *Certifications — expanded significantly:*
  - CMA — Certified Management Accountant Candidate
  - **QBO — Intuit ProAdvisor QuickBooks, Level 1 & 2** *(new)*
  - **P-BI — Microsoft Power BI Data Analyst** *(new)*
  - **TAB — Tableau Data Analyst** *(new)*
  - **PY — Python Data Analyst** *(new)*
- Professional bio paragraph (expanded)
- **New — personal paragraph:** moved from Colorado to the Florida coast, travel, fishing, three-legged cat named Leilani, beekeeping/chickens/ducks
- **New — closing pull-quote:** *"The only reason for time is so that everything doesn't happen at once."* — Albert Einstein
- Upwork profile link

**"Better Together" Section** — `id="better-together"` *(new — this is the anchor the homepage "Our Philosophy" CTA links to)*
- Heading: *"More than **operations.** More than **technology.**"*
- Combined narrative paragraph on why the two disciplines work together
- Four pillars (no longer a bullet list — reads as a labeled paragraph grid now): **People** · **Operations** · **Systems** · **Execution as One**

**"Partnerships & Professional Credentials" strip** *(new)*
- Text-based badge row: **Jobber Partner** · QuickBooks ProAdvisor · Microsoft Azure · Certified Management Accountant (CMA) Candidate
- **This confirms the Jobber Partner mention is already live as plain text** — the visual badge graphic and referral link are still the pending items in the Roadmap section below

**Closing CTA**
- Heading: *"Enough about us. Let's talk about you."*
- Button: **"Tell us your story"** → `/#contact` *(changed from "Get in Touch")*

**CSS note:** The personal pull-quotes (Bible verse, Einstein quote) and the testimonial quotes on `work.html` both need italic/color treatment — this is likely what's being tackled in the current CSS pass. Also worth checking: the "Our Promise" heading on the homepage and the "Better Together" heading here both use multiple `<em>` tags in a single heading (two and two respectively) — confirm the existing `em` mauve-italic rule renders correctly with more than one accent per line, since earlier headings only ever used one `<em>` at a time.

---

## Roadmap / Next Steps

Open items, roughly grouped.

### Active — CSS Pass (in progress)
Blake is currently working on styling for:
- **Testimonial quotes on `work.html`** — new star-rating + client quote blocks on the UniFi VLAN Design and Tailscale case cards need italic/color treatment distinct from the Problem/Solution/Outcome body copy
- **Personal pull-quotes on `about.html`** — Bible verse (Blake) and Einstein quote (Matt) closing each bio
- **Multi-`<em>` headings** — confirm the mauve-italic `em` styling still renders correctly now that some headings (homepage "Our Promise," About page "Better Together") use two or three `<em>` accents in a single line instead of one

### Content
- ~~Matt's case studies~~ ✅ **Done** — landed as two parallel Fractional CIO/COO case studies on `work.html`, split by discipline (Blake/CIO side, Matt/COO side)
- ~~Matt's additional credentials~~ ✅ **Done** — QuickBooks ProAdvisor, Power BI, Tableau, and Python Data Analyst certifications all added to `about.html`, plus his ASU degree detail updated (Business Data Analytics, 4.0 Summa Cum Laude)
- **`.mission-block` / `.mission-grid` CSS cleanup** — the homepage `#about` section has been rewritten twice (Mission/Vision cards → "Our Promise" text blocks). If the card-based CSS classes are no longer referenced in the HTML, they're dead code in `styles.css` — worth removing next cleanup pass
- **Blue collar / SMB niche messaging** — still mostly implicit (Landscaping & Field Services tags on `work.html`, Jobber-heavy service copy) rather than stated outright anywhere. Worth a decision on whether it becomes an explicit positioning line somewhere prominent as the niche solidifies

### Jobber Partner Program
Kalea was accepted as a Jobber Partner. Text mention is now live (see About page "Partnerships & Professional Credentials" strip). Two components still not built:
- **Partner badge (graphic)** — need to pull the actual badge asset and brand usage guidelines from the Jobber Partner dashboard (not accessible to Claude). Leaning toward moderate visibility rather than homepage-prominent.
- **Referral link** — a CTA for prospects who want to sign up for Jobber directly. Link/tracking format TBD once pulled from the partner dashboard.

### Payment Processing
Still being scoped — not yet decided:
1. **Kalea invoicing** — clients pay Kalea directly through the site (e.g., Stripe integration). Real financial infrastructure, more involved.
2. **Jobber Payments promotion** — content-only addition describing Jobber Payments as part of the Jobber implementation service offering. Low lift.
3. Possibly both, but worth deciding which problem is actually being solved before scoping either.

### Housekeeping
- **`pricing.html` URL** — file is named `pricing.html` but labeled "How We Work" everywhere. Renaming would require a `_redirects` file for backwards compatibility. Low priority.
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
Two rounds of edits so far. First round (services, pricing, initial about):
- Led more with client outcomes ("your business runs better") rather than Kalea's methods
- Softened the "we own everything" tone to "we work with you"
- Added the journey framework (Start Better / Run Better / Grow Better)
- Removed the specific $100/hr rate reference from the pricing page
- Renamed "Execution" to "Business Transformation" on the services page
- Added AI integration explicitly to the services list

Second round (homepage, about, work — this session) pushed the voice further toward **personal and values-driven**, not just direct:
- Homepage About section rewritten again from Mission/Vision cards to a more narrative "Our Promise" (Why we exist / Where we're going / How we help)
- About page fully rebuilt around **people first, credentials second** — both team bios now include real personal detail (family, hobbies, pets) and a closing personal quote (scripture for Blake, Einstein for Matt). This is a deliberate shift: the site now leads with *who these people are* before *what they're certified in*.
- Work page case studies now include **verbatim client testimonials with star ratings** — first time the site quotes someone other than Kalea. This is a trust-signal upgrade from pure narrative case studies.
- The "people first" philosophy is now stated outright on the About page hero: *"Build, sustain, and grow the business around people first. When people thrive, businesses thrive."* This is a stronger, more explicit values statement than anything in round one.

### Blue Collar / SMB Niche
Still mostly *implicit* rather than stated outright — shows up as "Landscaping & Field Services" tags on the work.html case studies and heavy Jobber presence in service copy, but there's no single explicit sentence anywhere claiming this niche the way the earlier About-page draft did. Worth a decision on whether to make it explicit again as the niche solidifies, or whether letting the case studies speak for themselves is the intended approach now.

### CTAs
- Primary CTA across most pages: **"Start a Conversation"** → `/#contact`
- Homepage hero secondary CTA: **"Our Story"** → `/about.html` *(changed from "Meet the team")*
- Homepage "Our Promise" section CTA: **"Our Philosophy"** → `/about.html#better-together`
- Pricing page uses journey-specific CTAs: "Start Better" / "Run Better" / "Grow Better"
- About page closing CTA: **"Tell us your story"** → `/#contact` *(changed from "Get in Touch")*
- Work page closing CTA: **"Start a Conversation"** under heading *"Your business could be the next success story."*
- Keep CTA language consistent with page context — avoid generic "Learn More". Note the trend: CTAs are getting more narrative/personal ("Tell us your story," "Our Story") rather than purely transactional — worth keeping new CTAs in that register

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
- **Two local machines:** Blake works from both a desktop (`C:\Users\blake\Dev\kalea-website`) and a laptop (`D:\CodeProjects\kalea_website`). `git status` only compares against the last local fetch — it won't tell you if the remote has moved unless you `git fetch origin` first. Run `git fetch` before trusting `git status` when switching machines, especially if Matt might have pushed in the meantime.

---

## Upwork Profiles

- **Blake:** https://www.upwork.com/freelancers/~01bff2df6c91d4093b
- **Matt:** https://www.upwork.com/freelancers/~01e8d5e5555738f465

Both profiles are now linked directly from each team member's section on `about.html`. Matt's project history was the source for his two case studies now live on `work.html` (Fractional COO / Jobber + QuickBooks work). Note Upwork blocks automated fetching — any future case study content still needs to be copied manually.

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
