export type Project = {
  slug: string;
  name: string;
  category: string;
  years: string;
  tagline: string;
  paragraphs: string[];
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "zoon",
    name: "Zoön",
    category: "SaaS / Loyalty & engagement",
    years: "2023 — 2025",
    tagline: "Making engagement easier to join, repeat and remember.",
    paragraphs: [
      "Many engagement programs rely on familiar mechanics: points, stamps, coupons and rewards. But the real design challenge is behavioral — people need to understand the value quickly, join without friction, and remember to come back.",
      "I joined Zoön as the first in-house Product Designer, helping the company transition from an external development model to an internal product team. My work covered UX/UI, product flows, prototyping, design systems and collaboration with product, development and business teams.",
      "One of the flagship products was a low-friction digital wallet pass for Google and Apple Wallet — no app download, no account creation, just a quick scan and a pass saved directly to the user's phone.",
      "My work focused on making loyalty and engagement mechanics feel simple, accessible and repeatable for both end users and partner businesses.",
      "By the time I left, the product had reached 12,000+ enrolled consumers, a 2.7 average repeat purchases per client, and a 27% sales increase across partner locations.",
    ],
    link: "https://www.zoonloyalty.io",
    linkLabel: "www.zoonloyalty.io",
  },
  {
    slug: "bagoost",
    name: "Bagoost",
    category: "B2B marketplace",
    years: "2021 — 2022",
    tagline: "Designing trust into a two-sided marketplace.",
    paragraphs: [
      "Bagoost connected wholesale buyers and sellers in a category where trust, logistics and pricing transparency usually happen over phone calls and spreadsheets.",
      "I led product design across the buyer and seller experiences, working closely with founders and engineering to ship fast without losing sight of the underlying trust problem the product was solving.",
      "The work spanned onboarding flows, catalog and pricing UX, and the internal tools sellers used to manage inventory and orders.",
    ],
  },
  {
    slug: "life-in-dots",
    name: "Life in dots",
    category: "App",
    years: "2026",
    tagline: "A quiet way to see a life as a pattern.",
    paragraphs: [
      "Life in dots renders a lifespan as a grid of weeks, each one a dot — lived, present, or ahead. A small, personal tool for perspective rather than productivity.",
      "The project is an exercise in restraint: almost no UI, almost no copy, just the pattern and the moment you notice yourself inside it.",
    ],
  },
  {
    slug: "sunset-predictor",
    name: "Sunset predictor",
    category: "Data experiment",
    years: "2026",
    tagline: "Will tonight's sunset be worth watching?",
    paragraphs: [
      "A small data experiment that scores upcoming sunsets using cloud cover, humidity and atmospheric data, translating a weather forecast into a single, human question: is it worth stepping outside tonight?",
    ],
  },
  {
    slug: "fingerpaint",
    name: "fingerpaint.p5js",
    category: "Creative coding",
    years: "2024",
    tagline: "Finger painting, rebuilt in code.",
    paragraphs: [
      "A generative sketch built in p5.js exploring brush physics, color blending and gesture — a small break from product work spent making something with no user story at all.",
    ],
  },
];
