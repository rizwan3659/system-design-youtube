# Video 1 production package: What is system design? One app, 100 → 1,000,000 users

**Playlist:** System Design From Zero (video 1) · **Length:** ~13–14.5 min · **Course:** [S1 roadmap](https://rizwan3659.github.io/system-design-interview-course/#s01-m1), [S4 scaling lab](https://rizwan3659.github.io/system-design-interview-course/#s04-m5)

| File | Use |
|---|---|
| `slides.html` | The deck. Press **P** for the presenter window with this script and the → cues |
| `script.md` | Word-for-word narration, generated from the slide notes (`node tools/build-script.js ep01-why-systems-evolve`) |
| `chapters.txt` | Estimated chapter times (replace them with real times after editing) |
| `thumbnail-a/b/c.png` | Three thumbnails to test |
| `youtube-upload.md` | Title, description, tags, pinned comment, end screen |
| this file | Why this video comes first, the hooks, diagrams, on-screen text, questions, the demo steps, Shorts |

---

## Why this is Video 1 (and not the interview framework)

The channel promise is *"Don't memorise system design diagrams. Learn how to build them."* The first video has to **show** that promise, not describe it. In 13 minutes this video:

- answers a high-search beginner question ("what is system design?");
- runs the full signature loop five times (Problem → Simple → Bottleneck → Scale → Failure → Improve → Trade-off → Interview follow-up);
- introduces both recurring segments (**Let's break the system** and **Interviewer mode**) and the **Why not…?** card;
- works as a trailer: every stage is a later video (load balancer #7, caching #9, replicas #12, queues #13, sharding #14), so the viewer knows what the series covers.

The interview framework (existing `ep01-framework/`) becomes Video 2 and goes live the same day. It is the natural next question: *"I see what breaks. How do I say this in an interview?"*

---

## Titles (5)

1. **What Is System Design? One App, 100 → 1,000,000 Users** (S, recommended at launch)
2. We Scaled One Server to a Million Users. It Broke 5 Times. (P)
3. Why Every Box in a System Design Diagram Exists (C)
4. System Design for Beginners: Load Balancer, Cache, Replicas, Queue, Sharding (S)
5. How Interviewers Expect You to Scale a System, Step by Step (I)

Launch with title 1 and thumbnail A. After about 14 days, run YouTube Test & Compare with title 2 + thumbnail C.

## Thumbnails (3)

| File | Text | Visual | Pairs with |
|---|---|---|---|
| `thumbnail-a.png` | **1 → 1M USERS** · "what breaks first?" | Server → database glowing red, "CPU 95%" badge | Titles 1, 4 |
| `thumbnail-b.png` | **WHY THIS BOX?** · "stop memorising diagrams" | Stack of four boxes, the cache red with a "?" | Title 3 |
| `thumbnail-c.png` | **IT BROKE 5×** · "system design from zero" | Users → API → database marked DOWN | Title 2 |

To add your face, cut yourself out (remove.bg or Canva) and place it bottom-right, but keep the red box visible.

## Opening hooks (3)

**Hook A: recorded in the deck (slide 1)**
> "This is the entire backend of a new app. One server, one database. A hundred requests a second. Everything works. Then the app gets featured somewhere, and traffic grows thirty times. The server's CPU hits ninety-eight percent. Requests that took fifty milliseconds now take three seconds. So what do you do?"

**Hook B: the diagram angle** (use it if A tests poorly)
> "Every system design article ends with the same diagram: load balancer, cache, replicas, queue, shards. Most people try to memorise it. In the next thirteen minutes we're going to build it from a single server, and watch each box become necessary."

**Hook C: the failure angle**
> "One server, one database, a hundred users. In the next few minutes we're going to give this system a million users, and it's going to break five times. Each time it breaks, we'll find out why, fix it, and pay a price for the fix."

## Learning objectives

By the end, the viewer can:
1. Explain system design as decisions driven by requirements, numbers and trade-offs.
2. Say why a load balancer, cache, replica, queue and shards each become necessary, and in that order.
3. Identify a bottleneck from metrics before choosing a fix.
4. Name the new problem each fix creates (statelessness, stale data, replication lag, delayed results, sharding cost).
5. Answer two interviewer follow-ups: stale reads after a profile update, and a saturated cache.

---

## Teaching flow and timing

| Time | Slide | Beat | Signature element |
|---|---|---|---|
| 0:00 | 1 | Hook: 100 → 3,000 req/s, CPU 98% | Problem first |
| 0:40 | 2 | Title + promise: five breaks, five fixes | |
| 1:10 | 3 | What system design is: requirements, numbers, trade-offs | |
| 1:45 | 4 | The method strip + the four questions | Channel identity |
| 2:25 | 5 | Stage 1: one server, why start simple | Simple design |
| 3:05 | 6 | **Let's break the system #1**: traffic ×30 | Where is the bottleneck? |
| 3:50 | 7 | **Why not…?** Scale up vs scale out | Why not |
| 4:20 | 8 | Stage 2: load balancer, the stateless cost | Trade-off |
| 5:00 | 9 | **Break #2**: 10K req/s, DB 92%, more API servers? | Viewer question |
| 5:45 | 10 | **Why not…?** Cache vs replicas vs sharding | Why not |
| 6:25 | 11 | Stage 3: cache hit/miss, the stale-data cost | Visual walkthrough |
| 7:10 | 12 | **Live demo** in the course scaling lab (~45 s) | Try it yourself |
| 7:50 | 13 | **Break #3**: the database dies | Failure |
| 8:30 | 14 | Stage 4: replica + failover, the lag cost | Trade-off |
| 9:05 | 15 | **Interviewer mode**: "my profile edit disappeared" | Interview follow-up |
| 9:40 | 16 | **Break #4**: 8-second uploads, threads 100% | Viewer question |
| 10:25 | 17 | Stage 5: queue + workers, the silent-growth cost | Trade-off |
| 11:05 | 18 | **Break #5**: 100K req/s, writes, more replicas? | Viewer question |
| 11:40 | 19 | Stage 6: sharding, and why it comes last | Why not (earlier) |
| 12:20 | 20 | Recap: every box answers a problem | |
| 13:00 | 21 | **Interviewer mode**: Redis at 95%, what changes? | Comment prompt |
| 13:40 | 22 | Next video + course + subscribe reason | Natural conversion |

Something new happens every 30–60 seconds (a new number, question, diagram or failure). There are no filler cuts.

---

## Diagrams (in order)

All of them are built into `slides.html`. Every architecture diagram uses the same positions, so each new box appears in place and the viewer's eye goes straight to it.

| # | Slide | Diagram | What animates |
|---|---|---|---|
| D1 | 1 | Users → App server → Database | A request dot flows; "100 req/s, CPU 5%" swaps to "3,000 req/s, CPU 98%", and the server ring turns red |
| D2 | 4 | Method strip of 8 chips | Chips build left to right; Bottleneck and Failure in red, Improve in green, Trade-off in amber |
| D3 | 5 | Stage 1 again, calm | Request dot, then green CPU labels |
| D4 | 6 | Metrics panel (traffic, app CPU, DB CPU, p99) | Tiles build; the app tile red, the DB tile green |
| D5 | 8 | + Load balancer, API servers ×3 | LB appears, then servers relabel, CPU 35% each |
| D6 | 9 | Metrics panel (API 45%, DB 92%, reads 95%) | DB tile red |
| D7 | 11 | + Cache | Green dot on the hit path ("1. hit: ~1 ms"), amber dot on the miss path, "CPU 92% → 20%" |
| D8 | 13 | Database ring red, cache ring green | Failure: only cache hits survive |
| D9 | 14 | + Read replica, dashed replication line | Read dot to the replica |
| D10 | 16 | Metrics panel (CPU 35% vs threads 100%) | "Busy waiting" contrast |
| D11 | 17 | + Queue + Workers | Amber job dot API → queue → worker; "reply in ~50 ms" |
| D12 | 18 | Metrics panel (primary 95% writes, replicas 12%) | |
| D13 | 19 | DB relabelled "DB shards ×4", green ring | |
| D14 | 20 | Final architecture | Green rings build in the order the boxes were added |
| D15 | 21 | Metrics panel (Redis 95%, everything else green) | |

**Phone readability:** box names are at least 34 px on the 1920-wide stage, there are at most 8 boxes, and captions are 1–5 words. Check by previewing at 25% zoom.

## On-screen text (exact)

| Slide | Text |
|---|---|
| 1 | ONE APP · ONE SERVER · ONE DATABASE · "Requests now take 3 seconds" · "What do you do?" |
| 2 | What is system design? · One app. 100 → 1,000,000 users. Five times it breaks. Five fixes. Every box earns its place. |
| 3 | Not a diagram. A series of decisions. · Requirements: what must it do? · Numbers: how much? · Trade-offs: what does it cost? |
| 4 | Build it. Break it. Fix it. Explain the cost. · Problem → Simple design → Bottleneck → Scale → Failure → Improve → Trade-off → Interview follow-up |
| 5 | Start with the smallest thing that works · Cheap · Easy to debug · One machine = one point of failure |
| 6 | LET'S BREAK THE SYSTEM · Traffic × 30. Where is the bottleneck? · ⏸ Pause. Which component is overloaded? |
| 7 | WHY NOT…? · Bigger server, or more servers? |
| 8 | Spread the traffic. Skip dead servers. · CPU 98% → 35% · Servers must be stateless · The LB needs a backup |
| 9 | 10,000 req/s. Add more API servers? · ⏸ Would more API servers help? |
| 10 | Three ways to take load off the database · ✓ Cache · Later: read replicas · ✕ Not yet: sharding |
| 11 | Check memory first. Database only on a miss. · New problem: stale data · New problem: a hot key expires → stampede |
| 12 | Same system, live: watch the database turn red · course link |
| 13 | The database machine dies. · Writes: all fail · Reads: only cache hits survive |
| 14 | Keep a live copy. Promote it on failure. · New problem: replication lag |
| 15 | INTERVIEWER MODE · "A user updates their profile, refreshes, and sees the old profile…" |
| 16 | New feature: every upload takes 8 seconds · ⏸ More API servers? |
| 17 | Reply now. Do the slow work in the background. |
| 18 | 100,000 req/s. Add more replicas? |
| 19 | Split the data across several databases · Costs: routing · cross-shard queries · rebalancing · hot shards |
| 20 | Every box answers a problem · LB: CPU maxed · Cache: repeat reads · Replica: one copy · Queue: slow work · Shards: writes |
| 21 | Traffic grows 10× again. What do you change? · ⏸ Pause. Answer in the comments. |
| 22 | You've seen what breaks. Now say it in an interview. · Video 2 card |

## Viewer questions (pause about 3 s after each)

1. Slide 1: "What do you do?" (rhetorical; it sets up the video)
2. Slide 6: "Which component is actually overloaded?"
3. Slide 9: "Would adding more API servers help?"
4. Slide 13: "What happens to reads? To writes?" (spoken)
5. Slide 16: "Do we add more servers?"
6. Slide 18: "Would more replicas help?"

## Interview challenges

- **Slide 15:** "A user updates their profile, refreshes, and sees the old one. Why?" → replication lag; route the user's own reads to the primary for a few seconds (read-your-writes).
- **Slide 21 (comment prompt):** "Traffic ×10: API 35%, DB 40%, Redis 95%. What do you change?" → scale the cache and check for a hot key; don't touch the database.

## Common mistakes this video corrects (say them if you ad-lib)

- Adding components because "big systems use them".
- Fixing the wrong tier (more API servers when the database is the bottleneck).
- Thinking replicas or caches help with write load.
- Sharding first.
- Presenting fixes as free.

---

## Live demo (slide 12, about 45 seconds)

Record it separately with OBS, then cut it in where slide 12 sits.

1. Open https://rizwan3659.github.io/system-design-interview-course/#s04-m5 in Chrome at 1920×1080. Click **Projector text** in the header. Scroll to "Scaling lab · The product page under load".
2. If anything is set from earlier, open "Reference architectures" and click **Simple**.
3. *Say:* "Simple system, a hundred requests a second, everything green."
4. Drag **Traffic** to **5K**. The lab shows *SLO violated: which tier is the bottleneck?* Click **API servers** (it's at 250%). *Say:* "It makes me diagnose first: the API servers."
5. Click **+ Load balancer**, then **+** on API servers 3 times (to 4). API drops to about 62%, but the lab immediately flags the **Primary DB** at about 105%. Click **Primary DB** in the diagnose box. *Say:* "Fix one bottleneck and the next one appears. Now it's the database."
6. Click **+ Redis cache**. DB CPU falls to about 19% and the status turns **Healthy**. Point at the "Why this component?" box and its "new problems" line.
7. Drag **Traffic** to **10K**. The API tier is the bottleneck again (about 125%): click **+** on API servers 3 more times (to 7). Healthy, and the goal is reached.
8. Optional (5 s): click **Kill Redis**. The DB jumps to about 210% and errors appear. *Say:* "And that's why a cache is not free." Then click **Clear failures**.

These numbers come from the lab's model, which is deterministic, so the screen will show the same values every take.

If you want a longer demo for a later video, `#s09-m2` (URL-shortener lab, 100 → 1M req/s) is built for Video 27.

## Course exercise (put it in the description and say it once)

> **Try it yourself:** open the scaling lab (https://rizwan3659.github.io/system-design-interview-course/#s04-m5) and reach **10,000 req/s with a healthy system** while adding as few components as possible. Then press **Kill Redis**: what breaks, and why? For the full roadmap with predict-before-you-reveal stages, see Session 1: https://rizwan3659.github.io/system-design-interview-course/#s01-m1

---

## Shorts (cut from this video)

| # | Short | Source | Script (30–60 s) |
|---|---|---|---|
| 1 | **"Adding servers doesn't fix every scaling problem"** | Slides 9–10 | "10,000 requests a second. API servers at 45%. Database at 92%. Do we add more API servers? No. They'd send even more queries to the same database. The bottleneck moved, so the fix has to move. Here, that's a cache, because 80% of reads hit 5% of the data. Rule: measure first, then fix the part that's actually broken." |
| 2 | **"Why your profile edit 'disappeared'"** | Slides 14–15 | "You update your profile, refresh, and the old one shows. Nothing crashed. Your write went to the primary database. Your refresh read a replica, which is a few milliseconds behind. That's replication lag. The fix: for a few seconds after you write, read your own data from the primary." |
| 3 | **"CPU 35%, but the server is full?"** | Slides 16–17 | "Uploads time out. CPU is only 35%. But every thread is busy, waiting 8 seconds for image resizing. More servers would just wait too. Instead: save the upload, put a job on a queue, reply in 50 ms. Workers resize in the background." |
| 4 | **"Why sharding comes last"** | Slides 18–19 | "The primary is at 95% CPU from writes. Replicas copy every write, and caches only help reads, so for the first time you split the data. But sharding brings routing, cross-shard queries and rebalancing. That's why it's the last fix, not the first." |

Each Short ends with: *"Full lesson: 'What is system design?' on the channel."*

---

## Ending and transition (slide 22)

> "So that's what system design is. Not a diagram, but a story of problems and the decisions that fix them. In an interview, though, you have forty-five minutes, a one-line prompt, and an interviewer who changes the requirements on you. In the next video, I'll show you how to run this same process out loud, step by step, on a real interview question. If you want to try today's system yourself, the scaling lab is in the free interactive course, linked in the description. This channel is a complete system design series, and every video builds on this one. If that's useful to you, subscribe, and I'll see you in the next one."

The subscribe ask comes last and has a reason attached (a series that builds), with no "like, share and subscribe" at the start.
