# CLAUDE.md — Guía del proyecto para Claude Code

Tienda online **NÓMADA**: portada + 4 páginas de producto, cada una con su propia
paleta, tipografía y bloques. Web **estática** (HTML + CSS + JS vanilla), sin
build, sin dependencias, sin framework. Publicada en GitHub Pages.

> El usuario **no es técnico** y escribe en español. Habla sin jerga, en español,
> y haz tú todos los comandos (ver "Cómo hablar con el usuario" en la skill).

## La skill del proyecto

La skill `tienda-shopify-v3` está instalada en `.claude/skills/tienda-shopify-v3/`
(el original sigue en `tienda-shopify-v3.zip`). Úsala como **guía de diseño y
calidad** aunque esta web no esté en Shopify:

- `references/10-catalogo-bloques.md` → catálogo de 100 bloques. No repitas
  combinaciones entre páginas. Anota los que uses en `web/ESTADO.md`.
- `references/04-secciones-personalizadas.md` §5 y §7 → fondo y padding en el
  MISMO elemento (`section.bloque`), nunca franjas del color de la página entre
  bloques; paddings por defecto 64-120 px.
- `references/08-fotos-ia.md` → guion fotográfico, fotos ancla, contrato del
  banner (16:9 = 2048x1152, producto completo en el 70 % central).
- `references/06-publicacion.md` → revisar SIEMPRE en escritorio 16:9 y en móvil
  antes de decir que algo está listo.
- Si el usuario quiere pasar a Shopify de verdad, sigue la skill desde la fase 0.
  Cada `section.bloque` de este proyecto se traduce a una sección `mt-*.liquid`.

## Estructura

```
index.html                 ← solo redirige a web/ (GitHub Pages sirve la raíz)
.nojekyll                  ← evita que GitHub Pages procese con Jekyll
web/
  index.html               ← portada: todos los productos
  producto-pulse.html      ← auriculares   (índigo + violeta, Space Grotesk)
  producto-glaciar.html    ← botella       (azul hielo + turquesa, Outfit)
  producto-ambar.html      ← vela          (crema + terracota, Cormorant + Jost)
  producto-ruta.html       ← mochila       (oliva + naranja, Bebas Neue + Archivo)
  js/config.js             ← MARCA: nombre, moneda, envío gratis, anuncios, pie, legales, URL de pago
  js/productos.js          ← CATÁLOGO: precios, variantes, fotos, colores de tarjeta, valoraciones
  js/app.js                ← lógica común (cabecera, pie, carrito, compra, efectos)
  css/base.css             ← estructura común; la "piel" llega por variables CSS
  css/tema-*.css           ← un archivo por página: variables :root + bloques propios
  img/*.jpg                ← fotos optimizadas (1000 px). Originales en img/src/ (ignorado por git)
  ESTADO.md                ← estado del proyecto, bloques usados, guion fotográfico, pendientes
```

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Precio, nombre, variantes, stock (`disponible`), fotos de galería | `web/js/productos.js` |
| Nombre de marca, moneda, envío gratis, barra de anuncios, contacto, legales | `web/js/config.js` |
| Conectar el pago real | `urlPago` en `web/js/config.js` (Stripe Payment Link, checkout de Shopify…) |
| Textos de una página (héroe, secciones, reseñas, FAQ) | el `.html` de esa página (texto plano en el HTML) |
| Descripción / "qué incluye" / specs de la ficha | dentro de `<div data-comprar="…">` en el `.html` del producto |
| Colores y fuentes de una página | bloque `:root` al principio de `web/css/tema-<pagina>.css` (+ `<link>` de Google Fonts en el `<head>`) |
| Botones, carrito, tarjetas, ficha (todas las páginas) | `web/css/base.css` |

## Cómo funciona (contratos que no hay que romper)

- **Orden de scripts** en cada página: `config.js` → `productos.js` → `app.js`.
- `app.js` inyecta en cada página la barra de anuncios, la cabecera, el pie, el
  carrito lateral, el aviso (toast) y la ventana modal. No los escribas a mano en el HTML.
- `<body data-pagina="id">` marca el enlace activo del menú (`inicio` en la portada
  o el `id` del producto).
- `<div class="ficha" data-comprar="ID">` se convierte en galería + columna de
  compra con los datos de `productos.js`. **Lo que haya dentro del div** (los
  `<details>` de descripción) se conserva y se coloca bajo el botón de compra.
- `data-grid-productos` → pinta todas las tarjetas. `data-relacionados="ID"` → todas menos esa.
- Cualquier enlace con `data-ir-compra` hace scroll hasta el bloque de compra.
- Efectos disponibles por atributo (no hace falta JS nuevo):
  `class="rv"` aparece al hacer scroll · `data-count="40"` contador ·
  `data-tilt="8"` inclinación 3D (zona: `data-tilt-zona`) · `data-spotlight` foco
  que sigue al ratón (variables `--mx`/`--my`) · `data-parallax="0.08"` ·
  `data-typewriter="frase 1|frase 2"` · `data-acordeon` + `data-acordeon-item data-img="…"` ·
  `.punto` (puntos interactivos sobre foto) · `<form data-newsletter>`.
- Pon el **valor final** dentro de los `data-count` (por si no hay animación).
- Carrito en `localStorage` con la clave `nomada-carrito-v1` (se comparte entre páginas).
- Animaciones: solo `transform`/`opacity`; todo se desactiva con
  `prefers-reduced-motion`. Breakpoints: 990 px y 540 px.
- Prefijos de clases por página: `pl-` Pulse, `gl-` Glaciar, `am-` Ámbar, `rt-` Ruta.
  La portada usa nombres sin prefijo en `tema-inicio.css`.
- Rutas **relativas** siempre (la web se sirve bajo `/Tienda-Online/web/` en GitHub Pages).

## Añadir un producto nuevo

1. Añade su objeto a `web/js/productos.js` (copia uno existente; `id` único, `url` a su página).
2. Copia la página de producto que más se parezca → `web/producto-<id>.html`;
   cambia `data-pagina`, `data-comprar`, `data-relacionados`, textos, `<title>`,
   `<meta description>`, `theme-color` y el favicon.
3. Crea `web/css/tema-<id>.css` con su `:root` propio y un prefijo de clases nuevo.
   Elige bloques del catálogo que no se repitan con las otras páginas.
4. Fotos: `web/img/<id>-1.jpg` (ancla, sobre el color de fondo de su página),
   `-2` ambiente, `-3` detalle. Cuadradas, 1000 px, JPG calidad ~80.
5. La portada, el menú, el carrito y los relacionados se actualizan solos.
   Si quieres, añade su panel en la sección `#mundos` y en el mosaico del héroe de `web/index.html`.

## Probar en local

```bash
cd web && python3 -m http.server 8080
# abrir http://localhost:8080
```

Checklist antes de dar algo por terminado:
- [ ] Sin errores en la consola en las 5 páginas
- [ ] Revisado en 1600×900 **y** en 390×844 (sin scroll horizontal, héroes sin recortes)
- [ ] Variantes cambian precio; una variante con `disponible: false` bloquea el botón
- [ ] Añadir al carrito abre el cajón, suma, y el contador persiste al cambiar de página
- [ ] Ni una franja del color de página entre bloques de colores distintos
- [ ] `web/ESTADO.md` actualizado

## Publicación

GitHub Pages sirve la **raíz** del repositorio desde la rama `main`
(Settings → Pages → Deploy from a branch → `main` / `(root)`). La raíz tiene
`index.html` (redirige a `web/`) y `.nojekyll`. Cada `git push` a `main` se
publica solo en ~1 minuto en:
**https://batman1518.github.io/Tienda-Online/**

## Pendientes (ver también web/ESTADO.md)

1. **Fotos de la mochila Ruta**: solo hay `ruta-1.jpg`. Faltan `ruta-2.jpg`
   (senderista de espaldas con la mochila en un sendero de montaña al atardecer) y
   `ruta-3.jpg` (mochila abierta mostrando el portátil y los bolsillos interiores,
   fondo oliva `#1f2a1c`). Usa `ruta-1.jpg` como referencia. Después, añádelas a
   `imagenes` en `productos.js` y úsalas en `producto-ruta.html` (p. ej. una
   escena de ambiente y el panel de Ruta en la portada).
2. **Banner 16:9 de portada** con los 4 productos juntos (contrato del banner),
   si se prefiere a la cuadrícula actual del héroe.
3. **Pasarela de pago real** (`urlPago` en `config.js`, o migrar a Shopify con la skill).
4. **Contenido real**: nombres, precios, reseñas y cifras son de ejemplo. Sustitúyelos
   por los reales del usuario (no inventes reseñas en una tienda real).
5. Páginas legales completas (ahora son ventanas con texto breve en `config.js`).
