import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HandHeart,
  Sparkle,
  Buildings,
  CheckCircle,
  ArrowUpRight,
  WhatsappLogo,
  ShieldCheck,
  UsersThree,
  Heart,
  Camera,
  X,
  CaretLeft,
  CaretRight,
  Images,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO, buildWhatsAppLink } from "../data/foundationData";

interface RealMetaCard {
  id: string;
  number: string;
  badge: string;
  title: string;
  shortDesc: string;
  specialHighlight?: string;
  primaryPhoto: string;
  primaryCaption: string;
  secondaryPhoto: string;
  secondaryCaption: string;
  progress: number;
  progressLabel: string;
  theme: "rose" | "emerald" | "sky";
  pills: string[];
  whatsappMessage: string;
}

const REAL_METAS: RealMetaCard[] = [
  {
    id: "meta-1-dignidad",
    number: "1",
    badge: "Urgente · Frío de Marinilla",
    title: "Dignidad Diaria: Cobijas, Pijamas y Aseo",
    shortDesc:
      "En Marinilla las noches bajan a 14 °C. Queremos que los 22 niños duerman calienticos, cómodos y tengan su kit de aseo completo cada mes.",
    primaryPhoto: "/images/reales/fraternidad-compartir.jpg",
    primaryCaption: "Compartir en familia en Marinilla",
    secondaryPhoto: "/images/reales/alegria-espontanea.jpg",
    secondaryCaption: "Sonrisas en nuestro hogar",
    progress: 45,
    progressLabel: "10 de 22 kits listos",
    theme: "rose",
    pills: [
      "🛏️ 22 Cobijas y Pijamas",
      "🧼 Kits de Aseo Mensual",
      "🧦 Abrigo para el Frío",
    ],
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apoyar la Meta 1 (Dignidad Diaria: cobijas, pijamas y kits de aseo para los 22 niños en Marinilla).",
  },
  {
    id: "meta-2-parque",
    number: "2",
    badge: "Gran Sueño · Parque Propio",
    title: "Alegría, Útiles y el Sueño del Parque Propio",
    shortDesc:
      "Queremos dotar sus morrales escolares y cumplir el mayor sueño de los 22 niños: renovar y construir un parque infantil seguro dentro de la fundación.",
    specialHighlight:
      "Así luce hoy nuestra zona de juegos en Marinilla. ¡Ayúdanos a renovarla y construir el parque de sus sueños!",
    primaryPhoto: "/images/reales/parque-actual-marinilla.jpg",
    primaryCaption: "Estado actual del parque en Marinilla",
    secondaryPhoto: "/images/reales/parque-juegos-detalle.jpg",
    secondaryCaption: "Detalle de los juegos actuales",
    progress: 32,
    progressLabel: "32% del sueño alcanzado",
    theme: "emerald",
    pills: [
      "🛝 Construir el Parque",
      "🎒 Útiles y Juguetes",
      "⚽ Balones y Arte",
    ],
    whatsappMessage:
      "Hola Fundación Espirales de Vida, me emociona apoyar la Meta 2 (Construir el Parque Infantil y donar útiles y juguetes en Marinilla).",
  },
  {
    id: "meta-3-casa",
    number: "3",
    badge: "Hogar Seguro · Km 10",
    title: "Mejorar Nuestra Casa en Marinilla",
    shortDesc:
      "Nuestra casa campestre en la Vía El Peñol Km 10 necesita pintura alegre, arreglo de techos, camas cómodas y duchas de agua caliente.",
    primaryPhoto: "/images/reales/casa-hogar-instalaciones.jpg",
    primaryCaption: "Nuestra casa en Vía El Peñol Km 10",
    secondaryPhoto: "/images/reales/circulo-integracion-campestre.jpg",
    secondaryCaption: "Zonas verdes de la fundación",
    progress: 38,
    progressLabel: "38% de materiales listos",
    theme: "sky",
    pills: [
      "🏡 Arreglar Techos y Aulas",
      "🎨 Pintura para Cuartos",
      "🚿 Agua Caliente y Camas",
    ],
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apoyar la Meta 3 (Mejorar la Casa Hogar en Vía El Peñol Km 10, Marinilla) con materiales o aporte.",
  },
];

interface QuickHelpOption {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  colorClass: string;
  activeClass: string;
}

const QUICK_HELP_OPTIONS: QuickHelpOption[] = [
  {
    id: "cobijas-pijamas",
    emoji: "🛏️",
    title: "Cobijas y Pijamas",
    subtitle: "Abrigo para los 22 niños",
    colorClass: "border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-950",
    activeClass: "border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/20",
  },
  {
    id: "kits-aseo",
    emoji: "🧼",
    title: "Kits de Aseo",
    subtitle: "Jabón, cepillos y champú",
    colorClass: "border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-950",
    activeClass: "border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/20",
  },
  {
    id: "parque-propio",
    emoji: "🛝",
    title: "Construir el Parque",
    subtitle: "El gran sueño en Marinilla",
    colorClass: "border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-950",
    activeClass: "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20",
  },
  {
    id: "utiles-juguetes",
    emoji: "🎒",
    title: "Útiles y Juguetes",
    subtitle: "Cuadernos, colores y balones",
    colorClass: "border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-purple-950",
    activeClass: "border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-600/20",
  },
  {
    id: "pintura-casa",
    emoji: "🏡",
    title: "Pintura y Casa",
    subtitle: "Arreglar techos y cuartos",
    colorClass: "border-sky-200 bg-sky-50/50 hover:bg-sky-50 text-sky-950",
    activeClass: "border-sky-600 bg-sky-600 text-white shadow-md shadow-sky-600/20",
  },
  {
    id: "empresa-rse",
    emoji: "🏢",
    title: "Empresa Aliada RSE",
    subtitle: "Con Certificado NIT 900150558-5",
    colorClass: "border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-950",
    activeClass: "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/20",
  },
];

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  tagColor: string;
}

const REAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-1",
    src: "/images/reales/comunidad-equipo-hogar.jpg",
    title: "Nuestra Gran Familia en Marinilla",
    caption: "Niños, educadores y voluntarios unidos en la casa hogar de Vía El Peñol Km 10.",
    tag: "🏠 Nuestro Hogar",
    tagColor: "bg-rose-500 text-white",
  },
  {
    id: "gal-2",
    src: "/images/reales/sonrisa-confianza.jpg",
    title: "Miradas que Volvieron a Brillar",
    caption: "Cuando un niño se siente seguro y amado, recupera la confianza en sí mismo.",
    tag: "❤️ Alegría",
    tagColor: "bg-amber-500 text-white",
  },
  {
    id: "gal-3",
    src: "/images/reales/arte-pintacaritas.jpg",
    title: "Tardes de Color y Pintacaritas",
    caption: "El arte y el juego sanan el corazón y llenan de risas cada rincón de la fundación.",
    tag: "🎨 Arte y Juego",
    tagColor: "bg-purple-600 text-white",
  },
  {
    id: "gal-4",
    src: "/images/reales/taller-pedagogico-arbol.jpg",
    title: "El Árbol de Nuestros Sueños",
    caption: "Talleres creativos donde cada niño escribe y construye su proyecto de vida.",
    tag: "🌱 Educación",
    tagColor: "bg-emerald-600 text-white",
  },
  {
    id: "gal-5",
    src: "/images/reales/trabajo-en-equipo.jpg",
    title: "Creciendo como Hermanos",
    caption: "Aprendiendo a trabajar en equipo, respetarse y cuidarse unos a otros.",
    tag: "🤝 Fraternidad",
    tagColor: "bg-sky-600 text-white",
  },
  {
    id: "gal-6",
    src: "/images/reales/recreacion-y-deporte.jpg",
    title: "Deporte al Aire Libre",
    caption: "Juegos y movimiento en las montañas verdes de Marinilla, Antioquia.",
    tag: "⚽ Recreación",
    tagColor: "bg-emerald-600 text-white",
  },
  {
    id: "gal-7",
    src: "/images/reales/tarde-de-helados.jpg",
    title: "Celebrando la Infancia",
    caption: "Momentos dulces y felices que todo niño merece disfrutar en su hogar.",
    tag: "🍦 Sonrisas",
    tagColor: "bg-rose-500 text-white",
  },
  {
    id: "gal-8",
    src: "/images/reales/circulo-de-la-palabra.jpg",
    title: "Círculo de la Palabra y Escucha",
    caption: "Acompañamiento psicológico y humano para sanar la historia de cada niño.",
    tag: "✨ Escucha",
    tagColor: "bg-indigo-600 text-white",
  },
];

export const ThreeFrontsSection: React.FC = () => {
  const [activePhotoIndexByMeta, setActivePhotoIndexByMeta] = useState<Record<string, 0 | 1>>({
    "meta-1-dignidad": 0,
    "meta-2-parque": 0,
    "meta-3-casa": 0,
  });

  const [selectedHelpIds, setSelectedHelpIds] = useState<string[]>([
    "cobijas-pijamas",
    "parque-propio",
  ]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const toggleHelpOption = (id: string) => {
    setSelectedHelpIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedHelpTitles = QUICK_HELP_OPTIONS.filter((opt) =>
    selectedHelpIds.includes(opt.id)
  ).map((opt) => `${opt.emoji} ${opt.title}`);

  const quickWhatsAppMessage =
    selectedHelpTitles.length > 0
      ? `Hola Fundación Espirales de Vida, quiero ayudar hoy a los 22 niños en Marinilla con:\n- ${selectedHelpTitles.join(
          "\n- "
        )}\n¿Cómo coordinamos en el ${FOUNDATION_INFO.phoneDisplay}?`
      : `Hola Fundación Espirales de Vida, quiero apoyar las 3 Metas de los 22 niños en Marinilla.`;

  const getThemeClasses = (theme: RealMetaCard["theme"]) => {
    if (theme === "rose") {
      return {
        outerBg: "bg-gradient-to-b from-rose-500/10 to-rose-500/5 ring-rose-300/70",
        numberCircle: "bg-rose-600 text-white shadow-lg shadow-rose-600/30",
        badge: "bg-rose-100 text-rose-800 border-rose-200",
        progressBg: "bg-rose-600",
        progressText: "text-rose-700",
        pill: "bg-rose-50 text-rose-900 border-rose-200",
        button: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
      };
    }
    if (theme === "emerald") {
      return {
        outerBg: "bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 ring-emerald-300/80",
        numberCircle: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30",
        badge: "bg-emerald-100 text-emerald-900 border-emerald-200",
        progressBg: "bg-emerald-600",
        progressText: "text-emerald-700",
        pill: "bg-emerald-50 text-emerald-900 border-emerald-200",
        button: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
      };
    }
    return {
      outerBg: "bg-gradient-to-b from-sky-500/12 to-sky-500/5 ring-sky-300/80",
      numberCircle: "bg-sky-600 text-white shadow-lg shadow-sky-600/30",
      badge: "bg-sky-100 text-sky-900 border-sky-200",
      progressBg: "bg-sky-600",
      progressText: "text-sky-700",
      pill: "bg-sky-50 text-sky-900 border-sky-200",
      button: "bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20",
    };
  };

  return (
    <section
      id="frentes"
      className="relative py-16 sm:py-24 bg-[#FFFDF9] border-t border-amber-200/60 overflow-hidden"
    >
      {/* Decorative colorful background blobs */}
      <div className="pointer-events-none absolute top-12 -left-24 w-80 h-80 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-96 -right-24 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-1/3 w-96 h-96 rounded-full bg-sky-200/25 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple, Kid-Friendly & Colorful Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 mb-4 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-800">
              3 Metas de Transformación · Marinilla, Antioquia
            </span>
          </div>

          <h2 className="font-logo text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12] mb-4">
            3 Metas Claras para Ayudar a los{" "}
            <span className="text-rose-600 underline decoration-amber-400 decoration-wavy underline-offset-4">
              22 Niños
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed">
            Conoce nuestra casa en <strong>Marinilla (Vía El Peñol Km 10)</strong> y elige en cuál de nuestras 3 metas quieres poner tu granito de arena hoy.
          </p>
        </div>

        {/* 3 Colorful Meta Cards (Rose, Emerald, Sky Blue) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {REAL_METAS.map((meta, index) => {
            const styles = getThemeClasses(meta.theme);
            const activePhotoIdx = activePhotoIndexByMeta[meta.id] ?? 0;
            const currentPhoto =
              activePhotoIdx === 0 ? meta.primaryPhoto : meta.secondaryPhoto;
            const currentCaption =
              activePhotoIdx === 0 ? meta.primaryCaption : meta.secondaryCaption;

            return (
              <motion.article
                key={meta.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`rounded-[2rem] p-2 ${styles.outerBg} ring-2 flex flex-col h-full shadow-lg`}
              >
                <div className="rounded-[calc(2rem-0.4rem)] bg-white p-5 sm:p-6 flex flex-col h-full">
                  {/* Top Bar: Big Number + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-12 h-12 rounded-2xl font-logo text-2xl font-extrabold flex items-center justify-center shrink-0 ${styles.numberCircle}`}
                      >
                        {meta.number}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
                      >
                        {meta.badge}
                      </span>
                    </div>
                  </div>

                  {/* Real Photo Container with 2-Photo Switcher */}
                  <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200/80 group">
                    <img
                      src={currentPhoto}
                      alt={`${meta.title} - ${currentCaption}`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/15 to-transparent" />

                    {/* Photo Switcher Pills (Foto Real 1 / Foto Real 2) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md p-1 rounded-full border border-white/20">
                      <button
                        type="button"
                        onClick={() =>
                          setActivePhotoIndexByMeta((prev) => ({
                            ...prev,
                            [meta.id]: 0,
                          }))
                        }
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          activePhotoIdx === 0
                            ? "bg-white text-zinc-900 shadow-xs"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        📷 Foto 1
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActivePhotoIndexByMeta((prev) => ({
                            ...prev,
                            [meta.id]: 1,
                          }))
                        }
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          activePhotoIdx === 1
                            ? "bg-white text-zinc-900 shadow-xs"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        📷 Foto 2
                      </button>
                    </div>

                    {/* Caption & Progress Bar Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[11px] font-medium text-white/95 mb-1.5 flex items-center gap-1.5 drop-shadow-xs">
                        <Camera weight="fill" className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span className="truncate">{currentCaption}</span>
                      </p>
                      <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-bold text-zinc-800 mb-1">
                          <span>Meta actual: {meta.progressLabel}</span>
                          <span className={`font-mono ${styles.progressText}`}>
                            {meta.progress}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-zinc-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${styles.progressBg} transition-all duration-700`}
                            style={{ width: `${meta.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title & Easy Description */}
                  <h3 className="font-logo text-xl sm:text-2xl font-bold text-zinc-900 leading-snug mb-2">
                    {meta.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    {meta.shortDesc}
                  </p>

                  {/* Special Highlight for Meta 2 (Real Playground Note) */}
                  {meta.specialHighlight && (
                    <div className="rounded-2xl bg-amber-50 border-2 border-amber-300/90 p-3.5 mb-4 shadow-xs">
                      <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug">
                        🛝 {meta.specialHighlight}
                      </p>
                    </div>
                  )}

                  {/* 3 Short Visual Pills of What is Needed */}
                  <div className="mb-5 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
                      ¿Qué necesitamos aquí?
                    </p>
                    <div className="flex flex-col gap-2">
                      {meta.pills.map((pill) => (
                        <div
                          key={pill}
                          className={`px-3.5 py-2.5 rounded-xl border text-sm font-bold flex items-center justify-between ${styles.pill}`}
                        >
                          <span>{pill}</span>
                          <CheckCircle weight="fill" className="w-4 h-4 opacity-75 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct 1-Tap Action Button */}
                  <a
                    href={buildWhatsAppLink(meta.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto group inline-flex items-center justify-between w-full rounded-full pl-5 pr-2 py-2.5 text-sm sm:text-base font-bold transition-all shadow-md active:scale-95 ${styles.button}`}
                  >
                    <span>Apoyar Meta {meta.number}</span>
                    <span className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                      <ArrowUpRight weight="bold" className="w-5 h-5 text-white" />
                    </span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Super Simple 1-Click Checklist: "¿Con qué quieres ayudar hoy?" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.25rem] p-2 bg-gradient-to-r from-rose-500/15 via-amber-500/15 to-emerald-500/15 ring-2 ring-rose-200/80 mb-20 shadow-lg"
        >
          <div className="rounded-[calc(2.25rem-0.5rem)] bg-white p-6 sm:p-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
                ✨ Muy Fácil · Toca y Elige en 1 Clic
              </span>
              <h3 className="font-logo text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-2">
                ¿Con qué quieres ayudar hoy?
              </h3>
              <p className="text-sm sm:text-base text-zinc-600">
                Toca una o varias tarjetas y envíanos tu selección directo al WhatsApp{" "}
                <strong className="text-rose-600">{FOUNDATION_INFO.phoneDisplay}</strong>.
              </p>
            </div>

            {/* Big Tap Cards Grid for Phones & Tablets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
              {QUICK_HELP_OPTIONS.map((option) => {
                const isSelected = selectedHelpIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleHelpOption(option.id)}
                    aria-pressed={isSelected}
                    className={`rounded-2xl p-4 border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[128px] active:scale-95 ${
                      isSelected ? option.activeClass : option.colorClass
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-2xl sm:text-3xl">{option.emoji}</span>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected
                            ? "bg-white text-zinc-900"
                            : "bg-white/80 text-zinc-400 border border-zinc-200"
                        }`}
                      >
                        {isSelected ? "✓" : "+"}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base leading-tight mb-0.5">
                        {option.title}
                      </p>
                      <p
                        className={`text-[11px] leading-snug ${
                          isSelected ? "text-white/90" : "opacity-75"
                        }`}
                      >
                        {option.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Instant Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 p-4 sm:p-5">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Tu selección solidaria ({selectedHelpIds.length} elegidas):
                </p>
                <p className="text-sm sm:text-base font-bold text-zinc-900 mt-0.5">
                  {selectedHelpTitles.length > 0
                    ? selectedHelpTitles.join(" · ")
                    : "Toca arriba lo que quieras donar o apadrinar"}
                </p>
              </div>

              <a
                href={buildWhatsAppLink(quickWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
              >
                <WhatsappLogo weight="fill" className="w-5 h-5" />
                <span>Enviar mi ayuda por WhatsApp</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Vibrant & Touch-Friendly Photo Gallery: Galería de Fotos en Marinilla */}
        <div id="galeria" className="mb-20 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
                <Images weight="fill" className="w-4 h-4 text-emerald-700" />
                <span>Álbum Fotográfico · Marinilla, Antioquia</span>
              </div>
              <h3 className="font-logo text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                Galería de Fotos en Marinilla
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 mt-1">
                Desliza en tu celular o toca cualquier foto para ver en grande el día a día de nuestros 22 niños.
              </p>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-full self-start sm:self-auto">
              👆 Desliza o toca para ampliar (8 fotos)
            </span>
          </div>

          {/* Mobile/Tablet Swipeable Carousel + Desktop 4-Column Interactive Grid */}
          <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
            {REAL_GALLERY_PHOTOS.map((photo, idx) => (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group relative shrink-0 w-[78vw] sm:w-[300px] lg:w-auto snap-center rounded-3xl overflow-hidden bg-zinc-900 border-2 border-white shadow-md hover:shadow-xl transition-all text-left cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose-500/40"
              >
                <div className="relative h-64 sm:h-60 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={`${photo.title} - Fundación Espirales de Vida Marinilla`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${photo.tagColor}`}
                  >
                    {photo.tag}
                  </span>

                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white backdrop-blur-xs flex items-center justify-center text-xs font-bold opacity-90 group-hover:bg-rose-600 transition-colors">
                    🔍
                  </span>

                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <h4 className="font-logo text-lg font-bold text-white leading-snug mb-1">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 3 Simple & Colorful Ways to Partner (Padrinos, Empresas RSE, Donar en Especie) */}
        <div className="rounded-[2rem] bg-white border-2 border-zinc-200/80 p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-logo text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">
              3 Formas Súper Fáciles de Unirte
            </h3>
            <p className="text-sm sm:text-base text-zinc-600">
              “Un niño que se siente respaldado por una comunidad es un niño que crece invencible.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Padrinos */}
            <div className="rounded-2xl bg-rose-50/70 border-2 border-rose-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold">
                    ❤️ Personas y Familias
                  </span>
                  <Heart weight="fill" className="w-6 h-6 text-rose-600" />
                </div>
                <h4 className="font-logo text-xl font-bold text-zinc-900 mb-2">
                  Ser Padrino o Madrina
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                  Acompaña a uno de los 22 niños con tu cariño, cartas, visitas en Marinilla y un aporte mensual desde <strong>$120.000 COP</strong>.
                </p>
              </div>
              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, quiero ser Padrino o Madrina de Corazón de los niños en Marinilla."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Quiero Apadrinar</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2: Empresas RSE */}
            <div className="rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                    🏢 Empresas · NIT 900150558-5
                  </span>
                  <ShieldCheck weight="fill" className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-logo text-xl font-bold text-zinc-900 mb-2">
                  Alianza Empresarial RSE
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                  Patrocina el Parque Infantil o apadrina el hogar con <strong>Certificado de Donación Tributaria (NIT 900150558-5)</strong> y voluntariado en Marinilla.
                </p>
              </div>
              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, escribo en nombre de una empresa para una Alianza RSE con certificado tributario NIT 900150558-5."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Vincular mi Empresa</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: Donación en Especie */}
            <div className="rounded-2xl bg-sky-50/70 border-2 border-sky-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-bold">
                    🎁 Amigos y Colegios
                  </span>
                  <UsersThree weight="fill" className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-logo text-xl font-bold text-zinc-900 mb-2">
                  Donar Cosas Físicas
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                  Trae cobijas, pijamas, útiles escolares, juguetes o pintura directamente a nuestra casa en Marinilla o coordina desde Medellín.
                </p>
              </div>
              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, quiero donar cobijas, pijamas, útiles, juguetes o materiales para los 22 niños en Marinilla."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Coordinar Entrega</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Real Photo Gallery */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            >
              <div className="relative h-[55vh] sm:h-[68vh] bg-black flex items-center justify-center">
                <img
                  src={REAL_GALLERY_PHOTOS[lightboxIndex].src}
                  alt={REAL_GALLERY_PHOTOS[lightboxIndex].title}
                  className="max-h-full max-w-full object-contain"
                />

                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Cerrar foto"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X weight="bold" className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + REAL_GALLERY_PHOTOS.length) %
                        REAL_GALLERY_PHOTOS.length
                    )
                  }
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <CaretLeft weight="bold" className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % REAL_GALLERY_PHOTOS.length)
                  }
                  aria-label="Siguiente foto"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <CaretRight weight="bold" className="w-6 h-6" />
                </button>
              </div>

              <div className="p-5 sm:p-6 bg-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-1.5 ${REAL_GALLERY_PHOTOS[lightboxIndex].tagColor}`}
                  >
                    {REAL_GALLERY_PHOTOS[lightboxIndex].tag} · Foto {lightboxIndex + 1} de{" "}
                    {REAL_GALLERY_PHOTOS.length}
                  </span>
                  <h4 className="font-logo text-xl font-bold">
                    {REAL_GALLERY_PHOTOS[lightboxIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                    {REAL_GALLERY_PHOTOS[lightboxIndex].caption}
                  </p>
                </div>

                <a
                  href={buildWhatsAppLink(
                    `Hola Fundación Espirales de Vida, vi la galería de fotos en Marinilla (${REAL_GALLERY_PHOTOS[lightboxIndex].title}) y quiero apoyar a los 22 niños.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors"
                >
                  <WhatsappLogo weight="fill" className="w-4 h-4" />
                  <span>Apoyar este hogar</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ThreeFrontsSection;
