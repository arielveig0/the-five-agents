# Yuval Bootstrap

## Overview
הקמת **יובל** — סוכן הקריאייטיב הראשון של הפרויקט, ראשון מבין 4 הכפופים ל-CEO. יובל אחראי על עקביות ויזואלית: סורק את `reference/`, מחלץ סגנון, מנסח prompt, מפעיל את הסקיל [[skill-nano-banana-2]] (שעוטף את MCP `mcp-image`), ושומר ב-`outputs/`. בנוסף הוקמה תשתית: `.mcp.json` (project-scoped), שתי תיקיות חדשות (`reference/`, `outputs/`), והעדכון של ה-CEO routing matrix כך שיובל הוא השורה הראשונה המאוישת (3/4 עדיין TBD).

## Open Questions
- **`GEMINI_API_KEY`** — לא הוגדר. המשתמש צריך לייצר מ-Google AI Studio ולשים ב-shell env לפני קריאה ראשונה.
- **`IMAGE_OUTPUT_DIR`** — הוגדר ב-`.mcp.json` כ-`${IMAGE_OUTPUT_DIR}` עם substitution. אם המשתמש לא יגדיר אותו ל-absolute path של `outputs/`, ה-MCP יכתוב ל-`./output` (default). יובל יודע לטפל בזה (mv after).
- **אינטראקציה CEO ↔ Yuval לא נבדקה** בפועל. אימות נדרש: בקשה כללית כמו "תיצור באנר X" → CEO ידחוף ליובל → יובל יחזיר תמונה.
- **MCP-image package version** — לא ננעל. `npx -y mcp-image` ימשוך את ה-latest. אם פעם תהיה רגרסיה, נצטרך pin.
- **Concurrency** — מה קורה אם יש 2 בקשות תמונה ברצף? יובל לא מוגן מ-race conditions בכתיבה ל-`outputs/`. נדחה לפיצ'ר עתידי.
- **קודי הקס מדויקים** של primary navy ו-accent טורקיז — כרגע מוערכים מהתמונות (~`#1E2A5C` / `#3DB8C5`). אם יש Figma/AI source — להזין ל-[[visual-identity]].
- **Fonts רשמיים** — כרגע ניחוש (Heebo Bold / Assistant Black). למשתמש לאשר.
- **Logo variants** — אופקי, חד-צבע, dark mode, פאביקון. כרגע יש רק וריאנט אנכי + ה-mascot.
- **השימוש ב-`founder-portrait.jpg`** — אישי בלבד או כ-template ל"דמות אנושית" כללית?

## Session Log

### 2026-04-27 — Yuval + nano-banana-2 skill + MCP wiring [shipped]
- **What was done:**
  - **MCP**: נכתב [[mcp-config]] (`.mcp.json`) עם entry יחיד בשם `nano-banana-2` שמריץ `npx -y mcp-image` ומקבל `GEMINI_API_KEY`, `IMAGE_OUTPUT_DIR`, ו-`IMAGE_QUALITY=balanced`.
  - **Skill**: [[skill-nano-banana-2]] ב-`.claude/skills/nano-banana-2/SKILL.md` — wrapper דק שמתעד את הפרמטרים של `generate_image`, את ה-tool ID (`mcp__nano-banana-2__generate_image`), ואת error handling.
  - **Agent**: [[yuval-agent]] ב-`.claude/agents/yuval.md` — frontmatter עם description שמכריח dispatch לכל בקשת תמונה, ו-system prompt בעברית בן 7 שלבים: סריקה → ניתוח → בחירה → ניסוח → הפעלה → שמירה → סיכום.
  - **Folders**: `reference/` ו-`outputs/` נוצרו עם `.gitkeep`.
  - **CEO update**: ה-Routing Matrix של [[ceo-agent-prd]] וה-system prompt של ה-CEO ([[claude-agents-folder]]) עודכנו — Yuval הוא השורה הראשונה המאוישת (1/4). הבהרה ש-CEO לא קורא ישירות ל-MCP של תמונות, תמיד דרך יובל.
  - **Vault**: נוספו 5 file docs ב-File Docs ([[mcp-config]], [[skill-nano-banana-2]], [[yuval-agent]], [[reference-folder]], [[outputs-folder]]) ועודכן ה-`_index.md` של File Docs.
- **Decisions:**
  - **בחירת MCP server** — נבחר `mcp-image` (shinpr) על פני 4 חלופות שעלו ב-WebSearch (`nano-banana-pro-mcp`, `nanobanana-mcp-server`, `YCSE/nanobanana-mcp`, `nano-banana-2-skill`). הסיבות: tool יחיד נקי (`generate_image`), prompt enhancement מובנה, תמיכה בכל ה-quality tiers (Flash 2 + Pro), ו-CLI אחד שמטפל בהכל. החלופות יותר מורכבות ויותר fragmented.
  - **MCP בשם `nano-banana-2`** ולא `mcp-image` — שם שמתאר את ה-*דומיין*, לא את ה-package. אם בעתיד נחליף server, השם נשאר.
  - **Skill דק, לא חכם** — ההחלטות (אילו רפרנסים, איזה prompt) הן של יובל. הסקיל רק מעביר. הפרדה זו תאפשר sharing של הסקיל עם סוכנים אחרים (אם יבואו) בלי לרשת לוגיקה של יובל.
  - **Tools של יובל מוגבלים** — `Read, Write, Edit, Glob, Grep, Bash, Skill`. ללא `WebSearch`/`WebFetch`/`Agent` כי הוא לא צריך. שליטה על אחריות.
  - **`outputs/` נכלל ב-git** — זה project ראשוני, נוח שיהיה גלוי בדיפים. כש-volume יגדל, נעביר ל-`.gitignore` או ל-bucket.
  - **routing אחד מתוך ארבעה** — לא חיכינו עד שכל ה-4 יוגדרו כדי להמשיך. עדיף routing חי אחד מאשר 4 placeholders.
- **Notes / Caveats:**
  - **המשתמש עדיין צריך**: (1) להגדיר `GEMINI_API_KEY` ב-shell, (2) להגדיר `IMAGE_OUTPUT_DIR` ל-`c:\Users\ariel\Desktop\Workspace\the-five-agents\outputs`, (3) להריץ Claude Code מחדש כדי שה-MCP החדש ייטען, (4) לאשר את ה-MCP server בפעם הראשונה (פרומפט ביטחוני של Claude Code).
  - **לא נבדק end-to-end**. הזרימה CEO → Yuval → Skill → MCP → outputs לא רצה. זה Open Question.
  - **`mcp-image` לא נעול-גרסה** — `npx -y mcp-image` ימשוך את ה-latest. רגרסיה אפשרית.
  - 3 שורות routing נשארו TBD ב-CEO. מומלץ להמשיך להגדיר בסשנים נפרדים — לא מתפתים להמציא דומיינים.
- **Related:** [[yuval-agent]], [[skill-nano-banana-2]], [[mcp-config]], [[reference-folder]], [[outputs-folder]], [[ceo-agent-prd]], [[ceo-agent-bootstrap]], [[claude-agents-folder]], [[claude-skills-folder]]

### 2026-04-27 — Brand identity references ingested [shipped]
- **What was done:**
  - 4 רפרנסים הועלו ל-`reference/` ושונו לשמות תיאוריים: `logo-full-vertical.jpeg`, `mascot-character.jpeg`, `founder-portrait.jpg`, `hero-composite.png`.
  - נכתב [[visual-identity]] ב-`vault/Brand Guidelines/` — 8 סעיפים: Overview + פלטה + Mascot + טיפוגרפיה + סגנון איור + שילוב צילום + טון + רשימת הרפרנסים. כולל do/don't לכל מרכיב.
  - עודכן `vault/Brand Guidelines/_index.md` עם השורה החדשה.
  - עודכן [[yuval-agent]] (סעיף "סריקת `reference/`") עם הוראה לקרוא את [[visual-identity]] לפני סריקת התיקייה. אם הקובץ לא קיים — Open Question בסיום.
- **Decisions:**
  - **שמות תיאוריים** במקום `REG/REGA/photo*` — יובל בוחר רפרנסים לפי שם, אז שמות אטומים פוגעים בדיוק. שינוי one-shot, לא צריך script.
  - **פלטה ב-eye, לא ב-source** — קודי הקס מהתמונות בלבד. ננעל מדויק כשהמשתמש יביא Figma/AI.
  - **`visual-identity.md` חי ב-Brand Guidelines** ולא ב-Content Briefs — זו ספציפיקציה כללית, לא קמפיין נקודתי.
- **Notes / Caveats:**
  - הוספו 4 Open Questions חדשים (קודי הקס, fonts, logo variants, founder-portrait scope).
  - יובל עדיין לא נבדק end-to-end עם הברנדינג החדש — תלוי ב-`GEMINI_API_KEY`.
- **Related:** [[visual-identity]], [[reference-folder]], [[yuval-agent]]
