import { type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import CompanyLogo from "@/components/CompanyLogo";
import PageHero from "@/components/PageHero";
import { experiences } from "@/data/experience";

const typeLabels = {
  academic: "Academic",
  research: "Research",
  teaching: "Teaching",
};

// Everything in the sidebar is derived from the experience data, so it stays in sync.
const institutions = experiences.reduce<
  { name: string; url?: string; logo: string; location: string; roles: string[] }[]
>((acc, exp) => {
  const existing = acc.find((i) => i.name === exp.company);
  if (existing) existing.roles.push(exp.role);
  else acc.push({ name: exp.company, url: exp.companyUrl, logo: exp.logo, location: exp.location, roles: [exp.role] });
  return acc;
}, []);

const typeCounts = (Object.keys(typeLabels) as (keyof typeof typeLabels)[])
  .map((type) => ({ type, label: typeLabels[type], count: experiences.filter((e) => e.type === type).length }))
  .filter((t) => t.count > 0);

const sinceYear = Math.min(
  ...experiences.flatMap((e) => (e.period.match(/\d{4}/g) ?? []).map(Number)),
);

const typeColors: Record<keyof typeof typeLabels, string> = {
  research: "bg-gold",
  teaching: "bg-gold/45",
  academic: "bg-muted-foreground/40",
};

/** Small feed-forward network drawing: decorative, echoes the ML research focus. */
const NetworkGraphic = () => {
  const layers = [
    [22, 50, 78],
    [14, 38, 62, 86],
    [26, 50, 74],
    [50],
  ];
  const xs = [14, 42, 70, 92];
  const active = [[1], [1, 2], [1], [0]];
  const layerFill = ["fill-gold", "fill-viz-violet", "fill-viz-teal", "fill-viz-amber"];
  return (
    <svg viewBox="0 0 106 100" className="w-full h-auto overflow-visible" aria-hidden="true">
      {layers.slice(0, -1).map((layer, li) =>
        layer.flatMap((y1, i) =>
          layers[li + 1].map((y2, j) => {
            const on = active[li].includes(i) && active[li + 1].includes(j);
            const line = { x1: xs[li], y1, x2: xs[li + 1], y2 };
            return on ? (
              <g key={`${li}-${i}-${j}`}>
                <line {...line} className="stroke-gold/35" strokeWidth={1.1} />
                <line {...line} className="stroke-gold hg-flow" strokeWidth={1.2} style={{ "--d": `${li * 300}ms` } as CSSProperties} />
              </g>
            ) : (
              <line key={`${li}-${i}-${j}`} {...line} className="stroke-border" strokeWidth={0.6} />
            );
          }),
        ),
      )}
      <circle cx={xs[3]} cy={50} r={6} className="fill-viz-amber/40 hg-pulse" />
      {layers.map((layer, li) =>
        layer.map((y, i) => (
          <circle
            key={`n-${li}-${i}`}
            cx={xs[li]}
            cy={y}
            r={active[li].includes(i) ? 4 : 3.2}
            className={active[li].includes(i) ? layerFill[li] : "fill-card stroke-border"}
            strokeWidth={0.8}
          />
        )),
      )}
    </svg>
  );
};

const ExperienceSidebar = () => (
  <aside className="hidden lg:block sticky top-24 space-y-5" aria-label="Experience summary">
    {/* At a glance */}
    <div className="bg-card rounded-2xl border border-border/70 p-6">
      <p className="section-label mb-5">At a glance</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: experiences.length, label: "Positions" },
          { value: institutions.length, label: "Institutions" },
          { value: sinceYear, label: "Since" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-2xl font-semibold text-foreground leading-none">{stat.value}</p>
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-1.5">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-3" role="img" aria-label={typeCounts.map((t) => `${t.count} ${t.label}`).join(", ")}>
        {typeCounts.map((t) => (
          <div key={t.type} className={typeColors[t.type]} style={{ flexGrow: t.count }} />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {typeCounts.map((t) => (
          <li key={t.type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`w-2 h-2 rounded-full ${typeColors[t.type]}`} aria-hidden="true" />
            {t.label} <span className="font-mono text-foreground">{t.count}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Institutions */}
    <div className="bg-card rounded-2xl border border-border/70 p-6">
      <p className="section-label mb-4">Institutions</p>
      <ul className="space-y-4">
        {institutions.map((inst) => (
          <li key={inst.name} className="flex gap-3">
            <CompanyLogo name={inst.name} src={inst.logo} className="w-10 h-10 rounded-lg" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-snug">{inst.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {inst.roles.length} {inst.roles.length === 1 ? "role" : "roles"} · {inst.location}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* CV link with network illustration */}
    <Link
      to="/cv"
      className="group block bg-card rounded-2xl border border-border/70 p-6 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200 active:scale-[0.99]"
    >
      <div className="px-4 pb-4">
        <NetworkGraphic />
      </div>
      <p className="font-display text-lg font-semibold text-foreground">Full CV</p>
      <p className="text-sm text-muted-foreground mt-1 mb-3">Education, publications, awards and skills in one place.</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold">
        View CV
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5 group-data-[touched=true]:translate-x-0.5" />
      </span>
    </Link>
  </aside>
);

const ExperiencePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Professional Experience | Israt Jahan Khan</title>
        <meta name="description" content="Professional experience of Israt Jahan Khan: research intern (promoted from student researcher) at ELITE Research Lab, lecturer and research assistant at United International University, research intern at CCDS, IUB." />
        <link rel="canonical" href="https://isratijk.github.io/experience" />
        <meta property="og:title" content="Professional Experience | Israt Jahan Khan" />
        <meta property="og:description" content="Research and teaching positions across ELITE Research Lab, United International University, and CCDS, IUB." />
        <meta property="og:url" content="https://isratijk.github.io/experience" />
      </Helmet>
      <PageHero
        graphic="experience"
        label="Professional History"
        title="Experience"
        subtitle="Research and teaching positions held across industry labs and universities."
        breadcrumbs={[{ label: "Experience" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10 items-start">
            <div className="relative">
              <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border hidden sm:block" />
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="flex gap-6">
                    <div className="hidden sm:flex flex-col items-center flex-shrink-0 pt-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${
                          index === 0
                            ? "bg-gold border-background ring-2 ring-gold/30"
                            : "bg-background border-border ring-2 ring-border/30"
                        }`}
                      />
                    </div>
                    <div className="flex-1 group bg-card rounded-2xl p-6 border border-border/70 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div className="flex gap-4 min-w-0">
                          <CompanyLogo name={exp.company} src={exp.logo} />
                          <div>
                            <h2 className="text-lg font-semibold text-foreground group-hover:text-gold group-data-[touched=true]:text-gold transition-colors leading-tight">
                              {exp.role}
                            </h2>
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-gold mt-0.5 hover:underline data-[touched=true]:underline underline-offset-2"
                              >
                                {exp.company}
                                <ExternalLink size={12} aria-hidden="true" />
                              </a>
                            ) : (
                              <p className="text-sm font-medium text-gold mt-0.5">{exp.company}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-0.5">{exp.location}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <span className="font-mono text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                            {exp.period}
                          </span>
                          <span className="font-mono text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                            {typeLabels[exp.type]}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-gold/8 text-gold border border-gold/15"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ExperienceSidebar />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExperiencePage;
