/* ==========================================================================
   NÓMADA · Configuración general de la tienda
   --------------------------------------------------------------------------
   Todo lo que es "de la marca" y aparece en TODAS las páginas vive aquí:
   nombre, moneda, envío gratis, barra de anuncios, menú, pie y textos legales.
   (Los productos están en js/productos.js)
   ========================================================================== */
window.NOMADA_CONFIG = {
  marca: 'NÓMADA',
  lemaPie: 'Cuatro objetos bien hechos para tu día a día. Diseñados para durar, no para llenar cajones.',

  // Moneda y formato de precios (Intl.NumberFormat)
  idioma: 'es-ES',
  moneda: 'EUR',

  // Umbral de envío gratis en la moneda de la tienda (0 = desactivado)
  envioGratisDesde: 50,

  // Barra de anuncios superior (se repite en bucle)
  anuncios: ['Envío gratis desde 50 €', 'Devolución 30 días', 'Pago 100 % seguro'],

  // Filas de confianza bajo el botón de compra (icono: camion | vuelta | escudo | candado)
  confianza: [
    { icono: 'camion', texto: 'Envío 24/48 h' },
    { icono: 'vuelta', texto: '30 días de devolución' },
    { icono: 'escudo', texto: 'Garantía 3 años' },
    { icono: 'candado', texto: 'Pago seguro' }
  ],

  contacto: { email: 'hola@nomada.shop', horario: 'L–V · 9:00–18:00' },
  metodosPago: 'Visa · Mastercard · PayPal · Bizum',

  // Botón "Finalizar compra" del carrito.
  // - Si urlPago está vacío, muestra el aviso de tienda de demostración.
  // - Si pones una URL (Shopify, Stripe Payment Link...), redirige ahí.
  urlPago: '',
  avisoPagoDemo: '<h3>¡Casi listo! 🎉</h3><p>Esta es una tienda de demostración, así que aquí iría la pasarela de pago (Shopify, Stripe, PayPal…).</p><p>Tu carrito se guarda en este navegador.</p>',

  // Textos legales (se abren en una ventana desde el pie)
  legales: {
    envios: { titulo: 'Envíos y devoluciones', html: '<p>Envío en 24/48 h a península. Gratis a partir de 50 €. Tienes 30 días para devolver cualquier producto sin usar.</p>' },
    privacidad: { titulo: 'Privacidad', html: '<p>Solo usamos tus datos para gestionar tu pedido. No los compartimos con terceros con fines comerciales.</p>' },
    terminos: { titulo: 'Términos y condiciones', html: '<p>Precios con IVA incluido. Garantía legal de 3 años en todos los productos.</p>' }
  }
};
