import type { Lang } from "../i18n/LanguageContext";

export type PreviewMedia = { type: "image" | "video"; src: string };

type Localized<T> = { en: T; es: T };

export type Section = { heading: string; paragraphs: string[] };
export type Fact = { label: Localized<string>; value: Localized<string> };

export type Project = {
  slug: string;
  name: string;
  /** Keeps the project out of the grid and its page unreachable until it's ready to show. */
  hidden?: boolean;
  /** Omit while the case study isn't written yet — the grid card and detail page degrade gracefully. */
  listCategory?: Localized<string>;
  listYears?: string;
  detailMeta?: Localized<string>;
  paragraphs?: Localized<string[]>;
  /** Short label/value pairs (role, platform…) shown between the intro and the sections. */
  facts?: Fact[];
  /** Longer case studies: titled sections shown after the intro and facts. */
  sections?: Localized<Section[]>;
  link?: { label: Localized<string>; href: string };
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
  if (project.images[0]) return { type: "image", src: project.images[0] };
  return null;
}

export function pick<T>(field: Localized<T> | undefined, lang: Lang): T | undefined {
  return field ? field[lang] : undefined;
}

const allProjects: Project[] = [
  {
    slug: "tandie",
    name: "Tandie",
    preview: { type: "image", src: "/works/tandie-1.jpg" },
    galleryLayout: "strip",
    listCategory: { en: "Web application", es: "Aplicación web" },
    paragraphs: {
      en: [
        "Tandie brings invitations, guests, seating, tasks and budgets into one planning experience. I co-founded the product and led its definition and design, from the initial structure to the detailed interactions.",
      ],
      es: [
        "Tandie reúne invitaciones, invitados, distribución de mesas, tareas y presupuestos en una sola experiencia de planificación. Co-fundé el producto y lideré su definición y diseño, desde la estructura inicial hasta las interacciones de detalle.",
      ],
    },
    facts: [
      {
        label: { en: "Role", es: "Rol" },
        value: {
          en: "Co-founder · Designer & Developer",
          es: "Cofundadora · Diseñadora y desarrolladora",
        },
      },
      {
        label: { en: "Platform", es: "Plataforma" },
        value: { en: "Web application", es: "Aplicación web" },
      },
    ],
    sections: {
      en: [
        {
          heading: "The challenge",
          paragraphs: [
            "Planning a wedding involves decisions that depend on one another. Guest confirmations affect seating, budgets shape supplier choices, and tasks need coordination between several people.",
            "The challenge was to bring these activities together in a product that couples could navigate easily and wedding planners could use across multiple events.",
          ],
        },
        {
          heading: "My contribution",
          paragraphs: [
            "I led product definition, information architecture, interaction design, the design system and visual identity. Working alongside my technical co-founder, I translated planning needs into product requirements and supported the experience through implementation.",
            "The work involved defining how the different parts of the product should fit together, as well as designing each individual flow.",
          ],
        },
        {
          heading: "Connecting invitations with planning",
          paragraphs: [
            "The invitation is also a way to collect information. I designed an RSVP flow that captures attendance, accompanying guests and dietary requirements, connecting the guest-facing experience with the information needed to organize the wedding.",
            "The aim was to make responding straightforward for guests and keep their answers useful for the people planning the event.",
          ],
        },
        {
          heading: "Making complex decisions easier to manage",
          paragraphs: [
            "I designed different interactions around the task at hand: dragging guests into seating arrangements, organizing tasks by category and priority, and reviewing expenses within a dedicated budget view.",
            "A shared design system brings consistency across these tools while allowing each one to support a different kind of decision.",
          ],
        },
        {
          heading: "Supporting couples and professional planners",
          paragraphs: [
            "Couples organize one wedding; planners coordinate several. I designed experiences for both contexts, including collaboration within a wedding and an overview for moving between multiple events.",
            "The product also offers different levels of access, from invitations and guest management to a broader planning workspace.",
          ],
        },
        {
          heading: "From concept to beta",
          paragraphs: [
            "Tandie has progressed into beta testing with early users. This stage provides an opportunity to evaluate how the connected workflows support real planning and identify what needs refinement before broader release.",
          ],
        },
      ],
      es: [
        {
          heading: "El desafío",
          paragraphs: [
            "Planificar un matrimonio implica decisiones que dependen unas de otras. Las confirmaciones de los invitados afectan la distribución de las mesas, los presupuestos condicionan la elección de proveedores y las tareas requieren coordinación entre varias personas.",
            "El desafío fue reunir estas actividades en un producto que las parejas pudieran recorrer con facilidad y que los wedding planners pudieran usar en varios eventos.",
          ],
        },
        {
          heading: "Mi contribución",
          paragraphs: [
            "Lideré la definición del producto, la arquitectura de información, el diseño de interacción, el sistema de diseño y la identidad visual. Junto a mi cofundador técnico, traduje las necesidades de la planificación en requerimientos de producto y acompañé la experiencia durante la implementación.",
            "El trabajo implicó definir cómo debían encajar las distintas partes del producto, además de diseñar cada flujo individual.",
          ],
        },
        {
          heading: "Conectando las invitaciones con la planificación",
          paragraphs: [
            "La invitación también es una forma de recopilar información. Diseñé un flujo de confirmación de asistencia (RSVP) que recoge la asistencia, los acompañantes y los requerimientos alimentarios, conectando la experiencia de los invitados con la información que se necesita para organizar el matrimonio.",
            "El objetivo fue que responder fuera simple para los invitados y que sus respuestas fueran útiles para quienes planifican el evento.",
          ],
        },
        {
          heading: "Haciendo más manejables las decisiones complejas",
          paragraphs: [
            "Diseñé distintas interacciones según la tarea: arrastrar invitados para armar la distribución de mesas, organizar tareas por categoría y prioridad, y revisar los gastos en una vista de presupuesto dedicada.",
            "Un sistema de diseño compartido aporta coherencia entre estas herramientas, permitiendo que cada una apoye un tipo distinto de decisión.",
          ],
        },
        {
          heading: "Acompañando a parejas y planners profesionales",
          paragraphs: [
            "Las parejas organizan un matrimonio; los planners coordinan varios. Diseñé experiencias para ambos contextos, incluyendo la colaboración dentro de un matrimonio y una vista general para moverse entre múltiples eventos.",
            "El producto también ofrece distintos niveles de acceso, desde las invitaciones y la gestión de invitados hasta un espacio de planificación más amplio.",
          ],
        },
        {
          heading: "Del concepto a la beta",
          paragraphs: [
            "Tandie avanzó a una etapa de pruebas beta con usuarios tempranos. Esta etapa permite evaluar cómo los flujos conectados apoyan una planificación real e identificar qué necesita ajustarse antes de un lanzamiento más amplio.",
          ],
        },
      ],
    },
    link: { label: { en: "www.tandie.app", es: "www.tandie.app" }, href: "https://www.tandie.app" },
    images: ["/works/tandie-1.mp4", "/works/tandie-2.mp4", "/works/tandie-3.mp4", "/works/tandie-4.mp4"],
  },
  {
    slug: "bagoost",
    name: "Bagoost",
    listCategory: { en: "B2B marketplace", es: "Marketplace B2B" },
    listYears: "2021 · 2022",
    detailMeta: { en: "B2B Marketplace / 2021-2022", es: "Marketplace B2B / 2021-2022" },
    paragraphs: {
      en: [
        "I joined Bagoost at its founding stage as part of the design team. During my time there, we shaped the brand identity from scratch and designed the core product experience for a marketplace built around wholesale commerce.",
        "One of the main UX challenges was making a complex purchasing system feel simple for store owners. Each brand had different wholesale rules, minimum order quantities, volume discounts and promotional logic. My role was to translate that complexity into clear flows that helped stores discover, compare and buy products with less friction.",
        "I also designed key parts of the platform, including the store dashboard, referral program, mobile experience and Bagoost Points, a physical retail concept installed in partner stores across Chile.",
        "Research played an important role throughout the process. I spent time in the field visiting local stores and speaking with store owners and brands to understand their pain points, workflows and decision-making habits, then brought those insights back into the product.",
        "By the time I left, Bagoost had reached 80+ brands, 1,400+ products and 400+ stores nationwide. The startup was also selected by Corfo among Chile's top 50 food innovations of 2022.",
      ],
      es: [
        "Me uní a Bagoost en su etapa fundacional como parte del equipo de diseño. Durante ese tiempo, construimos la identidad de marca desde cero y diseñamos la experiencia central de un marketplace pensado para el comercio mayorista.",
        "Uno de los principales desafíos de UX fue hacer que un sistema de compra complejo se sintiera simple para los dueños de tienda. Cada marca tenía reglas mayoristas distintas, cantidades mínimas de compra, descuentos por volumen y lógicas promocionales propias. Mi rol fue traducir esa complejidad en flujos claros que ayudaran a las tiendas a descubrir, comparar y comprar productos con menos fricción.",
        "También diseñé partes clave de la plataforma, incluyendo el dashboard de tiendas, el programa de referidos, la experiencia mobile y Bagoost Points, un concepto de retail físico instalado en tiendas asociadas de todo Chile.",
        "La investigación jugó un rol importante durante todo el proceso. Pasé tiempo en terreno visitando tiendas locales y conversando con dueños y marcas para entender sus dolores, flujos de trabajo y forma de tomar decisiones, para luego traer esos aprendizajes de vuelta al producto.",
        "Cuando me fui, Bagoost ya había alcanzado más de 80 marcas, más de 1.400 productos y más de 400 tiendas a nivel nacional. La startup también fue seleccionada por Corfo entre las 50 innovaciones alimentarias más destacadas de Chile en 2022.",
      ],
    },
    link: { label: { en: "www.bagoost.com", es: "www.bagoost.com" }, href: "https://www.bagoost.com" },
    images: ["/works/bagoost-1.png", "/works/bagoost-2.png", "/works/bagoost-3.png", "/works/bagoost-4.png"],
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
    link: { label: { en: "www.zoonloyalty.io", es: "www.zoonloyalty.io" }, href: "https://www.zoonloyalty.io" },
    images: ["/works/zoon-1.png", "/works/zoon-2.png"],
  },
  {
    slug: "cocacolapassport",
    name: "Coca-Cola",
    images: [],
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
    link: {
      label: { en: "www.yourlifeindots.com", es: "www.yourlifeindots.com" },
      href: "https://www.yourlifeindots.com",
    },
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
    link: {
      label: { en: "sunset.mariaalcaino.com", es: "sunset.mariaalcaino.com" },
      href: "https://sunset.mariaalcaino.com",
    },
    images: ["/works/sunset-1.png", "/works/sunset-2.png", "/works/sunset-3.png"],
  },
  {
    slug: "zhagra",
    name: "Zhagra",
    images: [],
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
    link: {
      label: { en: "Try the experiment →", es: "Probar el experimento →" },
      href: "https://editor.p5js.org/ignaciaalcaino97/full/WdH2oXdwq",
    },
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
