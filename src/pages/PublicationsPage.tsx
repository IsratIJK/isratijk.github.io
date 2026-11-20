import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ExternalLink,
  FileText,
  BookOpen,
  Download,
} from "lucide-react";

const quartileStyles: Record<string, string> = {
  Q1: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  Q2: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
  Q3: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  Q4: "bg-muted text-muted-foreground border-border",
};
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { publications, RESEARCHER_NAME, type Publication } from "@/data/publications";

type Filter = "All" | "Journal" | "Conference";

const PublicationCover = ({ pub }: { pub: Publication }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 ${
          pub.type === "Journal"
            ? "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/40"
            : "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/40 dark:to-slate-800/40"
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center mb-2">
          <FileText size={16} className="text-gold" />
        </div>
        <span className="text-xs font-mono text-muted-foreground text-center leading-tight">
          {pub.venueShort}
        </span>
        <span className="text-xs font-mono text-muted-foreground/60 mt-1">{pub.year}</span>
      </div>
    );
  }

  return (
    <img
      src={pub.coverImage}
      alt={`Cover for ${pub.title}`}
      onError={() => setHasError(true)}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover"
    />
  );
};

const formatAuthors = (authors: string) => {
  return authors.split(", ").map((author, i, arr) => {
    const isResearcher = author === RESEARCHER_NAME || author.startsWith(RESEARCHER_NAME + ",");
    return (
      <span key={i}>
        <span className={isResearcher ? "font-semibold text-foreground" : ""}>
          {author}
        </span>
        {i < arr.length - 1 && <span className="text-muted-foreground">, </span>}
      </span>
    );
  });
};

const AbstractDialog = ({
  pub,
  open,
  onClose,
}: {
  pub: Publication;
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
    <DialogContent aria-describedby={undefined} className="max-w-2xl max-h-[85dvh] overflow-y-auto">
      <DialogHeader>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-gold">{pub.year}</span>
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded border ${
              pub.type === "Journal"
                ? "bg-gold/8 text-gold border-gold/20"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {pub.type}
          </span>
          {pub.quartile && (
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${quartileStyles[pub.quartile]}`}>
              {pub.quartile}
            </span>
          )}
          {pub.citations !== undefined && pub.citations > 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <BookOpen size={11} />
              {pub.citations} citations
            </span>
          )}
        </div>
        <DialogTitle className="text-base font-semibold text-foreground leading-snug text-left">
          {pub.title}
        </DialogTitle>
        <p className="text-sm text-muted-foreground italic leading-relaxed mt-1">
          {formatAuthors(pub.authors)}
        </p>
        <p className="text-sm font-medium text-foreground/70 mt-1">{pub.venue}</p>
      </DialogHeader>

      {/* Cover image */}
      <div className="w-full rounded-xl overflow-hidden bg-muted mt-2">
        <img
          src={pub.coverImage}
          alt={`Cover for ${pub.title}`}
          loading="lazy"
          decoding="async"
          className="w-full h-auto max-h-80 object-contain"
        />
      </div>

      <div className="mt-4 space-y-4">
        {/* Abstract */}
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Abstract
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">{pub.abstract}</p>
        </div>

        {/* Keywords */}
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Keywords
          </p>
          <div className="flex flex-wrap gap-1.5">
            {pub.keywords.map((kw) => (
              <span
                key={kw}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-gold/8 text-gold border border-gold/15"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* DOI */}
        {pub.doi && (
          <div className="pt-2 border-t border-border/40">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              DOI:{" "}
            </span>
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
            >
              {pub.doi}
            </a>
          </div>
        )}

        {/* Action links */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/40">
          {pub.pdfUrl && (
            <a
              href={pub.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-gold-foreground text-xs font-medium hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition shadow-gold active:scale-[0.97]"
            >
              <Download size={13} />
              Download PDF
            </a>
          )}
          {pub.paperLink && (
            <a
              href={pub.paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
            >
              <FileText size={13} />
              Preprint
            </a>
          )}
          <a
            href={pub.publisherLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground transition-colors"
          >
            <ExternalLink size={13} />
            Publisher
          </a>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const PublicationEntry = ({ pub, index }: { pub: Publication; index: number }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <article className="group bg-card rounded-2xl border border-border/70 hover:border-gold/25 data-[touched=true]:border-gold/25 hover:shadow-card data-[touched=true]:shadow-card transition duration-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Cover */}
          <div className="sm:w-36 lg:w-44 flex-shrink-0 aspect-[3/4] sm:aspect-auto overflow-hidden bg-muted relative">
            <PublicationCover pub={pub} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 p-5 lg:p-6 flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-gold">{pub.year}</span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  pub.type === "Journal"
                    ? "bg-gold/8 text-gold border-gold/20"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {pub.type}
              </span>
              {pub.quartile && (
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${quartileStyles[pub.quartile]}`}>
                  {pub.quartile}
                </span>
              )}
              {pub.citations !== undefined && pub.citations > 0 && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <BookOpen size={11} />
                  {pub.citations} citations
                </span>
              )}
              <span className="font-mono text-xs text-muted-foreground/60 ml-auto">
                [{String(index + 1).padStart(2, "0")}]
              </span>
            </div>

            {/* Title */}
            <h2 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-gold group-data-[touched=true]:text-gold transition-colors duration-200">
              {pub.title}
            </h2>

            {/* Authors */}
            <p className="text-sm text-muted-foreground italic mb-2 leading-relaxed">
              {formatAuthors(pub.authors)}
            </p>

            {/* Venue + DOI */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
              <span className="text-sm text-foreground/75 font-medium">{pub.venue}</span>
              {pub.doi && (
                <>
                  <span className="text-muted-foreground/50 text-sm">·</span>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-gold/65 hover:text-gold data-[touched=true]:text-gold transition-colors"
                  >
                    {pub.doi}
                  </a>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-auto">
              <button
                onClick={() => setDialogOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold/80 data-[touched=true]:text-gold/80 transition-colors"
              >
                <BookOpen size={13} />
                Details &amp; Abstract
              </button>

              {pub.pdfUrl && (
                <a
                  href={pub.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground transition-colors"
                >
                  <Download size={13} />
                  PDF
                </a>
              )}

              {pub.paperLink && (
                <a
                  href={pub.paperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground transition-colors"
                >
                  <FileText size={13} />
                  Preprint
                </a>
              )}

              <a
                href={pub.publisherLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground transition-colors"
              >
                <ExternalLink size={13} />
                Publisher
              </a>
            </div>
          </div>
        </div>
      </article>

      <AbstractDialog pub={pub} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

const PublicationsPage = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All" ? publications : publications.filter((p) => p.type === filter);

  const journalCount = publications.filter((p) => p.type === "Journal").length;
  const confCount = publications.filter((p) => p.type === "Conference").length;
  const totalCitations = publications.reduce((acc, p) => acc + (p.citations ?? 0), 0);

  return (
    <Layout>
      <Helmet>
        <title>Research Publications | Israt Jahan Khan - IEEE, Elsevier</title>
        <meta name="description" content="4 peer-reviewed publications by Israt Jahan Khan in IEEE Access, Elsevier Informatics in Medicine Unlocked, IEEE ICCIT, and IEEE ICEEICT. Topics: Alzheimer's detection, IoT traffic safety, ensemble classifiers, object detection." />
        <link rel="canonical" href="https://isratijk.github.io/publications" />
        <meta property="og:title" content="Research Publications | Israt Jahan Khan" />
        <meta property="og:description" content="Peer-reviewed publications in IEEE and Elsevier on Machine Learning, Computer Vision, and AI applications." />
        <meta property="og:url" content="https://isratijk.github.io/publications" />
        {/* Google Scholar / citation indexer meta */}
        <meta name="citation_author" content="Israt Jahan Khan" />
        <meta name="citation_title" content="Enhanced ROI guided deep learning model for Alzheimer's detection using 3D MRI images" />
        <meta name="citation_journal_title" content="Informatics in Medicine Unlocked" />
        <meta name="citation_publisher" content="Elsevier" />
        <meta name="citation_publication_date" content="2025" />
        <meta name="citation_doi" content="10.1016/j.imu.2025.101650" />
        <meta name="citation_issn" content="2352-9148" />
        <meta name="citation_abstract_html_url" content="https://www.sciencedirect.com/science/article/pii/S2352914825000383" />
      </Helmet>
      <PageHero
        graphic="publications"
        label="Academic Work"
        title="Research Publications"
        subtitle={`${publications.length} publications · ${totalCitations}+ citations · IEEE, Elsevier`}
        breadcrumbs={[{ label: "Publications" }]}
        actions={
          <a
            href="https://scholar.google.com/citations?user=n4mCE9QAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold data-[touched=true]:bg-gold hover:text-gold-foreground data-[touched=true]:text-gold-foreground transition active:scale-[0.97]"
          >
            <BookOpen size={14} />
            Google Scholar
          </a>
        }
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Filter bar */}
            <div className="flex items-center gap-2 mb-10 p-1 bg-muted rounded-xl w-fit">
              {(["All", "Journal", "Conference"] as Filter[]).map((f) => {
                const count =
                  f === "All" ? publications.length : f === "Journal" ? journalCount : confCount;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition active:scale-[0.97] ${
                      filter === f
                        ? "bg-background text-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground"
                    }`}
                  >
                    {f}{" "}
                    <span className="font-mono text-xs opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Publication list */}
            <div className="space-y-5">
              {filtered.map((pub, index) => (
                <PublicationEntry key={pub.id} pub={pub} index={index} />
              ))}
            </div>

            {/* Scholar CTA */}
            <div className="mt-12 text-center">
              <a
                href="https://scholar.google.com/citations?user=n4mCE9QAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold text-gold font-medium text-sm hover:bg-gold data-[touched=true]:bg-gold hover:text-gold-foreground data-[touched=true]:text-gold-foreground transition active:scale-[0.97]"
              >
                <ExternalLink size={16} />
                View All on Google Scholar
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PublicationsPage;
