import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  List,
  X,
  HouseLine,
  BookOpenText,
  HandHeart,
  Sparkle,
  MapPin,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO } from "../data/foundationData";

export interface NavbarProps {
  currentPage?: "inicio" | "historias" | "campana";
  onNavigateHomeSection?: (sectionHash?: string) => void;
  onNavigateToStoriesPage?: (initialStoryId?: string) => void;
  onNavigateToCampaignPage?: (initialPillarId?: string) => void;
  onOpenSponsorModal?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  isStoriesPage?: boolean;
  isCampaignPage?: boolean;
  dotColor: string;
  mobileBg: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "El Hogar",
    href: "#mision",
    dotColor: "bg-rose-500",
    mobileBg: "bg-rose-50 text-rose-800 border-rose-200",
    icon: HouseLine,
  },
  {
    label: "Campaña",
    href: "/campana",
    isCampaignPage: true,
    dotColor: "bg-amber-500",
    mobileBg: "bg-amber-50 text-amber-900 border-amber-200",
    icon: Sparkle,
  },
  {
    label: "20 Historias",
    href: "/historias",
    isStoriesPage: true,
    dotColor: "bg-sky-500",
    mobileBg: "bg-sky-50 text-sky-800 border-sky-200",
    icon: BookOpenText,
  },
  {
    label: "Cómo Ayudar",
    href: "#frentes",
    dotColor: "bg-emerald-500",
    mobileBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: HandHeart,
  },
  {
    label: "Galería",
    href: "#galeria",
    dotColor: "bg-indigo-500",
    mobileBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
    icon: Sparkle,
  },
  {
    label: "Visítanos",
    href: "#contacto",
    dotColor: "bg-amber-500",
    mobileBg: "bg-amber-50 text-amber-900 border-amber-200",
    icon: MapPin,
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = "inicio",
  onNavigateHomeSection,
  onNavigateToStoriesPage,
  onNavigateToCampaignPage,
  onOpenSponsorModal,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    if (item.isStoriesPage) {
      onNavigateToStoriesPage?.();
    } else if (item.isCampaignPage) {
      onNavigateToCampaignPage?.();
    } else {
      onNavigateHomeSection?.(item.href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigateHomeSection?.("#inicio");
  };

  const handleSponsorClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onOpenSponsorModal) {
      onOpenSponsorModal();
    } else {
      onNavigateToStoriesPage?.();
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-40 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <nav
          aria-label="Navegación principal"
          className={`min-h-[64px] rounded-full px-3 sm:px-5 py-2 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-[0_12px_36px_rgb(0,0,0,0.08)] ring-2 ring-rose-500/15"
              : "bg-white/90 backdrop-blur-md shadow-[0_8px_24px_rgb(0,0,0,0.05)] ring-1 ring-zinc-900/10"
          }`}
        >
          {/* Brand Identity */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-100 via-amber-50 to-sky-100 ring-2 ring-rose-300/60 p-1 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src="/brand/isotipo-espirales-hd.png"
                alt="Isotipo Fundación Espirales de Vida"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <img
                src="/brand/wordmark-negro-hd.png"
                alt="Fundación Espirales de Vida"
                className="h-7 sm:h-8 w-auto object-contain object-left"
              />
              <span className="text-[11px] font-bold text-rose-600 leading-tight mt-0.5">
                20 niños en Marinilla
              </span>
            </div>
          </a>

          {/* Single-Line Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActiveStories =
                item.isStoriesPage && currentPage === "historias";
              const isActiveCampaign =
                item.isCampaignPage && currentPage === "campana";
              const isActive = isActiveStories || isActiveCampaign;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? "bg-rose-50 text-rose-700 ring-2 ring-rose-200"
                      : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/90"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Actions: Quick Sponsor Button + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSponsorClick}
              className="group inline-flex items-center gap-2 pl-4 pr-2 py-2 min-h-[44px] rounded-full bg-rose-600 text-white text-xs sm:text-sm font-extrabold hover:bg-rose-700 active:scale-95 transition-all shadow-[0_6px_20px_rgba(225,29,72,0.28)] whitespace-nowrap cursor-pointer"
            >
              <span>Apadrinar</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Heart weight="fill" className="w-4 h-4 text-white" />
              </span>
            </button>

            {/* Mobile & Tablet Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="lg:hidden w-11 h-11 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X weight="bold" className="w-5 h-5" />
              ) : (
                <List weight="bold" className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Colorful, Easy-to-Tap Mobile & Tablet Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 rounded-3xl bg-white p-4 shadow-[0_20px_48px_rgb(0,0,0,0.12)] ring-2 ring-zinc-900/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {NAV_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`min-h-[52px] px-4 py-3 rounded-2xl border font-bold text-base flex items-center gap-3 transition-transform active:scale-98 ${item.mobileBg}`}
                    >
                      <IconComponent weight="fill" className="w-5 h-5 shrink-0" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-500 px-2">
                <span className="inline-flex items-center gap-1">
                  <MapPin weight="fill" className="w-3.5 h-3.5 text-rose-500" />
                  <span>Vía El Peñol Km 10 · Marinilla</span>
                </span>
                <span>Tel: {FOUNDATION_INFO.phoneDisplay}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
