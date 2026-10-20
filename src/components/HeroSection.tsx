import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkle,
  HandHeart,
  MapPin,
  Camera,
  ShieldCheck,
  Smiley,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO } from "../data/foundationData";

export interface HeroSectionProps {
  onOpenQuickSponsor?: () => void;
}

interface RealHeroPhoto {
  src: string;
  title: string;
  place: string;
  tagColor: string;
}

const REAL_HERO_PHOTOS: RealHeroPhoto[] = [
  {
    src: "/images/reales/comunidad-equipo-hogar.jpg",
    title: "Nuestra gran familia reunida en la casa hogar",
    place: "Marinilla, Antioquia",
    tagColor: "bg-rose-600 text-white",
  },
  {
    src: "/images/reales/sonrisa-confianza.jpg",
    title: "Manos que acompañan con cariño y confianza",
    place: "Apoyo y Afecto",
    tagColor: "bg-sky-600 text-white",
  },
  {
    src: "/images/reales/alegria-espontanea.jpg",
    title: "Tardes de risas y helados entre amigos",
    place: "Infancia Feliz",
    tagColor: "bg-amber-500 text-zinc-950",
  },
  {
    src: "/images/reales/casa-hogar-instalaciones.jpg",
    title: "Nuestra casa campestre en Vía El Peñol Km 10",
    place: "Hogar Seguro",
    tagColor: "bg-emerald-600 text-white",
  },
];

const COLORFUL_IMPACT_CARDS = [
  {
    metric: "22 Niños",
    label: "Viven seguros y felices en nuestro hogar",
    cardStyle: "bg-rose-50 border-rose-200 text-rose-900",
    badgeStyle: "bg-rose-600 text-white",
    icon: HandHeart,
  },
  {
    metric: "4 Pilares",
    label: "Techo seguro, comida rica, amor y estudio",
    cardStyle: "bg-sky-50 border-sky-200 text-sky-900",
    badgeStyle: "bg-sky-600 text-white",
    icon: ShieldCheck,
  },
  {
    metric: "3 Metas",
    label: "Abrigo, útiles y construir nuestro Parque Infantil",
    cardStyle: "bg-emerald-50 border-emerald-200 text-emerald-900",
    badgeStyle: "bg-emerald-600 text-white",
    icon: Sparkle,
  },
  {
    metric: "Marinilla",
    label: "Vía El Peñol Km 10 · A 45 min de Medellín",
    cardStyle: "bg-amber-50 border-amber-200 text-amber-950",
    badgeStyle: "bg-amber-500 text-zinc-950",
    icon: MapPin,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuickSponsor }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handleSponsorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOpenQuickSponsor) {
      e.preventDefault();
      onOpenQuickSponsor();
    }
  };

  const activePhoto = REAL_HERO_PHOTOS[activePhotoIndex];

  return (
    <section
      id="inicio"
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 bg-gradient-to-b from-rose-50/50 via-[#FFFDF9] to-sky-50/30 overflow-hidden"
    >
      {/* Joyful colorful background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 w-96 h-96 rounded-full bg-rose-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-28 w-96 h-96 rounded-full bg-amber-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-sky-300/20 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Simple, joyful, easy-to-read message */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Official Logo Typography Lockup + Friendly Colorful Pill Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border-2 border-rose-200 shadow-xs">
                <img
                  src="/brand/isotipo-espirales-hd.png"
                  alt="Isotipo Espirales de Vida"
                  className="w-8 h-8 object-contain shrink-0"
                />
                <img
                  src="/brand/wordmark-negro-hd.png"
                  alt="Fundación Espirales de Vida"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold shadow-xs font-logo">
                <Smiley weight="fill" className="w-5 h-5 text-rose-600 shrink-0" />
                <span>22 niños en Marinilla, Antioquia</span>
              </div>
            </div>

            {/* Big, Playful & Clear Headline in Logo Typography */}
            <h1 className="font-logo text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-zinc-950 leading-[1.12] mb-5">
              Un refugio lleno de color donde{" "}
              <span className="text-rose-600 underline decoration-amber-400 decoration-4 underline-offset-4">
                22 niños
              </span>{" "}
              construyen sus sueños
            </h1>

            {/* Max 2 short, simple sentences */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-700 font-medium leading-relaxed mb-8 max-w-[48ch]">
              En nuestra casa campestre de Marinilla cuidamos, educamos y abrazamos a 22 niños y adolescentes todos los días. ¡Tú puedes ser el padrino o madrina que impulse su historia!
            </p>

            {/* Big Touch-Friendly Buttons for Mobile & Tablet */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#historias"
                onClick={handleSponsorClick}
                className="group min-h-[54px] inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-rose-600 text-white text-base sm:text-lg font-extrabold hover:bg-rose-700 active:scale-95 transition-all shadow-[0_10px_28px_rgba(225,29,72,0.3)]"
              >
                <Heart weight="fill" className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Ver las 22 Historias</span>
              </a>

              <a
                href="#frentes"
                className="min-h-[54px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-sky-50 border-2 border-sky-200 text-sky-900 hover:bg-sky-100 text-base sm:text-lg font-extrabold active:scale-95 transition-all"
              >
                <Sparkle weight="fill" className="w-5 h-5 text-sky-600 shrink-0" />
                <span>¿Cómo Puedo Ayudar?</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Real Photo Showcase (100% Real Photos!) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl p-2 sm:p-3 bg-white border-2 border-rose-200 shadow-[0_16px_40px_rgba(225,29,72,0.1)]">
              {/* Main Active Real Photograph */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto.src}
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent" />

                {/* Top Real Photo Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-zinc-900 text-xs sm:text-sm font-extrabold shadow-sm">
                    <Camera weight="fill" className="w-4 h-4 text-rose-600" />
                    <span>{activePhoto.place}</span>
                  </span>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold shadow-sm ${activePhoto.tagColor}`}
                  >
                    {FOUNDATION_INFO.totalChildren} Niños
                  </span>
                </div>

                {/* Bottom Simple Photo Title */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-md">
                  <img
                    src="/brand/isotipo-espirales-hd.png"
                    alt="Logo Espirales de Vida"
                    className="w-9 h-9 object-contain shrink-0"
                  />
                  <p className="text-sm sm:text-base font-extrabold text-zinc-900 leading-snug">
                    {activePhoto.title}
                  </p>
                </div>
              </div>

              {/* 4 Real Photo Thumbnails Selector (Easy to tap on mobile & tablet) */}
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mt-2.5">
                {REAL_HERO_PHOTOS.map((photo, index) => {
                  const isSelected = index === activePhotoIndex;
                  return (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setActivePhotoIndex(index)}
                      aria-label={`Ver fotografía: ${photo.title}`}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all ${
                        isSelected
                          ? "ring-3 ring-rose-600 scale-[1.02] shadow-md"
                          : "opacity-75 hover:opacity-100 ring-1 ring-zinc-200"
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Colorful, Kid-Friendly Summary Cards Below Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-10 sm:mt-12">
          {COLORFUL_IMPACT_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.metric}
                className={`rounded-3xl p-5 border-2 flex items-center gap-4 shadow-xs transition-transform hover:-translate-y-0.5 ${card.cardStyle}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${card.badgeStyle}`}
                >
                  <IconComponent weight="fill" className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-logo text-2xl sm:text-3xl font-extrabold leading-tight">
                    {card.metric}
                  </p>
                  <p className="text-sm font-semibold opacity-90 leading-snug mt-0.5">
                    {card.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
