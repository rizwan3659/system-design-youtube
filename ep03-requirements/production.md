# Video 3 production package: Functional vs non-functional requirements (and the never-happen rule)

**Playlist:** System Design From Zero (video 3) · **Length:** ~13–14 min (14:18 at a careful 145 wpm) · **Course:** [S1 · Requirements](https://rizwan3659.github.io/system-design-interview-course/#s01-m2)

| File | Use |
|---|---|
| `slides.html` | The deck. Press **P** for the presenter window with the script and → cues |
| `script.md` / `chapters.txt` | Word-for-word narration and estimated chapters (`node tools/build-script.js ep03-requirements`) |
| `thumbnail-a/b/c.png` | Three thumbnails |
| `youtube-upload.md` | Title, description, tags, pinned comment, end screen |
| this file | Hooks, objectives, flow, diagrams, on-screen text, questions, demo steps, Shorts |

---

## Where this sits in the series

- **Video 1** showed a system growing because of *problems* (traffic, failures).
- **Video 2** gave the interview process; its step 1 is "clarify".
- **Video 3** (this one) teaches step 1 properly. The same growth happens, but this time it is driven by *requirements*: each sentence the interviewer says adds a box. This answers the question Video 2 leaves open: *"What exactly do I ask?"*
- It ends on the number it used without explaining ("10 M users ≈ 2,300 req/s"), which sets up **Video 4 (estimating QPS)**.

The running example is a **photo-sharing app**. It matches the course lab exactly: the lab's five requirement switches are this video's five sentences.

---

## Titles (5)

1. **Functional vs Non-Functional Requirements | System Design** (S, launch)
2. One Sentence Added a Queue to Our Design (P)
3. The Requirement Question Most Candidates Forget (I)
4. Same App, Two Designs. Both Correct. Here's Why. (C)
5. How to Gather Requirements in a System Design Interview (S)

Launch with 1 + thumbnail A. After about 14 days, test 4 + thumbnail C.

## Thumbnails (3)

| File | Text | Visual | Pairs with |
|---|---|---|---|
| `thumbnail-a.png` | **ASK THIS FIRST** · "system design interviews" | Interviewer quote card: "What must **never** go wrong?" | Titles 1, 3, 5 |
| `thumbnail-b.png` | **NEVER LOSE DATA?** · "one sentence, one new box" | Red database → green "+ Replica" | Title 2 (or 1) |
| `thumbnail-c.png` | **SAME APP. 2 DESIGNS.** · "requirements decide" | "A: 3 boxes" vs a red "B: 9 boxes", with a "?" | Title 4 |

## Opening hooks (3)

**Hook A: recorded in the deck (slide 1)**
> "Two engineers get the same prompt: design a photo-sharing app. The first draws three boxes. The second draws nine. Both designs are correct. The difference is five sentences the interviewer said."

**Hook B: the hidden queue**
> "'Send a welcome email when someone signs up.' It sounds like the smallest feature in the world. In a system design interview, it quietly adds a queue and a worker. Let's see why, and find the other sentences that add boxes."

**Hook C: the forgotten question**
> "Every system has one thing the business can't accept: a seat sold twice, a payment charged twice, a message lost. Most candidates never ask what it is. By the end of this video, you will, and you'll know why it changes your whole design."

## Learning objectives

By the end, the viewer can:
1. Tell functional requirements (they become APIs) from non-functional ones (they become architecture), including non-functional requirements hidden inside features.
2. Map five common requirements to the component each one adds: scale → load balancer + servers; read-heavy latency → cache; durability → replica + backups; slow side work → queue + worker; large media worldwide → object storage + CDN.
3. Ask for, and use, the never-happen rule to decide where strict guarantees are needed.
4. Tell useful clarifying questions from premature solution questions.
5. Adapt when requirements shrink: remove the scale-driven parts, and keep the durability- and availability-driven ones.

---

## Teaching flow and timing

| Time | Slides | Beat | Signature element |
|---|---|---|---|
| 0:00 | 1–2 | Hook: two designs, both correct; promise | Problem first |
| 1:02 | 3–4 | Two kinds of requirements; quick-check quiz (4 sentences) | Viewer question |
| 2:23 | 5–6 | Functional only → 3 endpoints → design A (3 boxes) | Simple design |
| 3:12 | 7–8 | **New requirement #1**: 10 M users → estimate → LB + servers | Numbers + why not (a bigger server) |
| 4:28 | 9–11 | **#2**: fast, read-heavy feed → cache; **Interviewer mode**: "must be instant" | Trade-off + interview follow-up |
| 6:17 | 12 | **#3**: never lose a photo → replica + backups | Durability ≠ scale |
| 6:59 | 13–14 | **#4**: welcome email → "where is it sent from?" → queue + worker | Viewer question |
| 8:06 | 15 | **#5**: photos and videos worldwide → object storage + CDN | Final architecture |
| 8:50 | 16 | Recap table: sentence → kind → box | |
| 9:32 | 17–18 | **The never-happen rule** (4-product quiz), then why it matters | The channel's interview edge |
| 10:46 | 19–20 | Ask or skip? (4 questions), then 7-question card ("screenshot this") | Interview skill |
| 11:57 | 21 | **Live demo** in the course requirements lab (~45 s) | Try it yourself |
| 12:43 | 22 | **Interviewer mode**: "it's 2,000 users": remove vs keep | Comment prompt |
| 13:32 | 23 | Next: "where did 2,300/s come from?" → Video 4 | Natural conversion |

---

## Diagrams (in order)

| # | Slide | Diagram | What animates |
|---|---|---|---|
| D1 | 1 | Two cards: design A (3 boxes) vs design B (9 boxes) | Cards build, then "Both are correct." |
| D2 | 3 | Functional vs non-functional cards | "→ becomes your API" / "→ becomes your architecture" |
| D3 | 5 | Three endpoint lines | One per build |
| D4 | 6 | Users → App server → Database | Request dot |
| D5 | 7 | Metrics panel: 200 M/day → 2,300/s → ~7,000/s peak vs one server ~2,000/s | Tiles build; the last one red |
| D6 | 8 | + Load balancer, API servers ×5 | "~1,400/s each at peak" |
| D7 | 10 | + Cache | Green hit dot ("~1 ms"), amber miss dot |
| D8 | 12 | Database ring red → + Replica + backups (green) | "copies every write" |
| D9 | 14 | + Queue + Email worker | Amber job dot; "sign-up returns at once" |
| D10 | 15 | + Object storage + CDN (top row) | Green dot from users to the CDN; full 9-box design |
| D11 | 16 | Recap table | One row per build |
| D12 | 17 | Four product cards | Never-happen answers build |
| D13 | 18 | Strict (red) vs relaxed (green) cards | |

The box positions match Video 1's diagrams, plus two new boxes on the top row (CDN, object storage), so returning viewers recognise the layout. At most 9 boxes, and box names are at least 34 px.

## On-screen text (exact)

| Slide | Text |
|---|---|
| 1 | Same prompt: "Design a photo-sharing app" · Two engineers. Two very different designs. · Design A · 3 boxes · Design B · 9 boxes · Both are correct. · The difference: five sentences the interviewer said. |
| 2 | Requirements decide the architecture |
| 3 | What it does vs how well it does it · Functional → becomes your API · Non-functional → becomes your architecture |
| 4 | QUICK CHECK · Functional or non-functional? (4 sentences, tags reveal) |
| 5 | They give you the API, not the architecture · POST /photos · POST /users/{id}/follow · GET /feed?cursor=… |
| 6 | Users → one server → one database · Fine for thousands of users |
| 7 | NEW REQUIREMENT · "10 million daily users." · 200 M · 2,300/s · ~7,000/s · ~2,000/s · ⏸ Can one server handle this? |
| 8 | Scale → spread the traffic · Cost: servers must be stateless |
| 9–10 | "The feed loads in under 300 ms. Reads are 100× writes." · Read-heavy + fast → serve from memory · Cost: a new post can appear a few seconds late |
| 11 | INTERVIEWER MODE · "A new post must appear in everyone's feed instantly." |
| 12 | "A photo is never lost." · Durability → more copies |
| 13–14 | "Send a welcome email when someone signs up." · ⏸ Where should the email be sent from? · Work the user doesn't wait for → do it later |
| 15 | "Photos and videos. Users worldwide." · Bytes → object storage · Served near the viewer |
| 16 | Every box points back to a requirement (table) |
| 17–18 | "What must never go wrong?" · Strict where it matters. Relaxed everywhere else. |
| 19–20 | Ask it, or skip it? · Seven questions for any prompt |
| 22 | INTERVIEWER MODE · "Actually, it's 2,000 users." · Remove / Keep |
| 23 | "10 million users ≈ 2,300 requests a second." Where did that number come from? |

## Viewer questions (pause about 3 s)

1. Slide 4: "Functional or non-functional?" (4 sentences)
2. Slide 7: "Can one server handle this?"
3. Slide 13: "Where should the email be sent from?"
4. Slide 17: "Name the never-happen rule for each." (4 products)
5. Slide 19: "Ask it, or skip it?" (4 questions)

## Interview moments

- **Slide 11:** "A new post must appear in everyone's feed instantly." → It's a consistency requirement; caching gets expensive; ask whether it's instant for everyone or just for the author (read-your-own-writes is cheap).
- **Slide 22 (comment prompt):** "It's 2,000 users, not 10 M. What do you remove and keep?" → Remove the scale parts (most servers, cache, CDN); keep the replica + backups, the email queue and object storage. Durability and availability requirements don't shrink with scale.

## Common mistakes this video corrects

- Treating requirements as a formality, then drawing a generic architecture.
- Missing non-functional requirements hidden in features ("live map", "welcome email").
- Asking about tools (Kafka vs RabbitMQ) or architecture (microservices) as if they were requirements.
- Making everything strongly consistent, or nothing.
- Assuming durability only matters at large scale.

## "Why not…?" moments

- Slide 8: why not one huge server? (ceiling, single machine)
- Slide 11: why not keep the cache and also make posts instant for everyone? (invalidating thousands of feeds per post)
- Slide 13: why not send the email inside the request? (latency and availability coupling)

---

## Live demo (slide 21, about 45 seconds)

Record it separately (OBS, 1920×1080, **Projector text** on in the course header).

1. Open https://rizwan3659.github.io/system-design-interview-course/#s01-m2 and scroll to **"Diagram · Every requirement adds a box"**. Make sure no requirement is switched on (all buttons unpressed). If you've used it before, reload the page.
2. *Say:* "One server, one database, nothing switched on."
3. Under **Test the design**, click **The email provider takes 10 seconds**. Red outcome: every sign-up waits 10 seconds. *Say:* "Without a requirement for it, nothing protects us."
4. Under **Switch on a requirement**, click **"Send a welcome email"**. A queue and an email worker appear. Click **The email provider takes 10 seconds** again: green, handled. *Say:* "One requirement, one new part, one failure handled."
5. Click **The database machine dies**: red (everything down, data lost). Switch on **"Never lose data"** and click it again: amber, the replica is promoted, writes pause, nothing is lost.
6. Optional (10 s): switch on **"10 M daily users"** and **"Users upload photos and videos"** to show the load balancer and CDN appear, ending on the full design.

These outcomes are fixed in the lab, so every take shows the same thing.

## Course exercise (description + one mention)

> **Try it yourself:** open the requirements lab (https://rizwan3659.github.io/system-design-interview-course/#s01-m2). Before switching anything on, predict which box each requirement will add, then break the design with each failure and switch on only the requirement that fixes it. Then do the two sorting exercises and the "never-happen rule" cards on the same page.

---

## Shorts (cut from this video)

| # | Short | Source | Script (30–60 s) |
|---|---|---|---|
| 1 | **"The never-happen rule"** | Slides 17–18 | "One question most system design candidates forget: what must never go wrong? Tickets: the same seat sold twice. Banking: money created or lost. Chat: a sent message lost. That one answer tells you where you need transactions and strict guarantees, and that everything else can be cached and a little stale. Strict where it matters, relaxed everywhere else." |
| 2 | **"Why 'send a welcome email' adds a queue"** | Slides 13–14 | "'Send a welcome email.' Tiny feature, right? If you send it inside the sign-up request and the email provider takes 10 seconds, sign-up takes 10 seconds. If the provider is down, nobody can sign up. Instead: save the user, drop a job on a queue, return instantly. A worker sends the email, with retries. If the user doesn't need to wait for it, it doesn't belong in the request." |
| 3 | **"Functional vs non-functional in 40 seconds"** | Slides 3–4 | "Functional requirements say what a system does: post a photo, follow someone. They become your API. Non-functional requirements say how well: how many users, how fast, never lose data. They become your architecture. Almost every box in a system design diagram exists because of a non-functional requirement." |
| 4 | **"2,000 users? Delete half your design"** | Slide 22 | "Interviewer: 'Actually, it's 2,000 users, not 10 million.' Remove what was there for scale: most servers, the cache, the CDN. But keep the replica and backups, because data still can't be lost, and keep the email queue, because a slow provider still shouldn't block sign-up. Scale requirements come and go; durability doesn't." |

Each ends with: *"Full lesson: 'Functional vs Non-Functional Requirements' on the channel."*

---

## Ending and transition (slide 23)

> "One sentence in this video did a lot of work: ten million users is about two thousand three hundred requests a second, so one server isn't enough. In the next video, we'll make that a skill: estimating requests per second, storage and bandwidth in about two minutes, and turning each number into a design decision. If you want to try today's requirements lab, it's in the free interactive course, linked in the description. This is a complete system design series, and each video builds on the last, so if you want to follow it in order, subscribe, and I'll see you in the next one."
