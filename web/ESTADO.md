# ESTADO — Tienda NÓMADA

Web estática (HTML + CSS + JS, sin dependencias) construida siguiendo el método
de la skill `tienda-shopify-v3` (catálogo de bloques, fondo en el envoltorio,
revisión en 16:9 y móvil, fotos con guion individual).

- **Ruta:** `web/` · abrir `web/index.html` o servir con `python3 -m http.server 8080` desde `web/`
- **Fase:** construcción completa + auto-revisión en 1600×900 y 390×844 ✅
- **Datos de productos:** `web/js/productos.js` (precios, variantes, fotos, colores)
- **Configuración de marca:** `web/js/config.js` (nombre, moneda, envío gratis, anuncios, pie, legales, URL de pago)
- **Publicado:** https://batman1518.github.io/Tienda-Online/ (GitHub Pages, rama `arena/01a0d907-tienda-online`)
- **Guía técnica para Claude Code:** `CLAUDE.md` en la raíz

## Páginas y paletas
| Página | Fondo | Acento | Tipografía |
|---|---|---|---|
| Portada `index.html` | #f4f1ec | #161616 / naranja #ff6b1a | Instrument Serif + Inter |
| Pulse ANC `producto-pulse.html` | #0d0b1a | violeta #8b5cf6 | Space Grotesk |
| Glaciar `producto-glaciar.html` | #e6f4fa | turquesa #1aa6c9 | Outfit |
| Vela Ámbar `producto-ambar.html` | #f3e9dc | terracota #b5532f | Cormorant Garamond + Jost |
| Ruta 24L `producto-ruta.html` | #1f2a1c | naranja #ff6b1a | Bebas Neue + Archivo |

## Bloques usados (nº de arquetipo del catálogo)
- Portada: 4 (héroe tipográfico) + mosaico, 8/21 (marquesina), cuadrícula de producto, 11 ampliado a 4 paneles, 18 (lista numerada), 23 (cifras con contador), 13 (reseñas), cierre con boletín
- Pulse: 9 (spotlight) + 5 (producto flotante 3D) + 10 (typewriter), ficha, 23 (bento con contador), 17 (hotspots), 20 (escena), reseñas, FAQ
- Glaciar: héroe en arco con chips flotantes, ficha, comparador de temperatura (F), 19 (acordeón con imagen viva), cifra de impacto, reseñas, FAQ
- Ámbar: 7 (minimal de lujo) + 12 (zoom-out), ficha, 18 (pirámide olfativa), manifiesto con parallax, pasos del ritual, reseñas, FAQ
- Ruta: 3 (split con diagonal), 21 (marquesina doble), ficha, calculadora "¿Qué cabe?" (nuevo, candidato a catálogo), 22 (specs) + tabla comparativa, reseñas, FAQ

## Guion fotográfico
- `*-1` foto ancla de estudio sobre el color de su página (tarjeta + galería)
- `pulse-2` ambiente nocturno · `pulse-3` macro (hotspots)
- `glaciar-2` lago glaciar · `glaciar-3` boca ancha con hielo
- `ambar-2` mesilla con libro · `ambar-3` flat lay de ingredientes
- Originales en `web/img/src/` (ignorados por git)

## Prompts de las fotos ancla (para generar fotos coherentes)
- Pulse: auriculares over-ear negro mate con anillo de luz violeta en las copas y costuras violetas; fondo índigo #0d0b1a con halo violeta.
- Glaciar: botella de acero 750 ml azul hielo en pintura en polvo, tapón de acero con asa; fondo azul hielo #e6f4fa con cubitos.
- Ámbar: vela de soja en vaso de terracota mate con banda de papel crema y cordel, mecha de madera encendida; fondo lino crema #f3e9dc, naranja seca y canela.
- Ruta: mochila 24 L verde oliva oscuro con cremalleras y cintas naranjas; fondo oliva #1f2a1c.

## Pendientes
- [ ] Ruta: faltan 2 fotos (ambiente en montaña y interior abierto) — se alcanzó el límite de generación
- [ ] Banner 16:9 de portada con los 4 productos juntos (ahora es un mosaico)
- [ ] Pasarela de pago real (ahora "Finalizar compra" muestra un aviso de demo)
- [ ] Si se quiere en Shopify: migrar secciones a `mt-*.liquid` (fases 0-2 y 4-6 de la skill)
