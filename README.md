# BubbleLab Community — Landing Page

> Run the community. Not the ops.

The marketing landing page for **BubbleLab Community** — the infrastructure
platform behind private professional communities (applications, member
directories, 1:1 matchmaking, events, lifecycle automations). It exists to give
the community product its own home, separate from `bubblelab.ai`.

## The hero

A cinematic, single-page hero built around the brief:
**render really cool humans, then zoom out and show they're all connected
through us.**

- A fullscreen looping video of a diverse group gathered around a warm,
  string-lit garden dinner — the people *are* the scene (not UI cards on top).
- On scroll, the camera **zooms out** to reveal the whole gathering, the
  headline fades, and a "held together by one platform" line + live community
  stats fade in — the *connected-through-us* payoff.
- Below the fold: testimonial → features → product preview → how-it-works →
  CTA → footer, each with scroll-into-view reveals.

## Design system

Adapted from the **Adaline** botanical-journal aesthetic:

- **Palette** — cream paper `#fbfdf6`, botanical ink `#0a1d08`, warm loam
  `#4a3212`, forest floor `#203b14`, moss veil `#d7e8b5`. The hero runs dark/warm
  over the video; the content sections are light cream; the CTA + footer return
  to dark for a cohesive base.
- **Type** — Inter (display/body, tight tracking) + JetBrains Mono (micro-labels),
  standing in for Akkurat / Fragment Mono.
- **Motion** — Framer Motion. Window-`scrollY`-driven hero (the zoom-out + reveal),
  `whileInView` reveals below the fold, film grain, ambient warmth.

## Stack

- Next.js (App Router) · React · TypeScript
- Tailwind CSS v4
- Framer Motion

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Notes

- The hero clip is hot-linked from Mixkit (free license); swap `VIDEO` in
  `app/scroll-zoom.tsx` to change the scene.
- Accessibility: visible keyboard focus rings, `prefers-reduced-motion` support,
  decorative media hidden from screen readers.
- Performance: poster preload + CDN preconnect; the hero video pauses when
  scrolled out of view.
