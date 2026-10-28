import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Heart,
  Sparkle,
  GraduationCap,
  Quotes,
  CaretDown,
  Camera,
  CheckCircle,
} from "@phosphor-icons/react";
import { CampaignNeedsBanner } from "./ThreeFrontsSection";

interface ColorfulPillarCard {
  id: string;
  number: string;
  title: string;
  shortText: string;
  realPhoto: string;
  photoCaption: string;
  tags: string[];
  cardTheme: string;
  badgeTheme: string;
  tagTheme: string;
  icon: React.ElementType;
}

const COLORFUL_PILLARS: ColorfulPillarCard[] = [
  {
    id: "albergue-seguro",
    number: "Pilar 01",
    title: "Albergue Seguro",
    shortText:
      "Un verdadero hogar y refugio en Marinilla donde los 20 niños, niñas y adolescentes se sienten protegidos todos los días.",
    realPhoto: "/images/reales/casa-hogar-instalaciones.jpg",
    photoCaption: "Nuestra casa en Vía El Peñol Km 10",
    tags: ["Hogar protegido", "Dignidad diaria"],
    cardTheme: "bg-rose-50 border-rose-200 text-rose-950",
    badgeTheme: "bg-rose-600 text-white",
    tagTheme: "bg-white/90 text-rose-700 border-rose-200",
    icon: ShieldCheck,
  },
  {
    id: "cuidado-alimentacion",
    number: "Pilar 02",
    title: "Cuidado Personal",
    shortText:
      "Alimentación, abrigo y atención cercana que garantiza su bienestar diario con un amor incalculable.",
    realPhoto: "/images/reales/tarde-de-helados.jpg",
    photoCaption: "Cuidado y alimentación diaria",
    tags: ["Alimentación", "Bienestar diario"],
    cardTheme: "bg-amber-50 border-amber-200 text-amber-950",
    badgeTheme: "bg-amber-500 text-zinc-950",
    tagTheme: "bg-white/90 text-amber-900 border-amber-200",
    icon: Heart,
  },
  {
    id: "apoyo-psicosocial",
    number: "Pilar 03",
    title: "Apoyo Psicosocial",
    shortText:
      "Ayuda psicológica y acompañamiento humano que sana las heridas de su historia y les devuelve la confianza.",
    realPhoto: "/images/reales/circulo-de-la-palabra.jpg",
    photoCaption: "Acompañamiento psicosocial",
    tags: ["Ayuda psicológica", "Confianza y paz"],
    cardTheme: "bg-sky-50 border-sky-200 text-sky-950",
    badgeTheme: "bg-sky-600 text-white",
    tagTheme: "bg-white/90 text-sky-800 border-sky-200",
    icon: Sparkle,
  },
  {
    id: "educacion-futuro",
    number: "Pilar 04",
    title: "Educación",
    shortText:
      "La herramienta más poderosa para que puedan soñar en grande y construir una vida independiente con mayores oportunidades.",
    realPhoto: "/images/reales/taller-pedagogico-arbol.jpg",
    photoCaption: "Formación integral en Marinilla",
    tags: ["Formación integral", "Vida independiente"],
    cardTheme: "bg-emerald-50 border-emerald-200 text-emerald-950",
    badgeTheme: "bg-emerald-600 text-white",
    tagTheme: "bg-white/90 text-emerald-800 border-emerald-200",
    icon: GraduationCap,
  },
];

export const PillarsAndVisionSection: React.FC = () => {
  const [showFullTestimony, setShowFullTestimony] = useState(false);

  return (
    <section
      id="mision"
      className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-zinc-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Friendly, Clear Section Header + Official Vision */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 text-xs sm:text-sm font-extrabold mb-4">
            <Heart weight="fill" className="w-4 h-4 text-rose-500" />
            <span>Un Refugio donde la Dignidad se Reconstruye Día a Día</span>
          </span>
          <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.12] mb-4">
            4 pilares fundamentales para su{" "}
            <span className="text-rose-600">desarrollo</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
            <strong>Visión:</strong> Brindar acompañamiento, educación y formación integral a niños, niñas y adolescentes en condición de vulnerabilidad o con experiencias de calle, entregándoles herramientas para construir una vida independiente y con mayores oportunidades.
          </p>
        </div>

        {/* 4 Colorful Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {COLORFUL_PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`rounded-3xl border-2 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all ${pillar.cardTheme}`}
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-white ring-1 ring-black/5">
                    <img
                      src={pillar.realPhoto}
                      alt={pillar.photoCaption}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-xs ${pillar.badgeTheme}`}
                      >
                        {pillar.number}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-zinc-900 text-[11px] font-bold shadow-xs">
                        <Camera weight="fill" className="w-3.5 h-3.5 text-rose-600" />
                        <span>Marinilla</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${pillar.badgeTheme}`}
                    >
                      <IconComponent weight="fill" className="w-5 h-5" />
                    </div>
                    <h3 className="font-logo text-xl font-extrabold tracking-tight leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-base leading-relaxed opacity-90 mb-4">
                    {pillar.shortText}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-black/10">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${pillar.tagTheme}`}
                    >
                      <CheckCircle weight="fill" className="w-3.5 h-3.5 shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Exact Alumna Testimony Word-for-Word */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-indigo-50 border-2 border-indigo-200 p-5 sm:p-8 lg:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 border-white shadow-sm">
                <img
                  src="/images/reales/sonrisa-confianza.jpg"
                  alt="Apoyo y amor en la Fundación Espirales de Vida"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl bg-white/95 text-zinc-900 text-[11px] font-extrabold text-center shadow-xs">
                  Apoyo y Amor
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 border-white shadow-sm mt-4 sm:mt-6">
                <img
                  src="/images/reales/alegria-espontanea.jpg"
                  alt="Tranquilidad y alegría en Marinilla"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl bg-white/95 text-zinc-900 text-[11px] font-extrabold text-center shadow-xs">
                  Tranquilidad
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-xs">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-extrabold">
                  <Heart weight="fill" className="w-4 h-4 text-rose-600" />
                  <span>Por qué escogimos a Espirales de Vida</span>
                </span>
                <Quotes weight="fill" className="w-8 h-8 text-indigo-200 shrink-0" />
              </div>

              <blockquote className="text-lg sm:text-xl font-bold text-zinc-900 leading-relaxed mb-4">
                “Quiero que escojan esta fundación, ya que yo estuve allí durante un año cuando era niña. Es un lugar hermoso en el cual me brindaron mucho apoyo, amor y tranquilidad, y deseo que más niños y niñas sigan beneficiándose de este espacio y de bellas personas que allí laboran.”
              </blockquote>

              <AnimatePresence initial={false}>
                {showFullTestimony && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 mt-3 border-t border-zinc-100 text-base text-zinc-700 leading-relaxed mb-3">
                      “Chicos, en el día de hoy quiero contarles un poco sobre la fundación escogida por mi equipo. De todas las fundaciones propuestas se escogió la mía. Esta se llama Espirales de Vida. Es una fundación que alberga 20 niños en condiciones de vulnerabilidad, las cuales les presta ayuda psicológica, alimentación y educación, entre otras.”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-zinc-900">
                    Testimonio de una Ex-Beneficiaria del Hogar
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                    Estuvo 1 año en la Fundación Espirales de Vida cuando era niña · Marinilla
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullTestimony((prev) => !prev)}
                  className="min-h-[44px] px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-extrabold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{showFullTestimony ? "Ver menos" : "Leer mensaje completo"}</span>
                  <CaretDown
                    weight="bold"
                    className={`w-4 h-4 transition-transform ${
                      showFullTestimony ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Campaña Oficial: Juntos por una Infancia con Amor (Lista de Necesidades y Pilares de Apoyo) */}
        <CampaignNeedsBanner />
      </div>
    </section>
  );
};

export default PillarsAndVisionSection;
