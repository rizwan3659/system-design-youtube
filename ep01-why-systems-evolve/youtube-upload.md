# Video 1 upload kit: What is system design? One app, 100 → 1,000,000 users

## Title

**What Is System Design? One App, 100 → 1,000,000 Users**

Alternatives for Test & Compare after about 14 days: "We Scaled One Server to a Million Users. It Broke 5 Times." · "Why Every Box in a System Design Diagram Exists"

## Thumbnail

Upload `thumbnail-a.png` ("1 → 1M USERS"). Test it against `thumbnail-c.png` ("IT BROKE 5×") with title 2, or against `thumbnail-b.png` ("WHY THIS BOX?") with title 3.

## Description

Replace the chapter times with the real ones after editing.

```
One server, one database, 100 users. We grow it to a million, and it breaks five times. Each time we find the bottleneck, fix it, and say what the fix costs. By the end you'll know why every box in a system design diagram exists: load balancer, cache, read replicas, queue and shards.

Don't memorise system design diagrams. Learn how to build them.

▶ Try it yourself (free interactive lab, same system as the video):
https://rizwan3659.github.io/system-design-interview-course/#s04-m5
Challenge: reach 10,000 req/s healthy with as few components as possible, then press "Kill Redis".

▶ The full roadmap with predict-before-you-reveal stages:
https://rizwan3659.github.io/system-design-interview-course/#s01-m1

▶ Next: How to approach any system design interview
[link to Video 2]

Chapters
0:00 Hook: one server, 3,000 requests a second
1:12 What system design actually is
2:25 Stage 1: one server
3:05 Break #1: traffic (load balancer)
5:02 Break #2: the database (cache)
7:12 Try it in the lab
7:57 Break #3: failure (replication)
9:46 Break #4: slow work (queue)
11:12 Break #5: writes (sharding)
12:28 Recap: every box answers a problem
13:09 Your turn: interviewer mode
13:49 What's next

#systemdesign #systemdesigninterview #softwareengineering
```

## Tags

system design, what is system design, system design for beginners, system design interview, scalability, load balancer, caching, redis, database replication, read replica, message queue, database sharding, horizontal scaling, high level design, backend engineering, distributed systems

## Pinned comment

```
Interviewer mode 👇
Traffic grows 10× again. API 35%, DB 40%, queue fine, Redis at 95%.
What do you change, and what do you leave alone?

Try the same system yourself (free): https://rizwan3659.github.io/system-design-interview-course/#s04-m5
```

## Settings

- **Category:** Education · **Language:** English · **Captions:** upload `script.md` text as a transcript ("Without timing").
- **Playlists:** "System Design From Zero" (first) and "Scaling Building Blocks".
- **End screen (last 20 s, slide 22):** a video element pointing to Video 2, plus a Subscribe element. Video 2 is published the same day, so link it directly.
- **Cards:** at 7:12 ("Try it in the lab"), a link card to the course, once your channel can add external links.
- **Publish:** Video 1 and Video 2 on the same day, Video 1 first.
