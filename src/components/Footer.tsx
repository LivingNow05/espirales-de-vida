import React from "react";
import {
  Heart,
  MapPin,
  PhoneCall,
  IdentificationCard,
  ArrowUpRight,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { FOUNDATION_INFO, buildWhatsAppLink } from "../data/foundationData";

export interface FooterProps {
  onNavigateHomeSection?: (sectionHash?: string) => void;
  onNavigateToStoriesPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHomeSection,
  onNavigateToStoriesPage,
}) => {
  const currentYear = new Date().getFullYear();

  const handleHomeLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (onNavigateHomeSection) {
      e.preventDefault();
      onNavigateHomeSection(hash);
    }
  };

  const handleStoriesLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateToStoriesPage) {
      e.preventDefault();
      onNavigateToStoriesPage();
    }
  };

  return (
    <footer className="bg-zinc-900 text-zinc-200 border-t border-zinc-800 pb-28 lg:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16">
        {/* Vibrant Closing Callout Card with Group Photo */}
        <div className="rounded-3xl p-2 bg-gradient-to-r from-rose-500/30 via-amber-500/25 to-emerald-500/30 ring-1 ring-white/15 mb-12">
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-zinc-950/90 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left max-w-2xl">
              <img
                src="/images/reales/comunidad-equipo-hogar.jpg"
                alt="Familia de la Fundación Espirales de Vida en Marinilla"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-rose-500/60 shrink-0 shadow-md"
                loading="lazy"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-2">
                  <Heart weight="fill" className="w-3.5 h-3.5 text-rose-400" />
                  <span>20 Corazones en Marinilla, Antioquia</span>
                </div>
                <p className="font-logo text-lg sm:text-2xl font-bold text-white leading-snug mb-2">
                  “Los 20 niños de Espirales de Vida no son invisibles: hoy sus sueños están en nuestras manos.”
                </p>
                <p className="text-xs sm:text-sm text-zinc-400">
                  NIT {FOUNDATION_INFO.nit} · {FOUNDATION_INFO.address} · Tel:{" "}
                  {FOUNDATION_INFO.phoneDisplay}
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="/historias"
                onClick={handleStoriesLink}
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 text-sm sm:text-base font-bold transition-all active:scale-95"
              >
                <Heart weight="fill" className="w-4 h-4 text-rose-400" />
                <span>Ver las 20 Historias</span>
              </a>

              <a
                href={buildWhatsAppLink(
                  "Hola Fundación Espirales de Vida, quiero apadrinar o hacer mi aporte hoy para los 20 niños en Marinilla."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-full bg-rose-600 hover:bg-rose-500 text-white px-6 py-3.5 text-sm sm:text-base font-bold transition-all shadow-lg shadow-rose-600/30 active:scale-95"
              >
                <WhatsappLogo weight="fill" className="w-5 h-5" />
                <span>Apadrinar por WhatsApp</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Simple 3-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-800">
          {/* Column 1: Brand */}
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => handleHomeLink(e, "#inicio")}
              className="inline-flex items-center gap-3 mb-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-xs shrink-0">
                <img
                  src="/brand/isotipo-espirales-hd.png"
                  alt="Isotipo Fundación Espirales de Vida HD"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <img
                  src="/brand/wordmark-blanco-hd.png"
                  alt={FOUNDATION_INFO.name}
                  className="h-8 w-auto object-contain object-left mb-1"
                />
                <span className="block text-xs text-rose-400 font-bold">
                  NIT {FOUNDATION_INFO.nit} · Marinilla, Antioquia
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
              Hogar, protección, educación y amor diario para 20 niños, niñas y adolescentes en la Vía El Peñol Km 10, Marinilla.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Secciones Rápidas
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-medium">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleHomeLink(e, "#inicio")}
                  className="hover:text-rose-400 transition-colors"
                >
                  🏠 Inicio y Hogar
                </a>
              </li>
              <li>
                <a
                  href="#mision"
                  onClick={(e) => handleHomeLink(e, "#mision")}
                  className="hover:text-rose-400 transition-colors"
                >
                  ✨ Nuestros 4 Pilares
                </a>
              </li>
              <li>
                <a
                  href="/historias"
                  onClick={handleStoriesLink}
                  className="hover:text-rose-400 transition-colors font-bold text-rose-300"
                >
                  ❤️ Página de las 20 Historias
                </a>
              </li>
              <li>
                <a
                  href="#frentes"
                  onClick={(e) => handleHomeLink(e, "#frentes")}
                  className="hover:text-rose-400 transition-colors"
                >
                  🛝 Las 3 Metas y el Parque
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  onClick={(e) => handleHomeLink(e, "#galeria")}
                  className="hover:text-rose-400 transition-colors"
                >
                  📷 Galería de Fotos
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => handleHomeLink(e, "#contacto")}
                  className="hover:text-rose-400 transition-colors"
                >
                  📍 Cómo Llegar y NIT
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Data */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Datos Oficiales
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <IdentificationCard weight="fill" className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>NIT:</strong> <span>{FOUNDATION_INFO.nit}</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin weight="fill" className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Sede:</strong> {FOUNDATION_INFO.address}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall weight="fill" className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block">
                    <strong>Fundación:</strong>{" "}
                    <a
                      href={buildWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-rose-400 hover:underline"
                    >
                      +57 {FOUNDATION_INFO.phoneDisplay}
                    </a>
                  </span>
                  <span className="block text-xs text-zinc-400 mt-0.5">
                    Campaña: 302 832 5126 | 304 387 0899
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500 text-center sm:text-left">
          <p>
            © {currentYear} {FOUNDATION_INFO.name} · NIT {FOUNDATION_INFO.nit} · Marinilla, Antioquia.
          </p>
          <p>
            Puente solidario entre Medellín, Rionegro y el Oriente Antioqueño.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
