import type { Lang } from "../i18n/LanguageContext";

export type PreviewMedia = { type: "image" | "video"; src: string };

type Localized<T> = { en: T; es: T };

export type Project = {
  slug: string;
  name: string;
  /** Omit while the case study isn't written yet — the grid card and detail page degrade gracefully. */
  listCategory?: Localized<string>;
  listYears?: string;
  detailMeta?: Localized<string>;
  tagline?: Localized<string>;
  paragraphs?: Localized<string[]>;
  link?: { label: Localized<string>; href: string };
  images: string[];
  /** Hover preview on the Home list. Defaults to the first gallery image when omitted. */
  preview?: PreviewMedia;
};

export function getPreviewMedia(project: Project): PreviewMedia | null {
  if (project.preview) return project.preview;
  if (project.images[0]) return { type: "image", src: project.images[0] };
  return null;
}

export function pick<T>(field: Localized<T> | undefined, lang: Lang): T | undefined {
  return field ? field[lang] : undefined;
}

export const projects: Project[] = [
  {
    slug: "nuptio",
    name: "Nuptio",
    images: [],
  },
  {
    slug: "bagoost",
    name: "Bagoost",
    listCategory: { en: "B2B marketplace", es: "Marketplace B2B" },
    listYears: "2021 · 2022",
    detailMeta: { en: "B2B Marketplace / 2021-2022", es: "Marketplace B2B / 2021-2022" },
    tagline: {
      en: "A B2B marketplace connecting independent Chilean brands with local stores.",
      es: "Un marketplace B2B que conecta marcas chilenas independientes con tiendas locales.",
    },
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
    tagline: {
      en: "Making engagement easier to join, repeat and remember.",
      es: "Haciendo que la fidelización sea más fácil de adoptar, repetir y recordar.",
    },
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
    tagline: {
      en: "A habit tracker that turns your year into a visual map.",
      es: "Un rastreador de hábitos que convierte tu año en un mapa visual.",
    },
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
    tagline: {
      en: "A daily forecast for the color of the sky.",
      es: "Un pronóstico diario para el color del cielo.",
    },
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
    images: [],
  },
  {
    slug: "fingerpaint",
    name: "fingerpaint.p5js",
    listCategory: { en: "Creative coding", es: "Creative coding" },
    listYears: "2024",
    detailMeta: { en: "Creative Coding / 2024", es: "Creative Coding / 2024" },
    tagline: {
      en: "An interactive drawing tool that lets you paint with your hands.",
      es: "Una herramienta de dibujo interactiva que te deja pintar con las manos.",
    },
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
    name: "College USA",
    images: [],
  },
];
