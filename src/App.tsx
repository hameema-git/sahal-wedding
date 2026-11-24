import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Heart,
  MoonStar,
  Copy,
  Check,
  ChevronDown,
  MailOpen,
  Users,
  Sparkles,
  Church,
  CalendarPlus,
  ArrowUp,
  Phone,
  Quote,
  Gem,
} from "lucide-react";

/* ============================================================
   DATA — transcribed from the printed invitation card
============================================================ */
const NIKKAH = {
  title: "Nikkah",
  dateLabel: "Thursday · 26 November 2026",
  shortDate: "26 NOV 2026",
  time: "11:30 AM onwards",
  hall: "TMJ Cultural Center",
  venue: "Thottakkattukara, near Juma Masjid",
  address: "Aluva, Ernakulam — 683102",
  fullAddress:
    "TMJ Cultural Center, Thottakkattukara (near Thottakkattukara Juma Masjid), Aluva, Ernakulam — 683102",
  mapsUrl: "https://maps.app.goo.gl/jmjHunskkFowMme27?g_st=awb",
  embedUrl:
    "https://www.google.com/maps?q=48FQ%2B4H7+Thottakkattukara+Juma+Masjid+Aluva+Keralam+683102&output=embed",
};

const RECEPTION = {
  title: "Wedding Reception",
  dateLabel: "Thursday · 26 November 2026",
  shortDate: "26 NOV 2026",
  time: "From 6:00 PM to 10:00 PM",
  hall: "Njalakam Jama-Ath Convention Center",
  venue: "Njalakam, Kalamassery",
  address: "Kalamassery — 682033",
  fullAddress: "Njalakam Jama-Ath Convention Center, Kalamassery — 682033",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Njalakam+Jama-Ath+Convention+Center+Kalamassery+Kochi+682033",
  embedUrl:
    "https://www.google.com/maps?q=Njalakam+Jama-Ath+Convention+Center+Kalamassery+Kochi&output=embed",
};

const TARGET = new Date("2026-11-26T11:30:00+05:30").getTime();

/* ============================================================
   WHATSAPP SHARE MESSAGE
============================================================ */
const buildWhatsAppMessage = (url: string) =>
  [
    "🌙 *Nikkah Invitation* 🌙",
    "_Bismillahir Rahmanir Raheem_",
    "",
    "With the blessings of Almighty Allah, we joyfully invite you to the Nikkah of",
    "",
    "💍 *Mohammed Sahal ♥ Saliha*",
    "📅 Thursday, 26 November 2026",
    "",
    "💌 *Open your invitation:*",
    url,
    "",
    "🕌 *Nikkah* · 11:30 AM onwards",
    "📍 TMJ Cultural Center, Thottakkattukara (near Juma Masjid), Aluva",
    `🗺️ ${NIKKAH.mapsUrl}`,
    "",
    "🍽️ *Reception* · 6:00 – 10:00 PM",
    "📍 Njalakam Jama-Ath Convention Center, Kalamassery",
    `🗺️ ${RECEPTION.mapsUrl}`,
    "",
    "_Your presence and duas will make our day complete. InshaAllah we await you with joy._ 🤍",
  ].join("\n");

/* renders WhatsApp-style *bold* and _italic_ inside the preview bubble */
function renderWhatsAppLine(line: string, key: number) {
  const parts = line.split(/(\*[^*]+\*|_[^_]+_)/g).filter(Boolean);
  return (
    <p key={key} className={line === "" ? "h-2" : "break-words"}>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*"))
          return <strong key={i}>{part.slice(1, -1)}</strong>;
        if (part.startsWith("_") && part.endsWith("_"))
          return <em key={i}>{part.slice(1, -1)}</em>;
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z" />
    </svg>
  );
}

/* ============================================================
   SMALL PIECES
============================================================ */
function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="hr-gold w-16 sm:w-24" />
      <svg width="34" height="18" viewBox="0 0 34 18" fill="none" className="shrink-0">
        <path
          d="M17 1l2.2 4.6L24 4l-1.4 4.8L27.5 9l-4.9 1.4L24 15l-4.8-1.4L17 18l-2.2-4.4L10 15l1.4-4.6L6.5 9l4.9-1.4L10 4l4.8 1.6L17 1z"
          fill="#d3ab5e"
          opacity="0.9"
        />
        <circle cx="2.5" cy="9" r="1.4" fill="#d3ab5e" />
        <circle cx="31.5" cy="9" r="1.4" fill="#d3ab5e" />
      </svg>
      <span className="hr-gold w-16 sm:w-24" />
    </div>
  );
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`pointer-events-none ${className}`}>
      <path
        d="M4 76V34C4 18 18 4 34 4h42M4 76h42M4 76c10 0 16-6 16-16M76 4C66 4 60 10 60 20M60 20c0-6-4-10-10-10"
        stroke="#d3ab5e"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <circle cx="34" cy="4" r="2" fill="#d3ab5e" />
      <circle cx="4" cy="34" r="2" fill="#d3ab5e" />
      <path d="M14 14l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" fill="#d3ab5e" opacity="0.7" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="reveal text-center">
      <p
        className={`text-[11px] sm:text-xs font-medium uppercase tracking-[0.42em] ${
          dark ? "text-gold-deep" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-script mt-2 text-4xl sm:text-5xl ${
          dark ? "text-emerald-deep" : "text-gold-shine"
        }`}
      >
        {title}
      </h2>
      <GoldDivider className="mt-4" />
    </div>
  );
}

/* Floating petals */
function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 97.3 + 13) % 100,
        size: 9 + ((i * 7) % 10),
        duration: 11 + ((i * 3.7) % 9),
        delay: -((i * 2.3) % 14),
        color: i % 3 === 0 ? "#e9d3a0" : i % 3 === 1 ? "#f3c6c6" : "#fdf6e3",
        round: i % 2 === 0,
      })),
    [count]
  );
  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.25,
            background: p.color,
            opacity: 0,
            borderRadius: p.round ? "60% 0 60% 0" : "50% 50% 50% 0",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* Scroll reveal hook */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Countdown hook */
function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

/* ============================================================
   MAIN APP
============================================================ */
export default function App() {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { days, hours, minutes, seconds, done } = useCountdown(TARGET);

  useReveal();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened ]);

  const copyAddress = async (which: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadICS = (kind: "nikkah" | "reception") => {
    const ev =
      kind === "nikkah"
        ? {
            title: "Nikkah — Mohammed Sahal & Saliha",
            start: "20261126T060000Z",
            end: "20261126T083000Z",
            location: NIKKAH.fullAddress,
          }
        : {
            title: "Wedding Reception — Mohammed Sahal & Saliha",
            start: "20261126T123000Z",
            end: "20261126T163000Z",
            location: RECEPTION.fullAddress,
          };
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SahalSaliha//Nikkah//EN",
      "BEGIN:VEVENT",
      `UID:${kind}-${Date.now()}@sahalsaliha.invitation`,
      "DTSTAMP:20260101T000000Z",
      `DTSTART:${ev.start}`,
      `DTEND:${ev.end}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.location}`,
      "DESCRIPTION:Your presence will make our celebration complete. InshaAllah.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = kind === "nikkah" ? "nikkah-save-the-date.ics" : "reception-save-the-date.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const waMessage = buildWhatsAppMessage(
    typeof window !== "undefined" ? window.location.href.split("#")[0] : ""
  );

  const sendWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank", "noopener");
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div ref={mainRef} className="relative min-h-screen bg-night text-cream">
      <Petals />

      {/* ================= ENVELOPE GATE ================= */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-1000 ${
          opened ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
        aria-hidden={opened}
      >
        <div className="absolute inset-0 bg-night pattern-bg" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 30%, rgba(211,171,94,0.35), transparent 65%)",
          }}
        />
        <div className="absolute inset-3 sm:inset-5 gold-frame" />
        <CornerOrnament className="absolute left-4 top-4 h-16 w-16 sm:left-6 sm:top-6 sm:h-20 sm:w-20" />
        <CornerOrnament className="absolute right-4 top-4 h-16 w-16 rotate-90 sm:right-6 sm:top-6 sm:h-20 sm:w-20" />
        <CornerOrnament className="absolute bottom-4 left-4 h-16 w-16 -rotate-90 sm:bottom-6 sm:left-6 sm:h-20 sm:w-20" />
        <CornerOrnament className="absolute bottom-4 right-4 h-16 w-16 rotate-180 sm:bottom-6 sm:right-6 sm:h-20 sm:w-20" />

        <div className="relative z-10 mx-auto max-w-md px-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-emerald-deep shadow-[0_0_50px_rgba(211,171,94,0.35)]">
            <MoonStar className="h-9 w-9 text-gold" />
          </div>
          <p className="font-arabic text-2xl leading-relaxed text-gold-light">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-cream/70">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          <GoldDivider className="my-6" />
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Together Forever</p>
          <h1 className="font-script mt-3 text-5xl leading-tight text-gold-shine sm:text-6xl">
            Sahal
            <span className="mx-2 text-3xl text-cream/70">&</span>
            Saliha
          </h1>
          <p className="mt-4 font-serif text-lg italic text-cream/80">
            You are cordially invited to celebrate our Nikkah
          </p>
          <button
            onClick={() => setOpened(true)}
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-gold/70 bg-gradient-to-b from-gold/20 to-gold/5 px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-gold-pale transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-night hover:shadow-[0_0_40px_rgba(211,171,94,0.5)]"
          >
            <MailOpen className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Open Invitation
          </button>
          <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-cream/40">
            26 · 11 · 2026
          </p>
        </div>
      </div>

      {/* ================= TOP BAR ================= */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-night/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-emerald-deep">
              <Heart className="h-4 w-4 fill-gold text-gold" />
            </span>
            <div className="leading-tight">
              <p className="font-script text-xl text-gold-light">Sahal & Saliha</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">26 Nov 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={sendWhatsApp}
              className="hidden items-center gap-2 rounded-full border border-[#25D366]/50 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#7fe3a5] transition hover:bg-[#25D366]/15 sm:inline-flex"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> Share
            </button>
            <a
              href="#location"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-night transition hover:bg-gold-light"
            >
              <Navigation className="h-3.5 w-3.5" /> Location
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="images/hero-couple.jpg"
            alt="Bride and groom beneath a floral Mughal arch"
            className="h-full w-full animate-kenburns object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/55 to-night" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 42%, transparent 30%, rgba(6,23,18,0.55) 78%)",
            }}
          />
        </div>

        {/* gold border frame */}
        <div className="pointer-events-none absolute inset-3 z-10 border border-gold/40 sm:inset-5" />
        <div className="pointer-events-none absolute inset-[18px] z-10 border border-gold/15 sm:inset-[26px]" />
        <CornerOrnament className="absolute left-4 top-16 z-10 h-14 w-14 sm:left-6 sm:top-20 sm:h-[72px] sm:w-[72px]" />
        <CornerOrnament className="absolute right-4 top-16 z-10 h-14 w-14 rotate-90 sm:right-6 sm:top-20 sm:h-[72px] sm:w-[72px]" />

        {/* lantern glow dots */}
        <div className="absolute left-[8%] top-[24%] z-10 hidden h-2.5 w-2.5 animate-flicker rounded-full bg-amber-200 shadow-[0_0_18px_6px_rgba(252,211,77,0.55)] sm:block" />
        <div className="absolute right-[9%] top-[32%] z-10 hidden h-2 w-2 animate-flicker rounded-full bg-amber-200 shadow-[0_0_16px_5px_rgba(252,211,77,0.5)] sm:block" />

        <div className="relative z-20 mx-auto max-w-3xl px-6 pb-24 pt-32 text-center sm:pt-36">
          <p className="font-arabic animate-float-slow text-2xl text-gold-pale drop-shadow sm:text-3xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="hr-gold w-14 sm:w-28" />
            <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-[11px] uppercase tracking-[0.5em] text-gold-light sm:text-xs">
              Together Forever
            </span>
            <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="hr-gold w-14 sm:w-28" />
          </div>

          <p className="mt-6 text-[11px] font-medium uppercase leading-loose tracking-[0.3em] text-cream/85 sm:text-xs">
            You are cordially invited
            <br />
            to celebrate the Nikkah of
          </p>

          <h1 className="mt-4 leading-none">
            <span className="font-script block text-6xl text-gold-shine drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] sm:text-8xl">
              Mohammed Sahal
            </span>
            <span className="my-2 flex items-center justify-center gap-4 sm:my-3">
              <svg width="70" height="12" viewBox="0 0 70 12" className="opacity-80">
                <path d="M0 6h58M58 6l-8-4M58 6l-8 4" stroke="#d3ab5e" strokeWidth="1.2" />
                <circle cx="66" cy="6" r="2.4" fill="#d3ab5e" />
              </svg>
              <span className="font-script text-4xl text-cream sm:text-5xl">&</span>
              <svg width="70" height="12" viewBox="0 0 70 12" className="rotate-180 opacity-80">
                <path d="M0 6h58M58 6l-8-4M58 6l-8 4" stroke="#d3ab5e" strokeWidth="1.2" />
                <circle cx="66" cy="6" r="2.4" fill="#d3ab5e" />
              </svg>
            </span>
            <span className="font-script block text-6xl text-gold-shine drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] sm:text-8xl">
              Saliha
            </span>
          </h1>

          {/* date / time chips */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0">
            <div className="flex items-center gap-3 rounded-t-2xl border border-gold/40 bg-night/60 px-7 py-3 backdrop-blur-sm sm:rounded-l-2xl sm:rounded-tr-none">
              <CalendarDays className="h-5 w-5 text-gold" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/60">Thursday</p>
                <p className="text-sm font-medium tracking-[0.2em] text-gold-pale">26 NOV 2026</p>
              </div>
            </div>
            <div className="hidden h-12 w-px bg-gold/40 sm:block" />
            <div className="flex items-center gap-3 rounded-b-2xl border border-gold/40 bg-night/60 px-7 py-3 backdrop-blur-sm sm:rounded-r-2xl sm:rounded-bl-none">
              <Clock className="h-5 w-5 text-gold" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/60">Nikkah at</p>
                <p className="text-sm font-medium tracking-[0.2em] text-gold-pale">11:30 AM</p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-md font-serif text-base italic leading-relaxed text-cream/80 sm:text-lg">
            “Your presence will make our celebration complete.”
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#events"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-night shadow-[0_8px_30px_rgba(211,171,94,0.35)] transition hover:scale-[1.03] hover:bg-gold-light sm:w-auto"
            >
              <Sparkles className="h-4 w-4" /> View Invitation
            </a>
            <a
              href="#location"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-pale backdrop-blur-sm transition hover:bg-gold/15 sm:w-auto"
            >
              <MapPin className="h-4 w-4" /> Get Location
            </a>
          </div>
        </div>

        <a
          href="#countdown"
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-gold/80 transition hover:text-gold"
          aria-label="Scroll down"
        >
          <span className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.35em]">
            Scroll
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </span>
        </a>
      </section>

      {/* ================= COUNTDOWN ================= */}
      <section id="countdown" className="relative border-y border-gold/25 bg-emerald-deep pattern-bg">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:py-16">
          <SectionHeading eyebrow="Save the date" title="Counting to Forever" />
          <p className="reveal mt-4 font-serif text-lg italic text-cream/75">
            {done ? "Alhamdulillah — the blessed day has arrived!" : "Until we say Qubool Hai, InshaAllah"}
          </p>

          <div className="reveal reveal-delay-1 mt-8 grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { v: pad(days), l: "Days" },
              { v: pad(hours), l: "Hours" },
              { v: pad(minutes), l: "Minutes" },
              { v: pad(seconds), l: "Seconds" },
            ].map((u) => (
              <div
                key={u.l}
                className="relative overflow-hidden rounded-xl border border-gold/40 bg-night/70 px-1 py-4 sm:rounded-2xl sm:py-6"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="font-serif text-2xl font-semibold text-gold-pale tabular-nums sm:text-5xl">
                  {u.v}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-cream/60 sm:text-[11px]">
                  {u.l}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal reveal-delay-2 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => downloadICS("nikkah")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-gold-light transition hover:bg-gold hover:text-night"
            >
              <CalendarPlus className="h-4 w-4" /> Nikkah · Add to Calendar
            </button>
            <button
              onClick={() => downloadICS("reception")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-gold-light transition hover:bg-gold hover:text-night"
            >
              <CalendarPlus className="h-4 w-4" /> Reception · Add to Calendar
            </button>
          </div>
        </div>
      </section>

      {/* ================= INVITATION MESSAGE ================= */}
      <section className="relative bg-cream text-emerald-deep">
        <div className="absolute inset-0 pattern-bg-light opacity-70" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
          <div className="reveal mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold-deep/50 bg-white/60">
            <Gem className="h-6 w-6 text-gold-deep" />
          </div>
          <SectionHeading dark eyebrow="Assalamu Alaikum" title="With Allah's Blessings" />
          <p className="reveal mt-6 font-serif text-lg leading-relaxed text-emerald-deep/90 sm:text-xl">
            With the blessings of Almighty Allah, we cordially invite your esteemed presence and
            blessings, along with your family, on the auspicious occasion of the{" "}
            <span className="font-semibold uppercase tracking-widest text-gold-deep">Nikkah</span> of
            our beloved children
          </p>

          <div className="reveal reveal-delay-1 mt-8 rounded-2xl border border-gold-deep/30 bg-white/70 p-6 shadow-[0_20px_60px_rgba(166,124,58,0.15)] sm:p-8">
            <p className="font-script text-5xl leading-tight text-emerald-deep sm:text-6xl">
              Mohammed Sahal <span className="text-gold-deep">P.&nbsp;S.</span>
            </p>
            <div className="my-3 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold-deep/50" />
              <Heart className="h-4 w-4 fill-gold-deep text-gold-deep" />
              <span className="h-px w-12 bg-gold-deep/50" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-emerald-deep/60">weds</p>
            <p className="font-script mt-1 text-5xl leading-tight text-emerald-deep sm:text-6xl">
              Saliha <span className="text-gold-deep">V.&nbsp;K.</span>
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-gold-deep">InshaAllah</p>
          </div>
        </div>
      </section>

      {/* ================= FAMILIES ================= */}
      <section className="relative bg-night">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <SectionHeading eyebrow="Two families · One celebration" title="The Honoured Families" />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Groom */}
            <div className="reveal group relative overflow-hidden rounded-3xl border border-gold/35 bg-gradient-to-b from-emerald-rich to-emerald-deep p-8 text-center sm:p-10">
              <CornerOrnament className="absolute left-3 top-3 h-12 w-12 opacity-70" />
              <CornerOrnament className="absolute bottom-3 right-3 h-12 w-12 rotate-180 opacity-70" />
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-night font-script text-3xl text-gold">
                S
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gold">The Groom</p>
              <h3 className="font-script mt-1 text-4xl text-gold-pale sm:text-5xl">
                Mohammed Sahal P. S.
              </h3>
              <GoldDivider className="my-5" />
              <div className="space-y-4 font-serif text-[15px] leading-relaxed text-cream/85">
                <p>
                  <span className="mb-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    <Users className="h-3.5 w-3.5" /> Son of
                  </span>
                  Late P. A. Siddique Pulparambil & Salma P. A. Palakkal
                </p>
                <p className="border-t border-gold/20 pt-4">
                  <span className="mb-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    <Users className="h-3.5 w-3.5" /> Grandson of
                  </span>
                  Late Pulparambil P. C. Abdul Kader & Late Mariyam Beeri
                  <span className="mx-2 text-gold">·</span>
                  Late Palakkal Abdu Maulavi & Sainaba
                </p>
              </div>
            </div>

            {/* Bride */}
            <div className="reveal reveal-delay-1 group relative overflow-hidden rounded-3xl border border-gold/35 bg-gradient-to-b from-emerald-rich to-emerald-deep p-8 text-center sm:p-10">
              <CornerOrnament className="absolute left-3 top-3 h-12 w-12 opacity-70" />
              <CornerOrnament className="absolute bottom-3 right-3 h-12 w-12 rotate-180 opacity-70" />
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-night font-script text-3xl text-gold">
                S
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gold">The Bride</p>
              <h3 className="font-script mt-1 text-4xl text-gold-pale sm:text-5xl">Saliha V. K.</h3>
              <GoldDivider className="my-5" />
              <div className="space-y-4 font-serif text-[15px] leading-relaxed text-cream/85">
                <p>
                  <span className="mb-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    <Users className="h-3.5 w-3.5" /> Daughter of
                  </span>
                  Kunju Muhammed V. I., Vettuvelil & Nadeera V. P., Vellukuzhy House
                </p>
                <p className="border-t border-gold/20 pt-4 font-script text-3xl text-gold-light">
                  InshaAllah
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section id="events" className="relative overflow-hidden bg-emerald-deep pattern-bg">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(211,171,94,0.4), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <SectionHeading eyebrow="When & Where" title="Celebrations" />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* NIKKAH CARD */}
            <article className="reveal relative overflow-hidden rounded-3xl border border-gold/40 bg-night/85 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="border-b border-gold/25 bg-gradient-to-r from-gold/15 via-gold/5 to-gold/15 px-7 py-5 text-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Ceremony</p>
                <h3 className="font-script mt-1 text-5xl text-gold-pale">Nikkah</h3>
              </div>
              <div className="space-y-5 px-7 py-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep">
                    <CalendarDays className="h-5 w-5 text-gold" />
                  </span>
                  <div>
                    <p className="text-lg font-medium tracking-wide text-gold-pale">26 November 2026</p>
                    <p className="text-sm text-cream/65">Thursday · 26 · 11 · 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep">
                    <Clock className="h-5 w-5 text-gold" />
                  </span>
                  <div>
                    <p className="text-lg font-medium tracking-wide text-gold-pale">11:30 AM</p>
                    <p className="text-sm text-cream/65">Morning ceremony, InshaAllah</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep">
                    <Church className="h-5 w-5 text-gold" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Venue</p>
                    <p className="mt-1 font-serif text-xl leading-snug text-cream">
                      {NIKKAH.hall}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/65">
                      {NIKKAH.venue}
                      <br />
                      {NIKKAH.address}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={NIKKAH.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-night transition hover:bg-gold-light"
                  >
                    <Navigation className="h-4 w-4" /> Directions
                  </a>
                  <button
                    onClick={() => copyAddress("nikkah", NIKKAH.fullAddress)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light transition hover:bg-gold/15"
                  >
                    {copied === "nikkah" ? (
                      <>
                        <Check className="h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>

            {/* RECEPTION CARD */}
            <article className="reveal reveal-delay-1 relative overflow-hidden rounded-3xl border border-gold/40 bg-night/85 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="border-b border-gold/25 bg-gradient-to-r from-gold/15 via-gold/5 to-gold/15 px-7 py-5 text-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Evening</p>
                <h3 className="font-script mt-1 text-5xl text-gold-pale">Wedding Reception</h3>
              </div>
              <div className="space-y-5 px-7 py-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep">
                    <CalendarDays className="h-5 w-5 text-gold" />
                  </span>
                  <div>
                    <p className="text-lg font-medium tracking-wide text-gold-pale">26 November 2026</p>
                    <p className="text-sm text-cream/65">Thursday · Same blessed day</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep">
                    <Clock className="h-5 w-5 text-gold" />
                  </span>
                  <div>
                    <p className="text-lg font-medium tracking-wide text-gold-pale">
                      6:00 PM — 10:00 PM
                    </p>
                    <p className="text-sm text-cream/65">Dinner & Dua to follow</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep">
                    <Church className="h-5 w-5 text-gold" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Venue</p>
                    <p className="mt-1 font-serif text-xl leading-snug text-cream">
                      {RECEPTION.hall}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/65">
                      {RECEPTION.venue}
                      <br />
                      {RECEPTION.address}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={RECEPTION.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-night transition hover:bg-gold-light"
                  >
                    <Navigation className="h-4 w-4" /> Directions
                  </a>
                  <button
                    onClick={() => copyAddress("reception", RECEPTION.fullAddress)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light transition hover:bg-gold/15"
                  >
                    {copied === "reception" ? (
                      <>
                        <Check className="h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================= LOCATION ACCESS ================= */}
      <section id="location" className="relative bg-cream text-emerald-deep">
        <div className="absolute inset-0 pattern-bg-light opacity-70" />
        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <SectionHeading dark eyebrow="Location Access" title="How to Reach" />
          <p className="reveal mx-auto mt-4 max-w-2xl text-center font-serif text-lg italic text-emerald-deep/75">
            Tap “Open in Google Maps” for live navigation to each venue. Both halls are in the
            Kochi region — Nikkah in the morning at Aluva, Reception in the evening at Kalamassery.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              { ...NIKKAH, badge: "Morning · 11:30 AM", key: "nikkah" },
              { ...RECEPTION, badge: "Evening · 6 – 10 PM", key: "reception" },
            ].map((v, i) => (
              <div
                key={v.key}
                className={`reveal ${i === 1 ? "reveal-delay-1" : ""} overflow-hidden rounded-3xl border border-gold-deep/30 bg-white shadow-[0_24px_70px_rgba(10,38,32,0.12)]`}
              >
                <div className="map-frame relative h-64 w-full sm:h-72">
                  <iframe
                    title={`${v.title} map`}
                    src={v.embedUrl}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-night/90 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-gold-light shadow">
                    {v.badge}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">{v.title}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold leading-snug">{v.hall}</h3>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-emerald-deep/70">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                    {v.fullAddress}
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      href={v.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-deep px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-pale transition hover:bg-night"
                    >
                      <Navigation className="h-4 w-4" /> Open in Maps
                    </a>
                    <button
                      onClick={() => copyAddress(v.key, v.fullAddress)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-deep/30 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-deep transition hover:border-emerald-deep"
                    >
                      {copied === v.key ? (
                        <>
                          <Check className="h-4 w-4" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copy Address
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-8 rounded-2xl border border-gold-deep/30 bg-emerald-deep p-6 text-center sm:p-8">
            <p className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.35em] text-gold">
              <Phone className="h-4 w-4" /> Travelling from afar?
            </p>
            <p className="mx-auto mt-3 max-w-2xl font-serif text-lg italic leading-relaxed text-cream/85">
              Both venues are easily reachable from Aluva & Kalamassery. Use the live location
              links above — free parking is available near both halls. Please arrive a little
              early so we may welcome you with joy.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VERSE / QUOTE ================= */}
      <section className="relative overflow-hidden">
        <img
          src="images/palace-dusk.jpg"
          alt="Palace archway with lanterns at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/80" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 50%, transparent 20%, rgba(6,23,18,0.6) 80%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
          <Quote className="reveal mx-auto h-8 w-8 rotate-180 text-gold" />
          <p className="reveal font-arabic mt-6 text-2xl leading-loose text-gold-pale sm:text-3xl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ
            بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="reveal reveal-delay-1 mt-6 font-serif text-lg italic leading-relaxed text-cream/90 sm:text-xl">
            “And among His signs is that He created for you spouses from among yourselves, that you
            may find comfort in them — and He placed between you love and mercy.”
          </p>
          <p className="reveal reveal-delay-2 mt-3 text-[11px] uppercase tracking-[0.4em] text-gold">
            Qur’an · 30 : 21
          </p>
          <GoldDivider className="reveal my-8" />
          <p className="reveal font-script text-4xl text-gold-shine sm:text-5xl">
            Your presence will make our
          </p>
          <p className="reveal font-script text-4xl text-gold-shine sm:text-5xl">
            celebration complete.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}


      <footer className="relative border-t border-gold/25 bg-night pattern-bg">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <div className="reveal mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep">
            <Heart className="h-6 w-6 fill-gold text-gold" />
          </div>
          <h2 className="reveal font-script mt-4 text-5xl text-gold-shine">Sahal & Saliha</h2>
          <p className="reveal mt-2 text-[11px] uppercase tracking-[0.4em] text-cream/60">
            26 · November · 2026
          </p>

          <div className="reveal mt-8 grid gap-4 text-sm leading-relaxed text-cream/70 sm:grid-cols-2">
            <div className="rounded-2xl border border-gold/25 bg-emerald-deep/60 p-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">With love from</p>
              <p className="mt-2 font-serif text-base text-cream/90">
                Pulparambil & Palakkal Families
              </p>
            </div>
            <div className="rounded-2xl border border-gold/25 bg-emerald-deep/60 p-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">With love from</p>
              <p className="mt-2 font-serif text-base text-cream/90">
                Vettuveli & Vellukuzhy House Families
              </p>
            </div>
          </div>

          <div className="reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={NIKKAH.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-night transition hover:bg-gold-light sm:w-auto"
            >
              <MapPin className="h-4 w-4" /> Nikkah Location
            </a>
            <a
              href={RECEPTION.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-pale transition hover:bg-gold/15 sm:w-auto"
            >
              <MapPin className="h-4 w-4" /> Reception Location
            </a>
            <button
              onClick={sendWhatsApp}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#06301c] transition hover:bg-[#3be077] sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" /> Share on WhatsApp
            </button>
          </div>

          <GoldDivider className="my-8" />
          <p className="font-serif text-base italic text-cream/60">
            Seeking your duas & blessings — InshaAllah we await you with joy.
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-cream/35">
            Crafted with love for the Nikkah · Sahal ♥ Saliha
          </p>
        </div>
      </footer>

      {/* ================= FLOATING BUTTONS ================= */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a
          href="#location"
          aria-label="Open location"
          className="flex h-12 w-12 animate-glow-pulse items-center justify-center rounded-full bg-gold text-night transition hover:scale-110"
        >
          <Navigation className="h-5 w-5" />
        </a>
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-night/90 text-gold backdrop-blur transition hover:bg-gold hover:text-night"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
