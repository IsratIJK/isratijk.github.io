import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Github, ExternalLink, Code2, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { projects, type Project } from "@/data/projects";

const statusLabels: Record<Project["status"], { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800" },
  "in-progress": { label: "In Progress", className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800" },
  archived: { label: "Archived", className: "bg-muted text-muted-foreground border-border" },
};

const ProjectCover = ({ project }: { project: Project }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/60">
        <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-2">
          <Code2 size={20} className="text-gold/70" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">{project.category}</span>
      </div>
    );
  }

  return (
    <img
      src={project.coverImage}
      alt={`${project.title} cover`}
      onError={() => setHasError(true)}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-data-[touched=true]:scale-105"
    />
  );
};

const ProjectDetailDialog = ({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-mono text-xs text-muted-foreground">{project.category}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
          <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${statusLabels[project.status].className}`}>
            {statusLabels[project.status].label}
          </span>
        </div>
        <DialogTitle className="text-base font-semibold text-foreground leading-snug text-left">
          {project.title}
        </DialogTitle>
      </DialogHeader>

      {/* Cover image */}
      <div className="w-full rounded-xl overflow-hidden bg-muted mt-2">
        <img
          src={project.coverImage}
          alt={`${project.title} cover`}
          loading="lazy"
          decoding="async"
          className="w-full h-auto max-h-72 object-contain"
        />
      </div>

      <div className="mt-4 space-y-5">
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Overview</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </div>

        {project.longDescription && (
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Details</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-md bg-gold/8 text-gold border border-gold/15">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/40">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-medium hover:bg-foreground/85 data-[touched=true]:bg-foreground/85 transition-all"
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          {project.docs && (
            <a
              href={project.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-white text-xs font-medium hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition-all shadow-gold"
            >
              <BookOpen size={13} />
              Docs
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const status = statusLabels[project.status];

  return (
    <>
      <article
        className="group bg-background rounded-2xl border border-border/70 hover:border-gold/30 data-[touched=true]:border-gold/30 hover:shadow-card data-[touched=true]:shadow-card transition-all duration-300 overflow-hidden flex flex-col"
      >
        {/* Cover image */}
        <div className="aspect-[16/9] overflow-hidden bg-muted relative">
          <ProjectCover project={project} />
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border backdrop-blur-sm bg-background/80 ${status.className}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6 flex-1 flex flex-col">
          {/* Category + tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="font-mono text-xs text-muted-foreground">{project.category}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="font-semibold text-foreground mb-2 group-hover:text-gold group-data-[touched=true]:text-gold transition-colors">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
            {project.description}
          </p>

          {/* Read more button */}
          {project.longDescription && (
            <button
              onClick={() => setDialogOpen(true)}
              className="text-xs font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors text-left mb-3 w-fit"
            >
              Read more →
            </button>
          )}

          {/* Tech stack */}
          <div className="mt-auto pt-4 border-t border-border/40">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions footer */}
        <div className="px-5 lg:px-6 pb-5 flex items-center gap-4 border-t border-border/40 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github size={15} />
              GitHub
            </a>
          )}
          {project.docs && (
            <a
              href={project.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
              aria-label={`View docs for ${project.title}`}
            >
              <BookOpen size={15} />
              Docs
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>
      </article>

      <ProjectDetailDialog project={project} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

const ProjectsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Projects | Israt Jahan Khan - Research & Open Source</title>
        <meta name="description" content="Research prototypes and open-source projects by Israt Jahan Khan: Alzheimer's detection pipeline, bioinformatics tools, audio AI, robotics, and web applications." />
        <link rel="canonical" href="https://isratijk.github.io/projects" />
        <meta property="og:title" content="Research Projects | Israt Jahan Khan" />
        <meta property="og:description" content="Open-source research projects and web applications in Medical AI, Bioinformatics, Deep Learning, Robotics, and EdTech by Israt Jahan Khan." />
        <meta property="og:url" content="https://isratijk.github.io/projects" />
      </Helmet>
      <PageHero
        label="Portfolio"
        title="Research and Open Source Projects"
        subtitle="A collection of research prototypes, engineering projects, and open-source contributions."
        breadcrumbs={[{ label: "Projects" }]}
        actions={
          <a
            href="https://github.com/IsratIJK?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold data-[touched=true]:bg-gold hover:text-white data-[touched=true]:text-white transition-all"
          >
            <Github size={14} />
            GitHub Profile
          </a>
        }
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="https://github.com/IsratIJK?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold text-gold font-medium text-sm hover:bg-gold data-[touched=true]:bg-gold hover:text-white data-[touched=true]:text-white transition-all"
              >
                <Github size={16} />
                View All on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
