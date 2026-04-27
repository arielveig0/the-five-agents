# Yael Bootstrap

## Overview
הקמת **יעל** — סוכנת התוכן (LLM-only) של הפרויקט. היא מאיישת את שורה 2/4 ב-Routing Matrix של ה-CEO, אחרי [[yuval-agent]]. ייחודה: היא **לא** קוראת לסוכנים אחרים, לא ל-API, לא לרשת. כשמאמר זקוק לתמונה היא משאירה placeholder בפורמט `<!-- IMAGE: <תיאור> -->` ב-`Output/`, וה-CEO עושה pass שני: extract → call Yuval → Edit. החלוקה הזו שומרת את יעל ממוקדת וזולה ב-context, ושומרת את האחריות התזמורתית במקום הנכון (CEO). הוקמו 3 תיקיות חדשות: `Content/`, `Content/Ready/`, `Output/`. הזרימה כולה עוד לא נבדקה end-to-end.

## Open Questions
- **`writing-voice.md` חסר** — נדחה לפי בקשת המשתמש. יעל תיתקל ב-fallback ל-`Output/` קיימים, אבל הוא ריק כרגע. כל מאמר ראשון יחסר anchor סגנוני — הסיכון: גרסה ראשונה תקבע את ה-tone "בטעות". המלצה: לכתוב את ה-voice doc אחרי 2–3 מאמרים אמיתיים.
- **end-to-end לא נבדק** — Yael → Output → CEO → Yuval → Edit עוד לא רץ במצב חי. נדרש מאמר test לפני שסומכים על זה.
- **pandoc לא מותקן בהכרח** — אם יבוא קובץ DOCX ראשון, יעל תעצור עם הודעת שגיאה ידידותית. צריך לאמת מראש או לכתוב הוראת התקנה ב-CLAUDE.md.
- **heuristics לזיהוי "צריך תמונה"** — שלוש השעות שכתבתי ב-system prompt רושפות ('400 מילה', 'תהליך ויזואלי', 'תיאור מפורש'). כדאי לכוון אחרי 2–3 מאמרים ולראות אם יש false positives/negatives.
- **כותרות SEO** — לא הוגדר אם יעל תכתוב כותרת SEO-friendly או רק תשכתב את כותרת המקור. החלטה לסשן הבא.
- **יעל ↔ vault** — היא לא כותבת ל-vault בעצמה (CEO עושה Phase 2). שווה לוודא שה-CEO באמת זוכר לעשות את זה כשיעל חוזרת.

## Session Log

### 2026-04-27 — Yael scaffolded as content writer subagent (2/4 in CEO routing) [shipped]
- **What was done:**
  - **Agent**: [[yael-agent]] ב-`.claude/agents/yael.md` — frontmatter עם description שמכריח dispatch לבקשות עיבוד תוכן, ו-system prompt בעברית של 8 שלבים (בחירה → קריאה → ניתוח סגנון → שכתוב → זיהוי תמונות → שמירה ל-`Output/` → העברת מקור ל-`Content/Ready/` → סיכום ל-CEO).
  - **Tool surface מצומצם**: `Read, Write, Edit, Glob, Grep, Bash` בלבד. **אין** `Agent`, `WebFetch`, `WebSearch`, `Skill`, MCP — הגבול "LLM-only" אכוף דרך היעדר הכלים. Bash מוגבל ל-`mv` ול-`pandoc` בלבד.
  - **Image-placeholder protocol**: יעל פולטת `<!-- IMAGE: <תיאור 3–7 מילים> -->` שורה לבדה. CEO עושה pass שני שמחלץ אותם ב-Grep, קורא ליובל לכל אחד, ועורך את הקובץ להחליף.
  - **CEO update**: ה-Routing Matrix של [[ceo-agent-prd]] וה-system prompt של ה-CEO ([[claude-agents-folder]]) עודכנו ל-2/4. נוסף סעיף "תהליך מיוחד: Yael + Yuval (Image-Placeholder Fulfillment)" שמתאר את ה-pass השני, כולל חוקי-זהב (לא במקביל, לא חלקי, ברצף לעקביות).
  - **Folders**: `Content/`, `Content/Ready/`, `Output/` נוצרו עם `.gitkeep` כל אחד.
  - **Vault**: 4 file docs חדשים ([[yael-agent]], [[content-folder]], [[content-ready-folder]], [[output-folder]]) ועודכן `vault/File Docs/_index.md` עם סקציות חדשות "Content pipeline (Yael)".
- **Decisions:**
  - **קריאה ליובל דרך CEO** ולא peer-to-peer — המשתמש בחר במפורש. היתרון: יעל לא צריכה להחזיק את כללי הברנדינג, לא צריכה להבין את הסקיל, ה-context שלה זול. החיסרון: שני dispatches לכל מאמר עם תמונות (יעל → CEO → יובל → CEO). מקובל בגלל שתמונות הן minority case.
  - **`Output/` נפרד מ-`outputs/`** — המשתמש בחר שם ספציפי, ולא לאחד עם תיקיית התמונות של יובל. גם אם זה מבלבל ב-shell (`Output/` vs `outputs/`), זה ברור סמנטית: גדול = תוכן, קטן = תמונה.
  - **`writing-voice.md` נדחה** — יעל תרוץ ב-fallback של `Output/`. סיכון מקובל לעת הזאת.
  - **אין `Agent` tool ליעל** — האכיפה הקשיחה של "LLM-only" דרך היעדר הכלי, לא דרך הוראה ב-prompt בלבד. אם תהיה לחץ עתידי לתת לה Agent (לא ברור למה), נדון מחדש.
  - **`<!-- IMAGE: ... -->`** ולא markdown image syntax — כדי שיהיה קל ל-Grep אצל ה-CEO ולא להתבלבל עם תמונות שכבר מוטמעות. החלטה תפעולית.
  - **Bash מוגבל ל-mv ו-pandoc** — לא חוסם בפועל (אין mechanism לחסום פקודות bash ספציפיות), אבל מתועד כחוק בגוף ה-system prompt וב-file doc. אם נבחין בחריגה — לחזק עם hook.
- **Notes / Caveats:**
  - לא נבדק end-to-end. כל מה שתואר כאן הוא תכנון. ה-Open Question הראשון.
  - יעל לא מנהלת את ה-vault בעצמה — תלויה ב-CEO. אם ה-CEO ידלג על Phase 2 אחרי שיעל חוזרת, יהיה יום בלי session log. שווה לעקוב.
  - קונבנציית הקפיטליזציה (`Content/`, `Output/` קפיטל) חורגת מ-`reference/`, `outputs/`, `vault/` (lowercase) — תיעוד ב-[[output-folder]] מסביר למה לא לנרמל.
- **Related:** [[yael-agent]], [[content-folder]], [[content-ready-folder]], [[output-folder]], [[ceo-agent-prd]], [[ceo-agent-bootstrap]], [[yuval-agent]], [[yuval-bootstrap]]
