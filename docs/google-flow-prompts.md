# Google Flow prompts (Step 4)

Ten assets: hero, five services, demo backdrop, final call to action, plus the missed-call story clip. Every prompt uses the same style block and the same palette so the set reads as one system.

## How to use

1. Paste the **Style block** first (or at the start of every prompt), then the asset prompt.
2. Generate 3 to 4 takes per asset and keep the cleanest. Reject anything with a gradient, glow, lens flare, text, logo, or a human face.
3. Send the files back named exactly as in the **File** line. I will do the rest (WebP conversion, ffmpeg frames, canvas sequence, Supabase upload).
4. Video: 16:9, 1920x1080, 24 or 30 fps, loops cleanly (last frame equals first frame) unless it says "one-way". Stills: 16:9 or as noted, PNG.

## Style block (prepend to every prompt)

> Flat 2D vector motion-graphics style. Solid colour fills only. No gradients, no glow, no soft shadows, no blur, no lens effects, no texture, no 3D rendering, no photorealism, no text, no letters, no logos, no human faces. Clean geometric shapes, even 4px-equivalent line weight, rounded corners. Strict palette only: deep forest black #0B1512 (background), moss green #14302A (surfaces), chalk off-white #F1F4EC, steel green-grey #8FA39A, lime #C8F169 (actions and highlights), violet #7C5CFF (anything live or speaking). Violet appears in no more than about 2 percent of the frame, lime about 8 percent. Generous empty space. Calm, precise, confident mood.

## Negative prompt (use if the tool has a field for it)

> gradient, glow, neon, bloom, shadow, blur, vignette, texture, grain, 3D render, photorealistic, text, letters, numbers, logo, watermark, face, hands, stock-photo look, sparkles, floating blobs, glassmorphism

---

## 1. Hero scene reference: "Agents converge into the C"

**File:** `hero-converge.mp4` (loop, 6s) and `hero-converge-poster.png`
**Use:** reference for the Three.js hero scene, poster fallback for reduced motion and phones, and the home page `og:image`.

> Six-second seamless loop. Background solid #0B1512. About 24 small solid circles in chalk #F1F4EC and steel #8FA39A, each with a short thin trailing line in steel, drift in slowly from the edges of the frame. They ease inward and settle into an open-arc letter "C" made of a single thick rounded stroke in chalk, open on the right side. When the last circle lands, one lime #C8F169 dot appears in the exact centre of the C and pulses once with a flat ring that expands and fades by opacity only (no glow). The circles then release back to the edges and the loop restarts. Camera locked, no zoom. C mark occupies the centre 40 percent of the frame, leaving large empty space left and right for headline text.

**Poster:** the settled frame, C complete, lime dot in the centre, no circles in motion.

## 2. Services 01: Voice agent answers the phone

**File:** `service-01-voice.mp4` (loop, 6s)

> Six-second loop. Background #14302A. Centre: a simple rounded-rectangle phone shape in chalk outline. A steel ring pulses outward from it twice (ringing), then the ring stops and a horizontal voice waveform of 9 vertical rounded bars in violet #7C5CFF appears beside the phone and animates up and down as if speaking. A small lime dot in the top corner of the phone turns on to show the call is answered. Bars are flat, equal width, no glow. Loop returns to the ringing state.

## 3. Services 02: Instant follow-up

**File:** `service-02-followup.mp4` (loop, 6s)

> Six-second loop. Background #14302A. On the left a small steel circle (a lead) appears. A thin chalk line draws from it to the right, and a rounded message bubble shape (empty, no text) pops in, then a second bubble below it with a lime tick shape inside to show it was delivered. A small flat clock shape on the left shows a short arc, to suggest speed. Everything moves with quick ease-out, about 0.3s per step, then holds, then fades to start.

## 4. Services 03: Booking into the calendar

**File:** `service-03-booking.mp4` (loop, 6s)

> Six-second loop. Background #14302A. A flat calendar grid, 5 columns by 4 rows of rounded squares in steel outline, no numbers or text. One square at a time fills solid chalk (busy slots). A phone-shaped icon in the corner emits a short ring; the next empty square then fills solid lime #C8F169 with a flat checkmark drawn inside, as if booked. The booked square scales up by 6 percent and settles. Then the grid clears and loops.

## 5. Services 04: Reactivating old customers

**File:** `service-04-reactivation.mp4` (loop, 6s)

> Six-second loop. Background #14302A. A row of 10 steel circles (a customer list), most dimmed to steel at 40 percent opacity. A lime ring sweeps left to right once along the row; each circle it touches turns solid chalk, and every third circle sends a small arrow curving upward to a lime dot at the top right (customer returned). The final lime dot count grows from 1 to 3. Everything resets for the loop.

## 6. Services 05: Reporting

**File:** `service-05-reporting.mp4` (loop, 6s)

> Six-second loop. Background #14302A. A flat bar chart with 6 vertical rounded bars in chalk, no axes labels, no numbers. The bars rise one after another with ease-out. The last bar is lime #C8F169 and is the tallest. A thin steel dashed horizontal baseline sits under the bars. A small violet dot blinks near the top right to show the report is live. Hold two seconds, then bars shrink back down.

## 7. Demo backdrop: "Talk to Aria"

**File:** `demo-backdrop.mp4` (loop, 10s) and `demo-backdrop.png`
**Use:** quiet backdrop behind the Aria panel and the demos page. It must not compete with the waveform.

> Ten-second very slow seamless loop. Background solid #0B1512. Five thin concentric circles in moss #14302A outline, centred slightly right of the middle, slowly expanding outward and fading to nothing by opacity, one new ring starting every two seconds, like sonar. A single small violet #7C5CFF dot sits at the exact centre and breathes between 80 and 100 percent size. Nothing else. Very low contrast, calm, with at least 70 percent of the frame empty.

## 8. Final call to action

**File:** `cta-lime.mp4` (loop, 8s) and `cta-lime.png`
**Use:** a flat lime section (#C8F169) with huge ink type on top. The motion must be quiet enough to read black text on.

> Eight-second seamless loop. Full frame solid lime #C8F169. A small open-arc letter "C" in ink #0B1512, with a centred ink dot, sits at the bottom right at about 12 percent of frame height. Slowly, 12 thin ink-outline circles of different sizes drift upward in a column at the right edge and fade out by opacity, one every 0.6s. Everything else is empty lime. No other colours.

## 9. Missed-call story (carry-over from the PRD, polished)

**File:** `story-missed-call.mp4` (one-way, 8s)

> Eight-second one-way clip. Background #0B1512. Phase 1 (0 to 2s): a flat phone shape rings, with 3 steel rings expanding, and a small steel clock fills. Phase 2 (2 to 4s): the rings stop, the phone greys to steel at 40 percent, and a calendar slot beside it stays empty (steel outline). Phase 3 (4 to 6s): the phone becomes chalk, violet waveform bars appear beside it (an agent answering). Phase 4 (6 to 8s): the calendar slot fills solid lime with a flat checkmark. Hold the last frame.

## 10. Receptionist illustration (carry-over, polished)

**File:** `receptionist.png` (still, 16:9)

> Flat vector illustration of a friendly receptionist agent as a simple rounded character with a headset, seated at a desk, shown from the side, no face details (a plain solid chalk circle head, no features). Desk in moss #14302A, body in steel, headset in lime accent, wide format, deep forest black #0B1512 background, a small violet waveform shape floating above the desk to show speech. No shadows, no gradients.

---

## Handoff (what I do with what you send back)

| Asset | Pipeline |
| --- | --- |
| Hero video | Extract frames with ffmpeg at the native frame rate (cap 60fps) to WebP; build a canvas image sequence scrubbed by GSAP ScrollTrigger; keep the poster for reduced motion and phones |
| Service videos (x5) | Encode to H.264 MP4 and WebM, under 1.5MB each, muted, autoplay on view; upload to Supabase Storage; poster frames for reduced motion |
| Demo backdrop, CTA | Same as service videos; CTA keeps a still for reduced motion |
| Stills | Convert to WebP, 1x and 2x; upload to Supabase Storage |

Command I will run for the frame extraction (so you know what to expect):

```
ffmpeg -i hero-converge.mp4 -vf "fps=min(source_fps\,60),scale=1920:-2" -c:v libwebp -quality 80 frames/hero-%04d.webp
```

## Checks before you send files

- No gradients, glows, or soft shadows anywhere (zoom into edges of shapes).
- Colours are close to the six hex values. I will snap near-matches to the exact tokens in post if needed.
- Loops: last frame matches the first frame.
- No text or logos inside the images.

---

## Revision 3: Brick Crew prompts (replaces the round-dot cast prompts)

Direction: the crew is built from one toy-brick kit, in the spirit of the lemlist-style brick look (see `docs/mascot-research.md`). Same style block as above (flat colour, palette only, 4px ink outline, hard offset shadow, no gradients, no text). Generate, then send the files back.

1. **Crew sheet (image):** "Flat vector character sheet of seven toy-brick characters standing in a row on a lime (#C8F169) background. Each is built from stacked bricks with round studs on top, two dot eyes and a tiny smile, thick ink (#0B1512) outline, hard offset shadow, flat fills, no gradients. Aria lime with a headset and waveform smile. Echo lilac (#CFC4FF) with two ghost copies behind. Slot ink with a small calendar on its belly. Boomerang violet (#7C5CFF) with a curved lime tail. Tally chalk (#F1F4EC) with a three-bar chart belly. Gate dark green (#14302A) arch-shaped with a lime door ajar. Ledger steel (#8FA39A) wide with ruled lines and a pen. No text."
2. **Snap into the C (video, 6s loop):** "Seven flat toy-brick characters drop in one by one with a small bounce and snap into a ring around a rounded white square holding a bold letter C. Then they gently bob. Lime background, flat vector, thick ink outline, hard shadow, smooth easing, no text."
3. **Call to calendar (image):** "Flat vector illustration: a toy-brick character with a headset answers a ringing phone, a calendar made of bricks fills with one lime day. Lime and violet palette, thick ink outline, hard offset shadow, sticker style, no text."
4. **Founders (image):** "Two friendly toy-brick characters at a table with laptops, studs on their heads, flat vector, ink outline, lime background, no text."
5. **Brick badges (image):** "Shield-shaped badge built from toy bricks in lime, violet and ink with a blank plate, flat vector, hard shadow, transparent background, no text." (for Receipts and proof, like lemlist's brick award badges)
6. **Sticker pack (images, 12):** "Twelve sticker-style reactions of the brick characters (thumbs up, phone ringing, calendar done, sleeping, celebrating, thinking, error, handover), flat vector, white outline border, transparent background."
