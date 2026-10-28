import React from "react";
import { motion } from "motion/react";
import {
  Heart,
  ArrowRight,
  BookOpen,
  UsersThree,
  CheckCircle,
  HandHeart,
  ShieldCheck,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO } from "../data/foundationData";

export interface HomeStoriesPreviewSectionProps {
  onNavigateToStoriesPage: (initialStoryId?: string) => void;
}

const PREVIEW_SPACES = [
  {
    id: "espacio-nino-01",
    badge: "Niño / Niña #01 de 20",
    pillarTag: "4 Pilares · Albergue, Cuidado, Psicología y Educación",
    title: "Espacio #01 · Acompañar mi Crecimiento",
    description:
      "En Espirales de Vida encuentro un hogar seguro en Marinilla. Buscamos padrinos y madrinas que acompañen mi proceso brindando tiempo, guía, presencia y apoyo para mi formación.",
    highlight:
      "Apoyo integral: Kit Escolar + Kit de Aseo + Tiempo y Presencia",
    cardBg: "bg-rose-50 border-rose-200 text-rose-950",
    dashedBox: "border-rose-300 bg-white/90 text-rose-700",
    iconBadge: "bg-rose-100 text-rose-600 ring-rose-200",
    pillBadge: "bg-rose-600 text-white",
    dreamBox: "bg-white/90 border-rose-200 text-rose-900",
    buttonBg: "bg-rose-600 hover:bg-rose-700 text-white",
    icon: Heart,
  },
  {
    id: "espacio-nino-02",
    badge: "Niño / Niña #02 de 20",
    pillarTag: "4 Pilares · Albergue, Cuidado, Psicología y Educación",
    title: "Espacio #02 · Acompañar mi Crecimiento",
    description:
      "Un niño que se siente respaldado por una comunidad es un niño que crece invencible. Este espacio está abierto para conectar tu corazón o tu organización con mi futuro.",
    highlight:
      "Apoyo integral: Habitaciones y Confort + Educación + Guía",
    cardBg: "bg-sky-50 border-sky-200 text-sky-950",
    dashedBox: "border-sky-300 bg-white/90 text-sky-700",
    iconBadge: "bg-sky-100 text-sky-600 ring-sky-200",
    pillBadge: "bg-sky-600 text-white",
    dreamBox: "bg-white/90 border-sky-200 text-sky-900",
    buttonBg: "bg-sky-600 hover:bg-sky-700 text-white",
    icon: ShieldCheck,
  },
  {
    id: "espacio-nino-03",
    badge: "Niño / Niña #03 de 20",
    pillarTag: "4 Pilares · Albergue, Cuidado, Psicología y Educación",
    title: "Espacio #03 · Acompañar mi Crecimiento",
    description:
      "Más allá de lo material, promovemos un modelo de apadrinamiento donde personas y empresas se involucren en el bienestar, la alegría y los sueños de nuestros 20 niños.",
    highlight:
      "Apoyo integral: Recreación + Apoyo Psicosocial + Presencia",
    cardBg: "bg-emerald-50 border-emerald-200 text-emerald-950",
    dashedBox: "border-emerald-300 bg-white/90 text-emerald-700",
    iconBadge: "bg-emerald-100 text-emerald-600 ring-emerald-200",
    pillBadge: "bg-emerald-600 text-white",
    dreamBox: "bg-white/90 border-emerald-200 text-emerald-900",
    buttonBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
    icon: HandHeart,
  },
];

export const HomeStoriesPreviewSection: React.FC<HomeStoriesPreviewSectionProps> = ({
  onNavigateToStoriesPage,
}) => {
  return (
    <section
      id="historias"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#FFFDF9] via-rose-50/35 to-sky-50/30 relative border-t border-zinc-200/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header + Direct CTA to the Dedicated 20 Stories Page */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border-2 border-rose-300 text-rose-800 text-xs sm:text-sm font-extrabold mb-4">
              <Heart weight="fill" className="w-4 h-4 text-rose-600" />
              <span>Modelo de Apadrinamiento · Tiempo, Guía y Presencia</span>
            </div>

            <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.12] mb-3">
              Conecta tu corazón con el futuro de estos{" "}
              <span className="text-rose-600 underline decoration-amber-400 decoration-4 underline-offset-4">
                20 pequeños
              </span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
              Queremos que las empresas, padrinos y madrinas no solo donen un recurso, sino que se involucren: acompañando el crecimiento de nuestros 20 niños, niñas y adolescentes con <strong>tiempo, guía y presencia</strong>.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onNavigateToStoriesPage()}
              className="w-full sm:w-auto min-h-[56px] inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-base sm:text-lg font-extrabold shadow-[0_12px_28px_rgba(225,29,72,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              <BookOpen weight="fill" className="w-5 h-5 text-amber-300 shrink-0" />
              <span>Ver los 20 Espacios de Apadrinamiento</span>
              <ArrowRight weight="bold" className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>

        {/* 3 Preview Spaces (Clean, Photo-Free, Zero Invented Prices/Names) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {PREVIEW_SPACES.map((space, index) => {
            const IconComponent = space.icon;
            return (
              <motion.article
                key={space.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => onNavigateToStoriesPage(space.id)}
                className={`rounded-3xl border-2 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all cursor-pointer ${space.cardBg}`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold ${space.pillBadge}`}
                    >
                      {space.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 text-zinc-800 text-xs font-extrabold border border-black/10">
                      Marinilla
                    </span>
                  </div>

                  {/* Clean Photo-Free Story Space */}
                  <div
                    className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center mb-4 ${space.dashedBox}`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl ring-2 flex items-center justify-center mb-2 ${space.iconBadge}`}
                    >
                      <IconComponent weight="fill" className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-extrabold leading-snug">
                      Espacio sin foto · Su historia es lo importante
                    </p>
                    <span className="text-[11px] font-bold opacity-75 mt-0.5">
                      {space.pillarTag}
                    </span>
                  </div>

                  {/* Title & Official Description */}
                  <h3 className="font-logo text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
                    {space.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed opacity-90 mb-4">
                    {space.description}
                  </p>

                  {/* Highlight Box */}
                  <div
                    className={`rounded-2xl p-3.5 border mb-5 ${space.dreamBox}`}
                  >
                    <span className="text-xs font-extrabold uppercase tracking-wider opacity-75 block mb-0.5">
                      Cómo acompañas su vida
                    </span>
                    <p className="text-sm font-extrabold leading-snug">
                      {space.highlight}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToStoriesPage(space.id);
                  }}
                  className={`w-full min-h-[48px] px-5 py-3 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer ${space.buttonBg}`}
                >
                  <Heart weight="fill" className="w-4 h-4 shrink-0" />
                  <span>Apadrinar este Espacio</span>
                </button>
              </motion.article>
            );
          })}
        </div>

        {/* Dedicated CTA Portal Banner to open the full 20 Spaces Page */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl p-2 bg-gradient-to-r from-rose-500 via-amber-400 to-indigo-600 shadow-xl"
        >
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left max-w-2xl">
              <div className="w-16 h-16 rounded-3xl bg-rose-100 border-2 border-rose-200 text-rose-600 flex items-center justify-center shrink-0 shadow-xs">
                <UsersThree weight="fill" className="w-9 h-9" />
              </div>
              <div>
                <h3 className="font-logo text-2xl sm:text-3xl font-extrabold text-zinc-950 mb-2">
                  “Los 20 niños de Espirales de Vida en Marinilla no son invisibles”
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 font-medium leading-relaxed mb-3">
                  Entra a la página dedicada a los <strong>20 niños, niñas y adolescentes</strong> para elegir uno de los 20 espacios numerados o involucrar a tu empresa (NIT {FOUNDATION_INFO.nit}) con todo el hogar.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-bold text-zinc-700">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100">
                    <CheckCircle weight="fill" className="w-3.5 h-3.5 text-emerald-600" />
                    20 Espacios Limpios
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100">
                    <CheckCircle weight="fill" className="w-3.5 h-3.5 text-rose-600" />
                    Tiempo, Guía y Presencia
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100">
                    <CheckCircle weight="fill" className="w-3.5 h-3.5 text-sky-600" />
                    Empresas y Ciudadanos
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onNavigateToStoriesPage()}
                className="w-full lg:w-auto min-h-[58px] inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-lg font-extrabold shadow-[0_12px_30px_rgba(79,70,229,0.3)] active:scale-95 transition-all cursor-pointer"
              >
                <span>Abrir Página de los 20 Niños</span>
                <ArrowRight weight="bold" className="w-5 h-5 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateToStoriesPage("hogar-completo-20-ninos")}
                className="w-full lg:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs sm:text-sm font-extrabold transition-all cursor-pointer"
              >
                <Heart weight="fill" className="w-4 h-4 text-rose-600" />
                <span>Apadrinar el Hogar Completo (Empresas / Colectivos)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeStoriesPreviewSection;
