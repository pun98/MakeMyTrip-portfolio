# Behind the Booking

A portfolio for **Puneet Madhav**, built as a travel product rather than a résumé site.
Concept: *The traveler sees the booking. I build what's behind it.* — every emotional travel
artifact on the site flips to reveal the supply-side machinery underneath.

Static site — plain HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

## Structure
```
index.html                          all content, organised as a journey (Departures → Check-in)
assets/styles.css                    visual identity (sky/sunset + teal route · Fraunces/Inter/JetBrains Mono)
assets/app.js                        flip pass, route map, dashboard, routing, easter egg
assets/Puneet-Madhav-Resume.pdf      the downloadable one-pager (the "baggage tag")
```

## The experience
- **Departures** — a cinematic sky hero with a **boarding pass** that flips to a supply-side manifest (the thesis, dramatized).
- **The Route** — career as an animated flight path; tap a pin, including the pulsing *next stop: MakeMyTrip*.
- **Stays** — case studies as bookable hotel listings: star ratings, "guest reviews" (the real numbers), amenities, sort.
- **Playbook** — product principles, each with a receipt.
- **Console** — a *concept* hotel-partner dashboard (clearly labelled "a sketch, not real data").
- **Cold Start** — the self-initiated activation note for Connect (the forwardable centrepiece).
- **Field Notes** — short essays on marketplaces, trust, and supply.
- **Check-in** — contact, styled as a booking confirmation.

## Run locally
```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy on GitHub Pages
1. Create a public repo (e.g. `behind-the-booking` or `puneet-madhav`).
2. Push these files to the repo root:
   ```bash
   git init && git add . && git commit -m "Behind the Booking portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)` → Save.
4. Live in ~1 minute at `https://<your-username>.github.io/<repo>/`.

## Notes
- **Easter egg:** click `Behind the Booking · v2.0` in the footer, or press `g` then `p`, to open *PRD v2.0 — This Website*.
- **Keyboard:** press `f` on the hero to flip the pass.
- **Privacy:** `assets/Puneet-Madhav-Resume.pdf` contains a phone number and will be public once deployed. Swap or remove it if you'd rather not publish that.
- The Console dashboard uses **illustrative sample data for a hypothetical property** ("The Coorg Homestead") and says so on screen — no personal metrics are fabricated.
- Respects `prefers-reduced-motion`. Mobile-first; all content is real HTML and works without JavaScript.
```
