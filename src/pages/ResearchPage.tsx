import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Eye, Network, Cpu, Brain, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { researchAreas } from "@/data/research";
import { publications } from "@/data/publications";

const researchIcons = { eye: Eye, network: Network, cpu: Cpu, brain: Brain };

const ResearchPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Research | Israt Jahan Khan - Computer Vision & Machine Learning</title>
        <meta name="description" content="Research interests of Israt Jahan Khan: Computer Vision, Machine Learning, Deep Learning, and Interdisciplinary AI. Work spans medical imaging, IoT safety systems, and object detection." />
        <link rel="canonical" href="https://isratijk.github.io/research" />
        <meta property="og:title" content="Research Interests | Israt Jahan Khan" />
        <meta property="og:description" content="Computer Vision, Machine Learning, Deep Learning, and Interdisciplinary AI research by Israt Jahan Khan." />
        <meta property="og:url" content="https://isratijk.github.io/research" />
      </Helmet>
      <PageHero
        label="Academic Research"
        title="Research Interests"
        subtitle="My research bridges computer science, machine learning, and computer vision to build AI systems that solve complex real-world problems."
        breadcrumbs={[{ label: "Research" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">

            {/* Research area cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {researchAreas.map((area) => {
                const Icon = researchIcons[area.icon];
                const relatedPubs = area.relatedPublications
                  ? publications.filter((p) => area.relatedPublications!.includes(p.id))
                  : [];

                return (
                  <div
                    key={area.id}
                    className="bg-background rounded-2xl border border-border/70 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-card data-[touched=true]:shadow-card transition-all duration-300 p-6 flex flex-col"
                  >
                    {/* Icon + title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="section-label mb-0.5">Focus Area</p>
                        <h2 className="font-display text-lg font-bold text-foreground leading-tight">
                          {area.title}
                        </h2>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {area.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {area.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-gold/8 text-gold border border-gold/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Related publications */}
                    {relatedPubs.length > 0 && (
                      <div className="mt-auto pt-4 border-t border-border/40">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                          Related Publications
                        </p>
                        <div className="space-y-2">
                          {relatedPubs.map((pub) => (
                            <a
                              key={pub.id}
                              href={pub.publisherLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 group"
                            >
                              <span className="font-mono text-xs font-bold text-gold/60 flex-shrink-0 mt-0.5">
                                {pub.year}
                              </span>
                              <span className="text-xs text-muted-foreground group-hover:text-gold group-data-[touched=true]:text-gold transition-colors leading-snug">
                                {pub.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 pt-10 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    Interested in Collaboration?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    I am open to research collaborations and PhD opportunities worldwide.
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <Link
                    to="/publications"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold data-[touched=true]:bg-gold hover:text-white data-[touched=true]:text-white transition-all"
                  >
                    Publications <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-white text-sm font-medium hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition-all shadow-gold"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResearchPage;
