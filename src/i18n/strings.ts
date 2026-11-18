import type { Lang } from "./LanguageContext";

export const strings = {
  en: {
    nav: {
      works: "Works",
      about: "About",
      contact: "Contact",
    },
    contact: {
      label: "Email",
    },
    footer: {
      contact: "[ Contact ]",
      linkedin: "[ Linkedin ]",
      github: "[ Github ]",
      studioPrefix: "The Studio.",
      bookVisit: "[ Book a visit ]",
      location: "Santiago, Chile.",
      rights: "All rights reserved.",
    },
    home: {
      line1: "Designer / Engineer.",
      line2Prefix: "Currently building ",
    },
    work: {
      caseStudySoon: "Case study coming soon.",
      tags: "Areas",
    },
    about: {
      title: "About",
      body: [
        "I’m a Design Engineer focused on building and evolving digital products. I work across product definition, design, and development, connecting user needs with business goals and technical constraints. My experience spans SaaS, B2B marketplaces and loyalty platforms, with a focus on how products can improve, adapt, and scale as businesses grow.",
        "I’m interested in what shapes an experience beyond the interface: human behavior, business rules, and the systems behind it. I draw on behavioral science and systems thinking to bring structure to complex problems, while staying close to the details that define the final experience. I value clarity, restraint, and character and care equally about how a product works and how it looks and feels.",
        "Outside of work, I practice silversmithing and have a soft spot for artists’ studios. You’ll also find me training, reading or walking through the countryside with my dog Linguini.",
      ],
      educationTitle: "Education",
      recognitionTitle: "Selected Recognition",
      studioLine: "Visit the studio by appointment",
      studioAddress: "Arquitecto Teodoro Bendjerodt 1978, Vitacura.",
      bookVisit: "[ Book a visit ]",
    },
    notFound: {
      title: "Page not found.",
      back: "← Back home",
    },
    langSwitch: {
      label: "Language",
    },
    contactPage: {
      title: "Contact",
      intro: "Let\u2019s talk.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      errorName: "Please enter your name.",
      errorEmail: "Please enter a valid email address.",
      errorMessage: "Please write a message.",
      sentTitle: "Message sent.",
      sentBody: "Thank you for reaching out.",
      sendAnother: "[ Send another message ]",
      failedBefore: "Something went wrong and your message wasn\u2019t sent. Please try again, or write to ",
      failedAfter: ".",
      directBefore: "Or write directly to ",
    },
    gallery: {
      dialog: "Image gallery",
      open: "View image {i} of {n}",
      imageLabel: "{name} — image {i} of {n}",
      close: "[ Close ]",
      prev: "Previous image",
      next: "Next image",
      pauseVideo: "Pause video",
      playVideo: "Play video",
    },
  },
  es: {
    nav: {
      works: "Proyectos",
      about: "Acerca de",
      contact: "Contacto",
    },
    contact: {
      label: "Correo",
    },
    footer: {
      contact: "[ Contacto ]",
      linkedin: "[ Linkedin ]",
      github: "[ Github ]",
      studioPrefix: "El Estudio.",
      bookVisit: "[ Agendar visita ]",
      location: "Santiago, Chile.",
      rights: "Todos los derechos reservados.",
    },
    home: {
      // the role stays in English on purpose: it is what recruiters search for
      line1: "Designer / Engineer.",
      line2Prefix: "Actualmente construyendo ",
    },
    work: {
      caseStudySoon: "Caso de estudio próximamente.",
      tags: "Áreas",
    },
    about: {
      title: "Acerca de",
      body: [
        "Soy Design Engineer y me dedico a construir y hacer evolucionar productos digitales. Trabajo en la definición de producto, el diseño y el desarrollo, conectando las necesidades de los usuarios con los objetivos de negocio y las restricciones técnicas. Mi experiencia abarca SaaS, marketplaces B2B y plataformas de fidelización, con foco en cómo los productos pueden mejorar, adaptarse y escalar a medida que crecen los negocios.",
        "Me interesa lo que da forma a una experiencia más allá de la interfaz: el comportamiento humano, las reglas de negocio y los sistemas que hay detrás. Me apoyo en las ciencias del comportamiento y el pensamiento sistémico para darle estructura a problemas complejos, sin perder cercanía con los detalles que definen la experiencia final. Valoro la claridad, la contención y el carácter, y me importa por igual cómo funciona un producto y cómo se ve y se siente.",
        "Fuera del trabajo, practico orfebrería en plata y tengo un cariño especial por los talleres de artistas. También me encontrarás entrenando, leyendo o caminando por el campo con mi perro Linguini.",
      ],
      educationTitle: "Educación",
      recognitionTitle: "Reconocimientos Destacados",
      studioLine: "Visita el estudio con cita previa",
      studioAddress: "Arquitecto Teodoro Bendjerodt 1978, Vitacura.",
      bookVisit: "[ Agendar visita ]",
    },
    notFound: {
      title: "Página no encontrada.",
      back: "← Volver al inicio",
    },
    langSwitch: {
      label: "Idioma",
    },
    contactPage: {
      title: "Contacto",
      intro: "Hablemos.",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando…",
      errorName: "Ingresa tu nombre.",
      errorEmail: "Ingresa un correo válido.",
      errorMessage: "Escribe un mensaje.",
      sentTitle: "Mensaje enviado.",
      sentBody: "Gracias por escribirme.",
      sendAnother: "[ Enviar otro mensaje ]",
      failedBefore: "Algo salió mal y tu mensaje no se envió. Inténtalo de nuevo, o escribe a ",
      failedAfter: ".",
      directBefore: "O escribe directamente a ",
    },
    gallery: {
      dialog: "Galería de imágenes",
      open: "Ver imagen {i} de {n}",
      imageLabel: "{name} — imagen {i} de {n}",
      close: "[ Cerrar ]",
      prev: "Imagen anterior",
      next: "Imagen siguiente",
      pauseVideo: "Pausar video",
      playVideo: "Reproducir video",
    },
  },
} satisfies Record<Lang, unknown>;

export function useStrings(lang: Lang) {
  return strings[lang];
}
