# CLAUDE.md — Guía del proyecto para Claude Code

Tienda online **GINESKA**: portada + 8 páginas de producto, cada una con su
propia paleta, tipografía y bloques. Web **estática** (HTML + CSS + JS vanilla),
sin build, sin dependencias, sin framework. Publicada en GitHub Pages.

> El usuario **no es técnico** y escribe en español. Habla sin jerga, en español,
> y haz tú todos los comandos (ver "Cómo hablar con el usuario" en la skill).

## Los productos son los reales de su tienda de Shopify

Los 8 productos vienen de https://w3nt1x-qy.myshopify.com (importados con sus
fotos, precios, variantes y descripciones). **No inventes productos, precios ni
fotos nuevas**: edita `web/js/productos.js`.

La clave: el `id` de cada variante en `productos.js` es el **ID real de Shopify**.
El botón *Finalizar compra* arma `https://w3nt1x-qy.myshopify.com/cart/<id>:<n>,…`
y lleva el pedido al checkout de la tienda. Si se cambian productos en Shopify,
hay que volver a importar (ver "Añadir o actualizar productos").

## La skill del proyecto

La skill `tienda-shopify-v3` está instalada en `.claude/skills/tienda-shopify-v3/`
(el original sigue en `tienda-shopify-v3.zip`). Úsala como **guía de diseño y
calidad** aunque esta web no esté en Shopify:

- `references/10-catalogo-bloques.md` → catálogo de 100 bloques. No repitas
  combinaciones entre páginas. Anota los que uses en `web/ESTADO.md`.
- `references/04-secciones-personalizadas.md` §5 y §7 → fondo y padding en el
  MISMO elemento (`section.bloque`), nunca franjas del color de la página entre
  bloques; paddings por defecto 64-120 px.
- `references/06-publicacion.md` → revisar SIEMPRE en escritorio 16:9 y en móvil
  antes de decir que algo está listo.
- Si el usuario quiere pasar a Shopify de verdad, sigue la skill desde la fase 0.
  Cada `section.bloque` de este proyecto se traduce a una sección `mt-*.liquid`.

## Estructura

```
index.html                 ← solo redirige a web/ (GitHub Pages sirve la raíz)
.nojekyll                  ← evita que GitHub Pages procese con Jekyll
web/
  index.html               ← portada: los 8 productos
  producto-pendientes.html ← auriculares TWS con estuche-bolso (crema + naranja)
  producto-olevs.html      ← reloj OLEVS 3613 (noche + oro)
  producto-vormor.html     ← grabadora VORMOR M1 (tinta + azul eléctrico)
  producto-power.html      ← power bank 60.000 mAh (grafito + ámbar)
  producto-handfan.html    ← botella HandFan 40 oz (azul hielo)
  producto-urban.html      ← bolsa reflectante Urban (asfalto + naranja)
  producto-estrella.html   ← varita NFC (lila)
  producto-almohada.html   ← almohada cervical Anjuny (verde salvia)
  js/*.js                  ← config (marca y tienda), productos (catálogo) y app (lógica)
  css/*.css                ← base + un tema por página
  js/config.js             ← MARCA: nombre, moneda, envío, anuncios, pie, legales, tienda Shopify
  js/productos.js          ← CATÁLOGO: precios, variantes (IDs de Shopify), fotos, colores, valoraciones
  js/app.js                ← lógica común (cabecera, pie, carrito, compra, efectos)
  css/base.css             ← estructura común; la "piel" llega por variables CSS
  css/tema-*.css           ← un archivo por página: variables :root + bloques propios
  img/<id>-N.jpg           ← fotos de los productos (1000 px, JPEG calidad 80)
  ESTADO.md                ← estado del proyecto, bloques usados, costuras, pendientes
```

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Precio, nombre, variantes, fotos de galería | `web/js/productos.js` |
| Nombre de marca, moneda, envío, anuncios, contacto, legales, tienda de Shopify | `web/js/config.js` |
| Conectar el pago real | `urlPago` en `web/js/config.js` (vacío = usa el carrito de `tiendaShopify`) |
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
- Si una variante tiene `foto`, al elegirla cambia la foto grande y la miniatura
  activa; en el carrito se usa esa misma foto.
- `data-grid-productos` → pinta todas las tarjetas. `data-relacionados="ID"` → todas menos esa.
- Cualquier enlace con `data-ir-compra` hace scroll hasta el bloque de compra.
- Efectos disponibles por atributo (no hace falta JS nuevo):
  `class="rv"` aparece al hacer scroll · `data-count="40"` contador ·
  `data-tilt="8"` inclinación 3D (zona: `data-tilt-zona`) · `data-spotlight` foco
  que sigue al ratón (variables `--mx`/`--my`) · `data-parallax="0.08"` ·
  `data-typewriter="frase 1|frase 2"` · `data-acordeon` + `data-acordeon-item data-img="…"` ·
  `.punto` (puntos interactivos sobre foto) · `<form data-newsletter>`.
- Pon el **valor final** dentro de los `data-count` (por si no hay animación).
- Carrito en `localStorage` con la clave `gineska-carrito-v1` (se comparte entre páginas).
- El botón *Finalizar compra* (`[data-pagar]`) usa `urlPago` si existe; si no,
  construye el carrito real de Shopify con `tiendaShopify` + los IDs de variante.
- Animaciones: solo `transform`/`opacity`; todo se desactiva con
  `prefers-reduced-motion`. Breakpoints: 990 px y 540 px.
- Prefijos de clases por página: `pe-` Pendientes, `ol-` OLEVS, `vo-` VORMOR,
  `pw-` Power, `hf-` HandFan, `ur-` Urban, `es-` Estrella, `al-` Almohada.
  La portada usa nombres sin prefijo en `tema-inicio.css`.
- Rutas **relativas** siempre (la web se serve bajo `/Tienda-Online/web/` en GitHub Pages).

## Añadir o actualizar productos

1. **Si cambia el catálogo en Shopify**, hay que volver a importarlo: pide al
   usuario el enlace de la tienda, lee `https://<tienda>/products.json` (incluye
   precios, variantes con su `id`, fotos y descripciones) y descarga las fotos de
   `cdn.shopify.com`. Ojo: desde el entorno del agente `cdn.shopify.com` está
   bloqueado, así que la vía que funcionó fue un **workflow temporal de GitHub
   Actions** que descargaba los datos y las fotos y los dejaba en el repositorio.
   Borra ese workflow (y sus scripts) cuando el catálogo ya esté en `productos.js`.
2. Añade el producto a `web/js/productos.js` (copia uno existente; `id` único,
   `url` a su página, y en cada variante el `id` real de Shopify).
3. Copia la página de producto que más se parezca → `web/producto-<id>.html`;
   cambia `data-pagina`, `data-comprar`, `data-relacionados`, textos, `<title>`,
   `<meta description>`, `theme-color` y el favicon.
4. Crea `web/css/tema-<id>.css` con su `:root` propio y un prefijo de clases nuevo.
   Elige bloques del catálogo que no se repitan con las otras páginas.
5. Fotos: `web/img/<id>-N.jpg`, cuadradas, 1000 px, JPEG calidad ~80.
6. La portada, el menú, el carrito y los relacionados se actualizan solos. Si
   quieres, añade su panel en la sección `#mundos` y su pieza en el mosaico del héroe.

## Probar en local

```bash
cd web && python3 -m http.server 8080
# abrir http://localhost:8080
```

Checklist antes de dar algo por terminado:
- [ ] Sin errores en la consola en las 9 páginas
- [ ] Revisado en 1600×900 **y** en 390×844 (sin scroll horizontal, héroes sin recortes)
- [ ] Variantes cambian precio **y foto**; una variante con `disponible: false` bloquea el botón
- [ ] Añadir al carrito abre el cajón, suma, y el contador persiste al cambiar de página
- [ ] El botón *Finalizar compra* apunta al carrito de Shopify con los IDs correctos
- [ ] Ni una franja del color de página entre bloques de colores distintos
- [ ] `web/ESTADO.md` actualizado

## Publicación

**La web pública solo se actualiza cuando los cambios llegan a `main`.** Los
agentes trabajan en ramas `arena/…` y abren un pull request; el usuario lo
fusiona. Hasta entonces, la rama se puede ver con `python3 -m http.server`.

GitHub Pages sirve la **raíz** del repositorio desde la rama `main`
(Settings → Pages → Deploy from a branch → `main` / `(root)`). La raíz tiene
`index.html` (redirige a `web/`) y `.nojekyll`. Cada `git push` a `main` se
publica solo en ~1 minuto en:
**https://batman1518.github.io/Tienda-Online/**

## Pendientes (ver también web/ESTADO.md)

1. **Reseñas reales**: la web muestra 3 reseñas de ejemplo por página, marcadas
   como tales. Sustitúyelas cuando haya opiniones de verdad (no inventes más).
2. **Políticas**: envío gratis y 30 días de garantía ya están en la web; falta
   confirmar si hay devoluciones y el horario de atención. El correo que hay es
   `contacto@gineska.com` (el usuario escribió uno con dos @; conviene que
   confirme la dirección real).
3. **Fotos que faltan**: HandFan negro, colores del power bank y de la almohada
   sin foto propia (esos acabados no cambian la imagen al elegirlos).
4. **Banner 16:9 de portada** con varios productos juntos, si se prefiere al mosaico.
5. **Pasarela de pago propia** (Stripe, por ejemplo) si algún día se quiere dejar
   el checkout de Shopify: se cambia en `urlPago` (`config.js`).
6. Páginas legales completas (ahora son ventanas con texto breve en `config.js`).
