# System design YouTube channel

> **Don't memorise system design diagrams. Learn how to build them.**

Everything needed to plan, record and publish the series. Read in this order:

| File | What it is |
|---|---|
| [`channel-strategy.md`](channel-strategy.md) | Positioning, the signature method, recurring segments, playlists, how videos link to the course labs, publishing sequence |
| [`roadmap.md`](roadmap.md) | First 10, first 30 (with lesson, lab, interview question, next-video link) and first 100 videos |
| [`video-briefs.md`](video-briefs.md) | Videos 1–30: 5 titles, thumbnails, 3 hooks, diagrams, viewer and interview questions, labs, Shorts |
| [`ep01-why-systems-evolve/`](ep01-why-systems-evolve/) | **Video 1, ready to record**: slides, script, demo steps, 3 thumbnails, upload kit, Shorts (`production.md`) |
| [`ep01-framework/`](ep01-framework/) | **Video 2** ("How to approach any system design interview"), ready to record; it has the new problem-first hook |
| [`ep03-requirements/`](ep03-requirements/) | **Video 3, ready to record**: functional vs non-functional requirements and the never-happen rule |
| `tools/build-script.js` | Regenerates `script.md` and `chapters.txt` from a deck's slide notes |

Publish Videos 1 and 2 on the same day, then one long video a week (see `channel-strategy.md` §6).

## Recording a video (about 1 hour for a 13-minute video)

**What you need:** a USB or lapel mic (your phone's earphone mic works too), [OBS Studio](https://obsproject.com) (free), and a quiet room. Optional: a webcam.

### 1. Set up the slides

1. Open the episode's `slides.html` in Chrome (e.g. `ep01-why-systems-evolve/slides.html`).
2. Press **F** for full screen, then **H** to hide the progress bar.
3. Press **P** to open the presenter window. Move it to your second screen, or put it beside OBS. It shows what to say now in bright text, a blue **→** where you press the arrow key, a timer, and the target time.

| Key | Action |
|---|---|
| → / Space / clicker | Next build or slide |
| ← | Back |
| P | Presenter notes window |
| H | Hide/show the progress bar |
| B | Black screen (pause) |
| R | Restart the timer |
| F | Full screen |

### 2. Set up OBS

- **Settings → Video:** base and output 1920×1080, 30 fps.
- **Settings → Output:** recording format **MKV** (safe if OBS crashes; use File → Remux to MP4 afterwards), quality "High".
- **Settings → Audio:** pick your mic. In the mixer, add the **Noise Suppression** filter (RNNoise) and a **Compressor**.
- **Sources:** *Window Capture* of the Chrome slides window. Optional: *Video Capture Device* for your webcam, as a small circle in a bottom corner. Keep the bottom-right clear; the slides' footer sits there.

### 3. Record

- Do a 20-second test: speak, play it back, and check the volume peaks around -12 dB in the OBS mixer.
- Record **one chapter at a time** (the `##` headings in `script.md`). If you stumble, pause, then repeat the sentence; you'll cut the mistake in editing.
- Read from the presenter window, but say it in your own words when that feels more natural. The script is a safety net, not a rule.

### 4. Edit

Use Clipchamp (built into Windows), DaVinci Resolve (free) or CapCut.
- Cut mistakes and long pauses.
- Add the chapter times you see in your edit to the description (`youtube-upload.md`).
- Export at 1080p, 30 fps.

### 5. Upload

Follow the episode's `youtube-upload.md`. Cut 2–4 Shorts from the edit (listed in each episode's production notes).

## Re-rendering thumbnails or checking slides

```bash
node tools/build-script.js ep01-why-systems-evolve
```

**Course demos:** record the course in its own OBS take at 1920×1080 with the course's **Projector text** button on, following the episode's demo steps (Video 1: `production.md` → "Live demo").

To preview any slide fully built, open `slides.html?final#12` (slide 12). Thumbnails are rendered from `thumbnail.html?v=a` / `?v=b` / `?v=c` with Chrome's headless screenshot mode at a 1400×900 window, then cropped to 1280×720 (headless Chrome's viewport is smaller than its window).
