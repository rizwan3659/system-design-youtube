# Content roadmap

This file has the first 10, 30 and 100 videos, in **viewing order** (playlist order). The publishing order, which interleaves a case study earlier for discovery, is in [`channel-strategy.md` §6](channel-strategy.md#6-recommended-publishing-sequence). The titles, hooks, thumbnails and Shorts for videos 1–30 are in [`video-briefs.md`](video-briefs.md).

**Course** links point to `https://rizwan3659.github.io/system-design-interview-course/` + the anchor shown, e.g. `#s04-m5` = Session 4, module 5.

**Category key:** **F** foundation · **S** searchable evergreen · **C** case study · **I** interview practice · **A** advanced

---

## The first 10 videos (the foundation)

| # | Video | One-line purpose |
|---|---|---|
| 1 | What Is System Design? One App, 100 → 1,000,000 Users | Establishes the method: every box exists because something broke. Doubles as the channel trailer. **Fully produced: [`ep01-why-systems-evolve/`](ep01-why-systems-evolve/)** |
| 2 | How to Approach Any System Design Interview | The 5-step framework, applied to a URL shortener. **Assets exist: [`ep01-framework/`](ep01-framework/)**; needs the new hook |
| 3 | Functional vs Non-Functional Requirements (and the Never-Happen Rule) | How requirements add or remove boxes. **Fully produced: [`ep03-requirements/`](ep03-requirements/)** |
| 4 | How to Estimate QPS, Storage and Bandwidth in 2 Minutes | The numbers vocabulary every later video uses |
| 5 | Latency, Throughput, p99 and Availability | Why averages lie; what "99.9%" costs |
| 6 | What Happens When You Open a Website | DNS → CDN → load balancer → server → cache → DB, hop by hop |
| 7 | Why Do We Need a Load Balancer? | Horizontal scaling and stateless servers |
| 8 | Where Is the Bottleneck? Reading System Metrics Like an Engineer | The channel's measure → identify → change → measure loop |
| 9 | Why Do We Need Caching? | Cache-aside, hit/miss, and the cost: stale data |
| 10 | Cache Invalidation, Stampedes and Hot Keys | What goes wrong after you add a cache |

---

## The first 30 videos

| # | Topic | Primary concept | Why viewers should care | Prerequisite | Duration | Course lesson | Interactive lab | Interview question | Next-video connection |
|---|---|---|---|---|---|---|---|---|---|
| 1 | What is system design? | Systems evolve because of problems | Stops diagram memorisation; shows the whole series in 13 minutes | None | 13 min | `#s01-m1` roadmap diagram | `#s09-m2` URL-shortener scaling lab (100 → 1M) | "Traffic grows 10× again and Redis is at 95%. What do you change?" | "You've seen what breaks. How do you say this in an interview?" → #2 |
| 2 | How to approach any interview | 5-step loop | The first 5 minutes decide the round | #1 | 12 min | `#s01-m1`, `#s09-m2` | `#s01-m1` pacing timeline; `#s09-m2` design lab | "Where would you start for 100 M redirects a day?" | "Step 1 is clarifying. What exactly should you ask?" → #3 |
| 3 | Requirements | Functional vs non-functional, never-happen rule | Requirements decide the architecture | #2 | 13 min | `#s01-m2` | `#s01-m2` "every requirement adds a box" lab | "What must never go wrong in a payment system?" | "'10 M users' is a requirement. Is that a lot?" → #4 |
| 4 | Estimate QPS | Back-of-envelope maths | Turns "big" into "needs 4 servers" | #3 | 12 min | `#s01-m3` | `#s01-m3` capacity lab (calculate, then check) | "Estimate peak QPS for 10 M DAU × 20 requests" | "We know the QPS. But how fast does each request have to be?" → #5 |
| 5 | Latency, throughput, availability | p50/p99, nines, latency orders | Users feel the tail, not the average | #4 | 12 min | `#s01-m3`, `#s08-m2` | `#s01-m3` latency ordering; `#s08-m2` availability calculator | "p50 70 ms, p99 4.8 s, CPU 42%. What next?" (`#s04-m5`) | "Where does that latency come from? Follow one request." → #6 |
| 6 | How a request travels | DNS, TLS, CDN, LB, cache, DB | Every hop is latency and a failure point | #5 | 12 min | `#s02-m2` | `#s02-m2` hop-by-hop trace | "Users get logged out randomly after adding a server. Why?" | "One server is maxed out. Why not just buy a bigger one?" → #7 |
| 7 | Load balancer | Horizontal scaling, stateless | Most common first scaling step | #6 | 12 min | `#s02-m2`, `#s08-m3` | `#s04-m5` scaling lab: add API servers + LB | "Why can't we just use sticky sessions?" | "We added servers and it got worse. How do we find out why?" → #8 |
| 8 | Where is the bottleneck? | Measure → identify → change → measure | Stops random component-adding | #7 | 11 min | `#s05-m3`, `#s04-m5` | `#s04-m5` diagnose-first scaling lab | "API 20%, Redis 15%, DB 96%, queue 0. What do you change?" | "The DB is overloaded by reads. The cheapest fix?" → #9 |
| 9 | Why caching? | Cache-aside, hit/miss, TTL | The highest-leverage scaling tool | #8 | 13 min | `#s04-m2`, `#s04-m3` | `#s04-m4` cache lab; `#s04-m2` evolve | "Why delete the key on update instead of setting it?" | "Caches create new problems. What happens when a hot key expires?" → #10 |
| 10 | Cache problems | Invalidation, stampede, hot keys, cold start | Where cache designs fail in production | #9 | 12 min | `#s04-m5` | `#s04-m4` stampede experiment; `#s04-m5` Kill Redis | "What happens if Redis goes down?" | "Our cache is fast, but users far away still wait 900 ms." → #11 |
| 11 | CDN | Edge caching, distance | Speed of light vs your users | #10 | 10 min | `#s04-m2` stage 3, `#s02-m2` | `#s04-m5` scaling lab with CDN | "Why not put the whole website on a CDN?" | "Reads are solved. But the DB is still the only copy of our data." → #12 |
| 12 | Read replicas | Replication, lag, failover | Scale reads and survive a dead primary | #11 | 13 min | `#s05-m2` | `#s05-m2` replication lab (lag, kill primary, fail over) | "Can users read stale data? What becomes the new primary?" | "Some requests take 8 seconds. Replicas can't fix slow work." → #13 |
| 13 | Queues | Async, workers, backpressure | Spikes stop killing your servers | #12 | 13 min | `#s07-m2`, `#s07-m4` | `#s07-m4` queue lab (sync vs async, add workers) | "What happens if the consumer is slower than the producer?" | "Reads are scaled, slow work is queued. Writes still hit one DB." → #14 |
| 14 | Sharding | Partitioning by key | When one machine can't hold the writes | #13 | 14 min | `#s05-m3` | `#s05-m3` bottleneck scenario + "is sharding premature?" | "Why not shard immediately?" | "We split by hash % N. Then we add one shard…" → #15 |
| 15 | Consistent hashing | Ring, virtual nodes | Adding a server shouldn't move every key | #14 | 11 min | `#s05-m3`, `#s05-m4` | `#s05-m3` 20-user shard lab; `#s05-m4` ring | "How many keys move from 3 → 4 servers?" | "Scaling for real users is solved. What about abusive ones?" → #16 |
| 16 | Rate limiting | Token bucket, windows | Protects every public API | #15 | 12 min | `#s08-m3` | `#s08-m3` four-algorithm lab | "Why can a fixed window allow 2× the limit?" | "Which database should sit behind all this?" → #17 |
| 17 | SQL vs NoSQL | Choosing storage by access pattern | The most-asked storage question | #8 | 13 min | `#s03-m5` | `#s03-m5` decision lab (9 scenarios) | "Instagram comments: SQL or NoSQL, and why?" | "We picked SQL. Why is one query on 50 M rows taking 3 s?" → #18 |
| 18 | Indexes | B-trees, leftmost prefix | Fix before you scale | #17 | 11 min | `#s03-m3` | `#s03-m3` scan vs B-tree lab; slow-query scenario | "Index on (a, b): does `WHERE b = 5` use it?" | "Reads are fast. Two users buy the last seat at the same time…" → #19 |
| 19 | Transactions | Isolation, race conditions | The double-booking bug | #18 | 12 min | `#s03-m4` | `#s03-m4` two buyers, one seat | "How do you stop two people getting the same seat?" | "Users upload 20 MB photos. Where do they go?" → #20 |
| 20 | Object storage | Blobs vs metadata, signed URLs | Files don't belong in the DB | #19 | 10 min | `#s03-m5` | `#s03-m5` upload flow diagram | "Why not store images in a BLOB column?" | "Our data now lives in two regions. What does a user see?" → #21 |
| 21 | CAP theorem | Partitions force a choice | Ends years of CAP confusion | #12 | 12 min | `#s06-m2` | `#s06-m2` partition diagram + CP/AP exercise | "Bank balance vs like counter during a partition?" | "Choosing AP means stale reads. How stale, and for whom?" → #22 |
| 22 | Eventual consistency | Strong, eventual, read-your-writes | "My edit disappeared" bugs | #21 | 12 min | `#s06-m3` | `#s06-m3` Delhi/Singapore lab | "What value can Singapore return right after the write?" | "Retries make stale reads worse, and can charge twice." → #23 |
| 23 | Idempotency | Idempotency keys | Retries without double charges | #22 | 10 min | `#s02-m4`, `#s06-m5` | `#s02-m4` double-charge exercise; `#s06-m5` diagram | "The payment call timed out. What do you do?" | "Retries also multiply load. Can retries crash a system?" → #24 |
| 24 | Retries, timeouts, circuit breakers | Resilience patterns | Why a 10-second blip becomes an outage | #23 | 13 min | `#s08-m4` | `#s08-m4` chaos lab + retry-storm scenario | "The DB recovered, but the site stayed down. Why?" | "And when the DB doesn't come back at all?" → #25 |
| 25 | Failover and leader election | Detection, promotion, split brain | What really happens when the primary dies | #24 | 12 min | `#s05-m2`, `#s06-m5` | `#s05-m2` failover diagram + replication lab | "Two nodes both think they're primary. Now what?" | "You know every building block. Let's design something real." → #26 |
| 26 | URL shortener, part 1 | Requirements → basic design | The classic first interview question | #2–#13 | 14 min | `#s09-m2` | `#s09-m2` guided stepper + capacity lab | "What if two users generate the same short URL?" | "100 req/s works. What happens at a million?" → #27 |
| 27 | URL shortener, part 2 | Scaling to 1M req/s | Watching every building block do its job | #26 | 13 min | `#s09-m2` | `#s09-m2` scaling lab (live demo, 100 → 1M) | "Why does 'count clicks' need a queue?" | "We kept abusers out with a single server's limiter. 50 servers?" → #28 |
| 28 | Design a rate limiter | Distributed counters | A favourite short design question | #16, #27 | 13 min | `#s08-m5` | `#s08-m3` lab + `#s08-m6` checkpoint | "Redis goes down: fail open or closed?" | "Send an SMS to 10 M users without delaying OTPs?" → #29 |
| 29 | Design a notification service | Priority queues, providers | Every product needs one | #13, #28 | 14 min | `#s07-m5`, case `#case-notify` | `#case-notify-m3` blast queue lab | "OTPs arrive late during a marketing blast. Why?" | "Notifications are one-way. What if the user replies instantly?" → #30 |
| 30 | Design WhatsApp, part 1 | WebSockets, delivery, offline users | Real-time systems | #29 | 14 min | `#s10-m3` | `#s10-m3` message-delivery trace | "How does a message reach an offline phone?" | "Groups of 256, ordering, and read receipts" → #63 |

---

## The first 100 videos

Topic + purpose + category. A blank line separates playlist blocks.

### Playlist 1 · System Design From Zero
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 1 | What is system design? One app, 100 → 1M users | The method + trailer | F |
| 2 | How to approach any system design interview | The 5-step loop | F I S |
| 3 | Functional vs non-functional requirements | Requirements drive boxes | F S |
| 4 | Estimate QPS, storage, bandwidth in 2 minutes | Numbers vocabulary | F S |
| 5 | Latency, throughput, p99, availability | Measuring what users feel | F S |
| 6 | What happens when you open a website | Request path, hop by hop | F S |

### Playlist 2 · Scaling Building Blocks
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 7 | Why do we need a load balancer? | Horizontal scaling | F S |
| 8 | Where is the bottleneck? | Measurement-first thinking | F |
| 9 | Why do we need caching? | Cache-aside | F S |
| 10 | Cache invalidation, stampedes, hot keys | Cache failure modes | S A |
| 11 | CDN: why distance matters | Edge caching | F S |
| 12 | Why do we need read replicas? | Replication + lag | F S |
| 13 | Why do we need a queue? | Async + backpressure | F S |
| 14 | When do we need database sharding? | Partitioning | F S |
| 15 | Consistent hashing | Rebalancing | S |
| 16 | Rate limiting: 4 algorithms | Protection | S |

### Playlist 3 · Databases for System Design
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 17 | SQL vs NoSQL | Storage choice | S |
| 18 | Database indexes | Fix before scaling | S |
| 19 | Transactions and the double-booking bug | Isolation | S |
| 20 | Object storage | Blobs vs metadata | F |

### Playlist 6 · Distributed Systems (first block)
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 21 | CAP theorem without confusion | Partitions force choices | S |
| 22 | Eventual consistency and read-your-writes | Stale reads | S |
| 23 | Idempotency | Safe retries | S |
| 24 | Retries, timeouts, circuit breakers | Resilience | S A |
| 25 | Failover and leader election | HA | A |

### Playlist 7 · Case Studies (first block)
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 26 | URL shortener, part 1: requirements → basic design | Classic design | C S |
| 27 | URL shortener, part 2: scaling to 1M req/s | Lab payoff | C |
| 28 | Design a rate limiter | Distributed counters | C S |
| 29 | Design a notification service | Priority queues | C S |
| 30 | Design WhatsApp, part 1: real-time delivery | WebSockets | C S |

### Building-blocks deep dives
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 31 | API design: pagination, versioning, errors | Interfaces | F S |
| 32 | REST vs gRPC vs GraphQL vs WebSockets | API style choice | S |
| 33 | API gateway vs reverse proxy vs load balancer | Commonly confused | S |
| 34 | Horizontal vs vertical scaling (and when vertical wins) | Honest trade-off | S |
| 35 | How big should a cache be? Sizing and eviction (LRU vs LFU) | Numbers for caches | A |
| 36 | Stateless vs stateful services | Why sessions move out | F |
| 37 | WebSockets at scale: connections, reconnect storms | Real-time infra | A |
| 38 | Service discovery and health checks | Microservice plumbing | A |
| 39 | Monolith vs microservices: when to split | Architecture judgement | S |
| 40 | Observability: metrics, logs, traces | Debugging production | S |
| 41 | SLOs, SLAs and error budgets | Reliability targets | S |

### Playlist 3 · Databases (deep dives)
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 42 | Choosing a shard key (with 4 real tables) | Partitioning judgement | A |
| 43 | Hot partitions and celebrity users | Skew | A |
| 44 | Data modelling for interviews | Tables from requirements | F |
| 45 | Wide-column stores (Cassandra-style) explained | Write-heavy storage | S |
| 46 | Search architecture: inverted index + CDC | Search systems | S |
| 47 | Normalisation vs denormalisation | Read vs write cost | F |
| 48 | Time-series and analytics storage | OLTP vs OLAP | A |

### Playlist 5 · Queues & Event-Driven Systems
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 49 | Pub/sub vs work queues | Messaging patterns | S |
| 50 | Kafka-style logs explained (partitions, offsets, consumers) | Event streaming | S |
| 51 | Delivery guarantees: at-most, at-least, "exactly once" | Semantics | A |
| 52 | Dead-letter queues and poison messages | Failure handling | A |
| 53 | Sagas: multi-step transactions across services | Distributed workflows | A |

### Playlist 6 · Distributed Systems (advanced)
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 54 | Quorums: R + W > N | Tunable consistency | A |
| 55 | Distributed locks, leases and fencing tokens | Correctness | A |
| 56 | Time and ordering: why clocks lie | Ordering | A |
| 57 | Split brain | HA failure | A |
| 58 | Multi-region architecture | Global systems | A S |
| 59 | Backpressure everywhere | Overload control | A |
| 60 | Bloom filters | Probabilistic structures | S |
| 61 | Geo-indexing: geohash and cells | Location systems | A |
| 62 | Load shedding and graceful degradation | Surviving overload | A |

### Playlist 7 · Case Studies (main block)
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 63 | WhatsApp, part 2: groups, ordering, receipts | Real-time depth | C |
| 64 | Pastebin | Blob + metadata | C S |
| 65 | Instagram feed, part 1: fan-out on write vs read | Feeds | C S |
| 66 | Instagram feed, part 2: the celebrity problem | Hybrid fan-out | C |
| 67 | Twitter/X timeline | Feed at scale | C S |
| 68 | YouTube, part 1: requirements + basic architecture | Video systems | C S |
| 69 | YouTube, part 2: how video upload actually works | Direct upload | C |
| 70 | YouTube, part 3: the transcoding pipeline | Queues at scale | C |
| 71 | YouTube, part 4: CDN and global video delivery | Egress | C |
| 72 | YouTube, part 5: scaling to millions of users | Bottlenecks | C |
| 73 | YouTube, part 6: full interview walkthrough | Interview | C I |
| 74 | Uber, part 1: live locations at 250K writes/s | Geo + hot state | C S |
| 75 | Uber, part 2: matching without double-assigning | Consistency | C |
| 76 | Uber, part 3: trip state machine and payments | Workflows | C |
| 77 | Google Drive / Dropbox, part 1: chunking and dedup | Storage | C S |
| 78 | Google Drive / Dropbox, part 2: sync and conflicts | Sync | C |
| 79 | Search autocomplete | Precompute + memory | C S |
| 80 | Web crawler | Frontier + politeness | C S |
| 81 | Ticket booking, part 1: the flash crowd | Waiting rooms | C S |
| 82 | Ticket booking, part 2: never double-book | Atomic holds | C |
| 83 | Payment system, part 1: charge exactly once | Idempotency | C S |
| 84 | Payment system, part 2: ledger and reconciliation | Correctness | C |
| 85 | Design a key-value store | Distributed storage | C A |
| 86 | Design a distributed cache | Caching at scale | C A |
| 87 | Design a news aggregator / top-K trending | Streaming counts | C |
| 88 | Design a metrics and logging system | Observability infra | C A |

### Playlist 8 · Interview Practice
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 89 | Full mock interview: URL shortener (real timing) | Practice | I |
| 90 | 10 follow-up questions interviewers ask (and strong answers) | Interviewer mode | I S |
| 91 | 7 system design interview mistakes | Avoid failing | I S |
| 92 | Estimation drill: 10 problems in 15 minutes | Speed | I |
| 93 | Full mock interview: design a chat app | Practice | I |
| 94 | How system design interviews are scored | Rubric | I S |

### Playlist 9 · LLD / Object-Oriented Design (first block)
| # | Topic | Purpose | Cat |
|---|---|---|---|
| 95 | From HLD box to classes: the LLD bridge | Connects the playlists | F I |
| 96 | SOLID with real refactors | Principles | S |
| 97 | Design patterns that actually come up | Patterns | S |
| 98 | LLD: Parking lot (with Python) | Classic LLD | C S |
| 99 | LLD: LRU cache, thread-safe | Data structures + concurrency | C S |
| 100 | LLD: Elevator system | State machines | C S |

*Season 2 of LLD after #100: rate limiter LLD, logger, pub/sub, task scheduler, vending machine (State pattern), library system, all of which already exist as course labs (`#s15`–`#s19`).*

### Category totals (first 100)
A video can carry more than one tag. Foundation 19 · Searchable evergreen 56 · Case studies 34 · Interview 9 · Advanced 23.
