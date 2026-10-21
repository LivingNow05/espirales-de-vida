import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  PhoneCall,
  IdentificationCard,
  CarProfile,
  CaretDown,
  WhatsappLogo,
  Copy,
  Check,
  ArrowUpRight,
  Question,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO, buildWhatsAppLink } from "../data/foundationData";

interface SimpleFaq {
  id: string;
  emoji: string;
  question: string;
  answer: string;
  badgeColor: string;
}

const SIMPLE_KIDS_FAQS: SimpleFaq[] = [
  {
    id: "faq-1",
    emoji: "📍",
    question: "¿Dónde queda la Fundación Espirales de Vida?",
    answer:
      "Estamos ubicados en la Vía El Peñol Km 10, en el municipio de Marinilla (Antioquia), donde viven y se forman nuestros 22 niños, niñas y adolescentes.",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
  },
  {
    id: "faq-2",
    emoji: "❤️",
    question: "¿En qué consiste el modelo de apadrinamiento?",
    answer:
      "Buscamos que las personas y empresas no solo donen un recurso, sino que se involucren acompañando el crecimiento de los niños con tiempo, guía y presencia.",
    badgeColor: "bg-rose-100 text-rose-900 border-rose-200",
  },
  {
    id: "faq-3",
    emoji: "🎒",
    question: "¿Cuáles son los 6 pilares de la Lista de Necesidades?",
    answer:
      "1. Kits Escolares (22 kits), 2. Kits de Aseo Personal, 3. Personal de Apoyo (salud, psicología, peluquería), 4. Infraestructura y Remodelación, 5. Habitaciones y Confort, y 6. Juguetería y Entretenimiento.",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-200",
  },
  {
    id: "faq-4",
    emoji: "🏢",
    question: "¿Cómo pueden sumarse empresas, directivos y colectivos?",
    answer:
      "Nuestra fundación cuenta con NIT oficial 900150558-5. Las empresas pueden aportar insumos, apoyar la remodelación de espacios, hacer voluntariado profesional o apadrinar a los 22 niños.",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
  },
  {
    id: "faq-5",
    emoji: "📞",
    question: "¿A qué números podemos comunicarnos para donar o visitar?",
    answer:
      "Puedes comunicarte a la línea de la fundación 313 652 5841 o a las líneas de la campaña Juntos por una Infancia con Amor: 302 832 5126 y 304 387 0899.",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
  },
];

export const SeoMedellinMarinillaSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>("faq-1");
  const [copiedData, setCopiedData] = useState<boolean>(false);

  // Simple 3-step form
  const [visitorName, setVisitorName] = useState<string>("");
  const [visitorCity, setVisitorCity] = useState<string>("Medellín");
  const [visitorTopic, setVisitorTopic] = useState<string>(
    "Quiero apadrinar o donar para los 22 niños"
  );

  const handleCopyInfo = () => {
    const textToCopy = `${FOUNDATION_INFO.name} · NIT: ${FOUNDATION_INFO.nit} · Dirección: ${FOUNDATION_INFO.address} · Tel: ${FOUNDATION_INFO.phoneDisplay}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 3000);
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameClean = visitorName.trim() || "Amigo Solidario";
    const msg = `Hola Fundación Espirales de Vida, soy ${nameClean} desde ${visitorCity}. ${visitorTopic}. ¿Me ayudan a coordinar en Marinilla?`;
    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contacto"
      className="relative py-16 sm:py-24 bg-[#FFFDF9] border-t border-amber-200/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple & Colorful Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-900 text-xs sm:text-sm font-bold mb-4">
            <MapPin weight="fill" className="w-4 h-4 text-sky-600" />
            <span>Medellín · Rionegro · Marinilla (Vía El Peñol Km 10)</span>
          </div>

          <h2 className="font-logo text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-3">
            ¿Dónde Estamos y Cómo Visitar Nuestro Hogar?
          </h2>
          <p className="text-sm sm:text-lg text-zinc-600">
            Nuestra puerta en <strong>Marinilla</strong> está abierta para familias, padrinos y empresas de Medellín y todo el Oriente Antioqueño.
          </p>
        </div>

        {/* 3 Colorful Top Cards: 1. ¿Dónde estamos?, 2. ¿Cómo llegar?, 3. Contacto y NIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: ¿Dónde estamos? */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-2 bg-emerald-500/12 ring-2 ring-emerald-300/80 flex flex-col"
          >
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-5 sm:p-6 flex flex-col h-full shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shadow-sm">
                  📍
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Nuestra Ubicación
                  </span>
                  <h3 className="font-logo text-xl font-bold text-zinc-900">
                    ¿Dónde estamos?
                  </h3>
                </div>
              </div>

              <div className="relative h-40 rounded-2xl overflow-hidden mb-4 border border-zinc-200">
                <img
                  src="/images/reales/casa-hogar-instalaciones.jpg"
                  alt="Casa de la Fundación Espirales de Vida en Vía El Peñol Km 10, Marinilla"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 right-3 text-xs font-bold text-white">
                  🏡 Vía El Peñol Km 10, Marinilla · A 40 min de Medellín
                </span>
              </div>

              <p className="text-sm text-zinc-700 leading-relaxed mb-4 flex-1">
                Vivimos en una casa campestre rodeada de naturaleza en{" "}
                <strong>{FOUNDATION_INFO.address}</strong>, donde los 22 niños crecen seguros y en paz.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["Marinilla", "Medellín", "Rionegro", "El Peñol", "Guarne"].map(
                  (place) => (
                    <span
                      key={place}
                      className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
                    >
                      {place}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Card 2: ¿Cómo llegar? (3 simple steps) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="rounded-3xl p-2 bg-sky-500/12 ring-2 ring-sky-300/80 flex flex-col"
          >
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-5 sm:p-6 flex flex-col h-full shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-lg font-bold shadow-sm">
                  🚗
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                    Ruta Fácil en 3 Pasos
                  </span>
                  <h3 className="font-logo text-xl font-bold text-zinc-900">
                    ¿Cómo llegar?
                  </h3>
                </div>
              </div>

              <div className="space-y-3 flex-1 mb-4">
                <div className="rounded-2xl bg-sky-50/80 border border-sky-200 p-3.5 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <p className="text-xs font-bold text-sky-950">
                      Desde Medellín (40 min)
                    </p>
                    <p className="text-xs text-zinc-700">
                      Toma el Túnel de Oriente o la Autopista Medellín · Bogotá hasta Marinilla.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-sky-50/80 border border-sky-200 p-3.5 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <p className="text-xs font-bold text-sky-950">
                      Desde Rionegro y Llanogrande (15 min)
                    </p>
                    <p className="text-xs text-zinc-700">
                      Conecta hacia Marinilla y toma la salida pavimentada rumbo a El Peñol.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-sky-50/80 border border-sky-200 p-3.5 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <p className="text-xs font-bold text-sky-950">
                      Kilómetro 10 Vía El Peñol
                    </p>
                    <p className="text-xs text-zinc-700">
                      Avanza 10 minutos desde Marinilla por la vía a El Peñol hasta nuestra sede campestre.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, quiero agendar una visita a la casa en Vía El Peñol Km 10, Marinilla. ¿Me comparten la ubicación por WhatsApp?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <CarProfile weight="fill" className="w-4 h-4" />
                <span>Pedir Ubicación por WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Card 3: Clean Contact & Legal NIT Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="rounded-3xl p-2 bg-rose-500/12 ring-2 ring-rose-300/80 flex flex-col"
          >
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-5 sm:p-6 flex flex-col h-full shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-lg font-bold shadow-sm">
                    📞
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                      Datos Oficiales
                    </span>
                    <h3 className="font-logo text-xl font-bold text-zinc-900">
                      Contacto y NIT
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyInfo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedData ? (
                    <>
                      <Check weight="bold" className="w-3.5 h-3.5 text-emerald-600" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy weight="bold" className="w-3.5 h-3.5 text-rose-600" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3 flex-1 mb-4">
                <div className="rounded-2xl bg-rose-50/70 border border-rose-200 p-3.5">
                  <p className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
                    <PhoneCall weight="fill" className="w-3.5 h-3.5" />
                    Teléfonos Oficiales y de Campaña
                  </p>
                  <p className="font-mono text-base sm:text-lg font-extrabold text-zinc-900 mt-0.5">
                    Fundación: {FOUNDATION_INFO.phoneDisplay}
                  </p>
                  <p className="font-mono text-xs sm:text-sm font-bold text-rose-800 mt-0.5">
                    Campaña: 302 832 5126 | 304 387 0899
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-3.5">
                  <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                    <IdentificationCard weight="fill" className="w-3.5 h-3.5" />
                    NIT Oficial (Certificados Tributarios)
                  </p>
                  <p className="font-mono text-lg font-extrabold text-zinc-900 mt-0.5">
                    NIT {FOUNDATION_INFO.nit}
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5">
                  <p className="text-[11px] font-bold text-zinc-600">
                    Dirección de la Casa Hogar
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 mt-0.5">
                    {FOUNDATION_INFO.address}
                  </p>
                </div>
              </div>

              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, me comunico al 313 652 5841 para apoyar a los 22 niños en Marinilla."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-colors"
              >
                <WhatsappLogo weight="fill" className="w-4 h-4" />
                <span>Hablar al {FOUNDATION_INFO.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Left = Quick 3-Field WhatsApp Box, Right = Simple 1-Sentence FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Quick 3-Step Message Card */}
          <div className="lg:col-span-5 rounded-3xl bg-white border-2 border-zinc-200/80 p-6 sm:p-7 shadow-xs">
            <h3 className="font-logo text-xl sm:text-2xl font-bold text-zinc-900 mb-1">
              💬 Escríbenos en 10 Segundos
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mb-5">
              Déjanos tu nombre y te abrimos el chat directo en WhatsApp ({FOUNDATION_INFO.phoneDisplay}).
            </p>

            <form onSubmit={handleQuickSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="simple-name"
                  className="block text-xs font-bold text-zinc-800 mb-1"
                >
                  1. ¿Cómo te llamas?
                </label>
                <input
                  id="simple-name"
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Tu nombre o el de tu empresa"
                  className="w-full rounded-xl bg-zinc-50 border-2 border-zinc-200 px-3.5 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="simple-city"
                  className="block text-xs font-bold text-zinc-800 mb-1"
                >
                  2. ¿Desde dónde nos escribes?
                </label>
                <select
                  id="simple-city"
                  value={visitorCity}
                  onChange={(e) => setVisitorCity(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border-2 border-zinc-200 px-3.5 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                >
                  <option value="Medellín">Medellín / Valle de Aburrá</option>
                  <option value="Marinilla">Marinilla</option>
                  <option value="Rionegro / Llanogrande">Rionegro / Llanogrande</option>
                  <option value="El Peñol / Oriente">El Peñol / Oriente Antioqueño</option>
                  <option value="Otra ciudad">Otra ciudad o exterior</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="simple-topic"
                  className="block text-xs font-bold text-zinc-800 mb-1"
                >
                  3. ¿Cómo te gustaría ayudar?
                </label>
                <select
                  id="simple-topic"
                  value={visitorTopic}
                  onChange={(e) => setVisitorTopic(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border-2 border-zinc-200 px-3.5 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                >
                  <option value="Quiero apadrinar o donar para los 22 niños">
                    ❤️ Apadrinar a un niño o al hogar
                  </option>
                  <option value="Quiero donar cobijas, pijamas, útiles o juguetes">
                    🛏️ Donar cobijas, pijamas, útiles o juguetes
                  </option>
                  <option value="Quiero apoyar el sueño del Parque Infantil">
                    🛝 Apoyar la construcción del Parque Infantil
                  </option>
                  <option value="Busco Alianza Empresarial RSE (NIT 900150558-5)">
                    🏢 Alianza Empresarial RSE (NIT 900150558-5)
                  </option>
                  <option value="Quiero visitar la fundación en Marinilla">
                    🏡 Agendar una visita a Marinilla
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 text-sm font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer active:scale-95 mt-2"
              >
                <WhatsappLogo weight="fill" className="w-5 h-5" />
                <span>Abrir WhatsApp Ahora</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Simple 1-Sentence FAQs */}
          <div className="lg:col-span-7 rounded-3xl bg-white border-2 border-zinc-200/80 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Question weight="fill" className="w-6 h-6 text-rose-600" />
              <h3 className="font-logo text-xl sm:text-2xl font-bold text-zinc-900">
                Preguntas Rápidas y Fáciles
              </h3>
            </div>

            <div className="space-y-2.5">
              {SIMPLE_KIDS_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border-2 transition-colors overflow-hidden ${
                      isOpen
                        ? "bg-amber-50/40 border-amber-300"
                        : "bg-zinc-50/70 border-zinc-200/80 hover:border-zinc-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? "" : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base shrink-0 ${faq.badgeColor}`}
                        >
                          {faq.emoji}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "bg-rose-600 text-white rotate-180"
                            : "bg-white text-zinc-600 border border-zinc-200"
                        }`}
                      >
                        <CaretDown weight="bold" className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm font-medium text-zinc-700 leading-relaxed border-t border-amber-200/60">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoMedellinMarinillaSection;
