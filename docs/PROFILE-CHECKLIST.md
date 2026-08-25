# Founder profile consistency

Checked 2026-08-24. The website changes remain local until the feature branch is approved and pushed.

## GitHub

Current public state checked through the GitHub API and profile page:

- Display name: `Josh Hegstad`
- Bio: empty
- Website: empty
- Profile README repository: missing
- Current pins: Jazz-Guitar-Web-App, Guitar-Trainer, BRH, Cover-Letter-Generator

Set these values:

- Display name: `Joshua Hegstad`
- Bio: `Co-Founder & CTO, building an AI history company. Full stack AI engineer. Columbia CS.`
- Website: `https://www.joshhegstad.org`
- Location: keep the current value if it is accurate
- Available for hire: off

Create a public repository named `hegstadjosh` and use the README draft below. Pin these repositories in this order:

1. `river`
2. `josh-portfolio`
3. `dont-fret`
4. `SUITS-24-25-EVA` or `SUITS-Spectacles`
5. `pdf-to-anki`
6. `simple-gpt-pdf-chat`

## LinkedIn

Update the public profile at `https://www.linkedin.com/in/joshua-hegstad-976ba2242/`:

- Display name: `Joshua Hegstad`
- Headline: `Co-Founder & CTO, building an AI history company | Full stack AI engineer | CS @ Columbia, C.P. Davis Scholar`
- Website: `https://www.joshhegstad.org`
- About: use the three-paragraph README draft below, with the final link sentence adapted for LinkedIn
- Open to Work: off
- Photo: choose a current, front-facing headshot before publishing; no suitable source image was present in this repository

Replace the current student-first headline and short student bio. Keep legitimate scholarship and Columbia details in supporting positions, not as the lead identity.

## Profile README draft

# Joshua Hegstad

I’m a co-founder and CTO building an AI history company. I work on retrieval, grounding, and live voice systems that keep conversations faithful to the source record.

I’m a full stack AI engineer and study computer science at Columbia. My public work includes Debt Vulture, which found its first paying customer in a hedge fund, AlignEd, and augmented-reality systems built for NASA SUITS.

Most of my current work is private. You can find selected projects at [joshhegstad.org](https://www.joshhegstad.org) and public code in the repositories below.

## Repository cleanup commands

Review each repository once, then run the relevant commands yourself. These commands archive repositories; they do not delete them.

```bash
gh repo archive hegstadjosh/context7 --yes
gh repo archive hegstadjosh/playwright-mcp --yes
gh repo archive hegstadjosh/brave-search-mcp-server --yes
gh repo archive hegstadjosh/web-search-mcp --yes
gh repo archive hegstadjosh/ebook-mcp --yes
gh repo archive hegstadjosh/news-api-mcp --yes
gh repo archive hegstadjosh/CommitGraph --yes
gh repo archive hegstadjosh/developerFolio --yes
gh repo archive hegstadjosh/developer-portfolio --yes
gh repo archive hegstadjosh/sonar --yes
gh repo archive hegstadjosh/SUITS_CameraFeed --yes
gh repo archive hegstadjosh/SUITS-HoloLens --yes
gh repo archive hegstadjosh/TSS-2025 --yes
gh repo archive hegstadjosh/LunarLions-2025-Spectacles --yes
gh repo archive hegstadjosh/2020-Coding-Challenge --yes
```

After editing both profiles, verify them in a private browser window. Confirm the display name, headline or bio, website, pins, profile README, and Open to Work state all match this checklist.
