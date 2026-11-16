import { Link } from "react-router-dom";
import { profile } from "@/data/profile";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/research", label: "Research" },
  { to: "/publications", label: "Publications" },
  { to: "/projects", label: "Projects" },
  { to: "/cv", label: "CV" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer
      className="py-10 bg-navy-dark dark:bg-[hsl(225_16%_4%)] border-t border-white/5"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2.5 group mb-1">
              <img
                src={profile.avatar}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 ring-2 ring-gold/40"
              />
              <span className="font-display text-base font-semibold text-white">
                Israt Jahan Khan
              </span>
            </Link>
            <p className="font-mono text-xs text-white/60 uppercase tracking-wider pl-0.5">
              Prospective PhD Candidate · Computer Science
            </p>
          </div>
          <p className="font-mono text-xs text-white/50">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>

        <div className="h-px bg-white/5 mb-6" />

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center gap-x-5 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs font-mono text-white/55 hover:text-gold data-[touched=true]:text-gold transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-center font-mono text-xs text-white/40 mt-6">
          Dhaka, Bangladesh · Open to PhD opportunities worldwide
        </p>
      </div>
    </footer>
  );
};

export default Footer;
