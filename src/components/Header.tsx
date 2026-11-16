import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/education", label: "Education" },
  { to: "/experience", label: "Experience" },
  { to: "/research", label: "Research" },
  { to: "/publications", label: "Publications" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/cv", label: "CV" },
  { to: "/contact", label: "Contact" },
];

const routePreloads: Record<string, () => Promise<unknown>> = {
  "/about": () => import("../pages/AboutPage"),
  "/research": () => import("../pages/ResearchPage"),
  "/publications": () => import("../pages/PublicationsPage"),
  "/projects": () => import("../pages/ProjectsPage"),
  "/experience": () => import("../pages/ExperiencePage"),
  "/education": () => import("../pages/EducationPage"),
  "/gallery": () => import("../pages/GalleryPage"),
  "/cv": () => import("../pages/CVPage"),
  "/contact": () => import("../pages/ContactPage"),
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsClosing(false);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsClosing(true);
  };

  const isActive = (to: string) => location.pathname === to;
  const isHome = location.pathname === "/";
  const transparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border shadow-soft py-3${
        transparent ? " xl:bg-transparent xl:border-transparent xl:shadow-none xl:py-5" : ""
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${profile.name} – Home`}>
          <img
            src={profile.avatar}
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-full object-cover flex-shrink-0 ring-2 ring-gold/40"
          />
          <span className="font-display text-base font-semibold text-foreground hidden sm:block">
            Israt Jahan Khan
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onMouseEnter={() => routePreloads[link.to]?.()}
              className={`relative px-3.5 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-lg ${
                isActive(link.to)
                  ? "text-gold bg-gold/8"
                  : "text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground hover:bg-muted/60 data-[touched=true]:bg-muted/60"
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-gold/50 rounded-full" />
              )}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contact"
              className="ml-1 px-4 py-1.5 rounded-full bg-gold text-white text-sm font-medium hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition-all duration-200 shadow-gold"
            >
              Get in Touch
            </Link>
          </div>
        </nav>

        <div className="xl:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-foreground rounded-lg hover:bg-muted data-[touched=true]:bg-muted transition-colors"
            onClick={() => isMobileMenuOpen ? closeMobileMenu() : setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {(isMobileMenuOpen || isClosing) && (
        <>
          <div
            className="xl:hidden fixed inset-0 z-[-1]"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <nav
            className={`xl:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-page ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
            aria-label="Mobile navigation"
            onAnimationEnd={() => {
              if (isClosing) {
                setIsMobileMenuOpen(false);
                setIsClosing(false);
              }
            }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onMouseEnter={() => routePreloads[link.to]?.()}
                  className={`px-4 py-3 rounded-xl font-body font-medium transition-colors text-sm ${
                    isActive(link.to)
                      ? "text-gold bg-gold/8 font-semibold"
                      : "text-muted-foreground hover:text-foreground data-[touched=true]:text-foreground hover:bg-muted/50 data-[touched=true]:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 mx-0 py-2.5 rounded-full bg-gold text-white text-sm font-medium text-center hover:bg-gold/90 data-[touched=true]:bg-gold/90 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
