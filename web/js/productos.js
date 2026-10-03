/* ==========================================================================
   GINESKA · Catálogo
   --------------------------------------------------------------------------
   ESTE ES EL ÚNICO SITIO DONDE SE CAMBIAN PRECIOS, NOMBRES, VARIANTES Y FOTOS.
   Todas las páginas (portada, fichas, carrito) leen de aquí.

   Los 8 productos son los REALES de la tienda de Shopify del usuario
   (https://w3nt1x-qy.myshopify.com), importados con sus fotos y precios.
   El campo `id` de cada variante es el ID real de Shopify: gracias a eso el
   botón "Finalizar compra" lleva el carrito al checkout de la tienda.
   Fotos: web/img/<id>-N.jpg (1000 px, JPEG calidad 80).
   ========================================================================== */
window.GINESKA_PRODUCTOS = [
  {
    id: 'pendientes',
    nav: 'Pendientes',
    nombre: 'Pendientes TWS',
    categoria: 'Audio',
    lema: 'Auriculares que parecen un bolsito',
    resumen: 'Auriculares Bluetooth 5.4 con clip de oreja para todo el día. El estuche es un mini bolso con cadena y llavero de osito.',
    url: 'producto-pendientes.html',
    colores: { fondo: '#fff6ee', texto: '#2a1d15', acento: '#e8703a' },
    imagenes: ['img/pendientes-1.jpg', 'img/pendientes-2.jpg', 'img/pendientes-3.jpg', 'img/pendientes-5.jpg', 'img/pendientes-4.jpg'],
    opcionNombre: 'Color',
    variantes: [
      { id: '67619750477933', nombre: 'Naranja', precio: 12.97, precioAntes: null, disponible: true, foto: 'img/pendientes-1.jpg' },
      { id: '67619750445165', nombre: 'Blanco', precio: 12.97, precioAntes: null, disponible: true, foto: 'img/pendientes-3.jpg' },
      { id: '67619750510701', nombre: 'Negro', precio: 12.97, precioAntes: null, disponible: true, foto: 'img/pendientes-5.jpg' },
      { id: '67619750412397', nombre: 'Rosa', precio: 12.97, precioAntes: null, disponible: true, foto: 'img/pendientes-2.jpg' }
    ],
    valoracion: 4.8,
    resenas: 3
  },
  {
    id: 'olevs',
    nav: 'OLEVS',
    nombre: 'Reloj OLEVS 3613',
    categoria: 'Relojes',
    lema: 'Acero, luz y 42 mm de presencia',
    resumen: 'Reloj de cuarzo con caja de 42 mm, agujas e índices luminiscentes, calendario y pulsera de acero con cierre de brazalete.',
    url: 'producto-olevs.html',
    colores: { fondo: '#0b0e13', texto: '#f2f4f8', acento: '#cf9c47' },
    imagenes: ['img/olevs-1.jpg', 'img/olevs-3.jpg', 'img/olevs-2.jpg', 'img/olevs-7.jpg', 'img/olevs-5.jpg', 'img/olevs-6.jpg'],
    opcionNombre: 'Acabado',
    variantes: [
      { id: '67619749822573', nombre: 'Azul acero', precio: 8.73, precioAntes: null, disponible: true, foto: 'img/olevs-1.jpg' },
      { id: '67619749855341', nombre: 'Plateado', precio: 8.73, precioAntes: null, disponible: true, foto: 'img/olevs-6.jpg' },
      { id: '67619749789805', nombre: 'Plateado y negro', precio: 8.73, precioAntes: null, disponible: true, foto: 'img/olevs-5.jpg' },
      { id: '67619749888109', nombre: 'Negro', precio: 8.73, precioAntes: null, disponible: true, foto: 'img/olevs-5.jpg' },
      { id: '67619749757037', nombre: 'Dorado', precio: 8.73, precioAntes: null, disponible: true, foto: 'img/olevs-7.jpg' }
    ],
    valoracion: 4.7,
    resenas: 3
  },
  {
    id: 'vormor',
    nav: 'VORMOR',
    nombre: 'Grabadora VORMOR M1',
    categoria: 'Productividad',
    lema: 'Graba. Transcribe. Resume.',
    resumen: 'Grabadora digital de 64 GB con 32 h de grabación, transcripción y resumen automáticos con IA, imán para el móvil y un año de suscripción gratis.',
    url: 'producto-vormor.html',
    colores: { fondo: '#0f1419', texto: '#eef2f6', acento: '#4f7cff' },
    imagenes: ['img/vormor-1.jpg', 'img/vormor-4.jpg', 'img/vormor-3.jpg', 'img/vormor-5.jpg', 'img/vormor-6.jpg'],
    opcionNombre: 'Modelo',
    variantes: [
      { id: '67619749036141', nombre: '64 GB · Gris', precio: 46.28, precioAntes: null, disponible: true, foto: 'img/vormor-1.jpg' }
    ],
    valoracion: 4.8,
    resenas: 3
  },
  {
    id: 'power',
    nav: 'Power 60K',
    nombre: 'Power Bank 60K',
    categoria: 'Energía',
    lema: 'Carga un portátil. Y luego otro.',
    resumen: 'Batería externa de 60.000 mAh con 100 W PD, 45 W bidireccionales, cuatro puertos y pantalla digital. Hasta 20 días de autonomía.',
    url: 'producto-power.html',
    colores: { fondo: '#0e1013', texto: '#f4f6f8', acento: '#ff8a00' },
    imagenes: ['img/power-1.jpg', 'img/power-3.jpg', 'img/power-4.jpg', 'img/power-5.jpg', 'img/power-6.jpg', 'img/power-2.jpg'],
    opcionNombre: 'Color',
    variantes: [
      { id: '67619749363821', nombre: 'Gris oscuro', precio: 19.9, precioAntes: null, disponible: true, foto: 'img/power-1.jpg' },
      { id: '67619749167213', nombre: 'Blanco', precio: 19.9, precioAntes: null, disponible: true },
      { id: '67619749232749', nombre: 'Rosa', precio: 19.9, precioAntes: null, disponible: true },
      { id: '67619749298285', nombre: 'Azul marino', precio: 19.9, precioAntes: null, disponible: true },
      { id: '67619749429357', nombre: 'Camuflaje', precio: 19.9, precioAntes: null, disponible: true, foto: 'img/power-6.jpg' }
    ],
    valoracion: 4.7,
    resenas: 3
  },
  {
    id: 'handfan',
    nav: 'HandFan',
    nombre: 'Botella HandFan 40 oz',
    categoria: 'Hidratación',
    lema: 'Frío 24 h. Y ventilador.',
    resumen: 'Botella térmica de acero inoxidable 304 de 1,2 L con ventilador integrado en el tapón, pajita y asa. Frío 24 h, calor 6 h.',
    url: 'producto-handfan.html',
    colores: { fondo: '#eaf5fc', texto: '#0d3b57', acento: '#1e88c7' },
    imagenes: ['img/handfan-1.jpg', 'img/handfan-2.jpg', 'img/handfan-3.jpg', 'img/handfan-4.jpg', 'img/handfan-6.jpg', 'img/handfan-5.jpg'],
    opcionNombre: 'Color',
    variantes: [
      { id: '67619747528813', nombre: 'Azul', precio: 25, precioAntes: null, disponible: true, foto: 'img/handfan-1.jpg' },
      { id: '67619747496045', nombre: 'Rosa', precio: 25, precioAntes: null, disponible: true, foto: 'img/handfan-2.jpg' },
      { id: '67619747561581', nombre: 'Negro', precio: 25, precioAntes: null, disponible: true }
    ],
    valoracion: 4.9,
    resenas: 3
  },
  {
    id: 'urban',
    nav: 'Urban',
    nombre: 'Bolsa Reflectante Urban',
    categoria: 'Deporte',
    lema: 'Se pega al hierro, se lleva al hombro',
    resumen: 'Bolsa de 295 g con tres imanes potentes en la espalda, porta-botella de 1 L, bolsillo impermeable y tiras reflectantes.',
    url: 'producto-urban.html',
    colores: { fondo: '#14181d', texto: '#eef1f4', acento: '#ff7a1a' },
    imagenes: ['img/urban-1.jpg', 'img/urban-3.jpg', 'img/urban-4.jpg', 'img/urban-2.jpg', 'img/urban-5.jpg', 'img/urban-7.jpg'],
    opcionNombre: 'Color',
    variantes: [
      { id: '67619744809069', nombre: 'Negro', precio: 8.5, precioAntes: null, disponible: true, foto: 'img/urban-1.jpg' }
    ],
    valoracion: 4.6,
    resenas: 3
  },
  {
    id: 'estrella',
    nav: 'Estrella',
    nombre: 'Estrella NFC',
    categoria: 'Pagos',
    lema: 'Paga con una varita',
    resumen: 'Varita de 36 cm impresa en 3D con un chip NFC dentro de la estrella. Se acerca al datáfono y paga: no lleva pilas ni batería.',
    url: 'producto-estrella.html',
    colores: { fondo: '#f7f5fb', texto: '#1b1730', acento: '#7b5cff' },
    imagenes: ['img/estrella-1.jpg', 'img/estrella-2.jpg', 'img/estrella-4.jpg', 'img/estrella-8.jpg', 'img/estrella-7.jpg', 'img/estrella-3.jpg'],
    opcionNombre: 'Color',
    variantes: [
      { id: '67619747922029', nombre: 'Aleatorio (sorpresa)', precio: 2.19, precioAntes: null, disponible: true, foto: 'img/estrella-2.jpg' }
    ],
    valoracion: 4.5,
    resenas: 3
  },
  {
    id: 'almohada',
    nav: 'Almohada',
    nombre: 'Almohada Junco',
    categoria: 'Descanso',
    lema: 'La forma de una noche entera',
    resumen: 'Almohada cervical de espuma viscoelástica con forma de mariposa, hueco central para el cuello y funda transpirable. Se enrolla y viaja contigo.',
    url: 'producto-almohada.html',
    colores: { fondo: '#f1f5f2', texto: '#1d2a24', acento: '#2f7d6a' },
    imagenes: ['img/almohada-1.jpg', 'img/almohada-4.jpg', 'img/almohada-2.jpg', 'img/almohada-5.jpg', 'img/almohada-6.jpg', 'img/almohada-7.jpg'],
    opcionNombre: 'Color y tamaño',
    variantes: [
      { id: '67619745988717', nombre: 'Gris oscuro · Queen 60×40', precio: 9.51, precioAntes: null, disponible: true, foto: 'img/almohada-1.jpg' },
      { id: '67619746054253', nombre: 'Gris oscuro · King 65×45', precio: 9.51, precioAntes: null, disponible: true, foto: 'img/almohada-4.jpg' },
      { id: '67619745792109', nombre: 'Azul · Queen 60×40', precio: 9.51, precioAntes: null, disponible: true, foto: 'img/almohada-2.jpg' },
      { id: '67619746250861', nombre: 'Azul · King 65×45', precio: 9.51, precioAntes: null, disponible: true, foto: 'img/almohada-2.jpg' },
      { id: '67619745857645', nombre: 'Blanca · Queen 60×40', precio: 9.51, precioAntes: null, disponible: true, foto: 'img/almohada-7.jpg' },
      { id: '67619746152557', nombre: 'Blanca · King 65×45', precio: 9.51, precioAntes: null, disponible: true, foto: 'img/almohada-7.jpg' },
      { id: '67619745923181', nombre: 'Negra · Queen 60×40', precio: 9.51, precioAntes: null, disponible: true },
      { id: '67619746185325', nombre: 'Negra · King 65×45', precio: 9.51, precioAntes: null, disponible: true }
    ],
    valoracion: 4.8,
    resenas: 3
  }
];
