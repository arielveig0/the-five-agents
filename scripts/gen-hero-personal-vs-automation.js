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
  if (!KEY) { console.error('No GEMINI_API_KEY'); process.exit(2); }

  const refMascot = path.join(root, 'reference', 'mascot-character.jpeg');
  const refLogo = path.join(root, 'reference', 'logo-full-vertical.jpeg');
  const refMascotB64 = fs.readFileSync(refMascot).toString('base64');
  const refLogoB64 = fs.readFileSync(refLogo).toString('base64');
  console.log('Loaded references: mascot-character.jpeg, logo-full-vertical.jpeg');

  const prompt = [
    'Hero banner illustration for a Hebrew brand blog (חכמת האוטומציה / AutoWise AI).',
    '',
    '⚠️ CRITICAL CONSTRAINT — NO TEXT WHATSOEVER:',
    'Do NOT include ANY text, letters, words, Hebrew characters, English characters, numerals, glyphs, or written symbols ANYWHERE in the image. No text on signs, no text in bubbles, no text on phone screens, no text in the background. Treat all text as forbidden. If a chat bubble is needed, fill it ONLY with three small navy dots (•••) representing "typing", nothing else.',
    '',
    'Style: flat vector illustration with thick rounded navy outlines, no gradients, clean crisp edges, professional editorial illustration quality. Same brand DNA as the reference mascot image attached.',
    '',
    'Palette STRICTLY (3 colors only):',
    '- Deep navy #1E2A5C (all outlines, dark fills, eyes)',
    '- Vivid turquoise #3DB8C5 (accent fills — the mascot, the client chair, plant pot)',
    '- Pure white #FFFFFF (background, the mascot sunglasses, highlights)',
    'Soft lavender #E8E5F0 is OK for a subtle background panel only. NO other colors.',
    '',
    'Composition (16:9 horizontal banner, calm and uncluttered):',
    '',
    'LEFT 60% of the frame — a calm, focused moment between two illustrated women in profile. A hairdresser/salon owner standing slightly behind, gently working with the hair of a client who is seated on a stylish chair. Both rendered in the same flat-vector aesthetic as the brand mascot. Both have warm closed-mouth smiles, eyes half-closed in calm focus. The salon owner has her hands lightly on the client. Suggest the salon environment with MINIMAL flat shapes — just a chair silhouette, perhaps a small plant in the corner. Keep this side spacious and breathable.',
    '',
    'RIGHT 40% of the frame — separated by generous negative white space, the brand mascot stands confidently in 3/4 view. The mascot is faithful to the reference image: turquoise cube body, thick navy outlines, large white sunglasses with WINKING left eye and open right eye, wide cheerful smile, navy lightbulb on top with 6 short turquoise rays radiating outward. The mascot holds a smartphone in front of itself. From the smartphone screen, a chat bubble emerges (cloud-shaped, navy outline, white interior). Inside the chat bubble: ONLY THREE SMALL NAVY DOTS (• • •) horizontally — the universal "typing" indicator. ZERO letters or words.',
    '',
    'Visual metaphor: The two women on the left represent the human, focused, present moment. The mascot on the right represents automation handling the digital chatter — silently, in the background, not stealing the show. The two scenes feel peaceful next to each other, not competing.',
    '',
    'Mood: calm, focused, professional warmth. Editorial quality. The opposite of frantic.',
    '',
    'Quality: high-fidelity vector illustration suitable for a magazine cover. Sharp outlines. Generous white space. Balanced composition.',
    '',
    'REMINDER: NO TEXT ANYWHERE. Just shapes, color, and three dots in the chat bubble.'
  ].join('\n');

  console.log('Prompt length:', prompt.length, 'chars');

  // Try Pro model first; fall back to Flash if Pro fails
  const models = ['gemini-3-pro-image', 'gemini-3-pro-image-preview', 'gemini-2.5-flash-image'];
  let success = false;
  let lastError = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`;
    const body = JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: refMascotB64 } },
          { inlineData: { mimeType: 'image/jpeg', data: refLogoB64 } },
          { text: prompt }
        ]
      }]
    });

    console.log(`\nTrying model: ${model}`);
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    const data = await res.json();

    if (data.error) {
      console.log(`  → ${model} failed: ${data.error.message?.slice(0, 100)}`);
      lastError = data.error;
      continue;
    }

    const parts = data.candidates?.[0]?.content?.parts || [];
    const img = parts.find(p => p.inlineData);
    if (!img) {
      console.log(`  → ${model} returned no image`);
      continue;
    }

    const outDir = path.join(root, 'outputs');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const out = path.join(outDir, 'personal-vs-automation-hero-20260428.png');
    fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
    console.log(`  ✓ Saved (model: ${model}):`, out, `(${fs.statSync(out).size} bytes)`);
    success = true;
    break;
  }

  if (!success) {
    console.error('All models failed. Last error:', JSON.stringify(lastError, null, 2));
    process.exit(3);
  }
})();
