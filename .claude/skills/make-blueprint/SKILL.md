---
name: make-blueprint
description: Use this skill when Ariel (AutoWise AI) is planning a Make.com scenario before building it — to map modules, data flow, error handling, and webhooks ahead of time so the build itself goes fast. Triggers include "Make scenario", "תרחיש Make", "אינטגרציה", "blueprint", "תכנון אוטומציה", "תרחיש לפני בנייה", or when bot-spec / conversation-flow outputs need to be turned into a buildable Make scenario plan. The skill consumes function definitions from bot-spec, function calls from conversation-flow, and produces a single Hebrew RTL Make blueprint document containing: scenario metadata, trigger definition, module-by-module list with exact app names and settings, data mappings table, error handling matrix, webhook URLs strategy, and Israeli-locale operational defaults (timezone, working hours, retry policy). Output is calibrated for AutoWise's standard stack (WhatsApp Business via 360dialog/GreenAPI, Airtable, Fillout, Cal.com, Stripe). Do NOT use for full bot specs (use bot-spec), conversation flow design (use conversation-flow), system prompts (use system-prompt), or QA testing (use bot-qa).
---

# Make Blueprint — AutoWise AI

המטרה: לתכנן תרחיש Make.com **לפני** שפותחים את Make. לצאת עם מסמך שמכיל את כל מה שצריך — מודולים, חיבורים, mappings, error handling — כך שהבנייה עצמה תיקח חצי מהזמן.

---

## When to use this skill

- יש `bot-spec` ו-`conversation-flow` מאושרים — מוכנים לתכנון תרחיש
- צריך לתכנן אינטגרציה חדשה (לקוח קיים מבקש להוסיף מודול)
- ביטויים: "Make", "תרחיש", "blueprint", "scenario", "תכנון אוטומציה"
- צריך להעריך מספר operations / מורכבות לפני תמחור

## When NOT to use

- לאפיון בוט → `bot-spec`
- לעיצוב flow → `conversation-flow`
- לכתיבת prompt → `system-prompt`
- לקובץ JSON גולמי של Make blueprint לייבוא — Make מייצא את זה אוטומטית. הסקיל הזה מתכנן, לא מייצר JSON.

---

## Inputs

### חובה
- שם תרחיש (תיאורי, באנגלית: `whatsapp-lead-qualification`)
- שירות מקטלוג AutoWise

### מומלץ מאוד
- `bot-spec-{client}.md` — חולצים: AI tools schema, data model, integrations diagram
- `flow-{client}-*.md` — חולצים: function calls, fallback matrix
- ספק WhatsApp שנבחר (360dialog / GreenAPI / Twilio / WATI)
- מספר משוער של פניות בחודש (לחישוב operations)

---

## AutoWise standard stack — Make modules cheatsheet

| יעד | App ב-Make | מודול ראשי | הערות |
|---|---|---|---|
| **WhatsApp In** | 360dialog / GreenAPI / Custom Webhook | `Watch Webhooks` | בחירת ספק = החלטה ארכיטקטונית. ראה למטה |
| **WhatsApp Out** | 360dialog / GreenAPI / HTTP | `Send a Message` | תמיד להגדיר `template_namespace` ל-templates |
| **AI** | Anthropic Claude / OpenAI | `Create a Chat Completion` | להגדיר `temperature: 0.5` ו-`max_tokens: 500` |
| **Airtable** | Airtable | `Search Records` / `Create a Record` / `Update a Record` | תמיד עם `Use Field IDs: yes` |
| **Fillout** | Fillout / Webhook | `Watch Submissions` | חלופה: webhook מ-Fillout ישיר |
| **Cal.com** | Cal.com / HTTP | `Get Available Slots` / `Book` | אין app רשמי — דרך HTTP מודול |
| **Google Calendar** | Google Calendar | `Create an Event` / `List Events` | אזור זמן: `Asia/Jerusalem` חובה |
| **Stripe** | Stripe | `Create a Payment Link` | לעולם לא לאסוף פרטי כרטיס בצ'אט |
| **PayPal** | PayPal | `Create an Invoice` | חלופה ישראלית: Bit / Paybox דרך HTTP |
| **Email** | Gmail / SMTP | `Send an Email` | להתראות פנימיות בלבד |
| **Logging** | Airtable / Google Sheets | `Create a Record` | **חובה לכל תרחיש** — `scenario_logs` table |
| **Error notifier** | WhatsApp / Email | `Send a Message` | להתראה לאריאל בכל error path |

---

## WhatsApp provider decision matrix

ההחלטה הראשונה והכי חשובה. תיעוד חובה ב-blueprint.

| קריטריון | 360dialog | GreenAPI | WATI | Twilio |
|---|---|---|---|---|
| מחיר חודשי | ~$50 + per-message | ~$30 שטוח | ~$40 + per-message | יקר |
| קלות הקמה | בינונית (Meta verification) | קלה (חיבור QR) | קלה | בינונית |
| Templates רשמיים | ✅ דרך Meta | ❌ | ✅ | ✅ |
| יציבות לפרודקשן | מצוינת | טובה (תלוי טלפון) | מצוינת | מצוינת |
| Make integration | ⚠️ דרך HTTP | ✅ app רשמי | ⚠️ דרך HTTP | ✅ app רשמי |
| **מומלץ ל-** | לקוחות גדולים, בוטי שירות בנפח | MVP, לקוחות קטנים, עסקים פרטיים | sales agents שצריך טמפלטים | פרויקטים בינלאומיים |

**ברירת מחדל ל-AutoWise:** GreenAPI ל-MVP, 360dialog ללקוחות פרודקשן רציני.

---

## Process

### Step 1 — Define scenario boundaries
- מה ה-trigger? (webhook נכנס / cron / טופס)
- מה ה-end state? (תיעוד ב-Airtable / שליחת WhatsApp / יצירת תשלום)
- כמה תרחישים? **כלל אצבע: תרחיש אחד לכל UC ב-spec**, לא יותר.

### Step 2 — Pick WhatsApp provider
מטריצה למעלה. תיעד החלטה ב-blueprint.

### Step 3 — Map modules in order
לכל מודול ב-flow:
- מספר רץ (`#1`, `#2`, ...)
- סוג: trigger / action / filter / router / aggregator
- App + שם המודול הספציפי
- Inputs נדרשים
- Outputs לשלב הבא
- הגדרות מיוחדות

### Step 4 — Build data mappings table
טבלה אחת מרכזית: לכל שדה שמועבר בין מודולים — מאיפה לאן ובאיזה פורמט.

### Step 5 — Plan error handling
לכל מודול שיכול להיכשל (HTTP, AI, Airtable, סליקה):
- מה קורה אם נכשל
- כמה retries
- לאן הולכת ההודעה אם הכל נכשל

### Step 6 — Estimate operations
חישוב גס של operations חודשיים (לתמחור Make + ללקוח):
- כמות trigger executions בחודש
- מודולים ממוצעים לכל execution
- סה״כ ops × מחיר Make plan

### Step 7 — Compile blueprint
פלט אחד: `make-blueprint-{scenario-name}-{YYYY-MM-DD}.md`

---

## Output — `make-blueprint-{scenario-name}-{YYYY-MM-DD}.md`

````markdown
# Make Blueprint: {scenario name}
*{שם לקוח} · {תאריך} · גרסה {N}*

> **מבוסס על:** bot-spec-{client}-v{N}.md, flow-{client}-{uc}.md
> **WhatsApp Provider:** {GreenAPI / 360dialog / ...}
> **Make plan נדרש:** {Free / Core / Pro / Teams}
> **משוער ops/חודש:** {מספר}

---

## 1. סקירה במשפט אחד
{מה התרחיש עושה — קלט → פלט}

## 2. Trigger

**סוג:** {Webhook / Schedule / Watch}
**App:** {GreenAPI / 360dialog / ...}
**Module:** `Watch Webhooks`

**Webhook URL:** ייווצר ב-Make בעת בנייה. רישום ב:
- [ ] WhatsApp provider dashboard
- [ ] תיעוד פנימי

**מבנה הקלט הצפוי (JSON):**
```json
{
  "from": "+972XXXXXXXXX",
  "text": "string",
  "timestamp": "ISO 8601",
  "message_id": "string"
}
```

## 3. Module list

### Module #1 — Webhook trigger
- **App:** GreenAPI
- **Action:** Watch Webhooks
- **Output:** raw message + sender

### Module #2 — Filter: Skip groups & status
- **Type:** Filter
- **Condition:** `from` does not contain `@g.us` AND `from` does not contain `status`
- **למה:** הודעות מקבוצות ו-status מגיעות מהלקוח אבל לא מצריכות תגובה

### Module #3 — Airtable: Search/Create lead
- **App:** Airtable
- **Action:** Search Records
- **Table:** `leads`
- **Filter formula:** `{phone_e164} = "{{1.from}}"`
- **אם ריק → סעיף 3a**
- **אם נמצא → סעיף 4**

### Module #3a — Airtable: Create new lead
- **App:** Airtable
- **Action:** Create a Record
- **Table:** `leads`
- **Fields:**
  - `phone_e164` ← `{{1.from}}`
  - `status` ← `"new"`
  - `first_message_text` ← `{{1.text}}`
  - `created_at` ← `{{now}}`

### Module #4 — Airtable: Get conversation history
- **App:** Airtable
- **Action:** Search Records
- **Table:** `conversations`
- **Filter:** `{lead_id} = "{{3.id}}"` AND `{created_at}` within last 24h
- **Sort:** `created_at` ASC
- **Max records:** 20

### Module #5 — Iterator (build context)
- **Type:** Iterator
- **Input:** `{{4.records}}`
- **Output:** array of `{role, content}` ready for AI

### Module #6 — Anthropic Claude: Chat completion
- **App:** Anthropic Claude
- **Action:** Create a Chat Completion
- **Model:** `claude-sonnet-4-7`
- **Temperature:** 0.5
- **Max tokens:** 500
- **System message:** {הדבק מ-`system-prompt-{client}.md`}
- **Messages:** `{{5.array}}` + new user message `{{1.text}}`
- **Tools:** {רשימת function calls מ-spec}

### Module #7 — Router: Tool call vs text response
- **Type:** Router
- **Route A:** AI returned tool_use → סעיף 8
- **Route B:** AI returned text → סעיף 9

### Module #8 — HTTP / App calls (per tool)
- מודול ייעודי לכל function call:
  - `book_appointment` → Cal.com HTTP module
  - `qualify_lead` → Airtable Update Record
  - `escalate_to_human` → WhatsApp send to Ariel + Airtable update

### Module #9 — WhatsApp: Send response
- **App:** GreenAPI
- **Action:** Send a Message
- **To:** `{{1.from}}`
- **Body:** `{{6.text}}`

### Module #10 — Airtable: Log conversation
- **App:** Airtable
- **Action:** Create a Record
- **Table:** `conversations`
- **Fields:**
  - `lead_id` ← `{{3.id}}`
  - `direction` ← inbound (rec #1) / outbound (rec #2)
  - `content` ← {{1.text}} / {{6.text}}
  - `created_at` ← `{{now}}`

(... המשך לכל המודולים ...)

## 4. Data mappings table

| שדה | מקור (Module #) | יעד (Module #) | טרנספורמציה |
|---|---|---|---|
| phone | #1 from | #3 phone_e164 | `formatNumber(from, "E164")` |
| message text | #1 text | #6 user message | none |
| AI response | #6 text | #9 body, #10 content | trim, max 1600 chars |
| timestamp | system | #3a, #10 | `now()` in Asia/Jerusalem |
| lead_id | #3 records[0].id | #4, #10 | none |

## 5. Error handling matrix

| מודול | כשל אפשרי | טיפול | retry policy |
|---|---|---|---|
| #1 Webhook | מבנה לא צפוי | Filter → log to errors table → exit | אין retry |
| #3 Airtable | rate limit | Built-in retry | 3 retries, exp backoff |
| #6 Claude | API down | Fallback message: "רגע אחד..." → retry × 2 → handoff | 2 retries, 5 sec interval |
| #6 Claude | tool_use validation error | Log + handoff | אין retry |
| #8 Cal.com | אין זמינות | החזר ל-#6 עם system message: "no availability" | אין retry |
| #9 WhatsApp send | message blocked | Log + email לאריאל | 1 retry |
| **כל מודול** | timeout >40 sec | Make built-in error → log + handoff | מותאם |

**Error notification flow:**
```
Any unhandled error
  → Module: Send WhatsApp to Ariel (+972546242468)
  → Body: "שגיאה בתרחיש {scenario_name}: {error_message}"
  → Module: Log to Airtable `errors` table
```

## 6. Operations estimate

**הנחות:**
- {X} פניות חודשיות
- ממוצע {Y} הודעות לשיחה
- {Z}% מהשיחות מגיעות ל-handoff (פחות modules)

**חישוב:**
- Trigger executions: X × Y = {N} ops
- Modules per execution (ממוצע): ~10
- **סה"כ ops/חודש: ~{N × 10}**

**Make plan recommendation:**
- < 10K ops/חודש → Free / Core
- 10K-40K ops/חודש → Core / Pro
- 40K+ ops/חודש → Pro / Teams

## 7. Israeli locale operational defaults

- **Timezone:** `Asia/Jerusalem` בכל מודול תאריך
- **Working hours filter (אופציונלי):**
  - Module: Filter — שעות פעילות (08:00-22:00, א'-ה')
  - מחוץ לשעות → תגובה אוטומטית: "אני זמין שוב מ-08:00 בבוקר"
- **חגים:** רשימה ב-`{client}_holidays` Airtable table; Filter בכל cron-based scenario
- **שבת:** scenarios שמורידים פעילות 17:00 שישי - 21:00 שבת (אם הלקוח דתי)

## 8. Connections checklist (לפני בנייה)

- [ ] חיבור GreenAPI / 360dialog ב-Make (טוקן + URL)
- [ ] חיבור Anthropic / OpenAI (API key)
- [ ] חיבור Airtable (Personal Access Token + base ID)
- [ ] חיבור Cal.com (API key + event type IDs)
- [ ] חיבור Gmail / SMTP (להתראות)
- [ ] webhook URL נרשם ב-WhatsApp provider
- [ ] Airtable: טבלאות `leads`, `conversations`, `errors`, `appointments` קיימות

## 9. Build order recommendation

לבנייה מהירה ב-Make:
1. **קודם — Trigger + Filter** (לוודא שהודעות מגיעות)
2. **Airtable basics** (search/create lead)
3. **AI module** (test + system prompt + tools schema)
4. **WhatsApp send back** (סגירת הלולאה — בוט עונה!)
5. **Tool routing + handlers** (booking, escalation)
6. **Logging** (conversations + errors tables)
7. **Error handlers** (לכל מודול — error route)
8. **Working hours filter** (אם רלוונטי)
9. **Test E2E** עם 3 ה-test prompts מ-`system-prompt`

## 10. Open questions לפני בנייה

- [ ] {שאלה ספציפית לפרויקט}
- [ ] WhatsApp Business Account verified ב-Meta? (ל-360dialog)
- [ ] Airtable plan מספק לכמות הרשומות הצפויה?
- [ ] AI model approved ע״י הלקוח? (תקציב tokens)
````

---

## Tone & language rules

- **שפה במסמך:** עברית בעיקר. אנגלית ל-IDs, שמות מודולים, ושמות שדות
- **קונקרטיות:** כל מודול עם שם המודול המדויק כפי שמופיע ב-Make (לא "Airtable" אלא "Search Records")
- **טון:** טכני-מבצעי. המסמך נקרא תוך כדי בנייה
- **JSON:** תמיד formatted, לא inline
- **כפתורי checkbox:** השתמש ב-`- [ ]` ל-checklists לתפעול

---

## Cross-skill behavior

- בסיום, הצע: *"ה-blueprint מוכן. הצעדים הבאים:*
  1. *להריץ `bot-qa` לבניית checklist בדיקות E2E מבוסס על המודולים*
  2. *להתחיל בנייה ב-Make לפי build order (סעיף 9)*
  3. *לרוץ על Connections checklist (סעיף 8) לפני שנכנסים ל-Make*"
- אם אין `bot-spec` או `flow` — סרב והפנה
- אם הלקוח לא בחר ספק WhatsApp — תן את המטריצה ובקש החלטה לפני המשך

---

## File structure

```
make-blueprint/
├── SKILL.md
├── templates/
│   ├── blueprint-base.md
│   ├── module-snippets/
│   │   ├── whatsapp-greenapi-trigger.md
│   │   ├── whatsapp-360dialog-trigger.md
│   │   ├── airtable-lead-upsert.md
│   │   ├── claude-with-tools.md
│   │   ├── error-notifier.md
│   │   └── working-hours-filter.md
│   └── data-models/
│       ├── airtable-leads-base.md
│       ├── airtable-conversations-base.md
│       └── airtable-errors-base.md
└── examples/
    ├── financial-house-2025-01/
    └── shay-ovadia-funnel-2025-02/
```

---

## ⚠️ Anti-patterns (אסור ב-blueprint של AutoWise)

- ❌ **תרחיש ענק** שמטפל ב-3 UCs בלי router — מקשה debug
- ❌ **בלי error handler** על מודול חיצוני (HTTP, AI, סליקה)
- ❌ **בלי לוגינג** של שיחות — לא ניתן לבדוק מה הבוט עשה
- ❌ **לאחסן API keys ב-modules ישירות** במקום ב-Connections
- ❌ **Iterator בלי Aggregator** — נשבר Make
- ❌ **הנחה שהלקוח שלח E.164** — תמיד נרמל
- ❌ **לא להגדיר timezone** במודולי תאריך — Make יסתבך
- ❌ **WhatsApp send בלי template** — Meta יחסום אחרי 24h של שתיקה מהלקוח
- ❌ **Airtable Update בלי search קודם** — יצור duplicates
- ❌ **בלי "kill switch"** — תמיד שמור משתנה גלובלי `bot_enabled` שאתה יכול לכבות מבחוץ

---

## 💡 Pro tips ספציפיים ל-AutoWise

1. **Data Store מרכזי ב-Make** לקבועים: `system_prompt`, `bot_enabled`, `business_hours`. זה חוסך עדכון ב-10 מקומות
2. **תרחישים מקבילים מסונכרנים:** scenario ראשי + scenario "scheduled cleanup" שמריץ פעם בלילה
3. **Versioning של scenarios:** שמור clone של תרחיש לפני שינוי גדול. Make לא נותן undo טוב
4. **Webhook queue:** ב-trigger, סמן "Process all incoming messages" ו-"Maximum number of results: 1" — מונע race conditions
5. **Airtable כ-source of truth:** כל החלטה לוגית של הבוט תתועד שם. גם אם בנית ב-Data Store, סנכרן ל-Airtable
6. **Make scenarios = production code:** תיעוד שינויים ב-Airtable `changelog` table — מציל חיים בעוד 6 חודשים
