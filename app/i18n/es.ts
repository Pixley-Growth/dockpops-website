import type { Dict } from "./en";

// Latin American Spanish copy. Mirrors en.ts key for key.
// Feature names come from the app's es-419 strings (Localizable.xcstrings), the marketing
// voice from app-store/Version 6/listing-es-419.md, everything else from docs/help/es-419.
export const es: Dict = {
  lang: "es-419",
  meta: {
    title: "DockPops — Carpetas personalizadas para el Dock de tu Mac",
    description:
      "Carpetas personalizadas y bonitas para tu Dock. Agrupa apps, archivos y enlaces en Pops, y haz tuyo cada uno con temas, fondos PopFX animados e iconos del Dock a juego. Sin suscripción.",
  },
  a11y: {
    site: "Sitio",
    dock: "Dock",
    footer: "Pie de página",
    facts: "DockPops de un vistazo",
  },
  menu: {
    features: "Funciones",
    pricing: "Precios",
    faq: "Preguntas",
    support: "Soporte",
    download: "Descargar",
  },
  hero: {
    title: "Carpetas a tu medida en el Dock.",
    body:
      "Haz clic en un icono de DockPops y una cuadrícula con tus apps, archivos, carpetas y enlaces aparece justo donde la esperas. Luego, haz tuyo cada Pop.",
    free: "Descárgalo gratis. Premium es una sola compra, sin suscripción.",
    hint: "Haz clic en un Pop del Dock para abrirlo.",
    hintTouch: "Toca un Pop del Dock para abrirlo.",
    tile: "{name}, un Pop con el tema {theme}",
  },
  // Read as: "Gold Leaf, vista Lista, relleno degradado, fuente serif".
  look: {
    line: "{theme}, vista {view}, relleno {fill}, fuente {labels}",
    views: { grid: "Cuadrícula", list: "Lista", tiles: "Mosaicos" },
    fills: { glass: "de vidrio", color: "de color", gradient: "degradado", popfx: "PopFX" },
    fonts: { system: "del sistema", rounded: "redondeada", serif: "serif", mono: "monoespaciada", papyrus: "Papyrus" },
  },
  trust: [
    "Descarga gratuita",
    "Una sola compra, sin suscripción",
    "Sin rastreo, sin anuncios",
    "App nativa de Mac para macOS 14 o posterior",
  ],
  files: {
    title: "Apps, archivos y carpetas.",
    body:
      "Agrupa hasta 25 apps, archivos o carpetas en un Pop. Arrástralos desde cualquier parte de tu Mac, explora una carpeta dentro del mismo Pop y presiona la barra espaciadora para ver un archivo con Vista Rápida.",
    drill: "Explora carpetas sin salir del Pop",
    quickLook: "Vista Rápida con la barra espaciadora",
  },
  themes: {
    title: "Personalización sin límites.",
    body:
      "23 temas integrados, o guarda el tuyo y reúsalo en varios Pops. Dale a cada Pop un color, un degradado, tu propia foto o un fondo PopFX, agrégale un borde, define la fuente de los nombres y muéstralo como cuadrícula, lista o mosaicos. Su icono del Dock queda a juego.",
    view: "Vista",
    theme: "Tema",
  },
  popfx: {
    title: "¡Está vivo!",
    body:
      "Los fondos PopFX se mueven y responden a tu puntero: arcos, cortinas, ondas, mármol, nieve, brasas, lluvia de código y más.",
    count: "23 temas integrados, 11 de ellos PopFX.",
  },
  assistant: {
    title: "Solo pídelo.",
    body:
      "Dile al Asistente lo que quieres, como “agrega Pages”, “cambia a la vista de lista” o “que se sienta como la hora dorada”, y cambia tu Pop mientras lo ves. Cualquier cambio, salvo una eliminación, se puede deshacer.",
    note: "Funciona con Apple Intelligence. El Asistente requiere macOS 27 y DockPops Premium.",
    panel: "Asistente",
    exchanges: [
      {
        ask: "Agrega Pages",
        reply: "Agregué Pages al Pop porque es una app de productividad y corresponde a lo que pediste agregar.",
        changed: "Cambios: elementos",
      },
      {
        ask: "Cambia a la vista de lista",
        reply: "Cambié la vista del Pop a lista porque querías un formato de lista.",
        changed: "Cambios: diseño",
      },
      {
        ask: "Que se sienta como la hora dorada",
        reply: "Cambié el tema del Pop a Gold Leaf porque querías que se sintiera como la hora dorada, y eso encaja con el tema Gold Leaf.",
        changed: "Cambios: Tema",
      },
    ],
    undo: "Deshacer este cambio",
    placeholder: "Pide un cambio…",
    replay: "Ver de nuevo",
  },
  everyday: {
    title: "Un Pop para cada momento de tu día.",
    body: "El trabajo, un lanzamiento, un viaje, el fin de semana. Lo que cada uno necesita, a un clic en tu Dock.",
  },
  pricing: {
    title: "Descárgalo gratis. Paga una sola vez.",
    free: "Gratis",
    freeLine: "Gratis para siempre",
    premium: "Premium",
    premiumLine: "Una sola compra, sin suscripción",
    once: "pago único",
    freeItems: [
      "2 Pops con hasta 6 apps o enlaces cada uno",
      "Iconos del Dock en vivo y un icono del Dock para cada Pop",
      "Deslizar entre Pops y explorar carpetas",
      "Vista Cuadrícula, nombres, espaciado y resaltado al pasar",
      "Guardar enlaces desde el menú Compartir de cualquier app",
      "Modo de barra de menús",
    ],
    premiumItems: [
      "Hasta 100 Pops con 25 elementos cada uno",
      "Archivos y carpetas en tus Pops",
      "23 temas, fondos PopFX y tu propio relleno y borde",
      "Vistas Lista y Mosaicos",
      "Un atajo de teclado para cada Pop",
      "Elegir qué Pops muestra cada icono del Dock",
      "Fijar un Pop, Abrir todo y más formas de ordenar",
      "El Asistente (macOS 27) y las sugerencias de Apple Intelligence (macOS 26)",
    ],
  },
  faq: {
    title: "Preguntas y respuestas.",
    items: [
      {
        q: "¿El Dock no puede hacer esto ya?",
        a: "No exactamente. Una carpeta del Dock (una pila) muestra lo que hay dentro de una carpeta del disco, ordenado por nombre, fecha o tipo. Un Pop es un conjunto que eliges tú: cualquier combinación de apps, archivos, carpetas y enlaces, en el orden que quieras, con su propio nombre, tema e icono del Dock. Puedes reunir varios Pops detrás de un icono del Dock y deslizar entre ellos, abrir cualquier Pop con su propio atajo de teclado, explorar carpetas dentro de un Pop y ver un archivo con Vista Rápida al presionar la barra espaciadora.",
      },
      {
        q: "¿Necesito DockPops Companion para tener varios iconos en el Dock?",
        a: "Solo con la versión del Mac App Store. macOS no permite que una app en entorno seguro (sandbox) agregue más de un icono al Dock, así que DockPops Companion, que es gratis, crea una pequeña app de acceso para cada Pop y mantiene sincronizado su icono. Solo se comunica con DockPops en tu Mac. La versión de descarga directa no está en un entorno seguro, así que agrega los iconos del Dock por sí sola.",
      },
      {
        q: "macOS Tahoe eliminó Launchpad. ¿DockPops lo reemplaza?",
        a: "Cubre una necesidad parecida: una cuadrícula de apps que abres desde el Dock. La diferencia es que tú creas cada Pop, así que puedes tener uno para el trabajo, otro para un proyecto y otro para el fin de semana, cada uno a un clic.",
      },
      {
        q: "¿Qué es PopFX?",
        a: "Un tipo de fondo que se mueve y responde a tu puntero: arcos, cortinas, ondas, mármol, nieve, brasas, lluvia de código y más. Lo usan 11 de los 23 temas integrados. PopFX se pausa cuando un Pop está cerrado, y se queda quieto con Reducir movimiento o el modo de bajo consumo activados.",
      },
      {
        q: "¿Qué hace el Asistente con mis solicitudes?",
        a: "Cambia el Pop seleccionado: su tema, relleno, borde, etiquetas y vista; su icono del Dock; su nombre y sus elementos. Funciona con Apple Intelligence, así que requiere macOS 27 y una Mac compatible, además de DockPops Premium. En la versión del Mac App Store, Apple Intelligence puede usar Private Cloud Compute de Apple para responder.",
      },
      {
        q: "¿En qué se diferencia DockPops de Alfred, Raycast o Spotlight?",
        a: "Esas son herramientas de búsqueda que abres con un atajo de teclado. DockPops vive en tu Dock: tus Pops ya están organizados y a un clic. Muchas personas usan ambos.",
      },
      {
        q: "¿Cuánto cuesta Premium?",
        a: "Premium es una sola compra, nunca una suscripción. Desbloquea hasta 100 Pops con 25 elementos cada uno, archivos y carpetas, temas y PopFX, las vistas Lista y Mosaicos, un atajo de teclado para cada Pop, el Asistente y más. La versión gratuita de DockPops te da 2 Pops con 6 elementos cada uno, suficiente para probarlo bien.",
      },
      {
        q: "¿DockPops recopila datos sobre mí?",
        a: "No. Sin análisis, sin rastreo, sin anuncios. Tus Pops se quedan en tu Mac. Las sugerencias de apps se generan en tu Mac. El Asistente usa Apple Intelligence, que en la versión del Mac App Store puede responder mediante Private Cloud Compute de Apple.",
      },
      {
        q: "¿En qué Macs funciona DockPops?",
        a: "En cualquier Mac con macOS Sonoma (14) o posterior. Las sugerencias de Apple Intelligence requieren macOS 26, y el Asistente requiere macOS 27 y DockPops Premium.",
      },
    ],
  },
  support: {
    title: "¿Necesitas ayuda?",
    body: "Escríbenos. Solemos responder en un plazo de dos días.",
    email: "dockpops@pixleygrowth.com",
  },
  footer: {
    rights: "Pixley Growth LLC. Todos los derechos reservados.",
    privacy: "Política de privacidad",
    support: "Soporte",
    language: "Idioma",
  },
  download: {
    appStore: "Descárgalo en el Mac App Store",
    direct: "Descarga directa",
  },
  // The analytics consent banner (shown in Europe) and the footer link that reopens it.
  consent: {
    text: "dockpops.com usa Google Analytics para contar las visitas y ver qué páginas se leen. ¿Permites las cookies de análisis?",
    allow: "Permitir",
    decline: "Rechazar",
    settings: "Configuración de cookies",
  },
};
