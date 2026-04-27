# Chen Bootstrap

## Overview
הקמת **חן** — חוקרת הרשת של הצוות, סוכנת 3/4 תחת ראובן (CEO). חן היא המגינה של המערכת מהזיות: כל עובדה שהיא מחזירה מצוטטת מ-URL ספציפי שצפתה בו. תפקידה הוא **למצוא ולהגיש** מקורות איכותיים, לא לפרש או לכתוב. תוצריה זורמים ל-`Content/` (כקבצי `<topic>-source-YYYYMMDD.md`) ומשם יעל לוקחת לשכתוב, וראובן עושה את ה-image-pass עם יובל. ייחוד בולט: חן מתחזקת **זיכרון פרסיסטנטי משלה** ב-`Memory/searches.md` — היא בודקת לפני כל חיפוש אם כבר עבדה עליו, ומתעדת אחרי כל חיפוש. זה מונע כפילויות ומאפשר ללמוד עם הזמן אילו מקורות איכותיים יותר. גם הוקם הסקיל [[skill-web-research]] שמתאר את הליך החיפוש (planning → search → filter → extract → return) — Chen מפעילה אותו בכל סשן. ראובן (CEO) קיבל אזכור עברי ראשון: השם "ראובן" נוסף כ-alias לסוכן.

## Open Questions
- **end-to-end לא נבדק** — Chen → Content → Yael → Output → Yuval → Edit עוד לא רץ במצב חי על משימה אמיתית. נדרש בדיקה הראשונה.
- **WebSearch זמין רק בארה"ב** — ה-system prompt של חן כולל fallback (`WebFetch` ישיר על URLs מוכרים), אבל לא ברור עד כמה זה יחליף בפועל. אם המשתמש בישראל וה-WebSearch לא רץ — נדרש לבחון ה-fallback ולחזק רשימת ה-URLs המוכרים.
- **Memory rotation** — `Memory/searches.md` יגדל. אחרי 100+ רשומות הקריאה לפני כל חיפוש תהיה איטית. צריך לקבוע סף אוטומטי לרוטציה (`archive/searches-YYYY.md`).
- **שפה של תוצרי-מקור** — חן שומרת ציטוטים ישירים בשפת המקור (HE/EN). יעל אחר כך תרצה לתרגם אם צריך. לא בטוח אם יעל יודעת לעשות את זה — צריך לבדוק.
- **התנגשות מקורות** — חן שומרת את שני הצדדים בלי להכריע. השאלה הפתוחה: האם יעל מסוגלת לטפל בהתנגשות, או שצריך לחזור לראובן/למשתמש?
- **Skill vs procedure בעל-פה** — ה-`web-research` הוא skill פרוצדורלי, לא wrapper של MCP. בדיקה שזה פועל בפועל (שה-skill טעון לחן בעת dispatch) דורשת בדיקה.
- **שורת D של Routing Matrix** — נשארה אחת. אילו דומיינים עוד יכולים להיות שימושיים? (למשל: עורך וידאו, אנליטיקס, ניהול קמפיינים, support).

## Session Log

### 2026-04-27 — Chen scaffolded as web researcher (3/4 in CEO routing) [shipped]
- **What was done:**
  - **Agent**: [[chen-agent]] ב-`.claude/agents/chen.md` — frontmatter עם description שמכריח dispatch לבקשות מחקר/מקורות. system prompt בעברית של 6 שלבים: קבלת בקשה → בדיקת Memory → חיפוש לפי skill → שמירה ב-Content/ → תיעוד ב-Memory → דיווח לראובן. tools: `Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch, Skill` — ללא Agent (אכיפה ש-Chen לא קוראת ליעל).
  - **Skill**: [[skill-web-research]] ב-`.claude/skills/web-research/SKILL.md` — 5 שלבים: plan → search → filter → fetch → return. כולל טבלת ניקוד לסינון מקורות (authority/recency/depth/originality/accessibility), פורמט פלט מובנה, וטיפול בכשלים (paywalls, rate limits, conflicts).
  - **Memory**: `Memory/searches.md` נוצר עם template ופרוטוקול שימוש. `Memory/` היא תיקייה חדשה ב-root, נפרדת מהיעוד של `vault/` (vault הוא memory של ראובן, Memory הוא של חן).
  - **CEO updates**:
    - השם העברי "ראובן" נוסף ל-`ceo_agent.md` כ-alias ראשון. הצוות פונה ל-CEO בשם ראובן.
    - Routing Matrix עודכן ל-3/4 גם ב-`ceo_agent.md` וגם ב-[[ceo-agent-prd]].
    - נוסף סעיף "תהליך מיוחד: Chen → Yael → Yuval (Research-to-Content Pipeline)" עם דיאגרמה מלאה של זרימת המחקר → שכתוב → אילוסטרציה.
  - **Vault**: 3 file docs חדשים ([[chen-agent]], [[skill-web-research]], [[memory-folder]]) ועודכן `vault/File Docs/_index.md` עם הסקציה "Content pipeline (Chen → Yael → Yuval)".
- **Decisions:**
  - **חן לא מכירה את יעל ויובל** — היא רק מדווחת לראובן ("Content/X.md מוכן"). זה אנלוגי לגמרי לאיך שיעל לא מכירה את יובל. מפשט את הסוכנים האישיים, מרכז את האחריות התזמורתית בראובן.
  - **`Memory/` בשורש הפרויקט** ולא תחת `.claude/agents/chen-memory/` — לפי ה-spec של המשתמש, ולגיטימי כי זו תיקיית-נתונים שצריכה להיות נגישה ולעקוב אחריה ב-git כמו `Content/`. אפשר תמיד לאחר מכן.
  - **Skill פרוצדורלי, לא MCP wrapper** — `web-research` רק מתאר את ה-procedure. אין `mcp__web-research`. החיסרון: התלות בכך שחן תזכור להריץ אותו. היתרון: אין layer מיותר, ו-WebSearch/WebFetch זמינים ישירות.
  - **prepend ולא append ל-Memory/searches.md** — חידוש קטן אבל חשוב. הקריאה הבאה תראה את הרשומות החדשות ראשונות, מבלי לסרוק את כל הקובץ.
  - **קובץ-מקור עם sufix `-source`** — `<topic>-source-YYYYMMDD.md` מבחין בין קבצי-מקור של חן לבין טיוטות של יעל באותה תיקייה (`Content/`).
  - **שם עברי לראובן** — היה זמן טוב לתת ל-CEO זהות עברית. כל הצוות מורכב משמות עבריים (ראובן, יובל, יעל, חן). הסוכן הרביעי שיגיע גם יקבל שם עברי.
  - **חן לא מקבלת `Agent` tool** — אכיפה קשיחה דרך היעדר הכלי, לא רק דרך הוראה ב-prompt.
- **Notes / Caveats:**
  - לא נבדק end-to-end. כל מה שתואר הוא תכנון.
  - WebSearch מ-US בלבד — fallback קיים ב-prompt אבל לא נבחן בפועל.
  - אם הסקיל לא נטען אוטומטית כשחן רצה — צריך לחזק את ה-prompt עם הוראה מפורשת ל-`Skill(skill: "web-research")` כשלב 3.
  - 3/4 סוכנים מאויש. נשאר אחד אחרון. החלל הזה שווה ניצול — מה הסוכן הרביעי?
- **Related:** [[chen-agent]], [[skill-web-research]], [[memory-folder]], [[content-folder]], [[ceo-agent-prd]], [[yael-bootstrap]], [[yuval-bootstrap]], [[ceo-agent-bootstrap]]
