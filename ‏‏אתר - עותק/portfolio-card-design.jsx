/**
 * PortfolioCard — Design Reference
 * React + Tailwind CSS + Framer Motion
 * Hebrew RTL · Dark Mode · Glassmorphism
 *
 * Dependencies:
 *   npm install framer-motion
 *   (Tailwind CSS v3+ configured in project)
 *
 * Usage:
 *   import PortfolioSection from './portfolio-card-design';
 *   <PortfolioSection />
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */

const CHAT = [
  { id: 1, from: 'customer', text: 'שלום, אשמח לפתוח קופת גמל', time: '09:01' },
  { id: 2, from: 'bot',      text: '👋 שלום!\nשלח שם מלא + ת.ז. בבקשה', time: '09:01' },
  { id: 3, from: 'customer', text: 'יוסי כהן, 054-1234567', time: '09:02' },
  { id: 4, from: 'bot',      text: '✅ מצוין יוסי!\nשולח לינק לחתימה דיגיטלית 👇', time: '09:03' },
  { id: 5, from: 'customer', text: 'חתמתי! ✔️', time: '09:04' },
  { id: 6, from: 'bot',      text: '🎉 קופת הגמל נפתחה!\n⏱️ סה״כ: 4 דקות בלבד', time: '09:05', success: true },
];

const BADGES = [
  {
    emoji: '⚡', main: '85%', sub: 'חיסכון בזמן',
    border: 'rgba(251,191,36,0.35)', bg: 'rgba(251,191,36,0.08)', color: 'rgb(253,230,138)',
  },
  {
    emoji: '🧠', main: 'AI רגשי', sub: 'אמפתיה',
    border: 'rgba(167,139,250,0.35)', bg: 'rgba(167,139,250,0.08)', color: 'rgb(221,214,254)',
  },
  {
    emoji: '✅', main: '4,000+', sub: 'הצלחות',
    border: 'rgba(52,211,153,0.35)', bg: 'rgba(52,211,153,0.08)', color: 'rgb(167,243,208)',
  },
];

const TECH = [
  { name: 'WhatsApp',  icon: '💬', bg: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.3)',  color: 'rgb(134,239,172)' },
  { name: 'Make.com',  icon: '⚙️', bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', color: 'rgb(216,180,254)' },
  { name: 'Airtable',  icon: '🗃️', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', color: 'rgb(147,197,253)' },
  { name: 'G-Calendar',icon: '📅', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', color: 'rgb(253,186,116)' },
];

const MODAL_STATS = [
  { icon: '⏱️', num: '30→4',  label: 'דקות לפתיחת קופה' },
  { icon: '💬', num: '4,000+', label: 'הודעות טופלו' },
  { icon: '📈', num: '85%',    label: 'חיסכון בזמן' },
];

const FLOW = [
  { label: 'לקוח שולח הודעה',     icon: '💬' },
  { label: 'AI מזהה כוונה + רגש', icon: '🧠' },
  { label: 'שליחת טופס / וידאו',  icon: '📋' },
  { label: 'חתימה דיגיטלית',      icon: '✍️' },
  { label: 'CRM + יומן מתעדכן',   icon: '🔄' },
  { label: 'קופת גמל נפתחת ✓',    icon: '🎉' },
];

const TEAL = '#5BC0D3';
const NAVY = '#0d1228';

/* ══════════════════════════════════════════════════════
   PHONE MOCKUP
══════════════════════════════════════════════════════ */

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div
        className="rounded-2xl rounded-bl-none px-3 py-2 flex gap-1 items-center"
        style={{ background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.12)' }}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block w-[5px] h-[5px] rounded-full bg-gray-400"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatBubble({ msg }) {
  const isCustomer = msg.from === 'customer';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
      dir="rtl"
    >
      <div
        className="max-w-[82%] rounded-2xl px-2.5 py-1.5 text-[9.5px] leading-[1.5]"
        style={{
          background: isCustomer ? '#dcf8c6' : '#fff',
          borderBottomRightRadius: isCustomer ? '4px' : undefined,
          borderBottomLeftRadius: !isCustomer ? '4px' : undefined,
          boxShadow: msg.success
            ? '0 1px 2px rgba(0,0,0,0.1), 0 0 0 1.5px rgba(52,211,153,0.4)'
            : '0 1px 2px rgba(0,0,0,0.08)',
          color: '#1a1a1a',
        }}
      >
        <p className="whitespace-pre-line font-medium">{msg.text}</p>
        <p
          className="text-[7.5px] mt-0.5"
          style={{
            color: '#999',
            textAlign: isCustomer ? 'left' : 'right',
          }}
        >
          {msg.time}{isCustomer ? ' ✓✓' : ''}
        </p>
      </div>
    </motion.div>
  );
}

function PhoneMockup() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const chatRef = useRef(null);

  // Animate through messages, then reset
  useEffect(() => {
    let t1, t2;

    if (visibleCount >= CHAT.length) {
      // All shown — reset after pause
      t1 = setTimeout(() => setVisibleCount(0), 4200);
      return () => clearTimeout(t1);
    }

    if (visibleCount === 0) {
      // Initial pause before first message
      t1 = setTimeout(() => setVisibleCount(1), 600);
      return () => clearTimeout(t1);
    }

    // Next message to show is CHAT[visibleCount]
    const next = CHAT[visibleCount];
    if (next.from === 'bot') {
      setShowTyping(true);
      t1 = setTimeout(() => setShowTyping(false), 950);
      t2 = setTimeout(() => setVisibleCount(v => v + 1), 1150);
    } else {
      t1 = setTimeout(() => setVisibleCount(v => v + 1), 700);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visibleCount]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleCount, showTyping]);

  return (
    <div className="relative flex-shrink-0" dir="ltr">
      {/* Ambient glow behind phone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(91,192,211,0.12) 0%, transparent 70%)`,
          transform: 'scale(1.4)',
        }}
      />

      {/* Phone outer frame */}
      <div
        className="relative"
        style={{
          width: '192px',
          height: '388px',
          borderRadius: '40px',
          background: 'linear-gradient(160deg, #55556a 0%, #2a2a3a 50%, #1a1a28 100%)',
          padding: '3px',
          boxShadow: '0 32px 72px -10px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        {/* Volume & power buttons */}
        <div
          className="absolute"
          style={{ right: '-4px', top: '72px', width: '4px', height: '28px', borderRadius: '0 4px 4px 0', background: '#444' }}
        />
        <div
          className="absolute"
          style={{ left: '-4px', top: '62px', width: '4px', height: '22px', borderRadius: '4px 0 0 4px', background: '#444' }}
        />
        <div
          className="absolute"
          style={{ left: '-4px', top: '90px', width: '4px', height: '22px', borderRadius: '4px 0 0 4px', background: '#444' }}
        />

        {/* Screen */}
        <div
          className="w-full h-full overflow-hidden flex flex-col"
          style={{ borderRadius: '37px', background: '#e5ddd5' }}
        >
          {/* Status bar with dynamic island */}
          <div className="relative flex-shrink-0" style={{ background: '#075e54', paddingTop: '16px' }}>
            <div
              className="absolute left-1/2"
              style={{
                top: '4px',
                width: '56px',
                height: '14px',
                borderRadius: '8px',
                background: '#000',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            />
          </div>

          {/* WhatsApp header */}
          <div
            className="flex items-center gap-2 px-2.5 pb-2 pt-1 flex-shrink-0"
            style={{ background: '#075e54' }}
          >
            <span className="text-white/70 text-xs">‹</span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${TEAL}, ${NAVY})` }}
            >
              ב
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[10px] font-bold truncate">בית פיננסי</div>
              <div className="text-[7.5px] flex items-center gap-1" style={{ color: '#9ee' }}>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: '#4ade80', animation: 'pulse 2s infinite' }}
                />
                bot מחובר
              </div>
            </div>
            <div className="text-white/55 text-[11px] flex gap-1.5">📹 ☎</div>
          </div>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='15' cy='15' r='4' fill='%23b0b0a0' fill-opacity='0.08'/%3E%3Ccircle cx='45' cy='45' r='4' fill='%23b0b0a0' fill-opacity='0.08'/%3E%3C/svg%3E")`,
              scrollbarWidth: 'none',
            }}
          >
            {/* Date chip */}
            <div className="text-center mb-0.5">
              <span
                className="text-[7.5px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.1)', color: '#666' }}
              >
                היום
              </span>
            </div>

            {CHAT.slice(0, visibleCount).map(msg => (
              <ChatBubble key={msg.id} msg={msg} />
            ))}
            {showTyping && <TypingDots />}
          </div>

          {/* Input bar */}
          <div
            className="flex items-center gap-1.5 p-1.5 flex-shrink-0"
            style={{ background: '#f0f0f0' }}
            dir="rtl"
          >
            <div
              className="flex-1 text-[8px] px-2.5 py-1 rounded-full"
              style={{
                background: '#fff',
                color: '#bbb',
                border: '1px solid #e0e0e0',
              }}
            >
              הקלד הודעה...
            </div>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#075e54', color: '#fff', fontSize: '9px' }}
            >
              ◀
            </div>
          </div>
        </div>
      </div>

      {/* Floating: time saved badge */}
      <motion.div
        initial={{ opacity: 0, x: 24, scale: 0.7 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 260, damping: 22 }}
        className="absolute text-center"
        style={{
          left: '-44px',
          top: '56px',
          background: '#fff',
          borderRadius: '16px',
          padding: '8px 12px',
          boxShadow: '0 8px 28px -4px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.06)',
          minWidth: '60px',
        }}
        dir="rtl"
      >
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#111', lineHeight: 1 }}>4</div>
        <div style={{ fontSize: '8px', fontWeight: 700, color: '#444', lineHeight: 1.2 }}>דקות בלבד</div>
        <div style={{ fontSize: '7px', color: '#aaa', textDecoration: 'line-through' }}>30 דקות</div>
      </motion.div>

      {/* Floating: success badge */}
      <AnimatePresence>
        {visibleCount >= CHAT.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="absolute"
            style={{
              right: '-36px',
              bottom: '72px',
              background: '#22c55e',
              color: '#fff',
              fontSize: '9px',
              fontWeight: 700,
              borderRadius: '12px',
              padding: '6px 10px',
              boxShadow: '0 6px 20px -4px rgba(34,197,94,0.5)',
              whiteSpace: 'nowrap',
            }}
            dir="rtl"
          >
            ✅ פתיחה מוצלחת!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CASE STUDY MODAL
══════════════════════════════════════════════════════ */

function FlowDiagram() {
  return (
    <div className="flex flex-wrap gap-2 items-center" dir="rtl">
      {FLOW.map((node, i) => (
        <React.Fragment key={node.label}>
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 + 0.25, type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <span>{node.icon}</span>
            <span>{node.label}</span>
          </motion.div>
          {i < FLOW.length - 1 && (
            <span style={{ color: `${TEAL}80`, fontSize: '12px', fontWeight: 700 }}>←</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function CaseStudyModal({ onClose }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,0.78)' }}
        onClick={onClose}
      >
        {/* Modal panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 36, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          className="relative w-full overflow-y-auto"
          style={{
            maxWidth: '640px',
            maxHeight: '92vh',
            borderRadius: '28px',
            background: 'linear-gradient(160deg, #131a3a 0%, #0d1228 55%, #090e20 100%)',
            border: '1px solid rgba(255,255,255,0.11)',
            boxShadow: '0 48px 96px -20px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.07)',
            padding: '24px',
            scrollbarWidth: 'none',
          }}
          dir="rtl"
          onClick={e => e.stopPropagation()}
        >
          {/* Close btn */}
          <motion.button
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.14)' }}
            whileTap={{ scale: 0.94 }}
            onClick={onClose}
            className="absolute flex items-center justify-center"
            style={{
              top: '16px',
              left: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            ✕
          </motion.button>

          {/* ─── Header ─── */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="flex-shrink-0 flex items-center justify-center text-2xl"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '18px',
                background: `linear-gradient(135deg, rgba(91,192,211,0.22), rgba(37,46,98,0.38))`,
                border: `1px solid rgba(91,192,211,0.28)`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              💰
            </div>
            <div>
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: TEAL }}
              >
                ✦ סיפור הצלחה
              </div>
              <h3 className="text-white text-xl font-black leading-tight">
                בית פיננסי למשפחה
              </h3>
              <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                פיננסים · WhatsApp AI · אוטומציה מלאה
              </p>
            </div>
          </div>

          {/* ─── Quote ─── */}
          <div
            className="relative rounded-2xl p-4 mb-5"
            style={{
              background: `linear-gradient(135deg, rgba(91,192,211,0.08) 0%, rgba(91,192,211,0.03) 100%)`,
              border: `1px solid rgba(91,192,211,0.18)`,
            }}
          >
            <div
              className="absolute select-none"
              style={{
                top: '8px',
                right: '16px',
                fontSize: '56px',
                lineHeight: 1,
                color: `rgba(91,192,211,0.18)`,
                fontFamily: 'Georgia, serif',
              }}
              aria-hidden="true"
            >
              "
            </div>
            <blockquote
              className="relative text-sm leading-[1.75] font-medium"
              style={{ color: 'rgba(255,255,255,0.8)', paddingRight: '8px' }}
            >
              "הבוט לא רק חסך לנו זמן — הוא נותן לי{' '}
              <span style={{ color: TEAL }}>שקט נפשי כבעל עסק</span>.
              אפילו כשלקוח מגיע עם תסכול, הוא עונה בסבלנות ואמפתיה."
            </blockquote>
            <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.32)', paddingRight: '8px' }}>
              — בעל העסק, בית פיננסי למשפחה
            </div>
          </div>

          {/* ─── Video placeholder ─── */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative rounded-2xl overflow-hidden mb-5 cursor-pointer group"
            style={{
              aspectRatio: '16/9',
              background: 'rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, rgba(91,192,211,0.10) 0%, rgba(37,46,98,0.18) 100%)`,
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <motion.div
                whileHover={{ scale: 1.12 }}
                className="flex items-center justify-center"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.10)',
                  border: '2px solid rgba(255,255,255,0.28)',
                  backdropFilter: 'blur(4px)',
                  fontSize: '24px',
                  color: '#fff',
                }}
              >
                ▶
              </motion.div>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                סרטון דמו · 2:30 דקות
              </span>
            </div>
            <div
              className="absolute bottom-3 left-3 text-[10px]"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              [הטמע וידאו כאן]
            </div>
          </motion.div>

          {/* ─── Stats ─── */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {MODAL_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.15 }}
                className="rounded-2xl p-3 text-center"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-white font-black text-base leading-none">{s.num}</div>
                <div
                  className="text-[10px] mt-1 leading-tight"
                  style={{ color: 'rgba(255,255,255,0.42)' }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─── Engineering section ─── */}
          <div
            className="rounded-2xl p-4 mb-5"
            style={{
              background: 'rgba(10,14,35,0.85)',
              border: `1px solid rgba(91,192,211,0.14)`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'rgba(91,192,211,0.12)',
                  border: '1px solid rgba(91,192,211,0.25)',
                  fontSize: '14px',
                }}
              >
                ⚙️
              </div>
              <h4 className="text-white font-bold text-sm">הזווית ההנדסית</h4>
              <span
                className="text-[9px] font-mono px-2 py-0.5 rounded"
                style={{
                  color: 'rgba(91,192,211,0.65)',
                  background: 'rgba(91,192,211,0.07)',
                  border: '1px solid rgba(91,192,211,0.14)',
                }}
              >
                Engineering Perspective
              </span>
            </div>
            <p
              className="text-xs leading-[1.8] mb-4"
              style={{ color: 'rgba(255,255,255,0.52)' }}
            >
              אופיינו מראש{' '}
              <span style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 600 }}>12 מקרי קצה</span>
              {' '}— לקוח כועס, שגיאת ת.ז., ניתוק ditengah תהליך, ועוד. כל מקרה מטופל עם לוגיקת fallback
              ייעודית. הארכיטקטורה תוכננה כ-DAG (Directed Acyclic Graph) למניעת לולאות אינסופיות.
            </p>
            <FlowDiagram />
          </div>

          {/* ─── Tech stack ─── */}
          <div className="mb-5">
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              סטק טכנולוגי
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH.map(t => (
                <motion.span
                  key={t.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    color: t.color,
                  }}
                >
                  {t.icon} {t.name}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ─── CTA ─── */}
          <div
            className="flex gap-3 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <motion.a
              href="https://wa.me/972552520893?text=%D7%94%D7%AA%D7%97%D7%9C"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: `0 10px 28px -6px rgba(91,192,211,0.45)` }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 font-black text-sm py-3 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${TEAL}, #4ab4c5)`,
                color: NAVY,
                boxShadow: `0 6px 20px -6px rgba(91,192,211,0.3)`,
              }}
            >
              💬 נסו את הדמו
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02, color: '#fff' }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-medium"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.55)',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >
              סגירה
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════
   PORTFOLIO CARD  (Grid / collapsed view)
══════════════════════════════════════════════════════ */

function PortfolioCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -5 }}
        className="relative overflow-hidden"
        style={{
          borderRadius: '28px',
          padding: '24px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(22px)',
          border: '1px solid rgba(255,255,255,0.11)',
          boxShadow: '0 14px 52px -12px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
        dir="rtl"
      >
        {/* Ambient gradient — top right */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: 0,
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(91,192,211,0.10) 0%, transparent 70%)`,
            transform: 'translate(30%, -30%)',
          }}
        />

        {/* Tag row */}
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {['פיננסים', 'AI רגשי', 'WhatsApp', 'Make.com'].map(tag => (
            <span
              key={tag}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                color: 'rgba(91,192,211,0.82)',
                background: 'rgba(91,192,211,0.09)',
                border: '1px solid rgba(91,192,211,0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Two-column: content + phone */}
        <div className="flex flex-col sm:flex-row gap-8 items-center">

          {/* ── Left column: text content ── */}
          <div className="flex-1 min-w-0">

            {/* Eyebrow */}
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: 'rgba(91,192,211,0.65)' }}
            >
              ✦ אוטומציית קופות גמל
            </div>

            {/* Headline */}
            <h3
              className="font-black leading-[1.15] mb-1"
              style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: '#fff' }}
            >
              מ-30 דקות
            </h3>
            <h3
              className="font-black leading-[1.15] mb-5"
              style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: TEAL }}
            >
              ל-4 דקות בלבד
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {BADGES.map(b => (
                <motion.div
                  key={b.main}
                  whileHover={{ scale: 1.07, y: -2 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 cursor-default"
                  style={{
                    border: `1px solid ${b.border}`,
                    background: b.bg,
                    color: b.color,
                  }}
                >
                  <span className="text-base leading-none">{b.emoji}</span>
                  <div>
                    <div className="text-xs font-black leading-none">{b.main}</div>
                    <div
                      className="text-[9px] leading-none mt-0.5"
                      style={{ opacity: 0.65 }}
                    >
                      {b.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {TECH.map(t => (
                <span
                  key={t.name}
                  className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg"
                  style={{
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    color: t.color,
                  }}
                >
                  {t.icon} {t.name}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-2 flex-wrap">
              <motion.a
                href="https://wa.me/972552520893?text=%D7%94%D7%AA%D7%97%D7%9C"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 10px 30px -6px rgba(91,192,211,0.48)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${TEAL}, #4ab4c5)`,
                  color: NAVY,
                  boxShadow: '0 6px 20px -6px rgba(91,192,211,0.32)',
                  textDecoration: 'none',
                }}
              >
                💬 נסו את הדמו
              </motion.a>

              <motion.button
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl"
                style={{
                  color: 'rgba(91,192,211,0.88)',
                  background: 'rgba(91,192,211,0.06)',
                  border: '1px solid rgba(91,192,211,0.24)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                סיפור ההצלחה המלא
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* ── Right column: phone ── */}
          <PhoneMockup />
        </div>
      </motion.div>

      {/* Case study modal */}
      {modalOpen && <CaseStudyModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION WRAPPER  (full page context)
══════════════════════════════════════════════════════ */

export default function PortfolioSection() {
  return (
    <section
      className="relative min-h-screen py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06091c 0%, #0c1230 50%, #06091c 100%)',
      }}
      dir="rtl"
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '15%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(91,192,211,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            bottom: '10%',
            left: '0%',
            background: 'radial-gradient(circle, rgba(37,46,98,0.55) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: TEAL,
              background: 'rgba(91,192,211,0.08)',
              border: `1px solid rgba(91,192,211,0.2)`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: TEAL, animation: 'pulse 2s infinite' }}
            />
            פרויקטים · סיפורי הצלחה
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-black mb-3"
            style={{ fontSize: 'clamp(28px, 5vw, 42px)', color: '#fff' }}
          >
            תוצאות שאפשר{' '}
            <span style={{ color: TEAL }}>למדוד</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            כל פרויקט מגובה בנתונים אמיתיים ותוצאות מוכחות
          </motion.p>
        </div>

        {/* The card */}
        <PortfolioCard />
      </div>
    </section>
  );
}
