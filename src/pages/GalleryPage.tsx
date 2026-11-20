import { Helmet } from "react-helmet-async";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Images } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { gallery, galleryCategories, type GalleryItem, type GalleryCategory } from "@/data/gallery";

const preventDownload = (e: React.MouseEvent) => e.preventDefault();

const GalleryImage = ({ item, onClick }: { item: GalleryItem; onClick: () => void }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <button
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-xl bg-muted aspect-[4/3] cursor-zoom-in flex flex-col items-center justify-center"
        aria-label={`View ${item.title}`}
      >
        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-2">
          <Images size={18} className="text-gold/60" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">{item.title}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl bg-muted block cursor-zoom-in aspect-[4/3]"
      aria-label={`View ${item.title}`}
    >
      <img
        src={item.src}
        alt={item.title}
        onError={() => setHasError(true)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03] group-data-[touched=true]:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/0 [@media(hover:none)]:bg-gradient-to-t [@media(hover:none)]:from-black/60 [@media(hover:none)]:via-transparent [@media(hover:none)]:to-transparent group-hover:bg-black/45 group-data-[touched=true]:bg-black/45 transition duration-200 rounded-xl flex items-end">
        <div className="p-4 w-full translate-y-2 opacity-0 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 group-hover:translate-y-0 group-data-[touched=true]:translate-y-0 group-hover:opacity-100 group-data-[touched=true]:opacity-100 transition duration-200">
          <p className="text-white text-sm font-medium leading-tight">{item.title}</p>
          <span className="text-white/65 text-xs font-mono">{item.category}</span>
        </div>
      </div>
    </button>
  );
};

const GalleryVideo = ({ item, onClick }: { item: GalleryItem; onClick: () => void }) => {
  const [posterError, setPosterError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl bg-zinc-900 block cursor-pointer"
      aria-label={`Play ${item.title}`}
    >
      {/* Fixed aspect container so layout never collapses */}
      <div className="aspect-[4/3] w-full relative">
        {item.poster && !posterError ? (
          <img
            src={item.poster}
            alt={`${item.title} thumbnail`}
            onError={() => setPosterError(true)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <Play size={32} className="text-white/20" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/50 group-data-[touched=true]:bg-black/50 transition duration-200">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-data-[touched=true]:scale-110 transition-transform duration-200">
            <Play size={22} className="text-zinc-900 ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-sm font-medium drop-shadow leading-tight">{item.title}</p>
          <span className="text-white/60 text-xs font-mono">{item.category}</span>
        </div>
      </div>
    </button>
  );
};

const Lightbox = ({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < items.length - 1;

  useEffect(() => {
    if (index === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, onPrev, onNext, onClose]);

  const item = index !== null ? items[index] : null;

  return (
    <Dialog open={index !== null} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-5xl w-full p-0 overflow-hidden bg-zinc-950 border-white/10 gap-0"
      >
        {item && (
          <>
            <DialogTitle className="sr-only">{item.title}</DialogTitle>
            {/* Top bar — the dialog's own close button sits at the right edge */}
            <div className="flex items-center justify-between pl-5 pr-16 py-3 border-b border-white/10 min-h-[3.25rem]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gold">{item.category}</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/45 text-xs font-mono tabular-nums">
                  {(index as number) + 1} / {items.length}
                </span>
              </div>
            </div>

            {/* Media area */}
            <div className="relative flex items-center justify-center bg-black min-h-[55vh] max-h-[75vh] overflow-hidden">
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  className="max-w-full max-h-[75vh] object-contain"
                />
              ) : (
                <video
                  key={item.src}
                  src={item.src}
                  poster={item.poster}
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  onContextMenu={preventDownload}
                  className="max-w-full max-h-[75vh]"
                />
              )}

              {/* Prev button */}
              {hasPrev && (
                <button
                  onClick={onPrev}
                  className="absolute left-3 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 data-[touched=true]:bg-black/70 border border-white/10 flex items-center justify-center transition hover:scale-105 data-[touched=true]:scale-105 active:scale-[0.97]"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
              )}

              {/* Next button */}
              {hasNext && (
                <button
                  onClick={onNext}
                  className="absolute right-3 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 data-[touched=true]:bg-black/70 border border-white/10 flex items-center justify-center transition hover:scale-105 data-[touched=true]:scale-105 active:scale-[0.97]"
                  aria-label="Next"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              )}
            </div>

            {/* Caption */}
            <div className="px-6 py-4 border-t border-white/10">
              <p className="text-white font-semibold text-sm">{item.title}</p>
              {item.description && (
                <p className="text-white/55 text-sm mt-1 leading-relaxed">{item.description}</p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ITEMS_PER_PAGE = 6;

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [shownCategory, setShownCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const categoryTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(categoryTimer.current), []);

  const sorted = [...gallery].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filtered =
    shownCategory === "All" ? sorted : sorted.filter((item) => item.category === shownCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [shownCategory]);

  const changeCategory = (cat: GalleryCategory) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setIsTransitioning(true);
    window.clearTimeout(categoryTimer.current);
    categoryTimer.current = window.setTimeout(() => {
      setShownCategory(cat);
      setIsTransitioning(false);
    }, 150);
  };

  const changePage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      if (gridTopRef.current) {
        const top = window.scrollY + gridTopRef.current.getBoundingClientRect().top - 80;
        window.scrollTo({ behavior: "smooth", top });
      }
    }, 200);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i !== null && i < paginatedItems.length - 1 ? i + 1 : i)),
    [paginatedItems.length]
  );

  return (
    <Layout>
      <Helmet>
        <title>Gallery | Israt Jahan Khan - Conferences & Research Moments</title>
        <meta name="description" content="Photo gallery of Israt Jahan Khan featuring conference presentations at IEEE ICEEICT, lab sessions, and academic milestones including BSc convocation at United International University." />
        <link rel="canonical" href="https://isratijk.github.io/gallery" />
        <meta property="og:title" content="Gallery | Israt Jahan Khan" />
        <meta property="og:description" content="Conference presentations, lab sessions, and academic milestones of Israt Jahan Khan." />
        <meta property="og:url" content="https://isratijk.github.io/gallery" />
      </Helmet>
      <PageHero
        graphic="gallery"
        label="Media"
        title="Gallery"
        subtitle="Research presentations, conference highlights, and behind-the-scenes moments."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Filter bar */}
            <div className="flex items-center gap-2 mb-10 p-1 bg-muted rounded-xl w-fit flex-wrap">
              {galleryCategories.map((cat) => {
                const count =
                  cat === "All" ? gallery.length : gallery.filter((i) => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => changeCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition active:scale-[0.97] ${
                      activeCategory === cat
                        ? "bg-background text-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground"
                    }`}
                  >
                    {cat}{" "}
                    <span className="font-mono text-xs opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <div ref={gridTopRef} className={`transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedItems.map((item, index) => (
                    <div key={item.id}>
                      {item.type === "image" ? (
                        <GalleryImage item={item} onClick={() => openLightbox(index)} />
                      ) : (
                        <GalleryVideo item={item} onClick={() => openLightbox(index)} />
                      )}
                    </div>
                  ))}
                  {Array.from({ length: ITEMS_PER_PAGE - paginatedItems.length }, (_, i) => (
                    <div key={`ghost-${i}`} className="aspect-[4/3] rounded-xl" aria-hidden="true" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <Images size={24} className="text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">No items in this category yet.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground hover:border-gold/40 data-[touched=true]:border-gold/40 disabled:opacity-30 disabled:pointer-events-none transition duration-200 active:scale-[0.97]"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition duration-200 active:scale-[0.97] ${
                      page === currentPage
                        ? "bg-gold text-white shadow-gold"
                        : "border border-border text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground hover:border-gold/40 data-[touched=true]:border-gold/40"
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground hover:border-gold/40 data-[touched=true]:border-gold/40 disabled:opacity-30 disabled:pointer-events-none transition duration-200 active:scale-[0.97]"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Lightbox
        items={paginatedItems}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </Layout>
  );
};

export default GalleryPage;
