# Tienda Online · GINESKA

🌐 **Web publicada:** https://batman1518.github.io/Tienda-Online/
🛍️ **Tienda de Shopify:** https://w3nt1x-qy.myshopify.com

Los 8 productos (fotos, precios, variantes y descripciones) son los reales de la
tienda de Shopify. El botón *Finalizar compra* lleva el carrito al checkout de
esa tienda: el `id` de cada variante en el catálogo es su ID real de Shopify.

- `web/index.html` — portada con los 8 productos
- `web/producto-*.html` — una página personalizada (colores, tipografía y bloques propios) por producto
- `web/js/productos.js` — precios, variantes, fotos y colores
- `web/js/config.js` — marca, moneda (USD), envío, anuncios, pie, legales y tienda de Shopify
- `web/img/*.jpg` — fotos de los productos (1000 px)
- `CLAUDE.md` — guía completa para seguir el proyecto con Claude Code
- `web/ESTADO.md` — estado, decisiones de diseño, costuras y pendientes

Ver en local: `cd web && python3 -m http.server 8080` → http://localhost:8080

(El simulador `simuladorprueba.py` es un proyecto independiente de Streamlit.)
