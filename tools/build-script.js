// Builds script.md and chapters.txt for an episode from its slides.html.
// Usage: node tools/build-script.js ep01-framework
// Timing model (same as the presenter window): 145 words per minute + 2 s per slide.
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', process.argv[2] || '');
const html = fs.readFileSync(path.join(dir, 'slides.html'), 'utf8');
const WPM = 145;

const strip = s => s.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const mmss = x => Math.floor(x / 60) + ':' + String(Math.floor(x % 60)).padStart(2, '0');

const sections = [...html.matchAll(/<section class="slide"([^>]*)>([\s\S]*?)<\/section>/g)];
let t = 0, chapter = '';
const slides = sections.map((m, i) => {
  const attrs = m[1], body = m[2];
  const ch = (attrs.match(/data-chapter="([^"]+)"/) || [])[1];
  const newChapter = ch && ch !== chapter;
  if (ch) chapter = ch;
  const title = strip((body.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/) || body.match(/class="q">([\s\S]*?)</) || ['', ''])[1]);
  const notes = strip((body.match(/<aside class="notes">([\s\S]*?)<\/aside>/) || ['', ''])[1]);
  const builds = Math.max(0, ...[...body.matchAll(/data-step="(\d+)"/g)].map(x => +x[1]));
  const words = notes.replace(/\[→\]/g, '').split(/\s+/).filter(Boolean).length;
  const s = { n: i + 1, start: t, chapter, newChapter, title, notes, builds, words };
  t += words / WPM * 60 + 2;
  return s;
});

const total = t;
let md = `# Script · ${path.basename(dir)}\n\n`;
md += `Estimated length: **${mmss(total)}** (${slides.reduce((a, s) => a + s.words, 0)} words at ${WPM} wpm). `;
md += `Generated from \`slides.html\`; edit the notes there and re-run \`node tools/build-script.js ${path.basename(dir)}\`.\n\n`;
md += `**→** means press the right arrow (or clicker) to reveal the next build.\n`;
for (const s of slides) {
  if (s.newChapter) md += `\n## ${s.chapter}\n`;
  md += `\n### ${mmss(s.start)} · Slide ${s.n}: ${s.title}${s.builds ? ` _(${s.builds} build${s.builds > 1 ? 's' : ''})_` : ''}\n\n`;
  md += s.notes.replace(/\s*\[→\]\s*/g, ' **→** ') + '\n';
}
fs.writeFileSync(path.join(dir, 'script.md'), md);

const chapters = slides.filter(s => s.newChapter).map(s => `${mmss(s.start)} ${s.chapter}`);
chapters[0] = chapters[0].replace(/^\S+/, '0:00');
fs.writeFileSync(path.join(dir, 'chapters.txt'), chapters.join('\n') + '\n');
console.log(`script.md: ${slides.length} slides, ~${mmss(total)}\nchapters:\n${chapters.join('\n')}`);
