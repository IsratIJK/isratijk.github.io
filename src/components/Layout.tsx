import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gold-foreground focus:shadow-gold"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className={`flex-1 pt-16 outline-none ${className ?? ""}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
