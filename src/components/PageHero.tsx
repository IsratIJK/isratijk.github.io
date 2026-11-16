import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
}

const PageHero = ({
  label,
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
  className = "",
  compact = false,
}: PageHeroProps) => {
  return (
    <section
      className={`page-hero-bg relative overflow-hidden ${compact ? "py-14" : "py-20 sm:py-24"} ${className}`}
    >
      <div className="absolute inset-0 bg-dot-grid-sm opacity-40" />
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6">
            <Link
              to="/"
              className="text-xs font-mono text-muted-foreground hover:text-gold data-[touched=true]:text-gold transition-colors"
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-border" />
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="text-xs font-mono text-muted-foreground hover:text-gold data-[touched=true]:text-gold transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-xs font-mono text-gold font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {label && (
          <p className="section-label mb-3">
            {label}
          </p>
        )}

        <div className={`flex flex-col ${actions ? "sm:flex-row sm:items-end sm:justify-between" : ""} gap-4`}>
          <div>
            <h1
              className={`font-display font-bold text-foreground leading-tight ${
                compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
              }`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl text-base sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>

        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
