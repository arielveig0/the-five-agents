# Visual Identity — חכמת האוטומציה

## Overview
**חכמת האוטומציה** (Wisdom of Automation) הוא מותג שמשלב הומור-תכליתי עם תחושה של "אוטומציה חכמה ונגישה". הזהות הוויזואלית בנויה סביב **דמות-מותג** מרכזית (קוביה כחולה עם משקפיים ונורת רעיון), פלטה דו-גוונית של **navy + טורקיז**, ושילוב של **flat illustration עם צילום אמיתי**. המסר הוויזואלי: מקצועי אבל מחבק, חכם אבל לא יבשושי, ידידותי בלי להיות ילדותי.

המסמך הזה הוא הברירת-מחדל של [[yuval-agent]] — הוא קורא אותו לפני סריקת [[reference-folder]] בכל בקשת תמונה.

## Open Questions
- קודי הקס המדויקים של primary navy ו-accent טורקיז — כרגע מוערכים מהתמונות. אם יש Figma/Illustrator source, להעביר.
- שם הפונט הרשמי — כרגע ניחוש על בסיס הופעה (Heebo Bold או Assistant Black).
- האם יש variants של הלוגו (אופקי, חד-צבע, dark mode, פאביקון)? כרגע יש רק וריאנט אנכי + ה-mascot עצמו.
- האם הצילום של המייסד (`founder-portrait.jpg`) הוא אישי (רק לתוכן ספציפי) או template למקרה של "דמות אנושית"?

---

## 1. פלטת צבעים

| תפקיד | קוד הקס משוער | שימוש |
|---|---|---|
| **Primary — Navy** | `#1E2A5C` (~) | טקסט ראשי, outlines, contrast, הפלאמה של ה-mascot |
| **Accent — טורקיז** | `#3DB8C5` (~) | הילה, קווי השראה, גוף ה-mascot, נקודות ב-typography decorator |
| **Background — White** | `#FFFFFF` | רקע נקי, "פנים" של המשקפיים |
| **Soft Lavender** | `#E8E5F0` (~) | רקעי hero בלבד, להבדל מצילום |
| **Off-white / Cream** | `#FAFAF7` (~) | רקעים משניים, לא חובה |

**כלל:** Navy ו-טורקיז הם קדושים. כל שאר הצבעים — accents בלבד, ולא להחליף את שניהם.

## 2. Mascot — הדמות

הקוביה הכחולה הקטנה היא הלב של המותג. ראה: `reference/mascot-character.jpeg`.

**מאפיינים מחייבים:**
- צורה: trapezoid/קוביה גיאומטרית מעוגלת קלות
- צבע גוף: טורקיז (accent)
- משקפיים: לבנים, גדולים, חצי-עגולים, **תמיד עם קריצה** (עין אחת סגורה)
- חיוך: רחב, פתוח, שובבי
- נורת רעיון: מעל הראש, navy + קווי השראה טורקיז יוצאים החוצה
- outline: navy עבה, מעוגל

**Do:**
- להופיע כ-sticker, פינה, accent — לא כתפאורה רחבה
- תמיד פנים-קדמית או 3/4
- לתת "מקום נשימה" (negative space) סביבה

**Don't:**
- לא לעוות צורות
- לא להפוך אותה למונוכרום (תמיד הפלטה המלאה)
- לא להוריד את הקריצה — היא ה-DNA
- לא להציג בלי הנורה

## 3. טיפוגרפיה

ראה: `reference/logo-full-vertical.jpeg`.

- **משפחה:** Hebrew sans-serif **כבדה מאוד** (Heebo Bold 800 / Assistant Black 900 / או fallback דומה)
- **שימוש:** כותרות בלבד. Body text — משקל normal-medium מאותה משפחה.
- **דקורטור:** קו אופקי + נקודה עגולה — לסיום בלוקים של טקסט (כמו ב-`logo-full-vertical.jpeg`).

## 4. סגנון איור (Illustration)

מאפיינים שיובל מטמיע ב-prompts:
- **flat** (לא 3D, לא gradient עמוק)
- **outlines עבים מעוגלים** ב-navy
- **panels of color** — כל אובייקט הוא צורה גדולה ומלאה, לא טקסטורות
- **highlights מינימליים** — אזורים בהירים בקטנה כדי לתת volume בלי לאבד flat
- **friendly geometry** — פינות מעוגלות, לא חדות

## 5. שילוב צילום + איור

ראה: `reference/hero-composite.png`.

כשמשלבים צילום אמיתי עם הדמות:
- הצילום נשאר טבעי, ללא overlay חזק
- הדמות מופיעה כ-sticker עם outline navy שמפריד אותה מהרקע
- רקע מאחורי שניהם — הצללה רכה (lavender/off-white)
- mockup של מסך טלפון/ממשק — מימין-לשמאל RTL, באותה פלטה

זוהי הצורה ה-canonical ל-hero shots / banner של "הסבר על המוצר".

## 6. טון ויזואלי

| חיובי | שלילי |
|---|---|
| Playful | Childish |
| Approachable | Casual / unprofessional |
| Smart-with-humor | Snarky |
| Confident | Aggressive |
| Warm | Cold-corporate |
| Wink | Smirk |

הקריצה היא חתימה — אבל היא **לא לעוס**. לא להשתמש בה בכל פריים — שיישמר ייחודה.

## 7. רפרנסים זמינים ב-`reference/`

| קובץ | תיאור | מתי לבחור |
|---|---|---|
| `logo-full-vertical.jpeg` | לוגו מלא: mascot + טקסט עברי + decorator | בקשות שצריכות branding מפורש או typography reference |
| `mascot-character.jpeg` | רק הדמות, ללא טקסט | רוב המקרים — pose, palette, סגנון illustration |
| `founder-portrait.jpg` | דיוקן מייסד, רקע control room | תוכן שבו צריכה דמות אנושית "מומחה אוטומציה" |
| `hero-composite.png` | קומפוזיט: מייסד + mascot + טלפון | בקשות hero/banner שמשלבות אדם + מותג + product UI |

יובל בוחר 2–4 מאלה לפי הבקשה. לא חובה תמיד את כולם.

## 8. Related

- [[yuval-agent]] — הצרכן העיקרי של מסמך זה
- [[reference-folder]] — איפה הקבצים יושבים
- [[skill-nano-banana-2]] — הסקיל שמקבל את המאפיינים האלה כ-prompt
- [[yuval-bootstrap]] — סשן שאיתחל את יובל
- [[outputs-folder]] — תוצרי יובל שאמורים לציית לאלה
