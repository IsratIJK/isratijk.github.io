import { Link } from "react-router-dom";
import { Mail, FileText, MapPin, ArrowRight, BookOpen, Github, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { projects } from "@/data/projects";
import { researchAreas } from "@/data/research";
import { Eye, Network, Cpu, Brain } from "lucide-react";

const researchIcons = { eye: Eye, network: Network, cpu: Cpu, brain: Brain };

const FeaturedPublicationCard = ({ pub, index }: { pub: (typeof publications)[0]; index: number }) => {
  return (
    <article className="group flex gap-4 py-5 border-b border-border/50 last:border-0">
      <span className="font-mono text-sm font-bold text-gold/50 flex-shrink-0 pt-0.5 w-7">
        [{String(index + 1).padStart(2, "0")}]
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="font-mono text-xs font-bold text-gold">{pub.year}</span>
          <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
            pub.type === "Journal"
              ? "bg-gold/8 text-gold border-gold/20"
              : "bg-muted text-muted-foreground border-border"
          }`}>
            {pub.type}
          </span>
          {pub.citations && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <BookOpen size={10} />
              {pub.citations} cited
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-foreground leading-snug mb-1 group-hover:text-gold group-data-[touched=true]:text-gold transition-colors">
          {pub.title}
        </h3>
        <p className="text-xs text-muted-foreground italic mb-2 leading-relaxed line-clamp-1">
          {pub.authors}
        </p>
        <p className="text-xs text-foreground/60 font-medium">{pub.venueShort}</p>
      </div>
    </article>
  );
};

const ProfilePhoto = () => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gold/8 rounded-3xl translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-7 group-data-[touched=true]:translate-x-7 group-hover:translate-y-7 group-data-[touched=true]:translate-y-7 motion-reduce:transition-none" />
      <div className="absolute inset-0 border-2 border-gold/20 rounded-3xl translate-x-2.5 translate-y-2.5 transition duration-300 ease-out group-hover:translate-x-3.5 group-data-[touched=true]:translate-x-3.5 group-hover:translate-y-3.5 group-data-[touched=true]:translate-y-3.5 group-hover:border-gold/50 group-data-[touched=true]:border-gold/50 motion-reduce:transition-none" />
      <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] rounded-3xl overflow-hidden shadow-page border border-border/50 transition duration-300 ease-out group-hover:-translate-y-1.5 group-data-[touched=true]:-translate-y-1.5 group-hover:border-gold/40 group-data-[touched=true]:border-gold/40 group-hover:shadow-card group-data-[touched=true]:shadow-card motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-data-[touched=true]:translate-y-0">
        <img
          src={profile.photo}
          alt="Israt Jahan Khan - Prospective PhD Candidate in Computer Science"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03] group-data-[touched=true]:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-data-[touched=true]:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent transition-opacity duration-300 group-hover:opacity-0 group-data-[touched=true]:opacity-0" />
      </div>
    </div>
  );
};

const Home = () => {
  const featuredPubs = publications.filter((p) => p.featured).slice(0, 3);
  const featuredProjects = projects.slice(0, 2);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-label="Introduction"
      >
        <div className="absolute inset-0 bg-dot-grid opacity-50" />
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-gold/4 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)]">
            {/* Left */}
            <div className="lg:col-span-3 order-2 lg:order-1 py-12 lg:py-0">
              <div className="flex items-center gap-3 mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0ms" }}>
                <span className="h-px w-10 bg-gold" />
                <span className="section-label">{profile.role}</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "60ms" }}>
                Israt Jahan Khan
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4 max-w-xl animate-fade-in-up opacity-0" style={{ animationDelay: "110ms" }}>
                M.Sc. student at{" "}
                <span className="text-foreground font-medium">BRAC University</span>. Researching{" "}
                <span className="text-foreground font-medium">machine learning</span>,{" "}
                <span className="text-foreground font-medium">computer vision</span>, and interdisciplinary AI.
                Published in <span className="text-foreground font-medium">IEEE Access</span> and{" "}
                <span className="text-foreground font-medium">Elsevier</span>.
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "150ms" }}>
                <MapPin size={14} className="text-gold" />
                <span>{profile.location} · {profile.locationNote}</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: "185ms" }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-gold-foreground font-medium text-sm hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition shadow-gold hover:shadow-lg data-[touched=true]:shadow-lg hover:-translate-y-0.5 data-[touched=true]:-translate-y-0.5 active:scale-[0.97]"
                >
                  <Mail size={16} />
                  Contact Me
                </Link>
                <Link
                  to="/publications"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold text-gold font-medium text-sm hover:bg-gold data-[touched=true]:bg-gold hover:text-gold-foreground data-[touched=true]:text-gold-foreground transition hover:-translate-y-0.5 data-[touched=true]:-translate-y-0.5 active:scale-[0.97]"
                >
                  <FileText size={16} />
                  Publications
                </Link>
                <a
                  href={profile.social.scholar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted text-foreground font-medium text-sm hover:bg-muted/70 data-[touched=true]:bg-muted/70 transition hover:-translate-y-0.5 data-[touched=true]:-translate-y-0.5 active:scale-[0.97]"
                >
                  <BookOpen size={16} />
                  Scholar
                </a>
              </div>

              <div className="flex flex-wrap gap-8 pt-8 border-t border-border animate-fade-in-up opacity-0" style={{ animationDelay: "215ms" }}>
                {profile.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo */}
            <div className="lg:col-span-2 order-1 lg:order-2 pt-6 lg:pt-0 flex justify-center lg:justify-end animate-fade-in opacity-0" style={{ animationDelay: "100ms" }}>
              <ProfilePhoto />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Publications ── */}
      <section className="py-24 bg-background" aria-label="Selected Publications">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2">
                <span className="section-label">Recent Work</span>
                <h2 className="font-display text-3xl font-bold text-foreground mt-3 mb-4 leading-tight">
                  Selected Publications
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Peer-reviewed work in machine learning, computer vision, and applied AI.
                  Published in IEEE and Elsevier venues.
                </p>
                <Link
                  to="/publications"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
                >
                  View all publications <ArrowRight size={14} />
                </Link>
              </div>

              <div className="lg:col-span-3">
                <div className="divide-y divide-border/40">
                  {featuredPubs.map((pub, i) => (
                    <FeaturedPublicationCard key={pub.id} pub={pub} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Research Areas ── */}
      <section className="py-24 bg-cream" aria-label="Research Interests">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="section-label">Research Interests</span>
                <h2 className="font-display text-3xl font-bold text-foreground mt-3 leading-tight">
                  What I Study
                </h2>
              </div>
              <Link
                to="/research"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors flex-shrink-0"
              >
                Explore research <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {researchAreas.map((area) => {
                const Icon = researchIcons[area.icon];
                return (
                  <div
                    key={area.id}
                    className="group bg-card rounded-2xl p-5 border border-border/70 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-card data-[touched=true]:shadow-card transition duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-data-[touched=true]:bg-gold/20 transition-colors">
                      <Icon size={17} className="text-gold" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">{area.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {area.shortDescription}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="py-24 bg-background" aria-label="Selected Projects">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="section-label">Projects</span>
                <h2 className="font-display text-3xl font-bold text-foreground mt-3 leading-tight">
                  Selected Work
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors flex-shrink-0"
              >
                View all projects <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-card rounded-2xl border border-border/70 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-card data-[touched=true]:shadow-card transition duration-200 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    <ProjectCoverImage project={project} />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground mt-0.5">
                        {project.category}
                      </span>
                      {project.tags.slice(0, 1).map((t) => (
                        <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-gold group-data-[touched=true]:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/40">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 pb-5 flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground transition-colors"
                      >
                        <Github size={13} /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
                      >
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PhD CTA ── */}
      <section className="py-20 bg-navy dark:bg-card dark:border-y dark:border-border" aria-label="PhD Opportunities">
        <div className="container mx-auto px-6 text-center">
          <span className="font-mono text-xs font-bold text-gold/70 uppercase tracking-widest">
            Open to Opportunities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-4 mb-5 leading-tight">
            Seeking PhD Positions
          </h2>
          <p className="text-white/65 leading-relaxed max-w-xl mx-auto mb-8 text-base">
            Actively pursuing PhD opportunities in Computer Science, Machine Learning, and Computer Vision
            at research-intensive universities worldwide.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-gold-foreground font-medium text-sm hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition shadow-gold active:scale-[0.97]"
            >
              <Mail size={16} />
              Get in Touch
            </Link>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/40 data-[touched=true]:border-white/40 hover:bg-white/5 data-[touched=true]:bg-white/5 transition active:scale-[0.97]"
            >
              <FileText size={16} />
              View CV
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ProjectCoverImage = ({ project }: { project: (typeof projects)[0] }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.classList.add("flex", "items-center", "justify-center");
      const placeholder = parent.querySelector(".placeholder-content");
      if (placeholder) (placeholder as HTMLElement).style.display = "flex";
    }
  };

  return (
    <>
      <img
        src={project.coverImage}
        alt={project.title}
        onError={handleError}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-data-[touched=true]:scale-[1.03]"
      />
      <div
        className="placeholder-content hidden flex-col items-center justify-center w-full h-full bg-gradient-to-br from-muted to-muted/60 absolute inset-0"
      >
        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-2">
          <Github size={18} className="text-gold/70" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">{project.category}</span>
      </div>
    </>
  );
};

export default Home;
