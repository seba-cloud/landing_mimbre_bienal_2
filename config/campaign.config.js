/**
 * Configuración centralizada — Endémica Crea × Révélations 2027.
 *
 * Editar SOLO este archivo para actualizar montos, fecha límite, link de
 * Mercado Pago, Meta Pixel o enlaces de video. Nada de esto está
 * hardcodeado en el HTML.
 *
 * Los montos en null se muestran en la página como "$[monto]" hasta que
 * se reemplacen por cifras reales — así nunca se publica un número
 * inventado por error.
 */
window.CAMPAIGN_CONFIG = {
  // ---- Moneda y montos ----
  currency: "CLP",
  currencyLocale: "es-CL",

  // Monto recaudado hasta ahora y meta total de la campaña.
  raisedAmount: null, // ej: 1250000
  goalAmount: null, // ej: 8000000

  // Fecha límite de la campaña. Formato ISO con zona horaria.
  deadlineISO: "2026-11-19T23:59:59-03:00",

  // ---- Presupuesto (sección "Para qué se usará cada peso") ----
  // El total se calcula sumando los montos no-nulos. Si algún monto es
  // null, el total también se muestra como placeholder.
  budget: [
    { concept: "Participación / stand en Révélations", amount: null },
    { concept: "Traslado de la obra Inteligencia Artesanal", amount: null },
    { concept: "Pasajes (Chile – Francia)", amount: null },
    { concept: "Alojamiento durante la bienal", amount: null },
  ],

  // ---- Pago ----
  // Link directo a Mercado Pago. Sin formulario intermedio.
  mercadoPagoUrl: "http://link.mercadopago.cl/endemicacrea",

  // ---- Meta Pixel ----
  // Pegar el ID real y descomentar el snippet en el <head> de index.html
  // cuando esté disponible. No se usa desde JS: es solo referencia.
  metaPixelId: "PIXEL_ID_AQUI",

  // ---- Video de cada hito FONDART ----
  // Pegar el link real (YouTube/Vimeo/Drive) cuando exista. Mientras el
  // valor sea null, el hito muestra un enlace deshabilitado.
  videoLinks: {
    y2020: null, // La Casa de los Peces
    y2023: null, // Trama y Legado
    y2024: null, // Inteligencia Artesanal
  },

  // ---- Contacto / redes ----
  contactEmail: "hola@endemicacrea.cl",
  instagramHandle: "@endemicacrea",
  instagramUrl: "https://www.instagram.com/endemicacrea",
  bienalUrl: "https://www.revelations-grandpalais.com",
};
