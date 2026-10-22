# Mascot research and direction

Pattern research only. Sources are marketing and design blogs, so treat them as practitioner advice, not proof.

## What the reference site does
lemlist (the 90% layout reference) builds its trust badges (the G2 "Top 50 / Top 100" shields) out of **LEGO-style bricks**: flat-lit studs, stacked rows, saturated primary colours, a real object feel. The personas section uses illustrated figures in the same family. Takeaway: a toy-brick look reads as friendly, modular and "built", which suits a studio that assembles small agents.

## What the best mascots have in common

| Mascot | What it teaches |
| --- | --- |
| Duolingo owl (Duo) | Personality over polish. Humour and a range of emotions make it a character people talk about, and it lives inside the product, not only on the homepage |
| Mailchimp Freddie | Makes software feel human, but if he never appears in the product he stays a figurehead. Use ours in the product moments (demo, empty states, errors) |
| GitHub Octocat | Built from the audience: cat plus octopus reads as "developers, many arms". A mascot should say something about who it is for |
| FIFA World Cup mascots (Willie 1966 to La'eeb 2022) | Rooted in the host's identity (Naranjito the orange, Pique the jalapeno, Zakumi the leopard). Simple silhouette, a name with a story. Also: bold choices polarise, and that is fine |
| Modular systems (TelemetryDeck, Animaker) | Start from one bold base shape, then add expressions, accessories and props as layers, so the character becomes a system |
| LEGO minifigure and stud-and-tube | A tiny kit (studs, bricks) gives endless combinations and instant family resemblance. The stud is the signature mark |

Common rules from the practitioner guides: a **postage-stamp test** (expression and silhouette must read tiny), **few features**, **limited palette**, **round shapes feel friendly**, **test in one colour and on any background**, and check cultural meaning before going international.

## Direction for Conclave: the Brick Crew

- **One kit, seven builds.** Every character is stacked bricks with **studs on top**. Studs are the dots (the brand idea), so the crew is literally "dots that become characters".
- **Same skeleton** (head brick, body brick, arm plates, two dot eyes) so they read as a family. **One loud difference each** so they pass the postage-stamp test:

| Character | Job | Colour | Signature |
| --- | --- | --- | --- |
| Aria | Answers calls | Lime | Headset and a waveform smile |
| Echo | Follows up | Lilac | Two ghost copies stepping away behind it |
| Slot | Books the slot | Ink | A calendar on its belly, one lime day |
| Boomerang | Wins customers back | Violet | A curved lime boomerang tail |
| Tally | Reports the week | Chalk | A rising three-bar chart as its belly |
| Gate | Hands over to a human | Moss | An arch body with a lime door ajar |
| Ledger | Keeps the receipts | Steel | A wide ruled-page body and a pen |

- **Rules:** flat fills from the palette only, 4px ink outline, hard offset shadow (the toy-brick weight, no gradients), minimal faces, one stud style across the whole set. Dark characters get paper eyes.
- **Behaviour (see `docs/motion-implementation.md`):** in the hero they snap in like bricks being placed, then drift around the Conclave mark and lean away from the pointer. Over time they appear inside the product moments (demo, empty states, errors), which is where Duolingo gets its value.
- **Not yet:** naming-story and personality copy, a sticker pack and expression variants (blink, talk, celebrate). The Flow prompts in `docs/google-flow-prompts.md` describe the brick style for the video and sticker assets.

## Update: v2 (glossy, detailed)
Feedback was 5/10: a good start, but wanted more detail and gloss. v2 adds:
- 2.5D bricks with a lit top face, cylinder studs with a specular dot, a specular streak and a shaded underside (flat translucent shapes plus tints and shades of the palette colour, no gradient definitions).
- Hands, foot plates and a contact shadow.
- Glossy eyes with a highlight, cheek shading on light heads, and a distinct face per character (headset, glasses, flat brows, raised brow, half-lids).
- A chest panel per character (speaker grille, ripple, calendar, loop arrow, chart, door and badge, ruled page with a stamp).
- Motion: the eyes blink on their own rhythm and Aria's mouth talks (MotionRoot).
- Moods: `happy`, `oops`, `sleepy`, `wow`, used on the 404 page, the error page, the contact success state and the empty leaderboard.

## Update: v3 replaces the brick robots (Change Spec v3)
The robots with faces and antennae read as a toy cast to clinic and startup buyers, and seven near-identical figures blurred the message. v3 uses **face-less stud patterns on one 7 x 7 grid**, the way the OpenAI dots work:
- Each agent is a pattern (a waveform for Aria, ripples for Echo, a calendar for Slot, an arc for Boomerang, rising bars for Tally, an arch door for Gate, ruled lines for Ledger), drawn from `lib/studs/patterns.ts`.
- The Conclave C is built from the same studs (two rings of 44 and 32, a gap on the right, a centre stud), so the logo and the crew are one system.
- Personality is motion and colour, not a face. Each agent has an idle and an active motion (see `docs/motion-implementation.md`).
- One optional character, a lime rounded square with two stud eyes and no mouth, is used only for 404, errors and stickers.
- It scales to favicon size and avoids copying any real toy brand: generic round studs only.
