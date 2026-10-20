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
  Smiley,
  ArrowLeft,
  HouseLine,
  UsersThree,
} from "@phosphor-icons/react";
import {
  STORY_CATEGORIES,
  CHILDREN_STORIES,
  StoryCategory,
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

type ViewMode = "espacios-22" | "destacadas";

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
  PaintBrush,
  MusicNotes,
  Star,
  SoccerBall,
  BookOpen,
  Heart,
];

const TWENTY_TWO_SPACES: ChildStoryProfile[] = Array.from(
  { length: 22 },
  (_, index) => {
    const num = String(index + 1).padStart(2, "0");
    const existingStory = CHILDREN_STORIES[index];

    if (existingStory && existingStory.id !== "hogar-completo-22-ninos") {
      return {
        ...existingStory,
        protectiveNote: `Niño / Niña #${num} de 22`,
      };
    }

    const workshopLabels = [
      "Taller de Pintura y Color",
      "Taller de Música y Guitarra",
      "Juegos y Fútbol en Equipo",
      "Club de Cuentos y Lectura",
      "Huerta Escolar en Marinilla",
      "Sueños y Vida Independiente",
    ];
    const dreams = [
      "Aprender un arte u oficio y salir adelante con alegría",
      "Tener nuestro Parque Infantil propio en la casa hogar",
      "Estudiar una carrera profesional y ayudar a más niños",
      "Crecer seguro, rodeado de amigos y oportunidades en Antioquia",
    ];
    const categories: Exclude<StoryCategory, "Todas">[] = [
      "Arte y Creatividad",
      "Música y Expresión",
      "Deporte y Trabajo en Equipo",
      "Lectura y Ciencia",
      "Naturaleza y Oficios",
    ];

    return {
      id: `espacio-nino-${num}`,
      name: `Historia del Niño / Niña #${num}`,
      protectiveNote: `Niño / Niña #${num} de 22`,
      age: "Hogar Marinilla",
      ageYears: 10,
      category: categories[index % categories.length],
      image: "",
      shortStory:
        "Espacio limpio y reservado para su historia de vida. En Espirales de Vida cuidamos su privacidad porque lo más valioso es su corazón y su futuro.",
      fullStory:
        "Este espacio representa a uno de los 22 niños, niñas y adolescentes que viven en nuestra casa de Marinilla. Al apadrinar este cupo apoyas su alimentación diaria, su educación escolar, su abrigo y su acompañamiento psicológico.",
      dream: dreams[index % dreams.length],
      favoriteWorkshop: workshopLabels[index % workshopLabels.length],
      pillarsImpact: [
        "Hogar seguro y cálido las 24 horas en Marinilla",
        "Alimentación completa, colegio y apoyo emocional",
      ],
      needsList: [
        "Cobija térmica y pijama abrigadora",
        "Útiles escolares y materiales de taller",
        "Padrino o madrina que acompañe su proceso",
      ],
      monthlySponsorshipCOP: 120000,
      monthlySponsorshipFormatted: "$120.000 COP / mes",
      timeCommitmentSuggestion:
        "Cartas de motivación y visitas en jornadas de puertas abiertas en Marinilla.",
      whatsappMessage: `Hola Fundación Espirales de Vida, quiero apadrinar el espacio del Niño / Niña #${num} de los 22 niños en Marinilla.`,
    };
  }
);

const SIMPLE_HELP_OPTIONS = [
  {
    id: "padrino-mensual",
    label: "💝 Ser Padrino o Madrina ($120.000/mes o aporte libre)",
    shortTag: "Apadrinamiento Mensual + Cariño",
  },
  {
    id: "kit-regalo",
    label: "🎒 Donar Cobija, Pijama, Útiles o Juguete",
    shortTag: "Donación de Kit en Especie",
  },
  {
    id: "empresa-hogar",
    label: "🏡 Apoyar a los 22 Niños (Familia o Empresa)",
    shortTag: "Apoyo Colectivo / Empresarial RSE",
  },
] as const;

const QUICK_CITIES = ["Medellín", "Marinilla", "Rionegro", "Otra ciudad"] as const;

export const SponsorshipStoriesSection: React.FC<SponsorshipStoriesSectionProps> = ({
  externalSelectedStoryId,
  onClearExternalStory,
  onBackToHome,
  onGoToMetas,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("espacios-22");
  const [activeCategory, setActiveCategory] = useState<StoryCategory>("Todas");
  const [selectedStory, setSelectedStory] = useState<ChildStoryProfile | null>(null);

  // 3 Simple Steps state inside Modal
  const [selectedHelpOption, setSelectedHelpOption] = useState<string>(
    SIMPLE_HELP_OPTIONS[0].shortTag
  );
  const [sponsorName, setSponsorName] = useState<string>("");
  const [sponsorCity, setSponsorCity] = useState<string>("Medellín");

  const fullHomeStory =
    CHILDREN_STORIES.find((s) => s.id === "hogar-completo-22-ninos") ||
    CHILDREN_STORIES[CHILDREN_STORIES.length - 1];

  useEffect(() => {
    if (externalSelectedStoryId) {
      const found =
        CHILDREN_STORIES.find((s) => s.id === externalSelectedStoryId) ||
        TWENTY_TWO_SPACES.find((s) => s.id === externalSelectedStoryId) ||
        CHILDREN_STORIES[0];
      handleOpenStory(found);
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
    if (story.category === "Hogar Completo (22 Niños)") {
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

  const baseList =
    viewMode === "espacios-22" ? TWENTY_TWO_SPACES : CHILDREN_STORIES;

  const displayedCards =
    activeCategory === "Todas"
      ? baseList
      : baseList.filter((story) => story.category === activeCategory);

  const buildSimpleWhatsAppUrl = (story: ChildStoryProfile) => {
    const cleanName = sponsorName.trim() || "Un amigo solidario";
    const message = [
      `Hola Fundación Espirales de Vida, soy ${cleanName} desde ${sponsorCity}.`,
      `Quiero apoyar a *${story.name}* (${story.protectiveNote}).`,
      `Forma de ayuda elegida: ${selectedHelpOption}.`,
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
              Las 22 Historias en Marinilla
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
              22 Espacios
            </span>{" "}
            de Nuestros Niños en Marinilla
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
            Para proteger a nuestros 22 niños no mostramos su rostro en las tarjetas. ¡Elige cualquier número del <strong>#01 al #22</strong>, lee su sueño y conviértete en su padrino o madrina!
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
                Elige del #01 al #22
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                Explora los 22 espacios o filtra por su taller favorito.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-sky-200 p-4 flex items-center gap-3.5 shadow-2xs">
            <span className="w-10 h-10 rounded-xl bg-sky-600 text-white font-logo text-xl font-extrabold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <p className="text-sm font-extrabold text-zinc-900">
                Elige cómo apoyar
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                Apadrinamiento mensual, kit escolar o apoyo familiar.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-emerald-200 p-4 flex items-center gap-3.5 shadow-2xs">
            <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-logo text-xl font-extrabold flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <p className="text-sm font-extrabold text-zinc-900">
                Conecta por WhatsApp
              </p>
              <p className="text-xs text-zinc-600 font-medium">
                Habla directo con el hogar al {FOUNDATION_INFO.phoneDisplay}.
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
                  Opción para Empresas (NIT {FOUNDATION_INFO.nit}) y Familias
                </span>
                <h2 className="font-logo text-xl sm:text-2xl font-extrabold text-zinc-950">
                  ¿Prefieres apadrinar a los 22 niños juntos como Hogar Completo?
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleOpenStory(fullHomeStory)}
              className="w-full md:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-extrabold shrink-0 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Apadrinar Hogar Completo (22 Niños)
            </button>
          </div>
        </div>

        {/* View Toggle: Vista Completa (Los 22 Espacios) vs Vista Resumen (8 Destacadas) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => {
              setViewMode("espacios-22");
              setActiveCategory("Todas");
            }}
            className={`min-h-[52px] flex-1 px-5 py-3 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 border-2 transition-all cursor-pointer ${
              viewMode === "espacios-22"
                ? "bg-rose-600 border-rose-600 text-white shadow-[0_8px_24px_rgba(225,29,72,0.28)]"
                : "bg-white border-zinc-200 text-zinc-700 hover:bg-rose-50/60"
            }`}
          >
            <Smiley weight="fill" className="w-5 h-5 shrink-0" />
            <span>Todos los 22 Espacios (#01 al #22)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setViewMode("destacadas");
              setActiveCategory("Todas");
            }}
            className={`min-h-[52px] flex-1 px-5 py-3 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 border-2 transition-all cursor-pointer ${
              viewMode === "destacadas"
                ? "bg-indigo-600 border-indigo-600 text-white shadow-[0_8px_24px_rgba(79,70,229,0.28)]"
                : "bg-white border-zinc-200 text-zinc-700 hover:bg-indigo-50/60"
            }`}
          >
            <Sparkle weight="fill" className="w-5 h-5 shrink-0" />
            <span>Ver Solo 8 Historias Ejemplo</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filtrar historias por taller"
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
        >
          {STORY_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer border-2 ${
                  isActive
                    ? "bg-zinc-900 border-zinc-900 text-white shadow-sm"
                    : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Vibrant, Airy Story Cards Grid (Sin fotos en las tarjetas de los niños) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14"
        >
          <AnimatePresence mode="popLayout">
            {displayedCards.map((story, index) => {
              const palette =
                SPIRAL_COLOR_PALETTE[index % SPIRAL_COLOR_PALETTE.length];
              const IconComponent = STORY_ICONS[index % STORY_ICONS.length];
              const badgeNumber =
                story.id === "hogar-completo-22-ninos"
                  ? "Hogar Completo · 22 Niños"
                  : story.protectiveNote.includes("#")
                  ? story.protectiveNote
                  : `Niño / Niña #${String(index + 1).padStart(2, "0")} de 22`;

              return (
                <motion.article
                  layout
                  key={story.id}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
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
                        {badgeNumber}
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

                    {/* Story Title & Short 2-Sentence Story */}
                    <h3 className="font-logo text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
                      {story.name}
                    </h3>

                    <p className="text-base sm:text-lg leading-relaxed opacity-90 mb-4">
                      {story.shortStory}
                    </p>

                    {/* Highlighted Dream Box */}
                    <div
                      className={`rounded-2xl p-3.5 border mb-5 ${palette.dreamBox}`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wider opacity-75 block mb-0.5">
                        ✨ Su Gran Sueño
                      </span>
                      <p className="text-sm sm:text-base font-extrabold leading-snug">
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
                    <span>Apadrinar esta Historia</span>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Helper Banner on the /historias Page */}
        <div className="rounded-3xl bg-white border-2 border-amber-200 p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="font-logo text-2xl sm:text-3xl font-extrabold text-zinc-950 mb-2">
            ¿No sabes cuál de los 22 espacios elegir?
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 font-medium mb-6">
            Escríbenos directamente a nuestro WhatsApp en Marinilla y te ayudaremos a asignarte el niño o niña que más necesite un padrino o madrina hoy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={buildWhatsAppLink(
                "Hola Fundación Espirales de Vida, estoy viendo la página de las 22 historias y quiero que me orienten para apadrinar al niño o niña que más lo necesite hoy."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-extrabold shadow-md transition-all"
            >
              <WhatsappLogo weight="fill" className="w-5 h-5" />
              <span>Recibir Asesoría por WhatsApp</span>
            </a>

            {onGoToMetas && (
              <button
                type="button"
                onClick={onGoToMetas}
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-900 border-2 border-sky-200 text-sm sm:text-base font-extrabold transition-all cursor-pointer"
              >
                <span>Ver las 3 Metas del Hogar</span>
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

      {/* Super Clean, Kid-Friendly 3-Step Sponsorship Modal */}
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
                    <span>Espacio sin foto · Aquí lo más importante es su historia</span>
                  </span>
                  <h3
                    id="modal-story-title"
                    className="font-logo text-2xl sm:text-3xl font-extrabold text-zinc-950"
                  >
                    {selectedStory.name} ({selectedStory.age})
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
                    ✨ Su Gran Sueño:
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
                    Paso 1: ¿Cómo quieres ayudar hoy?
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
                      Paso 2: ¿Cómo te llamas?
                    </label>
                    <input
                      id="sponsor-name-input"
                      type="text"
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      placeholder="Escribe tu nombre o empresa"
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
                    Paso 3: Envía tu mensaje directo al WhatsApp del hogar en Marinilla
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
