---
name: client-discovery
description: Use this skill whenever Ariel (AutoWise AI) is preparing for, conducting, or following up a client discovery / kickoff meeting for a chatbot or automation project. Triggers include "גילוי", "פגישת היכרות", "אפיון לקוח", "discovery", "kickoff", "Brief ללקוח", or when raw notes/transcript from an intro call need to be turned into a structured client-facing document. The skill maps the client to one of AutoWise's 6 services (chatbot-service, sales-agent, scheduling-bot, onboarding, payment-agent, insurance-agent), produces a tailored Hebrew RTL discovery questionnaire, a meeting summary template, and a polished client-facing Brief in AutoWise voice. Do NOT use for full technical specs (use bot-spec), conversation flow design (use conversation-flow), system prompts (use system-prompt), or pricing proposals (use client-proposal).
---

# Client Discovery — AutoWise AI

המטרה: להפוך פגישת גילוי ללא-מובנית למסמך אפיון ראשוני בעברית RTL, מותאם לאחד מ-6 השירותים של AutoWise, ומוכן לאישור הלקוח תוך 48 שעות מהפגישה.

---

## When to use this skill

- מתכוננים לפגישת גילוי / kickoff עם לקוח פוטנציאלי
- יש תמלול / סיכום / רשימת bullets מפגישה ראשונה שצריך להפוך למסמך
- הלקוח שלח הודעה ראשונית בוואטסאפ ויש צורך לבנות מסגרת לשיחה
- הביטוי "Brief ללקוח", "אפיון ראשוני", "סיכום פגישה" עולה מהמשתמש

## When NOT to use

- לאפיון טכני מלא של הבוט → `bot-spec`
- לתכנון עץ שיחה ספציפי → `conversation-flow`
- לבניית system prompt → `system-prompt`
- להצעת מחיר → `client-proposal`

---

## AutoWise service catalog (must map every client to ≥1 service)

| שירות | ערוצים | מתי מתאים | Stack |
|---|---|---|---|
| **chatbot-service** (שירות לקוחות) | WhatsApp / Instagram / Telegram | יותר מ-20 שאלות חוזרות בחודש; רוב הפניות נפוצות | WhatsApp API + Make + Airtable |
| **sales-agent** (סוכן מכירות) | WhatsApp / אתר / Voice | לידים מתפספסים; טיפול בהתנגדויות; מחירונים; צריך לסגור | WhatsApp API + AI + Make |
| **scheduling-bot** (קביעת פגישות) | WhatsApp + Calendar | יומן עמוס; סוגי שירות מרובים; פגישות זה bottleneck | WhatsApp API + Cal.com / Google Calendar |
| **onboarding** (קליטת לקוחות) | Fillout + Airtable | תהליך ידני של חוזה+תשלום+אפיון לכל לקוח חדש | Fillout + Airtable + סליקה |
| **payment-agent** (סוכן גביה) | WhatsApp + סליקה | מרדף אחרי תשלומים; "לא נעים לבקש"; חשבונות פתוחים | WhatsApp API + Stripe / PayPal |
| **insurance-agent** (ביטוח/פיננסים) | WhatsApp + Calendar + CRM | סוכן ביטוח / יועץ פיננסי; טפסים; קופ״ג; רגולציה | WhatsApp API + Make + CRM ספציפי |

> **כלל מנחה:** לקוח יכול להתחיל עם שירות אחד ולגדול. תמיד הצע "להתחיל בקטן ולהוכיח שזה עובד".

---

## The 4-phase AutoWise framework (must reflect in every Brief)

הברייף ללקוח חייב לדבר בשפת התהליך הזה (זה התהליך באתר):

1. **הבנה** — מיפוי איפה לידים מתפספסים, התהליך הקיים
2. **בנייה** — בוטים, טפסים חכמים, חיבור למערכות (WhatsApp / CRM / יומן)
3. **הפעלה** — בדיקות עם לקוחות אמיתיים, חידוד הזרימה
4. **שיפור** — ניתוח נתונים, הגדלת המרות

---

## Inputs

### חובה
- שם הלקוח / שם העסק
- תחום עיסוק

### אופציונלי (השתמש בכל מה שזמין)
- כמות פניות / לידים בחודש
- ערוצים נוכחיים (וואטסאפ אישי? עסקי? אינסטגרם?)
- כלים קיימים (CRM ספציפי? יומן? סליקה?)
- "הכאב המרכזי" במילים של הלקוח
- תמלול / bullets מפגישה
- שווי ליד ממוצע (לחישוב הפסד אם רלוונטי)

---

## Process

### Step 1 — Service mapping
על בסיס תחום + כאב, זהה 1-2 שירותים מהקטלוג. הסבר במשפט אחד למה. אם לא ברור — בקש את 2-3 פרטי המידע הקריטיים שחסרים, לא יותר.

### Step 2 — Build discovery questionnaire
אם אין עדיין פגישה: טען את `templates/discovery-questions-base.md` והוסף וריאנט תחום מ-`templates/industry-variants/`. סדר את השאלון ב-6 בלוקים (כל בלוק עם הערכת זמן):

1. רקע על העסק (5 דק')
2. תהליך נוכחי + נקודות כאב (10 דק')
3. ערוצים, כלים, נתונים (5 דק')
4. תקציב + ציפיות זמן (5 דק')
5. הצלחה — איך נראה "עבד" (5 דק')
6. סיום + צעדים הבאים (5 דק')

### Step 3 — Meeting summary template
טען `templates/meeting-summary.md`, מותאם ללקוח. תבנית ריקה למילוי תוך כדי השיחה (לא אחריה).

### Step 4 — Client-facing Brief
**זה המסמך הקריטי** — נשלח ללקוח לאישור. מבנה מחייב להלן.

---

## Output 1 — `discovery-questions-{client-slug}-{YYYY-MM-DD}.md`

שאלון 15-25 שאלות בעברית. דוגמאות מ-base + variant:

**Base (לכל לקוח):**
- מה הסיבה שאתה פונה אלינו דווקא עכשיו?
- בכמה לידים אתה מטפל בחודש? כמה מהם נסגרים?
- כמה זמן עובר בין שליד נכנס לבין שאתה עונה לו ראשון?
- מה השאלה הכי חוזרת שאתה עונה עליה כל יום?
- מה הקובץ / האפליקציה שמרכז לך לידים היום?
- אם אתה לא זמין שעתיים — מה קורה ללידים?

**Insurance variant:**
- אילו טפסים אתה ממלא ידנית כל יום?
- איזה CRM אתה משתמש (אם בכלל)?
- מה תהליך פתיחת קופ״ג ממוצע — כמה דקות, כמה משוב חוזר?

**Coach/Therapist variant:**
- איך לידים חדשים מגיעים אליך — פרסום? המלצות? שניהם?
- יש לך מיני-קורס / חומר חינמי שמחמם לידים?
- מה התהליך הרגיל מליד ראשון לפגישת היכרות?

(וריאנטים נוספים בקבצי `industry-variants/`)

---

## Output 2 — `meeting-summary-{client-slug}-{YYYY-MM-DD}.md`

תבנית קצרה למילוי בזמן אמת:

```markdown
# סיכום פגישת גילוי — {client}

תאריך:
משתתפים:
משך:

## מה הבנתי (2-3 שורות בשפת הלקוח)


## הכאב הגדול ביותר


## שירות מומלץ מקטלוג AutoWise
- [ ] chatbot-service
- [ ] sales-agent
- [ ] scheduling-bot
- [ ] onboarding
- [ ] payment-agent
- [ ] insurance-agent

## אינטגרציות נדרשות
- [ ] WhatsApp Business API
- [ ] Google Calendar / Cal.com
- [ ] Airtable
- [ ] Fillout
- [ ] CRM ספציפי: ___________
- [ ] סליקה: ___________
- [ ] אחר: ___________

## תקציב משוער + ציפיות זמן


## דברים שצריך לסגור (הלקוח חוזר אליי)
1.
2.

## צעדים הבאים
- [ ] לשלוח Brief תוך 48 שעות
- [ ] _______________________
```

---

## Output 3 — `discovery-brief-{client-slug}-{YYYY-MM-DD}.md`

**המסמך שנשלח ללקוח. שפה שלו, לא טכנית. AutoWise voice.**

מבנה חובה:

```markdown
# {שם העסק} — Brief לאישור
*חכמת האוטומציה · {תאריך}*

## מי אתם
{1-2 שורות בשפת הלקוח על מה העסק עושה}

## מה הבנו
{הכאב המרכזי בשפה ברורה ובלי buzzwords. ציטוט קצר מהפגישה אם יש.}

## מה אנחנו מציעים
**{שם השירות מהקטלוג, למשל: סוכן מכירות AI לוואטסאפ}**

{2-3 שורות על מה הבוט/האוטומציה תעשה בפועל בעסק. דוגמא:}
> בוט בוואטסאפ שמגיב לכל ליד תוך שניות, שואל 3 שאלות סינון, ומעביר אליך רק לידים בשלים — עם סיכום קצר על מי הם ומה הם רוצים.

## איך זה ישנה את העסק
- ⚡ {תוצאה ראשונה במספרים: "מענה ב-30 שניות במקום 3 שעות"}
- 📈 {תוצאה שנייה: "פי 2 לידים בשלים בלי לעבוד יותר"}
- 🎯 {תוצאה שלישית: "סוף לפספוס לידים בערב/סופ״ש"}

## איפה נחבר את זה
- WhatsApp Business
- {כלים נוספים: CRM, יומן, Airtable, Fillout, סליקה}

## איך נעבוד יחד
1. **הבנה** ({X ימים}) — נמפה את התהליך הקיים ונחדד מה בדיוק הבוט עושה
2. **בנייה** ({Y שבועות}) — נקים בוטים, טפסים וחיבורים
3. **הפעלה** ({Z ימים}) — בדיקות עם לקוחות אמיתיים, חידוד
4. **שיפור** (חודש שוטף) — ניתוח נתונים והגדלת המרות

## מה לא בסקופ הזה
{הצהרה מפורשת. מונע scope creep. דוגמא:}
- בוט בערוצים נוספים מעבר לוואטסאפ
- קמפיינים שיווקיים יוצאים
- שינוי במערכת ה-CRM הקיימת

## שאלות פתוחות שאצטרך תשובה לפני שמתחילים
1.
2.
3.

---
*Brief זה תקף 14 יום. אישור פותח את שלב ההצעה.*
```

---

## Tone & language rules

- **שפה:** עברית בלבד בפלטים. אנגלית רק לטרמינולוגיה (CRM, Airtable, Fillout, WhatsApp Business).
- **AutoWise voice:** ישיר, מבוסס-תוצאה, בלי buzzwords.
  - ✅ "כל ליד שלא עונים לו תוך דקות הולך למתחרה"
  - ✅ "מענה מיידי, גם כשאתה לא זמין"
  - ✅ "להתחיל בקטן ולהוכיח שזה עובד"
  - ❌ "הפתרון החדשני שלנו ממנף בינה מלאכותית..."
  - ❌ "פלטפורמה מובילה לאוטומציות עסקיות"
- **אמוג'ים:** מתון. ⚡ 📈 🎯 💬 📅 ✅ 🤖 — כן. 🚀 🔥 💯 ✨ — לא.
- **לשון:** פנייה אישית בלשון זכר ("אתה") כברירת מחדל. אם הלקוחה אישה — שינוי לפי ההקשר.
- **מספרים:** בכל מקום שאפשר, תרגם תוצאות למספרים ("פי 2", "30 שניות במקום 3 שעות").
- **RTL:** סוגריים נכונים, אמוג'י בסוף משפט (לא בתחילתו), אין סימני פיסוק שבורים.

---

## Cross-skill behavior

- בסיום הסקיל, בכל פעם, הצע: *"ה-Brief מוכן. כשהלקוח מאשר — נריץ את `bot-spec` כדי לבנות את האפיון הטכני המלא."*
- אם הפגישה לא קרתה עדיין — הפק רק את Output 1+2 והודע: *"כשתחזור עם הסיכום מהפגישה, אריץ את שלב ה-Brief."*
- אם זוהה לקוח מתחום שאין לו variant ב-`industry-variants/` — בנה אד-הוק והצע למשתמש לשמור אותו לעתיד.

---

## File structure

```
client-discovery/
├── SKILL.md                              # זה הקובץ הזה
├── templates/
│   ├── discovery-questions-base.md
│   ├── meeting-summary.md
│   ├── discovery-brief.md
│   └── industry-variants/
│       ├── insurance.md
│       ├── coaches-therapists.md
│       ├── financial-advisors.md
│       ├── small-business.md
│       ├── service-providers.md
│       └── content-creators.md
└── examples/
    ├── financial-house-2025-01/         # מבוסס case של בית פיננסי
    └── coach-funnel-2025-02/            # מבוסס case של שי עובדיה
```

---

## Reference cases (מהאתר — להזכיר ללקוחות בשיחה)

- **בית פיננסי למשפחה** — פתיחת קופ״ג מ-30 דק' ל-4 דק'. רלוונטי לסוכני ביטוח/פיננסים.
- **הרב יוני לביא** — 10 שנות תוכן בבוט שעונה ב-4 שניות. רלוונטי ליוצרי תוכן/מרצים.
- **שי עובדיה** — מיני-קורס + Calendly אוטומטי. רלוונטי למאמנים/מטפלים.
- **יהונתן ראובן (מיתוג חכם)** — חיסכון 2 שעות לכל לקוח חדש. רלוונטי לנותני שירות.
