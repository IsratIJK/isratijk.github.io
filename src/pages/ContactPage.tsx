import { Helmet } from "react-helmet-async";
import { Mail, MapPin, Linkedin, Github, GraduationCap, IdCard, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { profile } from "@/data/profile";

const socialConfig = [
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    description: "Connect professionally",
  },
  {
    key: "github",
    label: "GitHub",
    icon: Github,
    description: "View code and projects",
  },
  {
    key: "scholar",
    label: "Google Scholar",
    icon: GraduationCap,
    description: "Research citations and papers",
  },
  {
    key: "orcid",
    label: "ORCID",
    icon: IdCard,
    description: "Researcher identifier",
  },
  {
    key: "researchgate",
    label: "ResearchGate",
    icon: BookOpen,
    description: "Publications and preprints",
  },
] as const;

const ContactPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact | Israt Jahan Khan - PhD Opportunities & Collaboration</title>
        <meta name="description" content="Contact Israt Jahan Khan for PhD opportunities, research collaborations, or academic conversations. Based in Dhaka, Bangladesh. Open to positions worldwide." />
        <link rel="canonical" href="https://isratijk.github.io/contact" />
        <meta property="og:title" content="Contact | Israt Jahan Khan" />
        <meta property="og:description" content="Open to PhD opportunities and research collaborations worldwide. Contact Israt Jahan Khan at isratjahankhanijk@gmail.com." />
        <meta property="og:url" content="https://isratijk.github.io/contact" />
      </Helmet>
      <PageHero
        label="Contact"
        title="Get in Touch"
        subtitle="Open to PhD opportunities, research collaborations, and academic conversations."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Left: direct contact */}
              <div>
                <span className="section-label mb-4 block">Direct Contact</span>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 leading-tight">
                  PhD Opportunities and<br />Research Collaboration
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                  I am actively seeking PhD positions in Computer Science, Machine Learning,
                  Computer Vision, and related fields at research-intensive universities worldwide.
                  I am also happy to discuss research collaborations or academic conversations.
                </p>

                <div className="space-y-4 mb-8">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/70 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-soft data-[touched=true]:shadow-soft transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 group-data-[touched=true]:bg-gold/20 transition-colors flex-shrink-0">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-0.5">
                        Email
                      </p>
                      <p className="text-sm font-medium text-foreground group-hover:text-gold group-data-[touched=true]:text-gold transition-colors">
                        {profile.email}
                      </p>
                    </div>
                    <span className="ml-auto text-muted-foreground group-hover:text-gold group-data-[touched=true]:text-gold transition-colors">→</span>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-cream">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-0.5">
                        Location
                      </p>
                      <p className="text-sm font-medium text-foreground">{profile.location}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{profile.locationNote}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium text-sm hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition-all shadow-gold"
                >
                  <Mail size={16} />
                  Send Email
                </a>

                {/* Note */}
                <div className="mt-8 p-4 rounded-xl bg-gold/5 border border-gold/15">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Response time: </span>
                    I typically respond within 2-3 business days. For PhD enquiries,
                    please include your lab/research group focus in the subject line.
                  </p>
                </div>
              </div>

              {/* Right: social / academic profiles */}
              <div>
                <span className="section-label mb-4 block">Academic Profiles</span>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 leading-tight">
                  Find Me Online
                </h2>

                <div className="space-y-3">
                  {socialConfig.map((item) => {
                    const link = profile.social[item.key];
                    return (
                      <a
                        key={item.key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 rounded-xl border border-border/70 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-soft data-[touched=true]:shadow-soft transition-all duration-200"
                        aria-label={item.label}
                      >
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-gold/15 group-data-[touched=true]:bg-gold/15 transition-colors flex-shrink-0">
                          <item.icon size={18} className="text-muted-foreground group-hover:text-gold group-data-[touched=true]:text-gold transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                          <p className="font-mono text-xs text-gold/60 mt-0.5 truncate">{link.handle}</p>
                        </div>
                        <span className="text-muted-foreground group-hover:text-gold group-data-[touched=true]:text-gold transition-colors flex-shrink-0">→</span>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
