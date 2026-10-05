# ESTADO — Tienda GINESKA

Web estática (HTML + CSS + JS, sin dependencias) con **1 portada y 8 páginas de
producto**, construida con el método de la skill `tienda-shopify-v3`.

- **Ruta:** `web/` · abrir `web/index.html` o `python3 -m http.server 8080` desde `web/`
- **Publicado:** https://batman1518.github.io/Tienda-Online/ (GitHub Pages desde `main` / raíz)
- **Guía técnica:** `CLAUDE.md` en la raíz

## De dónde salen los datos

Los 8 productos son los **reales de la tienda de Shopify del usuario**
(https://w3nt1x-qy.myshopify.com), importados el 2026-10-02 con sus fotos,
precios, variantes y descripciones:

| Qué | Dónde queda |
|---|---|
| Nombres, precios, variantes, fotos | `web/js/productos.js` (única fuente de verdad) |
| Fotos usadas por la web | `web/img/<id>-N.jpg` (1000 px, JPEG calidad 80) |
| Moneda y formato | `web/js/config.js` → `idioma: 'es-ES'`, `moneda: 'USD'` → `12,97 US$` |

**El `id` de cada variante en `productos.js` es el ID real de Shopify.**
Gracias a eso, el botón *Finalizar compra* del carrito construye
`https://w3nt1x-qy.myshopify.com/cart/<id>:<cantidad>,…` y abre el **checkout
real de la tienda** con los productos elegidos. Si algún día se prefiere otro
sistema de pago, se cambia `urlPago` en `config.js`.

## Páginas y paletas

| Página | Fondo | Acento | Tipografía | Precio |
|---|---|---|---|---|
| Portada `index.html` | #f7f5f2 | #e2603f | Fraunces + Inter | — |
| Pendientes TWS `producto-pendientes.html` | #fff6ee | #e8703a | Bricolage Grotesque + Inter | 12,97 US$ |
| Reloj OLEVS 3613 `producto-olevs.html` | #0b0e13 | #cf9c47 | Bodoni Moda + Inter | 8,73 US$ |
| Grabadora VORMOR M1 `producto-vormor.html` | #0f1419 | #4f7cff | Space Grotesk + Inter | 46,28 US$ |
| Power Bank 60K `producto-power.html` | #0e1013 | #ff8a00 | Chakra Petch + Archivo | 19,90 US$ |
| Botella HandFan 40 oz `producto-handfan.html` | #eaf5fc | #1e88c7 | Outfit + Inter | 25,00 US$ |
| Bolsa Reflectante Urban `producto-urban.html` | #14181d | #ff7a1a | Bebas Neue + Archivo | 8,50 US$ |
| Estrella NFC `producto-estrella.html` | #f7f5fb | #7b5cff | Baloo 2 + Inter | 2,19 US$ |
| Almohada Anjuny `producto-almohada.html` | #f1f5f2 | #2f7d6a | Fraunces + Jost | 9,51 US$ |

Cada producto tiene **su propia página, su paleta y su prefijo de clases**
(`pe-` pendientes, `ol-` olevs, `vo-` vormor, `pw-` power, `hf-` handfan,
`ur-` urban, `es-` estrella, `al-` almohada; la portada sin prefijo).

## Bloques usados (nº de arquetipo del catálogo de la skill)

- **Portada:** 4 (héroe editorial) + mosaico de 8, 8 (marquesina), cuadrícula de
  producto, 67 (mosaico de usos con hover), 18 (lista numerada), 44 (cifras con
  contador), 13 (reseñas), 89 (cierre con degradado).
- **Pendientes:** 5 (producto flotante 3D), 8 (marquesina), 25 (nube de chips),
  20 (banda imagen/texto), 17 (hotspots), 20 (escena), 62 (colores), reseñas, FAQ.
- **OLEVS:** 3 (split con diagonal), 8, 78 (acabados), 28 (macro), 58 (ficha
  técnica en cuadrícula), reseñas, FAQ.
- **VORMOR:** 10 (héroe typewriter con spotlight), 8, 20 (tres bandas
  encadenadas), 23/68 (bento con contadores), 77 (escenarios), reseñas, FAQ.
- **Power:** 23 (héroe con tira de datos y contador), 8, 68 (bento grande +
  satélites), 66 (banda de certificados reales), 75 (panorámica con tarjeta),
  reseñas, FAQ.
- **HandFan:** héroe en arco con chips flotantes, 8, 34 (despiece etiquetado),
  54 (cifras de temperatura con contador), 43 (premios reales), 75 (coche),
  reseñas, FAQ.
- **Urban:** 3 (split con diagonal), 8, 34 (los tres imanes), 67 (mosaico de
  usos), 58 (ficha técnica), reseñas, FAQ.
- **Estrella:** 4 (héroe editorial), 8, 49 (tres pasos), 71 (galería de colores),
  44 (datos con contador), reseñas, FAQ.
- **Almohada:** héroe con cotas, 8, 81 (puntos de apoyo), 19 (acordeón con
  imagen viva), 64 (medidas a escala), reseñas, FAQ.

Ninguna página repite la combinación de otra.

## Costuras (revisadas)

- Cada bloque lleva **el fondo y su padding en el mismo elemento** (`.bloque`).
- Héroe → marquesina del color de acento: costura **continua** (pegada).
- Bloques de color distinto: **contraste con aire** (padding ≥ 64 px por lado,
  cada uno pintado de su color).
- No hay ninguna franja del color de la página entre bloques de color.
- El pie va en color oscuro propio (`--pie-bg`) en todas las páginas.

## Fotos del guion (`web/img/`)

| Producto | Fotos | Qué es cada una |
|---|---|---|
| Pendientes | `pendientes-1…7` | héroe naranja, modelo, blanco, detalle del estuche, negro, estuche abierto, blanco con cadena |
| OLEVS | `olevs-1…7` | esfera azul (héroe), los 5 colores, en la muñeca, dorado, macro negro, plateado, macro dorado |
| VORMOR | `vormor-1…6` | equipo + app (héroe), transcripción, resumen, escenarios, el aparato |
| Power | `power-1…6` | gris (héroe), carga 100 W, uso exterior, certificados, camuflaje, 45 W |
| HandFan | `handfan-1…6` | azul (héroe), rosa con caja, despiece, temperaturas, coche, premios |
| Urban | `urban-1…7` | negra (héroe), organización, los 3 imanes, gimnasio, de pie, capacidad |
| Estrella | `estrella-1…8` | verde (héroe), colores, lila, azul, roja, pagando, en la tienda |
| Almohada | `almohada-1…7` | gris oscuro (héroe), enrollada, gris claro, azul, uso, doble, blanca |

Son las fotos originales del anuncio, reescaladas a 1000 px y recomprimidas en
JPEG (calidad 80). Cuando haya fotos propias, basta con sustituir los archivos
manteniendo el nombre.

## Verificación hecha

Repasada de nuevo el 2026-10-05 con un banco de pruebas propio:

- `node --check` en los tres archivos JS ✅
- jsdom sobre las **9 páginas**: cabecera, pie, barra de anuncios, carrito, aviso
  y modal inyectados; menú con 9 enlaces; pie con los 8 productos; ninguna
  imagen, hoja o script que falte; sin errores de consola ✅
- Portada: 8 tarjetas con su precio en US$ y 8 paneles de "mundos" ✅
- Cada ficha: título, nº de variantes, nº de miniaturas, precio con dos
  decimales, cambio de variante (precio **y foto del color**), añadido al
  carrito con el ID de Shopify y 7 productos relacionados ✅
- 28 variantes, todas con ID numérico real, sin repetidos ✅
- **Checkout verificado contra la tienda real**: el carrito monta
  `…/cart/<id>:<cantidad>` y Shopify lo abre con los productos correctos ✅
- Comprobación de estilos: ninguna clase del HTML se queda sin CSS, todos los
  temas tienen sus puntos de ruptura (990/540 px) y no hay anchos fijos que
  provoquen scroll horizontal ✅
- **Pendiente:** la revisión a ojo en navegador a 1600×900 y 390×844 (el entorno
  del agente no tiene navegador ni puede descargar uno). Hazla sobre la vista
  previa.

## Pendientes

- [ ] Revisar en navegador (escritorio y móvil) y ajustar lo que chirríe.
- [ ] **Reseñas reales**: ahora hay 3 por página marcadas con «Reseñas de ejemplo».
- [ ] Confirmar el correo de contacto: se dejó `contacto@gineska.com` porque el
      que se indicó (con dos @) no es válido. Falta decidir devoluciones y horario.
- [ ] Confirma que el checkout de Shopify está fuera del modo de prueba
      (sandbox) antes de vender de verdad.
- [ ] Fotos que faltan: HandFan negro y varios colores del power bank y la
      almohada (esos acabados no tienen foto propia).
- [ ] El nombre de la marca en la web es **GINESKA**; la tienda de Shopify sigue
      llamándose «Mi tienda» (renombrarla ahí si se quiere que coincida).
- [ ] Repasar los textos promocionales del proveedor que se han mantenido en las
      páginas (premio de la botella HandFan, autonomía de 20 días del power bank,
      transcripción con IA de la grabadora): son los datos que da el fabricante.
- [ ] Banner 16:9 de portada con varios productos, si se quiere sustituir el mosaico.
- [ ] Si se quiere pasar a Shopify de verdad: migrar cada `section.bloque` a un
      `mt-*.liquid` (fases 0-2 y 4-6 de la skill).
