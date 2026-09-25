/* ==========================================================================
   NÓMADA · Catálogo
   --------------------------------------------------------------------------
   ESTE ES EL ÚNICO SITIO DONDE SE CAMBIAN PRECIOS, NOMBRES, VARIANTES Y FOTOS.
   Todas las páginas (portada, fichas, carrito) leen de aquí.
   ========================================================================== */
window.NOMADA_PRODUCTOS = [
  {
    id: 'pulse',
    nombre: 'Pulse ANC',
    categoria: 'Audio',
    lema: 'Silencio a la carta',
    resumen: 'Auriculares inalámbricos con cancelación activa de ruido y 40 h de batería.',
    url: 'producto-pulse.html',
    colores: { fondo: '#0d0b1a', texto: '#f1edff', acento: '#8b5cf6' },
    imagenes: ['img/pulse-1.jpg', 'img/pulse-2.jpg', 'img/pulse-3.jpg'],
    opcionNombre: 'Edición',
    variantes: [
      { id: 'pulse-std', nombre: 'Estándar', precio: 129, precioAntes: 159, disponible: true },
      { id: 'pulse-pro', nombre: 'Pro + estuche rígido', precio: 149, precioAntes: 189, disponible: true },
      { id: 'pulse-ltd', nombre: 'Edición Neón', precio: 169, precioAntes: null, disponible: false }
    ],
    valoracion: 4.8,
    resenas: 1240
  },
  {
    id: 'glaciar',
    nombre: 'Glaciar Térmica',
    categoria: 'Hidratación',
    lema: 'Frío 24 h. Calor 12 h.',
    resumen: 'Botella de acero con doble pared al vacío. Sin plásticos, sin sabores raros.',
    url: 'producto-glaciar.html',
    colores: { fondo: '#e6f4fa', texto: '#0b3b52', acento: '#1aa6c9' },
    imagenes: ['img/glaciar-1.jpg', 'img/glaciar-2.jpg', 'img/glaciar-3.jpg'],
    opcionNombre: 'Capacidad',
    variantes: [
      { id: 'glaciar-500', nombre: '500 ml', precio: 29, precioAntes: null, disponible: true },
      { id: 'glaciar-750', nombre: '750 ml', precio: 35, precioAntes: 39, disponible: true },
      { id: 'glaciar-1000', nombre: '1 litro', precio: 42, precioAntes: null, disponible: true }
    ],
    valoracion: 4.9,
    resenas: 860
  },
  {
    id: 'ambar',
    nombre: 'Vela Ámbar',
    categoria: 'Hogar',
    lema: 'Tu casa, a media luz',
    resumen: 'Vela de soja con mecha de madera en vaso de terracota hecho a mano.',
    url: 'producto-ambar.html',
    colores: { fondo: '#f3e9dc', texto: '#3b2418', acento: '#b5532f' },
    imagenes: ['img/ambar-1.jpg', 'img/ambar-2.jpg', 'img/ambar-3.jpg'],
    opcionNombre: 'Tamaño',
    variantes: [
      { id: 'ambar-180', nombre: '180 g · 35 h', precio: 24, precioAntes: null, disponible: true },
      { id: 'ambar-320', nombre: '320 g · 60 h', precio: 36, precioAntes: 42, disponible: true }
    ],
    valoracion: 4.9,
    resenas: 530
  },
  {
    id: 'ruta',
    nombre: 'Mochila Ruta 24L',
    categoria: 'Aventura',
    lema: 'De la oficina al monte',
    resumen: 'Mochila impermeable con funda para portátil y correas de compresión.',
    url: 'producto-ruta.html',
    colores: { fondo: '#1f2a1c', texto: '#efe9dc', acento: '#ff6b1a' },
    imagenes: ['img/ruta-1.jpg'],
    opcionNombre: 'Capacidad',
    variantes: [
      { id: 'ruta-24', nombre: '24 L', precio: 89, precioAntes: 109, disponible: true },
      { id: 'ruta-30', nombre: '30 L', precio: 99, precioAntes: null, disponible: true }
    ],
    valoracion: 4.7,
    resenas: 410
  }
];
