import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import CompanyLogo from "@/components/CompanyLogo";
import PageHero from "@/components/PageHero";
import { experiences } from "@/data/experience";

const typeLabels = {
  academic: "Academic",
  research: "Research",
  teaching: "Teaching",
};

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
        label="Professional History"
        title="Experience"
        subtitle="Research and teaching positions held across industry labs and universities."
        breadcrumbs={[{ label: "Experience" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
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
                    <div className="flex-1 group bg-background rounded-2xl p-6 border border-border/70 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-soft data-[touched=true]:shadow-soft transition-all duration-300">
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExperiencePage;
