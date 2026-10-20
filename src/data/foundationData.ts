/**
 * Datos oficiales, historias de los 22 niños y galería fotográfica real
 * de la Fundación Espirales de Vida · NIT 900150558-5 · Vía El Peñol Km 10, Marinilla, Antioquia.
 * Lenguaje claro, cálido y sencillo para que cualquier persona, desde un niño de 9 años hasta un empresario,
 * comprenda cómo ayudar hoy mismo.
 */

export type StoryCategory =
  | "Todas"
  | "Arte y Creatividad"
  | "Música y Expresión"
  | "Deporte y Trabajo en Equipo"
  | "Lectura y Ciencia"
  | "Naturaleza y Oficios"
  | "Hogar Completo (22 Niños)";

export type StoryColorTheme = "rose" | "sky" | "emerald" | "indigo" | "amber";

export interface FoundationInfo {
  name: string;
  nit: string;
  address: string;
  municipality: string;
  department: string;
  region: string;
  country: string;
  phoneRaw: string;
  phoneDisplay: string;
  whatsappBaseUrl: string;
  totalChildren: number;
  vision: string;
  missionIntro: string;
  closingManifesto: string;
  slogan: string;
  heroRealImage: string;
  communityRealImage: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  areasServed: string[];
  // PascalCase aliases for flexible consumption across components
  Name: string;
  NIT: string;
  Address: string;
  PhoneRaw: string;
  PhoneDisplay: string;
  TotalChildren: number;
  Vision: string;
  MissionIntro: string;
}

export interface AlumnaTestimonial {
  quote: string;
  author: string;
  role: string;
  context: string;
  fullTestimony: string;
  yearDuration: string;
  location: string;
  realPhoto: string;
  // PascalCase aliases
  Quote: string;
  Author: string;
  Role: string;
  Context: string;
}

export interface FoundationPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  impactMetric: string;
  highlights: string[];
  iconName: "ShieldCheck" | "Heart" | "Sparkle" | "GraduationCap";
  realImage: string;
}

export interface UrgentNeedItem {
  name: string;
  quantityNeeded: string;
  priority: "Alta" | "Urgente" | "Meta Colectiva";
  detail: string;
}

export interface CampaignFront {
  id: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  fallbackImage: string;
  progressPercentage: number;
  currentMetric: string;
  targetMetric: string;
  urgentItems: UrgentNeedItem[];
  howToDonate: string;
  corporateRseNote: string;
  whatsappMessage: string;
}

export interface ChildStoryProfile {
  id: string;
  slotNumber?: number;
  colorTheme?: StoryColorTheme;
  isEmptyTemplate?: boolean;
  title?: string;
  name: string;
  protectiveNote: string;
  age: string;
  ageYears: number;
  category: Exclude<StoryCategory, "Todas">;
  image: string;
  shortStory: string;
  fullStory: string;
  dream: string;
  favoriteWorkshop: string;
  pillarsImpact: string[];
  needsList: string[];
  monthlySponsorshipCOP: number;
  monthlySponsorshipFormatted: string;
  timeCommitmentSuggestion: string;
  whatsappMessage: string;
}

export interface SponsorshipModel {
  id: string;
  badge: string;
  title: string;
  targetAudience: string;
  subtitle: string;
  description: string;
  suggestedContribution: string;
  commitmentType: string;
  benefits: string[];
  taxBenefitNote?: string;
  ctaLabel: string;
  whatsappMessage: string;
  featured: boolean;
}

export interface LocalSeoFaq {
  id: string;
  question: string;
  answer: string;
  category: "Apadrinamiento" | "Empresas y RSE" | "Donaciones en Especie" | "Ubicación y Visitas";
}

export interface RealGalleryPhoto {
  id: string;
  src: string;
  image: string;
  dscCode: string;
  rawDscPath: string;
  title: string;
  caption: string;
  description: string;
  alt: string;
  category:
    | "Hogar y Comunidad"
    | "Arte y Alegría"
    | "Parque y Recreación"
    | "Talleres y Aprendizaje"
    | "Instalaciones Marinilla";
  featured?: boolean;
}

const VISION_TEXT =
  "Cuidamos, educamos y acompañamos con amor a 22 niños, niñas y jóvenes que han vivido momentos difíciles. Les damos las herramientas para que crezcan seguros, estudien y cumplan sus sueños.";

const MISSION_INTRO_TEXT =
  "En Marinilla, Antioquia, existe una casa llena de vida llamada Fundación Espirales de Vida. Aquí viven 22 niños, niñas y jóvenes que antes pasaron por momentos duros, pero que hoy tienen una cama calientica, comida rica, colegio y personas que los quieren y los cuidan todos los días.";

export const FOUNDATION_INFO: FoundationInfo = {
  name: "Fundación Espirales de Vida",
  nit: "900150558-5",
  address: "Vía El Peñol Km 10, Marinilla, Antioquia",
  municipality: "Marinilla",
  department: "Antioquia",
  region: "Oriente Antioqueño y Valle de Aburrá (Medellín)",
  country: "Colombia",
  phoneRaw: "573136525841",
  phoneDisplay: "313 652 5841",
  whatsappBaseUrl: "https://wa.me/573136525841",
  totalChildren: 22,
  vision: VISION_TEXT,
  missionIntro: MISSION_INTRO_TEXT,
  closingManifesto:
    "Cambiar una vida es más fácil cuando lo hacemos juntos. Los 22 niños de Espirales de Vida en Marinilla tienen grandes sueños y hoy tú puedes ser parte de su familia de apoyo.",
  slogan: "Un hogar donde 22 niños vuelven a sonreír y a soñar",
  heroRealImage: "/images/reales/comunidad-equipo-hogar.jpg",
  communityRealImage: "/images/reales/circulo-integracion-campestre.jpg",
  coordinates: {
    lat: 6.1736,
    lng: -75.2892,
  },
  areasServed: [
    "Marinilla",
    "Medellín",
    "Rionegro",
    "El Peñol",
    "Guarne",
    "El Retiro",
    "La Ceja",
    "Oriente Antioqueño",
  ],
  Name: "Fundación Espirales de Vida",
  NIT: "900150558-5",
  Address: "Vía El Peñol Km 10, Marinilla, Antioquia",
  PhoneRaw: "573136525841",
  PhoneDisplay: "313 652 5841",
  TotalChildren: 22,
  Vision: VISION_TEXT,
  MissionIntro: MISSION_INTRO_TEXT,
};

export const ALUMNA_TESTIMONIAL: AlumnaTestimonial = {
  quote:
    "Yo viví allí durante un año cuando era niña. Es un lugar hermoso donde me dieron mucho apoyo, amor y tranquilidad. Mi mayor deseo es que más niños y niñas sigan recibiendo el cariño de las bellas personas que cuidan este hogar.",
  author: "Ex-beneficiaria y Embajadora de la Causa",
  role: "Vivió 1 año en la Fundación Espirales de Vida cuando era niña · Marinilla, Antioquia",
  context:
    "Escogimos apoyar a Espirales de Vida porque sabemos de verdad cómo este hogar abraza y cambia la vida de cada niño que llega.",
  fullTestimony:
    "De todas las fundaciones propuestas se escogió la mía: Espirales de Vida. Es una casa hogar que cuida a 22 niños que necesitan protección, dándoles cariño, ayuda psicológica, comida rica y estudio. Quiero que todos apoyemos esta fundación porque yo viví allí un año cuando era niña. Es un lugar hermoso donde me dieron mucho amor y paz.",
  yearDuration: "1 año viviendo en el hogar durante su infancia",
  location: "Marinilla, Antioquia",
  realPhoto: "/images/reales/sonrisa-confianza.jpg",
  Quote:
    "Yo viví allí durante un año cuando era niña. Es un lugar hermoso donde me dieron mucho apoyo, amor y tranquilidad. Mi mayor deseo es que más niños y niñas sigan recibiendo el cariño de las bellas personas que cuidan este hogar.",
  Author: "Ex-beneficiaria y Embajadora de la Causa",
  Role: "Vivió 1 año en la Fundación Espirales de Vida cuando era niña · Marinilla, Antioquia",
  Context:
    "Escogimos apoyar a Espirales de Vida porque sabemos de verdad cómo este hogar abraza y cambia la vida de cada niño que llega.",
};

export const FOUR_PILLARS: FoundationPillar[] = [
  {
    id: "albergue-seguro",
    number: "01",
    title: "Un Hogar Seguro",
    subtitle: "Cuidado y paz día y noche en Marinilla",
    description:
      "Una casa en el campo donde los 22 niños duermen tranquilos, juegan al aire libre y se sienten cuidados las 24 horas del día.",
    impactMetric: "22 niños y jóvenes bajo un techo seguro",
    highlights: [
      "Casa rodeada de naturaleza en la Vía El Peñol Km 10",
      "Educadores y cuidadores cariñosos día y noche",
      "Habitaciones tranquilas donde todos se sienten en familia",
    ],
    iconName: "ShieldCheck",
    realImage: "/images/reales/casa-hogar-instalaciones.jpg",
  },
  {
    id: "cuidado-personal-alimentacion",
    number: "02",
    title: "Comida Rica y Abrigo",
    subtitle: "Salud, ropa limpia y descanso calientico",
    description:
      "Comida preparada en casa con mucho cariño, ropa abrigada para el frío de Marinilla y todo lo necesario para estar sanos y limpios.",
    impactMetric: "3 comidas ricas + 2 algo diarios para cada niño",
    highlights: [
      "Alimentos frescos y nutritivos todos los días",
      "Pijamas, cobijas calienticas y útiles de aseo personal",
      "Visitas al médico, al odontólogo y mucho cuidado diario",
    ],
    iconName: "Heart",
    realImage: "/images/reales/fraternidad-compartir.jpg",
  },
  {
    id: "apoyo-psicosocial",
    number: "03",
    title: "Corazón Contento",
    subtitle: "Escucha y cariño para volver a confiar",
    description:
      "Psicólogos y profes que escuchan a cada niño con paciencia. Les ayudan a sanar la tristeza y a descubrir lo valiosos que son.",
    impactMetric: "Los 22 niños reciben apoyo emocional y escucha diaria",
    highlights: [
      "Espacios para hablar, dibujar y expresar lo que sienten",
      "Juegos en grupo que enseñan a respetar y a tener buenos amigos",
      "Cariño verdadero para que ningún niño se sienta solo",
    ],
    iconName: "Sparkle",
    realImage: "/images/reales/sonrisa-confianza.jpg",
  },
  {
    id: "educacion-y-futuro",
    number: "04",
    title: "Estudio, Arte y Sueños",
    subtitle: "Aprender cosas nuevas para tener un gran futuro",
    description:
      "Ir al colegio, hacer las tareas acompañados y disfrutar talleres de pintura, música, lectura, deporte y huerta para preparar su futuro.",
    impactMetric: "Colegio + talleres de arte, deporte y oficios",
    highlights: [
      "Ayuda todas las tardes con las tareas del colegio",
      "Actividades de pintura, cuentos, música y juegos al aire libre",
      "Enseñanzas prácticas para que cuando sean grandes salgan adelante",
    ],
    iconName: "GraduationCap",
    realImage: "/images/reales/taller-pedagogico-arbol.jpg",
  },
];

export const THREE_CAMPAIGN_FRONTS: CampaignFront[] = [
  {
    id: "frente-dignidad-diaria",
    number: "Frente 01",
    badge: "Ayuda Inmediata · 22 Niños",
    title: "Noches Calienticas y Cuidado Diario",
    subtitle: "Cobijas, pijamas y kits de aseo para los 22 niños",
    description:
      "En Marinilla hace frío por las noches. Por eso necesitamos cobijas gruesas, pijamas suaves y kits de aseo (cepillo de dientes, crema, jabón y champú) para que los 22 niños duerman calienticos y se cuiden todos los días.",
    image: "/images/reales/comunidad-equipo-hogar.jpg",
    fallbackImage: "/images/reales/fraternidad-compartir.jpg",
    progressPercentage: 45,
    currentMetric: "10 de 22 kits completos ya fueron entregados",
    targetMetric: "Meta: 22 kits completos de abrigo y aseo",
    urgentItems: [
      {
        name: "Cobijas térmicas y abrigadoras",
        quantityNeeded: "22 cobijas nuevas",
        priority: "Urgente",
        detail: "Para abrigar a los niños en las noches frías y lluviosas de Marinilla.",
      },
      {
        name: "Pijamas cómodas y calienticas",
        quantityNeeded: "44 pijamas (2 para cada niño)",
        priority: "Urgente",
        detail: "Tallas desde los 6 hasta los 16 años para niños, niñas y jóvenes.",
      },
      {
        name: "Kits de aseo personal",
        quantityNeeded: "22 kits cada mes",
        priority: "Alta",
        detail: "Cepillo y crema de dientes, jabón, champú, desodorante y toallas suaves.",
      },
    ],
    howToDonate:
      "Puedes llevar las cobijas, pijamas o kits de aseo a la fundación en Marinilla, entregarlos en Medellín o hacer un aporte en dinero para comprarlos.",
    corporateRseNote:
      "Es una campaña hermosa y muy fácil para hacer entre compañeros de oficina, colegios o grupos de amigos en Medellín y el Oriente Antioqueño.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero ayudar en el Frente 1 (cobijas, pijamas y kits de aseo para los 22 niños en Marinilla). ¿Cómo podemos coordinar?",
  },
  {
    id: "frente-desarrollo-parque",
    number: "Frente 02",
    badge: "Gran Sueño del Hogar · Jugar y Aprender",
    title: "Útiles, Juguetes y Nuestro Parque Infantil",
    subtitle: "Cuadernos para estudiar y un parque seguro para jugar",
    description:
      "Queremos que los 22 niños tengan sus cuadernos y colores para el colegio, juguetes para divertirse y cumplir nuestro gran sueño: renovar y construir un Parque Infantil hermoso y seguro dentro de la casa hogar.",
    image: "/images/reales/parque-actual-marinilla.jpg",
    fallbackImage: "/images/reales/parque-juegos-detalle.jpg",
    progressPercentage: 32,
    currentMetric: "Avance del 32% para hacer realidad el parque y los kits",
    targetMetric: "Meta: 1 Parque Infantil renovado + 22 Kits Escolares",
    urgentItems: [
      {
        name: "Mejora y construcción del Parque Infantil",
        quantityNeeded: "1 zona de juegos segura al aire libre",
        priority: "Meta Colectiva",
        detail: "Columpios firmes, resbaladero, pasamanos y pintura alegre en el jardín de la fundación.",
      },
      {
        name: "Morrales con útiles escolares y pinturas",
        quantityNeeded: "22 morrales completos",
        priority: "Alta",
        detail: "Cuadernos, lápices, colores, témperas, pinceles, reglas y zapatos para ir a estudiar.",
      },
      {
        name: "Balones, juegos de mesa y cuentos",
        quantityNeeded: "Dotación para las tardes de juego",
        priority: "Alta",
        detail: "Balones de fútbol, juegos para compartir en grupo, instrumentos musicales y libros.",
      },
    ],
    howToDonate:
      "Tu familia o tu empresa pueden donar útiles y juguetes, o apadrinar la mejora del Parque Infantil en Marinilla.",
    corporateRseNote:
      "Entregamos certificado de donación (NIT 900150558-5) e invitamos a tu equipo a un día alegre de juegos e inauguración con los niños.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, queremos apoyar el Frente 2 (útiles escolares, juguetes y el sueño del Parque Infantil en Marinilla). ¿Cómo nos sumamos?",
  },
  {
    id: "frente-infraestructura",
    number: "Frente 03",
    badge: "Una Casa Más Bonita · Sede Km 10",
    title: "Mejorar las Habitaciones y Salones",
    subtitle: "Pintura, techos sin goteras, camas cómodas y agua calientica",
    description:
      "La casa donde viven los 22 niños en la Vía El Peñol Km 10 necesita arreglos importantes: pintar paredes, arreglar techos para que no entre la humedad, renovar camas y asegurar duchas con agua caliente.",
    image: "/images/reales/casa-hogar-instalaciones.jpg",
    fallbackImage: "/images/reales/circulo-integracion-campestre.jpg",
    progressPercentage: 38,
    currentMetric: "Lista de arreglos lista · 38% de materiales conseguidos",
    targetMetric: "Meta: Habitaciones, baños y salones renovados",
    urgentItems: [
      {
        name: "Pintura y arreglo de techos y paredes",
        quantityNeeded: "Arreglo de habitaciones y comedor",
        priority: "Urgente",
        detail: "Quitar la humedad y pintar con colores alegres los cuartos donde duermen los 22 niños.",
      },
      {
        name: "Camas, colchones cómodos y mesas de estudio",
        quantityNeeded: "12 puestos nuevos de descanso y tareas",
        priority: "Alta",
        detail: "Colchones firmes, buena luz y mesas cómodas para leer y hacer las tareas.",
      },
      {
        name: "Arreglo de baños y duchas de agua caliente",
        quantityNeeded: "Mejora de los baños del hogar",
        priority: "Urgente",
        detail: "Para que todos los niños se bañen con agua calientica en las mañanas frías de Marinilla.",
      },
    ],
    howToDonate:
      "Recibimos pintura, materiales de ferretería, colchones, ayuda de maestros de obra o aportes en dinero para hacer estos arreglos.",
    corporateRseNote:
      "Invitamos a ferreterías, constructoras y empresas de Medellín y el Oriente Antioqueño a apadrinar el arreglo de un salón o habitación.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, queremos apoyar el Frente 3 (arreglos de habitaciones, pintura y baños en la casa hogar de Marinilla).",
  },
];

export const STORY_CATEGORIES: StoryCategory[] = [
  "Todas",
  "Arte y Creatividad",
  "Música y Expresión",
  "Deporte y Trabajo en Equipo",
  "Lectura y Ciencia",
  "Naturaleza y Oficios",
  "Hogar Completo (22 Niños)",
];

/**
 * Los 22 espacios de historias de los niños de la Fundación Espirales de Vida.
 * REGLA FUNDAMENTAL: Ninguna tarjeta de niño lleva fotografía (image: "").
 * Protegemos su identidad y dejamos el espacio limpio porque LA HISTORIA ES LO IMPORTANTE.
 */
export const ALL_22_CHILDREN_SLOTS: ChildStoryProfile[] = [
  {
    id: "historia-01-arte-colores",
    slotNumber: 1,
    colorTheme: "rose",
    isEmptyTemplate: false,
    title: "Historia #01 · Espacio para conocer mi historia",
    name: "Historia #01 · Pintar un nuevo comienzo",
    protectiveNote: "Tarjeta sin foto: cuidamos su rostro porque su historia es lo más importante",
    age: "9 años · Espacio #01 de 22",
    ageYears: 9,
    category: "Arte y Creatividad",
    image: "",
    shortStory:
      "Cuando llegué a la casa hogar hablaba muy bajito. Hoy uso témperas y pinceles para pintar montañas verdes, soles gigantes y contar con colores lo feliz que me siento de estar seguro.",
    fullStory:
      "Este es el espacio de la Historia #01 de nuestros 22 niños en Marinilla. No ponemos su foto para cuidar su intimidad y porque lo que de verdad importa es lo que vive su corazón. Al llegar a Espirales de Vida era muy tímido, pero en la mesa de dibujo descubrió que pintar le daba alegría y calma. Hoy le encanta ayudar a los más pequeños a mezclar colores y sueña con llenar de murales toda la fundación.",
    dream: "Pintar cuentos infantiles y enseñar arte a otros niños",
    favoriteWorkshop: "Tardes de Pintura, Colores y Murales",
    pillarsImpact: [
      "Corazón Contento: El dibujo le ayudó a perder el miedo y a expresar sus emociones.",
      "Estudio y Sueños: Aprendió a leer más rápido gracias a sus propios cuentos dibujados.",
    ],
    needsList: [
      "Témperas, pinceles, cuadernos de dibujo y colores",
      "Pijama calientica talla 10 y cobija suave",
      "Un padrino o madrina que le envíe cartas de ánimo",
    ],
    monthlySponsorshipCOP: 120000,
    monthlySponsorshipFormatted: "$120.000 COP / mes",
    timeCommitmentSuggestion:
      "Enviar una carta bonita cada mes y visitarnos en Marinilla en los días de puertas abiertas.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, leí la Historia #01 (Arte y Creatividad) y quiero saber cómo apadrinar su proceso en Marinilla.",
  },
  {
    id: "historia-02-musica-voz",
    slotNumber: 2,
    colorTheme: "sky",
    isEmptyTemplate: false,
    title: "Historia #02 · Espacio para conocer mi historia",
    name: "Historia #02 · Cantar para perder el miedo",
    protectiveNote: "Tarjeta sin foto: cuidamos su rostro porque su historia es lo más importante",
    age: "12 años · Espacio #02 de 22",
    ageYears: 12,
    category: "Música y Expresión",
    image: "",
    shortStory:
      "Antes de llegar a Marinilla tuve que cambiar muchas veces de lugar y dejé el colegio. Aquí volví a estudiar y descubrí que cantar en grupo me llena el corazón de alegría.",
    fullStory:
      "Este es el espacio de la Historia #02 de nuestros 22 niños. Dejamos el recuadro de foto vacío a propósito: aquí miramos con el corazón. En la fundación encontró una cama segura, amigas que la quieren y tardes enteras para aprender canciones con la guitarra. Cantar le devolvió la confianza en su propia voz y hoy nunca falta a sus clases del colegio.",
    dream: "Ser profesora de música y dirigir un coro de niños",
    favoriteWorkshop: "Taller de Canto, Guitarra y Ritmo",
    pillarsImpact: [
      "Un Hogar Seguro: Tener una casa estable le permitió volver al colegio sin interrupciones.",
      "Corazón Contento: La música le devolvió la alegría y las ganas de compartir.",
    ],
    needsList: [
      "Cuerdas para guitarra y cuadernos para el colegio",
      "Zapatos escolares y pijama abrigada",
      "Madrina o padrino que celebre sus notas del colegio",
    ],
    monthlySponsorshipCOP: 120000,
    monthlySponsorshipFormatted: "$120.000 COP / mes",
    timeCommitmentSuggestion:
      "Cartas de felicitación por sus logros escolares y acompañarnos en las muestras musicales del hogar.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, me tocó el corazón la Historia #02 (Música y Expresión) y quiero apadrinar este proceso en Marinilla.",
  },
  {
    id: "historia-03-naturaleza-huerta",
    slotNumber: 3,
    colorTheme: "emerald",
    isEmptyTemplate: false,
    title: "Historia #03 · Espacio para conocer mi historia",
    name: "Historia #03 · Sembrar semillas con paciencia",
    protectiveNote: "Tarjeta sin foto: cuidamos su rostro porque su historia es lo más importante",
    age: "14 años · Espacio #03 de 22",
    ageYears: 14,
    category: "Naturaleza y Oficios",
    image: "",
    shortStory:
      "Cuidar las plantas y los árboles de la casa hogar en Marinilla me enseñó algo muy bonito: cuando cuidas una semilla todos los días con cariño, siempre crece fuerte.",
    fullStory:
      "Este es el espacio de la Historia #03 de nuestros 22 niños y jóvenes. Sin fotografías, porque su dignidad y su relato valen más que cualquier imagen. A sus 14 años le encanta estar al aire libre en la Vía El Peñol Km 10, sembrar en la tierra y enseñarles a los niños más pequeños cómo regar cada planta sin dañarla. Cuidar la naturaleza le ayudó a ser paciente y responsable.",
    dream: "Trabajar cuidando el campo y cultivando alimentos sanos en Antioquia",
    favoriteWorkshop: "Huerta Escolar, Naturaleza y Oficios del Campo",
    pillarsImpact: [
      "Comida Rica y Abrigo: Lo que sembramos en casa ayuda a tener verduras frescas en el comedor.",
      "Estudio y Sueños: Está aprendiendo un oficio práctico para cuando sea mayor de edad.",
    ],
    needsList: [
      "Botas para la lluvia, semillas y herramientas pequeñas de jardín",
      "Pijama talla 16 y kit completo de aseo personal",
      "Padrino o mentor que lo anime a seguir estudiando",
    ],
    monthlySponsorshipCOP: 140000,
    monthlySponsorshipFormatted: "$140.000 COP / mes",
    timeCommitmentSuggestion:
      "Visitar la fundación en días de siembra y conversar sobre su futuro y sus estudios.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apadrinar la Historia #03 (Naturaleza y Oficios) y apoyar su crecimiento en Marinilla.",
  },
  {
    id: "historia-04-deporte-parque",
    slotNumber: 4,
    colorTheme: "amber",
    isEmptyTemplate: false,
    title: "Historia #04 · Espacio para conocer mi historia",
    name: "Historia #04 · En equipo nadie juega solo",
    protectiveNote: "Tarjeta sin foto: cuidamos su rostro porque su historia es lo más importante",
    age: "10 años · Espacio #04 de 22",
    ageYears: 10,
    category: "Deporte y Trabajo en Equipo",
    image: "",
    shortStory:
      "Lo que más me gusta después de hacer las tareas es salir corriendo a jugar con mis amigos. Mi sueño más grande es que arreglemos el Parque Infantil de la fundación.",
    fullStory:
      "Este es el espacio de la Historia #04 de nuestros 22 niños. En la cancha de grama de la fundación aprendió que jugar en equipo significa esperar al compañero, dar la mano cuando alguien se cae y celebrar juntos. Todos los días sueña con ver el Parque Infantil renovado y lleno de color para jugar con sus 21 hermanos de vida.",
    dream: "Ser futbolista o profesor de educación física y estrenar el Parque Infantil",
    favoriteWorkshop: "Fútbol en Equipo, Juegos al Aire Libre y Recreación",
    pillarsImpact: [
      "Un Hogar Seguro: Un jardín grande en Marinilla donde puede correr libre y seguro.",
      "Comida Rica y Abrigo: Buena alimentación diaria para crecer sano y con mucha energía.",
    ],
    needsList: [
      "Tenis resistentes para correr, balones de fútbol y medias deportivas",
      "Apoyo para pintar y mejorar el Parque Infantil del hogar",
      "Cobija térmica y pijama abrigada para las noches frías",
    ],
    monthlySponsorshipCOP: 120000,
    monthlySponsorshipFormatted: "$120.000 COP / mes",
    timeCommitmentSuggestion:
      "Compartir una tarde de juegos en Marinilla y enviarle mensajes en su cumpleaños.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apadrinar la Historia #04 (Deporte y Trabajo en Equipo) y apoyar el sueño del Parque Infantil.",
  },
  {
    id: "historia-05-lectura-estrellas",
    slotNumber: 5,
    colorTheme: "indigo",
    isEmptyTemplate: false,
    title: "Historia #05 · Espacio para conocer mi historia",
    name: "Historia #05 · La niña que lee cuentos antes de dormir",
    protectiveNote: "Tarjeta sin foto: cuidamos su rostro porque su historia es lo más importante",
    age: "11 años · Espacio #05 de 22",
    ageYears: 11,
    category: "Lectura y Ciencia",
    image: "",
    shortStory:
      "Me encanta hacer preguntas sobre las estrellas, los animales y los libros. Ahora que aprendí a leer muy bien, les leo cuentos a los niños más chiquitos de la casa.",
    fullStory:
      "Este es el espacio de la Historia #05 de nuestros 22 niños. Antes de vivir en Espirales de Vida había perdido muchos meses de escuela. Con la ayuda diaria de los profes de la fundación se puso al día rápido. Hoy su rincón favorito es la biblioteca del hogar, donde descubre historias de aventuras y se las cuenta a sus compañeros.",
    dream: "Ser médica o científica para cuidar y curar a los niños",
    favoriteWorkshop: "Club de Cuentos, Lectura y Experimentos Sencillos",
    pillarsImpact: [
      "Estudio y Sueños: Refuerzo escolar todas las tardes hasta alcanzar su grado en el colegio.",
      "Corazón Contento: Sentirse orgullosa de todo lo que sabe y compartirlo con cariño.",
    ],
    needsList: [
      "Libros de cuentos ilustrados, diccionario y cuadernos cosidos",
      "Lámpara de lectura, pijama suave y kit de aseo personal",
      "Madrina o padrino que le regale su próximo libro favorito",
    ],
    monthlySponsorshipCOP: 120000,
    monthlySponsorshipFormatted: "$120.000 COP / mes",
    timeCommitmentSuggestion:
      "Recomendarle cuentos, escribirle cartas y visitarla en las jornadas culturales del hogar.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apadrinar la Historia #05 (Lectura y Ciencia) y apoyar su educación en Marinilla.",
  },
  {
    id: "historia-06-oficios-futuro",
    slotNumber: 6,
    colorTheme: "emerald",
    isEmptyTemplate: false,
    title: "Historia #06 · Espacio para conocer mi historia",
    name: "Historia #06 · Aprender un oficio para salir adelante",
    protectiveNote: "Tarjeta sin foto: cuidamos su rostro porque su historia es lo más importante",
    age: "15 años · Espacio #06 de 22",
    ageYears: 15,
    category: "Naturaleza y Oficios",
    image: "",
    shortStory:
      "Soy uno de los grandes de la casa hogar. Aquí aprendí que mi pasado no decide mi futuro y hoy me preparo con juicio para ser un joven independiente y trabajador.",
    fullStory:
      "Este es el espacio de la Historia #06 de nuestros 22 niños y jóvenes. En Espirales de Vida encontró personas que creyeron en él cuando más lo necesitaba. Hoy da buen ejemplo a los más pequeños, ayuda a cuidar la casa en Marinilla y participa en talleres prácticos de madera, dibujo y oficios para tener un trabajo digno cuando cumpla 18 años.",
    dream: "Estudiar carpintería y diseño para construir muebles y casas bonitas",
    favoriteWorkshop: "Taller de Oficios Prácticos y Preparación para la Vida",
    pillarsImpact: [
      "Estudio y Sueños: Preparación práctica para trabajar y valerse por sí mismo.",
      "Corazón Contento: Recuperó la calma, el respeto y las ganas de construir un buen futuro.",
    ],
    needsList: [
      "Reglas de dibujo, útiles de colegio y zapatos juveniles",
      "Cobija térmica y kit de aseo personal para joven",
      "Beca o padrino que lo acompañe en su paso a estudios técnicos",
    ],
    monthlySponsorshipCOP: 150000,
    monthlySponsorshipFormatted: "$150.000 COP / mes",
    timeCommitmentSuggestion:
      "Conversaciones de orientación para su proyecto de vida y visitas en Marinilla.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero apadrinar la Historia #06 y apoyar su preparación para una vida independiente.",
  },
  {
    id: "historia-07-espacio-abierto",
    slotNumber: 7,
    colorTheme: "rose",
    isEmptyTemplate: true,
    title: "Historia #07 · Espacio abierto para conocer mi historia",
    name: "Historia #07 · Espacio listo para escribir en Marinilla",
    protectiveNote: "Espacio sin foto reservado para la historia del niño #07 en la fundación",
    age: "Niño o niña del hogar · Espacio #07 de 22",
    ageYears: 8,
    category: "Arte y Creatividad",
    image: "",
    shortStory:
      "Cada uno de los 22 niños de Espirales de Vida tiene su propia voz. Este espacio está abierto para escribir su historia, sus dibujos, su juego favorito y su sueño.",
    fullStory:
      "En nuestra casa hogar de Marinilla viven 22 niños, niñas y jóvenes. Guardamos este espacio #07 limpio y sin foto para compartir contigo su historia cuando nos visites o inicies tu apadrinamiento. Así protegemos su privacidad en internet y te invitamos a conocer de forma humana y cercana cómo tu ayuda transforma su día a día.",
    dream: "Crecer feliz, estudiar y cumplir sus sueños acompañado por un padrino o madrina",
    favoriteWorkshop: "Juegos, Arte, Lectura y Vida en Comunidad",
    pillarsImpact: [
      "Un Hogar Seguro: Techo, cama calientica y cuidado las 24 horas en Marinilla.",
      "Comida Rica y Estudio: Alimentación completa, colegio y apoyo psicológico diario.",
    ],
    needsList: [
      "Cobija abrigadora, 2 pijamas y kit mensual de aseo personal",
      "Morral con útiles escolares y zapatos para el colegio",
      "Padrino o madrina de corazón que acompañe su crecimiento",
    ],
    monthlySponsorshipCOP: 120000,
    monthlySponsorshipFormatted: "$120.000 COP / mes",
    timeCommitmentSuggestion:
      "Escríbenos por WhatsApp para asignarte este espacio de apadrinamiento y contarte cómo acompañarlo.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero conocer y apadrinar la Historia #07 de los 22 niños del hogar en Marinilla.",
  },
  {
    id: "hogar-completo-22-ninos",
    slotNumber: 8,
    colorTheme: "indigo",
    isEmptyTemplate: false,
    title: "Historia #08 · Apadrinar a los 22 Niños del Hogar",
    name: "Apadrinar a Toda la Familia (Los 22 Niños)",
    protectiveNote: "Modalidad sin fotos de rostros: pensada para Empresas, Familias o Grupos de Amigos",
    age: "Los 22 niños y jóvenes del hogar",
    ageYears: 22,
    category: "Hogar Completo (22 Niños)",
    image: "",
    shortStory:
      "Si tienes una empresa, una familia grande o un grupo de amigos, pueden unirse para apoyar al mismo tiempo a los 22 niños de la casa hogar en Marinilla.",
    fullStory:
      "En Espirales de Vida los 22 niños viven como hermanos. Este espacio colectivo permite que empresas de Medellín, Rionegro, Marinilla y toda Colombia, o grupos de amigos y familias, apoyen a toda la casa al mismo tiempo: asegurando comida rica, cobijas, útiles escolares, el arreglo del Parque Infantil y habitaciones seguras.",
    dream: "Tener nuestro Parque Infantil renovado, cuartos calienticos y educación para los 22 niños",
    favoriteWorkshop: "Todos los programas: Comedor, Psicología, Colegio, Arte, Música y Deporte",
    pillarsImpact: [
      "Ayuda Completa: Sostiene el hogar, la comida, el apoyo emocional y el estudio de los 22 niños.",
      "Certificado de Donación: Respaldo legal con NIT 900150558-5 para empresas en Colombia.",
    ],
    needsList: [
      "22 cobijas térmicas, 44 pijamas y 22 kits de aseo personal",
      "Apoyo para renovar el Parque Infantil y pintar los dormitorios",
      "Día de visita y voluntariado en Marinilla con tu equipo o familia",
    ],
    monthlySponsorshipCOP: 850000,
    monthlySponsorshipFormatted: "Desde $850.000 COP / mes (o aporte a tu medida)",
    timeCommitmentSuggestion:
      "Visitas grupales o empresariales en Marinilla, celebración de fechas especiales e informes claros del impacto logrado.",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, queremos apadrinar en grupo o como empresa a los 22 niños del hogar en Marinilla. ¿Podemos conversar?",
  },
  ...([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map(
    (slotNumber, index): ChildStoryProfile => {
      const padded = slotNumber < 10 ? `0${slotNumber}` : `${slotNumber}`;
      const themes: StoryColorTheme[] = ["sky", "emerald", "amber", "rose", "indigo"];
      const categories: Exclude<StoryCategory, "Todas" | "Hogar Completo (22 Niños)">[] = [
        "Arte y Creatividad",
        "Música y Expresión",
        "Deporte y Trabajo en Equipo",
        "Lectura y Ciencia",
        "Naturaleza y Oficios",
      ];
      const workshops = [
        "Taller de Pintura, Dibujo y Colores",
        "Tardes de Música, Canto y Ritmo",
        "Juegos en Equipo, Fútbol y Recreación",
        "Rincón de Cuentos, Lectura y Curiosidad",
        "Cuidado de la Naturaleza, Jardín y Oficios",
      ];
      const dreams = [
        "Aprender cosas nuevas cada día y compartir alegría en casa",
        "Terminar el colegio con buenas notas y descubrir mis talentos",
        "Jugar con mis amigos en el Parque Infantil y cumplir mis metas",
        "Leer muchos libros, aprender un oficio y salir adelante",
        "Construir un futuro bonito con el apoyo de mi familia en la fundación",
      ];
      const colorTheme = themes[index % themes.length];
      const category = categories[index % categories.length];
      const favoriteWorkshop = workshops[index % workshops.length];
      const dream = dreams[index % dreams.length];

      return {
        id: `historia-${padded}-espacio-nino`,
        slotNumber,
        colorTheme,
        isEmptyTemplate: true,
        title: `Historia #${padded} · Espacio para conocer mi historia`,
        name: `Historia #${padded} · Espacio reservado para mi historia`,
        protectiveNote: `Sin foto por protección infantil · Espacio #${padded} de los 22 niños en Marinilla`,
        age: `Niño o joven del hogar · Espacio #${padded} de 22`,
        ageYears: 7 + (index % 9),
        category,
        image: "",
        shortStory: `Soy el corazón #${padded} de los 22 niños que viven en la Fundación Espirales de Vida. Este recuadro no tiene foto porque lo más lindo de mí es mi historia, mis sueños y mis ganas de salir adelante.`,
        fullStory: `Este espacio corresponde al niño o joven #${padded} de nuestra casa hogar en Marinilla (Vía El Peñol Km 10). No publicamos fotografías de sus rostros para cuidarlos con amor y respeto. Aquí guardamos el lugar para contarte directamente cómo le va en el colegio, qué le gusta dibujar o jugar, y cómo tu apadrinamiento le brinda cama calientica, comida nutritiva y educación.`,
        dream,
        favoriteWorkshop,
        pillarsImpact: [
          "Un Hogar Seguro: Cuidado cariñoso día y noche en nuestra casa campestre de Marinilla.",
          "Estudio y Futuro: Colegio, refuerzo de tareas y talleres para descubrir sus talentos.",
        ],
        needsList: [
          "Cobija térmica, 2 pijamas cómodas y kit de aseo personal",
          "Cuadernos, colores, zapatos colegiales y materiales de taller",
          "Un padrino o madrina que crea en su talento y le envíe mensajes de ánimo",
        ],
        monthlySponsorshipCOP: 120000,
        monthlySponsorshipFormatted: "$120.000 COP / mes",
        timeCommitmentSuggestion:
          "Aporte mensual para su cuidado diario, cartas de motivación y visitas programadas en Marinilla.",
        whatsappMessage: `Hola Fundación Espirales de Vida, quiero conocer y apadrinar la Historia #${padded} de los 22 niños del hogar en Marinilla.`,
      };
    }
  )),
];

/**
 * En la vista principal mostramos las primeras 8 tarjetas (que incluyen ejemplos de cada taller
 * más el espacio abierto y el apadrinamiento de los 22 niños), y el usuario puede desplegar las 22 completas.
 */
export const CHILDREN_STORIES: ChildStoryProfile[] = ALL_22_CHILDREN_SLOTS.slice(0, 8);

export function getChildrenStories(showAll22 = false): ChildStoryProfile[] {
  return showAll22 ? ALL_22_CHILDREN_SLOTS : CHILDREN_STORIES;
}

/**
 * Galería 100% Real (Fotografías auténticas DSC_*.jpg tomadas en la Fundación Espirales de Vida en Marinilla).
 * Cero imágenes generadas por IA.
 */
export const REAL_GALLERY_PHOTOS: RealGalleryPhoto[] = [
  {
    id: "galeria-real-01-comunidad",
    src: "/images/reales/comunidad-equipo-hogar.jpg",
    image: "/images/reales/comunidad-equipo-hogar.jpg",
    dscCode: "DSC_1162",
    rawDscPath: "/images/reales/DSC_1162.jpg",
    title: "Nuestra gran familia en Marinilla",
    caption: "Niños, jóvenes, educadores y voluntarios reunidos frente a la casa hogar en la Vía El Peñol Km 10.",
    description: "Niños, jóvenes, educadores y voluntarios reunidos frente a la casa hogar en la Vía El Peñol Km 10.",
    alt: "Fotografía de la comunidad y equipo en la Fundación Espirales de Vida en Marinilla",
    category: "Hogar y Comunidad",
    featured: true,
  },
  {
    id: "galeria-real-02-sonrisa",
    src: "/images/reales/sonrisa-confianza.jpg",
    image: "/images/reales/sonrisa-confianza.jpg",
    dscCode: "DSC_1118",
    rawDscPath: "/images/reales/DSC_1118.jpg",
    title: "La alegría de sentirse cuidados",
    caption: "Cuando un niño se siente seguro y querido, vuelve a sonreír con tranquilidad.",
    description: "Cuando un niño se siente seguro y querido, vuelve a sonreír con tranquilidad.",
    alt: "Fotografía de alegría y confianza en la Fundación Espirales de Vida",
    category: "Arte y Alegría",
    featured: true,
  },
  {
    id: "galeria-real-03-alegria",
    src: "/images/reales/alegria-espontanea.jpg",
    image: "/images/reales/alegria-espontanea.jpg",
    dscCode: "DSC_1025",
    rawDscPath: "/images/reales/DSC_1025.jpg",
    title: "Tardes de risas y juegos",
    caption: "Momentos de felicidad compartida durante nuestras jornadas recreativas en el hogar.",
    description: "Momentos de felicidad compartida durante nuestras jornadas recreativas en el hogar.",
    alt: "Fotografía de alegría espontánea en Marinilla",
    category: "Arte y Alegría",
  },
  {
    id: "galeria-real-04-pintacaritas",
    src: "/images/reales/arte-pintacaritas.jpg",
    image: "/images/reales/arte-pintacaritas.jpg",
    dscCode: "DSC_1034",
    rawDscPath: "/images/reales/DSC_1034.jpg",
    title: "Arte, colores y pintacaritas",
    caption: "El arte nos ayuda a expresar lo que sentimos y a celebrar la infancia con imaginación.",
    description: "El arte nos ayuda a expresar lo que sentimos y a celebrar la infancia con imaginación.",
    alt: "Fotografía de actividad de pintacaritas y arte en la fundación",
    category: "Arte y Alegría",
  },
  {
    id: "galeria-real-05-parque-actual",
    src: "/images/reales/parque-actual-marinilla.jpg",
    image: "/images/reales/parque-actual-marinilla.jpg",
    dscCode: "DSC_1019",
    rawDscPath: "/images/reales/DSC_1019.jpg",
    title: "El espacio de nuestro Parque Infantil",
    caption: "Aquí vemos los juegos actuales al aire libre que soñamos renovar y ampliar para los 22 niños.",
    description: "Aquí vemos los juegos actuales al aire libre que soñamos renovar y ampliar para los 22 niños.",
    alt: "Fotografía del parque infantil actual en la sede de Marinilla",
    category: "Parque y Recreación",
    featured: true,
  },
  {
    id: "galeria-real-06-parque-detalle",
    src: "/images/reales/parque-juegos-detalle.jpg",
    image: "/images/reales/parque-juegos-detalle.jpg",
    dscCode: "DSC_1013",
    rawDscPath: "/images/reales/DSC_1013.jpg",
    title: "Juegos que necesitan tu mano amiga",
    caption: "Detalle de las estructuras de juego que queremos embellecer y hacer más seguras en el Frente 2.",
    description: "Detalle de las estructuras de juego que queremos embellecer y hacer más seguras en el Frente 2.",
    alt: "Fotografía del detalle de los juegos infantiles en Marinilla",
    category: "Parque y Recreación",
  },
  {
    id: "galeria-real-07-casa-hogar",
    src: "/images/reales/casa-hogar-instalaciones.jpg",
    image: "/images/reales/casa-hogar-instalaciones.jpg",
    dscCode: "DSC_1045",
    rawDscPath: "/images/reales/DSC_1045.jpg",
    title: "La casa hogar en Vía El Peñol Km 10",
    caption: "Vista de nuestras instalaciones campestres en Marinilla, donde viven y estudian los 22 niños.",
    description: "Vista de nuestras instalaciones campestres en Marinilla, donde viven y estudian los 22 niños.",
    alt: "Fotografía de la casa hogar e instalaciones en Marinilla",
    category: "Instalaciones Marinilla",
    featured: true,
  },
  {
    id: "galeria-real-08-circulo-campestre",
    src: "/images/reales/circulo-integracion-campestre.jpg",
    image: "/images/reales/circulo-integracion-campestre.jpg",
    dscCode: "DSC_1155",
    rawDscPath: "/images/reales/DSC_1155.jpg",
    title: "Círculo de amigos en la naturaleza",
    caption: "Rodeados de árboles y aire puro, aprendemos a escucharnos y a cuidarnos como hermanos.",
    description: "Rodeados de árboles y aire puro, aprendemos a escucharnos y a cuidarnos como hermanos.",
    alt: "Fotografía del círculo de integración campestre en la fundación",
    category: "Hogar y Comunidad",
  },
  {
    id: "galeria-real-09-taller-arbol",
    src: "/images/reales/taller-pedagogico-arbol.jpg",
    image: "/images/reales/taller-pedagogico-arbol.jpg",
    dscCode: "DSC_1140",
    rawDscPath: "/images/reales/DSC_1140.jpg",
    title: "El árbol de nuestros sueños",
    caption: "En los talleres pedagógicos cada niño escribe sus metas y descubre todo lo bueno que puede lograr.",
    description: "En los talleres pedagógicos cada niño escribe sus metas y descubre todo lo bueno que puede lograr.",
    alt: "Fotografía del taller pedagógico del árbol de sueños",
    category: "Talleres y Aprendizaje",
  },
  {
    id: "galeria-real-10-trabajo-equipo",
    src: "/images/reales/trabajo-en-equipo.jpg",
    image: "/images/reales/trabajo-en-equipo.jpg",
    dscCode: "DSC_1095",
    rawDscPath: "/images/reales/DSC_1095.jpg",
    title: "Aprender y crear juntos",
    caption: "Sentados en equipo compartimos cartulinas, ideas y tareas acompañados con paciencia.",
    description: "Sentados en equipo compartimos cartulinas, ideas y tareas acompañados con paciencia.",
    alt: "Fotografía de trabajo en equipo y talleres en Marinilla",
    category: "Talleres y Aprendizaje",
  },
  {
    id: "galeria-real-11-recreacion-deporte",
    src: "/images/reales/recreacion-y-deporte.jpg",
    image: "/images/reales/recreacion-y-deporte.jpg",
    dscCode: "DSC_1111",
    rawDscPath: "/images/reales/DSC_1111.jpg",
    title: "Energía y deporte al aire libre",
    caption: "Correr, saltar y jugar en las zonas verdes de la fundación nos mantiene sanos y unidos.",
    description: "Correr, saltar y jugar en las zonas verdes de la fundación nos mantiene sanos y unidos.",
    alt: "Fotografía de recreación y deporte en la Fundación Espirales de Vida",
    category: "Parque y Recreación",
  },
  {
    id: "galeria-real-12-fraternidad",
    src: "/images/reales/fraternidad-compartir.jpg",
    image: "/images/reales/fraternidad-compartir.jpg",
    dscCode: "DSC_1161",
    rawDscPath: "/images/reales/DSC_1161.jpg",
    title: "Compartir con alegría",
    caption: "Cada visita y cada abrazo nos recuerda que no estamos solos y que hay mucha gente buena apoyándonos.",
    description: "Cada visita y cada abrazo nos recuerda que no estamos solos y que hay mucha gente buena apoyándonos.",
    alt: "Fotografía de fraternidad y compartir en el hogar de Marinilla",
    category: "Hogar y Comunidad",
  },
];

export const SPONSORSHIP_MODELS: SponsorshipModel[] = [
  {
    id: "padrinos-de-corazon",
    badge: "Para Personas y Familias · Amor que Acompaña",
    title: "Padrinos y Madrinas de Corazón",
    targetAudience: "Personas y familias en Medellín, Oriente Antioqueño, Colombia y otros países",
    subtitle: "Tu cariño, tus mensajes y un aporte mensual que cuida su vida diaria",
    description:
      "Un niño que sabe que alguien cree en él crece más fuerte y feliz. Como padrino o madrina ayudas cada mes para su comida, estudio y abrigo, y también puedes escribirle cartas y visitarlo en Marinilla.",
    suggestedContribution: "Desde $120.000 COP al mes (o el valor que puedas aportar)",
    commitmentType: "Aporte mensual + visitas y cartas opcionales en Marinilla",
    benefits: [
      "Apoyas directamente la historia de uno de los 22 niños o de todo el hogar",
      "Te contamos cómo avanza en el colegio, en sus talleres de arte y en su bienestar",
      "Puedes venir a las jornadas de visita, muestras de pintura y días especiales en Marinilla",
      "Puedes enviarle cartas de ánimo, útiles escolares o un detalle en su cumpleaños",
    ],
    ctaLabel: "Quiero Ser Padrino o Madrina",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero ser Padrino o Madrina de Corazón para apoyar con cariño a los niños en Marinilla.",
    featured: true,
  },
  {
    id: "alianza-empresarial-rse",
    badge: "Para Empresas · Medellín y Antioquia · NIT 900150558-5",
    title: "Empresas Amigas (Alianza RSE)",
    targetAudience: "Empresas, negocios, fundaciones y equipos de trabajo en Antioquia y Colombia",
    subtitle: "Apoyo directo para los 22 niños con Certificado de Donación",
    description:
      "Invitamos a las empresas de Medellín, Rionegro, Marinilla y toda Colombia a apadrinar uno de los 3 Frentes de Ayuda o a respaldar a los 22 niños del hogar. Tu empresa transforma vidas de verdad y recibe su certificado legal de donación.",
    suggestedContribution: "Desde $850.000 COP al mes o donación para el Parque Infantil y mejoras de la casa",
    commitmentType: "Apoyo mensual, donación de obra o jornada de voluntariado con tu equipo",
    benefits: [
      "Certificado oficial de donación de la Fundación Espirales de Vida (NIT 900150558-5) para beneficios tributarios en Colombia",
      "Días de voluntariado en Marinilla (Vía El Peñol Km 10) para que tu equipo comparta, siembre o pinte junto a nosotros",
      "Informe claro con fotografías del hogar y de las mejoras logradas gracias a tu empresa",
      "Reconocimiento especial como Empresa Amiga en nuestro Parque Infantil o salón renovado",
    ],
    taxBenefitNote:
      "Fundación sin ánimo de lucro legalmente constituida · NIT 900150558-5 · Entregamos certificado oficial de donación en Colombia.",
    ctaLabel: "Sumar Mi Empresa",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, escribo de parte de una empresa interesada en apoyar a los 22 niños en Marinilla (NIT 900150558-5).",
    featured: true,
  },
  {
    id: "donacion-especie-tres-frentes",
    badge: "Ayuda con Cosas Útiles · Entrega Directa",
    title: "Donar Cobijas, Útiles, Juguetes o Materiales",
    targetAudience: "Familias, colegios, grupos de amigos y comercios solidarios",
    subtitle: "Cada cobija, cuaderno o tarro de pintura hace más feliz nuestra casa hoy mismo",
    description:
      "También puedes ayudar donando las cosas que los 22 niños necesitan todos los días: cobijas calienticas, pijamas, cepillos de dientes, jabón, cuadernos, cuentos, balones o pintura para arreglar sus cuartos.",
    suggestedContribution: "Kits de aseo, pijamas, cobijas, útiles escolares, juguetes o pintura",
    commitmentType: "Entrega cuando quieras o colecta con tus amigos y familia",
    benefits: [
      "Puedes entregar tu donación directamente en nuestra casa de Marinilla y conocer la fundación",
      "Te compartimos la lista exacta de tallas y cosas urgentes para que todo se aproveche al máximo",
      "Recibes carta de agradecimiento y fotografías de la entrega en el hogar",
    ],
    ctaLabel: "Donar Cobijas o Útiles",
    whatsappMessage:
      "Hola Fundación Espirales de Vida, quiero donar cosas útiles (cobijas, pijamas, aseo, útiles escolares o materiales) para los 22 niños en Marinilla.",
    featured: false,
  },
];

export const LOCAL_SEO_FAQS: LocalSeoFaq[] = [
  {
    id: "faq-ubicacion-marinilla-medellin",
    category: "Ubicación y Visitas",
    question: "¿Dónde queda la Fundación Espirales de Vida y cómo se llega desde Medellín?",
    answer:
      "Nuestra casa hogar queda en la Vía El Peñol Km 10, en el municipio de Marinilla, Antioquia. Estamos a unos 45 minutos de Medellín por la Autopista Medellín-Bogotá y a 20 minutos de Rionegro. Es una casa campestre rodeada de naturaleza donde viven y estudian nuestros 22 niños.",
  },
  {
    id: "faq-como-apadrinar-nino",
    category: "Apadrinamiento",
    question: "¿Cómo puedo apadrinar a uno de los 22 niños y por qué sus tarjetas no tienen foto?",
    answer:
      "Para cuidar la intimidad y seguridad de los menores, nunca ponemos fotos de sus rostros en las tarjetas de apadrinamiento: aquí lo más importante es su historia. Puedes elegir uno de los 22 espacios de historia y apoyar con un aporte mensual (desde $120.000 COP) que cubre comida rica, estudio, abrigo y apoyo psicológico, además de enviarle cartas y visitarnos en Marinilla.",
  },
  {
    id: "faq-certificado-tributario-empresas",
    category: "Empresas y RSE",
    question: "¿Entregan certificado de donación para empresas (NIT 900150558-5)?",
    answer:
      "Sí. La Fundación Espirales de Vida está registrada legalmente con el NIT 900150558-5. Todas las empresas o personas que hacen donaciones en dinero o en cosas nuevas reciben su certificado oficial de donación válido para impuestos en Colombia.",
  },
  {
    id: "faq-donaciones-especie-necesidades",
    category: "Donaciones en Especie",
    question: "¿Qué cosas necesitan con más urgencia los 22 niños hoy?",
    answer:
      "Hoy necesitamos ayuda en 3 cosas muy claras: 1) Para el frío y el cuidado diario: 22 cobijas térmicas, 44 pijamas (tallas 6 a 16) y kits de aseo (cepillo, crema dental, jabón, champú y toallas). 2) Para estudiar y jugar: cuadernos, colores, juguetes y apoyo para mejorar nuestro Parque Infantil. 3) Para la casa: pintura, arreglo de techos, colchones y duchas de agua caliente.",
  },
  {
    id: "faq-sueno-parque-infantil",
    category: "Donaciones en Especie",
    question: "¿Cuál es el sueño del Parque Infantil dentro de la fundación?",
    answer:
      "Queremos arreglar, pintar y ampliar los juegos al aire libre de nuestra sede en Marinilla para que los 22 niños tengan un Parque Infantil seguro, firme y lleno de color donde puedan correr y jugar todos los días después de hacer las tareas.",
  },
  {
    id: "faq-voluntariado-visitas-marinilla",
    category: "Ubicación y Visitas",
    question: "¿Podemos ir a visitar la fundación o hacer un día de voluntariado en Marinilla?",
    answer:
      "¡Claro que sí! Nos encanta recibir familias madrinas, grupos de amigos y equipos de empresas para pintar, sembrar, leer cuentos o jugar con los niños. Para cuidar siempre a los menores, solo debes escribirnos antes por WhatsApp al 313 652 5841 y agendamos el día de tu visita.",
  },
];

export function buildWhatsAppLink(customMessage?: string): string {
  const defaultMsg =
    "Hola Fundación Espirales de Vida, vi su página web y quiero saber cómo apadrinar o ayudar a los 22 niños en Marinilla.";
  const encoded = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${FOUNDATION_INFO.phoneRaw}?text=${encoded}`;
}
