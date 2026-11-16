import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Trophy, Medal, Star, Zap, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { experiences } from "@/data/experience";
import { education, skills } from "@/data/education";
import { awards } from "@/data/awards";
import { profile } from "@/data/profile";

const awardIcons = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  grant: Zap,
};

const CVPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Curriculum Vitae | Israt Jahan Khan</title>
        <meta name="description" content="Academic CV of Israt Jahan Khan: education, research experience, awards including Summa Cum Laude and BDT 200,000 research grant, and technical skills in ML and Computer Vision." />
        <link rel="canonical" href="https://isratijk.github.io/cv" />
        <meta property="og:title" content="Curriculum Vitae | Israt Jahan Khan" />
        <meta property="og:description" content="Academic CV: M.Sc. BRAC University, B.Sc. Summa Cum Laude UIU, research experience, 13+ awards, skills in Python, PyTorch, TensorFlow." />
        <meta property="og:url" content="https://isratijk.github.io/cv" />
      </Helmet>
      <PageHero
        graphic="cv"
        label="Academic Record"
        title="Curriculum Vitae"
        subtitle="Education, research experience, honors, and technical skills."
        breadcrumbs={[{ label: "CV" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* ── Education ── */}
            <div>
              <div className="mb-8">
                <span className="section-label">Academic Background</span>
                <h2 className="font-display text-2xl font-bold text-foreground mt-2">
                  Education
                </h2>
                <div className="h-px bg-border mt-4" />
              </div>

              <Link
                to="/education"
                onMouseEnter={() => import("./EducationPage")}
                className="group flex items-center justify-between gap-4 bg-card rounded-2xl p-5 border border-border/70 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {education[0].degree} in {education[0].field} at {education[0].institution}, and {education[1].degree} ({education[1].honor}) at {education[1].institution}.
                </p>
                <span className="flex items-center gap-1.5 text-sm font-medium text-gold flex-shrink-0">
                  View education
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 group-data-[touched=true]:translate-x-0.5" />
                </span>
              </Link>
            </div>

            {/* ── Experience ── */}
            <div>
              <div className="mb-8">
                <span className="section-label">Professional History</span>
                <h2 className="font-display text-2xl font-bold text-foreground mt-2">
                  Research and Teaching Experience
                </h2>
                <div className="h-px bg-border mt-4" />
              </div>

              <Link
                to="/experience"
                onMouseEnter={() => import("./ExperiencePage")}
                className="group flex items-center justify-between gap-4 bg-card rounded-2xl p-5 border border-border/70 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Research and teaching positions, including {experiences[0].role} at {experiences[0].company}.
                </p>
                <span className="flex items-center gap-1.5 text-sm font-medium text-gold flex-shrink-0">
                  View experience
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 group-data-[touched=true]:translate-x-0.5" />
                </span>
              </Link>
            </div>

            {/* ── Awards ── */}
            <div>
              <div className="mb-8">
                <span className="section-label">Recognition</span>
                <h2 className="font-display text-2xl font-bold text-foreground mt-2">
                  Awards and Honors
                </h2>
                <div className="h-px bg-border mt-4" />
              </div>

              <div className="space-y-4">
                {awards.map((award) => {
                  const Icon = awardIcons[award.icon];
                  return (
                    <div
                      key={award.id}
                      className="group flex gap-5 bg-card rounded-2xl p-5 border border-border/70 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200"
                    >
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 group-data-[touched=true]:bg-gold/20 transition-colors mt-0.5">
                        <Icon size={19} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div>
                            <h3 className="font-semibold text-foreground leading-snug text-sm">
                              {award.title}
                            </h3>
                            <p className="text-xs font-medium text-gold mt-0.5">{award.subtitle}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="font-mono text-xs text-muted-foreground">{award.year}</span>
                            <span className="text-xs text-muted-foreground">{award.organization}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Skills ── */}
            <div>
              <div className="mb-8">
                <span className="section-label">Technical Proficiency</span>
                <h2 className="font-display text-2xl font-bold text-foreground mt-2">
                  Skills and Tools
                </h2>
                <div className="h-px bg-border mt-4" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { label: "Programming Languages", items: skills.languages },
                  { label: "ML / DL Frameworks", items: skills.mlFrameworks },
                  { label: "Tools and DevOps", items: skills.tools },
                  { label: "Databases", items: skills.databases },
                  { label: "Research Domains", items: skills.domains },
                ].map((group) => (
                  <div
                    key={group.label}
                    className="bg-card rounded-2xl p-5 border border-border/70"
                  >
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground hover:bg-gold/10 data-[touched=true]:bg-gold/10 hover:text-gold data-[touched=true]:text-gold hover:border-gold/20 data-[touched=true]:border-gold/20 border border-transparent transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CVPage;
