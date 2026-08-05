# Nine Ad Sales — End-to-End Demo Voiceover Script

**Runtime target:** ~7:27 of video
**Audience:** Nine Entertainment executives
**Voice:** Charlotte (or chosen modern editorial female) · **Stability** 48 · **Similarity** 75 · **Style** 22 · **Speed** 0.95×
**POV:** first-person as Nine ("our sellers", "we catch the drift")
**Through-line:** AI does the busywork, our sellers keep the relationship. Grounded on Nine's e3: Efficiency, Effectiveness, Enjoyment.

One continuous script, split into **four ElevenLabs generations** at the story↔demo act seams. Generate each block with the **same voice and settings** so they stitch seamlessly. Paste each fenced block on its own. The `<break time="Xs"/>` tags are SSML pauses ElevenLabs respects natively.

> **Calibration note (v5 — confirmed):** simplest reliable rule is **~3.3 words/sec including pauses**. Confirmed data points, same voice/settings:
> - Gen A: 86w → 25.5s (3.4 w/s)
> - Gen C v4: 600w → **3:02 (182s)** (3.3 w/s) ✓
> - Gen C v3: 740w → 3:53 (233s) (3.2 w/s)
> - Gen B: 480w → 2:03 (3.9 w/s — the outlier; read faster)
>
> Use **words ≈ target_seconds × 3.3**. Gen C at 3:02 is a keeper, leave it. Keep speed 0.95×.

---

## Generation A — Story open (sections 1–3, ~35s) · v2, ~115 words

```
<break time="0.4s"/>
This is one deal at Nine.
<break time="0.4s"/>
Followed from the very first conversation, all the way through to a campaign that looks after itself.
<break time="1.0s"/>

Three people. One deal. And three chapters.
<break time="0.4s"/>
Efficiency. Effectiveness. And the one we don't talk about nearly enough. Enjoyment.
<break time="0.8s"/>

Chapter one begins before the deal even exists.
<break time="0.5s"/>
Because the best sellers never start from a blank screen. They start with a head start.
<break time="0.5s"/>
They walk in already knowing the account, the history, and the opportunity in front of them.
<break time="0.5s"/>
And at Nine, that head start now arrives every single week. For everyone.
<break time="0.6s"/>
```

---

## Generation B — Demo, Chapter I / Efficiency (sections 4–8, ~2:26) · v2, ~480 words

```
<break time="0.3s"/>
For our sellers, every week now opens with a briefing. Not a blank screen.
<break time="0.4s"/>
Right inside Slack, our Slackbot frames the week ahead. It surfaces the pipeline deals that actually matter, and shows exactly how every live campaign is pacing.
<break time="0.4s"/>
It's one cockpit. The whole book of business, in a single glance.
<break time="0.4s"/>
Everything the seller needs to focus on this week, waiting for them before they've even had their coffee.
<break time="0.4s"/>
And it travels with the team. A seller shares it as a snapshot, and their sales manager sees precisely what they see. Same numbers. Same picture. No re-explaining.
<break time="0.4s"/>
And all of it runs on reusable skills. So this intelligence isn't locked away on one desk, with one person. It belongs to every seller, right across Nine.
<break time="0.8s"/>

Then, on the way to the meeting, the brief comes with them.
<break time="0.4s"/>
Right there on the phone, in a moment, the seller can see who they're about to meet, and what truly matters to them. The full history of the account. And every campaign running for them right now.
<break time="0.4s"/>
No late night before. No scramble in the car park. Our sellers walk into that room genuinely prepared.
<break time="0.8s"/>

And once they're in the room, the seller does one thing, and one thing only. They have the conversation.
<break time="0.4s"/>
The notes, the context, every important detail, our AI quietly captures all of it into Atlas. Nobody reaches for a notepad. Nobody breaks eye contact to type.
<break time="0.8s"/>

Now, Hannah's brief for this campaign could arrive in absolutely any form. An email. An attached document. Or simply something said out loud in the meeting.
<break time="0.4s"/>
Whatever the channel, the RFP Agent reads it, understands it, and turns it into a structured opportunity inside Atlas. Fully formed, and ready to work.
<break time="0.8s"/>

And after the meeting? This is where the real work used to begin. Now, it's already done.
<break time="0.4s"/>
Every conversation, whether it happened in person or on a video call, is analysed and turned into intelligence. A clean summary. A full transcript. The buying signals, the objections raised, and the next steps agreed.
<break time="0.4s"/>
And it doesn't just record. It coaches. Against the MEDDPICC scorecard, it shows each seller exactly where this deal is strong, and where it still needs work.
<break time="0.5s"/>
Then it fills the opportunity in for them. The deal details, the handoffs, the inspection, all drawn straight from what the meeting actually surfaced.
<break time="0.5s"/>
And this is the pattern you'll see everywhere you look. The busywork goes to the AI. The relationship stays with our people.
<break time="0.7s"/>
```

---

## Generation C — Bridge + Demo, Chapter II / Effectiveness (sections 9–10, ~3:06) · v4, ~600 words

```
<break time="0.3s"/>
Chapter two.
<break time="0.3s"/>
The brief is in, and the conversation went well. Now comes the part that was always the hardest, and the slowest. Turning that promise into a plan.
<break time="0.4s"/>
Because a great meeting is only ever half the job. The deal still has to be built, and it has to be built right, the first time.
<break time="0.4s"/>
This is where good work used to get lost in the busywork. The re-keying, the chasing, the version that never quite matched the brief.
<break time="0.4s"/>
Not any more. This is effectiveness.
<break time="0.6s"/>

This is the Ad Sales Command Centre, and the brief from that meeting has just landed here.
<break time="0.4s"/>
But look at what's already in motion. Behind the scenes, our agents are working the deal for us. Gathering the context, standing up the records, lining up every single thing the seller is about to need.
<break time="0.4s"/>
Our seller hasn't lifted a finger yet, and the deal is already well underway.
<break time="0.5s"/>

Here is the advertiser, in full. Advertiser three sixty brings every relationship, every contact, and every thread of history into one connected view.
<break time="0.5s"/>

And the opportunity itself carries everything the brief asked for.
<break time="0.4s"/>
The objective. The budget. The audience. The timing. All of it already on the record. Nothing re-typed, nothing lost in the gap between the meeting and the deal.
<break time="0.5s"/>

Then Gemini Campaign Intelligence looks back across everything we have run before, surfacing the campaigns most like this one, and what made them work.
<break time="0.4s"/>
So we are not starting from a guess. We are starting from experience.
<break time="0.5s"/>

Now the Ad Proposal Builder goes to work.
<break time="0.4s"/>
It weighs the budget, the inventory we have, the audience, and the ideal media mix, and proposes the packages most likely to deliver on the objective.
<break time="0.4s"/>
This is media planning that used to take days of back and forth. And it is happening in front of us, in seconds.
<break time="0.5s"/>

From there, the seller shapes it. They add the packages they want, they make it their own, and they ask for the pitch.
<break time="0.4s"/>
And the deck builds itself. On brand, on message, drawn straight from the proposal. Ready to put in front of Hannah.
<break time="0.5s"/>

And there it is. A polished, client-ready pitch deck, in a fraction of the time it would normally take.
<break time="0.7s"/>

Hannah says yes.
<break time="0.4s"/>
And the moment she does, the Ad Ops Agent turns that accepted proposal into a full media plan. Every line, every placement, every date, generated automatically from the deal we just built. The sale simply becomes a schedule.
<break time="0.5s"/>

And it all comes together here. On the ad inventory calendar. The single source of truth for everything we have to sell.
<break time="0.4s"/>
The seller stays in control, shaping the plan with their own judgement. And when they need to think it through, the Ad Inventory Advisor reasons with them, weighing what this campaign needs against what we actually have to sell.
<break time="0.5s"/>
Human instinct, and machine intelligence, working the same plan.
<break time="0.6s"/>
```

---

## Generation D — Chapter III / Enjoyment + close (sections 11–15, ~1:18) · v3, ~272 words

```
<break time="0.3s"/>
Chapter three.
<break time="0.3s"/>
The campaign is live. And this is where efficient and effective turn into something you can actually feel. Enjoyment.
<break time="0.7s"/>

The media plan is booked, and the campaign is out in the world, running.
<break time="0.4s"/>
And now we get to watch it all converge. Every single line, and exactly how each one of them is performing.
<break time="0.4s"/>
So we run the Campaign Performance Monitor. It watches all of it for us, and it tells us plainly what's working, and what isn't, before anyone even has to ask the question.
<break time="0.4s"/>
Then it posts the whole picture straight into Slack. So the entire team shares the same context, at exactly the same moment.
<break time="0.4s"/>
Nobody gets blindsided. And we catch the drift before the advertiser ever does.
<break time="0.9s"/>

So that is the loop. Efficiency. Effectiveness. Enjoyment.
<break time="0.4s"/>
And the three belong together. Because when the busywork disappears, and the deal is built right, our people get to do the part they came here for. The relationship. The pitch. The creative thinking only they can bring.
<break time="0.4s"/>
The AI quietly carries all the rest.
<break time="0.4s"/>
That is how Nine grows. Not by asking anyone to run harder, or work longer, but by giving every seller a head start, on every deal.
<break time="0.9s"/>

And underneath every part of it, one connected platform. Atlas, our agents, and our data, all working as one, all built on Salesforce.
<break time="0.9s"/>

One deal. End to end.
<break time="0.4s"/>
This is ad sales, at Nine.
<break time="0.6s"/>
```

---

## Generation E — Nine Ad Manager, agency self-service (~59s) · ~200 words

Placement: **after the seller demo, before the close** (i.e. after Gen C's Chapter II demo, before Gen D's wrap — or wherever the agency-portal recording sits in the final cut). Beat = extending the same agents outward to Nine's agency partners; trust + transparency. Sub-beats: upload brief + RFP Agent → 23s · Ad Proposal Builder → 18s · live campaign + Analytics Agent → 18s.

```
<break time="0.4s"/>
And this intelligence doesn't stop with our own sellers.
<break time="0.4s"/>
This is Nine Ad Manager. A self-service portal, for our agency partners.
<break time="0.5s"/>
An agency uploads a brief, exactly as it is. And the RFP Agent reads it, extracts every detail, and creates the campaign directly in Atlas. No forms, no waiting on us. The very same agent that works for our sellers, now working for them.
<break time="0.7s"/>

Then the Ad Proposal Builder goes to work, the same way it does for us.
<break time="0.4s"/>
It finds the packages that fit the brief, weighs the options, and builds a proposal in moments. What used to be a week of emails and phone calls is now something our partners do for themselves, in one sitting.
<break time="0.7s"/>

And once the campaign is live, they see exactly how it's performing. Nothing hidden, nothing held back.
<break time="0.4s"/>
And when they want to understand more, they simply ask the Analytics Agent. That is trust, made visible. Our agencies don't have to take our word for it. They can see it, and question it, for themselves.
<break time="0.6s"/>
```

---

## Per-generation timing budget (v5, rate ≈ 3.3 words/sec incl. pauses)

| Gen | Sections | Target | words | measured / expected | status |
|:--:|---|---:|---:|---|---|
| A | 1–3 | ~35s | ~115 | ~30s (86w v1 → 25.5s) | ~5s short; top up to ~130w for exact |
| B | 4–8 | ~2:26 (146s) | ~480 | 2:03 measured | reads fast; ~570w for exact 2:26 |
| C | 9–10 | ~3:06 (186s) | ~600 | **3:02 measured** ✓ | keeper, don't touch |
| D | 11–15 | ~1:18 (78s) | ~272 | ~1:20 expected | this pass |
| E | Nine Ad Manager | ~59s | ~200 | ~1:00 expected | agency self-service; slots after seller demo, before close |

A and B can be topped up to their exact targets on request. C is locked at 3:02; D and E are the ones you're generating now.

## Pronunciation cues (verify on the first render)

| Written | Should say | If it slurs |
|---|---|---|
| Atlas | "atlas" | fine as-is |
| Advertiser 360 | "advertiser three sixty" | already spelled out in the script |
| MEDDPICC | "med-pick" | replace with `med pick` in the text |
| Gemini | "jem-in-eye" | fine |
| RFP Agent | "R F P agent" | write `R F P` with spaces if slurred |
| Ad Ops Agent | "ad ops agent" | fine |

## If a generation renders long or short

Your voice runs ~3.3 words/sec **including** the pauses (ElevenLabs compresses long `<break>` tags, so don't rely on them for length). To hit a target, aim for `target_seconds × 3.3` words. ~10s of drift ≈ ~33 words.

- **Long?** Trim, in this order (each ~2–4s, none loses the story):
  1. Gen B — *"Nobody breaks eye contact to type."* then *"And this is the pattern you'll see everywhere you look."* (the next line already says it)
  2. Gen C — *"So the seller understands not just the deal, but the whole partnership behind it."* / *"So we're not starting from a guess. We're starting from experience."*
  3. Gen D — *"Nobody gets blindsided."* (the next line carries it)
- **Short?** Add a sentence rather than slowing the voice; keep speed at 0.95×. Dropping to 0.92× only buys ~3–5% and starts to sound draggy. Tell me the seconds and I'll write the exact extra words.

## How to use in ElevenLabs

1. elevenlabs.io → **Studio** (respects `<break>` cleanly across long text) or **Text to Speech** (each block fits its ~5,000-char cap).
2. Paste **one fenced block at a time**. Use the **same voice + settings** for all four so the narrator is consistent.
3. Generate a short test first, check the pronunciation cues, then commit.
4. Download MP3 (192 kbps+) or WAV.
5. In the editor, drop each generation onto the audio track above its matching video sections; nudge each start ~300ms into its first scene. Add a music bed at ~15–18% under the whole thing so the built-in pauses feel cinematic, not empty.

## Notes

- **Gemini Campaign Intelligence** is written plainly as a cross-platform beat ("looks back at what we've run before"), no spin. Ask if you want it leaned into a "works alongside what you already use" line.
- The **Enjoyment** payoff lands in Gen D (sections 11 + 13: "something you can feel", "without asking anyone to run harder"). This is the deliberate e3 stretch — listen to those specifically.
