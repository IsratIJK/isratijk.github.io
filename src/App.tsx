import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

const PageLoader = () => (
  <div className="min-h-dvh flex flex-col">
    <Header />
    <main className="flex-1 pt-16 flex items-center justify-center">
      <div
        role="status"
        aria-label="Loading page"
        className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent opacity-0 animate-[spin_700ms_linear_infinite,fade-in_200ms_var(--ease-out)_200ms_forwards]"
      />
    </main>
  </div>
);

const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PublicationsPage = lazy(() => import("./pages/PublicationsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const CVPage = lazy(() => import("./pages/CVPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
