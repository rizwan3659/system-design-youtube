# Script · ep03-requirements

Estimated length: **14:18** (1963 words at 145 wpm). Generated from `slides.html`; edit the notes there and re-run `node tools/build-script.js ep03-requirements`.

**→** means press the right arrow (or clicker) to reveal the next build.

## Hook

### 0:00 · Slide 1: Two engineers. Two very different designs. _(4 builds)_

Two engineers get the same prompt: design a photo-sharing app. **→** The first one draws three boxes. Users, one server, one database. **→** The second one draws nine. Load balancer, API servers, a cache, a replica, a queue, an email worker, object storage, a CDN. **→** Here's the thing: both designs are correct. **→** The difference isn't skill. It's five sentences the interviewer said, or didn't say. By the end of this video, you'll be able to hear a requirement and know which box it adds.

### 0:35 · Slide 2: Requirements decide the architecture _(1 build)_

This video is about requirements: the first step of every system design interview, and the step most people rush. **→** We'll split requirements into two kinds, watch five sentences turn a three-box design into a nine-box one, and then look at the one question that most candidates forget to ask, even though it changes how they should design everything else.

## Two kinds of requirements

### 1:02 · Slide 3: What it does vs how well it does it _(3 builds)_

Requirements come in two kinds. **→** Functional requirements say what the system does. Users can post a photo. Users can follow someone. Users see a feed. These turn into your API. **→** Non-functional requirements say how well it must do it. How many users, how fast, how often it can be down, whether data can ever be lost, how fresh the data must be. **→** And here's the rule that makes this useful: functional requirements give you endpoints. Non-functional requirements give you boxes. Almost every component in a design exists because of a non-functional requirement.

### 1:42 · Slide 4: Functional or non-functional? _(5 builds)_

Quick check. Four sentences. Functional or non-functional? **→** Pause and sort them. **→** One: users can follow other users. Functional. It's an action, so it becomes an endpoint. **→** Two: the feed loads in under three hundred milliseconds. Non-functional. That's latency, and it will push us toward caching. **→** Three: a photo is never lost. Non-functional. That's durability. **→** And four, the tricky one: riders see the driver move on a map. That's a feature, so functional. But it hides a non-functional requirement: the location has to update every few seconds. Good candidates pull those hidden requirements out loud.

## Start simple

### 2:23 · Slide 5: They give you the API, not the architecture _(4 builds)_

Let's start with only the functional requirements. They give us three endpoints. **→** Post a photo. **→** Follow someone. **→** Get the feed, one page at a time. **→** Now notice what's missing. Nothing here tells you how many servers you need, whether you need a cache, or what happens if a machine dies. With only functional requirements, the honest design is the simplest one.

### 2:50 · Slide 6: Users → one server → one database _(2 builds)_

So here's design A. Users, one app server, one database. **→** For a few thousand users, this is completely fine. **→** It's cheap, it's simple, and it's easy to debug. Now let's add the interviewer's five sentences, one at a time, and watch what each one forces us to add.

## #1: 10 million users

### 3:12 · Slide 7: "10 million daily users." _(5 builds)_

Sentence one: ten million daily users. Big isn't a number, so let's make it one. **→** If each user makes about twenty requests a day, that's two hundred million requests a day. **→** Divide by the seconds in a day, about eighty-six thousand, and you get roughly two thousand three hundred requests per second on average. **→** Traffic isn't flat, so plan for a peak around three times that: about seven thousand a second. **→** A typical app server handles a couple of thousand simple requests a second. **→** So can one server handle this? Not even close.

### 3:52 · Slide 8: Scale → spread the traffic _(4 builds)_

So requirement one adds a load balancer **→** and several stateless API servers behind it. **→** Five servers, each handling around fourteen hundred requests a second at peak, with room to spare. **→** Why? Because one server can't keep up. **→** The cost: any request can land on any server, so no server can keep user state in memory. Why not just buy one huge server? You could, for a while. But it has a ceiling, and it's still a single machine that can die.

## #2: fast reads

### 4:28 · Slide 9: "The feed loads in under 300 ms. Reads are 100× writes." _(2 builds)_

Sentence two: the feed must load in under three hundred milliseconds, and people read a hundred times more than they post. **→** Every feed request means several database queries. At seven thousand requests a second, that's tens of thousands of queries a second on one database. **→** But most of those reads ask for the same popular posts, over and over. When the same data is read again and again, that's a requirement asking for a cache.

### 5:01 · Slide 10: Read-heavy + fast → serve from memory _(5 builds)_

Requirement two adds a cache. **→** The feed service checks the cache first. **→** If the feed is there, it comes back in about a millisecond. **→** Only on a miss do we go to the database. **→** Because most reads are for the same popular content, most requests never touch the database, and the three-hundred-millisecond target is easy. **→** The cost: cached data can be slightly old. A new post might take a few seconds to show up in other people's feeds. And whether that's acceptable is, again, a requirement.

### 5:39 · Slide 11:  _(2 builds)_

Interviewer mode. The interviewer pushes back: actually, a new post must appear in everyone's feed instantly. **→** What changes? **→** That's a consistency requirement, and it makes caching much harder: every post would invalidate thousands of cached feeds. So first, ask: instant for everyone, or just for the person who posted? Usually it's the author who must see it immediately. That's cheap: show the author their own post from the database, and let everyone else get it a few seconds later. One question just saved you an expensive design.

## #3: never lose data

### 6:17 · Slide 12: "A photo is never lost." _(4 builds)_

Sentence three: a photo is never lost once the upload succeeds. **→** Right now, our database is the only copy. One disk failure, one bad command, and data is gone. **→** So durability adds a replica: a second database on another machine that copies every write, plus regular backups. **→** Durability always means copies, on different machines, ideally in different places. **→** The cost: a second machine, and the replica runs slightly behind the primary. Notice that this requirement has nothing to do with scale. Even an app with a hundred users needs this if the data must never be lost.

## #4: a 'simple' feature

### 6:59 · Slide 13: "Send a welcome email when someone signs up." _(2 builds)_

Sentence four sounds like a tiny feature: send a welcome email when someone signs up. **→** Where should that email be sent from? **→** The obvious answer is inside the sign-up request. But email providers are slow and sometimes down. If the provider takes ten seconds, your sign-up takes ten seconds. If the provider is down, nobody can sign up, for a feature they don't even need right now. A functional requirement just created a non-functional problem.

### 7:32 · Slide 14: Work the user doesn't wait for → do it later _(4 builds)_

So requirement four adds a queue. **→** Sign-up saves the user and drops a small "send welcome email" job on the queue. **→** An email worker picks it up and sends it, retrying if the provider fails. **→** Sign-up now returns immediately, whether the provider is fast, slow or down. **→** The cost: the email arrives a few seconds later, and the worker needs monitoring. The rule: if the user doesn't need to wait for it, it probably doesn't belong in the request.

## #5: photos worldwide

### 8:06 · Slide 15: "Photos and videos. Users worldwide." _(4 builds)_

Sentence five: users upload photos and videos, and they're all over the world. **→** Photos and videos are big, so they go to object storage: cheap, huge, and it keeps several copies of every file. The database keeps only the metadata: who uploaded what, and where. **→** And because viewers are worldwide, a CDN serves those files from servers near each viewer, pulling from object storage only once. **→** So the bytes never touch our database, and far-away viewers don't wait on a round trip across the world. **→** The cost: CDN bandwidth bills, and when a file changes, purging old copies from the edge.

## Recap: sentences → boxes

### 8:50 · Slide 16: Every box points back to a requirement _(5 builds)_

Let's line it up. Five sentences, and every new box points back to one of them. **→** Ten million daily users: scale, so a load balancer and more servers. **→** A fast, read-heavy feed: latency, so a cache. **→** Photos are never lost: durability, so a replica and backups. **→** A welcome email: it looked functional, but it hid an availability problem, so a queue and a worker. **→** Photos and videos worldwide: size and distance, so object storage and a CDN. That's how design B got nine boxes, and why design A, with none of these sentences, was also right.

## The never-happen rule

### 9:32 · Slide 17:  _(5 builds)_

Now the question most candidates forget: what must never go wrong? Every system has one failure the business simply cannot accept. I call it the never-happen rule. **→** Pause, and name it for each of these four. **→** Bank transfers: money is created or lost. A debit without its matching credit. **→** Concert tickets: the same seat sold to two people. **→** A chat app: a message the sender saw as sent is lost. **→** A URL shortener: a short link sends someone to the wrong place.

### 10:08 · Slide 18: Strict where it matters. Relaxed everywhere else. _(3 builds)_

Why does this matter so much? **→** Because it tells you which small part of the system needs the expensive guarantees: transactions, conditional updates, idempotency keys, always reading from the source of truth. **→** And it tells you that everything else can be cheap and fast: cached, a few seconds stale, eventually consistent. For tickets, the seat map can be a little stale. The purchase itself never can. **→** Skip this question, and you either make everything strict and slow, or everything fast and miss the one bug that matters.

## Ask or skip?

### 10:46 · Slide 19: "Design a chat app." Ask it, or skip it? _(5 builds)_

One more quick check. The prompt is: design a chat app. Would a strong candidate ask these questions in the first five minutes? **→** Pause and decide. **→** One-to-one, groups, or both? Ask. Groups change how messages fan out and are stored. **→** Kafka or RabbitMQ? Skip. That's a tool before the problem: it sounds smart, and it's a red flag. **→** How many daily users, and how many messages each? Ask. It decides whether you need one server or hundreds. **→** Can I build it as microservices? Skip. That's an architecture decision, not a requirement. Decide it later, for a reason.

### 11:28 · Slide 20: Seven questions for any prompt

Seven questions for any prompt; take a screenshot. Users. Core actions, and what's out of scope. Scale, including the read-to-write ratio. Quality: fast, always up, or always correct, and which one wins. The never-happen rule. Data lifetime. And constraints, like regions or existing systems. In a real interview, spend five to eight minutes here, then write the agreed scope on the board before you draw anything.

## Try it in the lab

### 11:57 · Slide 21: Switch on a requirement, watch the box appear

Let me show you this in the lab. [CUT TO SCREEN RECORDING: follow production.md "Live demo", about 45 seconds.] This is the requirements lab from the free course. It starts with one server and one database. First, let me break it: the email provider takes ten seconds, and every sign-up waits. Now switch on "send a welcome email": a queue and a worker appear, and the same failure is handled. Switch on "never lose data" and kill the database: the replica takes over. Each requirement adds exactly one part, and each part handles exactly one failure. Try it yourself; the link is in the description.

## Your turn

### 12:43 · Slide 22:  _(3 builds)_

Your turn. Halfway through, the interviewer says: actually, it's two thousand users, not ten million. What do you remove, and what do you keep? **→** Pause and answer, or put it in the comments. **→** Remove what was there for scale: most of the servers, though two is still sensible for availability, the cache, and probably the CDN. **→** But keep the replica and backups, because "never lose a photo" didn't change. Keep the email queue, because a slow provider still shouldn't block sign-up. And keep object storage, because photos are still big. Scale requirements come and go. Durability and availability stay, even for a tiny app. Saying that out loud is exactly what interviewers want to hear.

## What's next

### 13:32 · Slide 23: "10 million users ≈ 2,300 requests a second." Where did that number come from? _(2 builds)_

One sentence in this video did a lot of work: ten million users is about two thousand three hundred requests a second, so one server isn't enough. **→** In the next video, we'll make that a skill: estimating requests per second, storage and bandwidth in about two minutes, and turning each number into a design decision. **→** If you want to try today's requirements lab, it's in the free interactive course, linked in the description. This is a complete system design series, and each video builds on the last, so if you want to follow it in order, subscribe, and I'll see you in the next one.
