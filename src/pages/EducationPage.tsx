import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import CompanyLogo from "@/components/CompanyLogo";
import PageHero from "@/components/PageHero";
import { education } from "@/data/education";

const EducationPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Education | Israt Jahan Khan</title>
        <meta name="description" content="Education of Israt Jahan Khan: M.Sc. in Computer Science and Engineering at BRAC University and B.Sc. in CSE (Summa Cum Laude, CGPA 3.97/4.00) at United International University." />
        <link rel="canonical" href="https://isratijk.github.io/education" />
        <meta property="og:title" content="Education | Israt Jahan Khan" />
        <meta property="og:description" content="M.Sc. at BRAC University, B.Sc. Summa Cum Laude at United International University." />
        <meta property="og:url" content="https://isratijk.github.io/education" />
      </Helmet>
      <PageHero
        graphic="education"
        label="Academic Background"
        title="Education"
        subtitle="Degrees, institutions, and academic distinctions."
        breadcrumbs={[{ label: "Education" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border hidden sm:block" />
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-6">
                    <div className="hidden sm:flex flex-col items-center flex-shrink-0 pt-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${
                          edu.current
                            ? "bg-gold border-background ring-2 ring-gold/30"
                            : "bg-background border-border ring-2 ring-border/30"
                        }`}
                      />
                    </div>
                    <div className="flex-1 bg-card rounded-2xl p-6 border border-border/70 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-soft data-[touched=true]:shadow-soft transition duration-200">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div className="flex gap-4 min-w-0">
                          {edu.logo && <CompanyLogo name={edu.institution} src={edu.logo} />}
                          <div>
                            <h2 className="text-lg font-semibold text-foreground leading-tight">
                              {edu.degree} in {edu.field}
                            </h2>
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
                            <p className="text-xs text-muted-foreground mt-0.5">{edu.location}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <span className="font-mono text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                            {edu.period}
                          </span>
                          {edu.current && (
                            <span className="font-mono text-xs text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>
                      {(edu.gpa || edu.honor) && (
                        <div className="flex flex-wrap gap-2 mt-4">
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
                      )}
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

export default EducationPage;
