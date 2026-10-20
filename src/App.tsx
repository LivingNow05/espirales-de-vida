import React, { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { PillarsAndVisionSection } from "./components/PillarsAndVisionSection";
import { SponsorshipStoriesSection } from "./components/SponsorshipStoriesSection";
import { ThreeFrontsSection } from "./components/ThreeFrontsSection";
import { SeoMedellinMarinillaSection } from "./components/SeoMedellinMarinillaSection";
import { Footer } from "./components/Footer";
import { FOUNDATION_INFO, buildWhatsAppLink } from "./data/foundationData";

export const App: React.FC = () => {
  const [quickSponsorStoryId, setQuickSponsorStoryId] = useState<string | null>(
    null
  );

  const handleOpenQuickSponsor = () => {
    const storiesElement = document.getElementById("historias");
    if (storiesElement) {
      storiesElement.scrollIntoView({ behavior: "smooth" });
    }
    setQuickSponsorStoryId("hogar-completo-22-ninos");
  };

  const handleClearExternalStory = () => {
    setQuickSponsorStoryId(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-zinc-900 flex flex-col selection:bg-rose-600/15 selection:text-rose-900">
      {/* Floating Top Navigation */}
      <Navbar onOpenQuickSponsor={handleOpenQuickSponsor} />

      {/* Main Dynamic & Colorful Narrative Flow */}
      <main className="flex-1">
        {/* 1. Hero + Real Impact in Marinilla */}
        <HeroSection onOpenQuickSponsor={handleOpenQuickSponsor} />

        {/* 2. Official Vision, Real Alumna Testimony & 4 Pillars */}
        <PillarsAndVisionSection />

        {/* 3. Interactive Children Stories & Sponsorship */}
        <SponsorshipStoriesSection
          externalSelectedStoryId={quickSponsorStoryId}
          onClearExternalStory={handleClearExternalStory}
        />

        {/* 4. 3 Real Metas + 1-Click Help Checklist + Real Photo Gallery in Marinilla */}
        <ThreeFrontsSection />

        {/* 5. Where We Are, How to Arrive in 3 Steps, NIT & Simple 1-Sentence FAQs */}
        <SeoMedellinMarinillaSection />
      </main>

      {/* 7. Warm Institutional Footer */}
      <Footer />

      {/* Desktop Floating Direct WhatsApp Support Pill */}
      <a
        href={buildWhatsAppLink(
          "Hola Fundación Espirales de Vida, visito su sitio web desde Antioquia y quiero información sobre cómo apadrinar o apoyar a los 22 niños en Marinilla."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Hablar por WhatsApp con ${FOUNDATION_INFO.name} al ${FOUNDATION_INFO.phoneDisplay}`}
        className="hidden lg:inline-flex fixed bottom-5 right-5 z-40 group items-center gap-2.5 pl-4 pr-2 py-2 rounded-full bg-zinc-950/90 hover:bg-rose-600 text-white text-sm font-bold backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.18)] ring-1 ring-white/15 transition-all duration-300 active:scale-95"
      >
        <span>Apadrinar · {FOUNDATION_INFO.phoneDisplay}</span>
        <span className="w-8 h-8 rounded-full bg-rose-600 group-hover:bg-white/20 flex items-center justify-center transition-colors">
          <WhatsappLogo weight="fill" className="w-4 h-4 text-white" />
        </span>
      </a>

      {/* Mobile & Tablet Sticky Bottom Navigation Bar (Native App Feel) */}
      <nav
        aria-label="Navegación rápida móvil y tablet"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t-2 border-zinc-200/90 px-2 py-2 shadow-[0_-8px_28px_rgba(0,0,0,0.08)]"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5">
          <a
            href="#inicio"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-950 border border-amber-200/80 transition-all"
          >
            <span className="text-lg leading-none mb-1">🏠</span>
            <span className="text-[11px] font-extrabold leading-none">Hogar</span>
          </a>

          <a
            href="#historias"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-950 border border-rose-200/80 transition-all"
          >
            <span className="text-lg leading-none mb-1">❤️</span>
            <span className="text-[11px] font-extrabold leading-none">22 Historias</span>
          </a>

          <a
            href="#frentes"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-sky-50 hover:bg-sky-100 active:scale-95 text-sky-950 border border-sky-200/80 transition-all"
          >
            <span className="text-lg leading-none mb-1">🛝</span>
            <span className="text-[11px] font-extrabold leading-none">3 Metas</span>
          </a>

          <a
            href={buildWhatsAppLink(
              "Hola Fundación Espirales de Vida, les escribo desde mi celular para conocer cómo ayudar a los 22 niños en Marinilla."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-sm shadow-emerald-600/25 transition-all"
          >
            <span className="text-lg leading-none mb-1">💬</span>
            <span className="text-[11px] font-extrabold leading-none">WhatsApp</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default App;
