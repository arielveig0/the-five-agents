---
name: handover-doc
description: Use this skill when Ariel (AutoWise AI) needs to produce a handover document for a client after a chatbot or automation project goes live — covering architecture, credentials map, day-to-day runbook, troubleshooting playbook, and ongoing maintenance terms. Triggers include "handover", "מסמך מסירה", "תיעוד טכני ללקוח", "runbook", "מסמך תפעול", "go-live document", or when bot-spec / make-blueprint outputs need to be turned into a client-facing operations document. The skill consumes outputs from bot-spec (architecture, integrations, data model), make-blueprint (modules, scenarios, error handling), and system-prompt (where it lives, how to update), then produces a single Hebrew RTL handover document in two layers — a non-technical operational layer the client can actually use day-to-day, and a technical appendix for any future developer. Output covers: system overview diagram, credentials inventory (with security notes), runbook for common tasks, troubleshooting decision tree, escalation contacts, change request process, and AutoWise's standard support tier definitions. Do NOT use for client proposals (use client-proposal), specs (use bot-spec), or QA (use bot-qa).
---

# Handover Doc — AutoWise AI

המטרה: לתת ללקוח מסמך אחד שמספיק לו ליום-יום, ולמפתח עתידי שיירש מסמך טכני שלא מצריך 3 שיחות איתך כדי להבין מה קורה.

---

## When to use this skill

- בוט סיים go-live וחודש התמיכה הראשון
- מעבירים פרויקט לתחזוקה ארוכת טווח (או פרידה מהלקוח)
- לקוח עובר ל-developer פנימי ומבקש תיעוד
- ביטויים: "handover", "מסירה", "תיעוד תפעולי", "runbook", "go-live doc"

## When NOT to use

- להצעת מחיר → `client-proposal`
- לאפיון טכני בזמן בנייה → `bot-spec` (ה-spec הוא טכני פנימי, ה-handover הוא חיצוני)
- ל-QA → `bot-qa`

---

## Inputs

### חובה
- שם לקוח / שם בוט
- שירות מהקטלוג AutoWise

### חובה לתיעוד טכני שלם
- `bot-spec-{client}.md` — ארכיטקטורה, data model
- `make-blueprint-{client}.md` — מודולים, error handling
- `system-prompt-{client}.md` — איפה ה-prompt יושב, איך לעדכן
- רשימת credentials פעילים (Make connections, API keys, אך ללא הסיסמאות עצמן ב-Markdown)

### מומלץ
- נתוני 30 הימים הראשונים בפרודקשן (כמות שיחות, error rate, average response time)
- 3-5 התקלות הנפוצות שעלו בחודש הראשון

---

## Two-layer structure (חובה)

מסמך מסירה ב-AutoWise תמיד בנוי בשתי שכבות בקובץ אחד:

| שכבה | קהל | אורך | תוכן |
|---|---|---|---|
| **Layer 1 — Operations** | בעל העסק | 60-70% מהמסמך | ללא טרמינולוגיה טכנית. "מה לעשות אם..." בעברית פשוטה |
| **Layer 2 — Technical Appendix** | מפתח עתידי | 30-40% מהמסמך | טכני מלא, אנגלית-עברית מעורבת לפי הצורך, IDs, schemas |

מבנה הקובץ: Layer 1 קודם (כי הוא מה שהלקוח קורא ראשון), Layer 2 כנספח נפרד.

---

## AutoWise support tier definitions (חובה לציין)

לכל handover, חובה לציין באיזה tier הלקוח נמצא ומה זה אומר. **ללא tier מוגדר — אריאל הופך לתמיכה חינם 24/7. זה הסיבה הראשונה לסקיל הזה.**

| Tier | מחיר חודשי | זמן תגובה | כלול | לא כלול |
|---|---|---|---|---|
| **חודש תמיכה הראשון** | כלול בפרויקט | תוך 24 שעות | תיקוני באגים, התאמות קטנות, 2 פגישות סטטוס | פיצ'רים חדשים, שינוי scope |
| **בסיסי** | ₪350-500 | תוך 48 שעות, ימי עבודה | ניטור, תיקוני באגים, alert על errors | שינויי תוכן, prompt updates |
| **מורחב** | ₪800-1,500 | תוך 24 שעות, ימי עבודה | בסיסי + עדכוני prompt עד 5/חודש, שינויי תוכן | פיתוח חדש, אינטגרציות חדשות |
| **פרימיום** | ₪1,500-3,000 | תוך 4 שעות בימי עבודה | מורחב + אופטימיזציה אקטיבית, דוחות חודשיים, פגישת סטטוס חודשית | פרויקטים חדשים נפרדים |
| **ללא חוזה תחזוקה** | — | best effort, לא מובטח | תיקון תקלות שנובעות מבנייה מקורית (90 יום) | כל השאר — לפי שעה (₪{hourly}) |

**נוסחת תקשורת ללקוח:** *"אחרי חודש התמיכה הראשון — אתה בוחר אם להמשיך באחד המסלולים או לעבוד מולנו לפי שעה. שני האופציות תקפות."*

---

## Process

### Step 1 — Gather artifacts
ודא שיש: spec, blueprint, prompt, ו-30 ימי data בפרודקשן (אם רלוונטי).

### Step 2 — Map credentials inventory
רשימה מלאה של חיבורים. **לעולם לא** הסיסמאות עצמן ב-Markdown. רק שם החיבור + מי המנהל + איך לאפס.

### Step 3 — Build Layer 1 (Operations)
בעברית פשוטה. סדר חובה:
1. מה הבוט עושה ומה הוא לא עושה (תזכורת)
2. איך לבדוק שהכל עובד (5 דקות ביום)
3. מה לעשות אם...
4. איך לבקש שינוי
5. תוכן וטקסטים — אם הלקוח רוצה לעדכן בעצמו
6. תקשורת איתי — מה דרך הפנייה לכל סוג בקשה

### Step 4 — Build Layer 2 (Technical)
1. ארכיטקטורה
2. Credentials map
3. Modules ב-Make
4. Data model
5. Error handling
6. Update / deploy procedures

### Step 5 — Compile
פלט אחד: `handover-{client-slug}-{YYYY-MM-DD}.md`

### Step 6 — Sign-off
חתימה דו-צדדית. הלקוח מאשר שקיבל את המסמך וזה פוטר אותך מ-implicit support.

---

## Output — `handover-{client-slug}-{YYYY-MM-DD}.md`

````markdown
# מסמך מסירה — {שם הבוט}
*{שם לקוח} · AutoWise AI · {תאריך} · גרסה {N}*

> **סטטוס:** Active in production from {go-live date}
> **Tier תחזוקה:** {basic / extended / premium / חודש ראשון / ללא}
> **תוקף המסמך:** עדכון אחרון בגרסה זו. עדכונים יסומנו כ-v{N+1}.

---

# 📘 חלק ראשון: תפעול יומיומי

*כל מה שאתה צריך לדעת בעברית פשוטה. אם משהו לא ברור — בוואטסאפ אליי.*

## 1. מה הבוט עושה

{2-3 משפטים בשפת הלקוח. דוגמה:}

הבוט שלך, בשם **{שם הבוט}**, עונה על כל פנייה שמגיעה למספר וואטסאפ העסקי שלך
({+972XX-XXXXXXX}) תוך פחות מ-30 שניות.

**מה הוא עושה:**
- {capability 1}
- {capability 2}
- {capability 3}

**מה הוא לא עושה (מועבר אליך אוטומטית):**
- {הגדרת handoff 1}
- {הגדרת handoff 2}
- {הגדרת handoff 3}

## 2. בדיקה יומית של 5 דקות

כל בוקר (או לפני שאתה מתחיל יום עבודה), הסתכל על:

### א. וואטסאפ העסקי
- האם יש שיחות שהבוט הקפיץ אליך עם הסיכום? (אמורות להיות 1-5 ביום ממוצע)
- האם הבוט שולח הודעות תקינות? (פתח שיחה אקראית מהאתמול)

### ב. Airtable / Google Sheets — לוח הלידים
לינק: {URL ישיר ללוח}

- **טבלת `leads`:** האם נכנסות רשומות חדשות? (אם 24 שעות בלי רשומה חדשה — סימן לבעיה)
- **עמודת `status`:** רוב הרשומות במצבים הצפויים? (לא תקועות ב-`new` יותר מיומיים)

### ג. אם משהו נראה לא בסדר
שלח לי בוואטסאפ עם **צילום מסך + מספר הטלפון של הלקוח שהושפע** ואני אבדוק.

## 3. מה לעשות אם...

### 🔴 הבוט לא עונה ללקוחות
1. שלח הודעת בדיקה מטלפון אישי שלך למספר העסקי
2. אם אין מענה תוך דקה — שלח לי הודעה "**הבוט נפל**" + שעת התחלה
3. אני אבדוק תוך 30 דקות (במהלך {שעות תמיכה לפי tier})

### 🟠 הבוט עונה משהו שלא קשור / לא הגיוני
1. צלם מסך של השיחה
2. שלח לי עם הסבר קצר ("הוא היה אמור לומר X אבל אמר Y")
3. אני אעדכן את ה-prompt ואשלח עדכון תוך {זמן לפי tier}

### 🟡 לקוח רוצה לבטל פגישה שהבוט קבע
1. פתח את היומן ({Cal.com / Google Calendar})
2. בטל ידנית
3. שלח הודעה ללקוח לאישור
- אופציונלי: בעתיד אפשר להוסיף תכונת "ביטול עצמי" — תוספת ₪{X}

### 🟢 רוצה להוסיף תשובה חדשה / עדכון תוכן
**אם אתה ב-tier מורחב/פרימיום:**
שלח לי את הטקסט שאתה רוצה + באיזה הקשר. עדכון תוך {זמן}.

**אם אתה ללא חוזה:**
תוספת לפי שעה (~₪{X}/שעה, מינימום שעה).

### ⚫ נדרש שינוי משמעותי בלוגיקה
זה כבר פיצ'ר חדש, לא תיקון. נכתב הצעה נפרדת תחת `client-proposal`.

## 4. תקשורת איתי — איך לבקש מה

| סוג בקשה | דרך פנייה | זמן תגובה |
|---|---|---|
| 🔴 תקלה דחופה (בוט לא עונה) | WhatsApp ישיר | {לפי tier} |
| 🟠 באג / תשובה לא נכונה | WhatsApp + צילום מסך | {לפי tier} |
| 🟡 שינוי תוכן קטן | WhatsApp / Email | {לפי tier} |
| 🔵 פיצ'ר חדש / שינוי גדול | Email — נכתב הצעה | תוך 5 ימי עבודה |
| 🟢 שאלה כללית / סטטוס | WhatsApp | תוך יום |

**WhatsApp:** [+972-54-624-2468](https://wa.me/972546242468)
**Email:** ariel@autowise-ai.com

## 5. מספרי טלפון חשובים

| | מספר/לינק |
|---|---|
| מספר וואטסאפ עסקי של הבוט | {+972XX-XXXXXXX} |
| WhatsApp ישיר אליי | +972-54-624-2468 |
| Email | ariel@autowise-ai.com |
| לוח לידים (Airtable) | {URL} |
| יומן הפגישות | {Cal.com URL} |
| {שירות נוסף} | {URL/contact} |

## 6. מה כלול בחוזה התחזוקה שלך

**Tier נוכחי:** {basic / extended / premium / חודש ראשון}

**מה כלול:**
- {bullet 1}
- {bullet 2}
- {bullet 3}

**מה לא כלול:**
- פיצ'רים חדשים שלא היו ב-spec המקורי
- {ספציפי לפרויקט}

**מחיר חודשי:** ₪{X} + מע"מ
**חיוב:** {הוראת קבע / חשבונית חודשית}

---

# 🔧 חלק שני: נספח טכני

*למפתח עתידי שיורש את הפרויקט. שמור גם אם אתה לא טכני — זה החיים של מי שיירש אחריך.*

## 1. ארכיטקטורה

```mermaid
flowchart TD
    user([📱 לקוח<br/>WhatsApp]) --> webhook[/{Provider} Webhook/]
    webhook --> make[Make Scenario:<br/>{scenario_name}]
    make --> ai[Anthropic / OpenAI API]
    make --> air[(Airtable<br/>{base_name})]
    make --> cal[(Cal.com)]
    ai --> make
    make --> wh_out[/{Provider} Send/]
    wh_out --> user
    make -.error.-> alert[WhatsApp alert<br/>to Ariel]
```

**Stack מלא:**
- WhatsApp Provider: {GreenAPI / 360dialog / WATI}
- Orchestration: Make.com (workspace: {workspace_name})
- AI: {Anthropic Claude / OpenAI GPT-4o}, model: `{model_id}`
- Database: Airtable (base: `{base_id}`)
- Calendar: {Cal.com / Google Calendar}
- Payments: {Stripe / PayPal / N/A}
- Logging: Airtable `conversations` + `errors` tables

## 2. Credentials inventory

⚠️ **הסיסמאות עצמן לא במסמך הזה.** הן ב: `{1Password vault / Bitwarden / specific encrypted file}`

| חיבור | מי המנהל | איפה מאופסן | איך לאפס |
|---|---|---|---|
| {Provider} API token | {שם בעלים} | {dashboard URL} | {הוראות איפוס} |
| Make connection: {provider} | אריאל | Make → Connections | חיבור מחדש דרך OAuth |
| Anthropic API key | אריאל | Anthropic Console | יצירת מפתח חדש + עדכון ב-Make |
| Airtable PAT | {שם} | Airtable → Developer hub | יצירת PAT חדש + עדכון Make |
| Cal.com API key | {שם} | Cal.com → API | regenerate + עדכון Make |
| {נוסף} | | | |

**בעלות:** מומלץ שכל החיבורים יהיו תחת חשבון של הלקוח (לא של אריאל), עם הרשאת admin לאריאל.

## 3. Make scenarios

| Scenario name | מטרה | trigger | מודולים | ops/חודש (ממוצע) |
|---|---|---|---|---|
| `{scenario_1}` | {main bot flow} | webhook | {N} | {ops} |
| `{scenario_2}` | scheduled cleanup | cron daily 02:00 | {N} | {ops} |
| `{scenario_3}` | error notifier | error from #1 | {N} | {ops} |

**גרסת blueprint:** `make-blueprint-{client}-v{N}.md` (קישור פנימי)

## 4. Data model

### Airtable base: `{base_name}`

#### Table: `leads`
| Field | Type | Notes |
|---|---|---|
| `phone_e164` | Phone | Primary key, format `+972...` |
| `full_name` | Single line | |
| `status` | Single select | `new` / `qualified` / `booked` / `lost` / `needs_human` |
| `first_message_at` | Date | |
| `last_activity_at` | Date | Updated by every interaction |
| `service_interest` | Single select | {options} |
| `notes` | Long text | |

#### Table: `conversations`
| Field | Type | Notes |
|---|---|---|
| `lead_id` | Link to `leads` | |
| `direction` | Single select | `inbound` / `outbound` |
| `content` | Long text | |
| `created_at` | Date | |

#### Table: `errors`
{...}

#### Table: `appointments`
{...}

## 5. System prompt

**מיקום נוכחי:** Module #6 ב-`{scenario_1}`, פרמטר `system_message`
**גרסה נוכחית:** `system-prompt-{client}-v{N}.md`
**אחראי לעדכונים:** אריאל (במסגרת tier התחזוקה)

**איך לעדכן:**
1. ערוך את `system-prompt-{client}-v{N+1}.md` (גרסה חדשה, לא מעדכנים את הקיימת)
2. הדבק לתוך Make module
3. הרץ test scenario עם 3 happy paths
4. אם יציב — עדכן את גרסת ה-prompt ב-`scenario notes` ב-Make

## 6. Error handling map

| Error pattern | מקור | תגובה אוטומטית | פעולת אריאל נדרשת? |
|---|---|---|---|
| WhatsApp 401 | Provider | retry 1x, אז handoff | כן — token עדכון |
| Anthropic 529 (overloaded) | AI | retry 2x, אז fallback message | לא (חוזר ל-stable תוך דקות) |
| Airtable rate limit | DB | built-in retry | לא |
| Cal.com no availability | Calendar | suggest alternative slots | לא |
| Stripe webhook fail | Payment | manual reconciliation | כן |
| {ספציפי} | | | |

**Alert routing:** כל error → שולח WhatsApp לאריאל ומתעד ב-`errors` table.

## 7. Backup & disaster recovery

- **Airtable:** Auto-backup ב-{tool} כל יום בשעה 03:00 בלילה
- **Make scenarios:** Export blueprint שמור ב-{location} (עדכון ידני אחרי כל שינוי משמעותי)
- **System prompt:** מחזיק ב-Git repo פרטי (`autowise-clients/{client}`)
- **בקרה אחרונה לגיבויים:** {date}

## 8. Performance baseline (30 ימים ראשונים)

| מדד | Baseline | Threshold לדאגה |
|---|---|---|
| שיחות בחודש | {N} | < {N×0.5} או > {N×2} |
| זמן תגובה ממוצע | {X} שניות | > 60 שניות |
| % handoffs | {Y}% | > 25% |
| % errors | {Z}% | > 3% |
| ops/שיחה ממוצע | {ops} | > {ops×1.3} |

## 9. Future improvements שאריאל זיהה (לא בסקופ הנוכחי)

זה לא חלק מהתחזוקה הנוכחית — אבל אם ירצו לפתח בהמשך:
- {improvement 1 + הערכת effort}
- {improvement 2 + הערכת effort}
- {improvement 3 + הערכת effort}

---

# ✍️ אישור מסירה

| | לקוח | AutoWise |
|---|---|---|
| שם | _______________ | אריאל וייג |
| תאריך | _______________ | {today} |
| חתימה | _______________ | _______________ |

חתימה על המסמך מאשרת:
- הלקוח קיבל גישה לכל המערכות הרלוונטיות
- הלקוח מבין מה כלול בחוזה התחזוקה ומה לא
- אריאל סיים את חודש התמיכה הראשון בהצלחה ומסיים את הפרויקט המקורי
- כל פנייה עתידית תתבצע לפי tier התחזוקה הנוכחי

*שמור עותק חתום ב: {drive folder} ובחשבון המייל של שני הצדדים.*
````

---

## Tone & language rules

### Layer 1 (Operations)
- **שפה:** עברית פשוטה לחלוטין
- **טון:** כמו לחבר טוב שצריך לתפעל משהו, לא כמו טכנאי
- **כללים:**
  - אסור להשתמש ב: "API", "webhook", "OAuth", "module" — תרגם או הסבר בסוגריים
  - תמיד עם דוגמא קונקרטית ("כשלקוח כותב X, הבוט עונה Y")
  - השתמש ב-emojis צבעוניים (🔴🟠🟡🟢) לסימון רמת דחיפות

### Layer 2 (Technical)
- **שפה:** עברית-אנגלית מעורבת. IDs באנגלית, הסברים בעברית
- **טון:** טכני-מבצעי, כמו spec
- **כללים:**
  - JSON תמיד formatted
  - שמות מודולים בדיוק כמו ב-Make
  - Mermaid diagrams לכל ארכיטקטורה

---

## Cross-skill behavior

- אם אין `bot-spec` או `make-blueprint` — אזהרה: "מסמך מסירה ללא תיעוד טכני קודם יהיה חלקי"
- בסיום, הצע: *"המסמך מוכן. הצעדים הבאים:*
  1. *להעביר ללקוח לאישור (חתימה דיגיטלית או בוואטסאפ)*
  2. *לשמור עותק חתום ב-Drive ובמייל*
  3. *להגדיר תזכורת ב-Cal.com לפגישת רענון בעוד 6 חודשים* (לבדוק שהמסמך עדיין רלוונטי)"
- אם הלקוח עובר ל-tier "ללא" — שלח את המסמך ב-PDF (יותר רשמי, מציין סוף סקופ)

---

## File structure

```
handover-doc/
├── SKILL.md
├── templates/
│   ├── handover-base.md
│   ├── support-tiers.md                  # הגדרות tier מפורטות
│   ├── runbook-snippets/
│   │   ├── bot-not-responding.md         # 🔴 לכל סוג שירות
│   │   ├── wrong-answer.md               # 🟠
│   │   ├── booking-issue.md              # 🟡
│   │   └── content-update-request.md     # 🟢
│   └── credentials-templates/
│       ├── whatsapp-credentials.md
│       ├── airtable-credentials.md
│       ├── ai-credentials.md
│       └── calendar-credentials.md
└── examples/
    ├── financial-house-2025-01/
    └── shay-ovadia-2025-02/
```

---

## ⚠️ Anti-patterns (אסור ב-handover של AutoWise)

- ❌ **סיסמאות במסמך** — לעולם לא, גם לא בנספח. רק שמות חיבורים ואיפה הם נמצאים
- ❌ **בלי הגדרת tier** — מבטיח שאתה הופך לתמיכה חינם
- ❌ **טכני בלבד** — הלקוח לא יוכל להשתמש במסמך
- ❌ **תפעולי בלבד** — מפתח עתידי לא יוכל לרשת
- ❌ **בלי "מה לא כלול"** — סקופ קריפ מובטח
- ❌ **בלי baseline performance** — אי אפשר לדעת אם הבוט "עובד טוב" או "התדרדר"
- ❌ **בלי future improvements section** — מפסידים אופציה למכירה חוזרת
- ❌ **חתימה חסרה** — בלי חתימה אין סוף לפרויקט המקורי, אין הצדקה ל-tier מנותק

---

## 💡 Pro tips ספציפיים ל-AutoWise

1. **שלח את המסמך 3 ימים לפני סוף חודש התמיכה הראשון.** זה נותן ללקוח זמן להבין שמשהו משתנה, ופותח שיחה על tier.
2. **תמיד פגישת מסירה אישית של 30 דקות** — לא רק שולחים מסמך. זה הרגע למכור tier מורחב.
3. **גרסה חיה — לא קפואה.** המסמך מתעדכן עם כל שינוי (v2, v3...). תאריך עדכון תמיד למעלה.
4. **שמור עותק לעצמך** — 6 חודשים אחר כך, אם הלקוח חוזר עם בעיה, המסמך הוא הזיכרון שלך.
5. **המלצה אגרסיבית למסלול בסיסי לפחות** — לקוחות שיוצאים ל"ללא" נוטים לחזור עם תקלות "דחופות" שלא נוח לסרב להן. עדיף ₪400/חודש מובטחים.
6. **רוב לקוחות AutoWise בוחרים בסיסי או מורחב.** פרימיום מתאים רק ל-{insurance-agent / sales-agent בנפח גבוה}.
7. **כשעוזב לגמרי לקוח (tier "ללא"):** הוסף 90 יום warranty על תקלות שנובעות מבנייה מקורית. זה מקצועי ומגן.
