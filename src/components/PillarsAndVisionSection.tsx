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
import { ALUMNA_TESTIMONIAL } from "../data/foundationData";

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
    title: "Un Hogar Seguro",
    shortText:
      "Una casa campestre en Marinilla donde los 22 niños viven protegidos, tranquilos y rodeados de naturaleza las 24 horas.",
    realPhoto: "/images/reales/casa-hogar-instalaciones.jpg",
    photoCaption: "Nuestra casa en Vía El Peñol Km 10",
    tags: ["Techo cálido 24/7", "Ambiente familiar"],
    cardTheme: "bg-rose-50 border-rose-200 text-rose-950",
    badgeTheme: "bg-rose-600 text-white",
    tagTheme: "bg-white/90 text-rose-700 border-rose-200",
    icon: ShieldCheck,
  },
  {
    id: "cuidado-alimentacion",
    number: "Pilar 02",
    title: "Comida Rica y Cuidado",
    shortText:
      "Preparar juntos alimentos nutritivos, compartir helados y tener ropa abrigadora para crecer sanos y fuertes.",
    realPhoto: "/images/reales/tarde-de-helados.jpg",
    photoCaption: "Tarde de helados y sonrisas en casa",
    tags: ["Nutrición diaria", "Salud y bienestar"],
    cardTheme: "bg-amber-50 border-amber-200 text-amber-950",
    badgeTheme: "bg-amber-500 text-zinc-950",
    tagTheme: "bg-white/90 text-amber-900 border-amber-200",
    icon: Heart,
  },
  {
    id: "apoyo-psicosocial",
    number: "Pilar 03",
    title: "Escucha y Corazón Sano",
    shortText:
      "Círculos de la palabra, abrazos y apoyo psicológico para sanar la historia de cada niño y devolverle la confianza.",
    realPhoto: "/images/reales/circulo-de-la-palabra.jpg",
    photoCaption: "Círculo de reflexión y escucha",
    tags: ["Amor y psicología", "Confianza propia"],
    cardTheme: "bg-sky-50 border-sky-200 text-sky-950",
    badgeTheme: "bg-sky-600 text-white",
    tagTheme: "bg-white/90 text-sky-800 border-sky-200",
    icon: Sparkle,
  },
  {
    id: "educacion-futuro",
    number: "Pilar 04",
    title: "Educación y Sueños",
    shortText:
      "Ir al colegio, aprender bajo los árboles, pintar y descubrir talentos para construir una vida independiente.",
    realPhoto: "/images/reales/taller-pedagogico-arbol.jpg",
    photoCaption: "Taller pedagógico al aire libre",
    tags: ["Colegio y talleres", "Futuro brillante"],
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
        {/* Friendly, Clear Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 text-xs sm:text-sm font-extrabold mb-4">
            <Heart weight="fill" className="w-4 h-4 text-rose-500" />
            <span>¿Qué hacemos todos los días en Marinilla?</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.12] mb-4">
            4 pilares llenos de amor para{" "}
            <span className="text-rose-600">transformar vidas</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
            En Espirales de Vida acompañamos a 22 niños, niñas y adolescentes para que crezcan seguros, estudien felices y cumplan sus metas.
          </p>
        </div>

        {/* 4 Colorful Pillar Cards with 100% Real Photos */}
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
                  {/* Real Photo Header */}
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

                  {/* Title + Icon */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${pillar.badgeTheme}`}
                    >
                      <IconComponent weight="fill" className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Max 2 short sentences */}
                  <p className="text-base leading-relaxed opacity-90 mb-4">
                    {pillar.shortText}
                  </p>
                </div>

                {/* 2 Simple Colorful Chips */}
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

        {/* Real Testimony + Real Photo Banner (Easy to read & warm) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-indigo-50 border-2 border-indigo-200 p-5 sm:p-8 lg:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Real Photo Pair on Left */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 border-white shadow-sm">
                <img
                  src="/images/reales/sonrisa-confianza.jpg"
                  alt="Sonrisa y confianza en la Fundación Espirales de Vida"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl bg-white/95 text-zinc-900 text-[11px] font-extrabold text-center shadow-xs">
                  Amor y Confianza
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 border-white shadow-sm mt-4 sm:mt-6">
                <img
                  src="/images/reales/alegria-espontanea.jpg"
                  alt="Alegría de los niños en Marinilla"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl bg-white/95 text-zinc-900 text-[11px] font-extrabold text-center shadow-xs">
                  Alegría Verdadera
                </span>
              </div>
            </div>

            {/* Real Alumna Quote on Right */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-xs">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-extrabold">
                  <Heart weight="fill" className="w-4 h-4 text-rose-600" />
                  <span>Testimonio de una Ex-Beneficiaria</span>
                </span>
                <Quotes weight="fill" className="w-8 h-8 text-indigo-200 shrink-0" />
              </div>

              <blockquote className="text-lg sm:text-xl font-bold text-zinc-900 leading-relaxed mb-4">
                "{ALUMNA_TESTIMONIAL.quote}"
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
                      {ALUMNA_TESTIMONIAL.fullTestimony}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-zinc-900">
                    {ALUMNA_TESTIMONIAL.author}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                    Vivió 1 año en nuestro hogar de Marinilla cuando era niña
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullTestimony((prev) => !prev)}
                  className="min-h-[44px] px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-extrabold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{showFullTestimony ? "Ver menos" : "Leer historia completa"}</span>
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
      </div>
    </section>
  );
};

export default PillarsAndVisionSection;
