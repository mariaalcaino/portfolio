import type { Lang } from "../i18n/LanguageContext";

export type PreviewMedia = { type: "image" | "video"; src: string };

type Localized<T> = { en: T; es: T };

export type Section = { heading: string; paragraphs: string[] };
export type ProjectLink = { label: Localized<string>; href: string };
export type Fact = { label: Localized<string>; value: Localized<string> };

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
  /** Short label/value pairs (role, year…) shown right under the title, before the mockups. */
  facts?: Fact[];
  /** Longer case studies: titled sections shown after the intro and facts. */
  sections?: Localized<Section[]>;
  links?: ProjectLink[];
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
        value: { en: "Product Designer & Developer", es: "Diseñadora de producto y desarrolladora" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2026", es: "2026" },
      },
    ],
    links: [{ label: { en: "www.tandie.app ↗", es: "www.tandie.app ↗" }, href: "https://www.tandie.app" }],
    images: [
      "/works/tandie-5.mp4",
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
        "The main UX challenge was making wholesale purchasing easier to navigate. Stores could order from multiple brands in one cart, but each brand had its own minimum orders, discounts and promotions. The experience grouped products by brand and highlighted unmet minimums before checkout. Available credit remained visible throughout the platform, helping store owners understand their purchasing capacity.",
        "Research grounded the work in everyday retail needs. I visited stores and spoke with store owners and suppliers to understand their ordering habits, workflows and pain points, then translated those insights into product flows and responsive interfaces.",
        "My scope also included the store dashboard, referral program, mobile experience and Bagoost Points, a physical retail concept introduced in partner stores across Chile.",
        "By the time I left, Bagoost had grown to 80+ brands, 1,400+ products and 400+ stores nationwide. In 2022, the startup was also selected by Corfo among Chile’s top 50 food innovations.",
      ],
      es: [
        "Me uní a Bagoost en su etapa fundacional como parte del equipo de diseño. Mi trabajo incluyó crear la identidad de marca y diseñar la experiencia central de un marketplace B2B que ayudaba a marcas independientes a vender a tiendas locales de todo Chile.",
        "El principal desafío de UX fue hacer que la compra mayorista fuera más fácil de navegar. Las tiendas podían pedir a varias marcas en un mismo carro de compras, pero cada marca tenía sus propios pedidos mínimos, descuentos y promociones. La experiencia agrupaba los productos por marca y destacaba los mínimos pendientes antes del pago. El crédito disponible se mantenía visible en toda la plataforma, ayudando a los dueños de tienda a entender su capacidad de compra.",
        "La investigación ancló el trabajo en las necesidades cotidianas del retail. Visité tiendas y conversé con dueños y proveedores para entender sus hábitos de pedido, sus flujos de trabajo y sus dolores, y luego traduje esos aprendizajes en flujos de producto e interfaces responsivas.",
        "Mi alcance también incluyó el dashboard de tiendas, el programa de referidos, la experiencia mobile y Bagoost Points, un concepto de retail físico introducido en tiendas asociadas de todo Chile.",
        "Cuando me fui, Bagoost había crecido hasta más de 80 marcas, más de 1.400 productos y más de 400 tiendas a nivel nacional. En 2022, la startup también fue seleccionada por Corfo entre las 50 innovaciones alimentarias más destacadas de Chile.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Product Designer", es: "Diseñadora de producto" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2021-2022", es: "2021-2022" },
      },
    ],
    links: [{ label: { en: "www.bagoost.com ↗", es: "www.bagoost.com ↗" }, href: "https://www.bagoost.com" }],
    images: ["/works/bagoost-5.mp4", "/works/bagoost-7.mp4", "/works/bagoost-8.mp4"],
  },
  {
    slug: "zoon",
    name: "Zoön",
    listCategory: { en: "Loyalty & engagement SaaS", es: "SaaS de fidelización" },
    listYears: "2023 · 2025",
    detailMeta: { en: "SaaS / 2023 - 2025", es: "SaaS / 2023 - 2025" },
    paragraphs: {
      en: [
        "Many engagement programs rely on familiar mechanics: points, stamps, coupons and rewards. But the real design challenge is behavioral. People need to understand the value quickly, join without friction and remember to come back.",
        "I joined Zoön as the first in-house Product Designer, helping the company transition from an external development model to an internal product team. My work covered UX/UI, product flows, prototyping, design systems and collaboration with product, development and business teams.",
        "One of the flagship products was a low-friction digital wallet pass for Google and Apple Wallet. No app download, no account creation: just a quick scan and a pass saved directly to the user's phone.",
        "My work focused on making loyalty and engagement mechanics feel simple, accessible and repeatable for both end users and partner businesses.",
        "By the time I left, the product had reached 12,000+ enrolled consumers, 2.7 average repeat purchases per client and a 27% sales increase across partner locations.",
      ],
      es: [
        "Muchos programas de fidelización se apoyan en mecánicas conocidas: puntos, sellos, cupones y recompensas. Pero el verdadero desafío de diseño es conductual. Las personas necesitan entender el valor rápido, sumarse sin fricción y recordar volver.",
        "Me uní a Zoön como la primera Product Designer interna, ayudando a la empresa a transitar desde un modelo de desarrollo externo hacia un equipo de producto interno. Mi trabajo abarcó UX/UI, flujos de producto, prototipado, sistemas de diseño y colaboración con los equipos de producto, desarrollo y negocio.",
        "Uno de los productos insignia fue un pase digital de bajo esfuerzo para Google y Apple Wallet. Sin descargar una app, sin crear una cuenta: solo un escaneo rápido y un pase guardado directamente en el teléfono del usuario.",
        "Mi trabajo se enfocó en hacer que las mecánicas de fidelización se sintieran simples, accesibles y repetibles tanto para los usuarios finales como para los negocios asociados.",
        "Cuando me fui, el producto ya había alcanzado más de 12.000 consumidores inscritos, un promedio de 2,7 compras repetidas por cliente y un aumento de ventas del 27% en los locales asociados.",
      ],
    },
    links: [{ label: { en: "www.zoonloyalty.io ↗", es: "www.zoonloyalty.io ↗" }, href: "https://www.zoonloyalty.io" }],
    images: ["/works/zoon-1.png", "/works/zoon-2.png"],
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
        value: { en: "Product Designer", es: "Diseñadora de producto" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2026", es: "2026" },
      },
    ],
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
    links: [{
      label: { en: "www.yourlifeindots.com ↗", es: "www.yourlifeindots.com ↗" },
      href: "https://www.yourlifeindots.com",
    }],
    images: ["/works/lifeindots-1.png", "/works/lifeindots-2.png"],
  },
  {
    slug: "sunsetpredictor",
    name: "Sunset Predictor",
    listCategory: { en: "Data experiment", es: "Experimento de datos" },
    listYears: "2026",
    detailMeta: { en: "Data experiment / 2025", es: "Experimento de datos / 2025" },
    paragraphs: {
      en: [
        "Light has physics, but it also has feeling. It scatters, diffuses and shifts through the atmosphere — shaped by humidity, cloud cover, air conditions and the position of the sun.",
        "Sunset Predictor is a web experiment that uses atmospheric data to estimate the quality and color of the evening light. Instead of forecasting rain or temperature, it asks a quieter question: will the sky be worth watching today?",
        "The system reads real-time weather variables and translates them into a color gradient rendered as a sphere of light. The result lives on a small monitor like a daily painting — sometimes golden, sometimes muted, sometimes dramatic, always connected to the sky outside.",
        "I built it as a study of light, perception and attention. A way to turn environmental data into something emotional, observable and almost ritual.",
        "Inspired by the work of Olafur Eliasson and James Turrell.",
      ],
      es: [
        "La luz tiene física, pero también tiene sensación. Se dispersa, se difumina y cambia a través de la atmósfera — moldeada por la humedad, la nubosidad, las condiciones del aire y la posición del sol.",
        "Sunset Predictor es un experimento web que usa datos atmosféricos para estimar la calidad y el color de la luz del atardecer. En lugar de pronosticar lluvia o temperatura, plantea una pregunta más silenciosa: ¿valdrá la pena mirar el cielo hoy?",
        "El sistema lee variables meteorológicas en tiempo real y las traduce en un degradado de color renderizado como una esfera de luz. El resultado vive en una pequeña pantalla como una pintura diaria — a veces dorada, a veces apagada, a veces dramática, siempre conectada al cielo de afuera.",
        "Lo construí como un estudio de la luz, la percepción y la atención. Una forma de convertir datos ambientales en algo emocional, observable y casi ritual.",
        "Inspirado en el trabajo de Olafur Eliasson y James Turrell.",
      ],
    },
    links: [{
      label: { en: "sunset.mariaalcaino.com ↗", es: "sunset.mariaalcaino.com ↗" },
      href: "https://sunset.mariaalcaino.com",
    }],
    images: ["/works/sunset-4.png", "/works/sunset-1.png", "/works/sunset-2.png", "/works/sunset-3.png"],
  },
  {
    slug: "zhagra",
    name: "Zhagra",
    galleryLayout: "strip",
    listCategory: { en: "Website & infographics", es: "Sitio web e infografías" },
    paragraphs: {
      en: [
        "Zhagra is a startup applying artificial intelligence to agriculture. I designed its website and technical infographics, translating complex information into a clear and consistent visual experience.",
      ],
      es: [
        "Zhagra es una startup que aplica inteligencia artificial a la agricultura. Diseñé su sitio web y sus infografías técnicas, traduciendo información compleja en una experiencia visual clara y coherente.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Web & Information Designer", es: "Diseñadora web y de información" },
      },
      {
        label: { en: "Year", es: "Año" },
        value: { en: "2025", es: "2025" },
      },
    ],
    sections: {
      en: [
        {
          heading: "The challenge",
          paragraphs: [
            "Explain a technical product in a way that makes it approachable while preserving the detail needed to understand it.",
          ],
        },
        {
          heading: "Introducing the technology",
          paragraphs: [
            "I designed the website to introduce Zhagra’s platform, organizing technical content through clear layouts and visual hierarchy. The focus was on helping visitors understand the offering and its application to agriculture.",
          ],
        },
        {
          heading: "Making complexity visible",
          paragraphs: [
            "I designed technical infographics to support the explanation of the platform. By combining diagrams and concise text, I translated complex concepts into visual explanations that could be explored alongside the website’s content.",
          ],
        },
      ],
      es: [
        {
          heading: "El desafío",
          paragraphs: [
            "Explicar un producto técnico de manera que resulte accesible, sin perder el detalle necesario para entenderlo.",
          ],
        },
        {
          heading: "Presentando la tecnología",
          paragraphs: [
            "Diseñé el sitio web para presentar la plataforma de Zhagra, organizando el contenido técnico con composiciones claras y una jerarquía visual definida. El foco estuvo en ayudar a los visitantes a entender la oferta y su aplicación en la agricultura.",
          ],
        },
        {
          heading: "Haciendo visible la complejidad",
          paragraphs: [
            "Diseñé infografías técnicas para apoyar la explicación de la plataforma. Combinando diagramas y textos concisos, traduje conceptos complejos en explicaciones visuales que podían explorarse junto al contenido del sitio.",
          ],
        },
      ],
    },
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
    listCategory: { en: "Creative coding", es: "Creative coding" },
    listYears: "2024",
    detailMeta: { en: "Creative Coding / 2024", es: "Creative Coding / 2024" },
    paragraphs: {
      en: [
        "fingerpaint.p5.js is a creative coding experiment inspired by the instinctive joy of painting with your hands as a child.",
        "Built with p5.js and ml5.js, the project uses real-time hand tracking to turn the hand into both input and brush. Extend your index finger to draw, pinch to change color and close your fist to move without leaving a mark.",
        "I built it as a small study of childhood memory, creative coding and embodied interaction — a way to return to the first marks we make before design becomes too controlled.",
      ],
      es: [
        "fingerpaint.p5.js es un experimento de creative coding inspirado en la alegría instintiva de pintar con las manos durante la infancia.",
        "Construido con p5.js y ml5.js, el proyecto usa seguimiento de manos en tiempo real para convertir la mano en input y pincel a la vez. Extiende el dedo índice para dibujar, junta los dedos para cambiar de color y cierra el puño para moverte sin dejar marca.",
        "Lo construí como un pequeño estudio de la memoria de infancia, el creative coding y la interacción corporal — una forma de volver a los primeros trazos que hacemos antes de que el diseño se vuelva demasiado controlado.",
      ],
    },
    links: [{
      label: { en: "Try the experiment ↗", es: "Probar el experimento ↗" },
      href: "https://editor.p5js.org/ignaciaalcaino97/full/WdH2oXdwq",
    }],
    images: [],
  },
  {
    slug: "collegeusa",
    name: "CollegeUSA",
    listCategory: { en: "Landing page", es: "Landing page" },
    paragraphs: {
      en: [
        "CollegeUSA helps students navigate the application process for universities in the United States. I designed and developed its landing page, translating the brand identity into a responsive website that introduces the service, explains its approach and invites visitors to get in touch.",
      ],
      es: [
        "CollegeUSA ayuda a estudiantes a navegar el proceso de postulación a universidades de Estados Unidos. Diseñé y desarrollé su landing page, traduciendo la identidad de marca en un sitio web responsivo que presenta el servicio, explica su enfoque e invita a los visitantes a ponerse en contacto.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: { en: "Web Designer & Developer", es: "Diseñadora y desarrolladora web" },
      },
    ],
    sections: {
      en: [
        {
          heading: "The challenge",
          paragraphs: [
            "Communicate a service with several stages and a strong personal component. The landing needed to help students and families understand the support available and feel confident starting a conversation.",
          ],
        },
        {
          heading: "Translating the brand into the experience",
          paragraphs: [
            "I adapted the brand’s visual identity to the web through typography, color, layout and graphic elements. I designed the content hierarchy to guide visitors through the service, methodology, testimonials and founder’s experience.",
          ],
        },
        {
          heading: "Designing across screens",
          paragraphs: [
            "I designed and implemented desktop and mobile layouts, adapting spacing, navigation and interactions to each screen size. On mobile, card-based content becomes a swipeable carousel, keeping information accessible within a compact layout.",
          ],
        },
        {
          heading: "From design to launch",
          paragraphs: [
            "I carried the landing from design through development and publication, including responsive behavior, interactions and a direct email contact route.",
          ],
        },
      ],
      es: [
        {
          heading: "El desafío",
          paragraphs: [
            "Comunicar un servicio con varias etapas y un fuerte componente personal. La landing debía ayudar a estudiantes y familias a entender el apoyo disponible y a sentirse seguros de iniciar una conversación.",
          ],
        },
        {
          heading: "Llevando la marca a la experiencia",
          paragraphs: [
            "Adapté la identidad visual de la marca a la web a través de la tipografía, el color, la composición y los elementos gráficos. Diseñé la jerarquía de contenidos para guiar a los visitantes por el servicio, la metodología, los testimonios y la experiencia de la persona fundadora.",
          ],
        },
        {
          heading: "Diseñando para todas las pantallas",
          paragraphs: [
            "Diseñé e implementé versiones para desktop y mobile, adaptando espaciados, navegación e interacciones a cada tamaño de pantalla. En mobile, el contenido en tarjetas se convierte en un carrusel deslizable, manteniendo la información accesible en un formato compacto.",
          ],
        },
        {
          heading: "Del diseño al lanzamiento",
          paragraphs: [
            "Llevé la landing desde el diseño hasta el desarrollo y la publicación, incluyendo el comportamiento responsivo, las interacciones y una vía de contacto directa por correo.",
          ],
        },
      ],
    },
    images: [],
  },
];

export const projects = allProjects.filter((project) => !project.hidden);
