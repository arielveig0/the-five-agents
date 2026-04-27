# QA Report — _template_

> תבנית סטנדרטית. גיא מעתיק את זה לקובץ חדש בכל ביקורת: `<article-slug>-YYYYMMDD-HHMM.md`.
> התבנית עצמה (`_template.md`) לא נמחקת.

---

## Metadata
- **Article reviewed:** `Output/<filename>.md`
- **Source brief (from Reuven):** <תיאור מקורי של הבקשה>
- **Original sources (from Chen, if any):** `Content/Ready/<source-file>.md`
- **Images checked:** `outputs/<file-1>.png`, `outputs/<file-2>.png`
- **Reviewed by:** Guy (גיא)
- **Reviewed on:** YYYY-MM-DD HH:MM
- **Iteration:** 1 of N (track if this article came back for re-review)

---

## Checklist results

לכל פריט: ✅ pass / ❌ fail / ⚠️ partial. אם ❌ או ⚠️ — שורה אחת של "מה צריך לתקן".

### A. Brief alignment
- [ ] המאמר עונה לבקשה המקורית של ראובן
- [ ] הזווית/הטון תואמים את ההכוונה
- [ ] קהל היעד הנכון

### B. Content quality
- [ ] עברית טבעית (ללא תרגומיות, חזרות, fluff)
- [ ] מבנה לוגי (intro → body → conclusion)
- [ ] כותרות-משנה עוזרות לסריקה מהירה
- [ ] אורך מתאים לסוג התוכן (לא קצר מדי, לא מנופח)

### C. Brand voice
- [ ] מתאים ל-[[visual-identity]] (טון: ידידותי, חכם-עם-הומור, מקצועי-נגיש)
- [ ] ללא קלישאות, מילוי, חיזוקים מיותרים
- [ ] מסר ברור ולא מתחנן

### D. Image-content alignment
- [ ] כל תמונה ממוקמת היכן שהיא רלוונטית למילים סביבה
- [ ] התיאור (alt text) מתאר נכון את התמונה
- [ ] אין תמונה דקורטיבית-בלבד שלא תורמת

### E. Image-brand alignment
- [ ] פלטה: navy + טורקיז + לבן (ללא חריגות)
- [ ] סגנון: flat illustration עם outlines עבים (לפי [[visual-identity]])
- [ ] mascot (אם מופיע) שומר על קריצה + נורת רעיון
- [ ] איכות טכנית: חד, ללא artifacts

### F. Completeness
- [ ] כותרת קיימת ומשכנעת
- [ ] פתיחה (hook) חזקה ב-2-3 משפטים ראשונים
- [ ] סיכום / Call-to-action בסוף
- [ ] תמונה ראשית (אם מתאים)
- [ ] מקורות מצוטטים (אם המאמר מבוסס על מחקר של חן)
- [ ] frontmatter תקין: `source`, `processed`, `status`

### G. Technical
- [ ] שם הקובץ עוקב אחרי קונבנציה: `<slug>-YYYYMMDD.md`
- [ ] קישורים לתמונות עובדים (`![](../outputs/...)` עם paths נכונים)
- [ ] אין טקסט-זבל, חזרות, או placeholders שכחתיים (כמו `<!-- IMAGE: -->` שלא הוחלף)
- [ ] הקובץ-המקור הועבר ל-`Content/Ready/`

---

## Verdict

**הכרעה:** ✅ APPROVED / ❌ REJECTED / ⚠️ APPROVED WITH MINOR NOTES

**סיכום:** <2-3 משפטים שמסבירים את ההכרעה>

---

## ❌ Action items (אם REJECTED — חובה למלא)

עבור יעל:
1. <תיקון ספציפי 1>
2. <תיקון ספציפי 2>

עבור יובל (אם נדרש להחליף תמונה):
1. `outputs/<file>.png` — להחליף כי <סיבה>. תיאור חדש מומלץ: "<...>"

הערה ל-ראובן: <מה להעביר ל-יעל / יובל / שניהם, ובאיזה סדר>

---

## Notes for next time
<מה למדתי בביקורת הזו שיכול לחסוך זמן בהבא — דפוסים חוזרים, חולשות של יעל, סוגי תמונות שיובל לא קולע ב-first-pass>
