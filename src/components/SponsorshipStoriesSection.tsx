import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkle,
  X,
  CheckCircle,
  WhatsappLogo,
  Star,
  PaintBrush,
  MusicNotes,
  SoccerBall,
  BookOpen,
  ArrowLeft,
  HouseLine,
  UsersThree,
  PhoneCall,
} from "@phosphor-icons/react";
import {
  ChildStoryProfile,
  FOUNDATION_INFO,
  buildWhatsAppLink,
} from "../data/foundationData";

export interface SponsorshipStoriesSectionProps {
  externalSelectedStoryId?: string | null;
  onClearExternalStory?: () => void;
  onBackToHome?: () => void;
  onGoToMetas?: () => void;
}

interface ColorPaletteItem {
  cardBg: string;
  dashedBox: string;
  iconBadge: string;
  pillBadge: string;
  dreamBox: string;
  buttonBg: string;
}

const SPIRAL_COLOR_PALETTE: ColorPaletteItem[] = [
  // 1. Coral Rose
  {
    cardBg: "bg-rose-50 border-rose-200 text-rose-950",
    dashedBox: "border-rose-300 bg-white/90 text-rose-700",
    iconBadge: "bg-rose-100 text-rose-600 ring-rose-200",
    pillBadge: "bg-rose-600 text-white",
    dreamBox: "bg-white/90 border-rose-200 text-rose-900",
    buttonBg: "bg-rose-600 hover:bg-rose-700 text-white",
  },
  // 2. Sky Blue
  {
    cardBg: "bg-sky-50 border-sky-200 text-sky-950",
    dashedBox: "border-sky-300 bg-white/90 text-sky-700",
    iconBadge: "bg-sky-100 text-sky-600 ring-sky-200",
    pillBadge: "bg-sky-600 text-white",
    dreamBox: "bg-white/90 border-sky-200 text-sky-900",
    buttonBg: "bg-sky-600 hover:bg-sky-700 text-white",
  },
  // 3. Emerald Green
  {
    cardBg: "bg-emerald-50 border-emerald-200 text-emerald-950",
    dashedBox: "border-emerald-300 bg-white/90 text-emerald-700",
    iconBadge: "bg-emerald-100 text-emerald-600 ring-emerald-200",
    pillBadge: "bg-emerald-600 text-white",
    dreamBox: "bg-white/90 border-emerald-200 text-emerald-900",
    buttonBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  // 4. Royal Indigo
  {
    cardBg: "bg-indigo-50 border-indigo-200 text-indigo-950",
    dashedBox: "border-indigo-300 bg-white/90 text-indigo-700",
    iconBadge: "bg-indigo-100 text-indigo-600 ring-indigo-200",
    pillBadge: "bg-indigo-600 text-white",
    dreamBox: "bg-white/90 border-indigo-200 text-indigo-900",
    buttonBg: "bg-indigo-600 hover:bg-indigo-700 text-white",
  },
  // 5. Warm Amber
  {
    cardBg: "bg-amber-50 border-amber-200 text-amber-950",
    dashedBox: "border-amber-300 bg-white/90 text-amber-800",
    iconBadge: "bg-amber-100 text-amber-700 ring-amber-200",
    pillBadge: "bg-amber-500 text-zinc-950",
    dreamBox: "bg-white/90 border-amber-200 text-amber-950",
    buttonBg: "bg-amber-500 hover:bg-amber-600 text-zinc-950",
  },
];

const STORY_ICONS = [
  Heart,
  BookOpen,
  Star,
  PaintBrush,
  MusicNotes,
  SoccerBall,
];

/**
 * Los 22 espacios limpios (#01 al #22) para cada uno de los 22 niños, niñas y adolescentes
 * que viven en la Fundación Espirales de Vida en Marinilla.
 * Cero nombres ficticios, cero precios inventados, 100% fiel al texto oficial y a la campaña
 * "Juntos por una Infancia con Amor".
 */
const TWENTY_TWO_CLEAN_SPACES: ChildStoryProfile[] = Array.from(
  { length: 22 },
  (_, index) => {
    const num = String(index + 1).padStart(2, "0");

    const pillarFocusList = [
      "Pilar 1: Albergue seguro y protegido en Marinilla",
      "Pilar 2: Cuidado personal y alimentación diaria",
      "Pilar 3: Apoyo psicosocial para sanar y recuperar la confianza",
      "Pilar 4: Educación para soñar en grande y construir su futuro",
    ];

    const campaignNeedsFocus = [
      "Kit Escolar completo (morral, cuadernos, colores) + Kit de Aseo Personal",
      "Habitaciones y Confort (cobija térmica, almohada, sábanas) + Recreación",
      "Acompañamiento con tiempo, guía, presencia y apoyo en su formación",
      "Apoyo en salud, psicología, útiles escolares y juguetes para su infancia",
    ];

    return {
      id: `espacio-nino-${num}`,
      slotNumber: index + 1,
      name: `Espacio del Niño / Niña #${num}`,
      protectiveNote: `Niño / Niña #${num} de 22`,
      age: "Hogar Marinilla",
      ageYears: 10,
      category: "Arte y Creatividad",
      image: "",
      shortStory:
        "Espacio limpio y sin fotografía reservado para su historia personal. En Espirales de Vida reconstruimos su dignidad día a día con amor, protección y educación.",
      fullStory:
        "Este espacio representa a uno de los 22 niños, niñas y adolescentes que viven en nuestra fundación en Marinilla. Buscamos padrinos, madrinas y empresas que no solo donen un recurso, sino que se involucren brindándole tiempo, guía y presencia para que crezca invencible.",
      dream: campaignNeedsFocus[index % campaignNeedsFocus.length],
      favoriteWorkshop: pillarFocusList[index % pillarFocusList.length],
      pillarsImpact: [
        "Albergue seguro, cuidado personal, apoyo psicosocial y educación",
        "Acompañamiento con tiempo, guía y presencia de sus padrinos",
      ],
      needsList: [
        "1 Kit Escolar completo y 1 Kit de Aseo Personal",
        "Dotación de descanso (cobija térmica, sábanas, pijama cómoda)",
        "Padrino, madrina o empresa que acompañe su crecimiento",
      ],
      monthlySponsorshipCOP: 0,
      monthlySponsorshipFormatted: "Aporte voluntario / Insumos / Presencia",
      timeCommitmentSuggestion:
        "Acompañar su crecimiento brindándole tiempo, guía, presencia y apoyo directo.",
      whatsappMessage: `Hola Fundación Espirales de Vida, quiero apadrinar y apoyar el Espacio del Niño / Niña #${num} de los 22 niños en Marinilla.`,
    };
  }
);

const FULL_HOME_COLLECTIVE_SPACE: ChildStoryProfile = {
  id: "hogar-completo-22-ninos",
  slotNumber: 22,
  name: "Apadrinar a Toda la Fundación (Los 22 Niños)",
  protectiveNote: "Empresas, Entidades, Colectivos y Familias",
  age: "22 Niños en Marinilla",
  ageYears: 22,
  category: "Hogar Completo (22 Niños)",
  image: "",
  shortStory:
    "Para empresas, directivos, colectivos y familias que desean respaldar a los 22 niños al mismo tiempo en los 3 frentes fundamentales y los 6 pilares de la campaña.",
  fullStory:
    "Las grandes transformaciones nunca son obra de una sola persona; son el resultado de un equipo comprometido. Con esta modalidad tu empresa u organización se involucra con los 22 niños en Marinilla: aportando kits escolares, kits de aseo, confort en habitaciones, remodelación de infraestructura, voluntariado profesional o apadrinamiento integral.",
  dream:
    "Abastecer los 6 Pilares de la campaña 'Juntos por una Infancia con Amor' y construir su espacio de juego propio",
  favoriteWorkshop:
    "Dignidad Diaria · Desarrollo y Alegría · Infraestructura y Remodelación",
  pillarsImpact: [
    "Impacto directo e inmediato en la vida de los 22 niños, niñas y adolescentes",
    "Respaldo institucional con NIT 900150558-5 en Marinilla, Antioquia",
  ],
  needsList: [
    "Kits Escolares y Kits de Aseo Personal",
    "Cobijas térmicas, almohadas, juegos de sábanas, camarotes y closets",
    "Pintura, madera para biblioteca, voluntariado profesional y parque propio",
  ],
  monthlySponsorshipCOP: 0,
  monthlySponsorshipFormatted: "Insumos, Talento Profesional o Aporte Económico",
  timeCommitmentSuggestion:
    "Involucrarse como empresa o colectivo con tiempo, guía, presencia y recursos.",
  whatsappMessage:
    "Hola Fundación Espirales de Vida, queremos involucrarnos como empresa/colectivo para apoyar a los 22 niños en Marinilla.",
};

const SIMPLE_HELP_OPTIONS = [
  {
    id: "apadrinar-tiempo-guia",
    label: "❤️ Ser Padrino o Madrina (Tiempo, guía, presencia y apoyo)",
    shortTag: "Apadrinamiento (Tiempo, guía, presencia y recursos)",
  },
  {
    id: "donar-kits-campana",
    label: "🎒 Donar Insumos de la Lista (Kit Escolar, Aseo, Cobijas o Juguetes)",
    shortTag: "Donación de Insumos (Campaña Juntos por una Infancia con Amor)",
  },
  {
    id: "talento-infraestructura",
    label: "🏡 Apoyar con Talento Profesional, Infraestructura o Empresa",
    shortTag: "Apoyo Profesional / Infraestructura / Empresa Aliada",
  },
] as const;

const QUICK_CITIES = ["Medellín", "Marinilla", "Rionegro", "Otra ciudad"] as const;

export const SponsorshipStoriesSection: React.FC<SponsorshipStoriesSectionProps> = ({
  externalSelectedStoryId,
  onClearExternalStory,
  onBackToHome,
  onGoToMetas,
}) => {
  const [selectedStory, setSelectedStory] = useState<ChildStoryProfile | null>(
    null
  );

  // 3 Simple Steps state inside Modal
  const [selectedHelpOption, setSelectedHelpOption] = useState<string>(
    SIMPLE_HELP_OPTIONS[0].shortTag
  );
  const [sponsorName, setSponsorName] = useState<string>("");
  const [sponsorCity, setSponsorCity] = useState<string>("Medellín");

  useEffect(() => {
    if (externalSelectedStoryId) {
      if (externalSelectedStoryId === "hogar-completo-22-ninos") {
        handleOpenStory(FULL_HOME_COLLECTIVE_SPACE);
      } else {
        const found =
          TWENTY_TWO_CLEAN_SPACES.find(
            (s) => s.id === externalSelectedStoryId
          ) || TWENTY_TWO_CLEAN_SPACES[0];
        handleOpenStory(found);
      }
    }
  }, [externalSelectedStoryId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedStory) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStory]);

  const handleOpenStory = (story: ChildStoryProfile) => {
    setSelectedStory(story);
    if (story.id === "hogar-completo-22-ninos") {
      setSelectedHelpOption(SIMPLE_HELP_OPTIONS[2].shortTag);
    } else {
      setSelectedHelpOption(SIMPLE_HELP_OPTIONS[0].shortTag);
    }
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
    if (onClearExternalStory) {
      onClearExternalStory();
    }
  };

  const buildSimpleWhatsAppUrl = (story: ChildStoryProfile) => {
    const cleanName = sponsorName.trim() || "Un amigo solidario";
    const message = [
      `Hola Fundación Espirales de Vida, soy ${cleanName} desde ${sponsorCity}.`,
      `Quiero apoyar a *${story.name}* (${story.protectiveNote}).`,
      `Forma de participación elegida: ${selectedHelpOption}.`,
      `¿Me cuentan cómo dar el siguiente paso?`,
    ].join("\n");
    return buildWhatsAppLink(message);
  };

  return (
    <section
      id="historias-pagina"
      className="pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 bg-gradient-to-b from-rose-50/50 via-[#FFFDF9] to-sky-50/35 relative min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Back to Home Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-rose-200/70">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-rose-50 text-zinc-900 border-2 border-zinc-200 hover:border-rose-300 text-xs sm:text-sm font-extrabold shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft weight="bold" className="w-4 h-4 text-rose-600" />
            <span>Volver a la Página de Inicio</span>
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <HouseLine weight="fill" className="w-4 h-4 text-rose-500" />
              <span>Inicio</span>
            </button>
            <span>/</span>
            <span className="text-rose-600 font-extrabold">
              Los 22 Espacios de Apadrinamiento
            </span>
          </div>
        </div>

        {/* Dedicated Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border-2 border-rose-300 text-rose-800 text-xs sm:text-sm font-extrabold mb-4">
            <Heart weight="fill" className="w-4 h-4 text-rose-600" />
            <span>Espacios sin foto · Aquí lo más importante es su historia</span>
          </div>

          <h1 className="font-logo text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-zinc-950 leading-[1.12] mb-4">
            Los{" "}
            <span className="text-rose-600 underline decoration-amber-400 decoration-4 underline-offset-4">
              22 Niños
            </span>{" "}
            de Espirales de Vida en Marinilla
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
            Promovemos un modelo de apadrinamiento donde personas, familias y empresas no solo donan un recurso, sino que se involucran acompañando el crecimiento de estos 22 niños con <strong>tiempo, guía y presencia</strong>.
          </p>
        </div>

        {/* 3 Simple Steps Strip for Clear UX */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-white border-2 border-rose-200 p-4 flex items-center gap-3.5 shadow-2xs">
            <span className="w-10 h-10 rounded-xl bg-rose-600 text-white font-logo text-xl font-extrabold flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <p className="text-sm font-extrabold text-zinc-900">
                Elige un espacio (#01 al #22)
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                Cada tarjeta representa a uno de los 22 niños de la fundación.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-sky-200 p-4 flex items-center gap-3.5 shadow-2xs">
            <span className="w-10 h-10 rounded-xl bg-sky-600 text-white font-logo text-xl font-extrabold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <p className="text-sm font-extrabold text-zinc-900">
                Involúcrate en su vida
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                Con tiempo, guía, presencia, kits escolares, aseo o confort.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-emerald-200 p-4 flex items-center gap-3.5 shadow-2xs">
            <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-logo text-xl font-extrabold flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <p className="text-sm font-extrabold text-zinc-900">
                Conecta con la Fundación
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                Coordinamos tu apadrinamiento directamente por WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Collective / Corporate Sponsorship Highlight Banner */}
        <div className="mb-10 rounded-3xl p-2 bg-gradient-to-r from-indigo-600 via-rose-600 to-amber-500 shadow-md">
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="w-13 h-13 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <UsersThree weight="fill" className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-extrabold mb-1">
                  Empresas (NIT {FOUNDATION_INFO.nit}), Directivos, Colectivos y Familias
                </span>
                <h2 className="font-logo text-xl sm:text-2xl font-extrabold text-zinc-950">
                  ¿Desean involucrarse con los 22 niños como Hogar Completo?
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleOpenStory(FULL_HOME_COLLECTIVE_SPACE)}
              className="w-full md:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-extrabold shrink-0 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Apadrinar Hogar Completo (22 Niños)
            </button>
          </div>
        </div>

        {/* Vibrant, Airy 22 Clean Story Spaces Grid (Sin fotos y sin historias ficticias) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14"
        >
          {TWENTY_TWO_CLEAN_SPACES.map((story, index) => {
            const palette =
              SPIRAL_COLOR_PALETTE[index % SPIRAL_COLOR_PALETTE.length];
            const IconComponent = STORY_ICONS[index % STORY_ICONS.length];

            return (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenStory(story)}
                className={`rounded-3xl border-2 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all cursor-pointer ${palette.cardBg}`}
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-2xs ${palette.pillBadge}`}
                    >
                      {story.protectiveNote}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 text-zinc-800 text-xs font-extrabold border border-black/10">
                      {story.age}
                    </span>
                  </div>

                  {/* Clean Dashed Empty Story / Portrait Box (NO PHOTO!) */}
                  <div
                    className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center mb-4 ${palette.dashedBox}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ring-2 flex items-center justify-center mb-2.5 ${palette.iconBadge}`}
                    >
                      <IconComponent weight="fill" className="w-6 h-6" />
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold leading-snug">
                      Espacio sin foto · Aquí lo más importante es su historia
                    </p>
                    <span className="text-[11px] font-bold opacity-75 mt-1">
                      {story.favoriteWorkshop}
                    </span>
                  </div>

                  {/* Clean Title & Description */}
                  <h3 className="font-logo text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
                    {story.name}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed opacity-90 mb-4">
                    {story.shortStory}
                  </p>

                  {/* Needs / Support Focus Box */}
                  <div
                    className={`rounded-2xl p-3.5 border mb-5 ${palette.dreamBox}`}
                  >
                    <span className="text-xs font-extrabold uppercase tracking-wider opacity-75 block mb-0.5">
                      ✨ Apoyo Directo para este Niño / Niña
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold leading-snug">
                      {story.dream}
                    </p>
                  </div>
                </div>

                {/* Big Touch-Friendly CTA Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenStory(story);
                  }}
                  className={`w-full min-h-[50px] px-5 py-3 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm active:scale-98 transition-all cursor-pointer ${palette.buttonBg}`}
                >
                  <Heart weight="fill" className="w-5 h-5 shrink-0" />
                  <span>Apadrinar Espacio #{String(index + 1).padStart(2, "0")}</span>
                </button>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom Helper Banner on the /historias Page */}
        <div className="rounded-3xl bg-white border-2 border-amber-200 p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="font-logo text-2xl sm:text-3xl font-extrabold text-zinc-950 mb-2">
            “Hoy sus miradas y sus sueños están en nuestras manos”
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 font-medium mb-4">
            Escríbenos para asignarte uno de los 22 espacios de apadrinamiento o coordinar tu donación de insumos, talento profesional, infraestructura o aportes económicos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs sm:text-sm font-extrabold text-zinc-700">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              <PhoneCall weight="fill" className="w-3.5 h-3.5 text-rose-600" />
              Campaña: 302 832 5126 | 304 387 0899
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              <PhoneCall weight="fill" className="w-3.5 h-3.5 text-emerald-600" />
              Fundación: {FOUNDATION_INFO.phoneDisplay}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={buildWhatsAppLink(
                "Hola Fundación Espirales de Vida, estoy en la página de los 22 niños y quiero información para apadrinar o sumarme a la campaña Juntos por una Infancia con Amor."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-extrabold shadow-md transition-all"
            >
              <WhatsappLogo weight="fill" className="w-5 h-5" />
              <span>Hablar por WhatsApp</span>
            </a>

            {onGoToMetas && (
              <button
                type="button"
                onClick={onGoToMetas}
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-900 border-2 border-sky-200 text-sm sm:text-base font-extrabold transition-all cursor-pointer"
              >
                <Sparkle weight="fill" className="w-4 h-4 text-sky-600" />
                <span>Ver Lista de Necesidades (6 Pilares)</span>
              </button>
            )}

            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-sm sm:text-base font-extrabold transition-all cursor-pointer"
              >
                <ArrowLeft weight="bold" className="w-4 h-4" />
                <span>Volver al Inicio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Super Clean 3-Step Sponsorship Modal (Zero Invented Prices) */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-story-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl bg-white border-2 border-rose-200 p-5 sm:p-8 shadow-2xl my-auto max-h-[92dvh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-zinc-100">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold mb-2">
                    <Heart weight="fill" className="w-3.5 h-3.5 text-rose-600" />
                    <span>Espacio sin foto · Tiempo, Guía y Presencia</span>
                  </span>
                  <h3
                    id="modal-story-title"
                    className="font-logo text-2xl sm:text-3xl font-extrabold text-zinc-950"
                  >
                    {selectedStory.name} ({selectedStory.protectiveNote})
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label="Cerrar ventana"
                  className="w-11 h-11 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X weight="bold" className="w-5 h-5" />
                </button>
              </div>

              {/* Story Summary Box */}
              <div className="rounded-2xl bg-rose-50/70 border-2 border-dashed border-rose-200 p-4 sm:p-5 mb-6">
                <p className="text-base sm:text-lg text-zinc-800 font-medium leading-relaxed mb-3">
                  {selectedStory.fullStory}
                </p>
                <div className="rounded-xl bg-white p-3 border border-rose-200">
                  <span className="text-xs font-extrabold text-rose-600 uppercase block">
                    ✨ Necesidades y Apoyo Directo:
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-zinc-900">
                    {selectedStory.dream}
                  </p>
                </div>
              </div>

              {/* 3 Simple Steps to Sponsor */}
              <div className="space-y-5">
                {/* Step 1 */}
                <div>
                  <label className="block text-sm sm:text-base font-extrabold text-zinc-900 mb-2.5">
                    Paso 1: ¿Cómo quieres vincularte hoy?
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {SIMPLE_HELP_OPTIONS.map((option) => {
                      const active = selectedHelpOption === option.shortTag;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedHelpOption(option.shortTag)}
                          className={`min-h-[52px] w-full text-left px-4 py-3 rounded-2xl text-sm sm:text-base font-extrabold transition-all cursor-pointer flex items-center justify-between gap-3 border-2 ${
                            active
                              ? "bg-rose-600 border-rose-600 text-white shadow-sm"
                              : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-rose-50/50"
                          }`}
                        >
                          <span>{option.label}</span>
                          <CheckCircle
                            weight="fill"
                            className={`w-5 h-5 shrink-0 ${
                              active ? "text-white" : "text-zinc-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="sponsor-name-input"
                      className="block text-sm sm:text-base font-extrabold text-zinc-900 mb-2"
                    >
                      Paso 2: Tu nombre o empresa
                    </label>
                    <input
                      id="sponsor-name-input"
                      type="text"
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      placeholder="Escribe tu nombre u organización"
                      className="min-h-[48px] w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border-2 border-zinc-200 text-base font-semibold text-zinc-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <span className="block text-sm sm:text-base font-extrabold text-zinc-900 mb-2">
                      ¿De qué ciudad eres?
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_CITIES.map((city) => {
                        const activeCity = sponsorCity === city;
                        return (
                          <button
                            key={city}
                            type="button"
                            onClick={() => setSponsorCity(city)}
                            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition-all cursor-pointer ${
                              activeCity
                                ? "bg-sky-600 border-sky-600 text-white"
                                : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-sky-50"
                            }`}
                          >
                            {city}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 3: Direct WhatsApp CTA */}
                <div className="pt-2">
                  <p className="text-xs sm:text-sm font-extrabold text-zinc-600 mb-2 text-center">
                    Paso 3: Envía tu mensaje directo por WhatsApp a la fundación
                  </p>
                  <a
                    href={buildSimpleWhatsAppUrl(selectedStory)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[56px] w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base sm:text-lg font-extrabold active:scale-98 transition-all shadow-[0_10px_28px_rgba(5,150,105,0.3)]"
                  >
                    <WhatsappLogo weight="fill" className="w-6 h-6 text-white shrink-0" />
                    <span>Hablar por WhatsApp ({FOUNDATION_INFO.phoneDisplay})</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SponsorshipStoriesSection;
