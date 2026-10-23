import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
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
  Sparkle,
  PhoneCall,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO, buildWhatsAppLink } from "../data/foundationData";
import {
  INITIAL_PILLAR_PROGRESS,
  PillarProgressData,
  fetchLiveCampaignProgress,
} from "../utils/googleSheetLiveProgress";

export interface ThreeFrontsSectionProps {
  onNavigateToStoriesPage?: () => void;
}

interface OfficialFrontCard {
  id: string;
  number: string;
  badge: string;
  title: string;
  description: string;
  primaryPhoto: string;
  primaryCaption: string;
  secondaryPhoto: string;
  secondaryCaption: string;
  theme: "rose" | "emerald" | "sky";
  pills: string[];
  whatsappMessage: string;
}

/**
 * Los 3 Frentes Fundamentales exactamente como están escritos en el documento oficial.
 * Cero porcentajes inventados y cero detalles ajenos al texto pactado.
 */
const OFFICIAL_THREE_FRONTS: OfficialFrontCard[] = [
  {
    id: "frente-1-dignidad",
    number: "1",
    badge: "Primer Frente Fundamental",
    title: "La Dignidad Diaria",
    description:
      "Necesitamos gestionar utensilios de aseo personal, cobijas abrigadoras y pijamas cómodas para que cada niño tenga noches de descanso cálidas y dignas.",
    primaryPhoto: "/images/reales/fraternidad-compartir.jpg",
    primaryCaption: "Compartir en familia en Marinilla",
    secondaryPhoto: "/images/reales/alegria-espontanea.jpg",
    secondaryCaption: "Bienestar diario en nuestro hogar",
    theme: "rose",
    pills: [
      "🧼 Utensilios de aseo personal",
      "🛏️ Cobijas abrigadoras",
      "👕 Pijamas cómodas y juegos de sábanas",
    ],
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apoyar el Frente 1 (Dignidad Diaria: utensilios de aseo personal, cobijas abrigadoras y pijamas cómodas para los 22 niños en Marinilla).",
  },
  {
    id: "frente-2-desarrollo",
    number: "2",
    badge: "Segundo Frente Fundamental",
    title: "El Desarrollo y la Alegría",
    description:
      "Buscamos dotarlos de útiles escolares para su formación y juguetes que alimenten su infancia. Además, tenemos un sueño grande: construir un espacio de juego propio dentro de la fundación, un parque donde puedan reír y ser niños sin preocupaciones.",
    primaryPhoto: "/images/reales/parque-actual-marinilla.jpg",
    primaryCaption: "Zona de juegos en Marinilla",
    secondaryPhoto: "/images/reales/parque-juegos-detalle.jpg",
    secondaryCaption: "Espacio recreativo de la fundación",
    theme: "emerald",
    pills: [
      "🎒 Kits escolares para su formación",
      "🧸 Juguetes, libros y balones",
      "🛝 Sueño grande: construir su parque propio",
    ],
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apoyar el Frente 2 (Desarrollo y Alegría: útiles escolares, juguetes y el sueño del espacio de juego propio en Marinilla).",
  },
  {
    id: "frente-3-infraestructura",
    number: "3",
    badge: "Tercer Frente Fundamental",
    title: "La Infraestructura",
    description:
      "Queremos intervenir y mejorar las instalaciones del establecimiento, garantizando espacios más seguros, cómodos y funcionales para los 22 niños, niñas y adolescentes.",
    primaryPhoto: "/images/reales/casa-hogar-instalaciones.jpg",
    primaryCaption: "Instalaciones en Vía El Peñol Km 10",
    secondaryPhoto: "/images/reales/circulo-integracion-campestre.jpg",
    secondaryCaption: "Entorno de la fundación en Marinilla",
    theme: "sky",
    pills: [
      "🎨 Pintura y limpieza de paredes",
      "🚪 Puertas de madera, estantería y biblioteca",
      "🤝 Mano de obra y trabajo voluntario",
    ],
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apoyar el Frente 3 (Infraestructura: intervenir y mejorar las instalaciones de la sede en Marinilla).",
  },
];

interface CampaignNeedPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  headerBg: string;
  progressBarFill: string;
  progressTrackBg: string;
  cardBorder: string;
  cardBg: string;
  badgeText: string;
  items: { qty?: string; label: string }[];
}

/**
 * Los 6 Pilares de Apoyo y Lista Oficial de Necesidades de la campaña:
 * "JUNTOS POR UNA INFANCIA CON AMOR" (extraídos fielmente del afiche oficial).
 */
const OFFICIAL_CAMPAIGN_6_PILLARS: CampaignNeedPillar[] = [
  {
    id: "pilar-1-kits-escolares",
    number: "1",
    title: "KITS ESCOLARES",
    subtitle: "Cada kit contiene los siguientes elementos:",
    headerBg: "bg-sky-700 text-white",
    progressBarFill: "bg-gradient-to-r from-sky-500 to-sky-700",
    progressTrackBg: "bg-sky-100",
    cardBorder: "border-sky-300",
    cardBg: "bg-sky-50/50",
    badgeText: "text-sky-800",
    items: [
      { label: "Morral escolar resistente" },
      { label: "Cuadernos rayados" },
      { label: "Cuadernos cuadriculados" },
      { label: "Borrador de nata y sacapuntas" },
      { label: "Lápiz negro y lápiz rojo" },
      { label: "Lapicero negro y lapicero rojo" },
      { label: "Regla graduada y caja de colores" },
      { label: "Cartuchera y block de hojas" },
      { label: "Colbón y tijeras punta roma" },
    ],
  },
  {
    id: "pilar-2-kits-aseo",
    number: "2",
    title: "KITS DE ASEO PERSONAL",
    subtitle: "Insumos de higiene personal y femenina:",
    headerBg: "bg-emerald-700 text-white",
    progressBarFill: "bg-gradient-to-r from-emerald-500 to-emerald-700",
    progressTrackBg: "bg-emerald-100",
    cardBorder: "border-emerald-300",
    cardBg: "bg-emerald-50/50",
    badgeText: "text-emerald-800",
    items: [
      { label: "Cepillos de dientes" },
      { label: "Cremas dentales" },
      { label: "Talcos para pies" },
      { label: "Sedas dentales" },
      { label: "Desodorantes" },
      { label: "Paquetes de toallas y protectores" },
    ],
  },
  {
    id: "pilar-3-personal-apoyo",
    number: "3",
    title: "PERSONAL DE APOYO",
    subtitle: "Voluntariado y profesionales aliados:",
    headerBg: "bg-amber-700 text-white",
    progressBarFill: "bg-gradient-to-r from-amber-500 to-amber-700",
    progressTrackBg: "bg-amber-100",
    cardBorder: "border-amber-300",
    cardBg: "bg-amber-50/50",
    badgeText: "text-amber-800",
    items: [
      { label: "Médico General" },
      { label: "Odontología" },
      { label: "Psicología" },
      { label: "Oftalmología" },
      { label: "Peluquería y Estética" },
    ],
  },
  {
    id: "pilar-4-infraestructura",
    number: "4",
    title: "INFRAESTRUCTURA Y REMODELACIÓN",
    subtitle: "Materiales e insumos para la sede:",
    headerBg: "bg-purple-700 text-white",
    progressBarFill: "bg-gradient-to-r from-purple-500 to-purple-700",
    progressTrackBg: "bg-purple-100",
    cardBorder: "border-purple-300",
    cardBg: "bg-purple-50/50",
    badgeText: "text-purple-800",
    items: [
      { label: "Pintura y productos de limpieza para paredes" },
      { label: "Jabones especiales lava paredes" },
      { label: "Puertas de madera y barniz para techo" },
      { label: "Madera para estantería y biblioteca" },
      { label: "Pintura para madera" },
      { label: "Mano de obra y trabajo voluntario" },
    ],
  },
  {
    id: "pilar-5-habitaciones",
    number: "5",
    title: "HABITACIONES Y CONFORT",
    subtitle: "Dotación de dormitorios y descanso:",
    headerBg: "bg-rose-700 text-white",
    progressBarFill: "bg-gradient-to-r from-rose-500 to-rose-700",
    progressTrackBg: "bg-rose-100",
    cardBorder: "border-rose-300",
    cardBg: "bg-rose-50/50",
    badgeText: "text-rose-800",
    items: [
      { label: "Cobijas térmicas" },
      { label: "Almohadas confortables" },
      { label: "Juegos de sábanas" },
      { label: "Colchonetas" },
      { label: "Camarotes y closets" },
      { label: "Basureras y canastas para ropa" },
    ],
  },
  {
    id: "pilar-6-jugueteria",
    number: "6",
    title: "JUGUETERÍA Y ENTRETENIMIENTO",
    subtitle: "Recreación, deporte y aprendizaje:",
    headerBg: "bg-teal-700 text-white",
    progressBarFill: "bg-gradient-to-r from-teal-500 to-teal-700",
    progressTrackBg: "bg-teal-100",
    cardBorder: "border-teal-300",
    cardBg: "bg-teal-50/50",
    badgeText: "text-teal-800",
    items: [
      { label: "Libros infantiles y juveniles" },
      { label: "Juguetes personalizados" },
      { label: "Juegos de mesa instructivos" },
      { label: "Balones (baloncesto / fútbol / vóley)" },
      { label: "Arcos de fútbol y piscina inflable" },
      { label: "Lazos de salto y aros de ula-ula" },
    ],
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
    caption:
      "Niños, educadores y equipo unidos en la casa hogar de Vía El Peñol Km 10.",
    tag: "🏠 Nuestro Hogar",
    tagColor: "bg-rose-500 text-white",
  },
  {
    id: "gal-2",
    src: "/images/reales/sonrisa-confianza.jpg",
    title: "Miradas que Volvieron a Brillar",
    caption:
      "Cuando un niño se siente respaldado por una comunidad, crece invencible.",
    tag: "❤️ Confianza",
    tagColor: "bg-amber-500 text-white",
  },
  {
    id: "gal-3",
    src: "/images/reales/arte-pintacaritas.jpg",
    title: "Tardes de Color y Alegría",
    caption:
      "El arte y el juego alimentan su infancia y llenan de sonrisas la fundación.",
    tag: "🎨 Alegría",
    tagColor: "bg-purple-600 text-white",
  },
  {
    id: "gal-4",
    src: "/images/reales/taller-pedagogico-arbol.jpg",
    title: "Educación para Soñar en Grande",
    caption:
      "La educación es la herramienta más poderosa para construir su futuro.",
    tag: "🌱 Educación",
    tagColor: "bg-emerald-600 text-white",
  },
  {
    id: "gal-5",
    src: "/images/reales/trabajo-en-equipo.jpg",
    title: "Creciendo en Comunidad",
    caption:
      "Aprendiendo a trabajar en equipo, respetarse y cuidarse unos a otros.",
    tag: "🤝 Fraternidad",
    tagColor: "bg-sky-600 text-white",
  },
  {
    id: "gal-6",
    src: "/images/reales/recreacion-y-deporte.jpg",
    title: "Recreación al Aire Libre",
    caption:
      "Juegos y deporte rodeados de naturaleza en Marinilla, Antioquia.",
    tag: "⚽ Recreación",
    tagColor: "bg-emerald-600 text-white",
  },
  {
    id: "gal-7",
    src: "/images/reales/tarde-de-helados.jpg",
    title: "Cuidado Personal y Bienestar",
    caption:
      "Momentos de afecto, alimentación y cuidado diario para los 22 niños.",
    tag: "🍦 Bienestar",
    tagColor: "bg-rose-500 text-white",
  },
  {
    id: "gal-8",
    src: "/images/reales/circulo-de-la-palabra.jpg",
    title: "Apoyo Psicosocial y Escucha",
    caption:
      "Acompañamiento humano que sana las heridas de su historia y les devuelve la confianza.",
    tag: "✨ Apoyo Psicosocial",
    tagColor: "bg-indigo-600 text-white",
  },
];

export const CampaignNeedsBanner: React.FC = () => {
  const [selectedPillarIds, setSelectedPillarIds] = useState<string[]>([
    "pilar-1-kits-escolares",
    "pilar-5-habitaciones",
  ]);

  const [pillarProgressMap, setPillarProgressMap] = useState<
    Record<string, PillarProgressData>
  >(INITIAL_PILLAR_PROGRESS);

  useEffect(() => {
    let isMounted = true;

    const syncProgress = async () => {
      try {
        const liveState = await fetchLiveCampaignProgress();
        if (isMounted && liveState.pillars) {
          setPillarProgressMap(liveState.pillars);
        }
      } catch {
        // Mantiene el estado de respaldo si hay corte temporal de red
      }
    };

    syncProgress();
    const intervalId = window.setInterval(syncProgress, 60000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const togglePillarSelection = (id: string) => {
    setSelectedPillarIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedPillarTitles = OFFICIAL_CAMPAIGN_6_PILLARS.filter((p) =>
    selectedPillarIds.includes(p.id)
  ).map((p) => p.title);

  const campaignWhatsAppMessage =
    selectedPillarTitles.length > 0
      ? `Hola Fundación Espirales de Vida, me uno a la campaña "Juntos por una Infancia con Amor" en Marinilla. Quiero apoyar en:\n- ${selectedPillarTitles.join(
          "\n- "
        )}\n¿Cómo coordinamos la entrega o el aporte?`
      : `Hola Fundación Espirales de Vida, quiero sumarme a la campaña "Juntos por una Infancia con Amor" para apoyar a los 22 niños en Marinilla.`;

  return (
    <motion.div
      id="campana"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-[2.25rem] p-2 bg-gradient-to-r from-sky-500/20 via-amber-500/20 to-rose-500/20 ring-2 ring-amber-300/90 mt-14 sm:mt-16 shadow-xl"
    >
      <div className="rounded-[calc(2.25rem-0.5rem)] bg-white p-5 sm:p-8 lg:p-10">
        {/* Campaign Header Banner */}
        <div className="text-center max-w-3xl mx-auto pb-8 mb-8 border-b-2 border-amber-100">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold mb-3">
            <Sparkle weight="fill" className="w-4 h-4 text-rose-600" />
            <span>Campaña Actual en Marinilla · Lista Oficial</span>
          </div>
          <h3 className="font-logo text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-2">
            JUNTOS POR UNA INFANCIA CON AMOR
          </h3>
          <p className="text-sm sm:text-lg font-bold text-rose-600">
            LISTA DE NECESIDADES Y PILARES DE APOYO
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            Toca cualquiera de los pilares de la campaña para seleccionar con qué insumos, talento profesional, infraestructura o aporte deseas sumarte hoy.
          </p>
        </div>

        {/* 6 Official Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {OFFICIAL_CAMPAIGN_6_PILLARS.map((pillar) => {
            const isSelected = selectedPillarIds.includes(pillar.id);
            const progressInfo = pillarProgressMap[pillar.id];
            const percentage = progressInfo ? progressInfo.percentage : 0;

            return (
              <div
                key={pillar.id}
                onClick={() => togglePillarSelection(pillar.id)}
                className={`rounded-3xl border-2 overflow-hidden flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? `${pillar.cardBorder} ${pillar.cardBg} ring-4 ring-rose-500/20 shadow-md scale-[1.01]`
                    : "border-zinc-200 bg-white hover:border-zinc-300 shadow-2xs"
                }`}
              >
                <div>
                  {/* Colored Top Header Bar matching the poster */}
                  <div
                    className={`px-4 py-3 flex items-center justify-between gap-2 ${pillar.headerBg}`}
                  >
                    <h4 className="font-logo text-sm sm:text-base font-extrabold tracking-wide uppercase">
                      {pillar.title}
                    </h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                        isSelected
                          ? "bg-white text-zinc-950"
                          : "bg-black/25 text-white"
                      }`}
                    >
                      {isSelected ? "✓ Elegido" : "+ Elegir"}
                    </span>
                  </div>

                  {/* Real-Time Progress Bar per Card */}
                  <div className="px-4 sm:px-5 pt-3.5 pb-3 bg-zinc-50/80 border-b border-zinc-200/70">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            percentage > 0
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-amber-400"
                          }`}
                        />
                        Progreso estimado
                      </span>
                      <span
                        className={`font-logo text-sm sm:text-base font-extrabold ${pillar.badgeText}`}
                      >
                        {percentage}%
                      </span>
                    </div>
                    <div
                      className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 ${pillar.progressTrackBg} shadow-inner`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.max(percentage, percentage > 0 ? 6 : 0)}%`,
                        }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        className={`h-full rounded-full ${pillar.progressBarFill}`}
                      />
                    </div>
                  </div>

                  {/* Subtitle & Exact Item List */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm font-extrabold text-zinc-800 mb-3">
                      {pillar.subtitle}
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 font-medium">
                      {pillar.items.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-start gap-2 leading-snug"
                        >
                          {item.qty ? (
                            <span
                              className={`font-extrabold shrink-0 ${pillar.badgeText}`}
                            >
                              {item.qty}
                            </span>
                          ) : (
                            <span
                              className={`font-extrabold shrink-0 ${pillar.badgeText}`}
                            >
                              •
                            </span>
                          )}
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-black/5 flex items-center justify-between text-xs font-extrabold text-zinc-600">
                  <span>
                    {isSelected
                      ? "Seleccionado para apoyar"
                      : "Toca para apoyar este pilar"}
                  </span>
                  <CheckCircle
                    weight="fill"
                    className={`w-5 h-5 ${
                      isSelected ? "text-rose-600" : "text-zinc-300"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Campaign Footer Bar with Phones & Direct WhatsApp */}
        <div className="rounded-3xl bg-amber-50/90 border-2 border-amber-200 p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="text-center lg:text-left">
            <p className="font-logo text-base sm:text-xl font-bold text-rose-600 mb-1">
              ¡Donaciones de insumos, talento profesional, infraestructura o aportes económicos!
            </p>
            <p className="text-sm sm:text-base font-extrabold text-zinc-900">
              Pilares seleccionados ({selectedPillarIds.length}):{" "}
              <span className="text-indigo-700">
                {selectedPillarTitles.length > 0
                  ? selectedPillarTitles.join(" · ")
                  : "Toca uno o varios pilares arriba"}
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-2.5 text-xs sm:text-sm font-extrabold text-zinc-800">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-amber-300">
                <PhoneCall weight="fill" className="w-4 h-4 text-rose-600" />
                Campaña: 302 832 5126 | 304 387 0899
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-amber-300">
                <PhoneCall weight="fill" className="w-4 h-4 text-emerald-600" />
                Fundación: {FOUNDATION_INFO.phoneDisplay}
              </span>
            </div>
          </div>

          <a
            href={buildWhatsAppLink(campaignWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 text-sm sm:text-base font-extrabold shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
          >
            <WhatsappLogo weight="fill" className="w-5 h-5" />
            <span>Coordinar mi Donación por WhatsApp</span>
            <ArrowUpRight weight="bold" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const ThreeFrontsSection: React.FC<ThreeFrontsSectionProps> = ({
  onNavigateToStoriesPage,
}) => {
  const [activePhotoIndexByFront, setActivePhotoIndexByFront] = useState<
    Record<string, 0 | 1>
  >({
    "frente-1-dignidad": 0,
    "frente-2-desarrollo": 0,
    "frente-3-infraestructura": 0,
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getThemeClasses = (theme: OfficialFrontCard["theme"]) => {
    if (theme === "rose") {
      return {
        outerBg:
          "bg-gradient-to-b from-rose-500/10 to-rose-500/5 ring-rose-300/70",
        numberCircle: "bg-rose-600 text-white shadow-lg shadow-rose-600/30",
        badge: "bg-rose-100 text-rose-800 border-rose-200",
        pill: "bg-rose-50 text-rose-900 border-rose-200",
        button: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
      };
    }
    if (theme === "emerald") {
      return {
        outerBg:
          "bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 ring-emerald-300/80",
        numberCircle:
          "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30",
        badge: "bg-emerald-100 text-emerald-900 border-emerald-200",
        pill: "bg-emerald-50 text-emerald-900 border-emerald-200",
        button:
          "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
      };
    }
    return {
      outerBg: "bg-gradient-to-b from-sky-500/12 to-sky-500/5 ring-sky-300/80",
      numberCircle: "bg-sky-600 text-white shadow-lg shadow-sky-600/30",
      badge: "bg-sky-100 text-sky-900 border-sky-200",
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
        {/* PART 1: Los 3 Frentes Fundamentales (Texto Oficial) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 mb-4 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-800">
              Nuestra Meta es Clara · 3 Frentes Fundamentales
            </span>
          </div>

          <h2 className="font-logo text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12] mb-4">
            Abastecer y Transformar la Fundación en{" "}
            <span className="text-rose-600 underline decoration-amber-400 decoration-wavy underline-offset-4">
              3 Frentes
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed">
            Tocamos las puertas de empresas, entidades y corazones generosos para multiplicar el impacto en la vida de nuestros <strong>22 niños, niñas y adolescentes</strong> en Marinilla.
          </p>
        </div>

        {/* 3 Official Front Cards (Zero invented progress percentages) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {OFFICIAL_THREE_FRONTS.map((front, index) => {
            const styles = getThemeClasses(front.theme);
            const activePhotoIdx = activePhotoIndexByFront[front.id] ?? 0;
            const currentPhoto =
              activePhotoIdx === 0 ? front.primaryPhoto : front.secondaryPhoto;
            const currentCaption =
              activePhotoIdx === 0
                ? front.primaryCaption
                : front.secondaryCaption;

            return (
              <motion.article
                key={front.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`rounded-[2rem] p-2 ${styles.outerBg} ring-2 flex flex-col h-full shadow-lg`}
              >
                <div className="rounded-[calc(2rem-0.4rem)] bg-white p-5 sm:p-6 flex flex-col h-full">
                  {/* Top Bar: Number + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-12 h-12 rounded-2xl font-logo text-2xl font-extrabold flex items-center justify-center shrink-0 ${styles.numberCircle}`}
                      >
                        {front.number}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
                      >
                        {front.badge}
                      </span>
                    </div>
                  </div>

                  {/* Photo Container with 2-Photo Switcher */}
                  <div className="relative h-56 sm:h-60 rounded-2xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200/80 group">
                    <img
                      src={currentPhoto}
                      alt={`${front.title} - ${currentCaption}`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/15 to-transparent" />

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md p-1 rounded-full border border-white/20">
                      <button
                        type="button"
                        onClick={() =>
                          setActivePhotoIndexByFront((prev) => ({
                            ...prev,
                            [front.id]: 0,
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
                          setActivePhotoIndexByFront((prev) => ({
                            ...prev,
                            [front.id]: 1,
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

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-bold text-white flex items-center gap-1.5 drop-shadow-xs">
                        <Camera
                          weight="fill"
                          className="w-4 h-4 text-amber-300 shrink-0"
                        />
                        <span className="truncate">{currentCaption}</span>
                      </p>
                    </div>
                  </div>

                  {/* Title & Exact Official Description */}
                  <h3 className="font-logo text-xl sm:text-2xl font-bold text-zinc-900 leading-snug mb-2">
                    {front.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-5">
                    {front.description}
                  </p>

                  {/* 3 Short Visual Pills */}
                  <div className="mb-5 flex-1">
                    <div className="flex flex-col gap-2">
                      {front.pills.map((pill) => (
                        <div
                          key={pill}
                          className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-between ${styles.pill}`}
                        >
                          <span>{pill}</span>
                          <CheckCircle
                            weight="fill"
                            className="w-4 h-4 opacity-75 shrink-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Action Button */}
                  <a
                    href={buildWhatsAppLink(front.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto group inline-flex items-center justify-between w-full rounded-full pl-5 pr-2 py-2.5 text-sm sm:text-base font-bold transition-all shadow-md active:scale-95 ${styles.button}`}
                  >
                    <span>Apoyar {front.title}</span>
                    <span className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                      <ArrowUpRight
                        weight="bold"
                        className="w-5 h-5 text-white"
                      />
                    </span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* PART 3: El Modelo de Apadrinamiento (Más allá de lo material · Tiempo, Guía y Presencia) */}
        <div className="rounded-[2rem] bg-white border-2 border-zinc-200/80 p-6 sm:p-10 shadow-sm mb-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold mb-3">
              ❤️ Más Allá de lo Material · Modelo de Apadrinamiento
            </span>
            <h3 className="font-logo text-2xl sm:text-4xl font-bold text-zinc-900 mb-3">
              “Un niño que se siente respaldado por una comunidad es un niño que crece invencible”
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Queremos que las empresas, familias, padrinos y madrinas no solo donen un recurso, sino que se involucren: acompañando el crecimiento de nuestros 22 niños con <strong>tiempo, guía y presencia</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Padrinos y Madrinas */}
            <div className="rounded-2xl bg-rose-50/70 border-2 border-rose-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold">
                    ❤️ Padrinos y Madrinas
                  </span>
                  <Heart weight="fill" className="w-6 h-6 text-rose-600" />
                </div>
                <h4 className="font-logo text-xl font-bold text-zinc-900 mb-2">
                  Tiempo, Guía y Presencia
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                  Acompaña el crecimiento de uno de los 22 niños de la fundación brindándole tu apoyo, motivación, presencia y respaldo constante.
                </p>
              </div>
              <a
                href="/historias"
                onClick={(e) => {
                  if (onNavigateToStoriesPage) {
                    e.preventDefault();
                    onNavigateToStoriesPage();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Conocer los 22 Espacios</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2: Empresas y Organizaciones */}
            <div className="rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                    🏢 Empresas y Directivos
                  </span>
                  <ShieldCheck
                    weight="fill"
                    className="w-6 h-6 text-emerald-600"
                  />
                </div>
                <h4 className="font-logo text-xl font-bold text-zinc-900 mb-2">
                  Empresas que se Involucran
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                  Invitamos a empresarios, directivos y organizaciones (NIT {FOUNDATION_INFO.nit}) a involucrarse con recursos, remodelación de espacios y voluntariado.
                </p>
              </div>
              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, escribo en nombre de una empresa u organización para involucrarnos con los 22 niños en Marinilla."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Vincular mi Organización</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: Colectivos, Profesionales y Ciudadanos */}
            <div className="rounded-2xl bg-sky-50/70 border-2 border-sky-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-bold">
                    🎁 Colectivos y Ciudadanos
                  </span>
                  <UsersThree weight="fill" className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-logo text-xl font-bold text-zinc-900 mb-2">
                  Insumos y Talento Profesional
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                  Cada donación, desde un paquete de útiles escolares o cobijas hasta apoyo en salud, psicología o remodelación, cambia vidas de manera directa e inmediata.
                </p>
              </div>
              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, quiero sumar mi apoyo con insumos o voluntariado profesional para los 22 niños en Marinilla."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Sumarme a la Causa</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* PART 4: Galería de Fotos en Marinilla */}
        <div id="galeria" className="scroll-mt-24">
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
      </div>

      {/* Lightbox Modal for Photo Gallery */}
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/80 hover:bg-white hover:text-zinc-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <CaretLeft weight="bold" className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex + 1) % REAL_GALLERY_PHOTOS.length
                    )
                  }
                  aria-label="Siguiente foto"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/80 hover:bg-white hover:text-zinc-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <CaretRight weight="bold" className="w-6 h-6" />
                </button>
              </div>

              <div className="p-5 sm:p-6 bg-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${REAL_GALLERY_PHOTOS[lightboxIndex].tagColor}`}
                  >
                    {REAL_GALLERY_PHOTOS[lightboxIndex].tag} · Foto{" "}
                    {lightboxIndex + 1} de {REAL_GALLERY_PHOTOS.length}
                  </span>
                  <h4 className="font-logo text-xl font-bold">
                    {REAL_GALLERY_PHOTOS[lightboxIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                    {REAL_GALLERY_PHOTOS[lightboxIndex].caption}
                  </p>
                </div>

                <a
                  href={buildWhatsAppLink(
                    "Hola Fundación Espirales de Vida, vi las fotos del hogar en Marinilla y quiero apoyar a los 22 niños."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors"
                >
                  <Heart weight="fill" className="w-4 h-4" />
                  <span>Apoyar este Hogar</span>
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
