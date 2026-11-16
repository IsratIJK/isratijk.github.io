import { type CSSProperties, type ReactNode } from "react";

/**
 * Decorative scenes for the right side of PageHero.
 *
 * Colours come from theme tokens (--gold plus the --viz-* accents in index.css), so every
 * scene follows light/dark mode. Motion uses the .hg-* classes in index.css: one staggered
 * entrance per scene (delay via --d), then a few slow ambient loops. All of it is switched
 * off under prefers-reduced-motion.
 */
export type HeroGraphicVariant =
  | "education"
  | "experience"
  | "research"
  | "publications"
  | "projects"
  | "gallery"
  | "cv"
  | "contact";

/** Animation delay for the .hg-* classes. */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const stop = (token: string, opacity = 1) => ({ stopColor: `hsl(var(${token}))`, stopOpacity: opacity });

const Panel = ({ x, y, w, h, r = 12 }: { x: number; y: number; w: number; h: number; r?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} className="fill-card stroke-border" strokeWidth={1} />
);

type Tone = "muted" | "strong" | "gold" | "violet" | "teal" | "amber" | "rose";
const toneFill: Record<Tone, string> = {
  muted: "fill-muted",
  strong: "fill-muted-foreground/45",
  gold: "fill-gold",
  violet: "fill-viz-violet",
  teal: "fill-viz-teal",
  amber: "fill-viz-amber",
  rose: "fill-viz-rose",
};

const Bar = ({ x, y, w, h = 5, tone = "muted" }: { x: number; y: number; w: number; h?: number; tone?: Tone }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} className={toneFill[tone]} />
);

/** Wrapper group that rises in. Kept separate from groups that carry an SVG transform. */
const In = ({ at, children }: { at: number; children: ReactNode }) => (
  <g className="hg-in" style={d(at)}>
    {children}
  </g>
);

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 380 240" className="w-full h-auto overflow-visible" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

/* ── Research: clustering scatter plot + mini network ── */
const clusters = [
  { cx: 96, cy: 140, fill: "fill-gold", ring: "fill-gold/10 stroke-gold/50", pts: [[0, 0], [-12, 6], [10, 8], [-6, -10], [8, -8], [-16, -4], [2, 14], [14, -2]] },
  { cx: 160, cy: 78, fill: "fill-viz-violet", ring: "fill-viz-violet/10 stroke-viz-violet/50", pts: [[0, 0], [-11, 5], [12, 6], [-4, -10], [9, -9], [-15, -5], [3, 12]] },
  { cx: 214, cy: 150, fill: "fill-viz-teal", ring: "fill-viz-teal/10 stroke-viz-teal/50", pts: [[0, 0], [-10, 7], [11, 6], [-6, -9], [9, -10], [15, 3], [-2, 13]] },
];
const net = { xs: [250, 283, 316, 342], ys: [[142, 166, 190], [134, 156, 178, 200], [146, 168, 190], [168]] };
const netActive = [166, 156, 168, 168];
const netLayerFill = ["fill-gold", "fill-viz-violet", "fill-viz-teal", "fill-viz-amber"];
const netPath = `M${net.xs[0]} 166 L${net.xs[1]} 156 L${net.xs[2]} 168 L${net.xs[3]} 168`;

const Research = () => (
  <Svg>
    <In at={0}>
      <Panel x={20} y={16} w={250} h={192} />
      {[60, 100, 140].map((y) => (
        <line key={y} x1={48} x2={250} y1={y} y2={y} className="stroke-border" strokeDasharray="2 4" />
      ))}
    </In>
    <line x1={48} y1={36} x2={48} y2={182} pathLength={1} className="stroke-muted-foreground/50 hg-draw" style={d(150)} />
    <line x1={48} y1={182} x2={252} y2={182} pathLength={1} className="stroke-muted-foreground/50 hg-draw" style={d(250)} />
    {clusters.map((c, ci) => (
      <g key={c.cx}>
        <ellipse cx={c.cx} cy={c.cy} rx={26} ry={22} className={`${c.ring} hg-pop`} strokeDasharray="3 3" style={d(420 + ci * 120)} />
        {c.pts.map(([dx, dy], i) => (
          <circle key={i} cx={c.cx + dx} cy={c.cy + dy} r={3} className={`${c.fill} hg-pop`} style={d(360 + ci * 120 + i * 30)} />
        ))}
      </g>
    ))}
    <path d="M60 60 C 120 110, 150 120, 250 176" pathLength={1} className="stroke-viz-rose/60 hg-draw" fill="none" strokeWidth={1.4} style={d(800)} />
    <In at={300}>
      <Panel x={232} y={118} w={128} h={98} />
      {net.ys.slice(0, -1).map((layer, li) =>
        layer.flatMap((y1, i) =>
          net.ys[li + 1].map((y2, j) => (
            <line key={`${li}${i}${j}`} x1={net.xs[li]} y1={y1} x2={net.xs[li + 1]} y2={y2} className="stroke-border" strokeWidth={0.7} />
          )),
        ),
      )}
      <path d={netPath} className="stroke-gold/40" fill="none" strokeWidth={1.4} />
      <path d={netPath} className="stroke-gold hg-flow" fill="none" strokeWidth={1.6} style={d(1200)} />
      <circle cx={net.xs[3]} cy={168} r={6} className="fill-viz-amber/40 hg-pulse" style={d(1400)} />
      {net.ys.map((layer, li) =>
        layer.map((y, i) => {
          const on = y === netActive[li];
          return <circle key={`${li}-${i}`} cx={net.xs[li]} cy={y} r={on ? 3.8 : 3} className={on ? netLayerFill[li] : "fill-card stroke-border"} />;
        }),
      )}
    </In>
  </Svg>
);

/* ── Publications: paper stack + figure + citation trend ── */
const pubBars = [
  { h: 18, cls: "fill-gold/70" },
  { h: 30, cls: "fill-viz-violet/80" },
  { h: 24, cls: "fill-viz-teal/80" },
  { h: 40, cls: "fill-gold" },
  { h: 34, cls: "fill-viz-amber/90" },
];

const Publications = () => (
  <Svg>
    <defs>
      <linearGradient id="hg-pub-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={stop("--viz-teal", 0.35)} />
        <stop offset="1" style={stop("--viz-teal", 0)} />
      </linearGradient>
    </defs>
    <In at={0}>
      <g transform="rotate(7 205 125)">
        <Panel x={120} y={26} w={160} h={196} r={10} />
        <rect x={120} y={26} width={160} height={6} rx={3} className="fill-viz-teal/40" />
      </g>
    </In>
    <In at={80}>
      <g transform="rotate(-4 185 120)">
        <Panel x={104} y={22} w={160} h={196} r={10} />
        <rect x={104} y={22} width={160} height={6} rx={3} className="fill-viz-violet/40" />
      </g>
    </In>
    <In at={160}>
      <Panel x={86} y={18} w={164} h={204} r={10} />
      <rect x={86} y={18} width={164} height={6} rx={3} className="fill-gold/60" />
      <Bar x={104} y={38} w={112} h={7} tone="strong" />
      <Bar x={104} y={51} w={80} h={7} tone="strong" />
      <Bar x={104} y={66} w={28} h={4} tone="gold" />
      <Bar x={136} y={66} w={28} h={4} tone="violet" />
      {[82, 92, 102].map((y, i) => (
        <Bar key={y} x={104} y={y} w={[128, 120, 96][i]} h={4} />
      ))}
      <rect x={104} y={116} width={128} height={56} rx={6} className="fill-muted/60 stroke-border" />
      {[184, 194, 204].map((y, i) => (
        <Bar key={y} x={104} y={y} w={[128, 112, 84][i]} h={4} />
      ))}
    </In>
    {pubBars.map((b, i) => (
      <rect key={i} x={116 + i * 22} y={164 - b.h} width={12} height={b.h} rx={2} className={`${b.cls} hg-grow`} style={d(420 + i * 70)} />
    ))}
    <In at={320}>
      <Panel x={232} y={132} w={130} h={84} />
      <Bar x={246} y={146} w={30} h={4} tone="teal" />
      <Bar x={280} y={146} w={20} h={4} />
    </In>
    <path d="M248 198 L272 190 L294 192 L318 174 L344 160 L344 204 L248 204 Z" fill="url(#hg-pub-area)" className="hg-in" style={d(900)} />
    <polyline points="248,198 272,190 294,192 318,174 344,160" pathLength={1} className="stroke-viz-teal hg-draw" fill="none" strokeWidth={1.8} strokeLinejoin="round" style={d(650)} />
    {[[272, 190], [294, 192], [318, 174], [344, 160]].map(([x, y], i) => (
      <circle key={x} cx={x} cy={y} r={2.8} className="fill-viz-teal hg-pop" style={d(800 + i * 90)} />
    ))}
    <circle cx={344} cy={160} r={6} className="fill-viz-teal/50 hg-pulse" style={d(1500)} />
  </Svg>
);

/* ── Projects: code editor + build badge + pipeline ── */
const codeRows: [number, number, Tone][][] = [
  [[0, 34, "violet"], [40, 70, "gold"]],
  [[14, 50, "teal"], [70, 46, "muted"]],
  [[14, 30, "violet"], [50, 80, "amber"]],
  [[28, 60, "gold"], [94, 40, "teal"]],
  [[28, 90, "muted"]],
  [[14, 24, "rose"], [44, 56, "teal"]],
  [[0, 20, "violet"]],
];
const pipeColors = ["fill-gold", "fill-viz-violet", "fill-viz-teal"];

const Projects = () => (
  <Svg>
    <In at={0}>
      <Panel x={22} y={14} w={236} h={156} />
      {["fill-viz-rose", "fill-viz-amber", "fill-viz-teal"].map((cls, i) => (
        <circle key={i} cx={40 + i * 12} cy={30} r={3.5} className={cls} />
      ))}
      <line x1={22} x2={258} y1={44} y2={44} className="stroke-border" />
    </In>
    {codeRows.map((row, ri) => (
      <g key={ri} className="hg-in" style={d(180 + ri * 70)}>
        <rect x={36} y={58 + ri * 15} width={10} height={5} rx={2.5} className="fill-muted" />
        {row.map(([x, w, tone], i) => (
          <Bar key={i} x={56 + x} y={58 + ri * 15} w={w} tone={tone} />
        ))}
      </g>
    ))}
    <In at={600}>
      <rect x={80} y={56 + 6 * 15} width={2} height={9} className="fill-gold hg-blink" style={d(900)} />
    </In>
    <In at={350}>
      <Panel x={268} y={36} w={94} h={64} />
      <Bar x={306} y={54} w={42} h={4} tone="strong" />
      <Bar x={282} y={78} w={64} h={4} />
      <Bar x={282} y={86} w={44} h={4} />
    </In>
    <circle cx={290} cy={58} r={13} className="fill-viz-teal/40 hg-pulse" style={d(1300)} />
    <circle cx={290} cy={58} r={9} className="fill-viz-teal hg-pop" style={d(700)} />
    <path d="M286 58 l3 3 l5 -6" pathLength={1} className="stroke-white hg-draw" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={d(900)} />
    {[0, 1, 2].map((i) => {
      const x = 120 + i * 82;
      return (
        <g key={i}>
          <g className="hg-in" style={d(500 + i * 120)}>
            <Panel x={x} y={184} w={62} h={38} r={10} />
            <rect x={x + 10} y={197} width={12} height={12} rx={3} className={pipeColors[i]} />
            <Bar x={x + 28} y={201} w={24} h={4} tone="strong" />
            {i < 2 && (
              <path d={`M${x + 64} 203 h14`} className="stroke-muted-foreground/70 hg-flow" fill="none" strokeWidth={1.6} style={d(1100 + i * 200)} />
            )}
          </g>
        </g>
      );
    })}
  </Svg>
);

/* ── Experience: rising career path with role cards ── */
const pathPts = [[34, 204], [112, 176], [190, 140], [268, 104], [346, 58]];
const careerCards: { x: number; y: number; node: number; icon: string; line: Tone; below?: boolean }[] = [
  { x: 40, y: 104, node: 1, icon: "fill-viz-teal", line: "teal" },
  { x: 150, y: 58, node: 2, icon: "fill-viz-amber", line: "amber" },
  { x: 236, y: 132, node: 3, icon: "fill-viz-violet", line: "violet", below: true },
];

const Experience = () => (
  <Svg>
    <defs>
      <linearGradient id="hg-career" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" style={stop("--viz-teal")} />
        <stop offset="0.55" style={stop("--viz-violet")} />
        <stop offset="1" style={stop("--gold")} />
      </linearGradient>
    </defs>
    <path
      d="M34 204 C 80 196, 92 182, 112 176 S 160 150, 190 140 S 240 116, 268 104 S 320 74, 346 58"
      pathLength={1}
      stroke="url(#hg-career)"
      className="hg-draw"
      fill="none"
      strokeWidth={2.5}
      strokeLinecap="round"
      style={d(100)}
    />
    {pathPts.map(([x, y], i) => {
      const last = i === pathPts.length - 1;
      return (
        <g key={x}>
          {last && <circle cx={x} cy={y} r={10} className="fill-gold/40 hg-pulse" style={d(1300)} />}
          <circle
            cx={x}
            cy={y}
            r={last ? 6 : 5}
            className={`${last ? "fill-gold" : "fill-card stroke-viz-violet/70"} hg-pop`}
            strokeWidth={1.5}
            style={d(250 + i * 150)}
          />
        </g>
      );
    })}
    {careerCards.map(({ x, y, node, icon, line, below }, i) => (
      <g key={x} className="hg-in" style={d(500 + i * 150)}>
        <line x1={pathPts[node][0]} y1={pathPts[node][1] + (below ? 6 : -6)} x2={pathPts[node][0]} y2={below ? y : y + 52} className="stroke-border" strokeDasharray="2 3" />
        <Panel x={x} y={y} w={120} h={52} r={10} />
        <rect x={x + 12} y={y + 12} width={28} height={28} rx={7} className={icon} />
        <Bar x={x + 50} y={y + 16} w={54} h={5} tone="strong" />
        <Bar x={x + 50} y={y + 28} w={38} h={4} tone={line} />
      </g>
    ))}
  </Svg>
);

/* ── Education: mortarboard, diploma, books ── */
const Education = () => (
  <Svg>
    <defs>
      <linearGradient id="hg-cap" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={stop("--viz-violet", 0.35)} />
        <stop offset="1" style={stop("--gold", 0.35)} />
      </linearGradient>
    </defs>
    <g className="hg-float" style={d(1200)}>
      <In at={0}>
        <path d="M128 92 L128 126 C 150 142, 230 142, 252 126 L252 92" className="fill-card stroke-border" strokeWidth={1.2} />
        <path d="M190 38 L296 76 L190 114 L84 76 Z" className="fill-card stroke-border" strokeWidth={1.2} />
        <path d="M190 52 L258 76 L190 100 L122 76 Z" fill="url(#hg-cap)" />
        <circle cx={190} cy={76} r={4} className="fill-viz-amber" />
      </In>
      <path d="M190 76 L270 92 L270 128" pathLength={1} className="stroke-viz-amber hg-draw" fill="none" strokeWidth={1.8} style={d(450)} />
      <rect x={265} y={126} width={10} height={20} rx={3} className="fill-viz-amber hg-pop" style={d(900)} />
    </g>
    <In at={250}>
      <Panel x={30} y={156} w={196} h={66} r={10} />
      <Bar x={48} y={172} w={96} h={6} tone="strong" />
      <Bar x={48} y={186} w={120} h={4} />
      <Bar x={48} y={196} w={84} h={4} />
      <path d="M190 200 l-4 14 l6 -4 l4 6 l2 -14 M202 200 l4 14 l-6 -4" className="fill-viz-rose/80" />
    </In>
    <circle cx={196} cy={188} r={14} className="fill-viz-rose/20 stroke-viz-rose hg-pop" strokeWidth={1.4} style={d(600)} />
    <circle cx={196} cy={188} r={6} className="fill-viz-rose hg-pop" style={d(700)} />
    {[
      { x: 254, y: 202, w: 110, tone: "fill-viz-teal/70", at: 350 },
      { x: 262, y: 186, w: 98, tone: "fill-viz-violet/70", at: 450 },
      { x: 268, y: 170, w: 86, tone: "fill-gold/70", at: 550 },
    ].map((b) => (
      <g key={b.y} className="hg-in" style={d(b.at)}>
        <rect x={b.x} y={b.y} width={b.w} height={16} rx={3} className={`${b.tone} stroke-border`} />
        <line x1={b.x + 12} x2={b.x + 12} y1={b.y} y2={b.y + 16} className="stroke-card/80" strokeWidth={2} />
      </g>
    ))}
  </Svg>
);

/* ── CV: document with sections + floating chips ── */
const cvSections: { tone: Tone; widths: number[] }[] = [
  { tone: "gold", widths: [132, 110, 84] },
  { tone: "violet", widths: [120, 128, 70] },
  { tone: "teal", widths: [128, 92, 104] },
];

const Cv = () => (
  <Svg>
    <In at={0}>
      <Panel x={104} y={10} w={172} h={220} r={10} />
      <Bar x={158} y={34} w={86} h={7} tone="strong" />
      <Bar x={158} y={47} w={60} h={4} />
      <line x1={118} x2={262} y1={68} y2={68} className="stroke-border" />
    </In>
    <circle cx={134} cy={42} r={15} className="fill-viz-violet/25 stroke-viz-violet hg-pop" strokeWidth={1.4} style={d(200)} />
    <circle cx={134} cy={38} r={5} className="fill-viz-violet hg-pop" style={d(300)} />
    {cvSections.map((s, i) => (
      <g key={i} className="hg-in" style={d(300 + i * 140)}>
        <Bar x={118} y={82 + i * 48} w={42} h={5} tone={s.tone} />
        {s.widths.map((w, j) => (
          <Bar key={j} x={118} y={94 + i * 48 + j * 9} w={w} h={4} />
        ))}
      </g>
    ))}
    <g className="hg-float" style={d(1000)}>
      <In at={650}>
        <Panel x={252} y={52} w={112} h={40} r={10} />
        <circle cx={272} cy={72} r={8} className="fill-viz-teal" />
        <path d="M268.5 72 l2.5 2.5 l4.5 -5" className="stroke-white" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        <Bar x={288} y={66} w={60} h={4} tone="strong" />
        <Bar x={288} y={75} w={40} h={4} />
      </In>
    </g>
    <g className="hg-float" style={d(2200)}>
      <In at={800}>
        <Panel x={18} y={150} w={110} h={40} r={10} />
        <path d="M38 160 l3 6.5 l7 1 l-5 5 l1.2 7 l-6.2 -3.3 l-6.2 3.3 l1.2 -7 l-5 -5 l7 -1 Z" className="fill-viz-amber" />
        <Bar x={56} y={163} w={56} h={4} tone="strong" />
        <Bar x={56} y={172} w={36} h={4} />
      </In>
    </g>
  </Svg>
);

/* ── Contact: envelope, paper plane, typing bubble ── */
const Contact = () => (
  <Svg>
    <defs>
      <linearGradient id="hg-plane" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" style={stop("--viz-violet")} />
        <stop offset="1" style={stop("--gold")} />
      </linearGradient>
    </defs>
    <In at={450}>
      <path d="M140 86 C 170 30, 230 100, 272 62" className="stroke-viz-violet/60 hg-flow" fill="none" strokeWidth={1.6} style={d(600)} />
    </In>
    <g className="hg-float" style={d(900)}>
      <g className="hg-pop" style={d(350)}>
        <path d="M274 64 L352 34 L318 96 L306 76 Z" fill="url(#hg-plane)" />
        <path d="M306 76 L352 34" className="stroke-white/50" strokeWidth={1} />
        <path d="M306 76 L300 92 L318 96" className="fill-viz-violet/70" />
      </g>
    </g>
    <In at={0}>
      <Panel x={46} y={96} w={196} h={128} r={10} />
      <path d="M46 102 L144 168 L242 102" className="fill-gold/5 stroke-border" strokeWidth={1.2} />
      <path d="M50 220 L120 160 M238 220 L168 160" className="stroke-border" strokeWidth={1.2} />
    </In>
    <circle cx={144} cy={168} r={11} className="fill-viz-rose/40 hg-pulse" style={d(1200)} />
    <circle cx={144} cy={168} r={7} className="fill-viz-rose hg-pop" style={d(500)} />
    <In at={250}>
      <Panel x={252} y={140} w={112} h={52} r={14} />
      <path d="M270 192 l-6 14 l18 -14" className="fill-card stroke-border" />
      <rect x={265} y={191} width={20} height={3} className="fill-card" />
    </In>
    <In at={400}>
      {["fill-gold", "fill-viz-violet", "fill-viz-teal"].map((cls, i) => (
        <circle key={i} cx={290 + i * 16} cy={166} r={4} className={`${cls} hg-bounce`} style={d(700 + i * 160)} />
      ))}
    </In>
  </Svg>
);

/* ── Gallery: scattered photo prints + lens ── */
const Photo = ({
  x,
  y,
  w,
  h,
  rot,
  sky,
  hill,
  sun,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  sky: { fill?: string; className?: string };
  hill: string;
  sun: string;
}) => {
  const ix = x + 10;
  const iy = y + 10;
  const iw = w - 20;
  const ih = h - 36;
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <Panel x={x} y={y} w={w} h={h} r={8} />
      <rect x={ix} y={iy} width={iw} height={ih} rx={4} {...sky} />
      <path
        d={`M${ix} ${iy + ih} L${ix + iw * 0.32} ${iy + ih * 0.45} L${ix + iw * 0.52} ${iy + ih * 0.72} L${ix + iw * 0.7} ${iy + ih * 0.38} L${ix + iw} ${iy + ih} Z`}
        className={hill}
      />
      <circle cx={ix + iw * 0.78} cy={iy + ih * 0.26} r={7} className={sun} />
      <Bar x={ix} y={y + h - 18} w={iw * 0.55} h={4} tone="strong" />
    </g>
  );
};

const Gallery = () => (
  <Svg>
    <defs>
      <linearGradient id="hg-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={stop("--gold", 0.45)} />
        <stop offset="1" style={stop("--viz-violet", 0.3)} />
      </linearGradient>
    </defs>
    <In at={0}>
      <Photo x={46} y={30} w={150} h={130} rot={-9} sky={{ className: "fill-viz-rose/15" }} hill="fill-viz-rose/40" sun="fill-viz-amber/70" />
    </In>
    <In at={120}>
      <Photo x={190} y={20} w={150} h={130} rot={7} sky={{ className: "fill-viz-teal/15" }} hill="fill-viz-teal/45" sun="fill-viz-amber/70" />
    </In>
    <g className="hg-float" style={d(1100)}>
      <In at={260}>
        <Photo x={110} y={84} w={170} h={146} rot={-1} sky={{ fill: "url(#hg-sky)" }} hill="fill-viz-teal/80" sun="fill-viz-amber" />
      </In>
    </g>
    <In at={420}>
      <circle cx={330} cy={196} r={26} className="fill-card stroke-border" />
      <g className="hg-spin" style={d(800)}>
        <circle cx={330} cy={196} r={16} className="fill-none stroke-viz-violet/70" strokeWidth={2} strokeDasharray="6 4" />
      </g>
    </In>
    <circle cx={330} cy={196} r={8} className="fill-gold hg-pop" style={d(600)} />
  </Svg>
);

const scenes: Record<HeroGraphicVariant, () => JSX.Element> = {
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
    <div className="w-full max-w-[380px] ml-auto drop-shadow-[0_12px_24px_rgba(15,23,42,0.08)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
      <Scene />
    </div>
  );
};

export default HeroGraphic;
