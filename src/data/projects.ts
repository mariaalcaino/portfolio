export type PreviewMedia = { type: "image" | "video"; src: string };

export type Project = {
  slug: string;
  name: string;
  listCategory: string;
  listYears: string;
  detailMeta: string;
  tagline: string;
  paragraphs: string[];
  link?: { label: string; href: string };
  images: string[];
  /** Hover preview on the Home list. Defaults to the first gallery image when omitted. */
  preview?: PreviewMedia;
};

export function getPreviewMedia(project: Project): PreviewMedia | null {
  if (project.preview) return project.preview;
  if (project.images[0]) return { type: "image", src: project.images[0] };
  return null;
}

export const projects: Project[] = [
  {
    slug: "bagoost",
    name: "Bagoost",
    listCategory: "B2B marketplace",
    listYears: "2021 · 2022",
    detailMeta: "B2B Marketplace / 2021-2022",
    tagline: "A B2B marketplace connecting independent Chilean brands with local stores.",
    paragraphs: [
      "I joined Bagoost at its founding stage as part of the design team. During my time there, we shaped the brand identity from scratch and designed the core product experience for a marketplace built around wholesale commerce.",
      "One of the main UX challenges was making a complex purchasing system feel simple for store owners. Each brand had different wholesale rules, minimum order quantities, volume discounts and promotional logic. My role was to translate that complexity into clear flows that helped stores discover, compare and buy products with less friction.",
      "I also designed key parts of the platform, including the store dashboard, referral program, mobile experience and Bagoost Points, a physical retail concept installed in partner stores across Chile.",
      "Research played an important role throughout the process. I spent time in the field visiting local stores and speaking with store owners and brands to understand their pain points, workflows and decision-making habits, then brought those insights back into the product.",
      "By the time I left, Bagoost had reached 80+ brands, 1,400+ products and 400+ stores nationwide. The startup was also selected by Corfo among Chile's top 50 food innovations of 2022.",
    ],
    link: { label: "www.bagoost.com", href: "https://www.bagoost.com" },
    images: ["/works/bagoost-1.png", "/works/bagoost-2.png", "/works/bagoost-3.png", "/works/bagoost-4.png"],
  },
  {
    slug: "zoon",
    name: "Zoön",
    listCategory: "Loyalty & engagement SaaS",
    listYears: "2023 · 2025",
    detailMeta: "SaaS / 2023 - 2025",
    tagline: "Making engagement easier to join, repeat and remember.",
    paragraphs: [
      "Many engagement programs rely on familiar mechanics: points, stamps, coupons and rewards. But the real design challenge is behavioral. People need to understand the value quickly, join without friction and remember to come back.",
      "I joined Zoön as the first in-house Product Designer, helping the company transition from an external development model to an internal product team. My work covered UX/UI, product flows, prototyping, design systems and collaboration with product, development and business teams.",
      "One of the flagship products was a low-friction digital wallet pass for Google and Apple Wallet. No app download, no account creation: just a quick scan and a pass saved directly to the user's phone.",
      "My work focused on making loyalty and engagement mechanics feel simple, accessible and repeatable for both end users and partner businesses.",
      "By the time I left, the product had reached 12,000+ enrolled consumers, 2.7 average repeat purchases per client and a 27% sales increase across partner locations.",
    ],
    link: { label: "www.zoonloyalty.io", href: "https://www.zoonloyalty.io" },
    images: ["/works/zoon-1.png", "/works/zoon-2.png"],
  },
  {
    slug: "lifeindots",
    name: "Life in dots",
    listCategory: "App",
    listYears: "2026",
    detailMeta: "App / 2026",
    tagline: "A habit tracker that turns your year into a visual map.",
    paragraphs: [
      "Your Life in Dots is a minimal web app for tracking daily goals and seeing your entire year at a glance. Each dot represents one day. Over time, those small daily choices become a quiet visual record of consistency, rhythm and change.",
      "I built this project for myself after realizing that most habit trackers felt too demanding, punitive or optimized for productivity. I wanted something softer: a simple way to stay aware of my habits without turning self-improvement into pressure.",
      "The product is designed around a clear interaction: set your goals, mark what you completed and watch your year slowly take shape.",
    ],
    link: { label: "www.yourlifeindots.com", href: "https://www.yourlifeindots.com" },
    images: ["/works/lifeindots-1.png", "/works/lifeindots-2.png"],
  },
  {
    slug: "sunsetpredictor",
    name: "Sunset Predictor",
    listCategory: "Data experiment",
    listYears: "2026",
    detailMeta: "Data experiment / 2025",
    tagline: "A daily forecast for the color of the sky.",
    paragraphs: [
      "Light has physics, but it also has feeling. It scatters, diffuses and shifts through the atmosphere — shaped by humidity, cloud cover, air conditions and the position of the sun.",
      "Sunset Predictor is a web experiment that uses atmospheric data to estimate the quality and color of the evening light. Instead of forecasting rain or temperature, it asks a quieter question: will the sky be worth watching today?",
      "The system reads real-time weather variables and translates them into a color gradient rendered as a sphere of light. The result lives on a small monitor like a daily painting — sometimes golden, sometimes muted, sometimes dramatic, always connected to the sky outside.",
      "I built it as a study of light, perception and attention. A way to turn environmental data into something emotional, observable and almost ritual.",
      "Inspired by the work of Olafur Eliasson and James Turrell.",
    ],
    link: { label: "sunset.mariaalcaino.com", href: "https://sunset.mariaalcaino.com" },
    images: ["/works/sunset-1.png", "/works/sunset-2.png", "/works/sunset-3.png"],
  },
  {
    slug: "fingerpaint",
    name: "fingerpaint.p5js",
    listCategory: "Creative coding",
    listYears: "2024",
    detailMeta: "Creative Coding / 2024",
    tagline: "An interactive drawing tool that lets you paint with your hands.",
    paragraphs: [
      "fingerpaint.p5.js is a creative coding experiment inspired by the instinctive joy of painting with your hands as a child.",
      "Built with p5.js and ml5.js, the project uses real-time hand tracking to turn the hand into both input and brush. Extend your index finger to draw, pinch to change color and close your fist to move without leaving a mark.",
      "I built it as a small study of childhood memory, creative coding and embodied interaction — a way to return to the first marks we make before design becomes too controlled.",
    ],
    link: { label: "Try the experiment →", href: "https://editor.p5js.org/ignaciaalcaino97/full/WdH2oXdwq" },
    images: [],
  },
];
