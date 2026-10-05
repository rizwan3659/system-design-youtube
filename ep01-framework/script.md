# Script · ep01-framework

Estimated length: **11:01** (1501 words at 145 wpm). Generated from `slides.html`; edit the notes there and re-run `node tools/build-script.js ep01-framework`.

**→** means press the right arrow (or clicker) to reveal the next build.

## Intro

### 0:00 · Slide 1: How to answer any system design question

Last video, we watched one app grow from a hundred users to a million, and break five times on the way. In an interview, you have to do that out loud, in forty-five minutes, starting from a one-line prompt, while someone keeps changing the requirements. Most candidates lose this round in the first five minutes, before they draw a single box. So in this video: one five-step process you can use on any system design question, and then we'll run it on a URL shortener from scratch.

### 0:38 · Slide 2: Same prompt. Two candidates. _(3 builds)_

Here's why the first five minutes matter. Picture two candidates who get the same prompt: design a URL shortener. Candidate A grabs the marker and starts drawing. Load balancer, Kafka, Redis, microservices, sharding. Twelve boxes in two minutes. **→** Candidate B asks four questions first. Who uses it? How many links a day? What matters most? And what must never go wrong? **→** Candidate B gets the higher score. Not because A's boxes are wrong, but because the interviewer can't tell why any of them are there.

### 1:15 · Slide 3: Four things. Not the "right" architecture. _(5 builds)_

So what is the interviewer actually grading? Four things. **→** One: can you break a vague problem into parts. **→** Two: do you reason from requirements, using numbers, instead of just naming technologies. **→** Three: do you see trade-offs. Every choice costs something. **→** And four: can you adapt when the requirements change, because they will change. **→** Notice what's not on this list. There is no single right architecture. A complete, reasoned design beats a perfect one you never finish.

## The 5-step framework

### 1:48 · Slide 4: Five steps, in this order _(5 builds)_

Here's the framework. Five steps. **→** Step one, clarify the problem: about five to eight minutes. **→** Step two, define the interactions: what users can actually do, written as API calls. **→** Step three, identify the data: what you store, and how it's read. **→** Step four, draw a simple design: the smallest thing that works, and trace a request through it. **→** And step five, challenge and improve: break your own design, fix it, and say what each fix costs. Let's run all five on a real example.

### 2:25 · Slide 5: "Design a URL shortener." _(1 build)_

The prompt: design a URL shortener. Like bit.ly. **→** You paste a long link, you get a short one, and anyone who opens the short link gets redirected to the long one. It sounds simple, which is exactly why interviewers like it. There's a lot hiding underneath.

## Step 1: Clarify

### 2:46 · Slide 6: Ask before you draw _(5 builds)_

Step one: clarify. Don't draw anything yet. Ask. **→** Who uses this? Let's say the public, plus other apps through an API. **→** What are the must-haves? Create a short link, and redirect. Custom aliases and click counts are nice to have. **→** How much traffic? Let's assume one million new links a day, and a hundred million redirects a day. **→** What matters most? Redirects must be fast and almost always available. **→** And the most important question: what must never go wrong? A short link must never send someone to the wrong URL.

### 3:25 · Slide 7: The agreed scope _(3 builds)_

Now write the agreed scope on the board. **→** In: create, redirect, and expiry. **→** Out, for now: analytics and custom domains. **→** And write the never-happen rule where everyone can see it. This takes thirty seconds, and it anchors the rest of the interview. When you make a decision later, you point back at this board.

## Quick estimate

### 3:50 · Slide 8: Does one machine survive this? _(5 builds)_

Next, a quick estimate. Not exact math: just enough to decide whether one machine is enough. **→** A day has about eighty-six thousand seconds. A hundred million redirects a day is about eleven hundred and sixty per second, on average. **→** Plan for peak. Say three times that: about three and a half thousand per second. **→** Writes are tiny. A million a day is about twelve per second. **→** Storage: a million links a day, times three sixty-five, times five years, times about five hundred bytes, is roughly one terabyte. **→** So what did we learn? This is a read-heavy key lookup. Reads are a hundred times writes. Remember that. It decides the design.

## Step 2: Interactions

### 4:37 · Slide 9: Write the actions as API calls _(4 builds)_

Step two: interactions. Write the actions as API calls. **→** POST slash links, with the long URL and an optional alias and expiry. It returns the short code. **→** GET slash code, which redirects. **→** And DELETE, for the owner. **→** One small detail interviewers love: which redirect code? A 301 is permanent, so browsers cache it. Faster and cheaper, but you stop seeing clicks, and you can never change the target. A 302 is temporary, so every click comes back to you. Neither one is right. Pick one, and say why.

## Step 3: Data

### 5:15 · Slide 10: One table, one hot read _(3 builds)_

Step three: the data. **→** We have one main entity: a Link. The short code, the long URL, the owner, created-at and expires-at. **→** The most frequent read is: given a short code, find the long URL. That's a key lookup, so the short code is the primary key. **→** How long should the code be? Seven characters from letters and digits gives sixty-two to the power of seven: about three and a half trillion codes. Way more than we'll ever need.

### 5:50 · Slide 11: How do you generate the code? _(4 builds)_

Then there's a real decision: how do you generate the code? **→** Option one: hash the long URL and take seven characters. No coordination needed, but two URLs can collide, so you have to check and retry. **→** Option two: a single counter, encoded in base sixty-two. No collisions, but one counter is a bottleneck, and the codes are guessable. **→** Option three: hand each server a range of IDs, say a thousand at a time. No collisions, no hot spot, and if a server crashes, you only waste its range. **→** Any of these is acceptable. What scores is naming the cost of the one you pick.

## Step 4: Simple design

### 6:35 · Slide 12: The smallest thing that works

Step four: draw the simplest design that works. **→** A client. **→** A load balancer. **→** A few app servers. Stateless, so any server can handle any request. **→** And one database. **→** Now trace a request out loud. The user opens the short link, the load balancer picks a server, the server looks up the code in the database, and returns a redirect. That's it. This works on day one. Resist adding anything the requirements didn't ask for.

### 7:08 · Slide 13: Reads are 100× writes → cache

But our estimate said reads are a hundred times writes, and a few links get most of the clicks. That's a requirement asking for a cache. **→** So now, a redirect checks the cache first. **→** Only on a miss does it go to the database. Notice how I justified it. Not "add Redis because it's fast", but "reads dominate and they're skewed, so cache them". The cost? The cache can serve stale data, and it's one more thing that can fail.

## Step 5: Challenge

### 7:43 · Slide 14: Single point of failure → replica _(3 builds)_

Step five: challenge your own design. Don't wait for the interviewer to do it. First: what if the database dies? **→** Right now, everything fails, because it's a single point of failure. **→** Fix: add a read replica. If the primary dies, redirects keep working from the cache and the replica, and we promote the replica to primary. **→** The cost: creates fail for a short time during failover, and the replica can be slightly behind.

### 8:15 · Slide 15: One hot key → the cache saves you _(2 builds)_

Second: one link goes viral. Millions of hits on a single key. **→** The cache is what saves you here. The hot code is served from memory, and the database barely notices. **→** And here's a trap: some candidates say "shard the database". But sharding doesn't help a hot key, because one key lives on one shard. Matching the fix to the actual problem is exactly what interviewers look for.

### 8:45 · Slide 16: Slow side work → queue _(3 builds)_

Third, the interviewer changes the requirements: "we now want click counts". **→** If you write a row for every click inside the redirect, database writes jump from twelve a second to over a thousand, and every redirect gets slower. **→** Instead, drop a small click event on a queue and return immediately. **→** A worker counts them in batches. The cost: counts lag by a few seconds. Say that out loud, and ask if it's acceptable.

### 9:17 · Slide 17: Every box has a reason _(3 builds)_

Here's where we ended up. And notice the story. Every box on this diagram is here because a requirement or a failure asked for it. **→** The cache, because reads dominate. **→** The replica, because the database was a single point of failure. **→** The queue, because of the new analytics requirement. That story is what you're really being graded on.

## Mistakes to avoid

### 9:43 · Slide 18: Four mistakes that cost offers _(4 builds)_

Four mistakes to avoid. **→** One: drawing before asking. **→** Two: naming tools without reasons, like "we'll use Kafka". **→** Three: starting with a huge architecture instead of the simplest thing that works. **→** And four: presenting choices as if they were free. Every choice costs something. Say what.

### 10:04 · Slide 19: The framework on one screen

Here's the whole framework on one screen. Take a screenshot. Clarify: users, scale, and the never-happen rule. Interactions: write the APIs. Data: entities, the main read, and the riskiest write. Simple design: the smallest thing that works, then trace a request through it. And challenge: break it, fix it, and name the cost.

## What's next

### 10:28 · Slide 20: Free interactive course link in the description _(1 build)_

If you want to practise this, there's a free interactive course linked in the description, with labs where you can break this exact design yourself. **→** Step one was clarifying. In the next video, we go deeper: which questions to ask, and how each answer adds or removes a box from your design. This is a full system design series, so if you want to follow it in order, subscribe, and I'll see you there.
