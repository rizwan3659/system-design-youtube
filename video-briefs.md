# Video briefs: videos 1–30

Each brief gives you **5 titles** (S = search, C = curiosity, I = interview, P = problem; the first is the recommended launch title), **thumbnail concepts**, **3 hooks**, a **diagram sequence**, **viewer questions**, the **interviewer-mode** question, the **"why not"** moment, the **course lab**, **Shorts**, and the **closing tease**. The full production package for Video 1 is in [`ep01-why-systems-evolve/`](ep01-why-systems-evolve/).

The thumbnail layout is the same for every video: dark navy grid, 1–3 yellow words on the left, a simple diagram on the right with one red box.

---

## 1 · What is system design? One app, 100 → 1,000,000 users
→ **Fully produced: [`ep01-why-systems-evolve/production.md`](ep01-why-systems-evolve/production.md)**

---

## 2 · How to approach any system design interview
*Assets: [`ep01-framework/`](ep01-framework/). Re-record only slide 1 with the new hook, and change the end slide's "next episode" to Video 3.*

**Titles**
1. (S) How to Approach Any System Design Interview (5-Step Framework)
2. (C) Two Candidates, Same Question. Only One Passed. Here's Why.
3. (I) What System Design Interviewers Actually Grade
4. (P) "Design a URL Shortener." What Do You Say First?
5. (S) System Design Interview Framework with a Full Example

**Thumbnails:** `DON'T DRAW YET` (existing B) · `5 STEPS` (existing A) · `FIRST 5 MIN`

**Hooks**
1. "The interviewer says: design a URL shortener. Candidate A starts drawing: load balancer, Kafka, Redis, twelve boxes in two minutes. Candidate B asks four questions first. Candidate B gets the offer. Not because A's boxes were wrong, but because nobody could tell why they were there."
2. "You have 45 minutes and a one-line prompt: 'Design a URL shortener.' What you do in the first five minutes decides most of your score."
3. "Last video we watched a system grow from one server to a million users. In an interview you have to do that out loud, in 45 minutes, while someone keeps changing the requirements. Here's how."

**Pinned comment (replaces the old one, which invented a personal story):**
> Which step do people skip most often in interviews: clarifying, the APIs, or the data model? Cheat sheet: Clarify → Interactions → Data → Simple design → Challenge. Practise it free: https://rizwan3659.github.io/system-design-interview-course/#s09-m2

**Shorts:** "Don't draw yet: 4 questions to ask first" · "301 vs 302: the URL shortener detail interviewers love" · "Why sharding doesn't fix a viral link"
**Next:** "Step one is clarifying. But what exactly do you ask, and how does each answer change the design?" → #3

---

## 3 · Functional vs non-functional requirements
→ **Fully produced: [`ep03-requirements/production.md`](ep03-requirements/production.md)** (the package below was the starting brief; the production file supersedes it)

**Titles:** (S) Functional vs Non-Functional Requirements \| System Design · (P) One Sentence Added Three Servers to Our Design · (I) The Requirement Interviewers Want You to Ask About · (C) "Never Lose a Message" Changes Everything · (S) How to Gather Requirements in a System Design Interview
**Thumbnails:** `+1 REQUIREMENT = +1 BOX` · `NEVER LOSE DATA?` · `ASK THIS FIRST`
**Hooks**
1. "Two designs for the same chat app. One is a single server, one has six components. Both are correct. The difference is one sentence the interviewer said: 'messages must never be lost'."
2. "'Send a welcome email' sounds like a feature. In a system design interview it quietly adds a queue and a worker. Let's see why."
3. "Every system has one thing the business can't accept: a seat sold twice, a payment charged twice, a message lost. Find it in the first five minutes."
**Diagrams:** 1 server + DB → "10 M users" adds LB + servers → "reads 100× writes" adds cache → "never lose data" adds replica → "send email" adds queue + worker → "photos" adds CDN
**Viewer questions:** "Functional or non-functional: 'feed loads in 300 ms'?" · "Which box does 'never lose data' add?"
**Interviewer mode:** "What must never go wrong in a payment system?" → a customer charged twice, or money created or lost.
**Why not:** "Why not ask about Kafka vs RabbitMQ now?" Tools before the problem is known.
**Lab:** `#s01-m2` "Every requirement adds a box" + sort exercises
**Shorts:** "The never-happen rule" · "Why 'send a welcome email' adds a queue" · "3 questions that shape every design"
**Next:** "'10 million users' is a requirement. But is that a lot? You can't tell until you turn it into requests per second." → #4

---

## 4 · How to estimate QPS, storage and bandwidth
**Titles:** (S) Back-of-the-Envelope Estimation for System Design · (P) 10 Million Users. How Many Servers? · (I) Estimation in 2 Minutes, the Way Interviewers Want · (C) The Only Number You Need to Memorise: 86,400 · (S) How to Calculate QPS, Storage and Bandwidth
**Thumbnails:** `10M USERS = ? QPS` · `86,400` · `1 SERVER OR 100?`
**Hooks**
1. "Ten million daily users. Is that one server or a hundred? Most people guess. In two minutes you can know."
2. "A video site serves 5 million views a day. That's about 200 gigabits per second at peak, which is why video never comes from your app servers."
3. "Divide by 86,400 and multiply by 3. Those two steps answer half the questions in a system design interview."
**Diagrams:** 10M × 20 = 200M/day → ÷ 86,400 ≈ 2,315 QPS → × 3 peak ≈ 7K → storage per day/year → bandwidth → cache size (80/20) → verdict: servers needed
**Viewer questions:** "Pause: estimate peak QPS for 10M DAU × 20 requests." · "Does 1 TB need sharding?"
**Interviewer mode:** "1 M drivers send GPS every 4 seconds. Writes per second?" → 250 K/s, so not a disk database row per update.
**Why not:** "Why not calculate exactly?" Because the decision only needs the order of magnitude.
**Lab:** `#s01-m3` capacity lab (calculate, then check, 6 scenarios) + estimation drill
**Shorts:** "1 million requests a day ≈ 12 per second" · "Why we plan for peak, not average" · "How big is 1 billion profiles?"
**Next:** "We know how many requests. But how fast must each one be, and why does the average lie?" → #5

---

## 5 · Latency, throughput, p99 and availability
**Titles:** (S) Latency vs Throughput vs Availability Explained · (C) Your Average Latency Is Lying to You · (P) p50 = 70 ms, p99 = 4.8 s. What's Wrong? · (I) What "99.9% Availability" Really Costs · (S) Latency Numbers Every Engineer Should Know (Intuitively)
**Thumbnails:** `AVG LIES` · `p99 = 4.8s` · `99.9% = 43 MIN`
**Hooks**
1. "Your dashboard says average latency: 70 milliseconds. Your users say the app is slow. Both are right."
2. "Reading from RAM takes about a hundred nanoseconds. A request to another continent takes about 150 milliseconds. That's a million times slower, and it explains half of system design."
3. "Ninety-nine point nine percent availability sounds perfect. It allows 43 minutes of downtime every month. Is that acceptable for a payment system?"
**Diagrams:** latency ladder (log scale) → percentile histogram, p50 vs p99 → page with 20 backend calls hitting p99 → availability in series vs parallel → nines table
**Viewer questions:** "Order these six operations, fastest first." · "Which matters more for a page making 20 calls: p50 or p99?"
**Interviewer mode:** "p50 70 ms, p95 180 ms, p99 4.8 s, CPU 42%. What would you investigate?"
**Why not:** "Why not just add servers when it's slow?" Nothing is saturated; the tail comes from specific slow paths.
**Lab:** `#s01-m3` latency ordering · `#s08-m2` availability calculator · `#s04-m5` p99 debugging scenario
**Shorts:** "Why Redis is fast (it's not the network)" · "Average latency lies" · "What 99.9% uptime allows"
**Next:** "Those 150 milliseconds come from somewhere. Let's follow one request, hop by hop." → #6

---

## 6 · What happens when you open a website
**Titles:** (S) What Happens When You Type a URL? (System Design View) · (C) 7 Hops Before Your Server Does Any Work · (I) The Request Path Interviewers Expect You to Draw · (P) Every Hop Is a Place Your System Can Fail · (S) DNS, CDN, Load Balancer, Server: The Request Lifecycle
**Thumbnails:** `7 HOPS` · `WHERE DID 900ms GO?` · `CLICK → ? → DB`
**Hooks**
1. "You type a URL and press Enter. Before your server runs a single line of code, about six things have already happened, and each one can fail."
2. "A user in Sydney says your site takes 900 milliseconds to load. Your server says it answered in 15. Where did the other 885 go?"
3. "Add a second server and users start getting logged out at random. To understand why, you need to know what happens between the browser and your code."
**Diagrams:** browser → DNS → CDN → TLS to LB → API server → Redis → DB, one hop lit at a time; then failure points marked; then the "sessions in memory" bug
**Viewer questions:** "Which of these hops would a CDN skip?" · "Why do users get logged out after adding a server?"
**Interviewer mode:** "Users are randomly logged out after scaling to two servers. Why?" → sessions stored in server memory.
**Why not:** "Why not sticky sessions?" They break when a server dies and spread load unevenly.
**Lab:** `#s02-m2` hop-by-hop trace + stateless prediction
**Shorts:** "Why TLS is slow across continents" · "Why your servers must be stateless" · "What a CDN actually skips"
**Next:** "One server is maxed out. Do we buy a bigger one, or several small ones?" → #7

---

## 7 · Why do we need a load balancer?
**Titles:** (S) Load Balancer Explained \| System Design Basics · (P) One Server Is at 98% CPU. Now What? · (C) We Added Servers and Nothing Changed · (I) Load Balancers: What Interviewers Actually Ask · (S) Horizontal Scaling and Load Balancing for Beginners
**Thumbnails:** `98% CPU` · `1 SERVER → 3?` · `8,000 vs 500` (uneven servers)
**Hooks**
1. "Three API servers. One gets 8,000 requests a second, another gets 500, the third gets almost nothing. The busy one is about to fall over. How do we spread the traffic?"
2. "Our app server is at 98% CPU and the database is at 30%. Buying a bigger server works, until it doesn't."
3. "We added two servers behind DNS and users started losing their carts. The fix isn't more servers. It's a load balancer and one design rule."
**Diagrams:** 1 server red → bigger server (vertical) and its ceiling → 3 servers, DNS round-robin, uneven → LB with health checks → a server dies, traffic shifts → sessions moved to Redis
**Viewer questions:** "Which is overloaded: app or DB?" · "Server 2 dies. What does the LB do?"
**Interviewer mode:** "Why can't we use sticky sessions?" · "What if the load balancer itself dies?"
**Why not:** "Why not vertical scaling forever?" Price, a hard ceiling, and a single point of failure.
**Lab:** `#s04-m5` scaling lab: add API servers, then the load balancer (watch "only 1 gets traffic" without it)
**Shorts:** "Vertical vs horizontal scaling in 45 seconds" · "Why load balancers need health checks" · "Round robin vs least connections"
**Next:** "We added servers and the site got *slower*. Why? Before adding anything else, we need to find out where the time goes." → #8

---

## 8 · Where is the bottleneck?
**Titles:** (S) How to Find the Bottleneck in System Design · (P) We Added 10 Servers. It Got Slower. · (C) Stop Adding Redis: Find the Bottleneck First · (I) "Where Is the Bottleneck?" Interview Questions, Solved · (S) Reading System Metrics: CPU, Connections, p99, Queue Depth
**Thumbnails:** `WHICH ONE?` (four metric tiles, one red) · `DB 96%` · `+10 SERVERS = SLOWER`
**Hooks**
1. "API CPU 20%. Redis 15%. Database 96%. Database connections 98%. Queue depth zero. Somebody suggests adding API servers. Would that help?"
2. "The most expensive mistake in scaling isn't picking the wrong database. It's fixing a component that wasn't broken."
3. "We doubled our API servers and latency went *up*. Here's how engineers figure out what's really going on."
**Diagrams:** four metric panels, one per scenario → measure → identify → change → measure loop → connection-pool exhaustion → wrong fix vs right fix side by side
**Viewer questions:** three "Where is the bottleneck?" rounds (DB reads, DB connections, workers)
**Interviewer mode:** "API 20%, Redis 15%, DB 96%, replicas 12%, 40K writes/s. What do you change?" → writes, so sharding (not replicas).
**Why not:** "Why not add a cache here?" A cache absorbs reads, and this bottleneck is writes.
**Lab:** `#s04-m5` diagnose-first scaling lab · `#s05-m3` bottleneck scenario
**Shorts:** "Why more servers can make it slower" · "Measure, identify, change, repeat" · "Connection pools: the silent bottleneck"
**Next:** "Our database is overloaded by reads, the same rows thousands of times a second. What's the cheapest fix?" → #9

---

## 9 · Why do we need caching?
**Titles:** (S) Caching Explained \| Why Systems Need Redis · (P) Database at 95% CPU. Traffic Just Grew 10×. · (C) 5% of Your Data Gets 80% of Your Traffic · (I) Caching in System Design Interviews: Cache-Aside Explained · (S) Cache-Aside vs Write-Through vs Write-Back
**Thumbnails:** `DB 95%` → `CACHE?` · `5% DATA, 80% TRAFFIC` · `400ms → 2ms`
**Hooks**
1. "Our application has a million users. Everything's fine. Then traffic grows ten times, the database hits 95% CPU, and pages take three seconds. Looking closer: 80% of requests read the same 5% of products."
2. "The fastest database query is the one you never send."
3. "Adding Redis can cut latency from 400 milliseconds to 2. It can also show customers yesterday's price. Both happen for the same reason."
**Diagrams:** Client → API → DB (DB red) → Redis added → cache hit path → cache miss path → TTL expiry → write: update DB, delete key → final: CDN + Redis + DB
**Viewer questions:** "Would more API servers help? API CPU is 34%." · "Hit or miss? The key expired 2 seconds ago."
**Interviewer mode:** "Why delete the key on update instead of setting the new value?" → racing writers.
**Why not:** "Why not read replicas? Why not shard?" (from the course's evolve stage 2)
**Lab:** `#s04-m2` evolve (predict each stage) · `#s04-m4` cache lab · `#s04-m3` "which data should be cached" comparison
**Shorts:** "The 80/20 rule of caching" · "Cache-aside in 40 seconds" · "Why you delete, not set, on write" · "Never cache this"
**Next:** "Caching solved our reads, and created a new problem. What happens when a hot key expires and 1,000 requests miss at once?" → #10

---

## 10 · Cache invalidation, stampedes and hot keys
**Titles:** (S) Cache Stampede, Hot Keys and Invalidation Explained · (P) Redis Restarted. Then the Database Died. · (C) The 2 Hard Things in Computer Science: The Cache One · (I) "What Happens If Redis Goes Down?" · (S) Cache Problems in Production and How to Fix Them
**Thumbnails:** `REDIS DOWN` · `1,000 MISSES` · `STALE PRICE`
**Hooks**
1. "At 12:00:00 a popular product's cache key expires. At 12:00:01, a thousand requests miss at once and hit the database. At 12:00:02 the database stops answering."
2. "Your cache restarts during a sale. It's empty. Every single read now goes to a database that was sized for a 10% miss rate."
3. "A customer sees ₹100 on the product page and ₹110 at checkout. Nothing is broken. Your cache is doing exactly what you told it to."
**Diagrams:** stale read timeline → delete-on-write race → stampede: 1,000 arrows to the DB → single-flight: 1 arrow → hot key on one node → key replication + local cache → cold-start ramp
**Viewer questions:** "How many DB queries during the stampede, with and without single-flight?" · "Would more Redis nodes fix a hot key?"
**Interviewer mode:** "What happens if Redis goes down?" · "The p99 is 4.8 s but averages are fine. Why?"
**Why not:** "Why not remove TTLs so keys never expire?" Stale data forever.
**Lab:** `#s04-m4` cache lab stampede experiment · `#s04-m5` scaling lab "Kill Redis" · p99 debugging scenario
**Shorts:** "Cache stampede in 45 seconds" · "Why more Redis nodes don't fix a hot key" · "What a cold cache does to your DB"
**Next:** "Redis answers in a millisecond, but users in another continent still wait 900. The problem isn't the server. It's the speed of light." → #11

---

## 11 · CDN: why distance matters
**Titles:** (S) What Is a CDN? \| System Design Explained · (P) Our API Is Fast. Users in Sydney Wait 900 ms. · (C) You Can't Optimise the Speed of Light · (I) CDNs in System Design Interviews · (S) Push vs Pull CDN, Cache-Control and Invalidation
**Thumbnails:** `900ms AWAY` · `SPEED OF LIGHT` · `1.4 TB/s`
**Hooks**
1. "Our API answers in 15 milliseconds. A user 10,000 kilometres away waits almost a second for the page. Better code won't fix that."
2. "A popular video site would need terabytes per second of bandwidth from its own servers. Instead, almost none of it comes from them."
3. "Images and scripts are 90% of the bytes on most pages. So why are they still coming from your app servers?"
**Diagrams:** world map: one origin, round-trip lines → edges near users → cache hit at edge vs miss to origin → versioned filenames → what you can't cache (personalised)
**Viewer questions:** "Which of these responses can a CDN cache?" · "Push or pull CDN for a viral video?"
**Interviewer mode:** "Why not put the whole website on a CDN?"
**Why not:** "Why not just a bigger Redis?" Redis isn't the slow part.
**Lab:** `#s04-m5` scaling lab with CDN (cdnFrac) · `#s02-m2` trace
**Shorts:** "Why CDNs exist in one picture" · "Versioned file names: free cache invalidation"
**Next:** "Reads are solved: CDN, cache, fast API. But the database is still the only copy of our data. What if it dies?" → #12

---

## 12 · Why do we need read replicas?
**Titles:** (S) Database Replication Explained \| Read Replicas · (P) Your Primary Database Just Died. Now What? · (C) Why Your Database Replica Returns Old Data · (I) Replication Lag: The Interview Follow-Up Everyone Misses · (S) Primary-Replica Architecture for Beginners
**Thumbnails:** `PRIMARY DOWN` · `OLD DATA?` · `1 DB = 1 FAILURE`
**Hooks**
1. "Imagine your production database disappears right now. Your API servers are healthy, your users are online, and nobody can read or write anything. What happens next?"
2. "A user updates their profile, refreshes, and sees the old one. Nothing crashed. You just met replication lag."
3. "Read replicas can triple your read capacity. They can also lose the last second of writes. Let's see both."
**Diagrams:** single DB → primary + 2 replicas → writes vs reads → lag timeline → primary dies → promotion → lost writes (async) → sync replication trade-off
**Viewer questions:** "Can reads continue? Can writes?" · "Which replica should be promoted?"
**Interviewer mode:** "Could the user read stale data? What becomes the new primary?"
**Why not:** "Why not just a bigger primary?" It's still one machine, and replicas also give failover.
**Lab:** `#s05-m2` replication lab (lag, stale read, kill primary, fail over, sync mode)
**Shorts:** "Why replicas return old data" · "Sync vs async replication in 50 seconds" · "Replicas don't scale writes"
**Next:** "Some requests take eight seconds, and replicas can't fix that. The problem is the work itself." → #13

---

## 13 · Why do we need a queue?
**Titles:** (S) Message Queues Explained \| System Design · (P) Every Upload Takes 8 Seconds. Then Traffic Triples. · (C) What Happens When the Consumer Is Slower Than the Producer? · (I) Queues and Backpressure: Interview Questions · (S) Synchronous vs Asynchronous Processing
**Thumbnails:** `8 SECONDS` · `QUEUE GROWING` · `PRODUCER > CONSUMER`
**Hooks**
1. "Every image upload takes eight seconds and holds a server thread the whole time. During a promotion, uploads triple. The servers aren't busy, they're *waiting*, and they still run out."
2. "A queue lets you answer the user in 50 milliseconds while the work takes minutes. It also lets problems hide for hours."
3. "What happens when work arrives faster than you can process it? The answer is either a growing queue, or backpressure."
**Diagrams:** sync chain → threads exhausted → API → queue → workers → depth chart growing → add workers → stable → bounded queue + 429 (backpressure) → workers stopped: silent failure
**Viewer questions:** "How many workers for 20 jobs/s at 8 s each?" (160) · "Is the queue growing or draining?"
**Interviewer mode:** "What happens if the consumer is slower than the producer?" · "Workers crashed; all health checks are green. How would you notice?"
**Why not:** "Why not more API servers?" Each request would still wait 8 seconds.
**Lab:** `#s07-m4` queue lab (sync vs async, workers, burst, bounded queue, stop workers)
**Shorts:** "Backpressure in 45 seconds" · "Why green dashboards can hide a dead queue" · "Little's law for workers"
**Next:** "Reads are scaled and slow work is queued. But every write still lands on one database. What happens when *that* is the bottleneck?" → #14

---

## 14 · When do we need database sharding?
**Titles:** (S) Database Sharding Explained \| System Design · (P) 10 Million Users, One Database. What Breaks First? · (C) Your Database Hit 100% CPU. Should You Shard? · (I) Sharding: What Interviewers Actually Expect · (S) Horizontal Partitioning and Shard Keys
**Thumbnails:** `1 DB → 100M USERS?` · `SHARD NOW?` · `WRITES 96%`
**Hooks**
1. "We've cached the reads, added replicas, and moved slow work to a queue. The primary database is still at 96% CPU, and every single write has nowhere else to go."
2. "Sharding is the most powerful scaling tool in this series. It's also the one most often used too early."
3. "A teammate says 'let's shard'. The database is at 70% CPU, mostly reads, 300 GB. Do you agree?"
**Diagrams:** metrics (replicas idle, primary red) → split by user_id into 3 shards → router → query with key vs without (scatter-gather) → hot shard → cost list
**Viewer questions:** "Which bottleneck justifies sharding: reads or writes?" · "What's a good shard key for a chat app?"
**Interviewer mode:** "Why not shard immediately?" · "How do you find a user by email if you shard by user_id?"
**Why not:** "Why not more replicas?" Replicas copy every write.
**Lab:** `#s05-m3` bottleneck scenario + "when is sharding premature?" hints + router diagram
**Shorts:** "Replicas don't fix write load" · "When sharding is premature" · "Scatter-gather explained"
**Next:** "We split users with hash(id) % 3. Then we add a fourth shard, and almost every user moves." → #15

---

## 15 · Consistent hashing
**Titles:** (S) Consistent Hashing Explained Simply · (P) We Added One Server. 75% of Our Keys Moved. · (C) Why hash(key) % N Breaks When You Scale · (I) Consistent Hashing Interview Question, Visualised · (S) Hash Rings and Virtual Nodes
**Thumbnails:** `75% MOVED` · `% N ✕` · `ADD 1 SERVER`
**Hooks**
1. "Three cache servers, keys split with hash mod 3. We add a fourth server, and three-quarters of all keys suddenly live somewhere else. Every one of those is a cache miss."
2. "Twenty users on three shards. Add one shard. Count how many move. With one formula it's fifteen. With another, about five."
3. "Consistent hashing is the trick behind distributed caches and databases. It's easier than it sounds."
**Diagrams:** 20 user chips on 3 shards → 4 shards, moved chips highlighted → ring → new node takes only from its neighbour → virtual nodes even out load
**Viewer questions:** "Predict: how many of 20 users move from 3 → 4 shards?" · "Why add virtual nodes?"
**Interviewer mode:** "How many keys move when you add a server to a ring of N?" → about 1/(N+1).
**Why not:** "Why not just pre-split into many shards?" That's a valid alternative (logical shards); compare them.
**Lab:** `#s05-m3` 20-user sharding lab · `#s05-m4` ring lab with 10K keys
**Shorts:** "Why % N reshuffles everything" · "Virtual nodes in 40 seconds"
**Next:** "Our system scales for real users. But what about the one client sending 10,000 requests a second?" → #16

---

## 16 · Rate limiting: four algorithms
**Titles:** (S) Rate Limiting Algorithms Explained (Token Bucket, Sliding Window) · (P) One Client Sends 10,000 Requests a Second · (C) Why a Fixed Window Lets 2× Through · (I) Rate Limiter Questions Interviewers Ask · (S) Token Bucket vs Leaky Bucket vs Fixed vs Sliding Window
**Thumbnails:** `429` · `2× THE LIMIT?` · `TOKEN BUCKET`
**Hooks**
1. "Your limit is 100 requests per minute. A client sends 100 at 0:59 and another 100 at 1:01. Your limiter allowed all 200 in two seconds, and it wasn't buggy."
2. "One misbehaving client can take down an API that serves a million good ones."
3. "Four rate-limiting algorithms, the same traffic, four different results. Let's watch them side by side."
**Diagrams:** API overwhelmed by one client → token bucket animation → leaky bucket queue → fixed window boundary burst → sliding window → where the limiter sits (gateway + Redis)
**Viewer questions:** "How many of this burst does the token bucket accept?" · "Which algorithm prevents the boundary burst?"
**Interviewer mode:** "Your limiter's Redis is down. Fail open or closed?"
**Why not:** "Why not just block IPs?" Shared IPs, NAT, and attackers rotating addresses.
**Lab:** `#s08-m3` four-algorithm lab (play the token bucket, boundary pattern)
**Shorts:** "Token bucket in 45 seconds" · "The fixed-window boundary bug"
**Next:** "We've built every building block. But which database actually sits behind all this?" → #17

---

## 17 · SQL vs NoSQL
**Titles:** (S) SQL vs NoSQL: How to Actually Choose · (P) Instagram Comments: SQL or NoSQL? · (I) The SQL vs NoSQL Answer Interviewers Want · (C) "NoSQL Scales Better" Is the Wrong Reason · (S) Choosing a Database for System Design
**Thumbnails:** `SQL OR NoSQL?` · `9 SYSTEMS, 9 CHOICES` · `IT DEPENDS (ON THIS)`
**Hooks**
1. "Payments, chat messages, a product catalogue and a session store. Four systems, and four different right answers to 'which database?'"
2. "'We'll use MongoDB because it scales' is one of the weakest sentences in a system design interview. Here's a stronger way to choose."
3. "The question isn't SQL or NoSQL. It's: what's your access pattern, and what must never go wrong?"
**Diagrams:** decision tree (transactions? access pattern? write volume? shape?) → 6 storage families → scenario cards with the chosen store
**Viewer questions:** "Chat messages at 50 K writes/s, read by conversation: which?" · "Session store?"
**Interviewer mode:** "Instagram comments: SQL or NoSQL, and why?" (two defensible answers)
**Why not:** "Why not one database for everything?"
**Lab:** `#s03-m5` decision lab (choose + justify, 9 scenarios)
**Shorts:** "Why payments use SQL" · "When a wide-column store wins" · "Where search actually lives"
**Next:** "We chose SQL. One query on 50 million rows takes 3 seconds. Before scaling anything: an index." → #18

---

## 18 · Database indexes
**Titles:** (S) Database Indexes Explained (B-Trees) · (P) One Query, 50 Million Rows, 3 Seconds · (C) Why 1 Billion Rows Can Still Be Fast · (I) Index Questions Interviewers Ask · (S) Composite Indexes and the Leftmost-Prefix Rule
**Thumbnails:** `50M ROWS SCANNED` · `3s → 3ms` · `(a, b) ≠ b`
**Hooks**
1. "Your 'My orders' page takes three seconds. The database examines 50 million rows to return 20. Do you need a bigger database, or one line of SQL?"
2. "A thousand times more rows adds about one level to a B-tree. That's why indexes feel like magic."
3. "Index on (country, city). Does a query on city use it? Most people guess wrong."
**Diagrams:** full scan → B-tree lookup → composite index order → leftmost-prefix examples → write cost of indexes
**Viewer questions:** "Does `WHERE city=…` use an index on (country, city)?" · "Rows examined vs returned: what does the gap tell you?"
**Interviewer mode:** "Index on (a, b): does `WHERE b = 5` use it?"
**Why not:** "Why not add a cache or shard?" Both hide a missing index.
**Lab:** `#s03-m3` scan vs B-tree lab + slow-query scenario
**Shorts:** "Rows examined vs rows returned" · "Why indexes slow down writes"
**Next:** "Reads are fast now. But two users click 'Buy' on the last seat at the same instant." → #19

---

## 19 · Transactions and the double-booking bug
**Titles:** (S) Database Transactions and Isolation Explained · (P) Two Users, One Seat, Same Millisecond · (C) The Bug That Sells the Same Seat Twice · (I) Race Conditions in System Design Interviews · (S) ACID, Isolation Levels and Lost Updates
**Thumbnails:** `SOLD TWICE` · `1 SEAT, 2 BUYERS` · `RACE!`
**Hooks**
1. "Two people click 'Buy' on seat C7 within the same millisecond. Both are told 'you got it'. Both pay. This is one of the most common bugs in booking systems."
2. "Your code checks if the seat is free, then marks it sold. Two lines. Between them hides a race condition."
3. "ACID sounds like theory, until two transactions read the same row at the same time."
**Diagrams:** read-then-write timeline (both succeed) → conditional update timeline (one wins) → row lock alternative → unique constraint
**Viewer questions:** "What does the second UPDATE return?" · "Which isolation anomaly is this?"
**Interviewer mode:** "How do you guarantee no double booking with 150K attempts per second?"
**Why not:** "Why not a distributed lock?" A conditional update in the database is simpler and atomic.
**Lab:** `#s03-m4` two buyers, one seat (race lab)
**Shorts:** "The seat race in 50 seconds" · "Conditional update: the one-line fix"
**Next:** "Users now upload 20 MB photos with their orders. Where do those bytes go? Not in this database." → #20

---

## 20 · Object storage
**Titles:** (S) Object Storage Explained (S3-Style) \| System Design · (P) Our Database Is 40 TB. Mostly Images. · (I) Where Do Files Go in a System Design? · (C) Why Your Servers Should Never Touch Upload Bytes · (S) Signed URLs and Direct Uploads
**Thumbnails:** `40 TB OF IMAGES` · `NOT IN THE DB` · `SIGNED URL`
**Hooks**
1. "Your database backups take 19 hours, because 95% of it is user photos."
2. "The best upload path is the one where your servers never see the bytes."
3. "Large files have three homes in a system design: object storage, a CDN, and a row of metadata. Here's how they work together."
**Diagrams:** blobs in DB (red) → metadata row + object storage → signed URL direct upload → upload-complete event → CDN in front
**Viewer questions:** "What goes in the database row?" · "Why a short-lived URL?"
**Interviewer mode:** "Why not store images in a BLOB column?"
**Lab:** `#s03-m5` upload flow diagram
**Shorts:** "Signed URLs in 40 seconds" · "Metadata vs bytes"
**Next:** "Our data now lives in two regions, for speed and safety. Then the link between them breaks." → #21

---

## 21 · CAP theorem without confusion
**Titles:** (S) CAP Theorem Explained Without Confusion · (P) The Network Between Your Data Centres Just Failed · (C) CAP Is Not "Pick 2 of 3" · (I) How to Use CAP in a System Design Interview · (S) CAP vs PACELC with Real Examples
**Thumbnails:** `PICK 2? NO.` · `PARTITION` · `REFUSE OR ANSWER?`
**Hooks**
1. "Delhi and Singapore each hold a copy of your data. The link between them goes down. A user in Singapore asks for their balance. Do you answer with what you have, or refuse?"
2. "'Choose two of consistency, availability and partition tolerance' is the most misquoted idea in system design."
3. "CAP only matters when the network breaks. Here's what you actually decide when it does."
**Diagrams:** two regions in sync → partition → CP branch (refuse) → AP branch (stale answer) → feature-by-feature choices → PACELC: latency even without a partition
**Viewer questions:** "Bank balance during a partition: refuse or answer?" · "Like counter?"
**Interviewer mode:** "Shopping cart during a partition: CP or AP?"
**Why not:** "Why not strong consistency everywhere?" Latency and availability cost.
**Lab:** `#s06-m2` partition diagram + CP/AP exercise
**Shorts:** "CAP in 50 seconds, correctly" · "Why carts choose availability"
**Next:** "Choosing availability means stale reads. How stale, and who sees them?" → #22

---

## 22 · Eventual consistency and read-your-writes
**Titles:** (S) Eventual vs Strong Consistency Explained · (P) "My Edit Disappeared After I Refreshed" · (C) Write in Delhi, Read in Singapore. What Do You Get? · (I) Read-After-Write Consistency in Interviews · (S) Consistency Models for System Design
**Thumbnails:** `X = 5 OR 10?` · `EDIT VANISHED` · `200ms LAG`
**Hooks**
1. "A user in Delhi sets X to 10. Two hundred milliseconds later, someone in Singapore reads X. What value do they get? The answer is: it depends, and that's the whole lesson."
2. "Users report their profile edits 'disappearing' after a refresh. There's no bug in your code."
3. "Strong, eventual, read-your-writes. Three consistency models, one timeline, three different answers."
**Diagrams:** two-lane timeline: write, replication arrow, read → eventual (stale) → strong (write waits) → read-your-writes (same user vs other user)
**Viewer questions:** "Read at 100 ms, delay 200 ms: which value?" · "What does strong consistency cost the writer?"
**Interviewer mode:** "Users in two regions edit profiles; some changes 'disappear'. Explain and fix."
**Lab:** `#s06-m3` Delhi/Singapore lab (predict, then try all three models)
**Shorts:** "Replication lag in one timeline" · "Read-your-writes: the cheap middle ground"
**Next:** "Stale reads are annoying. Retried writes can be expensive: they can charge a customer twice." → #23

---

## 23 · Idempotency
**Titles:** (S) Idempotency Explained \| Idempotency Keys · (P) The Payment Timed Out. Did It Go Through? · (C) How Retries Charge Customers Twice · (I) Idempotency: A Must-Know Interview Concept · (S) Making APIs Safe to Retry
**Thumbnails:** `CHARGED TWICE` · `TIMEOUT = ?` · `SAME KEY`
**Hooks**
1. "Your service calls the payment provider. Ten seconds later: timeout. Did the charge happen? You don't know. If you retry, you might charge twice. If you don't, you might ship for free."
2. "A timeout doesn't mean failure. It means 'unknown'. That one idea prevents a whole class of production bugs."
3. "GET, PUT and DELETE are safe to repeat. POST isn't. Here's how to make it safe."
**Diagrams:** request → lost response → retry → double charge → idempotency key store → retry returns the stored result → in-progress lock
**Viewer questions:** "Which HTTP methods are naturally idempotent?" · "What should happen on the retry?"
**Interviewer mode:** "The payment call timed out. What do you do?"
**Lab:** `#s02-m4` double-charge exercise · `#s06-m5` idempotency diagram
**Shorts:** "Timeout means unknown" · "Idempotency key in 45 seconds"
**Next:** "Retries can also multiply load until the system can't recover. Can retries crash a system?" → #24

---

## 24 · Retries, timeouts and circuit breakers
**Titles:** (S) Circuit Breaker, Retries and Timeouts Explained · (P) The Database Recovered. The Site Stayed Down for 20 Minutes. · (C) Why Retries Can Crash Your System · (I) Resilience Patterns Interviewers Ask About · (S) Exponential Backoff and Jitter
**Thumbnails:** `RETRY STORM` · `10s BLIP → 20 MIN` · `OPEN / CLOSED`
**Hooks**
1. "At 14:02 the database had a 10-second hiccup. It recovered at 14:02:10. The site stayed down for twenty minutes. The cause wasn't the database. It was the retries."
2. "A dependency slows to two seconds, and without a timeout your healthy service dies too."
3. "Retries make systems more reliable, until they make them less reliable."
**Diagrams:** slow dependency → threads pile up → timeouts → retries ×3 per layer = 4× load → backoff + jitter → circuit breaker states → fallback
**Viewer questions:** "Three layers each retry 3 times. How many calls hit the database?" · "Breaker open: what does the user see?"
**Interviewer mode:** "The DB recovered, but the site stayed down. Why?"
**Why not:** "Why not longer timeouts?" They hold more threads and connections.
**Lab:** `#s08-m4` chaos lab (Slow DB, Drop 20%, toggle resilience) + retry-storm scenario
**Shorts:** "Why retries can crash a system" · "Circuit breaker in 50 seconds" · "Always set a timeout"
**Next:** "And when the database doesn't come back at all? Let's look at what really happens during a failover." → #25

---

## 25 · Failover and leader election
**Titles:** (S) Database Failover and Leader Election Explained · (P) Two Servers Both Think They're the Primary · (C) What Really Happens When Your Primary Dies · (I) Failover Questions Interviewers Ask · (S) Split Brain, Fencing and Health Checks
**Thumbnails:** `2 PRIMARIES?` · `SPLIT BRAIN` · `DEAD OR SLOW?`
**Hooks**
1. "Your primary database stops answering heartbeats. Is it dead, or just slow? Guess wrong one way and you're down; guess wrong the other way and you have two primaries."
2. "Failover takes seconds on a slide. In production, the hard part is deciding *when*."
3. "Writes that were acknowledged can vanish during a failover. Here's how, and how to prevent it."
**Diagrams:** heartbeats → missed heartbeats → election → promotion → lost writes → old primary returns → fencing token
**Viewer questions:** "How long should we wait before failing over?" · "Which replica should win?"
**Interviewer mode:** "Two nodes both think they're primary. Now what?"
**Lab:** `#s05-m2` failover diagram + replication lab · `#s06-m5` fencing-token diagram
**Shorts:** "Split brain in 45 seconds" · "Fencing tokens explained"
**Next:** "You now know every building block. Let's design something real, from the first question." → #26

---

## 26 · Design a URL shortener, part 1
**Titles:** (S) Design a URL Shortener \| System Design Interview · (P) 100 Million Redirects a Day. Where Do You Start? · (I) URL Shortener: The Answer Interviewers Expect · (C) What If Two Users Get the Same Short URL? · (S) TinyURL System Design, Step by Step
**Thumbnails:** `bit.ly IN 14 MIN` · `SAME CODE TWICE?` · `100M / DAY`
**Hooks**
1. "Design a URL shortener. It sounds like a weekend project. Then the interviewer asks: what if two users generate the same short code?"
2. "A hundred million redirects a day is 1,160 per second. Keep that number in mind. It decides almost everything."
3. "Last time we learned every building block. Now let's use the 5-step loop on the most common interview question there is."
**Diagrams:** requirements board → estimate → APIs → data (code → URL) → code-generation options → basic architecture → trace a redirect
**Viewer questions:** "301 or 302?" · "Hash, counter or random pool?"
**Interviewer mode:** "What if two users generate the same short URL?"
**Why not:** "Why not Cassandra and Kafka from the start?"
**Lab:** `#s09-m2` guided stepper + capacity lab
**Shorts:** "301 vs 302" · "3 ways to generate short codes"
**Next:** "This works at 100 requests per second. Next time we push it to a million, live in the lab, and watch every building block do its job." → #27

---

## 27 · Design a URL shortener, part 2: scaling to 1M req/s
**Titles:** (S) Scaling a URL Shortener to 1 Million Requests per Second · (P) 100 → 1,000,000 Requests per Second, Live · (C) We Broke Our URL Shortener Five Times · (I) Scaling Follow-Ups in the URL Shortener Interview · (S) URL Shortener Scaling: Cache, Queue, CDN, Shards
**Thumbnails:** `100 → 1M` · `BROKE IT 5×` · `CLICKS = QUEUE`
**Hooks**
1. "Same URL shortener, same code. We're going to push it from 100 requests a second to a million, live, and fix whatever breaks."
2. "Counting clicks sounds like a small feature. At ten thousand redirects a second, it's the thing that kills the database."
3. "At a million requests per second the architecture looks impressive. The point is that we didn't build any of it until a number told us to."
**Diagrams:** mostly a **live screen recording** of `#s09-m2` scaling lab: each traffic step, diagnose, change one thing; then the reference architecture
**Viewer questions:** at each step, "Where is the bottleneck?" (API, then DB, then workers/queue, then shards, then Redis)
**Interviewer mode:** "Why does 'count clicks' need a queue?" · "A link goes viral. Does sharding help?"
**Lab:** `#s09-m2` scaling lab (viewers repeat it themselves) + Pastebin builder `#s09-m5`
**Shorts:** "Why click counting needs a queue" · "Sharding doesn't fix a viral link" · "The cost of a million req/s"
**Next:** "Our shortener needs protection from abusers. With one server, that's a counter. With fifty servers, it's a design problem." → #28

---

## 28 · Design a rate limiter
**Titles:** (S) Design a Rate Limiter \| System Design Interview · (P) 50 Servers, One Limit: 100 Requests per Minute · (I) Distributed Rate Limiter: Interview Walkthrough · (C) Your Rate Limiter's Redis Just Died · (S) Rate Limiter Design with Redis and Token Buckets
**Thumbnails:** `50 SERVERS, 1 LIMIT` · `FAIL OPEN?` · `429`
**Hooks**
1. "The limit is 100 requests per minute per API key. You have fifty gateway servers. Each one only sees its own traffic. How does any of them know when to say no?"
2. "A rate limiter is easy on one machine. Distributed, it becomes a consistency problem."
3. "Redis holds your rate-limit counters, and Redis just went down. Do you let everyone through, or block everyone?"
**Diagrams:** 50 gateways, local counters (wrong) → central Redis counters → atomic Lua script → headers + 429 → fail open vs closed → hot keys → multi-region
**Viewer questions:** "Why are local counters wrong?" · "Fail open or closed for login? For search?"
**Interviewer mode:** "Redis goes down: fail open or closed?"
**Lab:** `#s08-m3` four-algorithm lab + `#s08-m6` checkpoint · `#s19-m4` LLD rate limiter
**Shorts:** "Fail open vs fail closed" · "Why rate-limit updates must be atomic"
**Next:** "Now send an SMS to 10 million users without delaying a single login code." → #29

---

## 29 · Design a notification service
**Titles:** (S) Design a Notification System \| System Design Interview · (P) A 10M-User Blast Is Delaying Login Codes · (I) Notification Service: Interview Walkthrough · (C) Your SMS Provider Just Went Down · (S) Email, SMS and Push at Scale
**Thumbnails:** `OTP LATE!` · `10M SMS` · `PROVIDER DOWN`
**Hooks**
1. "Marketing sends a campaign to ten million users. At the same moment, people trying to log in stop receiving their one-time codes. Same system, one queue."
2. "Every product needs notifications. Very few teams design them to survive a provider outage."
3. "A user gets the same SMS twice. Was it a bug, or the system working as designed?"
**Diagrams:** API → one queue (OTP stuck behind the blast) → priority queues per channel → workers + provider limits → retries + DLQ → provider failover → status via webhooks
**Viewer questions:** "Why are OTPs late?" · "How many workers to send 10M in 30 minutes?"
**Interviewer mode:** "OTPs arrive late during a marketing blast. Why, and how do you fix it?"
**Lab:** `#case-notify-m3` blast queue lab + HLD → LLD map · `#s07-m5` guided problem
**Shorts:** "Priority queues save login codes" · "Why at-least-once means duplicates"
**Next:** "Notifications go one way. What if the user replies instantly, and expects their friend to see it within a second?" → #30

---

## 30 · Design WhatsApp, part 1: real-time delivery
**Titles:** (S) Design WhatsApp \| System Design Interview · (P) How Does a Message Reach a Phone That's Offline? · (I) Chat System Design: Interview Walkthrough · (C) One Tick, Two Ticks: What Happens in Between · (S) WebSockets and Message Delivery at Scale
**Thumbnails:** `✓ → ✓✓` · `PHONE OFFLINE` · `50M ONLINE`
**Hooks**
1. "You send a message and see one grey tick. A second later, two ticks. In that second, your message found the exact server holding your friend's connection, out of thousands."
2. "Polling every second would cost millions of wasted requests. Real-time chat needs a different kind of connection."
3. "Your friend's phone is off. You hit send anyway. Where does that message wait, and how does it find them later?"
**Diagrams:** polling vs WebSocket → connection gateways → session map lookup → store then ack (one tick) → deliver (two ticks) → offline: push + sync on reconnect → reconnect storm
**Viewer questions:** "When should the sender see one tick?" · "What happens when a gateway restarts?"
**Interviewer mode:** "How does a message reach an offline phone?"
**Lab:** `#s10-m3` delivery trace + reconnect prediction + WhatsApp builder `#s10-m4`
**Shorts:** "What one tick actually means" · "Reconnect storms" · "Why chat doesn't poll"
**Next:** "Groups of 256 people, messages out of order, and read receipts. Part 2." → #63
