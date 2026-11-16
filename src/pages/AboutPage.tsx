import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { GraduationCap, Microscope, Code2, Database, ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import CompanyLogo from "@/components/CompanyLogo";
import PageHero from "@/components/PageHero";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { researchAreas } from "@/data/research";
import { Eye, Network, Cpu, Brain } from "lucide-react";

const researchIcons = { eye: Eye, network: Network, cpu: Cpu, brain: Brain };

const focusAreas = [
  { icon: Microscope, label: "Computer Vision" },
  { icon: Code2, label: "Machine Learning" },
  { icon: Database, label: "Deep Learning" },
  { icon: GraduationCap, label: "Interdisciplinary AI" },
];

const AboutPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>About | Israt Jahan Khan - M.Sc. Student & Researcher</title>
        <meta name="description" content="Learn about Israt Jahan Khan: M.Sc. student at BRAC University, former Lecturer at United International University, researcher in Machine Learning and Computer Vision with 30+ citations." />
        <link rel="canonical" href="https://isratijk.github.io/about" />
        <meta property="og:title" content="About | Israt Jahan Khan" />
        <meta property="og:description" content="M.Sc. student at BRAC University researching Machine Learning, Computer Vision, and AI. Summa Cum Laude graduate, 4 publications, 30+ citations." />
        <meta property="og:url" content="https://isratijk.github.io/about" />
      </Helmet>
      <PageHero
        label="About"
        title="Israt Jahan Khan"
        subtitle={`${profile.role} · ${profile.institution}, ${profile.location}`}
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">

            {/* Bio + photo grid */}
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start mb-20">
              {/* Photo */}
              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/8 rounded-2xl translate-x-3 translate-y-3" />
                  <div className="absolute inset-0 border border-gold/20 rounded-2xl translate-x-1.5 translate-y-1.5" />
                  <div className="relative w-56 sm:w-64 lg:w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-card border border-border/50">
                    <img
                      src={profile.photo}
                      alt="Israt Jahan Khan"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Bio text */}
              <div className="lg:col-span-2 space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {profile.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 bg-cream rounded-xl border border-border/40"
                    >
                      <p className="font-display text-2xl font-bold text-gold">{stat.value}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="prose-academic">
                  {profile.bio.map((paragraph, i) => (
                    <p key={i} className="text-base text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {i === 0 ? (
                        <>
                          I am{" "}
                          <span className="text-foreground font-semibold">Israt Jahan Khan</span>
                          {paragraph.slice("I am Israt Jahan Khan".length)}
                        </>
                      ) : paragraph.includes("3.97") ? (
                        <>
                          {paragraph.split("3.97/4.00")[0]}
                          <span className="text-gold font-semibold">3.97/4.00</span>
                          {paragraph.split("3.97/4.00")[1]}
                        </>
                      ) : paragraph.includes("PhD positions") ? (
                        <>
                          {paragraph.split("PhD positions")[0]}
                          <span className="text-foreground font-semibold">PhD positions</span>
                          {paragraph.split("PhD positions")[1]}
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
                  >
                    {profile.email} →
                  </a>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-16">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <span className="section-label">Education</span>
                  <h2 className="font-display text-2xl font-bold text-foreground mt-2">
                    Academic Background
                  </h2>
                </div>
                <Link
                  to="/education"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors flex-shrink-0"
                >
                  Full education <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className={`p-5 rounded-2xl border transition duration-200 ${
                      edu.current
                        ? "bg-gold/5 border-gold/25 hover:border-gold/40 data-[touched=true]:border-gold/40"
                        : "bg-background border-border/70 hover:border-gold/20 data-[touched=true]:border-gold/20"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div className="flex gap-4 min-w-0">
                        {edu.logo && <CompanyLogo name={edu.institution} src={edu.logo} />}
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{edu.degree} in {edu.field}</h3>
                          {edu.institutionUrl ? (
                            <a
                              href={edu.institutionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-medium text-gold mt-0.5 hover:underline data-[touched=true]:underline underline-offset-2"
                            >
                              {edu.institution}
                              <ExternalLink size={12} aria-hidden="true" />
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-gold mt-0.5">{edu.institution}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {edu.period}
                        </span>
                        {edu.current && (
                          <span className="font-mono text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{edu.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.gpa && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-gold/8 text-gold border border-gold/15">
                          CGPA {edu.gpa}
                        </span>
                      )}
                      {edu.honor && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-gold/8 text-gold border border-gold/15">
                          {edu.honor}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research focus areas */}
            <div className="mb-16">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <span className="section-label">Expertise</span>
                  <h2 className="font-display text-2xl font-bold text-foreground mt-2">
                    Research Focus Areas
                  </h2>
                </div>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors flex-shrink-0"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {researchAreas.map((area) => {
                  const Icon = researchIcons[area.icon];
                  return (
                    <div
                      key={area.id}
                      className="group flex gap-4 p-5 bg-cream rounded-2xl border border-border/50 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 group-data-[touched=true]:bg-gold/20 transition-colors">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">{area.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {area.shortDescription}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic profiles */}
            <div>
              <span className="section-label">Find Me Online</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-2 mb-6">
                Academic Profiles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(profile.social).map(([key, link]) => (
                  <a
                    key={key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 bg-card rounded-xl border border-border/70 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground capitalize">
                        {key === "researchgate" ? "ResearchGate" : key === "orcid" ? "ORCID" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate max-w-[160px]">
                        {link.handle}
                      </p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-gold group-data-[touched=true]:text-gold transition-colors text-sm">→</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
