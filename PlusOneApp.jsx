import React, { useState, useEffect, useRef } from "react";
import {
  Home, Compass, GraduationCap, Users, Sparkles, Bell, ChevronRight, ChevronLeft,
  Search, Plus, Calendar, Wallet, Receipt, Camera, MapPin, Heart, MessageCircle,
  Play, FileText, Download, Award, Flame, Clock, BookOpen, Trophy, Lightbulb,
  HelpCircle, Info, ScanLine, BadgeCheck, Cake, Video, ThumbsUp, Bookmark, Send,
  Stethoscope, ShieldCheck, UserPlus, UploadCloud, Megaphone, Check, X,
  LayoutDashboard, Inbox, Boxes, Paperclip, CheckCircle2, XCircle
} from "lucide-react";

/* ============================ STYLE ============================ */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap');
*{ -webkit-tap-highlight-color: transparent; box-sizing:border-box; }
:root{
  --maroon:#601419; --claret:#8A2A33; --rosewood:#B65C61; --blush:#E9CBCB;
  --bone:#FBF6F4; --bone2:#F4ECE9; --line:#EFE3DF;
  --ink:#3A3436; --muted:#9A8C8E; --gold:#C2933F; --green:#2FA84F;
}
.po-root{ font-family:'Inter',system-ui,sans-serif; color:var(--ink); }
.font-display{ font-family:'Bricolage Grotesque','Inter',sans-serif; letter-spacing:-0.02em; }
.text-maroon{color:var(--maroon)} .text-claret{color:var(--claret)} .text-ink{color:var(--ink)}
.text-muted{color:var(--muted)} .text-gold{color:var(--gold)} .text-green{color:var(--green)}
.bg-maroon{background:var(--maroon)} .bg-bone{background:var(--bone)} .bg-bone2{background:var(--bone2)} .bg-blush{background:var(--blush)}
.grad-buddy{ background:radial-gradient(120% 140% at 12% 18%, #B65C61 0%, #8A2A33 42%, #601419 100%); }
.grad-buddy-soft{ background:radial-gradient(130% 130% at 20% 10%, rgba(182,92,97,.16), rgba(96,20,25,.05) 60%, transparent 75%); }
.grad-gold{ background:linear-gradient(135deg,#D9B25E,#C2933F); }
.grad-ink{ background:radial-gradient(120% 140% at 15% 15%, #4a4244, #2c2627 60%, #211c1d); }
.shadow-card{ box-shadow:0 1px 2px rgba(58,52,54,.04), 0 8px 24px -12px rgba(96,20,25,.16); }
.shadow-float{ box-shadow:0 10px 30px -8px rgba(96,20,25,.30); }
.shadow-nav{ box-shadow:0 -8px 30px -16px rgba(58,52,54,.25); }
.no-scrollbar::-webkit-scrollbar{ display:none; }
.no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
@keyframes breathe{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
@keyframes floaty{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes glow{ 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:.9;transform:scale(1.12)} }
@keyframes spin-slow{ to{transform:rotate(360deg)} }
@keyframes rise{ from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes pop{ from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
@keyframes dot{ 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-4px);opacity:1} }
@keyframes toastin{ from{opacity:0;transform:translate(-50%,12px)} to{opacity:1;transform:translate(-50%,0)} }
.anim-screen{ animation:rise .42s cubic-bezier(.2,.7,.2,1); }
.anim-pop{ animation:pop .3s ease both; }
.breathe{ animation:breathe 4.2s ease-in-out infinite; }
.floaty{ animation:floaty 5s ease-in-out infinite; }
.glow{ animation:glow 4.2s ease-in-out infinite; }
.spin-slow{ animation:spin-slow 14s linear infinite; }
.stagger>*{ animation:rise .5s cubic-bezier(.2,.7,.2,1) both; }
.stagger>*:nth-child(1){animation-delay:.04s}.stagger>*:nth-child(2){animation-delay:.10s}
.stagger>*:nth-child(3){animation-delay:.16s}.stagger>*:nth-child(4){animation-delay:.22s}
.stagger>*:nth-child(5){animation-delay:.28s}.stagger>*:nth-child(6){animation-delay:.34s}
.stagger>*:nth-child(7){animation-delay:.40s}.stagger>*:nth-child(8){animation-delay:.46s}
.press{ transition:transform .12s ease, box-shadow .2s ease; }
.press:active{ transform:scale(.97); }
input,textarea{ font-family:inherit; }
@media (prefers-reduced-motion: reduce){
  .breathe,.floaty,.glow,.spin-slow,.anim-screen,.stagger>*,.anim-pop{ animation:none !important; }
}
`;

/* ============================ STATIC DATA ============================ */
const USER = { name: "Kalyani", first: "Kalyani", role: "Product & BD", dept: "Plus Orthopedics", initials: "K" };

const SEED_BROADCASTS = [
  { id: 1, tag: "Launch", title: "Plus PS Knee System — launch webinar", body: "Live walkthrough of the new posterior-stabilised knee. Friday, 3:00 PM IST.", time: "2h ago", wa: true, accent: "maroon" },
  { id: 2, tag: "Catalog", title: "Trauma Catalog 2026 is now live", body: "Updated plating and nailing range, with new locking-screw options.", time: "Yesterday", wa: true, accent: "claret" },
  { id: 3, tag: "Incentive", title: "Q1 incentive results announced", body: "South-zone trauma team led the quarter. Statements in your wallet.", time: "2 days ago", wa: true, accent: "gold" },
  { id: 4, tag: "Policy", title: "Updated travel & expense policy", body: "Per-diem revised and receipt limits simplified. Effective 1 June.", time: "4 days ago", wa: false, accent: "maroon" },
];

const SEED_EMPLOYEES = [
  { id: 1, name: "Vignesh Kumar", role: "Sales Executive", dept: "Trauma · Chennai", initials: "VK" },
  { id: 2, name: "Meera Raghavan", role: "Clinical Specialist", dept: "Knee · South", initials: "MR" },
  { id: 3, name: "Arun Prakash", role: "Sales Executive", dept: "Spine · Chennai", initials: "AP" },
  { id: 4, name: "Priya Sundaram", role: "Operations", dept: "HQ", initials: "PS" },
  { id: 5, name: "Karthik N.", role: "Distributor Lead", dept: "Coimbatore", initials: "KN" },
];

const SEED_EXPENSES = [
  { id: 1, who: "You", title: "Cab — hospital visits", cat: "Travel", amount: 4250, status: "Approved", date: "2 Jun" },
  { id: 2, who: "You", title: "Hotel — Coimbatore tender", cat: "Stay", amount: 6800, status: "Pending", date: "5 Jun" },
  { id: 3, who: "You", title: "Client lunch — Dr. Rao", cat: "Food", amount: 1900, status: "Pending", date: "6 Jun" },
  { id: 4, who: "You", title: "Fuel reimbursement", cat: "Fuel", amount: 3100, status: "Approved", date: "28 May" },
  { id: 5, who: "Vignesh K.", title: "Toll & parking", cat: "Travel", amount: 760, status: "Pending", date: "6 Jun" },
  { id: 6, who: "Meera R.", title: "Flight — Madurai OT", cat: "Travel", amount: 5400, status: "Pending", date: "5 Jun" },
  { id: 7, who: "Arun P.", title: "Surgeon dinner meet", cat: "Food", amount: 2300, status: "Pending", date: "4 Jun" },
];

const SEED_CONTENT = [
  { id: 1, type: "Brochure", title: "Trauma Catalog 2026", when: "Uploaded 2 days ago" },
  { id: 2, type: "Surgeon", title: "PS Knee — Surgical Technique (Video)", when: "Uploaded 3 days ago" },
  { id: 3, type: "Training", title: "Objection Handling Deck", when: "Uploaded 1 week ago" },
];

const IMPLANTS_SEED = [
  { id: "ps-knee", cat: "Knee", name: "Plus PS Knee System", tagline: "Posterior-stabilised primary knee", material: "CoCrMo femur · UHMWPE insert · Ti baseplate", color: "#7B1F28", sizes: "Femoral 1–8 · Tibia 1–8 · Inserts 9–17 mm", indications: ["Primary TKA", "PCL-deficient knees", "Moderate deformity correction"], specs: [["Bearing", "Fixed PS"], ["Polyethylene", "Highly cross-linked"], ["Fixation", "Cemented"]], vs: [["Feature", "Plus PS", "Competitor A"], ["Cam-post engagement", "Progressive", "Abrupt"], ["Insert range", "9–17 mm", "10–18 mm"], ["Instrument trays", "2", "3"]], downloads: ["Brochure (PDF)", "Surgical technique", "IFU", "Sales presentation"] },
  { id: "cr-knee", cat: "Knee", name: "Plus CR Knee System", tagline: "Cruciate-retaining primary knee", material: "CoCrMo femur · UHMWPE insert · Ti baseplate", color: "#8A2A33", sizes: "Femoral 1–8 · Tibia 1–8 · Inserts 9–17 mm", indications: ["Primary TKA", "Intact PCL", "Active patients"], specs: [["Bearing", "Fixed CR"], ["Slope", "3° posterior"], ["Fixation", "Cemented / hybrid"]], vs: [["Feature", "Plus CR", "Competitor A"], ["Posterior slope", "3° built-in", "Flat"], ["Femoral sizing", "Anatomic", "Symmetric"], ["Trial system", "Single tray", "Dual tray"]], downloads: ["Brochure (PDF)", "Surgical technique", "IFU"] },
  { id: "hum-plate", cat: "Trauma", name: "Plus TitanLOCK Humerus Plate", tagline: "Proximal humerus locking plate", material: "Ti-6Al-4V", color: "#601419", sizes: "3 / 5 / 8 hole · Left & Right", indications: ["Proximal humerus fractures", "Osteoporotic bone", "3- & 4-part fractures"], specs: [["Screws", "Multi-angle locking"], ["Profile", "Low-profile anatomic"], ["Suture holes", "Yes"]], vs: [["Feature", "Plus TitanLOCK", "Competitor X"], ["Locking angle", "±15° variable", "Fixed"], ["Calcar support", "Dedicated screws", "Standard"], ["Plate thickness", "Low-profile", "Standard"]], downloads: ["Brochure (PDF)", "Surgical technique", "IFU", "Catalog page"] },
  { id: "tibia-nail", cat: "Trauma", name: "Plus Interlocking Nail — Tibia", tagline: "Cannulated tibial nail", material: "Ti alloy", color: "#8A2A33", sizes: "Ø8–12 mm · 255–420 mm", indications: ["Tibial shaft fractures", "Segmental fractures", "Non-unions"], specs: [["Locking", "Static & dynamic"], ["Cannulated", "Yes"], ["Distal options", "Multi-planar"]], vs: [["Feature", "Plus Nail", "Competitor X"], ["Distal locking", "Multi-planar", "Bi-planar"], ["Insertion jig", "Radiolucent", "Metal"], ["Diameter range", "8–12 mm", "9–12 mm"]], downloads: ["Brochure (PDF)", "Surgical technique", "IFU"] },
  { id: "hip-stem", cat: "Hip", name: "Plus Taper Hip Stem", tagline: "Cementless tapered-wedge stem", material: "Ti alloy, plasma-sprayed", color: "#7B1F28", sizes: "Standard & lateralised · Sizes 1–12", indications: ["Primary THA", "Dorr A/B bone", "Direct anterior approach"], specs: [["Fixation", "Press-fit"], ["Coating", "Proximal HA"], ["Offset", "Std / lateralised"]], vs: [["Feature", "Plus Taper", "Competitor A"], ["Offset options", "Dual", "Single"], ["Neck design", "Reduced lateral", "Standard"], ["Coating", "Proximal HA", "Full porous"]], downloads: ["Brochure (PDF)", "Surgical technique", "IFU", "Sizing chart"] },
  { id: "cup", cat: "Hip", name: "Plus Multi-Hole Acetabular Cup", tagline: "Cluster-hole press-fit shell", material: "Ti shell · XLPE / ceramic liner", color: "#601419", sizes: "Ø44–66 mm", indications: ["Primary THA", "Revision with bone loss", "Dysplasia"], specs: [["Holes", "Cluster pattern"], ["Liner", "XLPE / ceramic"], ["Fixation", "Press-fit + screws"]], vs: [["Feature", "Plus Cup", "Competitor A"], ["Screw pattern", "Cluster (multi)", "Apical"], ["Liner options", "XLPE / ceramic", "XLPE"], ["Coating", "Porous Ti", "Porous Ti"]], downloads: ["Brochure (PDF)", "IFU", "Screw-hole guide"] },
  { id: "pedicle", cat: "Spine", name: "Plus Pedicle Screw System", tagline: "Polyaxial posterior fixation", material: "Ti alloy", color: "#8A2A33", sizes: "Ø4.5–7.5 mm · 30–55 mm", indications: ["Degenerative spine", "Deformity", "Trauma"], specs: [["Head", "Polyaxial"], ["Rod", "Ø5.5 mm Ti"], ["Reduction", "Built-in tabs"]], vs: [["Feature", "Plus Pedicle", "Competitor X"], ["Angulation", "±25°", "±20°"], ["Set screw", "Anti-splay", "Standard"], ["Rod material", "Ti / CoCr", "Ti"]], downloads: ["Brochure (PDF)", "Surgical technique", "IFU"] },
  { id: "cmf", cat: "CMF", name: "Plus CMF Mesh Plate", tagline: "Craniomaxillofacial reconstruction", material: "Pure titanium", color: "#7B1F28", sizes: "0.4 / 0.6 mm · cuttable", indications: ["Orbital floor", "Cranial defects", "Midface trauma"], specs: [["Thickness", "0.4 / 0.6 mm"], ["Form", "Cuttable mesh"], ["Screws", "1.5 / 2.0 mm"]], vs: [["Feature", "Plus CMF", "Competitor X"], ["Mesh profile", "Low", "Standard"], ["Contourability", "High", "Medium"], ["Screw range", "1.5–2.0 mm", "2.0 mm"]], downloads: ["Brochure (PDF)", "IFU"] },
  { id: "anchor", cat: "Sports", name: "Plus Suture Anchor", tagline: "Knotless soft-tissue anchor", material: "PEEK / bio-composite", color: "#601419", sizes: "Ø2.6 / 3.5 / 4.5 mm", indications: ["Rotator cuff repair", "Labral repair", "Ligament fixation"], specs: [["Type", "Knotless"], ["Material", "PEEK / bio-composite"], ["Suture", "High-strength"]], vs: [["Feature", "Plus Anchor", "Competitor A"], ["Insertion", "Knotless", "Knotted"], ["Pull-out strength", "High", "Medium"], ["Material option", "Bio-composite", "PEEK only"]], downloads: ["Brochure (PDF)", "Surgical technique", "IFU"] },
];
const IMPLANT_CATS = ["All", "Trauma", "Knee", "Hip", "Spine", "CMF", "Sports"];

const COURSES_SEED = [
  { id: 1, track: "Product", title: "Trauma Essentials", lessons: 8, mins: 95, progress: 100, points: 240 },
  { id: 2, track: "Product", title: "Knee Arthroplasty Fundamentals", lessons: 10, mins: 130, progress: 60, points: 180 },
  { id: 3, track: "Product", title: "Hip Systems & Approaches", lessons: 9, mins: 120, progress: 22, points: 60 },
  { id: 4, track: "Product", title: "Spine Fixation Basics", lessons: 7, mins: 85, progress: 0, points: 0 },
  { id: 5, track: "Product", title: "CMF Reconstruction", lessons: 6, mins: 70, progress: 0, points: 0 },
  { id: 6, track: "Product", title: "Sports Medicine Repair", lessons: 6, mins: 75, progress: 40, points: 90 },
  { id: 7, track: "Sales", title: "Objection Handling", lessons: 5, mins: 55, progress: 80, points: 150 },
  { id: 8, track: "Sales", title: "Tender Participation in India", lessons: 6, mins: 65, progress: 0, points: 0 },
  { id: 9, track: "Sales", title: "Negotiation Masterclass", lessons: 5, mins: 60, progress: 0, points: 0 },
];

const SURGEON = [
  { id: 1, type: "Technique", title: "Plus PS Knee — Surgical Technique", who: "Dr. R. Menon · 18 min", color: "#7B1F28" },
  { id: 2, type: "Technique", title: "Proximal Humerus Plating", who: "Dr. A. Iyer · 14 min", color: "#601419" },
  { id: 3, type: "Approach", title: "Direct Anterior Hip Approach", who: "Dr. S. Rao · 22 min", color: "#8A2A33" },
  { id: 4, type: "Case study", title: "4-part humerus in osteoporotic bone", who: "Case review · 9 min", color: "#B65C61" },
  { id: 5, type: "Webinar", title: "Bearing surfaces: what’s next in TKR", who: "Panel · 46 min", color: "#7B1F28" },
];

const POSTS = [
  { id: 1, type: "Win", author: "Vignesh K.", role: "Sales · Chennai", time: "3h", likes: 42, comments: 7, body: "Closed a full trauma set order at Apollo today — the new locking-screw range sealed it. Thanks to the clinical team for the OR support!" },
  { id: 2, type: "Feedback", author: "Dr. R. Menon", role: "Surgeon partner", time: "1d", likes: 88, comments: 12, body: "Used the Plus PS Knee on three primaries this week. Cam engagement feels smooth and the trial system is genuinely faster. Well done." },
  { id: 3, type: "Idea", author: "Priya S.", role: "Operations", time: "2d", likes: 31, comments: 9, body: "Idea: colour-code instrument trays by system. Would cut OR setup time and reduce mix-ups on multi-case days. Who’s in to pilot it?" },
];
const POST_TABS = ["Feed", "Wins", "Ideas"];

const LEAVE = [
  { label: "Casual", used: 4, total: 12, color: "#8A2A33" },
  { label: "Sick", used: 2, total: 10, color: "#B65C61" },
  { label: "Earned", used: 6, total: 18, color: "#601419" },
];

const SUGGESTIONS = [
  { id: "compare", role: "Ask", label: "Plus Interlocking Nail vs Competitor X" },
  { id: "brochure", role: "Retrieve", label: "Show the Humerus Plate brochure" },
  { id: "teach", role: "Learn", label: "Teach me locking compression plates" },
  { id: "expense", role: "Ask", label: "What’s my expense status?" },
  { id: "leave", role: "Ask", label: "How many leaves do I have?" },
  { id: "summarise", role: "Retrieve", label: "Summarise the new T&E policy" },
];
function buddyReply(id) {
  switch (id) {
    case "compare": return { text: "Here’s how they compare on the points reps get asked most:", card: { type: "compare", title: "Plus Interlocking Nail vs Competitor X", rows: [["Distal locking", "Multi-planar", "Bi-planar"], ["Insertion jig", "Radiolucent", "Metal"], ["Diameter range", "8–12 mm", "9–12 mm"], ["Cannulated", "Yes", "Yes"]] } };
    case "brochure": return { text: "Found it in the Product Knowledge Center — here’s the latest version:", card: { type: "content", title: "Plus TitanLOCK Humerus Plate", items: ["Brochure (PDF)", "Surgical technique", "Product video"] } };
    case "teach": return { text: "Sure — here’s a 5-minute primer, then a quick check:", card: { type: "lesson", title: "Locking Compression Plates (LCP)", points: ["LCP combine locking and compression in one plate via combi-holes.", "Locking screws create a fixed-angle construct — useful in osteoporotic bone.", "Compression screws let you lag and compress a simple fracture.", "Don’t over-contour: locking heads need to seat true to the plate."] } };
    case "expense": return { text: "You have 2 claims in progress and 2 cleared this cycle:", card: { type: "status", lines: ["Hotel — Coimbatore · ₹6,800 · Pending", "Client lunch · ₹1,900 · Pending", "Cab visits · ₹4,250 · Approved ✓"] } };
    case "leave": return { text: "Your balances right now:", card: { type: "status", lines: ["Casual — 8 of 12 left", "Sick — 8 of 10 left", "Earned — 12 of 18 left"] } };
    case "summarise": return { text: "Quick summary of the updated Travel & Expense policy:", card: { type: "status", lines: ["Per-diem revised upward for metro cities.", "Receipt threshold simplified to a single limit.", "Approvals now route to your direct manager.", "Effective 1 June 2026."] } };
    default: return { text: "I can pull that from the company knowledge base in the live version. For this preview, try one of the suggested prompts — I can compare implants, fetch a brochure, summarise a document, teach a quick lesson, or check your expense and leave status." };
  }
}

/* ============================ HOOKS ============================ */
function useIsMobile() {
  const q = "(max-width: 480px)";
  const [m, setM] = useState(typeof window !== "undefined" ? window.matchMedia(q).matches : false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = e => setM(e.matches);
    mq.addEventListener ? mq.addEventListener("change", fn) : mq.addListener(fn);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", fn) : mq.removeListener(fn); };
  }, []);
  return m;
}

/* ============================ ARTWORK ============================ */
function HexField({ opacity = 0.5, stroke = "#ffffff" }) {
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity }} aria-hidden="true">
      <defs>
        <pattern id="hex" width="28" height="48" patternUnits="userSpaceOnUse">
          <path d="M14 0 L28 8 L28 24 L14 32 L0 24 L0 8 Z" fill="none" stroke={stroke} strokeWidth="1" />
          <path d="M14 32 L28 40 L28 56 L14 64 L0 56 L0 40 Z" fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}
function Orb({ size = 64, idle = true }) {
  return (
    <div style={{ width: size, height: size, position: "relative" }} className={idle ? "floaty" : ""}>
      <div className="glow" style={{ position: "absolute", inset: -size * 0.28, borderRadius: "50%", background: "radial-gradient(circle, rgba(182,92,97,.55), transparent 70%)", filter: "blur(8px)" }} />
      <div className="breathe grad-buddy" style={{ width: size, height: size, borderRadius: "50%", position: "relative", overflow: "hidden", boxShadow: "inset 0 6px 14px rgba(255,255,255,.28), inset 0 -8px 16px rgba(0,0,0,.25)" }}>
        <div className="spin-slow" style={{ position: "absolute", inset: "-30%", borderRadius: "50%", background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,.22), transparent 40%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><Sparkles size={size * 0.42} color="#fff" strokeWidth={1.8} /></div>
      </div>
    </div>
  );
}
function Ring({ value, size = 46, stroke = 5, color = "#601419", label }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c - (value / 100) * c;
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke="var(--bone2)" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke={color} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <span className="font-display" style={{ fontSize: size * 0.26, fontWeight: 700 }}>{label ?? `${value}%`}</span>
      </div>
    </div>
  );
}

/* ============================ SMALL UI ============================ */
const Avatar = ({ initials = "K", size = 38, dark }) => (
  <div className={dark ? "grad-ink" : "grad-buddy"} style={{ width: size, height: size, borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: size * 0.4 }}>{initials}</div>
);
const Tag = ({ children, tone = "maroon" }) => {
  const map = { maroon: { bg: "var(--bone2)", fg: "var(--maroon)" }, claret: { bg: "#F6E7E5", fg: "var(--claret)" }, gold: { bg: "#F7EEDC", fg: "var(--gold)" }, green: { bg: "#E7F1EA", fg: "#3C7A57" } }[tone];
  return <span style={{ background: map.bg, color: map.fg, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999 }}>{children}</span>;
};
const SectionTitle = ({ children, action, onAction }) => (
  <div className="flex items-center justify-between mb-3 mt-1">
    <h3 className="font-display text-ink" style={{ fontSize: 17, fontWeight: 700 }}>{children}</h3>
    {action && <button onClick={onAction} className="press text-claret flex items-center gap-0.5" style={{ fontSize: 12.5, fontWeight: 600 }}>{action}<ChevronRight size={14} /></button>}
  </div>
);
const WaBadge = () => (<span className="flex items-center gap-1 text-green" style={{ fontSize: 10.5, fontWeight: 700 }}><Check size={13} /> WhatsApp</span>);
const Header = ({ title, back }) => (
  <div className="px-5 pb-3 flex items-center gap-3" style={{ borderBottom: "1px solid var(--line)" }}>
    <button onClick={back} className="press bg-bone" style={{ width: 38, height: 38, borderRadius: 12, display: "grid", placeItems: "center" }}><ChevronLeft size={19} className="text-maroon" /></button>
    <h1 className="font-display text-ink" style={{ fontSize: 19, fontWeight: 800 }}>{title}</h1>
  </div>
);
const Field = ({ label, value, onChange, placeholder, area }) => (
  <div className="mb-3">
    <label className="text-muted" style={{ fontSize: 11.5, fontWeight: 700, display: "block", marginBottom: 5 }}>{label}</label>
    {area ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
        className="bg-bone" style={{ width: "100%", border: "1px solid var(--line)", outline: "none", borderRadius: 12, padding: "11px 13px", fontSize: 13.5, color: "var(--ink)", resize: "none" }} />
    ) : (
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="bg-bone" style={{ width: "100%", border: "1px solid var(--line)", outline: "none", borderRadius: 12, padding: "11px 13px", fontSize: 13.5, color: "var(--ink)" }} />
    )}
  </div>
);

/* ============================ STATUS BAR ============================ */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-2.5 pb-1" style={{ fontSize: 12.5, fontWeight: 600 }}>
      <span className="text-ink">9:41</span>
      <div className="flex items-center gap-1.5 text-ink">
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6" width="3" height="5" rx="1" fill="currentColor"/><rect x="4.5" y="4" width="3" height="7" rx="1" fill="currentColor"/><rect x="9" y="2" width="3" height="9" rx="1" fill="currentColor"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" fill="none" opacity="0.4"/><rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor"/><rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.5"/></svg>
      </div>
    </div>
  );
}

function TopBar({ onBell, onProfile, onAdmin, unread, boss }) {
  return (
    <div className="flex items-center justify-between px-5 pt-1 pb-3">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-muted" style={{ fontSize: 12.5 }}>Good morning,</p>
          {boss && <span className="flex items-center gap-1 grad-ink" style={{ color: "#fff", fontSize: 9.5, fontWeight: 800, padding: "2px 7px", borderRadius: 999, letterSpacing: ".04em" }}><ShieldCheck size={11} /> BOSS</span>}
        </div>
        <h1 className="font-display text-ink" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{USER.first}</h1>
      </div>
      <div className="flex items-center gap-2.5">
        {boss && (
          <button onClick={onAdmin} className="press grad-ink" style={{ width: 40, height: 40, borderRadius: 13, display: "grid", placeItems: "center" }}>
            <ShieldCheck size={19} color="#fff" />
          </button>
        )}
        <button onClick={onBell} className="press relative bg-bone" style={{ width: 40, height: 40, borderRadius: 13, display: "grid", placeItems: "center" }}>
          <Bell size={19} className="text-maroon" />
          {unread > 0 && <span className="anim-pop" style={{ position: "absolute", top: 7, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#D9483B", boxShadow: "0 0 0 2px #fff" }} />}
        </button>
        <button onClick={onProfile} className="press"><Avatar initials={USER.initials} /></button>
      </div>
    </div>
  );
}

/* ============================ HOME ============================ */
function BuddyHero({ go }) {
  return (
    <div className="grad-buddy shadow-float anim-pop" style={{ borderRadius: 26, padding: 18, position: "relative", overflow: "hidden" }}>
      <HexField opacity={0.16} />
      <div className="grad-buddy-soft" style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "relative" }}>
        <div className="flex items-start justify-between">
          <div style={{ paddingRight: 8 }}>
            <span style={{ color: "rgba(255,255,255,.85)", fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em" }}>YOUR AI ASSISTANT</span>
            <h2 className="font-display" style={{ color: "#fff", fontSize: 30, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>PLUS buddy</h2>
            <p style={{ color: "rgba(255,255,255,.88)", fontSize: 13, marginTop: 6, maxWidth: 200 }}>Ask anything — products, policies, training, or your own claims.</p>
          </div>
          <Orb size={70} />
        </div>
        <button onClick={() => go("buddy")} className="press flex items-center justify-between w-full mt-4" style={{ background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.28)", borderRadius: 14, padding: "11px 14px" }}>
          <span style={{ color: "rgba(255,255,255,.92)", fontSize: 13.5 }}>Ask PLUS buddy…</span>
          <span style={{ background: "#fff", borderRadius: 10, width: 30, height: 30, display: "grid", placeItems: "center" }}><Send size={15} className="text-maroon" /></span>
        </button>
        <div className="flex gap-2 mt-2.5 no-scrollbar" style={{ overflowX: "auto" }}>
          {["Compare two implants", "Find a brochure", "My expenses"].map((c, i) => (
            <button key={i} onClick={() => go("buddy")} className="press" style={{ whiteSpace: "nowrap", background: "rgba(255,255,255,.14)", color: "#fff", fontSize: 11.5, fontWeight: 600, padding: "6px 11px", borderRadius: 999, border: "1px solid rgba(255,255,255,.2)" }}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
function AdminCard({ go, pending, employees }) {
  return (
    <button onClick={() => go("admin")} className="press grad-ink shadow-float w-full text-left anim-pop" style={{ borderRadius: 24, padding: 16, position: "relative", overflow: "hidden", marginBottom: 16 }}>
      <HexField opacity={0.1} />
      <div style={{ position: "relative" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span style={{ background: "rgba(255,255,255,.16)", width: 34, height: 34, borderRadius: 11, display: "grid", placeItems: "center" }}><ShieldCheck size={18} color="#fff" /></span>
            <div>
              <p style={{ color: "rgba(255,255,255,.7)", fontSize: 10.5, fontWeight: 700, letterSpacing: ".06em" }}>ADMIN CONSOLE</p>
              <p className="font-display" style={{ color: "#fff", fontSize: 16, fontWeight: 800, lineHeight: 1 }}>Boss controls</p>
            </div>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,.6)" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["Approvals", pending], ["Employees", employees], ["Content", "+"]].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.1)", borderRadius: 12, padding: "9px 10px" }}>
              <p className="font-display" style={{ color: "#fff", fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{s[1]}</p>
              <p style={{ color: "rgba(255,255,255,.7)", fontSize: 10.5, marginTop: 2 }}>{s[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
function QuickActions({ go }) {
  const items = [
    { icon: Receipt, label: "Add expense", to: "expense" },
    { icon: Calendar, label: "Apply leave", to: "leave" },
    { icon: Compass, label: "Implants", to: "explore" },
    { icon: GraduationCap, label: "My training", to: "learn" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((it, i) => (
        <button key={i} onClick={() => go(it.to)} className="press flex flex-col items-center gap-1.5">
          <span className="bg-bone" style={{ width: 56, height: 56, borderRadius: 18, display: "grid", placeItems: "center" }}><it.icon size={21} className="text-maroon" /></span>
          <span className="text-ink" style={{ fontSize: 11, fontWeight: 600, textAlign: "center", lineHeight: 1.15 }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}
function BroadcastCard({ b, onOpen }) {
  return (
    <button onClick={onOpen} className="press shadow-card bg-white text-left w-full" style={{ borderRadius: 18, padding: 14, border: "1px solid var(--line)" }}>
      <div className="flex items-center justify-between mb-2"><Tag tone={b.accent}>{b.tag}</Tag><span className="text-muted" style={{ fontSize: 11 }}>{b.time}</span></div>
      <h4 className="font-display text-ink" style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>{b.title}</h4>
      <p className="text-muted" style={{ fontSize: 12.5, marginTop: 4, lineHeight: 1.4 }}>{b.body}</p>
      {b.wa && <div className="mt-2.5 pt-2.5" style={{ borderTop: "1px dashed var(--line)" }}><WaBadge /></div>}
    </button>
  );
}
function HomeScreen({ go, openBroadcast, broadcasts, courses, boss, pending, empCount }) {
  const inProgress = courses.find(c => c.progress > 0 && c.progress < 100);
  return (
    <div className="anim-screen px-5 pb-4 stagger">
      {boss && <AdminCard go={go} pending={pending} employees={empCount} />}
      <BuddyHero go={go} />
      <div className="mt-5"><QuickActions go={go} /></div>
      <div className="mt-6">
        <SectionTitle action="See all" onAction={() => go("notifications")}>Broadcasts</SectionTitle>
        <div className="flex flex-col gap-3">{broadcasts.slice(0, 2).map(b => <BroadcastCard key={b.id} b={b} onOpen={() => openBroadcast(b)} />)}</div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="shadow-card bg-white" style={{ borderRadius: 18, padding: 14, border: "1px solid var(--line)" }}>
          <p className="text-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>Pending approvals</p>
          <div className="flex items-end gap-1.5 mt-1"><span className="font-display text-maroon" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{pending}</span><span className="text-muted" style={{ fontSize: 11.5, marginBottom: 3 }}>items</span></div>
          <p className="text-muted" style={{ fontSize: 11, marginTop: 6 }}>expense &amp; leave</p>
        </div>
        <div className="shadow-card bg-white" style={{ borderRadius: 18, padding: 14, border: "1px solid var(--line)" }}>
          <p className="text-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>Leave balance</p>
          <div className="flex items-end gap-1.5 mt-1"><span className="font-display text-maroon" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>28</span><span className="text-muted" style={{ fontSize: 11.5, marginBottom: 3 }}>days</span></div>
          <p className="text-muted" style={{ fontSize: 11, marginTop: 6 }}>across all types</p>
        </div>
      </div>
      {inProgress && (
        <button onClick={() => go("learn")} className="press shadow-card bg-white w-full text-left mt-3 flex items-center gap-3.5" style={{ borderRadius: 18, padding: 14, border: "1px solid var(--line)" }}>
          <Ring value={inProgress.progress} size={48} />
          <div style={{ flex: 1 }}><p className="text-muted" style={{ fontSize: 11 }}>Continue learning</p><h4 className="font-display text-ink" style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.15 }}>{inProgress.title}</h4></div>
          <span className="bg-bone" style={{ width: 34, height: 34, borderRadius: 11, display: "grid", placeItems: "center" }}><Play size={15} className="text-maroon" /></span>
        </button>
      )}
      <div className="mt-6">
        <SectionTitle>Today at Plus</SectionTitle>
        <div className="bg-bone flex items-center gap-3" style={{ borderRadius: 18, padding: 14 }}>
          <span style={{ width: 42, height: 42, borderRadius: 13, display: "grid", placeItems: "center", background: "#fff" }}><Cake size={20} className="text-claret" /></span>
          <div style={{ flex: 1 }}><p className="text-ink" style={{ fontSize: 13.5, fontWeight: 600 }}>Arun Prakash &amp; Meera have birthdays</p><p className="text-muted" style={{ fontSize: 11.5 }}>Send them a wish in Community →</p></div>
        </div>
      </div>
    </div>
  );
}

/* ============================ PLUS BUDDY ============================ */
function TypingDots() {
  return <div className="flex items-center gap-1" style={{ padding: "10px 14px" }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--rosewood)", animation: `dot 1.2s ${i * 0.15}s infinite` }} />)}</div>;
}
function BuddyCard({ card }) {
  if (!card) return null;
  if (card.type === "compare") return (
    <div className="mt-2 bg-white" style={{ borderRadius: 14, border: "1px solid var(--line)", overflow: "hidden" }}>
      <div className="bg-bone2 px-3 py-2"><p className="font-display text-maroon" style={{ fontSize: 12.5, fontWeight: 700 }}>{card.title}</p></div>
      {card.rows.map((r, i) => (
        <div key={i} className="grid" style={{ gridTemplateColumns: "1.1fr 1fr 1fr", borderTop: i ? "1px solid var(--line)" : "none" }}>
          <div className="px-3 py-2" style={{ fontSize: 11.5, fontWeight: i ? 600 : 700, color: i ? "var(--ink)" : "var(--muted)" }}>{r[0]}</div>
          <div className="px-2 py-2" style={{ fontSize: 11.5, color: "var(--maroon)", fontWeight: 700, background: i ? "var(--bone)" : "transparent" }}>{r[1]}</div>
          <div className="px-2 py-2" style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 600 }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
  if (card.type === "content") return (
    <div className="mt-2 bg-white" style={{ borderRadius: 14, border: "1px solid var(--line)", padding: 12 }}>
      <div className="flex items-center gap-2.5 mb-2.5"><span className="grad-buddy" style={{ width: 36, height: 36, borderRadius: 11, display: "grid", placeItems: "center" }}><FileText size={17} color="#fff" /></span><p className="font-display text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{card.title}</p></div>
      <div className="flex flex-col gap-1.5">{card.items.map((it, i) => (<div key={i} className="bg-bone flex items-center justify-between press" style={{ borderRadius: 10, padding: "8px 11px" }}><span style={{ fontSize: 12, fontWeight: 600 }} className="text-ink">{it}</span>{it.includes("video") ? <Play size={14} className="text-maroon" /> : <Download size={14} className="text-maroon" />}</div>))}</div>
    </div>
  );
  if (card.type === "lesson") return (
    <div className="mt-2 bg-white" style={{ borderRadius: 14, border: "1px solid var(--line)", padding: 12 }}>
      <div className="flex items-center gap-2 mb-2"><BookOpen size={15} className="text-maroon" /><p className="font-display text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{card.title}</p></div>
      <ul className="flex flex-col gap-1.5">{card.points.map((p, i) => (<li key={i} className="flex gap-2" style={{ fontSize: 12, lineHeight: 1.4 }}><span className="text-claret" style={{ fontWeight: 800 }}>{i + 1}</span><span className="text-ink">{p}</span></li>))}</ul>
      <button className="press grad-gold w-full mt-3" style={{ borderRadius: 10, padding: "9px", color: "#fff", fontSize: 12.5, fontWeight: 700 }}>Take the 3-question quiz</button>
    </div>
  );
  if (card.type === "status") return (
    <div className="mt-2 bg-white flex flex-col gap-1.5" style={{ borderRadius: 14, border: "1px solid var(--line)", padding: 12 }}>
      {card.lines.map((l, i) => (<div key={i} className="flex items-center gap-2" style={{ fontSize: 12, lineHeight: 1.35 }}><Check size={14} className="text-maroon" style={{ flexShrink: 0 }} /><span className="text-ink">{l}</span></div>))}
    </div>
  );
  return null;
}
function BuddyScreen({ back }) {
  const [msgs, setMsgs] = useState([{ from: "buddy", text: `Hi ${USER.first} — I’m PLUS buddy. I can compare implants, fetch brochures, summarise documents, coach you through a topic, or check your claims. What do you need?` }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scroller = useRef(null);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);
  const send = (id, label) => {
    const userText = label || input.trim(); if (!userText) return;
    setMsgs(m => [...m, { from: "user", text: userText }]); setInput(""); setTyping(true);
    setTimeout(() => { const r = buddyReply(id); setTyping(false); setMsgs(m => [...m, { from: "buddy", text: r.text, card: r.card }]); }, 950);
  };
  return (
    <div className="anim-screen" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="px-5 pb-3 flex items-center gap-3" style={{ borderBottom: "1px solid var(--line)" }}>
        <button onClick={back} className="press bg-bone" style={{ width: 38, height: 38, borderRadius: 12, display: "grid", placeItems: "center" }}><ChevronLeft size={19} className="text-maroon" /></button>
        <Orb size={40} idle={false} />
        <div style={{ flex: 1 }}><h2 className="font-display text-ink" style={{ fontSize: 17, fontWeight: 800, lineHeight: 1 }}>PLUS buddy</h2><p className="text-green" style={{ fontSize: 11, fontWeight: 600 }}>● Online · grounded in company content</p></div>
      </div>
      <div ref={scroller} className="no-scrollbar px-4 py-4" style={{ flex: 1, overflowY: "auto" }}>
        {msgs.map((m, i) => (
          <div key={i} className="anim-pop" style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            <div style={{ maxWidth: "82%" }}>
              <div style={{ background: m.from === "user" ? "var(--maroon)" : "var(--bone)", color: m.from === "user" ? "#fff" : "var(--ink)", borderRadius: 16, borderBottomRightRadius: m.from === "user" ? 5 : 16, borderBottomLeftRadius: m.from === "user" ? 16 : 5, padding: "10px 14px", fontSize: 13, lineHeight: 1.45 }}>{m.text}</div>
              {m.card && <BuddyCard card={m.card} />}
            </div>
          </div>
        ))}
        {typing && <div style={{ display: "flex" }}><div className="bg-bone" style={{ borderRadius: 16, borderBottomLeftRadius: 5 }}><TypingDots /></div></div>}
      </div>
      <div className="px-4 pt-2" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="flex gap-2 pb-2.5 no-scrollbar" style={{ overflowX: "auto" }}>
          {SUGGESTIONS.map(s => (
            <button key={s.id} onClick={() => send(s.id, s.label)} className="press flex items-center gap-1.5" style={{ whiteSpace: "nowrap", background: "var(--bone2)", borderRadius: 999, padding: "7px 12px" }}>
              <span className="text-claret" style={{ fontSize: 10, fontWeight: 800 }}>{s.role.toUpperCase()}</span><span className="text-ink" style={{ fontSize: 12, fontWeight: 600 }}>{s.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pb-3">
          <div className="bg-bone flex items-center" style={{ flex: 1, borderRadius: 14, padding: "4px 4px 4px 14px" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(null)} placeholder="Message PLUS buddy…" style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "var(--ink)" }} />
            <button onClick={() => send(null)} className="press grad-buddy" style={{ width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", flexShrink: 0 }}><Send size={17} color="#fff" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ EXPLORE ============================ */
function ImplantCard({ im, onOpen }) {
  return (
    <button onClick={onOpen} className="press shadow-card bg-white text-left" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--line)" }}>
      <div style={{ height: 96, background: im.color, position: "relative", overflow: "hidden" }}>
        <HexField opacity={0.22} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,.14), transparent 60%)" }} />
        <div style={{ position: "absolute", left: 12, top: 11 }}><Tag tone="gold">{im.cat}</Tag></div>
        <div style={{ position: "absolute", right: -14, bottom: -14, width: 80, height: 80, borderRadius: "50%", border: "10px solid rgba(255,255,255,.18)" }} />
      </div>
      <div style={{ padding: 12 }}>
        <h4 className="font-display text-ink" style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.15 }}>{im.name}</h4>
        <p className="text-muted" style={{ fontSize: 11.5, marginTop: 3, lineHeight: 1.3 }}>{im.tagline}</p>
      </div>
    </button>
  );
}
function ExploreScreen({ openImplant, implants }) {
  const [seg, setSeg] = useState("Implants");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = implants.filter(i => (cat === "All" || i.cat === cat) && i.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="anim-screen px-5 pb-4">
      <h1 className="font-display text-ink" style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Explore</h1>
      <div className="bg-bone flex p-1 mb-4" style={{ borderRadius: 14 }}>
        {["Implants", "Surgeon education"].map(s => (<button key={s} onClick={() => setSeg(s)} className="press" style={{ flex: 1, padding: "9px", borderRadius: 11, fontSize: 12.5, fontWeight: 700, background: seg === s ? "#fff" : "transparent", color: seg === s ? "var(--maroon)" : "var(--muted)", boxShadow: seg === s ? "0 2px 8px -3px rgba(96,20,25,.25)" : "none", transition: "all .2s" }}>{s}</button>))}
      </div>
      {seg === "Implants" ? (
        <>
          <div className="bg-bone flex items-center gap-2 mb-3" style={{ borderRadius: 13, padding: "10px 13px" }}><Search size={17} className="text-muted" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search the implant library" style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "var(--ink)" }} /></div>
          <div className="flex gap-2 mb-4 no-scrollbar" style={{ overflowX: "auto" }}>{IMPLANT_CATS.map(c => (<button key={c} onClick={() => setCat(c)} className="press" style={{ whiteSpace: "nowrap", padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, background: cat === c ? "var(--maroon)" : "var(--bone2)", color: cat === c ? "#fff" : "var(--ink)", transition: "all .2s" }}>{c}</button>))}</div>
          <div className="grid grid-cols-2 gap-3 stagger">{list.map(im => <ImplantCard key={im.id} im={im} onOpen={() => openImplant(im)} />)}</div>
          {list.length === 0 && <p className="text-muted text-center" style={{ fontSize: 13, marginTop: 40 }}>No implants match that search yet.</p>}
        </>
      ) : (
        <div className="flex flex-col gap-3 stagger">{SURGEON.map(s => (
          <div key={s.id} className="press shadow-card bg-white flex items-center gap-3" style={{ borderRadius: 18, padding: 12, border: "1px solid var(--line)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: s.color, position: "relative", overflow: "hidden", flexShrink: 0, display: "grid", placeItems: "center" }}><HexField opacity={0.2} />{s.type === "Webinar" ? <Video size={22} color="#fff" style={{ position: "relative" }} /> : <Play size={22} color="#fff" style={{ position: "relative" }} />}</div>
            <div style={{ flex: 1 }}><Tag tone="claret">{s.type}</Tag><h4 className="font-display text-ink" style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.15, marginTop: 5 }}>{s.title}</h4><p className="text-muted" style={{ fontSize: 11.5, marginTop: 2 }}>{s.who}</p></div>
          </div>
        ))}</div>
      )}
    </div>
  );
}
function ImplantDetail({ im, back }) {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Technical", "vs Competitor", "Downloads"];
  return (
    <div className="anim-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 170, background: im.color, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <HexField opacity={0.22} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.12), transparent 40%, rgba(0,0,0,.18))" }} />
        <button onClick={back} className="press" style={{ position: "absolute", left: 16, top: 14, width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,.22)", display: "grid", placeItems: "center" }}><ChevronLeft size={20} color="#fff" /></button>
        <button className="press" style={{ position: "absolute", right: 16, top: 14, width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,.22)", display: "grid", placeItems: "center" }}><Bookmark size={18} color="#fff" /></button>
        <div style={{ position: "absolute", left: 18, bottom: 16, right: 18 }}><Tag tone="gold">{im.cat}</Tag><h1 className="font-display" style={{ color: "#fff", fontSize: 23, fontWeight: 800, lineHeight: 1.05, marginTop: 8 }}>{im.name}</h1><p style={{ color: "rgba(255,255,255,.9)", fontSize: 13, marginTop: 3 }}>{im.tagline}</p></div>
      </div>
      <div className="flex gap-1 px-4 pt-3 no-scrollbar" style={{ overflowX: "auto", borderBottom: "1px solid var(--line)", flexShrink: 0 }}>
        {tabs.map(t => (<button key={t} onClick={() => setTab(t)} className="press" style={{ position: "relative", padding: "8px 12px 12px", whiteSpace: "nowrap", fontSize: 13, fontWeight: 700, color: tab === t ? "var(--maroon)" : "var(--muted)" }}>{t}{tab === t && <span className="anim-pop bg-maroon" style={{ position: "absolute", left: 12, right: 12, bottom: 0, height: 3, borderRadius: 3 }} />}</button>))}
      </div>
      <div className="no-scrollbar px-5 py-4" style={{ flex: 1, overflowY: "auto" }}>
        {tab === "Overview" && (<div className="anim-pop">
          <SectionTitle>Indications</SectionTitle>
          <div className="flex flex-col gap-2 mb-5">{im.indications.map((x, i) => (<div key={i} className="bg-bone flex items-center gap-2.5" style={{ borderRadius: 12, padding: "11px 13px" }}><BadgeCheck size={17} className="text-maroon" /><span className="text-ink" style={{ fontSize: 13 }}>{x}</span></div>))}</div>
          <SectionTitle>Material &amp; sizes</SectionTitle>
          <div className="shadow-card bg-white" style={{ borderRadius: 14, padding: 14, border: "1px solid var(--line)" }}><p className="text-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>Material</p><p className="text-ink" style={{ fontSize: 13.5, marginTop: 2, marginBottom: 10 }}>{im.material}</p><p className="text-muted" style={{ fontSize: 11.5, fontWeight: 600 }}>Sizes</p><p className="text-ink" style={{ fontSize: 13.5, marginTop: 2 }}>{im.sizes}</p></div>
        </div>)}
        {tab === "Technical" && (<div className="anim-pop flex flex-col gap-2.5">{im.specs.map((s, i) => (<div key={i} className="flex items-center justify-between shadow-card bg-white" style={{ borderRadius: 13, padding: "13px 15px", border: "1px solid var(--line)" }}><span className="text-muted" style={{ fontSize: 13 }}>{s[0]}</span><span className="font-display text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{s[1]}</span></div>))}</div>)}
        {tab === "vs Competitor" && (<div className="anim-pop shadow-card bg-white" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)" }}>{im.vs.map((r, i) => (<div key={i} className="grid" style={{ gridTemplateColumns: "1.1fr 1fr 1fr", borderTop: i ? "1px solid var(--line)" : "none", background: i === 0 ? "var(--bone2)" : "transparent" }}><div className="px-3 py-2.5" style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? "var(--maroon)" : "var(--ink)" }}>{r[0]}</div><div className="px-2 py-2.5" style={{ fontSize: 12, fontWeight: 700, color: "var(--maroon)", background: i === 0 ? "transparent" : "var(--bone)" }}>{r[1]}</div><div className="px-2 py-2.5" style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{r[2]}</div></div>))}</div>)}
        {tab === "Downloads" && (<div className="anim-pop flex flex-col gap-2.5">{im.downloads.map((d, i) => (<button key={i} className="press flex items-center justify-between shadow-card bg-white" style={{ borderRadius: 13, padding: "13px 15px", border: "1px solid var(--line)" }}><span className="flex items-center gap-2.5"><FileText size={17} className="text-maroon" /><span className="text-ink" style={{ fontSize: 13, fontWeight: 600 }}>{d}</span></span><Download size={16} className="text-claret" /></button>))}</div>)}
      </div>
    </div>
  );
}

/* ============================ LEARN ============================ */
function LearnScreen({ courses }) {
  const [track, setTrack] = useState("Product");
  const list = courses.filter(c => c.track === track);
  const totalPts = courses.reduce((s, c) => s + c.points, 0);
  return (
    <div className="anim-screen px-5 pb-4">
      <h1 className="font-display text-ink" style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Training Academy</h1>
      <div className="grad-gold shadow-float" style={{ borderRadius: 20, padding: 16, position: "relative", overflow: "hidden", marginBottom: 18 }}>
        <HexField opacity={0.14} />
        <div className="flex items-center justify-between" style={{ position: "relative" }}>
          <div><p style={{ color: "rgba(255,255,255,.9)", fontSize: 12, fontWeight: 600 }}>Your learning points</p><p className="font-display" style={{ color: "#fff", fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{totalPts}</p><div className="flex items-center gap-1.5 mt-2" style={{ color: "#fff" }}><Flame size={15} /><span style={{ fontSize: 12, fontWeight: 600 }}>6-day streak</span></div></div>
          <div style={{ background: "rgba(255,255,255,.22)", borderRadius: 16, padding: "10px 14px", textAlign: "center" }}><Trophy size={26} color="#fff" /><p style={{ color: "#fff", fontSize: 11, fontWeight: 700, marginTop: 4 }}>Rank #4</p></div>
        </div>
      </div>
      <div className="bg-bone flex p-1 mb-4" style={{ borderRadius: 14 }}>{["Product", "Sales"].map(s => (<button key={s} onClick={() => setTrack(s)} className="press" style={{ flex: 1, padding: "9px", borderRadius: 11, fontSize: 12.5, fontWeight: 700, background: track === s ? "#fff" : "transparent", color: track === s ? "var(--maroon)" : "var(--muted)", boxShadow: track === s ? "0 2px 8px -3px rgba(96,20,25,.25)" : "none", transition: "all .2s" }}>{s} training</button>))}</div>
      <div className="flex flex-col gap-3 stagger">{list.map(c => (
        <div key={c.id} className="press shadow-card bg-white flex items-center gap-3.5" style={{ borderRadius: 18, padding: 14, border: "1px solid var(--line)" }}>
          <Ring value={c.progress} size={50} label={c.progress === 100 ? "✓" : `${c.progress}%`} />
          <div style={{ flex: 1 }}><h4 className="font-display text-ink" style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.15 }}>{c.title}</h4><div className="flex items-center gap-3 mt-1.5 text-muted" style={{ fontSize: 11.5 }}><span className="flex items-center gap-1"><BookOpen size={12} />{c.lessons} lessons</span><span className="flex items-center gap-1"><Clock size={12} />{c.mins} min</span></div></div>
          <span className="bg-bone" style={{ width: 34, height: 34, borderRadius: 11, display: "grid", placeItems: "center", flexShrink: 0 }}>{c.progress === 100 ? <Award size={16} className="text-gold" /> : <Play size={15} className="text-maroon" />}</span>
        </div>
      ))}</div>
    </div>
  );
}

/* ============================ COMMUNITY ============================ */
function CommunityScreen() {
  const [tab, setTab] = useState("Feed");
  const [liked, setLiked] = useState({});
  const filtered = POSTS.filter(p => tab === "Feed" || (tab === "Wins" && p.type === "Win") || (tab === "Ideas" && p.type === "Idea"));
  const iconFor = t => t === "Win" ? Trophy : t === "Idea" ? Lightbulb : Stethoscope;
  return (
    <div className="anim-screen px-5 pb-4">
      <div className="flex items-center justify-between mb-3"><h1 className="font-display text-ink" style={{ fontSize: 24, fontWeight: 800 }}>Community</h1><button className="press grad-buddy flex items-center gap-1.5" style={{ borderRadius: 999, padding: "8px 14px", color: "#fff", fontSize: 12.5, fontWeight: 700 }}><Plus size={15} /> Post</button></div>
      <div className="flex gap-2 mb-4">{POST_TABS.map(t => (<button key={t} onClick={() => setTab(t)} className="press" style={{ padding: "7px 16px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, background: tab === t ? "var(--maroon)" : "var(--bone2)", color: tab === t ? "#fff" : "var(--ink)", transition: "all .2s" }}>{t}</button>))}</div>
      <div className="flex flex-col gap-3.5 stagger">{filtered.map(p => {
        const Icon = iconFor(p.type); const isLiked = liked[p.id];
        return (
          <div key={p.id} className="shadow-card bg-white" style={{ borderRadius: 20, padding: 15, border: "1px solid var(--line)" }}>
            <div className="flex items-center gap-2.5 mb-3"><Avatar initials={p.author.split(" ").map(w => w[0]).join("").slice(0, 2)} size={40} /><div style={{ flex: 1 }}><p className="text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{p.author}</p><p className="text-muted" style={{ fontSize: 11.5 }}>{p.role} · {p.time}</p></div><span style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 10, background: "var(--bone2)" }}><Icon size={15} className="text-maroon" /></span></div>
            <p className="text-ink" style={{ fontSize: 13.5, lineHeight: 1.5 }}>{p.body}</p>
            <div className="flex items-center gap-5 mt-3.5 pt-3" style={{ borderTop: "1px solid var(--line)" }}>
              <button onClick={() => setLiked(l => ({ ...l, [p.id]: !l[p.id] }))} className="press flex items-center gap-1.5" style={{ color: isLiked ? "var(--maroon)" : "var(--muted)" }}><Heart size={17} fill={isLiked ? "var(--maroon)" : "none"} /><span style={{ fontSize: 12.5, fontWeight: 600 }}>{p.likes + (isLiked ? 1 : 0)}</span></button>
              <button className="press flex items-center gap-1.5 text-muted"><MessageCircle size={17} /><span style={{ fontSize: 12.5, fontWeight: 600 }}>{p.comments}</span></button>
              <button className="press flex items-center gap-1.5 text-muted" style={{ marginLeft: "auto" }}><ThumbsUp size={16} /></button>
            </div>
          </div>
        );
      })}</div>
    </div>
  );
}

/* ============================ NOTIFICATIONS ============================ */
function NotificationsScreen({ back, broadcasts }) {
  const tagIcon = { Launch: Sparkles, Catalog: FileText, Incentive: Wallet, Policy: Info };
  const extras = [
    { id: "a1", icon: Wallet, title: "Expense claim approved", body: "₹4,250 travel claim cleared by Finance.", time: "5h", wa: false },
    { id: "a2", icon: GraduationCap, title: "Continue ‘Knee Arthroplasty Fundamentals’", body: "You’re 60% through — 2 lessons left.", time: "1d", wa: false },
  ];
  return (
    <div className="anim-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header title="Notifications" back={back} />
      <div className="no-scrollbar px-5 py-4" style={{ flex: 1, overflowY: "auto" }}>
        <div className="flex items-start gap-2.5 mb-4" style={{ background: "#EAF6EE", borderRadius: 14, padding: "12px 14px" }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}><Check size={16} color="#fff" /></span>
          <p style={{ fontSize: 12.5, color: "#256B3C", lineHeight: 1.4 }}><b>Broadcasts also reach your WhatsApp.</b> Company announcements are delivered here and mirrored to WhatsApp so you never miss one.</p>
        </div>
        <div className="flex flex-col gap-2.5 stagger">
          {broadcasts.map(b => { const Icon = tagIcon[b.tag] || Megaphone; return (
            <div key={b.id} className="shadow-card bg-white flex gap-3" style={{ borderRadius: 16, padding: 13, border: "1px solid var(--line)" }}>
              <span className="bg-bone" style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon size={18} className="text-maroon" /></span>
              <div style={{ flex: 1 }}><div className="flex items-center justify-between"><h4 className="text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{b.title}</h4><span className="text-muted" style={{ fontSize: 11 }}>{b.time}</span></div><p className="text-muted" style={{ fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>{b.body}</p>{b.wa && <div className="mt-2"><WaBadge /></div>}</div>
            </div>
          ); })}
          {extras.map(n => (
            <div key={n.id} className="shadow-card bg-white flex gap-3" style={{ borderRadius: 16, padding: 13, border: "1px solid var(--line)" }}>
              <span className="bg-bone" style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0 }}><n.icon size={18} className="text-maroon" /></span>
              <div style={{ flex: 1 }}><div className="flex items-center justify-between"><h4 className="text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{n.title}</h4><span className="text-muted" style={{ fontSize: 11 }}>{n.time}</span></div><p className="text-muted" style={{ fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>{n.body}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ PROFILE ============================ */
function ProfileScreen({ go, back, role, setRole }) {
  const boss = role === "boss";
  const items = [
    ...(boss ? [{ icon: ShieldCheck, label: "Admin Console", sub: "Approvals, employees, content, broadcast", to: "admin", hot: true }] : []),
    { icon: Receipt, label: "Expenses", sub: "Your claims", to: "expense" },
    { icon: Calendar, label: "Leave & attendance", sub: "28 days balance", to: "leave" },
    { icon: Bell, label: "Notifications", sub: "WhatsApp mirroring on", to: "notifications" },
    { icon: HelpCircle, label: "Help & support", sub: "Ask PLUS buddy or the team", to: null },
    { icon: Info, label: "About PLUS ONE", sub: "Version 1.0 preview", to: null },
  ];
  return (
    <div className="anim-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header title="Profile" back={back} />
      <div className="no-scrollbar px-5 py-5" style={{ flex: 1, overflowY: "auto" }}>
        <div className="grad-buddy shadow-float" style={{ borderRadius: 22, padding: 18, position: "relative", overflow: "hidden", marginBottom: 16 }}>
          <HexField opacity={0.14} />
          <div className="flex items-center gap-3.5" style={{ position: "relative" }}><div style={{ background: "rgba(255,255,255,.9)", borderRadius: "50%", padding: 2 }}><Avatar initials={USER.initials} size={56} /></div><div><h2 className="font-display" style={{ color: "#fff", fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{USER.name}</h2><p style={{ color: "rgba(255,255,255,.88)", fontSize: 12.5, marginTop: 4 }}>{USER.role}</p><p style={{ color: "rgba(255,255,255,.7)", fontSize: 11.5 }}>{USER.dept}</p></div></div>
        </div>

        {/* ACCESS SWITCH */}
        <div className="shadow-card bg-white" style={{ borderRadius: 18, padding: 14, border: "1px solid var(--line)", marginBottom: 18 }}>
          <div className="flex items-center gap-2 mb-1"><ShieldCheck size={15} className="text-claret" /><p className="font-display text-ink" style={{ fontSize: 14, fontWeight: 700 }}>Access level</p></div>
          <p className="text-muted" style={{ fontSize: 11.5, marginBottom: 11 }}>Switch to Boss to upload content, add employees, approve expenses, and broadcast.</p>
          <div className="bg-bone flex p-1" style={{ borderRadius: 13 }}>
            {[["employee", "Employee"], ["boss", "Boss / Admin"]].map(([v, l]) => (
              <button key={v} onClick={() => setRole(v)} className="press flex items-center justify-center gap-1.5" style={{ flex: 1, padding: "10px", borderRadius: 10, fontSize: 12.5, fontWeight: 700, background: role === v ? (v === "boss" ? "var(--ink)" : "#fff") : "transparent", color: role === v ? (v === "boss" ? "#fff" : "var(--maroon)") : "var(--muted)", boxShadow: role === v ? "0 2px 8px -3px rgba(58,52,54,.3)" : "none", transition: "all .2s" }}>{v === "boss" && <ShieldCheck size={13} />}{l}</button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 stagger">
          {items.map((it, i) => (
            <button key={i} onClick={() => it.to && go(it.to)} className="press shadow-card flex items-center gap-3.5 w-full text-left" style={{ borderRadius: 16, padding: 14, border: "1px solid var(--line)", background: it.hot ? "var(--ink)" : "#fff" }}>
              <span style={{ width: 42, height: 42, borderRadius: 13, display: "grid", placeItems: "center", flexShrink: 0, background: it.hot ? "rgba(255,255,255,.16)" : "var(--bone)" }}><it.icon size={19} color={it.hot ? "#fff" : "var(--maroon)"} /></span>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 700, color: it.hot ? "#fff" : "var(--ink)" }}>{it.label}</p><p style={{ fontSize: 11.5, color: it.hot ? "rgba(255,255,255,.7)" : "var(--muted)" }}>{it.sub}</p></div>
              <ChevronRight size={18} color={it.hot ? "rgba(255,255,255,.6)" : "var(--muted)"} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ EXPENSE (employee) ============================ */
function ExpenseScreen({ back, expenses, addExpense }) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const mine = expenses.filter(e => e.who === "You");
  const startScan = () => { setScanning(true); setTimeout(() => { setScanning(false); setScanned(true); }, 1400); };
  const submit = () => { addExpense({ who: "You", title: "Hotel — Coimbatore tender", cat: "Stay", amount: 6800, status: "Pending", date: "Today" }); setScanned(false); };
  return (
    <div className="anim-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header title="Expenses" back={back} />
      <div className="no-scrollbar px-5 py-4" style={{ flex: 1, overflowY: "auto" }}>
        <div className="shadow-card bg-white mb-5" style={{ borderRadius: 20, padding: 16, border: "1px solid var(--line)" }}>
          <div className="flex items-center gap-2 mb-1"><Sparkles size={15} className="text-claret" /><p className="font-display text-ink" style={{ fontSize: 14.5, fontWeight: 700 }}>New claim</p></div>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 13 }}>Snap a receipt — PLUS buddy reads the amount and category for you.</p>
          {!scanned ? (
            <button onClick={startScan} disabled={scanning} className="press grad-buddy w-full flex items-center justify-center gap-2" style={{ borderRadius: 13, padding: "12px", color: "#fff", fontSize: 13.5, fontWeight: 700, opacity: scanning ? 0.85 : 1 }}>{scanning ? <><ScanLine size={17} className="anim-pop" /> Reading receipt…</> : <><Camera size={17} /> Scan receipt</>}</button>
          ) : (
            <div className="anim-pop bg-bone" style={{ borderRadius: 13, padding: 14 }}>
              <div className="flex items-center gap-1.5 mb-2.5 text-green"><BadgeCheck size={16} /><span style={{ fontSize: 12, fontWeight: 700 }}>Receipt read automatically</span></div>
              <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 5 }}><span className="text-muted">Merchant</span><span className="text-ink" style={{ fontWeight: 600 }}>Taj Coromandel</span></div>
              <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 5 }}><span className="text-muted">Category</span><span className="text-ink" style={{ fontWeight: 600 }}>Stay</span></div>
              <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 12 }}><span className="text-muted">Amount</span><span className="font-display text-maroon" style={{ fontWeight: 800 }}>₹6,800</span></div>
              <button onClick={submit} className="press bg-maroon w-full" style={{ borderRadius: 11, padding: "10px", color: "#fff", fontSize: 13, fontWeight: 700 }}>Submit for approval</button>
            </div>
          )}
        </div>
        <SectionTitle>Your claims</SectionTitle>
        <div className="flex flex-col gap-2.5 stagger">{mine.map(e => (
          <div key={e.id} className="shadow-card bg-white flex items-center gap-3" style={{ borderRadius: 15, padding: 13, border: "1px solid var(--line)" }}>
            <span className="bg-bone2" style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0 }}><Receipt size={17} className="text-maroon" /></span>
            <div style={{ flex: 1 }}><p className="text-ink" style={{ fontSize: 13.5, fontWeight: 600 }}>{e.title}</p><p className="text-muted" style={{ fontSize: 11.5 }}>{e.cat} · {e.date}</p></div>
            <div style={{ textAlign: "right" }}><p className="font-display text-ink" style={{ fontSize: 14, fontWeight: 700 }}>₹{e.amount.toLocaleString("en-IN")}</p><span style={{ fontSize: 10.5, fontWeight: 700, color: e.status === "Approved" ? "#3C7A57" : e.status === "Rejected" ? "#C0453B" : "var(--gold)" }}>{e.status}</span></div>
          </div>
        ))}</div>
      </div>
    </div>
  );
}

/* ============================ LEAVE ============================ */
function LeaveScreen({ back }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="anim-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header title="Leave & attendance" back={back} />
      <div className="no-scrollbar px-5 py-4" style={{ flex: 1, overflowY: "auto" }}>
        <SectionTitle>Your balance</SectionTitle>
        <div className="grid grid-cols-3 gap-3 mb-5">{LEAVE.map((l, i) => (<div key={i} className="shadow-card bg-white flex flex-col items-center" style={{ borderRadius: 16, padding: "14px 8px", border: "1px solid var(--line)" }}><Ring value={Math.round(((l.total - l.used) / l.total) * 100)} size={52} color={l.color} label={`${l.total - l.used}`} /><p className="text-ink" style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>{l.label}</p><p className="text-muted" style={{ fontSize: 10.5 }}>of {l.total} left</p></div>))}</div>
        <div className="shadow-card bg-white mb-5" style={{ borderRadius: 18, padding: 16, border: "1px solid var(--line)" }}>
          <div className="flex items-center gap-2 mb-1"><MapPin size={15} className="text-claret" /><p className="font-display text-ink" style={{ fontSize: 14.5, fontWeight: 700 }}>Field check-in</p></div>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 13 }}>Geo-tag your visit at a hospital, distributor, or surgeon meeting.</p>
          {!checked ? (
            <button onClick={() => setChecked(true)} className="press grad-buddy w-full flex items-center justify-center gap-2" style={{ borderRadius: 13, padding: "12px", color: "#fff", fontSize: 13.5, fontWeight: 700 }}><MapPin size={17} /> Check in now</button>
          ) : (
            <div className="anim-pop bg-bone flex items-center gap-2.5" style={{ borderRadius: 13, padding: 14 }}><BadgeCheck size={18} className="text-green" /><div><p className="text-ink" style={{ fontSize: 13, fontWeight: 700 }}>Checked in · Apollo Hospital, Chennai</p><p className="text-muted" style={{ fontSize: 11.5 }}>9:41 AM · location tagged</p></div></div>
          )}
        </div>
        <SectionTitle>Apply for leave</SectionTitle>
        <div className="shadow-card bg-white flex flex-col gap-2.5" style={{ borderRadius: 18, padding: 16, border: "1px solid var(--line)" }}>
          {[["Type", "Casual leave"], ["From", "12 June 2026"], ["To", "12 June 2026"]].map((r, i) => (<div key={i} className="bg-bone flex items-center justify-between" style={{ borderRadius: 12, padding: "12px 14px" }}><span className="text-muted" style={{ fontSize: 12.5 }}>{r[0]}</span><span className="text-ink flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 600 }}>{r[1]} <ChevronRight size={14} className="text-muted" /></span></div>))}
          <button className="press bg-maroon w-full mt-1" style={{ borderRadius: 12, padding: "12px", color: "#fff", fontSize: 13.5, fontWeight: 700 }}>Submit request</button>
        </div>
      </div>
    </div>
  );
}

/* ============================ ADMIN CONSOLE ============================ */
function AdminConsole({ back, expenses, decide, employees, addEmployee, content, addContent, sendBroadcast }) {
  const [tab, setTab] = useState("Dashboard");
  const tabs = [["Dashboard", LayoutDashboard], ["Approvals", Inbox], ["Employees", Users], ["Content", Boxes], ["Broadcast", Megaphone]];
  const pending = expenses.filter(e => e.status === "Pending");

  const [eName, setEName] = useState(""); const [eRole, setERole] = useState(""); const [eDept, setEDept] = useState("");
  const submitEmp = () => { if (!eName.trim()) return; addEmployee({ name: eName, role: eRole || "Team member", dept: eDept || "Plus Orthopedics" }); setEName(""); setERole(""); setEDept(""); };

  const cTypes = ["Brochure", "Implant", "Training", "Surgeon"];
  const [cType, setCType] = useState("Brochure"); const [cTitle, setCTitle] = useState(""); const [cCat, setCCat] = useState("Trauma"); const [cFile, setCFile] = useState("");
  const fileRef = useRef(null);
  const submitContent = () => { if (!cTitle.trim()) return; addContent({ type: cType, title: cTitle, cat: cCat, file: cFile }); setCTitle(""); setCFile(""); };

  const bTags = ["Launch", "Catalog", "Incentive", "Policy"];
  const [bTag, setBTag] = useState("Launch"); const [bTitle, setBTitle] = useState(""); const [bBody, setBBody] = useState(""); const [bWa, setBWa] = useState(true);
  const submitBroadcast = () => { if (!bTitle.trim()) return; sendBroadcast({ tag: bTag, title: bTitle, body: bBody || "—", wa: bWa }); setBTitle(""); setBBody(""); };

  return (
    <div className="anim-screen" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="grad-ink px-5 pb-3 pt-1" style={{ position: "relative", overflow: "hidden" }}>
        <HexField opacity={0.1} />
        <div className="flex items-center gap-3" style={{ position: "relative" }}>
          <button onClick={back} className="press" style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,.16)", display: "grid", placeItems: "center" }}><ChevronLeft size={19} color="#fff" /></button>
          <div><p style={{ color: "rgba(255,255,255,.65)", fontSize: 10.5, fontWeight: 700, letterSpacing: ".06em" }}>BOSS ACCESS</p><h1 className="font-display" style={{ color: "#fff", fontSize: 19, fontWeight: 800, lineHeight: 1 }}>Admin Console</h1></div>
        </div>
        <div className="flex gap-1.5 mt-3 no-scrollbar" style={{ overflowX: "auto", position: "relative" }}>
          {tabs.map(([t, Icon]) => (<button key={t} onClick={() => setTab(t)} className="press flex items-center gap-1.5" style={{ whiteSpace: "nowrap", padding: "7px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: tab === t ? "#fff" : "rgba(255,255,255,.12)", color: tab === t ? "var(--ink)" : "rgba(255,255,255,.8)" }}><Icon size={13} />{t}</button>))}
        </div>
      </div>

      <div className="no-scrollbar px-5 py-4" style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        {tab === "Dashboard" && (
          <div className="anim-pop">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[["Pending approvals", pending.length, Inbox, "maroon"], ["Employees", employees.length, Users, "claret"], ["Content items", content.length, Boxes, "maroon"], ["Broadcasts", "Send", Megaphone, "gold"]].map(([label, value, Icon, color], i) => (
                <div key={i} className="shadow-card bg-white" style={{ borderRadius: 16, padding: 14, border: "1px solid var(--line)" }}>
                  <span className="bg-bone" style={{ width: 36, height: 36, borderRadius: 11, display: "grid", placeItems: "center" }}><Icon size={17} className={`text-${color}`} /></span>
                  <p className="font-display text-ink" style={{ fontSize: 24, fontWeight: 800, marginTop: 9, lineHeight: 1 }}>{value}</p>
                  <p className="text-muted" style={{ fontSize: 11.5, marginTop: 3 }}>{label}</p>
                </div>
              ))}
            </div>
            <SectionTitle>Quick actions</SectionTitle>
            <div className="flex flex-col gap-2.5">
              {[["Review expense approvals", Inbox, "Approvals"], ["Add a new employee", UserPlus, "Employees"], ["Upload material & content", UploadCloud, "Content"], ["Send a broadcast", Megaphone, "Broadcast"]].map(([l, Icon, to], i) => (
                <button key={i} onClick={() => setTab(to)} className="press shadow-card bg-white flex items-center gap-3.5 w-full text-left" style={{ borderRadius: 15, padding: 13, border: "1px solid var(--line)" }}><span className="bg-bone" style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center" }}><Icon size={18} className="text-maroon" /></span><span className="text-ink" style={{ fontSize: 13.5, fontWeight: 700, flex: 1 }}>{l}</span><ChevronRight size={17} className="text-muted" /></button>
              ))}
            </div>
          </div>
        )}

        {tab === "Approvals" && (
          <div className="anim-pop">
            <SectionTitle>Pending ({pending.length})</SectionTitle>
            <div className="flex flex-col gap-3">{pending.map(e => (
              <div key={e.id} className="shadow-card bg-white" style={{ borderRadius: 16, padding: 14, border: "1px solid var(--line)" }}>
                <div className="flex items-center gap-2.5 mb-3"><Avatar initials={e.who.split(" ").map(w => w[0]).join("").slice(0, 2)} size={36} dark /><div style={{ flex: 1 }}><p className="text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{e.title}</p><p className="text-muted" style={{ fontSize: 11.5 }}>{e.who} · {e.cat} · {e.date}</p></div><p className="font-display text-maroon" style={{ fontSize: 16, fontWeight: 800 }}>₹{e.amount.toLocaleString("en-IN")}</p></div>
                <div className="flex gap-2.5">
                  <button onClick={() => decide(e.id, "Rejected")} className="press flex-1 flex items-center justify-center gap-1.5" style={{ borderRadius: 11, padding: "9px", background: "var(--bone2)", color: "var(--ink)", fontSize: 12.5, fontWeight: 700 }}><XCircle size={15} /> Reject</button>
                  <button onClick={() => decide(e.id, "Approved")} className="press flex-1 flex items-center justify-center gap-1.5 bg-maroon" style={{ borderRadius: 11, padding: "9px", color: "#fff", fontSize: 12.5, fontWeight: 700 }}><CheckCircle2 size={15} /> Approve</button>
                </div>
              </div>
            ))}
            {pending.length === 0 && <div className="text-center" style={{ padding: "40px 0" }}><BadgeCheck size={34} className="text-green" style={{ margin: "0 auto 10px" }} /><p className="text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>All caught up</p><p className="text-muted" style={{ fontSize: 12 }}>No claims waiting for approval.</p></div>}
            </div>
            <SectionTitle>Recently decided</SectionTitle>
            <div className="flex flex-col gap-2">{expenses.filter(e => e.status !== "Pending").slice(0, 4).map(e => (
              <div key={e.id} className="flex items-center gap-3 bg-bone" style={{ borderRadius: 12, padding: "10px 13px" }}><span style={{ width: 26, height: 26, borderRadius: 8, display: "grid", placeItems: "center", background: e.status === "Approved" ? "#E7F1EA" : "#F7E7E5" }}>{e.status === "Approved" ? <Check size={14} className="text-green" /> : <X size={14} style={{ color: "#C0453B" }} />}</span><div style={{ flex: 1 }}><p className="text-ink" style={{ fontSize: 12.5, fontWeight: 600 }}>{e.title}</p><p className="text-muted" style={{ fontSize: 11 }}>{e.who}</p></div><span style={{ fontSize: 11, fontWeight: 700, color: e.status === "Approved" ? "#3C7A57" : "#C0453B" }}>{e.status}</span></div>
            ))}</div>
          </div>
        )}

        {tab === "Employees" && (
          <div className="anim-pop">
            <div className="shadow-card bg-white mb-5" style={{ borderRadius: 18, padding: 16, border: "1px solid var(--line)" }}>
              <div className="flex items-center gap-2 mb-3"><UserPlus size={16} className="text-claret" /><p className="font-display text-ink" style={{ fontSize: 14.5, fontWeight: 700 }}>Add employee</p></div>
              <Field label="Full name" value={eName} onChange={setEName} placeholder="e.g. Ravi Shankar" />
              <Field label="Role" value={eRole} onChange={setERole} placeholder="e.g. Sales Executive" />
              <Field label="Department / region" value={eDept} onChange={setEDept} placeholder="e.g. Trauma · Madurai" />
              <button onClick={submitEmp} className="press bg-maroon w-full flex items-center justify-center gap-2" style={{ borderRadius: 12, padding: "12px", color: "#fff", fontSize: 13.5, fontWeight: 700 }}><Plus size={16} /> Add to directory</button>
            </div>
            <SectionTitle>Directory ({employees.length})</SectionTitle>
            <div className="flex flex-col gap-2.5 stagger">{employees.map(emp => (
              <div key={emp.id} className="shadow-card bg-white flex items-center gap-3" style={{ borderRadius: 15, padding: 12, border: "1px solid var(--line)" }}><Avatar initials={emp.initials} size={40} dark /><div style={{ flex: 1 }}><p className="text-ink" style={{ fontSize: 13.5, fontWeight: 700 }}>{emp.name}</p><p className="text-muted" style={{ fontSize: 11.5 }}>{emp.role} · {emp.dept}</p></div><span className="bg-bone" style={{ width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center" }}><ChevronRight size={15} className="text-muted" /></span></div>
            ))}</div>
          </div>
        )}

        {tab === "Content" && (
          <div className="anim-pop">
            <div className="shadow-card bg-white mb-5" style={{ borderRadius: 18, padding: 16, border: "1px solid var(--line)" }}>
              <div className="flex items-center gap-2 mb-3"><UploadCloud size={16} className="text-claret" /><p className="font-display text-ink" style={{ fontSize: 14.5, fontWeight: 700 }}>Upload material</p></div>
              <label className="text-muted" style={{ fontSize: 11.5, fontWeight: 700, display: "block", marginBottom: 6 }}>Type</label>
              <div className="flex gap-1.5 mb-3 no-scrollbar" style={{ overflowX: "auto" }}>{cTypes.map(ct => (<button key={ct} onClick={() => setCType(ct)} className="press" style={{ whiteSpace: "nowrap", padding: "7px 13px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: cType === ct ? "var(--maroon)" : "var(--bone2)", color: cType === ct ? "#fff" : "var(--ink)" }}>{ct}</button>))}</div>
              <Field label="Title" value={cTitle} onChange={setCTitle} placeholder={cType === "Implant" ? "e.g. Plus Revision Knee" : "e.g. Hip Catalog 2026"} />
              {(cType === "Implant" || cType === "Brochure") && (
                <>
                  <label className="text-muted" style={{ fontSize: 11.5, fontWeight: 700, display: "block", marginBottom: 6 }}>Category</label>
                  <div className="flex gap-1.5 mb-3 no-scrollbar" style={{ overflowX: "auto" }}>{["Trauma", "Knee", "Hip", "Spine", "CMF", "Sports"].map(c => (<button key={c} onClick={() => setCCat(c)} className="press" style={{ whiteSpace: "nowrap", padding: "6px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 600, background: cCat === c ? "var(--claret)" : "var(--bone2)", color: cCat === c ? "#fff" : "var(--ink)" }}>{c}</button>))}</div>
                </>
              )}
              <input ref={fileRef} type="file" style={{ display: "none" }} onChange={e => setCFile(e.target.files && e.target.files[0] ? e.target.files[0].name : "")} />
              <button onClick={() => fileRef.current && fileRef.current.click()} className="press w-full flex items-center justify-center gap-2 mb-3" style={{ borderRadius: 12, padding: "12px", border: "1.5px dashed var(--rosewood)", background: "var(--bone)", color: "var(--claret)", fontSize: 13, fontWeight: 700 }}><Paperclip size={16} /> {cFile ? cFile : "Choose file"}</button>
              <button onClick={submitContent} className="press bg-maroon w-full flex items-center justify-center gap-2" style={{ borderRadius: 12, padding: "12px", color: "#fff", fontSize: 13.5, fontWeight: 700 }}><UploadCloud size={16} /> Publish to app</button>
              {(cType === "Implant" || cType === "Training") && <p className="text-muted" style={{ fontSize: 11, marginTop: 9, textAlign: "center" }}>{cType === "Implant" ? "Appears in Explore → Implants" : "Appears in Training Academy"}</p>}
            </div>
            <SectionTitle>Library ({content.length})</SectionTitle>
            <div className="flex flex-col gap-2.5 stagger">{content.map(c => (
              <div key={c.id} className="shadow-card bg-white flex items-center gap-3" style={{ borderRadius: 15, padding: 12, border: "1px solid var(--line)" }}><span className="bg-bone2" style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center" }}><FileText size={17} className="text-maroon" /></span><div style={{ flex: 1 }}><p className="text-ink" style={{ fontSize: 13, fontWeight: 700 }}>{c.title}</p><p className="text-muted" style={{ fontSize: 11.5 }}>{c.when}</p></div><Tag tone="claret">{c.type}</Tag></div>
            ))}</div>
          </div>
        )}

        {tab === "Broadcast" && (
          <div className="anim-pop">
            <div className="shadow-card bg-white" style={{ borderRadius: 18, padding: 16, border: "1px solid var(--line)" }}>
              <div className="flex items-center gap-2 mb-3"><Megaphone size={16} className="text-claret" /><p className="font-display text-ink" style={{ fontSize: 14.5, fontWeight: 700 }}>New broadcast</p></div>
              <label className="text-muted" style={{ fontSize: 11.5, fontWeight: 700, display: "block", marginBottom: 6 }}>Category</label>
              <div className="flex gap-1.5 mb-3 no-scrollbar" style={{ overflowX: "auto" }}>{bTags.map(bt => (<button key={bt} onClick={() => setBTag(bt)} className="press" style={{ whiteSpace: "nowrap", padding: "7px 13px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: bTag === bt ? "var(--maroon)" : "var(--bone2)", color: bTag === bt ? "#fff" : "var(--ink)" }}>{bt}</button>))}</div>
              <Field label="Title" value={bTitle} onChange={setBTitle} placeholder="e.g. New Hip catalog is live" />
              <Field label="Message" value={bBody} onChange={setBBody} placeholder="Write the announcement…" area />
              <button onClick={() => setBWa(v => !v)} className="press w-full flex items-center justify-between mb-4" style={{ borderRadius: 12, padding: "12px 14px", background: bWa ? "#EAF6EE" : "var(--bone)", border: `1px solid ${bWa ? "#BFE3CB" : "var(--line)"}` }}>
                <span className="flex items-center gap-2" style={{ fontSize: 13, fontWeight: 700, color: bWa ? "#256B3C" : "var(--muted)" }}><Check size={15} color={bWa ? "#256B3C" : "var(--muted)"} /> Also send to WhatsApp</span>
                <span style={{ width: 38, height: 22, borderRadius: 999, background: bWa ? "var(--green)" : "var(--line)", position: "relative", transition: "all .2s" }}><span style={{ position: "absolute", top: 2, left: bWa ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "all .2s" }} /></span>
              </button>
              <button onClick={submitBroadcast} className="press bg-maroon w-full flex items-center justify-center gap-2" style={{ borderRadius: 12, padding: "13px", color: "#fff", fontSize: 14, fontWeight: 700 }}><Send size={16} /> Send to all employees</button>
            </div>
            <div className="flex items-start gap-2.5 mt-4" style={{ background: "var(--bone)", borderRadius: 14, padding: "12px 14px" }}><Info size={16} className="text-claret" style={{ flexShrink: 0, marginTop: 1 }} /><p className="text-muted" style={{ fontSize: 11.5, lineHeight: 1.45 }}>Sent broadcasts appear instantly on every employee’s Home and Notifications. WhatsApp delivery needs the WhatsApp Business API connected on the backend.</p></div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ BOTTOM NAV ============================ */
function BottomNav({ active, go }) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Compass, label: "Explore" },
    { id: "buddy", icon: Sparkles, label: "PLUS buddy", center: true },
    { id: "learn", icon: GraduationCap, label: "Learn" },
    { id: "community", icon: Users, label: "Community" },
  ];
  return (
    <div className="bg-white shadow-nav" style={{ borderTop: "1px solid var(--line)", padding: "8px 10px 10px", display: "flex", alignItems: "flex-end", justifyContent: "space-around" }}>
      {tabs.map(t => {
        if (t.center) {
          const on = active === "buddy";
          return (<button key={t.id} onClick={() => go(t.id)} className="press" style={{ marginTop: -26, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}><span className={`grad-buddy ${on ? "" : "breathe"}`} style={{ width: 56, height: 56, borderRadius: 20, display: "grid", placeItems: "center", boxShadow: "0 10px 22px -6px rgba(96,20,25,.5)", border: "3px solid #fff" }}><Sparkles size={24} color="#fff" /></span><span style={{ fontSize: 10, fontWeight: 700, color: on ? "var(--maroon)" : "var(--muted)" }}>{t.label}</span></button>);
        }
        const on = active === t.id;
        return (<button key={t.id} onClick={() => go(t.id)} className="press" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, paddingTop: 2 }}><t.icon size={21} strokeWidth={on ? 2.4 : 2} style={{ color: on ? "var(--maroon)" : "var(--muted)" }} /><span style={{ fontSize: 10, fontWeight: on ? 700 : 500, color: on ? "var(--maroon)" : "var(--muted)" }}>{t.label}</span></button>);
      })}
    </div>
  );
}

/* ============================ BROADCAST SHEET ============================ */
function BroadcastSheet({ b, close }) {
  if (!b) return null;
  return (
    <div onClick={close} style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(58,52,54,.35)", animation: "pop .2s ease" }} />
      <div onClick={e => e.stopPropagation()} className="bg-white" style={{ position: "relative", width: "100%", borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: "10px 20px 24px", animation: "rise .32s cubic-bezier(.2,.7,.2,1)" }}>
        <div style={{ width: 40, height: 4, borderRadius: 4, background: "var(--line)", margin: "0 auto 16px" }} />
        <div className="flex items-center justify-between mb-3"><Tag tone={b.accent}>{b.tag}</Tag><span className="text-muted" style={{ fontSize: 11.5 }}>{b.time}</span></div>
        <h2 className="font-display text-ink" style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>{b.title}</h2>
        <p className="text-ink" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 10 }}>{b.body} Everyone in your team has been notified.</p>
        {b.wa && <div className="flex items-center gap-2 mt-4" style={{ background: "#EAF6EE", borderRadius: 12, padding: "11px 13px" }}><Check size={17} className="text-green" /><span style={{ fontSize: 12.5, color: "#256B3C", fontWeight: 600 }}>Also delivered to your WhatsApp</span></div>}
        <button onClick={close} className="press bg-maroon w-full mt-5" style={{ borderRadius: 13, padding: "13px", color: "#fff", fontSize: 14, fontWeight: 700 }}>Got it</button>
      </div>
    </div>
  );
}

/* ============================ TOAST ============================ */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position: "absolute", bottom: 92, left: "50%", zIndex: 60, animation: "toastin .25s ease", maxWidth: "84%" }}>
      <div className="grad-ink shadow-float flex items-center gap-2" style={{ borderRadius: 14, padding: "11px 16px" }}>
        <BadgeCheck size={17} color="#7FE0A0" style={{ flexShrink: 0 }} />
        <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 600 }}>{msg}</span>
      </div>
    </div>
  );
}

/* ============================ APP ============================ */
function newImplantFrom({ title, cat }) {
  return { id: "u" + Date.now(), cat: cat || "Trauma", name: title, tagline: "Newly uploaded — details to complete", material: "To be added", color: "#7B1F28", sizes: "To be added", indications: ["Pending completion"], specs: [["Status", "Draft"], ["Uploaded", "Just now"]], vs: [["Feature", "Plus", "Competitor"], ["—", "—", "—"]], downloads: ["Brochure (PDF)"] };
}

export default function App() {
  const mobile = useIsMobile();
  const [role, setRole] = useState("employee");
  const boss = role === "boss";
  const [screen, setScreen] = useState("home");
  const [implant, setImplant] = useState(null);
  const [broadcastView, setBroadcastView] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const [employees, setEmployees] = useState(SEED_EMPLOYEES);
  const [broadcasts, setBroadcasts] = useState(SEED_BROADCASTS);
  const [expenses, setExpenses] = useState(SEED_EXPENSES);
  const [implants, setImplants] = useState(IMPLANTS_SEED);
  const [courses, setCourses] = useState(COURSES_SEED);
  const [content, setContent] = useState(SEED_CONTENT);

  const pending = expenses.filter(e => e.status === "Pending").length;
  const flash = (m) => { setToast(m); if (toastTimer.current) clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(null), 2300); };

  const go = (s) => { setImplant(null); setScreen(s); };

  const decide = (id, status) => { setExpenses(es => es.map(e => e.id === id ? { ...e, status } : e)); flash(`Expense ${status.toLowerCase()}`); };
  const addEmployee = (emp) => { const initials = emp.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(); setEmployees(list => [{ id: Date.now(), initials, ...emp }, ...list]); flash(`${emp.name.split(" ")[0]} added to the team`); };
  const addContent = ({ type, title, cat, file }) => {
    setContent(list => [{ id: Date.now(), type, title, when: "Just now" + (file ? ` · ${file}` : "") }, ...list]);
    if (type === "Implant") setImplants(list => [newImplantFrom({ title, cat }), ...list]);
    if (type === "Training") setCourses(list => [{ id: Date.now(), track: "Product", title, lessons: 5, mins: 45, progress: 0, points: 0 }, ...list]);
    flash(`“${title}” published`);
  };
  const sendBroadcast = ({ tag, title, body, wa }) => {
    const accent = { Launch: "maroon", Catalog: "claret", Incentive: "gold", Policy: "maroon" }[tag] || "maroon";
    setBroadcasts(list => [{ id: Date.now(), tag, title, body, time: "Just now", wa, accent }, ...list]);
    flash(wa ? "Broadcast sent + WhatsApp" : "Broadcast sent to all");
  };
  const addExpense = (e) => { setExpenses(es => [{ id: Date.now(), ...e }, ...es]); flash("Claim submitted for approval"); };

  let bodyEl;
  if (implant) bodyEl = <ImplantDetail im={implant} back={() => setImplant(null)} />;
  else if (screen === "home") bodyEl = <HomeScreen go={go} openBroadcast={setBroadcastView} broadcasts={broadcasts} courses={courses} boss={boss} pending={pending} empCount={employees.length} />;
  else if (screen === "explore") bodyEl = <ExploreScreen openImplant={setImplant} implants={implants} />;
  else if (screen === "buddy") bodyEl = <BuddyScreen back={() => go("home")} />;
  else if (screen === "learn") bodyEl = <LearnScreen courses={courses} />;
  else if (screen === "community") bodyEl = <CommunityScreen />;
  else if (screen === "notifications") bodyEl = <NotificationsScreen back={() => go("home")} broadcasts={broadcasts} />;
  else if (screen === "profile") bodyEl = <ProfileScreen go={go} back={() => go("home")} role={role} setRole={setRole} />;
  else if (screen === "expense") bodyEl = <ExpenseScreen back={() => go("profile")} expenses={expenses} addExpense={addExpense} />;
  else if (screen === "leave") bodyEl = <LeaveScreen back={() => go("profile")} />;
  else if (screen === "admin") bodyEl = <AdminConsole back={() => go("home")} expenses={expenses} decide={decide} employees={employees} addEmployee={addEmployee} content={content} addContent={addContent} sendBroadcast={sendBroadcast} />;

  const tabScreens = ["home", "explore", "buddy", "learn", "community"];
  const fullScreen = ["buddy", "notifications", "profile", "expense", "leave", "admin"].includes(screen) || !!implant;
  const showNav = !fullScreen;
  const showTop = screen === "home" && !implant;
  const activeTab = tabScreens.includes(screen) ? screen : "home";

  const inner = (
    <>
      {!mobile && <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: 116, height: 30, background: "#15100f", borderRadius: 18, zIndex: 30 }} />}
      {!mobile && <StatusBar />}
      {showTop && <TopBar onBell={() => go("notifications")} onProfile={() => go("profile")} onAdmin={() => go("admin")} unread={3} boss={boss} />}
      <div style={{ flex: 1, overflowY: fullScreen ? "hidden" : "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }} className="no-scrollbar">
        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: showTop ? 0 : 6, paddingBottom: showNav ? 8 : 0 }}>{bodyEl}</div>
      </div>
      {showNav && <BottomNav active={activeTab} go={go} />}
      <BroadcastSheet b={broadcastView} close={() => setBroadcastView(null)} />
      <Toast msg={toast} />
    </>
  );

  if (mobile) {
    return (
      <div className="po-root" style={{ height: "100dvh", width: "100%", background: "#fff", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingTop: "env(safe-area-inset-top)" }}>
        <style>{STYLE}</style>
        {inner}
      </div>
    );
  }

  return (
    <div className="po-root" style={{ minHeight: "100vh", width: "100%", display: "grid", placeItems: "center", background: "linear-gradient(160deg,#F4ECE9,#FBF6F4 40%,#F6EFEC)", padding: "16px 0" }}>
      <style>{STYLE}</style>
      <div style={{ width: "min(394px, 100vw)", height: "min(844px, 100vh)", maxHeight: 844, position: "relative" }}>
        <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: 44, overflow: "hidden", boxShadow: "0 40px 80px -30px rgba(58,52,54,.5), 0 0 0 11px #1d1517, 0 0 0 13px #2a2022", position: "relative", display: "flex", flexDirection: "column" }}>
          {inner}
        </div>
      </div>
    </div>
  );
}
