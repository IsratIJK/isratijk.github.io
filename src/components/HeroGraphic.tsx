import { type ReactNode } from "react";
import { profile } from "@/data/profile";

/**
 * Decorative line-art scenes for the right side of PageHero.
 * Built from the same vocabulary as the site (cards, borders, blue accent),
 * so they follow light/dark mode through the theme tokens.
 */
export type HeroGraphicVariant =
  | "about"
  | "education"
  | "experience"
  | "research"
  | "publications"
  | "projects"
  | "gallery"
  | "cv"
  | "contact";

const Panel = ({ x, y, w, h, r = 12 }: { x: number; y: number; w: number; h: number; r?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} className="fill-card stroke-border" strokeWidth={1} />
);

const Bar = ({ x, y, w, h = 5, tone = "muted" }: { x: number; y: number; w: number; h?: number; tone?: "muted" | "gold" | "soft" | "strong" }) => {
  const cls = {
    muted: "fill-muted",
    gold: "fill-gold",
    soft: "fill-gold/25",
    strong: "fill-muted-foreground/45",
  }[tone];
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={cls} />;
};

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 380 240" className="w-full h-auto overflow-visible" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

/* ── Research: clustering scatter plot + mini network ── */
const clusters = [
  { cx: 96, cy: 140, cls: "fill-gold", pts: [[0, 0], [-12, 6], [10, 8], [-6, -10], [8, -8], [-16, -4], [2, 14], [14, -2]] },
  { cx: 160, cy: 78, cls: "fill-gold/55", pts: [[0, 0], [-11, 5], [12, 6], [-4, -10], [9, -9], [-15, -5], [3, 12]] },
  { cx: 214, cy: 150, cls: "fill-muted-foreground/45", pts: [[0, 0], [-10, 7], [11, 6], [-6, -9], [9, -10], [15, 3], [-2, 13]] },
];
const net = { xs: [250, 283, 316, 342], ys: [[142, 166, 190], [134, 156, 178, 200], [146, 168, 190], [168]] };

const Research = () => (
  <Svg>
    <Panel x={20} y={16} w={250} h={192} />
    {[60, 100, 140].map((y) => (
      <line key={y} x1={48} x2={250} y1={y} y2={y} className="stroke-border" strokeDasharray="2 4" />
    ))}
    <line x1={48} y1={36} x2={48} y2={182} className="stroke-muted-foreground/40" />
    <line x1={48} y1={182} x2={252} y2={182} className="stroke-muted-foreground/40" />
    {clusters.map((c) => (
      <g key={c.cx}>
        <ellipse cx={c.cx} cy={c.cy} rx={26} ry={22} className="fill-gold/5 stroke-gold/40" strokeDasharray="3 3" />
        {c.pts.map(([dx, dy], i) => (
          <circle key={i} cx={c.cx + dx} cy={c.cy + dy} r={3} className={c.cls} />
        ))}
      </g>
    ))}
    <path d="M60 60 C 120 110, 150 120, 250 176" className="stroke-gold/30" fill="none" strokeWidth={1.2} />
    <Panel x={232} y={118} w={128} h={98} />
    {net.ys.slice(0, -1).map((layer, li) =>
      layer.flatMap((y1, i) =>
        net.ys[li + 1].map((y2, j) => (
          <line key={`${li}${i}${j}`} x1={net.xs[li]} y1={y1} x2={net.xs[li + 1]} y2={y2} className="stroke-border" strokeWidth={0.7} />
        )),
      ),
    )}
    <path d={`M${net.xs[0]} 166 L${net.xs[1]} 156 L${net.xs[2]} 168 L${net.xs[3]} 168`} className="stroke-gold" fill="none" strokeWidth={1.4} />
    {net.ys.map((layer, li) =>
      layer.map((y, i) => {
        const on = (li === 0 && y === 166) || (li === 1 && y === 156) || (li === 2 && y === 168) || li === 3;
        return <circle key={`${li}-${i}`} cx={net.xs[li]} cy={y} r={on ? 3.6 : 3} className={on ? "fill-gold" : "fill-card stroke-border"} />;
      }),
    )}
  </Svg>
);

/* ── Publications: paper stack + citation trend ── */
const Publications = () => (
  <Svg>
    <g transform="rotate(7 205 125)">
      <Panel x={120} y={26} w={160} h={196} r={10} />
    </g>
    <g transform="rotate(-4 185 120)">
      <Panel x={104} y={22} w={160} h={196} r={10} />
    </g>
    <Panel x={86} y={18} w={164} h={204} r={10} />
    <Bar x={104} y={38} w={112} h={7} tone="strong" />
    <Bar x={104} y={51} w={80} h={7} tone="strong" />
    <Bar x={104} y={66} w={60} h={4} tone="gold" />
    {[82, 92, 102].map((y, i) => (
      <Bar key={y} x={104} y={y} w={[128, 120, 96][i]} h={4} />
    ))}
    <rect x={104} y={116} width={128} height={56} rx={6} className="fill-gold/5 stroke-border" />
    {[18, 30, 24, 40, 34].map((h, i) => (
      <rect key={i} x={116 + i * 22} y={164 - h} width={12} height={h} rx={2} className={i === 3 ? "fill-gold" : "fill-gold/35"} />
    ))}
    {[184, 194, 204].map((y, i) => (
      <Bar key={y} x={104} y={y} w={[128, 112, 84][i]} h={4} />
    ))}
    <Panel x={232} y={132} w={130} h={84} />
    <Bar x={246} y={146} w={44} h={4} tone="gold" />
    <path d="M248 198 L272 190 L294 192 L318 174 L344 160 L344 204 L248 204 Z" className="fill-gold/10" />
    <polyline points="248,198 272,190 294,192 318,174 344,160" className="stroke-gold" fill="none" strokeWidth={1.6} strokeLinejoin="round" />
    {[[272, 190], [294, 192], [318, 174], [344, 160]].map(([x, y]) => (
      <circle key={x} cx={x} cy={y} r={2.6} className="fill-gold" />
    ))}
  </Svg>
);

/* ── Projects: code editor + build pipeline ── */
const codeRows: [number, number, "gold" | "soft" | "muted" | "strong"][][] = [
  [[0, 34, "gold"], [40, 70, "strong"]],
  [[14, 50, "soft"], [70, 46, "muted"]],
  [[14, 30, "gold"], [50, 80, "muted"]],
  [[28, 60, "strong"], [94, 40, "soft"]],
  [[28, 90, "muted"]],
  [[14, 24, "gold"], [44, 56, "soft"]],
  [[0, 20, "strong"]],
];

const Projects = () => (
  <Svg>
    <Panel x={22} y={14} w={236} h={156} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={40 + i * 12} cy={30} r={3.5} className={i === 0 ? "fill-gold/60" : "fill-muted"} />
    ))}
    <line x1={22} x2={258} y1={44} y2={44} className="stroke-border" />
    {codeRows.map((row, ri) => (
      <g key={ri}>
        <rect x={36} y={58 + ri * 15} width={10} height={5} rx={2.5} className="fill-muted" />
        {row.map(([x, w, tone], i) => (
          <Bar key={i} x={56 + x} y={58 + ri * 15} w={w} tone={tone} />
        ))}
      </g>
    ))}
    <Panel x={268} y={36} w={94} h={64} />
    <circle cx={290} cy={58} r={9} className="fill-gold" />
    <path d="M286 58 l3 3 l5 -6" className="stroke-gold-foreground" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Bar x={306} y={54} w={42} h={4} tone="strong" />
    <Bar x={282} y={78} w={64} h={4} />
    <Bar x={282} y={86} w={44} h={4} />
    {[0, 1, 2].map((i) => {
      const x = 120 + i * 82;
      return (
        <g key={i}>
          <Panel x={x} y={184} w={62} h={38} r={10} />
          <rect x={x + 10} y={197} width={12} height={12} rx={3} className={i === 2 ? "fill-gold" : "fill-gold/25"} />
          <Bar x={x + 28} y={201} w={24} h={4} tone="strong" />
          {i < 2 && <path d={`M${x + 64} 203 h14 m-4 -4 l4 4 l-4 4`} className="stroke-muted-foreground/60" fill="none" strokeWidth={1.4} />}
        </g>
      );
    })}
  </Svg>
);

/* ── Experience: rising career path with role cards ── */
const pathPts = [[34, 204], [112, 176], [190, 140], [268, 104], [346, 58]];

const Experience = () => (
  <Svg>
    <path d="M34 204 C 80 196, 92 182, 112 176 S 160 150, 190 140 S 240 116, 268 104 S 320 74, 346 58" className="stroke-border" fill="none" strokeWidth={2} />
    <path d="M268 104 S 320 74, 346 58" className="stroke-gold" fill="none" strokeWidth={2} />
    {pathPts.map(([x, y], i) => {
      const last = i === pathPts.length - 1;
      return (
        <g key={x}>
          {last && <circle cx={x} cy={y} r={12} className="fill-gold/15" />}
          <circle cx={x} cy={y} r={last ? 6 : 5} className={last ? "fill-gold" : "fill-card stroke-muted-foreground/50"} strokeWidth={1.5} />
        </g>
      );
    })}
    {[
      { x: 40, y: 104, node: 1 },
      { x: 150, y: 58, node: 2 },
      { x: 236, y: 132, node: 3, below: true },
    ].map(({ x, y, node, below }) => (
      <g key={x}>
        <line x1={pathPts[node][0]} y1={pathPts[node][1] + (below ? 6 : -6)} x2={pathPts[node][0]} y2={below ? y : y + 52} className="stroke-border" strokeDasharray="2 3" />
        <Panel x={x} y={y} w={120} h={52} r={10} />
        <rect x={x + 12} y={y + 12} width={28} height={28} rx={7} className={node === 3 ? "fill-gold/25" : "fill-muted"} />
        <Bar x={x + 50} y={y + 16} w={54} h={5} tone="strong" />
        <Bar x={x + 50} y={y + 28} w={38} h={4} tone={node === 3 ? "gold" : "soft"} />
      </g>
    ))}
  </Svg>
);

/* ── Education: mortarboard, diploma, books ── */
const Education = () => (
  <Svg>
    <path d="M128 92 L128 126 C 150 142, 230 142, 252 126 L252 92" className="fill-card stroke-border" strokeWidth={1.2} />
    <path d="M190 38 L296 76 L190 114 L84 76 Z" className="fill-card stroke-border" strokeWidth={1.2} />
    <path d="M190 52 L258 76 L190 100 L122 76 Z" className="fill-gold/10" />
    <circle cx={190} cy={76} r={4} className="fill-gold" />
    <path d="M190 76 L270 92 L270 128" className="stroke-gold" fill="none" strokeWidth={1.6} />
    <rect x={265} y={126} width={10} height={20} rx={3} className="fill-gold" />
    <Panel x={30} y={156} w={196} h={66} r={10} />
    <Bar x={48} y={172} w={96} h={6} tone="strong" />
    <Bar x={48} y={186} w={120} h={4} />
    <Bar x={48} y={196} w={84} h={4} />
    <circle cx={196} cy={188} r={14} className="fill-gold/20 stroke-gold" strokeWidth={1.2} />
    <path d="M190 200 l-4 14 l6 -4 l4 6 l2 -14 M202 200 l4 14 l-6 -4" className="fill-gold/60" />
    {[
      { x: 262, y: 186, w: 98, tone: "fill-gold/20" },
      { x: 254, y: 202, w: 110, tone: "fill-muted" },
      { x: 268, y: 170, w: 86, tone: "fill-card" },
    ].map((b) => (
      <g key={b.y}>
        <rect x={b.x} y={b.y} width={b.w} height={16} rx={3} className={`${b.tone} stroke-border`} />
        <line x1={b.x + 12} x2={b.x + 12} y1={b.y} y2={b.y + 16} className="stroke-border" />
      </g>
    ))}
  </Svg>
);

/* ── CV: document with sections + floating chips ── */
const Cv = () => (
  <Svg>
    <Panel x={104} y={10} w={172} h={220} r={10} />
    <circle cx={134} cy={42} r={15} className="fill-gold/20 stroke-gold" strokeWidth={1.2} />
    <Bar x={158} y={34} w={86} h={7} tone="strong" />
    <Bar x={158} y={47} w={60} h={4} />
    <line x1={118} x2={262} y1={68} y2={68} className="stroke-border" />
    {[0, 1, 2].map((s) => (
      <g key={s}>
        <Bar x={118} y={82 + s * 48} w={42} h={5} tone="gold" />
        <Bar x={118} y={94 + s * 48} w={[132, 120, 128][s]} h={4} />
        <Bar x={118} y={103 + s * 48} w={[110, 128, 92][s]} h={4} />
        <Bar x={118} y={112 + s * 48} w={[84, 70, 104][s]} h={4} />
      </g>
    ))}
    <Panel x={252} y={52} w={112} h={40} r={10} />
    <circle cx={272} cy={72} r={8} className="fill-gold" />
    <path d="M268.5 72 l2.5 2.5 l4.5 -5" className="stroke-gold-foreground" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    <Bar x={288} y={66} w={60} h={4} tone="strong" />
    <Bar x={288} y={75} w={40} h={4} />
    <Panel x={18} y={150} w={110} h={40} r={10} />
    <path d="M38 160 l3 6.5 l7 1 l-5 5 l1.2 7 l-6.2 -3.3 l-6.2 3.3 l1.2 -7 l-5 -5 l7 -1 Z" className="fill-gold/80" />
    <Bar x={56} y={163} w={56} h={4} tone="strong" />
    <Bar x={56} y={172} w={36} h={4} />
  </Svg>
);

/* ── Contact: envelope, paper plane, message bubble ── */
const Contact = () => (
  <Svg>
    <path d="M140 86 C 170 30, 230 100, 272 62" className="stroke-gold/50" fill="none" strokeWidth={1.4} strokeDasharray="4 5" />
    <path d="M274 64 L352 34 L318 96 L306 76 Z" className="fill-gold" />
    <path d="M306 76 L352 34" className="stroke-gold-foreground/40" strokeWidth={1} />
    <path d="M306 76 L300 92 L318 96" className="fill-gold/60" />
    <Panel x={46} y={96} w={196} h={128} r={10} />
    <path d="M46 102 L144 168 L242 102" className="fill-gold/5 stroke-border" strokeWidth={1.2} />
    <path d="M50 220 L120 160 M238 220 L168 160" className="stroke-border" strokeWidth={1.2} />
    <circle cx={144} cy={168} r={6} className="fill-gold/30" />
    <Panel x={252} y={140} w={112} h={52} r={14} />
    <path d="M270 192 l-6 14 l18 -14" className="fill-card stroke-border" />
    <rect x={265} y={191} width={20} height={3} className="fill-card" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={290 + i * 16} cy={166} r={4} className={i === 0 ? "fill-gold" : "fill-gold/35"} />
    ))}
  </Svg>
);

/* ── Gallery: scattered photo prints ── */
const Photo = ({ x, y, w, h, rot, front = false }: { x: number; y: number; w: number; h: number; rot: number; front?: boolean }) => {
  const ix = x + 10;
  const iy = y + 10;
  const iw = w - 20;
  const ih = h - 36;
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <Panel x={x} y={y} w={w} h={h} r={8} />
      <rect x={ix} y={iy} width={iw} height={ih} rx={4} className={front ? "fill-gold/10" : "fill-muted"} />
      <path
        d={`M${ix} ${iy + ih} L${ix + iw * 0.32} ${iy + ih * 0.45} L${ix + iw * 0.52} ${iy + ih * 0.72} L${ix + iw * 0.7} ${iy + ih * 0.38} L${ix + iw} ${iy + ih} Z`}
        className={front ? "fill-gold/35" : "fill-muted-foreground/20"}
      />
      <circle cx={ix + iw * 0.78} cy={iy + ih * 0.26} r={7} className={front ? "fill-gold" : "fill-muted-foreground/30"} />
      <Bar x={ix} y={y + h - 18} w={iw * 0.55} h={4} tone={front ? "strong" : "muted"} />
    </g>
  );
};

const Gallery = () => (
  <Svg>
    <Photo x={46} y={30} w={150} h={130} rot={-9} />
    <Photo x={190} y={20} w={150} h={130} rot={7} />
    <Photo x={110} y={84} w={170} h={146} rot={-1} front />
    <circle cx={330} cy={196} r={26} className="fill-card stroke-border" />
    <circle cx={330} cy={196} r={14} className="fill-gold/15 stroke-gold/60" />
    <circle cx={330} cy={196} r={5} className="fill-gold" />
  </Svg>
);

/* ── About: portrait with research-interest orbits ── */
const orbitChips = [
  { label: "Computer Vision", angle: -150, r: 100 },
  { label: "Machine Learning", angle: -30, r: 100 },
  { label: "Deep Learning", angle: 155, r: 100 },
  { label: "Interdisciplinary AI", angle: 35, r: 70 },
];

const About = () => (
  <Svg>
    <defs>
      <clipPath id="hero-about-avatar">
        <circle cx={190} cy={120} r={44} />
      </clipPath>
    </defs>
    <circle cx={190} cy={120} r={100} className="stroke-border" fill="none" strokeDasharray="3 5" />
    <circle cx={190} cy={120} r={70} className="stroke-border" fill="none" />
    <circle cx={190} cy={120} r={52} className="fill-gold/10" />
    <image href={profile.avatar} x={146} y={76} width={88} height={88} clipPath="url(#hero-about-avatar)" preserveAspectRatio="xMidYMid slice" />
    <circle cx={190} cy={120} r={44} className="stroke-gold/60" fill="none" strokeWidth={1.5} />
    {orbitChips.map(({ label, angle, r }, i) => {
      const a = (angle * Math.PI) / 180;
      const cx = 190 + r * Math.cos(a);
      const cy = 120 + r * Math.sin(a) * 0.95;
      const w = label.length * 6.1 + 22;
      const chipX = Math.min(Math.max(cx - w / 2, 0), 380 - w);
      const chipY = Math.sin(a) < 0 ? cy - 28 : cy + 8;
      return (
        <g key={label}>
          <circle cx={cx} cy={cy} r={4} className={i === 0 ? "fill-gold" : "fill-gold/60"} />
          <rect x={chipX} y={chipY} width={w} height={20} rx={10} className="fill-card stroke-border" />
          <text x={chipX + w / 2} y={chipY + 13.5} textAnchor="middle" className="fill-muted-foreground font-mono" fontSize={10}>
            {label}
          </text>
        </g>
      );
    })}
  </Svg>
);

const scenes: Record<HeroGraphicVariant, () => JSX.Element> = {
  about: About,
  education: Education,
  experience: Experience,
  research: Research,
  publications: Publications,
  projects: Projects,
  gallery: Gallery,
  cv: Cv,
  contact: Contact,
};

const HeroGraphic = ({ variant }: { variant: HeroGraphicVariant }) => {
  const Scene = scenes[variant];
  return (
    <div
      className="w-full max-w-[380px] ml-auto animate-fade-in opacity-0 drop-shadow-[0_12px_24px_rgba(15,23,42,0.08)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
      style={{ animationDelay: "120ms" }}
    >
      <Scene />
    </div>
  );
};

export default HeroGraphic;
