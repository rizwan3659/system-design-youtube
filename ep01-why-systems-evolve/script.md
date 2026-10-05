# Script · ep01-why-systems-evolve

Estimated length: **14:38** (2017 words at 145 wpm). Generated from `slides.html`; edit the notes there and re-run `node tools/build-script.js ep01-why-systems-evolve`.

**→** means press the right arrow (or clicker) to reveal the next build.

## Hook

### 0:00 · Slide 1:  _(3 builds)_

This is the entire backend of a new app. One server, one database. A hundred requests a second. The server's CPU is at five percent. Everything works. **→** Then the app gets featured somewhere, and traffic grows thirty times. Three thousand requests a second. The server's CPU hits ninety-eight percent. **→** Requests that took fifty milliseconds now take three seconds. Users start leaving. **→** So what do you do? Buy a bigger server? Add more servers? Add a cache? Stay with that question for a second, because answering it well is what system design actually is.

### 0:40 · Slide 2: What is system design? _(1 build)_

In this video we'll take that one-server app and grow it from a hundred users to a million. **→** It's going to break five times. Each time, we'll find what broke, fix it, and say what the fix costs. By the end, you'll have built the architecture you see in every system design diagram online. The difference is, you'll know why every box is there, because you'll have watched each one become necessary.

## What system design is

### 1:12 · Slide 3: Not a diagram. A series of decisions. _(3 builds)_

Here's what system design really is. It's not memorising a diagram. It's a series of decisions. **→** First, requirements. What must the system do, and what must never go wrong? **→** Second, numbers. How many requests a second, how much data, how fast. Without numbers, "it needs to scale" means nothing. **→** And third, trade-offs. Every component you add fixes one problem and creates another. A good engineer can tell you both halves.

### 1:43 · Slide 4: Build it. Break it. Fix it. Explain the cost. _(9 builds)_

And this is the method we'll use in every video on this channel. **→** Start with a problem. **→** Build the simplest design that solves it. **→** Push it until something becomes the bottleneck. **→** Scale the part that's actually failing. **→** Then break it on purpose: kill a server, slow a database. **→** Improve it. **→** Say what the improvement costs. **→** And finish with the question an interviewer would ask next. **→** Every component we add has to answer four questions. What problem do we have? Why does the current design fail? What fixes it? And what new problem does the fix create? Let's start.

## Stage 1: one server

### 2:25 · Slide 5: Start with the smallest thing that works _(4 builds)_

Stage one. Users, one app server, one database. **→** A request comes in, the server runs some code, reads or writes the database, and answers. **→** At a hundred requests a second, the server is at five percent CPU and the database at three. **→** And this is the right design for day one. It's cheap, it's easy to debug, and plenty of real products never need more. In an interview, starting here is a strength, not a weakness. **→** It does have one obvious risk: everything runs on one machine. Let's see what breaks first.

## Break #1: traffic

### 3:05 · Slide 6: Traffic × 30. Where is the bottleneck? _(5 builds)_

Let's break the system. Traffic goes up thirty times. **→** Three thousand requests a second. **→** The app server is at ninety-eight percent CPU. The database is at thirty. **→** And the slowest one percent of requests take almost three seconds. **→** Pause for a second. Which component is actually overloaded? **→** The app server. The database is fine. That matters, because anything we do to the database right now would be wasted. In this series, we always find the bottleneck before we change anything.

### 3:40 · Slide 7: Bigger server, or more servers? _(2 builds)_

Two options. **→** Scale up: buy a bigger machine. No code changes, and honestly, that's a fine first move. But there's a ceiling, the price climbs fast, and it's still one machine. If it dies, you're down. **→** Scale out: run several smaller servers. You can keep adding them as traffic grows, and if one dies, the others keep going. But now there's a new question: when a request arrives, which server gets it?

### 4:12 · Slide 8: Spread the traffic. Skip dead servers. _(4 builds)_

So we add a load balancer. **→** It sits in front and spreads requests across the servers. It also health-checks them, so if one dies, it simply stops sending traffic there. **→** Three API servers instead of one. **→** CPU drops from ninety-eight percent to about thirty-five on each. Latency is back to normal. **→** But here's the cost. Each request can now land on any server, so the servers must be stateless. If you keep a user's login session in one server's memory, the next request might go somewhere else and the user is logged out. Sessions move to a shared store. And the load balancer itself must be redundant, or we've just moved our single point of failure.

## Break #2: the database

### 5:02 · Slide 9: 10,000 req/s. Add more API servers? _(5 builds)_

Traffic keeps growing. Ten thousand requests a second. **→** The API servers are fine, forty-five percent. **→** But the database is at ninety-two percent. **→** We look closer: ninety-five percent of requests are reads, and most of them read the same small set of popular items. **→** Pause. Would adding more API servers help? **→** No. More API servers would just send even more queries to the same database. The bottleneck moved, so the fix has to move with it.

### 5:35 · Slide 10: Three ways to take load off the database _(3 builds)_

We have three options. **→** A cache. The same popular items are read over and over, so keep them in memory and answer without touching the database. **→** Read replicas: copies of the database that serve reads. That would help too, but every read still runs a real query. We'll need replicas soon, for a different reason. **→** And sharding, splitting the database into pieces. Some people jump straight here. But it's complex, and it doesn't fix the actual problem, which is the same rows being read thousands of times. So: a cache.

### 6:15 · Slide 11: Check memory first. Database only on a miss. _(5 builds)_

So we add a cache, something like Redis. **→** Now every read checks the cache first. **→** If the item is there, a cache hit, we answer in about a millisecond and the database never sees it. **→** On a miss, we read the database, and store the result in the cache for next time. **→** Because a few items get most of the traffic, most reads become hits, and database CPU falls from ninety-two percent to around twenty. **→** And the cost? The cache can be out of date. If someone changes a price, the cache might show the old one for a while. And when a very popular key expires, thousands of requests can miss at the same moment and hit the database together. That's called a stampede, and it has its own video in this series.

## Try it in the lab

### 7:12 · Slide 12: Same system, live: watch the database turn red

Let me show you this live. [CUT TO SCREEN RECORDING: follow demo.md, about 45 seconds.] This is the scaling lab from the free course. Simple system, a hundred requests a second, everything green. Push traffic to five thousand. The lab makes me diagnose before I change anything: the API servers are the bottleneck. Add a load balancer and more servers. And look: the moment I fix the API tier, the database turns red. Fix one bottleneck, and the next one appears. Add the cache, and database CPU falls to under twenty percent. You can do exactly this yourself; the link is in the description.

## Break #3: failure

### 7:57 · Slide 13: The database machine dies. _(4 builds)_

Now let's break it differently. No traffic spike. The database machine just dies. Disk failure, kernel panic, someone deletes the wrong instance. It happens. **→** It's our only copy. **→** Every write fails immediately. **→** Reads that happen to be in the cache still work. Everything else fails. **→** And any data written since the last backup? Gone. The database was a single point of failure, and it was also the only copy of our data.

### 8:29 · Slide 14: Keep a live copy. Promote it on failure. _(4 builds)_

The fix is replication. **→** We keep a second database, a replica, that continuously copies every change from the primary. **→** It can serve reads too, which takes even more load off the primary. **→** And if the primary dies, we promote the replica to become the new primary. We're back in seconds to minutes instead of hours. **→** The cost: copying takes time. The replica is usually a few milliseconds behind, sometimes seconds. That has a very visible consequence. Let's see if you can spot it.

### 9:05 · Slide 15:  _(2 builds)_

Interviewer mode. Here's a question you'll actually get. A user updates their profile, refreshes the page, and sees the old profile. Nothing crashed. Why? **→** Pause the video and answer it. **→** The update went to the primary. The refresh was a read, and reads go to the replica, which hadn't received the change yet. That's replication lag. A common fix: for a few seconds after a user writes something, send that user's reads to the primary. Everyone else can read the replica. If you can explain that in an interview, you're ahead of most candidates.

## Break #4: slow work

### 9:46 · Slide 16: New feature: every upload takes 8 seconds _(5 builds)_

Next, a new requirement. Users can upload photos, and each photo has to be resized into several sizes. **→** That takes eight seconds. And it happens inside the request. **→** Look at this: CPU is only thirty-five percent, but every server thread is busy. They're not working, they're waiting. **→** So uploads start timing out. **→** Do we add more servers? **→** We could, but each new server would also spend eight seconds per upload just waiting. The user doesn't need the resized images instantly. The work is simply in the wrong place.

### 10:24 · Slide 17: Reply now. Do the slow work in the background. _(4 builds)_

So we split the work. **→** The API saves the upload, puts a small job on a queue, and replies to the user right away, in about fifty milliseconds. **→** Separate workers pull jobs from the queue and resize images at their own pace. **→** If uploads spike, jobs just wait in the queue instead of crashing the servers. And if the queue grows, we add workers. **→** The costs: the resized images appear a few seconds later. A job might fail and be retried, so processing it twice must be safe. And if the workers die, nothing errors. The queue just quietly grows. So we watch how old the oldest job is.

## Break #5: writes

### 11:12 · Slide 18: 100,000 req/s. Add more replicas? _(5 builds)_

A year later. A hundred thousand requests a second. **→** The primary database is at ninety-five percent CPU, and this time it's writes. **→** The replicas are almost idle. **→** And the data has grown to eight terabytes. **→** Would more replicas help? **→** No. Every replica has to apply every single write too. The cache doesn't help either: caches absorb reads. For the first time, one machine simply can't handle the writes.

### 11:42 · Slide 19: Split the data across several databases _(3 builds)_

Now, and only now, we shard. **→** We split the data across several databases, for example by user ID. Each user's data lives on exactly one shard. **→** With four shards, each one handles roughly a quarter of the writes. **→** And here's why we waited so long. Every query now needs to know which shard to ask. Queries across many users become expensive. Adding a fifth shard means moving data around. And one very popular user can make one shard much hotter than the others. Sharding is powerful, but it's the most expensive step on this list, so you do it when the numbers force you, not before.

## Recap

### 12:28 · Slide 20: Every box answers a problem _(5 builds)_

Here's where we ended up. It looks like the diagram you'd find in any system design article. But look at it differently now. **→** The load balancer is here because one server ran out of CPU. **→** The cache, because the same reads hit the database again and again. **→** The replica, because the database was a single point of failure. **→** The queue, because slow work was blocking requests. **→** And the shards, because writes outgrew one machine. Nothing here is decoration. If you can tell this story, you don't need to memorise the diagram. You can rebuild it.

## Your turn

### 13:09 · Slide 21: Traffic grows 10× again. What do you change? _(2 builds)_

Your turn. Interviewer mode. Traffic grows ten times again. API servers: thirty-five percent. Database shards: forty. Queue: fine. Redis: ninety-five percent. What do you change? **→** Pause and think, or write your answer in the comments. **→** The bottleneck is the cache, so that's what we scale. Add Redis nodes, and check whether one hot key is responsible, because a single key lives on a single node, and adding nodes won't spread it. What you should not do is touch the database. It's at forty percent. Measure first, then change the thing that's actually broken.

## What's next

### 13:49 · Slide 22: You've seen what breaks. Now say it in an interview. _(2 builds)_

So that's what system design is. Not a diagram, but a story of problems and the decisions that fix them. **→** In an interview, though, you have forty-five minutes, a one-line prompt, and an interviewer who changes the requirements on you. In the next video, I'll show you how to run this same process out loud, step by step, on a real interview question. **→** If you want to try today's system yourself, the scaling lab is in the free interactive course, linked in the description. This channel is a complete system design series, and every video builds on this one. If that's useful to you, subscribe, and I'll see you in the next one.
