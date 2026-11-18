import type { Lang } from "../i18n/LanguageContext";
import type { Tag } from "./tags";

export type PreviewMedia = { type: "image" | "video"; src: string };

type Localized<T> = { en: T; es: T };

export type Section = { heading: string; paragraphs: string[] };
export type ProjectLink = { label: Localized<string>; href: string };
export type Fact = { label: Localized<string>; value: Localized<string> };

/** A live piece the visitor can run in place (an iframe started with a click, so nothing asks for the camera on load). */
export type Demo = {
  src: string;
  title: Localized<string>;
  button: Localized<string>;
  note: Localized<string>;
};

export type Project = {
  slug: string;
  /** Short name used on the Home grid. */
  name: string;
  /** Longer heading for the project page, when the grid name is abbreviated. */
  title?: string;
  /** Keeps the project out of the grid and its page unreachable until it's ready to show. */
  hidden?: boolean;
  /** Omit while the case study isn't written yet — the grid card and detail page degrade gracefully. */
  listCategory?: Localized<string>;
  listYears?: string;
  detailMeta?: Localized<string>;
  paragraphs?: Localized<string[]>;
  /**
   * Short label/value pairs (role, year…) shown right under the title, before the mockups. The role stays in English in
   * the Spanish version too: it is what recruiters search for (see also the areas in data/tags.ts).
   */
  facts?: Fact[];
  /** Kinds of work (brand, web, product…), shown as coloured pills in an extra "Areas" row at the end of the facts. */
  tags?: Tag[];
  /** Longer case studies: titled sections shown after the intro and facts. */
  sections?: Localized<Section[]>;
  links?: ProjectLink[];
  /** Shown as the last item of the gallery, after the media. */
  demo?: Demo;
  /** Gallery items. A path ending in .mp4 is a looping video; its poster is the same path with a .jpg extension. */
  images: string[];
  /** "stack" lists every item full width (default); "strip" is a horizontal scroll gallery. */
  galleryLayout?: "stack" | "strip";
  /** Cover on the Home grid. Defaults to the first gallery image when omitted. */
  preview?: PreviewMedia;
};

export const isVideo = (src: string) => /\.mp4$/i.test(src);
export const posterOf = (src: string) => src.replace(/\.mp4$/i, ".jpg");

export function getPreviewMedia(project: Project): PreviewMedia | null {
  if (project.preview) return project.preview;
  const first = project.images[0];
  if (first) return { type: "image", src: isVideo(first) ? posterOf(first) : first };
  return null;
}

export function pick<T>(field: Localized<T> | undefined, lang: Lang): T | undefined {
  return field ? field[lang] : undefined;
}

const allProjects: Project[] = [
  {
    slug: "tandie",
    name: "Tandie",
    galleryLayout: "strip",
    listCategory: { en: "Wedding Planning SaaS", es: "SaaS de planificación de matrimonios" },
    detailMeta: { en: "Wedding Planning SaaS", es: "SaaS de planificación de matrimonios" },
    paragraphs: {
      en: [
        "[Tandie](https://www.tandie.app) brings invitations, guest management, seating, tasks and budgets into one planning experience for couples and professional wedding planners. I co-founded the product and led its definition and design, working alongside my technical co-founder to take it from an initial idea to a working platform.",
        "The main UX challenge was organizing decisions that depend on one another. Guest confirmations influence seating arrangements, budgets shape supplier choices, and tasks require coordination between several people. I defined the information architecture and core workflows to connect these activities while keeping each tool focused on the decision at hand.",
        "One key decision was to make the invitation part of the planning workflow. I designed an RSVP experience that collects attendance, accompanying guests and dietary requirements, connecting what guests submit with the information couples and planners need to organize the event.",
        "Across the planning tools, I designed interactions suited to different tasks: dragging guests into seating arrangements, organizing checklists by category and priority, and tracking expenses and payments in a dedicated budget view.",
        "The product also needed to accommodate two contexts: couples planning their own wedding and professionals managing several events. I designed collaboration within each wedding and an overview that allows planners to move between their clients’ events.",
        "My work also included creating Tandie’s visual identity and design system, establishing a consistent language across invitations and planning tools, and contributing to implementation. The product has progressed into beta testing with early users, providing a foundation for evaluating and refining the connected workflows.",
      ],
      es: [
        "[Tandie](https://www.tandie.app) reúne invitaciones, gestión de invitados, distribución de mesas, tareas y presupuestos en una sola experiencia de planificación para parejas y wedding planners profesionales. Co-fundé el producto y lideré su definición y diseño, trabajando junto a mi cofundador técnico para llevarlo desde una idea inicial hasta una plataforma funcional.",
        "El principal desafío de UX fue organizar decisiones que dependen unas de otras. Las confirmaciones de los invitados afectan la distribución de las mesas, los presupuestos condicionan la elección de proveedores y las tareas requieren coordinación entre varias personas. Definí la arquitectura de información y los flujos centrales para conectar estas actividades, manteniendo cada herramienta enfocada en la decisión que se debe tomar.",
        "Una decisión clave fue hacer que la invitación formara parte del flujo de planificación. Diseñé una experiencia de confirmación de asistencia (RSVP) que recoge la asistencia, los acompañantes y los requerimientos alimentarios, conectando lo que envían los invitados con la información que las parejas y los planners necesitan para organizar el evento.",
        "En las distintas herramientas de planificación diseñé interacciones pensadas para cada tarea: arrastrar invitados a las mesas, organizar listas de pendientes por categoría y prioridad, y hacer seguimiento de gastos y pagos en una vista de presupuesto dedicada.",
        "El producto también debía acomodar dos contextos: parejas que planifican su propio matrimonio y profesionales que gestionan varios eventos. Diseñé la colaboración dentro de cada matrimonio y una vista general que permite a los planners moverse entre los eventos de sus clientes.",
        "Mi trabajo también incluyó crear la identidad visual y el sistema de diseño de Tandie, estableciendo un lenguaje consistente entre las invitaciones y las herramientas de planificación, y contribuyendo a la implementación. El producto ha avanzado a una etapa de beta con usuarios tempranos, lo que ofrece una base para evaluar y refinar los flujos conectados.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Product Designer & Developer", es: "Product Designer & Developer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2026", es: "2026" },
      },
    ],
    tags: ["brand", "web", "product", "code"],
    links: [{ label: { en: "www.tandie.app ↗", es: "www.tandie.app ↗" }, href: "https://www.tandie.app" }],
    images: [
      "/works/tandie-5.mp4",
      "/works/tandie-6.mp4",
      "/works/tandie-1.mp4",
      "/works/tandie-2.mp4",
      "/works/tandie-3.mp4",
      "/works/tandie-4.mp4",
    ],
  },
  {
    slug: "bagoost",
    name: "Bagoost",
    galleryLayout: "strip",
    listCategory: { en: "B2B Wholesale Marketplace", es: "Marketplace mayorista B2B" },
    listYears: "2021 · 2022",
    detailMeta: { en: "B2B Wholesale Marketplace", es: "Marketplace mayorista B2B" },
    paragraphs: {
      en: [
        "I joined Bagoost at its founding stage as part of the design team. My work included creating the brand identity and designing the core experience of a B2B marketplace that helped independent brands sell to local stores across Chile.",
        "The main challenge was simplifying wholesale purchasing. Stores could buy from multiple brands in a single cart, although each brand had its own minimum orders, discounts and promotions. The cart grouped products by brand and showed how much was still needed to reach each minimum before checkout. Available credit stayed visible throughout the journey so store owners knew how much they had to work with when placing orders.",
        "I visited stores and spoke with owners and suppliers to understand how they placed orders, how they organized their work and what difficulties they ran into. I used those findings to design the product flows and adapt the interfaces to different screen sizes.",
        "As the marketplace grew, my work focused on making stores’ daily operations easier and extending the platform’s reach. Store administrators worked mainly from their phones, so I took part in designing the first mobile version. That version came to account for about 40% of the purchases stores made on the marketplace.",
        "I also worked on the store dashboard, which supported their day-to-day management, and on the referral program, which let brands and stores invite others to join. With Bagoost Points, we brought the marketplace catalog to the windows of partner stores across Chile.",
        "By the end of my time at Bagoost, the marketplace brought together more than 80 brands, more than 1,400 products and more than 400 stores across Chile. In 2022, Corfo also selected Bagoost among Chile’s top 50 food innovations.",
      ],
      es: [
        "Me uní a Bagoost en su etapa fundacional como parte del equipo de diseño. Mi trabajo incluyó crear la identidad de marca y diseñar la experiencia central de un marketplace B2B que ayudaba a marcas independientes a vender a tiendas locales de todo Chile.",
        "El principal desafío era simplificar la compra mayorista. Las tiendas podían comprar a varias marcas en un mismo carro, aunque cada una tenía sus propios pedidos mínimos, descuentos y promociones. El carro agrupaba los productos por marca y mostraba cuánto faltaba para alcanzar cada mínimo antes de pagar. El crédito disponible se mantenía visible durante todo el recorrido para que los dueños de tienda supieran con cuánto contaban al hacer sus pedidos.",
        "Visité tiendas y conversé con dueños y proveedores para entender cómo hacían sus pedidos, cómo organizaban su trabajo y qué dificultades encontraban. Usé esos hallazgos para diseñar los flujos del producto y adaptar las interfaces a distintos tamaños de pantalla.",
        "A medida que crecía el marketplace, mi trabajo se centró en facilitar la operación diaria de las tiendas y ampliar el alcance de la plataforma. Los administradores trabajaban principalmente desde el celular, así que participé en el diseño de la primera versión móvil. Esa versión llegó a concentrar cerca del 40 % de las compras que las tiendas hacían en el marketplace.",
        "También trabajé en el panel de tiendas, que apoyaba su gestión diaria, y en el programa de referidos, que permitía a marcas y tiendas invitar a otras a sumarse. Con Bagoost Points, llevamos el catálogo del marketplace a las vitrinas de tiendas asociadas en todo Chile.",
        "Al cierre de mi etapa en Bagoost, el marketplace reunía más de 80 marcas, más de 1.400 productos y más de 400 tiendas en todo Chile. En 2022, Corfo también seleccionó a Bagoost entre las 50 innovaciones alimentarias más destacadas de Chile.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Product Designer", es: "Product Designer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2021-2022", es: "2021-2022" },
      },
    ],
    tags: ["brand", "web", "product"],
    links: [{ label: { en: "www.bagoost.com ↗", es: "www.bagoost.com ↗" }, href: "https://www.bagoost.com" }],
    images: ["/works/bagoost-5.mp4", "/works/bagoost-7.mp4", "/works/bagoost-8.mp4"],
  },
  {
    slug: "zoon",
    name: "Zoon Loyalty",
    galleryLayout: "strip",
    listCategory: { en: "Loyalty & Engagement SaaS", es: "SaaS de fidelización y engagement" },
    listYears: "2023 · 2025",
    detailMeta: { en: "Loyalty & Engagement SaaS", es: "SaaS de fidelización y engagement" },
    paragraphs: {
      en: [
        "Zoon Loyalty helps businesses run loyalty programs for consumers and engagement programs for employees. I joined as the first in-house Product Designer and helped the company move from outsourced development to its own product team. I designed flows and interfaces for both platforms and worked with product, engineering and business teams on prototypes and the shared design system.",
        "A central part of my role was adapting engagement mechanics to the goal of each program. I considered what behavior the business wanted to encourage, what reward would be relevant, and how participants could follow their progress. In a loyalty program, stamps made each purchase count toward a reward. In an employee program, points could recognize a milestone or reward reaching a sales goal. I designed the flows so that the rules, progress and rewards were easy to understand.",
        "For consumers, I worked on the journey from scanning a QR code in-store to registering and adding a pass to Apple Wallet or Google Wallet. The experience included collecting points or stamps, browsing benefits, redeeming rewards, and receiving emails after enrolling or making a purchase. At checkout, staff could validate passes, record purchases and process redemptions.",
        "The employee platform supported recognition programs, sales campaigns and customer satisfaction campaigns. In a service campaign, for example, the employee shared a QR code after helping a customer. The customer answered a short survey, and managers could review the feedback and award points that employees redeemed for gift cards. The platform also recommended rewards based on preference surveys and let each company apply its own branding.",
        "Administrators could define who participated, how points were earned and which rewards were available. The loyalty dashboard showed retention, visit frequency and revenue from repeat purchases. On the employee platform, teams could track participation and campaign performance.",
        "With the platforms already in use, I adapted flows, business rules and success metrics to the needs of clients such as Siemens, Toyota and BCI. I worked closely with clients and sales teams, observed how the product was used in the field and incorporated those findings into the following improvements.",
        "Together with the Product Owner, I co-created the Behavioral Science Lab, where we applied research on motivation and choice architecture to refine retention mechanics.",
        "By the end of my time at Zoon Loyalty, more than 12,000 consumers had enrolled. The loyalty product recorded an average of 2.7 repeat purchases per customer, and sales at partner locations had increased by 27%.",
      ],
      es: [
        "Zoon Loyalty ayuda a las empresas a gestionar programas de fidelización para consumidores y de engagement para empleados. Me uní como la primera Product Designer interna y ayudé a la empresa a pasar del desarrollo externalizado a un equipo de producto propio. Diseñé flujos e interfaces para ambas plataformas y trabajé con los equipos de producto, ingeniería y negocio en prototipos y en el sistema de diseño compartido.",
        "Una parte central de mi rol fue adaptar las mecánicas de engagement al objetivo de cada programa. Consideraba qué comportamiento buscaba incentivar el negocio, qué recompensa sería relevante y cómo podrían los participantes seguir su progreso. En un programa de fidelización, los sellos hacían que cada compra contara para una recompensa. En un programa para empleados, los puntos podían reconocer un hito o premiar el cumplimiento de una meta de ventas. Diseñé los flujos para que las reglas, el progreso y las recompensas fueran fáciles de entender.",
        "Para los consumidores, trabajé en el recorrido desde el escaneo de un código QR en la tienda hasta el registro y la incorporación de un pase a Apple Wallet o Google Wallet. La experiencia incluía acumular puntos o sellos, explorar beneficios, canjear recompensas y recibir correos después de inscribirse o hacer una compra. En caja, el personal podía validar pases, registrar compras y procesar canjes.",
        "La plataforma para empleados apoyaba programas de reconocimiento, campañas de ventas y campañas de satisfacción de clientes. En una campaña de servicio, por ejemplo, el empleado compartía un código QR después de atender a un cliente. El cliente respondía una breve encuesta y los gerentes podían revisar los comentarios y otorgar puntos que los empleados canjeaban por tarjetas de regalo. La plataforma también recomendaba recompensas a partir de encuestas de preferencias y permitía que cada empresa aplicara su propia marca.",
        "Los administradores podían definir quién participaba, cómo se ganaban los puntos y qué recompensas estaban disponibles. El panel de fidelización mostraba la retención, la frecuencia de visitas y los ingresos por compras repetidas. En la plataforma para empleados, los equipos podían seguir la participación y el desempeño de las campañas.",
        "Con las plataformas ya en uso, adapté flujos, reglas de negocio y métricas de éxito a las necesidades de clientes como Siemens, Toyota y BCI. Trabajé de cerca con clientes y equipos comerciales, observé cómo se usaba el producto en terreno e incorporé esos hallazgos en las siguientes mejoras.",
        "Junto con el Product Owner, cocreé el Behavioral Science Lab, donde aplicamos investigación sobre motivación y arquitectura de decisiones para afinar las mecánicas de retención.",
        "Al cierre de mi etapa en Zoon Loyalty, más de 12.000 consumidores se habían inscrito. El producto de fidelización registraba un promedio de 2,7 compras repetidas por cliente y las ventas en los locales asociados habían aumentado un 27 %.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Product Designer", es: "Product Designer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2023–2025", es: "2023–2025" },
      },
    ],
    tags: ["brand", "product"],
    links: [{ label: { en: "www.zoonloyalty.io ↗", es: "www.zoonloyalty.io ↗" }, href: "https://www.zoonloyalty.io" }],
    // three phones (QR, registration, Wallet), the gradient cards, the single phone. The dashboard (zoon-1.png) and the
    // phone screens (zoon-2.png) are hidden for now: add them back at the end of this list to show them again.
    // The Home cover is the first mockup (its poster, zoon-10-thumb.jpg): there is no `preview` on purpose.
    images: ["/works/zoon-10.mp4", "/works/zoon-4.mp4", "/works/zoon-7.mp4"],
  },
  {
    slug: "cocacolapassport",
    name: "Coca-Cola",
    title: "Coca-Cola / Pasaporte Barrio Italia",
    galleryLayout: "strip",
    listCategory: { en: "Loyalty Experience", es: "Experiencia de fidelización" },
    detailMeta: { en: "Loyalty Experience", es: "Experiencia de fidelización" },
    paragraphs: {
      en: [
        "Pasaporte Barrio Italia is a digital loyalty experience for Coca-Cola Andina, designed to encourage people to discover local restaurants and return through rewards. Participants scan a QR code, save a passport to their phone’s digital wallet and collect stamps during their visits to unlock benefits.",
        "I designed the campaign’s mobile web experience, the visual presentation of the wallet pass and reporting templates for the brand and participating restaurants.",
        "The main UX challenge was connecting restaurant discovery, reward information and passport access into a clear experience that people could use while exploring the neighborhood. I organized the 16 participating venues into consistent restaurant cards, supported by a neighborhood map, to help visitors find locations and understand the benefits available at each stop.",
        "Using the typography and color palette provided by Coca-Cola, I defined the website’s layouts, visual hierarchy and components. I also adapted the campaign’s visual language to the compact wallet format, keeping the passport accessible throughout the experience.",
        "For the reporting templates, I focused on information hierarchy and data visualization to make campaign activity readable at both the overall and individual restaurant level.",
        "Within its first six weeks, the campaign reached more than 2,000 users. According to The Clinic Lab’s campaign coverage, 16% of reported revenue came from consumers who returned to use the system.",
      ],
      es: [
        "Pasaporte Barrio Italia es una experiencia digital de fidelización para Coca-Cola Andina, diseñada para incentivar a las personas a descubrir restaurantes locales y volver gracias a las recompensas. Los participantes escanean un código QR, guardan un pasaporte en la billetera digital de su teléfono y juntan sellos durante sus visitas para desbloquear beneficios.",
        "Diseñé la experiencia web mobile de la campaña, la presentación visual del pase de la billetera y las plantillas de reportes para la marca y los restaurantes participantes.",
        "El principal desafío de UX fue conectar el descubrimiento de restaurantes, la información de recompensas y el acceso al pasaporte en una experiencia clara que las personas pudieran usar mientras recorren el barrio. Organicé los 16 locales participantes en tarjetas de restaurante consistentes, apoyadas por un mapa del barrio, para ayudar a los visitantes a encontrar los lugares y entender los beneficios disponibles en cada parada.",
        "Usando la tipografía y la paleta de colores entregadas por Coca-Cola, definí las composiciones, la jerarquía visual y los componentes del sitio. También adapté el lenguaje visual de la campaña al formato compacto de la billetera, manteniendo el pasaporte accesible a lo largo de toda la experiencia.",
        "En las plantillas de reportes me enfoqué en la jerarquía de información y la visualización de datos para que la actividad de la campaña fuera legible tanto a nivel general como de cada restaurante.",
        "En sus primeras seis semanas, la campaña alcanzó a más de 2.000 usuarios. Según la cobertura de la campaña de The Clinic Lab, el 16% de los ingresos reportados provino de consumidores que volvieron a usar el sistema.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Product Designer", es: "Product Designer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2026", es: "2026" },
      },
    ],
    tags: ["web", "product"],
    links: [{
      label: { en: "Read the campaign coverage ↗", es: "Leer la cobertura de la campaña ↗" },
      href: "https://www.theclinic.cl/2026/05/18/juntos-en-todas-coca-cola-andina-pasaporte-digital/",
    },
    {
      label: { en: "Visit the passport ↗", es: "Visitar el pasaporte ↗" },
      href: "https://cocacola.zoonloyalty.io/",
    }],
    images: ["/works/cocacola-1.mp4", "/works/cocacola-2.mp4"],
  },
  {
    slug: "lifeindots",
    name: "Life in dots",
    listCategory: { en: "App", es: "App" },
    listYears: "2026",
    detailMeta: { en: "App / 2026", es: "App / 2026" },
    paragraphs: {
      en: [
        "Your Life in Dots is a minimal web app for tracking daily goals and seeing your entire year at a glance. Each dot represents one day. Over time, those small daily choices become a quiet visual record of consistency, rhythm and change.",
        "I built this project for myself after realizing that most habit trackers felt too demanding, punitive or optimized for productivity. I wanted something softer: a simple way to stay aware of my habits without turning self-improvement into pressure.",
        "The product is designed around a clear interaction: set your goals, mark what you completed and watch your year slowly take shape.",
      ],
      es: [
        "Your Life in Dots es una app web minimalista para llevar el registro de metas diarias y ver tu año completo de un vistazo. Cada punto representa un día. Con el tiempo, esas pequeñas decisiones diarias se convierten en un registro visual silencioso de consistencia, ritmo y cambio.",
        "Construí este proyecto para mí misma después de notar que la mayoría de los rastreadores de hábitos se sentían demasiado exigentes, punitivos u optimizados para la productividad. Quería algo más suave: una forma simple de mantenerme consciente de mis hábitos sin convertir la mejora personal en presión.",
        "El producto está diseñado en torno a una interacción clara: define tus metas, marca lo que completaste y observa cómo tu año va tomando forma poco a poco.",
      ],
    },
    tags: ["web", "product", "code"],
    links: [{
      label: { en: "www.yourlifeindots.com ↗", es: "www.yourlifeindots.com ↗" },
      href: "https://www.yourlifeindots.com",
    }],
    images: ["/works/lifeindots-1.png", "/works/lifeindots-2.png"],
  },
  {
    slug: "sunsetpredictor",
    name: "Sunset Predictor",
    listCategory: { en: "Data Visualization", es: "Visualización de datos" },
    listYears: "2026",
    detailMeta: { en: "Data Visualization", es: "Visualización de datos" },
    paragraphs: {
      en: [
        "Sunset Predictor is a web experiment that uses atmospheric data to estimate the color and character of the evening light. At its center is a simple question: will the sky be worth watching today?",
        "I designed and built the project as an exploration of light, perception and attention. My work connected environmental data, visual interpretation and interface design, turning changing weather conditions into a sphere of light.",
        "The main design challenge was deciding how to translate atmospheric variables into a visual experience. Cloud cover, humidity, air conditions and the position of the sun inform a color gradient that gives the forecast its expression: sometimes warm and golden, sometimes muted, sometimes more dramatic.",
        "I made the sphere the focus of the interface, keeping the surrounding information minimal. Location provides context, while the option to explore other cities invites people to observe how the visualization changes across places.",
        "Designed to live on a small monitor, the result becomes a daily, changing image connected to the sky outside. The project explores how data visualization can encourage curiosity and observation, giving environmental information an emotional and aesthetic presence.",
        "Inspired by the work of Olafur Eliasson and James Turrell.",
      ],
      es: [
        "Sunset Predictor es un experimento web que usa datos atmosféricos para estimar el color y el carácter de la luz del atardecer. En su centro hay una pregunta simple: ¿valdrá la pena mirar el cielo hoy?",
        "Diseñé y construí el proyecto como una exploración de la luz, la percepción y la atención. Mi trabajo conectó datos ambientales, interpretación visual y diseño de interfaz, convirtiendo las condiciones cambiantes del clima en una esfera de luz.",
        "El principal desafío de diseño fue decidir cómo traducir variables atmosféricas en una experiencia visual. La nubosidad, la humedad, las condiciones del aire y la posición del sol dan forma a un degradado de color que le da expresión al pronóstico: a veces cálido y dorado, a veces apagado, a veces más dramático.",
        "Hice de la esfera el foco de la interfaz, manteniendo mínima la información que la rodea. La ubicación aporta contexto, mientras que la opción de explorar otras ciudades invita a observar cómo cambia la visualización de un lugar a otro.",
        "Pensado para vivir en una pantalla pequeña, el resultado se convierte en una imagen diaria y cambiante, conectada con el cielo de afuera. El proyecto explora cómo la visualización de datos puede fomentar la curiosidad y la observación, dándole a la información ambiental una presencia emocional y estética.",
        "Inspirado en el trabajo de Olafur Eliasson y James Turrell.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Designer & Developer", es: "Designer & Developer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2026", es: "2026" },
      },
    ],
    tags: ["code"],
    links: [{
      label: { en: "sunset.mariaalcaino.com ↗", es: "sunset.mariaalcaino.com ↗" },
      href: "https://sunset.mariaalcaino.com",
    }],
    images: ["/works/sunset-4.png"],
  },
  {
    slug: "zhagra",
    name: "Zhagra",
    galleryLayout: "strip",
    listCategory: { en: "Website", es: "Sitio web" },
    detailMeta: { en: "Website", es: "Sitio web" },
    paragraphs: {
      en: [
        "[Zhagra](https://zhagra.com/) is an agricultural technology startup that uses AI and sensor data to support decisions about irrigation, nutrients and growing conditions. Its platform translates information from the farm into recommendations delivered through WhatsApp.",
        "I designed the website and technical infographics, shaping how the company introduces its technology and communicates its application to agriculture.",
        "The main design challenge was explaining the relationship between sensors, AI analysis and farming decisions. I focused on making those connections understandable and helping visitors recognize the practical value of the technology.",
        "For the website, I organized the content around the product’s benefits, how it works and its use cases. Clear layouts and visual hierarchy guide visitors from an introduction to more detailed explanations of the system and the environments where it can be applied.",
        "I also designed technical infographics showing how environmental data moves through the platform, from sensor inputs to analysis, actions and notifications. Combining diagrams with concise text made the relationships between these components easier to follow.",
        "Across the website and infographics, I maintained a consistent visual language, using composition, hierarchy and supporting imagery to connect the technical explanation with the broader product story.",
      ],
      es: [
        "[Zhagra](https://zhagra.com/) es una startup de tecnología agrícola que usa IA y datos de sensores para apoyar decisiones sobre riego, nutrientes y condiciones de cultivo. Su plataforma traduce la información de la granja en recomendaciones que se entregan por WhatsApp.",
        "Diseñé el sitio web y las infografías técnicas, dando forma a cómo la empresa presenta su tecnología y comunica su aplicación en la agricultura.",
        "El principal desafío de diseño fue explicar la relación entre los sensores, el análisis de IA y las decisiones de cultivo. Me enfoqué en hacer comprensibles esas conexiones y en ayudar a los visitantes a reconocer el valor práctico de la tecnología.",
        "Para el sitio web, organicé el contenido en torno a los beneficios del producto, cómo funciona y sus casos de uso. Composiciones claras y una jerarquía visual definida guían a los visitantes desde una introducción hasta explicaciones más detalladas del sistema y de los entornos donde puede aplicarse.",
        "También diseñé infografías técnicas que muestran cómo los datos ambientales se mueven por la plataforma, desde los sensores hasta el análisis, las acciones y las notificaciones. Combinar diagramas con textos concisos hizo que las relaciones entre estos componentes fueran más fáciles de seguir.",
        "A lo largo del sitio web y las infografías mantuve un lenguaje visual consistente, usando composición, jerarquía e imágenes de apoyo para conectar la explicación técnica con la historia más amplia del producto.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Web & Information Designer", es: "Web & Information Designer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2025", es: "2025" },
      },
    ],
    tags: ["brand", "web"],
    links: [{ label: { en: "zhagra.com ↗", es: "zhagra.com ↗" }, href: "https://zhagra.com/" }],
    images: ["/works/zhagra-1.mp4", "/works/zhagra-2.webp", "/works/zhagra-4.mp4", "/works/zhagra-3.webp"],
  },
  {
    slug: "josefinaconlledo",
    name: "Josefina Conlledo",
    hidden: true,
    images: [],
  },
  {
    slug: "fingerpaint",
    name: "fingerpaint.p5js",
    listCategory: { en: "Creative Coding", es: "Creative Coding" },
    listYears: "2024",
    detailMeta: { en: "Creative Coding", es: "Creative Coding" },
    paragraphs: {
      en: [
        "fingerpaint.p5js is a drawing experiment inspired by the feeling of painting with my hands as a child. I designed and built it to explore how that physical experience could translate to a digital canvas.",
        "I built the canvas with p5.js and used ml5.js to track hand gestures through the webcam in real time. Extend your index finger to draw, pinch to change colors, and close your fist to move without leaving a mark.",
        "Closing your fist works like lifting a brush off the page. That gesture gives you control over where each stroke begins and ends, while keeping drawing, color changes and movement in your hand.",
      ],
      es: [
        "fingerpaint.p5js es un experimento de dibujo inspirado en la sensación de pintar con las manos cuando era niña. Lo diseñé y construí para explorar cómo esa experiencia física podría traducirse a un lienzo digital.",
        "Construí el lienzo con p5.js y usé ml5.js para seguir los gestos de la mano a través de la webcam en tiempo real. Extiende el dedo índice para dibujar, junta los dedos para cambiar de color y cierra el puño para moverte sin dejar marca.",
        "Cerrar el puño funciona como levantar el pincel del papel. Ese gesto te da control sobre dónde empieza y termina cada trazo, y mantiene el dibujo, el cambio de color y el movimiento en tu mano.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Designer & Developer", es: "Designer & Developer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2024", es: "2024" },
      },
    ],
    tags: ["code"],
    links: [{
      label: { en: "Try the experiment ↗", es: "Probar el experimento ↗" },
      href: "https://editor.p5js.org/ignaciaalcaino97/full/WdH2oXdwq",
    }],
    demo: {
      src: "https://editor.p5js.org/ignaciaalcaino97/full/WdH2oXdwq",
      title: { en: "fingerpaint.p5js, running live", es: "fingerpaint.p5js, en vivo" },
      button: { en: "[ Try it here ]", es: "[ Pruébalo aquí ]" },
      note: { en: "Needs access to your webcam.", es: "Necesita acceso a tu cámara." },
    },
    images: ["/works/fingerpaint-1.mp4"],
    // the cover on the Home grid is a light copy of the same video (the gallery one is much bigger)
    preview: { type: "video", src: "/works/fingerpaint-cover.mp4" },
  },
  {
    slug: "collegeusa",
    name: "CollegeUSA",
    galleryLayout: "strip",
    listCategory: { en: "Website", es: "Sitio web" },
    detailMeta: { en: "Website", es: "Sitio web" },
    paragraphs: {
      en: [
        "CollegeUSA helps students navigate the application process for universities in the United States. I designed and developed its landing page, translating the existing brand identity into a responsive website that introduces the service, explains its approach and invites visitors to get in touch.",
        "The main design challenge was presenting a service with several stages and a strong personal component. Students and families needed to understand the support available, how the process worked and who would be guiding them.",
        "I structured the content around the service, methodology, testimonials and founder’s experience. The information hierarchy connects the practical explanation of the offering with the people and experience behind it, helping visitors assess whether the service fits their needs.",
        "I adapted the brand’s typography, colors and graphic elements to the web, defining layouts and interactions for desktop and mobile. On smaller screens, card-based content becomes a swipeable carousel, allowing visitors to explore the information within a compact layout.",
        "My work covered design, development and publication, including responsive behavior, interactive elements and a direct email contact route to make starting a conversation straightforward.",
      ],
      es: [
        "CollegeUSA ayuda a estudiantes a navegar el proceso de postulación a universidades de Estados Unidos. Diseñé y desarrollé su landing page, traduciendo la identidad de marca existente en un sitio web responsivo que presenta el servicio, explica su enfoque e invita a los visitantes a ponerse en contacto.",
        "El principal desafío de diseño fue presentar un servicio con varias etapas y un fuerte componente personal. Estudiantes y familias necesitaban entender el apoyo disponible, cómo funcionaba el proceso y quién los acompañaría.",
        "Estructuré el contenido en torno al servicio, la metodología, los testimonios y la experiencia del fundador. La jerarquía de información conecta la explicación práctica de la oferta con las personas y la experiencia que hay detrás, ayudando a los visitantes a evaluar si el servicio se ajusta a sus necesidades.",
        "Adapté la tipografía, los colores y los elementos gráficos de la marca a la web, definiendo composiciones e interacciones para desktop y mobile. En pantallas más pequeñas, el contenido en tarjetas se convierte en un carrusel deslizable, lo que permite explorar la información en un formato compacto.",
        "Mi trabajo abarcó el diseño, el desarrollo y la publicación, incluyendo el comportamiento responsivo, los elementos interactivos y una vía de contacto directa por correo para que iniciar una conversación sea sencillo.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Web Designer & Developer", es: "Web Designer & Developer" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2023", es: "2023" },
      },
    ],
    tags: ["web", "code"],
    links: [{ label: { en: "collegeusa.cl ↗", es: "collegeusa.cl ↗" }, href: "https://www.collegeusa.cl/" }],
    images: ["/works/collegeusa-1.mp4", "/works/collegeusa-2.mp4", "/works/collegeusa-3.mp4"],
  },
];

export const projects = allProjects.filter((project) => !project.hidden);
