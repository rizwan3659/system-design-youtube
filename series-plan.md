# Series plan (superseded)

The original 28-episode plan has been replaced by the problem-first roadmap:

- **[`roadmap.md`](roadmap.md)**: first 10, 30 and 100 videos, with course lessons and labs
- **[`channel-strategy.md`](channel-strategy.md)**: method, playlists and publishing sequence
- **[`video-briefs.md`](video-briefs.md)**: titles, hooks, thumbnails and Shorts for videos 1–30

What changed: one session is no longer one episode; big topics are split into 10–15 minute videos; every video now opens with a problem, not a topic. The old EP01 (`ep01-framework/`) is now Video 2, and the new Video 1 is `ep01-why-systems-evolve/`.

## Making each new episode

1. Copy `ep01-why-systems-evolve/` to a new folder named after the roadmap number, for example `ep03-requirements/`.
2. Edit `slides.html`: keep the styles and script, replace the `<section>` slides. Put the voiceover in each slide's `<aside class="notes">`, with `[→]` where a build appears.
3. Run `node tools/build-script.js ep03-requirements` to get `script.md` and `chapters.txt`.
4. Edit the text in `thumbnail.html` and render it (see the README).
5. Copy `youtube-upload.md` and update it.

Ask Claude to draft steps 2–5 from the video's brief in `video-briefs.md` and its course lesson in `roadmap.md`.
