import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  X,
  CheckCircle,
  WhatsappLogo,
  Sparkle,
  UsersThree,
  ShieldCheck,
  HandHeart,
  PhoneCall,
  ArrowUpRight,
  MapPin,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO, buildWhatsAppLink } from "../data/foundationData";

export interface HeaderSponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStoriesPage?: () => void;
}

type TargetMode = "un-nino" | "toda-la-fundacion";

const PARTICIPATION_MODES = [
  {
    id: "padrino-integral",
    title: "Ser Padrino o Madrina (Tiempo, Guía y Presencia)",
    subtitle:
      "Acompañar el crecimiento de los niños brindándoles tiempo, guía, presencia y apoyo constante.",
    badge: "❤️ Apadrinamiento",
    icon: Heart,
  },
  {
    id: "donar-insumos-campana",
    title: "Donar Insumos de la Campaña Actual",
    subtitle:
      "Aportar en cualquiera de los 6 pilares: kits escolares, aseo, habitaciones, juguetes, salud o remodelación.",
    badge: "🎒 Campaña en Marinilla",
    icon: HandHeart,
  },
  {
    id: "empresa-voluntariado",
    title: "Vincular Empresa, Entidad o Voluntariado Profesional",
    subtitle:
      "Aliarse como organización (NIT 900150558-5) o aportar talento en salud, psicología, odontología o infraestructura.",
    badge: "🏢 Empresas y Aliados",
    icon: ShieldCheck,
  },
] as const;

const CAMPAIGN_PILLARS_OPTIONS = [
  "Kits Escolares",
  "Kits de Aseo Personal",
  "Personal de Apoyo (Salud y Bienestar)",
  "Infraestructura y Remodelación",
  "Habitaciones y Confort",
  "Juguetería y Entretenimiento",
] as const;

const CITIES = ["Medellín", "Marinilla", "Rionegro", "Otra ciudad"] as const;

export const HeaderSponsorModal: React.FC<HeaderSponsorModalProps> = ({
  isOpen,
  onClose,
  onNavigateToStoriesPage,
}) => {
  const [targetMode, setTargetMode] = useState<TargetMode>("un-nino");
  const [selectedChildNumber, setSelectedChildNumber] = useState<number | "asignar">(
    "asignar"
  );
  const [selectedParticipationId, setSelectedParticipationId] = useState<string>(
    "padrino-integral"
  );
  const [selectedPillars, setSelectedPillars] = useState<string[]>([
    "Kits Escolares",
    "Habitaciones y Confort",
  ]);
  const [sponsorName, setSponsorName] = useState<string>("");
  const [sponsorCity, setSponsorCity] = useState<string>("Medellín");
  const [customNote, setCustomNote] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const togglePillar = (pillar: string) => {
    setSelectedPillars((prev) =>
      prev.includes(pillar)
        ? prev.filter((item) => item !== pillar)
        : [...prev, pillar]
    );
  };

  const activeParticipation =
    PARTICIPATION_MODES.find((m) => m.id === selectedParticipationId) ||
    PARTICIPATION_MODES[0];

  const buildSponsorWhatsAppHref = () => {
    const cleanName = sponsorName.trim() || "Un aliado solidario";
    const targetDescription =
      targetMode === "toda-la-fundacion"
        ? "Toda la Fundación (Los 20 niños en Marinilla)"
        : selectedChildNumber === "asignar"
          ? "Uno de los 20 niños (asignar el niño o niña que más lo necesite)"
          : `Espacio del Niño / Niña #${String(selectedChildNumber).padStart(2, "0")} de 20`;

    const lines = [
      `Hola Fundación Espirales de Vida, soy *${cleanName}* y escribo desde *${sponsorCity}*.`,
      `Quiero sumarme desde el botón de Apadrinar de la página web:`,
      `• *A quién deseo apoyar:* ${targetDescription}`,
      `• *Modalidad elegida:* ${activeParticipation.title}`,
    ];

    if (selectedPillars.length > 0) {
      lines.push(`• *Pilares de interés:* ${selectedPillars.join(", ")}`);
    }

    if (customNote.trim()) {
      lines.push(`• *Nota adicional:* ${customNote.trim()}`);
    }

    lines.push(`¿Cómo podemos coordinar el siguiente paso?`);

    return buildWhatsAppLink(lines.join("\n"));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-zinc-950/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="header-sponsor-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-[2rem] bg-white border-2 border-rose-200 p-5 sm:p-7 lg:p-8 shadow-2xl my-auto max-h-[92dvh] overflow-y-auto"
          >
            {/* Top Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-zinc-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-extrabold mb-2">
                  <Heart weight="fill" className="w-3.5 h-3.5 text-rose-600" />
                  <span>Modelo de Apadrinamiento · Marinilla, Antioquia</span>
                </div>
                <h2
                  id="header-sponsor-modal-title"
                  className="font-logo text-2xl sm:text-3xl font-extrabold text-zinc-950 leading-tight"
                >
                  Apadrinar y Transformar Vidas
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">
                  “Un niño que se siente respaldado por una comunidad es un niño que crece invencible.”
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana de apadrinamiento"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* STEP 1: Target Selection (1 Child #01-#20 vs All 20 Children) */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <label className="text-sm sm:text-base font-extrabold text-zinc-900">
                    1. ¿A quién deseas apadrinar o respaldar hoy?
                  </label>
                  {onNavigateToStoriesPage && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateToStoriesPage();
                      }}
                      className="text-xs font-extrabold text-rose-600 hover:text-rose-700 underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver los 20 espacios</span>
                      <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setTargetMode("un-nino")}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                      targetMode === "un-nino"
                        ? "bg-rose-50/90 border-rose-500 text-rose-950 shadow-xs"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-rose-50/40"
                    }`}
                  >
                    <div>
                      <span className="font-logo text-base font-extrabold block">
                        ❤️ Apadrinar a un Niño o Niña
                      </span>
                      <span className="text-xs text-zinc-600 font-medium block mt-0.5">
                        Elige un espacio del #01 al #20 o permite que te asignemos quien más lo necesite.
                      </span>
                    </div>
                    <CheckCircle
                      weight="fill"
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        targetMode === "un-nino"
                          ? "text-rose-600"
                          : "text-zinc-300"
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetMode("toda-la-fundacion")}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                      targetMode === "toda-la-fundacion"
                        ? "bg-amber-50/90 border-amber-500 text-zinc-950 shadow-xs"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-amber-50/40"
                    }`}
                  >
                    <div>
                      <span className="font-logo text-base font-extrabold block">
                        🏡 Toda la Fundación (20 Niños)
                      </span>
                      <span className="text-xs text-zinc-600 font-medium block mt-0.5">
                        Ideal para empresas, colectivos, familias o donaciones generales al hogar.
                      </span>
                    </div>
                    <CheckCircle
                      weight="fill"
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        targetMode === "toda-la-fundacion"
                          ? "text-amber-600"
                          : "text-zinc-300"
                      }`}
                    />
                  </button>
                </div>

                {/* Quick Child Number Selector (#01 to #20) when "un-nino" is selected */}
                {targetMode === "un-nino" && (
                  <div className="rounded-2xl bg-rose-50/50 border border-rose-200/80 p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-extrabold text-rose-900">
                        Selecciona el espacio del niño/niña (#01 al #20):
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedChildNumber("asignar")}
                        className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                          selectedChildNumber === "asignar"
                            ? "bg-rose-600 text-white shadow-2xs"
                            : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-100"
                        }`}
                      >
                        ✨ Asignar quien más lo necesite
                      </button>
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                        const isSelectedNum = selectedChildNumber === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setSelectedChildNumber(num)}
                            className={`py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                              isSelectedNum
                                ? "bg-rose-600 text-white border-rose-600 shadow-2xs scale-105"
                                : "bg-white text-zinc-700 border-rose-200/80 hover:border-rose-400 hover:text-rose-700"
                            }`}
                          >
                            #{String(num).padStart(2, "0")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 2: How do you want to participate? */}
              <div>
                <label className="block text-sm sm:text-base font-extrabold text-zinc-900 mb-2.5">
                  2. ¿Cómo te gustaría vincularte?
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {PARTICIPATION_MODES.map((mode) => {
                    const isSelected = selectedParticipationId === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSelectedParticipationId(mode.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-rose-600 border-rose-600 text-white shadow-sm"
                            : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-rose-50/40"
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {mode.badge}
                            </span>
                            <span className="font-logo text-base font-extrabold">
                              {mode.title}
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 font-medium ${
                              isSelected ? "text-rose-50" : "text-zinc-600"
                            }`}
                          >
                            {mode.subtitle}
                          </p>
                        </div>
                        <CheckCircle
                          weight="fill"
                          className={`w-5 h-5 shrink-0 ${
                            isSelected ? "text-white" : "text-zinc-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Quick Multi-Select Pillars */}
                <div className="mt-3 rounded-2xl bg-amber-50/70 border border-amber-200 p-3.5">
                  <span className="text-xs font-extrabold text-zinc-800 block mb-2">
                    <Sparkle
                      weight="fill"
                      className="w-3.5 h-3.5 text-rose-600 inline mr-1"
                    />
                    ¿Qué pilares de apoyo te interesan más? (Puedes elegir varios):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {CAMPAIGN_PILLARS_OPTIONS.map((pillar) => {
                      const active = selectedPillars.includes(pillar);
                      return (
                        <button
                          key={pillar}
                          type="button"
                          onClick={() => togglePillar(pillar)}
                          className={`px-3 py-1.5 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
                            active
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                              : "bg-white text-zinc-700 border-amber-300 hover:bg-amber-100/60"
                          }`}
                        >
                          {active ? `✓ ${pillar}` : `+ ${pillar}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 3: Name, City & Optional Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="header-sponsor-name"
                    className="block text-sm font-extrabold text-zinc-900 mb-1.5"
                  >
                    3. Tu nombre o empresa
                  </label>
                  <input
                    id="header-sponsor-name"
                    type="text"
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    placeholder="Ej. María Gómez / Empresa Aliada"
                    className="min-h-[46px] w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border-2 border-zinc-200 text-sm sm:text-base font-semibold text-zinc-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                  />
                </div>

                <div>
                  <span className="block text-sm font-extrabold text-zinc-900 mb-1.5">
                    ¿Desde dónde nos apoyas?
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CITIES.map((city) => {
                      const activeCity = sponsorCity === city;
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => setSponsorCity(city)}
                          className={`min-h-[42px] px-2.5 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all cursor-pointer ${
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

              {/* Optional short message */}
              <div>
                <label
                  htmlFor="header-sponsor-note"
                  className="block text-xs sm:text-sm font-extrabold text-zinc-700 mb-1.5"
                >
                  Mensaje o detalle opcional (insumos, visita a Marinilla, voluntariado):
                </label>
                <input
                  id="header-sponsor-note"
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Ej. Quiero apadrinar y llevar útiles escolares este fin de semana"
                  className="min-h-[44px] w-full px-4 py-2 rounded-2xl bg-zinc-50 border-2 border-zinc-200 text-sm font-medium text-zinc-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              {/* Direct WhatsApp Submit & Official Phones */}
              <div className="pt-2 border-t border-zinc-100">
                <a
                  href={buildSponsorWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[56px] w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base sm:text-lg font-extrabold active:scale-98 transition-all shadow-[0_10px_28px_rgba(5,150,105,0.3)]"
                >
                  <WhatsappLogo weight="fill" className="w-6 h-6 text-white shrink-0" />
                  <span>Confirmar y Hablar por WhatsApp</span>
                </a>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-zinc-600">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100">
                    <PhoneCall weight="fill" className="w-3.5 h-3.5 text-rose-600" />
                    Campaña: 302 832 5126 | 304 387 0899
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100">
                    <PhoneCall weight="fill" className="w-3.5 h-3.5 text-emerald-600" />
                    Fundación: {FOUNDATION_INFO.phoneDisplay}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100">
                    <MapPin weight="fill" className="w-3.5 h-3.5 text-sky-600" />
                    Vía El Peñol Km 10 · Marinilla
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderSponsorModal;
