/* ==========================================================================
   GINESKA · Configuración general de la tienda
   --------------------------------------------------------------------------
   Todo lo que es "de la marca" y aparece en TODAS las páginas vive aquí:
   nombre, moneda, envío, barra de anuncios, menú, pie y textos legales.
   (Los productos están en js/productos.js)
   ========================================================================== */
window.GINESKA_CONFIG = {
  marca: 'GINESKA',
  lemaPie: 'Ocho objetos elegidos uno a uno: audio, energía, hidratación, deporte, descanso y algún capricho. Envío gratis y garantía de 30 días.',

  // Moneda y formato de precios (Intl.NumberFormat)
  idioma: 'es-ES',
  moneda: 'USD',

  // Envío gratis. 0 = ya es gratis siempre (no se muestra la barra del carrito)
  envioGratisDesde: 0,

  // Barra de anuncios superior (se repite en bucle)
  anuncios: ['Envío gratis', 'Garantía 30 días', 'Pago seguro con Shopify', 'Atención por correo'],

  // Filas de confianza bajo el botón de compra (icono: camion | vuelta | escudo | candado)
  confianza: [
    { icono: 'camion', texto: 'Envío gratis' },
    { icono: 'escudo', texto: 'Garantía 30 días' },
    { icono: 'candado', texto: 'Pago seguro' }
  ],

  contacto: { email: 'contacto@gineska.com', horario: 'Te respondemos por correo' },
  metodosPago: 'Shopify Payments · Visa · Mastercard · Apple Pay · PayPal',

  // Tu tienda de Shopify: los productos, los precios y las fotos salen de aquí.
  tiendaShopify: 'https://w3nt1x-qy.myshopify.com',

  // Botón "Finalizar compra" del carrito.
  // - Vacío: el carrito se envía a tu tienda de Shopify (tiendaShopify) ya montado.
  // - Con una URL (otro checkout, Stripe...): redirige ahí.
  urlPago: '',
  avisoPagoDemo: '<h3>Tu carrito, listo para Shopify</h3><p>El botón <strong>Finalizar compra</strong> abre el pago de tu tienda de Shopify con estos mismos productos y cantidades, para que el pedido entre en tu panel como cualquier otro.</p><p>Si prefieres otro sistema de pago, se cambia en <code>web/js/config.js</code>.</p>',

  // Textos legales (se abren en una ventana desde el pie)
  legales: {
    envios: { titulo: 'Envíos y garantía', html: '<p>Envío gratis en todos los pedidos. Garantía de 30 días: si algo no va bien, escríbenos y lo solucionamos.</p><p>Los plazos de entrega dependen del destino; se muestran al finalizar la compra.</p>' },
    privacidad: { titulo: 'Privacidad', html: '<p>Solo usamos tus datos para gestionar tu pedido y responderte. El pago se procesa en Shopify.</p>' },
    terminos: { titulo: 'Términos y condiciones', html: '<p>Precios en dólares estadounidenses (USD), impuestos incluidos. Las compras se tramitan a través de esta tienda de Shopify.</p>' }
  }
};
