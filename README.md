# Lets Work For Bangladesh — modern SPA

A modernised, single-page redesign of [letsworkforbangladesh.org](https://letsworkforbangladesh.org/),
built as a fast, responsive, dependency-free static site.

**Live:** https://ghaliba3.github.io/lwfb/

## About the original

Lets Work For Bangladesh (LWFB) is a charitable, not-for-profit, voluntary and
non-political organisation founded by nine Bangladeshi-Australians. Its motto is
**"not for income, but for outcome"** — no offices, no salaried staff, no
administration costs, so donations reach the ground through trusted local partners.

## Sections

- **Hero** with mission and impact badges
- **About** — values (outcome-focused, trusted partners, transparency, basic needs)
- **Our Causes** — Ramadan Food Packages 2026, Zakat Appeal for Prosthetics, Clean Drinking Water (with live funding progress)
- **Impact** — animated statistics
- **Get Involved** — Donate / Sponsor / Share
- **Team** — the elected volunteer committee (AU, USA, UK, Canada)
- **Contact** — newsletter, socials, and org details (ABN 88 170 406 805)

## Tech

- Plain HTML + CSS + vanilla JS — no build step, no framework.
- `IntersectionObserver` for scroll reveals, animated counters and funding bars.
- Fully responsive with a mobile nav; respects `prefers-reduced-motion`.
- Palette drawn from the Bangladesh flag (bottle green `#006a4e`, red `#f42a41`).

## Notes

This is an **unofficial redesign concept**. All "Donate" actions link to the
official site's donation page. Content was adapted from the public website for
demonstration purposes.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```
