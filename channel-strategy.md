# Channel strategy

> **Don't memorize system design diagrams. Learn how to build them.**

This file sets out the channel: who it is for, how every video is built, how videos connect to the free interactive course, and the order in which to publish. The video list is in [`roadmap.md`](roadmap.md), and the titles, hooks and thumbnails for the first 30 videos are in [`video-briefs.md`](video-briefs.md).

---

## 1. What the course gives us (audit summary)

The course at https://rizwan3659.github.io/system-design-interview-course/ already contains most of a channel's worth of material. Specifically:

| Course asset | What it gives the channel |
|---|---|
| 20 sessions (HLD foundations, HLD case studies, LLD, capstone) + 7 extra case studies | The teaching content, already ordered from simple to advanced |
| Progressive "evolve" diagrams with *predict before you reveal* (e.g. S1 roadmap, S4 caching) | The channel's core visual: a system that grows one problem at a time |
| Scaling lab (traffic slider 100 → 1M req/s, live metrics, Add cache/replica/queue/shard, failure buttons) in S4, S8, S9 | Live screen-recorded demos: the database turns red, you add a cache, it turns green |
| Simulators: cache, queue/backpressure, sharding, replication/failover, rate limiters, geo consistency, capacity, latency | A specific "try it yourself" lab for almost every video |
| Bottleneck and debugging scenarios with metrics | Ready-made "Where is the bottleneck?" viewer questions |
| Interview checkpoints with follow-ups | Ready-made "Interviewer mode" segments |
| Recall cards and session summaries | Pinned-comment quizzes and Shorts ideas |

**The rule:** a course session is not a video. Session 4 (caching), for example, becomes two long videos and four Shorts, while Sessions 9–12 become multi-part case-study series.

**The existing EP01 (`ep01-framework/`, "How to answer any system design question") is kept, but it moves to Video #2.** Its slides, script and thumbnails are good. However, it opens with "If you have a system design interview coming up, this video gives you…", which is the generic opening this channel avoids, and it teaches a framework before the viewer has seen *why* systems need one. Video #2 swaps in a problem-first hook (in [`video-briefs.md`](video-briefs.md)) and changes one line of the pinned comment (see below).

---

## 2. Positioning

**Who it is for**
- Software engineers with 0–6 years of experience who are preparing for system design rounds.
- Developers who can build an app but have never had to scale one.
- Students who keep seeing giant architecture diagrams and do not understand why each box is there.

**What the channel teaches that others mostly don't**

| Typical system design video | This channel |
|---|---|
| Shows the final architecture, then explains each box | Starts with one server, then breaks it until each box becomes necessary |
| Defines components ("Redis is an in-memory store…") | Starts with a problem and lets the component earn its place |
| Abstract ("it scales") | Numbers: 100 → 1K → 10K → 100K req/s, CPU %, p99, error rate |
| Recommends the answer | Explains the alternatives, and why *not* each one yet |
| Happy path | Breaks things on purpose: dead primaries, cold caches, retry storms |
| Ends at the diagram | Ends with an interviewer follow-up, then a lab to try it yourself |

**Promise on the channel banner:** *System design, one problem at a time. Build it, break it, fix it, and know why.*

**The quality bar for every video:** the viewer should finish thinking *"I finally understand WHY this is needed."* If a video only explains *what* a component is, it isn't finished.

---

## 3. The signature method (every video)

```
PROBLEM → SIMPLE DESIGN → BOTTLENECK → SCALE → FAILURE → IMPROVE → TRADE-OFF → INTERVIEW FOLLOW-UP
```

Each architecture change answers the same four questions, out loud and on screen:

1. **What problem do we have?** (a number: "DB CPU 94%")
2. **Why does the current design fail?**
3. **What component could solve it?** (plus the alternatives, and why *not* those yet)
4. **What new problems does it introduce?**

### Recurring segments (the channel's identity)

| Segment | On-screen card | What happens |
|---|---|---|
| **LET'S BREAK THE SYSTEM** | Red bar, metric panel slides in | Increase traffic or inject a failure. Show the metrics. Ask the viewer what is overloaded. |
| **WHERE IS THE BOTTLENECK?** | Four metrics, one of them red | Pause about 3 seconds. Reveal it. "Measure → identify → change one thing → measure again." |
| **WHY NOT…?** | Three options, two crossed out | Give the alternatives and say why they are wrong *for now*. |
| **INTERVIEWER MODE** | Dark card, the "Interviewer:" label, a countdown ring | A follow-up question. Say "pause and answer", wait, then reveal. |
| **TRY IT YOURSELF** | Small course badge in the corner | Once per video, about 10–20 s near the end: "this exact lab is in the free course". |

### Repeatable video structure (10–15 min)

| Time | Beat | Notes |
|---|---|---|
| 0:00 | **Hook** | A situation with a number. Never "today we'll learn X". |
| ~0:30 | **Simple system** | The smallest architecture that works, e.g. Client → Server → DB. |
| ~2:00 | **What breaks?** | Traffic ×10 or a new requirement. Metrics on screen. |
| ~4:00 | **Introduce the concept** | Only now name the component. |
| ~6:00 | **Visual walkthrough** | Animate requests through it: hit/miss, failover, queue growth. |
| ~8:00 | **Why not…?** | Alternatives and their costs. |
| ~10:00 | **Trade-offs** | The new problems the component creates. |
| ~11:00 | **Interviewer mode** | Pause, then answer. |
| end | **Next problem** | Tease the next video's problem, with a reason to subscribe. |

**Retention principle:** something that advances learning changes every 60–120 seconds: a new diagram, a question, a calculation, a failure, a lab demo or an interview challenge. No artificial cuts or memes for their own sake.

### Writing and speaking rules

- Spoken English: short sentences, "we" and "you", contractions, and one idea per sentence.
- Every claim about scale has a number. Use simplified numbers, and say "roughly".
- The architecture is never on screen fully built for more than 30 seconds without a change.
- Diagrams use at most about 7 boxes, labels of 1–3 words, and are readable on a 6-inch phone.
- **Never invent personal stories.** Talk about production in general terms ("in production, this usually shows up as…") unless you supply a real story yourself. *(Note: the existing EP01 pinned comment says "Mine used to be step 1." Replace it with a neutral question; this has been done in the Video #2 brief.)*

---

## 4. Playlists

Viewers watch playlists in order, so each one has a clear arc. A video can belong to two playlists.

| # | Playlist | Arc | Videos (roadmap numbers) |
|---|---|---|---|
| 1 | **System Design From Zero** | What it is → how to approach it → requirements → numbers → how a request travels | 1–6 |
| 2 | **Scaling Building Blocks** | One server → load balancer → measure bottlenecks → cache → CDN → replicas → queue → shards → consistent hashing → rate limiting | 7–16 |
| 3 | **Databases for System Design** | SQL vs NoSQL → indexes → transactions → object storage → search → partitioning deep dives | 17–20, 42–48 |
| 4 | **Caching** (sub-playlist for search) | Why cache → invalidation/stampedes/hot keys → CDN → cache sizing | 9–11, 35 |
| 5 | **Queues & Event-Driven Systems** | Why a queue → pub/sub vs queues → Kafka-style logs → DLQ/retries → sagas | 13, 49–53 |
| 6 | **Distributed Systems** | CAP → consistency models → idempotency → retries/circuit breakers → failover → quorums → locks → time | 21–25, 54–62 |
| 7 | **System Design Case Studies** | URL shortener → rate limiter → notifications → chat → feed → YouTube → Uber → Drive → search → crawler → tickets → payments | 26–30, 63–88 |
| 8 | **System Design Interview Practice** | Framework → follow-up drills → mock interviews → common mistakes | 2, 89–94 |
| 9 | **LLD / Object-Oriented Design** | OOP → SOLID → patterns → parking lot → elevator → LRU → rate limiter → logger → pub/sub → scheduler | 95–100 (+ the second season of LLD) |

---

## 5. How YouTube and the course fit together

Each video comes with a lab in the course that matches it **exactly**: same architecture, same numbers. The viewer watches, then experiments, then comes back for the next video.

```
Watch the video  →  Open the matching lab  →  Break it yourself  →  Answer the checkpoint  →  Next video
```

**In each video:** say it **once**, near the end, after the value has been delivered:
> "Everything I just did is in a free interactive course: the same traffic slider, the same failure buttons. Link in the description. Try pushing it to a million requests per second without breaking it."

**In each description:** add a "Practise this" block with deep links to the lesson and lab. The links are listed per video in [`roadmap.md`](roadmap.md#the-first-30-videos). Course deep links use the format `…/#s04-m5` (session 4, module 5).

**Pinned comment:** one question taken from the course's recall cards or interview checkpoint, so viewers answer in the comments. That also drives engagement signals.

**Screen-recording the course:** for demos, use the course in a 1920×1080 window with **Projector text** on (the button in the course header), so it stays readable on phones. Start from the lab's reference state ("Simple" preset), then change one thing at a time.

**Later (optional) course change:** once videos are live, add a "Watch the video" link to each matching course module, so the loop works in both directions. This needs about 20 lines in the course engine; ask me when the first videos are up.

---

## 6. Recommended publishing sequence

**Cadence:** one long video a week, plus 2–3 Shorts a week cut from the current or previous long video. That is sustainable alongside a job, and the content stays evergreen.

**Launch:** publish **Videos 1 and 2 on the same day**. Video 1 sets out the method and works as the channel trailer; Video 2 ("How to approach any system design interview") is the highest-search topic in the first block, and its assets already exist. Video 1's end screen points to Video 2.

| Week | Long video | Why at this point |
|---|---|---|
| 1 | **#1 What is system design? (one app, 100 → 1M users)** + **#2 How to approach any interview** | Identity + search |
| 2 | #3 Requirements | Foundation for every later video |
| 3 | #4 Estimate QPS | Numbers vocabulary used in every video |
| 4 | #6 How a request travels | Visual, very searchable |
| 5 | #7 Why do we need a load balancer? | First building block; high search |
| 6 | #9 Why do we need caching? | Highest-search building block; uses the cache lab |
| 7 | #8 Where is the bottleneck? | The channel's method, now that viewers know two components |
| 8 | #12 Why do we need read replicas? | Continues the "database is the bottleneck" story |
| 9 | #13 Why do we need a queue? | |
| 10 | #26 Design a URL shortener, Part 1 | **First case study**: applies weeks 1–9. Case studies are top search terms, so release one early |
| 11 | #14 When do we need sharding? | |
| 12 | #15 Consistent hashing | High search |
| 13 | #27 URL shortener, Part 2 (scale to 1M req/s, live lab) | Payoff episode |
| 14–22 | #5, #10, #11, #16, #17, #18, #21, #22, #23 | Fill in remaining fundamentals; alternate "what" and "why" topics |
| 23–30 | #19, #20, #24, #25, #28, #29, #30 + the first mock interview (#89) | Distributed-systems block, then case studies |

The **viewing order** in playlists stays as in the roadmap. The publishing order only interleaves a case study early, for discovery.

**Choosing between equally useful topics:** pick the one people search for more. Load balancer, caching, CAP, consistent hashing, SQL vs NoSQL, and "design X" case studies are the strongest evergreen search terms. Never trade accuracy for a trend.

---

## 7. Titles, thumbnails, hooks and Shorts

**Titles:** offer five per video, mixing four styles. Each must describe the content accurately.
- *Search:* "Database Sharding Explained | System Design"
- *Curiosity:* "Your Database Hit 100% CPU. What Now?"
- *Interview:* "Sharding: What Interviewers Actually Expect"
- *Problem:* "10 Million Users, One Database. What Breaks First?"

Use a search-style title at launch. After about two weeks, test the curiosity title with YouTube's Test & Compare.

**Thumbnails**
- 1–3 words, at least 120 px high on a 1280×720 canvas, high contrast.
- Use an architecture visual (boxes and one red box), not stock imagery or shocked faces.
- Keep the same layout every time: dark navy grid, yellow words on the left, a diagram on the right with one red component. This makes the channel recognisable.
- Check it at 160×90 px. If you can't read it there, simplify.

**Hooks:** a situation, a number and a question, in under 30 seconds, leading straight into the lesson without exaggerating.

**Shorts:** 30–60 s, one idea, standalone. Cut them from long-video segments: usually the "Let's break the system" moment, or one "Why not…?". End each with "Full lesson in the related video". Reuse the vertical crop of the same diagrams.

---

## 8. Subscriber conversion (without begging)

Deliver value first, then give a concrete reason, once, in the last 20 seconds:
> "This is one part of a full system design series. In the next video we take this exact architecture and solve the problem we just created: writes. If you want to follow the whole series, subscribe."

Never put "Like, share and subscribe" in the first minute.

---

## 9. Production checklist (per video)

1. Pick the video in `roadmap.md` and its brief in `video-briefs.md`.
2. Copy an episode folder, write the slides with notes (`[→]` marks a build), then run `node tools/build-script.js <folder>` to get `script.md` and `chapters.txt`.
3. Record the course demo segment separately (OBS, 1920×1080, Projector text on).
4. Make the thumbnail from `thumbnail.html` (same template, new words).
5. Fill in `youtube-upload.md`: title, description with the "Practise this" links, chapters, pinned comment and end screen.
6. Cut 2–3 Shorts from the finished edit.
