const fs = require('fs');
const path = require('path');

(async () => {
  const root = path.resolve(__dirname, '..');
  const env = fs.readFileSync(path.join(root, '.env'), 'utf8')
    .split('\n')
    .reduce((a, l) => {
      const m = l.match(/^([^=#][^=]*)=(.*)$/);
      if (m) a[m[1].trim()] = m[2].trim();
      return a;
    }, {});
  const KEY = env.GEMINI_API_KEY;
  if (!KEY) { console.error('No GEMINI_API_KEY in .env'); process.exit(2); }

  const refPath = path.join(root, 'reference', 'logo-full-vertical.jpeg');
  const refB64 = fs.readFileSync(refPath).toString('base64');
  console.log('Loaded reference:', refPath, '(' + refB64.length + ' base64 chars)');

  const prompt = [
    'This is the existing brand logo for the Hebrew brand "חכמת האוטומציה" (Wisdom of Automation).',
    'Produce a premium, refined version of the SAME logo — same identity, same elements, same palette — but elevated to polished, top-tier brand-mark quality you would expect from a leading design studio.',
    '',
    'Keep all of these EXACTLY the same:',
    '- The cube/trapezoid mascot with white sunglasses (winking left eye, open right eye), big warm smile',
    '- The navy lightbulb on top of the mascot',
    '- The Hebrew typography stacked in two lines below the mascot (top word: "חכמת", bottom word: "האוטומציה")',
    '- The decorative element below the text (horizontal turquoise line with a small filled turquoise dot)',
    '- Strict palette: deep navy #1E2A5C, vivid turquoise #3DB8C5, pure white #FFFFFF — no other colors',
    '- Vertical centered composition',
    '- Flat vector illustration aesthetic',
    '',
    'Refinements that ELEVATE the design (apply all of them):',
    '1. Cleaner geometry — perfectly balanced proportions, rule-of-thirds harmony, more generous and intentional negative space.',
    '2. Refined outlines — uniform stroke width throughout, perfectly rounded line caps and joins, no jagged edges.',
    '3. Subtle volume on the mascot — a small white highlight on the upper-left curve of the cube body and on the top of the lightbulb (a tiny crescent of pure white) to suggest 3D form while staying flat. No gradients.',
    '4. Energized lightbulb — rays around the lightbulb arranged in a pleasing radial-symmetric pattern of 8 rays with alternating short/long lengths, longer and more confident than the original.',
    '5. Refined typography — perfect optical alignment between the two Hebrew words, balanced letter spacing, slightly wider tracking for premium feel.',
    '6. Polished decorator — the line beneath the text a touch shorter and the dot a touch larger, perfectly centered horizontally.',
    '7. Crisp edges everywhere — vector-perfect curves. Looks great from favicon (16px) to billboard size.',
    '8. Optical micro-improvements — the mascot smile a touch more confident (more curved, less wide), the eyes more expressive, the wink charming and intentional.',
    '9. Background — pure clean white #FFFFFF with generous padding around the entire composition (about 12% margin all around).',
    '',
    'Output: a single, exquisite vertical brand logo on white background, square 1:1 frame, museum-quality polish.'
  ].join('\n');

  console.log('Prompt length:', prompt.length, 'chars');

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=' + KEY;
  const body = JSON.stringify({
    contents: [{
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: refB64 } },
        { text: prompt }
      ]
    }]
  });

  console.log('Calling Gemini (image-to-image)...');
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  const data = await res.json();
  if (data.error) {
    console.error('API ERROR:', JSON.stringify(data.error, null, 2));
    process.exit(3);
  }
  const parts = data.candidates[0].content.parts;
  const img = parts.find(p => p.inlineData);
  const text = parts.find(p => p.text);
  if (!img) {
    console.error('No image in response. Parts:', JSON.stringify(parts).slice(0, 500));
    process.exit(4);
  }
  const outDir = path.join(root, 'outputs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, 'logo-refined-20260427.png');
  fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
  console.log('Saved:', out, '(' + fs.statSync(out).size + ' bytes)');
  if (text) console.log('Model said:', text.text.slice(0, 200));
})();
