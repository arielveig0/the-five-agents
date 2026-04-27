# Guy Bootstrap

## Overview
הקמת **גיא** — סוכן ה-QA האחרון בשרשרת, סוכן 4/4 תחת ראובן (CEO). **גיא הוא הסוכן היחיד עם רשות לדחות תוצר ולהחזירו ליעל לתיקון.** הוא ה-gate היחיד לפני shipping למשתמש: בלי האישור שלו, שום דבר לא יוצא. גיא לא כותב, לא מצייר, לא מחפש — רק שופט. הוא מריץ checklist בן 7 קטגוריות (brief alignment, content quality, brand voice, image-content fit, image-brand fit, completeness, technical), שומר דוח מובנה ב-`QA_Reports/`, ומחזיר APPROVED / REJECTED / APPROVED WITH MINOR NOTES. סגירת המעגל — Routing Matrix של ראובן עכשיו מאויש במלואו (4/4) והזרימה הקנונית של תוכן היא: **חן → יעל → יובל → גיא → ראובן → המשתמש**.

## Open Questions
- **end-to-end לא נבדק** — הזרימה המלאה (Chen → Yael → Yuval → Guy → User) עוד לא רצה. נדרש מאמר test כדי לוודא שגיא באמת חוסם תוצרים גרועים ושהמסלול לתיקון עובד.
- **מספר האיטרציות המקסימלי (3)** — אקראי. אולי 2 מספיק? אולי 4 צריך? נכוונן אחרי 5-10 רצים אמיתיים.
- **קריטריוני ⚠️ vs ❌** — הגבול הוא subjective. גיא הוא Hebrew-LLM שיפעיל שיקול דעת. אם זה מתגלה כלא-עקבי בין סשנים — נצטרך לחזק את הסקיל עם דוגמאות-מבחן.
- **הופעות מחזוריות של אותה בעיה** — אם יעל נכשלת על אותה קטגוריה ב-3 מאמרים ברצף, צריך להזין את התובנה הזו ל-system prompt שלה. אין כרגע mechanism אוטומטי לכך — חייב יד-אנושית.
- **יתר-שמרנות** — סיכון ש-Guy יכשיל יותר מדי, ויוצר loops לא הכרחיים. צריך לעקוב אחרי שיעור REJECT/APPROVE — סף סביר: 20-30% REJECT ב-iter 1.
- **בדיקות אובייקטיביות מול סובייקטיביות** — קטגוריות F (Completeness) ו-G (Technical) הן boolean. A-E דורשות שיפוט. שווה לחשוב על כלים אוטומטיים (linter ל-frontmatter, image-existence check) ל-G לפחות.
- **Memory rotation** — `QA_Reports/` יגדל. שווה לקבוע סף לרוטציה (`QA_Reports/2026/`) או לארכיב גרסאות-iteration שאושרו אחרי iter 1.

## Session Log

### 2026-04-27 — Guy scaffolded as QA gatekeeper (4/4 — Routing Matrix complete) [shipped]
- **What was done:**
  - **Agent**: [[guy-agent]] ב-`.claude/agents/guy.md` — frontmatter עם description שמכריח dispatch כשלב חתימה לפני shipping. system prompt בעברית של 7 שלבים: קבלת בקשה → הפעלת skill → קריאת חומרים → checklist → הכרעה → כתיבת דוח → דיווח. tools מצומצם: `Read, Write, Glob, Grep, Bash, Skill` — ללא `Edit` (גיא לא מתקן), ללא `Agent` (לא מדלג מעל ראובן), ללא Web/MCP/image-gen.
  - **Skill**: [[skill-qa-checklist]] ב-`.claude/skills/qa-checklist/SKILL.md` — 4 שלבים: load context → 7-category checklist → verdict → write report. כללי הכרעה דטרמיניסטיים (APPROVED = כל ✅; REJECTED = כל ❌ או 3+ ⚠️). טיפול באיטרציות: iter 1 רחב, iter 2 ממוקד, iter 3 hard-stop.
  - **QA_Reports**: התיקייה החדשה `QA_Reports/` עם `_template.md` מלא (metadata, checklist results, verdict, action items, notes for next time) ו-`.gitkeep`.
  - **CEO updates**:
    - טבלת הצוות עודכנה ל-**4/4 מאויש** עם שורת גיא.
    - Routing Matrix עודכן ל-**4/4 — מאויש במלואו**, גם ב-`ceo_agent.md` וגם ב-[[ceo-agent-prd]].
    - נוסף סעיף "תהליך מיוחד: גיא — QA Gate" עם דיאגרמה מלאה של ה-reject loop, חוקי-זהב (אסור לעקוף, אין shipping בלי APPROVED, iter ≤ 3), ומנגנון exit-condition ל-iter 3.
    - העדכון מסמן את **סגירת הלולאה** של "The Five Agents".
  - **Vault**: 3 file docs חדשים ([[guy-agent]], [[skill-qa-checklist]], [[qa-reports-folder]]) ועודכן `vault/File Docs/_index.md` (סקציית "Content pipeline" שונתה ל-"Chen → Yael → Yuval → **Guy**").
- **Decisions:**
  - **גיא לא מקבל `Edit` tool** — אכיפה קשיחה דרך היעדר הכלי שגיא לא יוכל בטעות לתקן בעצמו. הוא רק שופט.
  - **גיא לא מקבל `Agent` tool** — אותו עיקרון של חן ויעל. אין peer-to-peer dispatch בכלל ב-Five Agents. ראובן הוא הצינור הבלעדי.
  - **iter 3 = exit** — הגבלה קשיחה למניעת loops אינסופיים. אם המאמר לא עבר אחרי 3 איטרציות, ראובן מציג את הגרסה החצי-טובה למשתמש או מבקש התערבות ידנית.
  - **כללי הכרעה דטרמיניסטיים** — APPROVED = הכל ✅; REJECTED = ❌ אחד או 3+ ⚠️. לא משאירים שיקול דעת ל-LLM ב-decision rule כדי למנוע drift בין סשנים.
  - **תבנית נפרדת `_template.md`** ב-`QA_Reports/` — שיהיה anchor יציב גם אחרי שייצור הרבה דוחות, וגם כדי שגיא תמיד מעתיק ולא ינסה לכתוב מאפס.
  - **קטגוריות בסקיל מסודרות מ-Brief Alignment ל-Technical** — מ-most-important ל-most-mechanical. אם נכשלים בקטגוריה A (לא עונה לבריף) — אין טעם להמשיך לקטגוריה G. אבל הסקיל מורה לעבור על הכל בכל זאת כדי ש-Yael תקבל list מלא, לא תיקון אחד-אחד.
  - **גיא רואה את התמונות בפועל** (Read מולטימודאלי), לא רק את הנתיבים. בלי זה אין שיפוט אמיתי על קטגוריות D ו-E.
- **Notes / Caveats:**
  - לא נבדק end-to-end. כל מה שתואר הוא תכנון.
  - הסיכון הגדול: Guy יכשיל יותר מדי וייצור loops לא הכרחיים. צריך לאסוף סטטיסטיקות אחרי 5-10 מאמרים ראשונים.
  - לא ברור איך גיא מטפל בקובץ source מ-Chen אם הוא בעברית והמאמר באנגלית או להפך. שווה לשקול כשנגיע למשימה אמיתית.
  - הסקיל לא מציין מה לעשות אם תמונה היא "טובה אבל לא מותאמת לטקסט". זה ⚠️ או ❌? כרגע השארתי לשיקול גיא.
  - **כל ה-5 הסוכנים מאושרים — Routing Matrix של ראובן 4/4. The Five Agents במצב "feature complete" כתשתית.**
- **Related:** [[guy-agent]], [[skill-qa-checklist]], [[qa-reports-folder]], [[ceo-agent-prd]], [[chen-bootstrap]], [[yael-bootstrap]], [[yuval-bootstrap]], [[ceo-agent-bootstrap]], [[visual-identity]], [[output-folder]], [[outputs-folder]]
