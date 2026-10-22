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
    },
    about: {
      title: "About",
      body: "I’m a Design Engineer who defines, designs and builds digital products. I help turn ambiguous ideas and complex systems into clear, useful products, working from early definition through launch. My experience spans SaaS, B2B marketplaces and engagement platforms. I’m interested in what sits beneath an interface: the behavior it encourages, the business rules that shape it and the systems that make it work. I draw on behavioral science and systems thinking to bring structure to complexity, while staying close to the details that shape the final experience. I believe good design should feel intuitive without becoming generic. I value clarity, restraint and character, and I care as much about how a product works as how it looks and feels. Outside digital products, I practice silversmithing and have a weakness for artists’ studios — I’ll always walk in. You’ll also find me training, reading or walking through the countryside with my dog Linguini.",
      educationTitle: "Education",
      recognitionTitle: "Selected Recognition",
      studioLine: "Visit the Studio (by appointment): Arquitecto Teodoro Bendjerodt 1978, Vitacura.",
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
      intro: "Tell me about your project, or just say hello.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "[ Send message ]",
      sending: "[ Sending… ]",
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
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
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
      line1: "Diseñadora / Ingeniera.",
      line2Prefix: "Actualmente construyendo ",
    },
    work: {
      caseStudySoon: "Caso de estudio próximamente.",
    },
    about: {
      title: "Acerca de",
      body: "Soy Design Engineer: defino, diseño y construyo productos digitales. Ayudo a transformar ideas ambiguas y sistemas complejos en productos claros y útiles, trabajando desde la definición temprana hasta el lanzamiento. Mi experiencia abarca SaaS, marketplaces B2B y plataformas de fidelización. Me interesa lo que hay detrás de una interfaz: el comportamiento que fomenta, las reglas de negocio que la moldean y los sistemas que la hacen funcionar. Me apoyo en ciencias del comportamiento y pensamiento sistémico para darle estructura a la complejidad, sin perder cercanía con los detalles que definen la experiencia final. Creo que un buen diseño debe sentirse intuitivo sin volverse genérico. Valoro la claridad, la contención y el carácter, y me importa tanto cómo funciona un producto como su apariencia y sensación. Fuera de los productos digitales, practico orfebrería en plata y tengo debilidad por los talleres de artistas — siempre entro a mirar. También me encontrarás entrenando, leyendo o caminando por el campo con mi perro Linguini.",
      educationTitle: "Educación",
      recognitionTitle: "Reconocimientos Destacados",
      studioLine: "Visita el Estudio (con cita previa): Arquitecto Teodoro Bendjerodt 1978, Vitacura.",
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
      intro: "Cuéntame sobre tu proyecto, o simplemente di hola.",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "[ Enviar mensaje ]",
      sending: "[ Enviando… ]",
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
      zoomIn: "Acercar",
      zoomOut: "Alejar",
    },
  },
} satisfies Record<Lang, unknown>;

export function useStrings(lang: Lang) {
  return strings[lang];
}
