#!/usr/bin/env python3
"""Importa el catálogo publicado en la tienda Shopify del usuario.

Se ejecuta dentro de GitHub Actions (los runners sí pueden salir a Internet
hacia cdn.shopify.com; el entorno del agente no). Hace tres cosas:

1. Lee los productos publicados en la tienda (products.json).
2. Descarga sus fotos, las optimiza (JPEG, lado máximo 1100 px) y las guarda
   en web/img/tienda/.
3. Escribe un resumen legible en web/js/catalogo-importado.json.

Es una herramienta temporal: se borra cuando el catálogo ya está en la web.
"""

import json
import os
import re
import time
import urllib.error
import urllib.request
from io import BytesIO

from PIL import Image, ImageOps

TIENDA = "https://w3nt1x-qy.myshopify.com"
DESTINO = "web/img/tienda"
RESUMEN = "web/js/catalogo-importado.json"
MAX_LADO = 1100
CALIDAD = 82
MAX_FOTOS = 8

CABECERAS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    ),
    "Accept": "text/html,application/json,image/avif,image/webp,image/*,*/*;q=0.8",
}


def bajar(url: str, intentos: int = 3) -> bytes:
    error = None
    for n in range(intentos):
        try:
            peticion = urllib.request.Request(url, headers=CABECERAS)
            with urllib.request.urlopen(peticion, timeout=90) as respuesta:
                return respuesta.read()
        except Exception as exc:  # noqa: BLE001
            error = exc
            time.sleep(1.5 * (n + 1))
    raise RuntimeError(f"No se pudo descargar {url}: {error}")


def sin_etiquetas(html: str) -> str:
    """Convierte el HTML de la descripción en texto plano legible."""
    texto = re.sub(r"(?is)<(script|style|noscript).*?</\1>", " ", html or "")
    texto = re.sub(r"(?i)<br\s*/?>", "\n", texto)
    texto = re.sub(r"(?i)</(p|div|li|h[1-6]|tr)>", "\n", texto)
    texto = re.sub(r"(?i)<li[^>]*>", "· ", texto)
    texto = re.sub(r"<[^>]+>", " ", texto)
    reemplazos = {
        "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">",
        "&quot;": '"', "&#39;": "'", "&aacute;": "á", "&eacute;": "é",
        "&iacute;": "í", "&oacute;": "ó", "&uacute;": "ú", "&ntilde;": "ñ",
    }
    for origen, destino in reemplazos.items():
        texto = texto.replace(origen, destino)
    texto = re.sub(r"[ \t]+", " ", texto)
    texto = re.sub(r"\n{2,}", "\n", texto)
    return texto.strip()


def guardar_foto(url: str, ruta: str) -> bool:
    """Descarga una foto, la deja en JPEG y la reduce a MAX_LADO px."""
    separador = "&" if "?" in url else "?"
    fuente = f"{url}{separador}width={MAX_LADO * 2}"
    try:
        datos = bajar(fuente)
    except RuntimeError as exc:
        print(f"  ! {exc}")
        return False
    try:
        imagen = Image.open(BytesIO(datos))
        imagen = ImageOps.exif_transpose(imagen)
        if imagen.mode in ("RGBA", "LA", "P"):
            fondo = Image.new("RGB", imagen.size, (255, 255, 255))
            convertida = imagen.convert("RGBA")
            fondo.paste(convertida, mask=convertida.split()[-1])
            imagen = fondo
        else:
            imagen = imagen.convert("RGB")
        imagen.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)
        os.makedirs(os.path.dirname(ruta), exist_ok=True)
        imagen.save(ruta, "JPEG", quality=CALIDAD, optimize=True, progressive=True)
        return True
    except Exception as exc:  # noqa: BLE001
        print(f"  ! no se pudo procesar {url}: {exc}")
        return False


def main() -> int:
    print(f"Leyendo el catálogo de {TIENDA} …")
    crudo = json.loads(bajar(f"{TIENDA}/products.json?limit=250"))
    productos = crudo.get("products", [])
    print(f"{len(productos)} productos publicados.\n")

    resumen = []
    for producto in productos:
        handle = producto["handle"]
        titulo = producto["title"]
        variantes = [
            {
                "titulo": v.get("title"),
                "precio": float(v.get("price") or 0),
                "precioAntes": float(v["compare_at_price"]) if v.get("compare_at_price") else None,
                "disponible": bool(v.get("available")),
                "sku": v.get("sku") or "",
                "opciones": [v.get("option1"), v.get("option2"), v.get("option3")],
            }
            for v in producto.get("variants", [])
        ]
        opciones = [
            {"nombre": o.get("name"), "valores": o.get("values", [])}
            for o in producto.get("options", [])
        ]
        opciones = [o for o in opciones if (o["nombre"] or "").lower() not in ("title", "default title")]

        fotos = []
        for indice, imagen in enumerate(producto.get("images", [])[:MAX_FOTOS], start=1):
            ruta = f"{DESTINO}/{handle[:40]}-{indice}.jpg"
            if guardar_foto(imagen["src"], ruta):
                fotos.append({"archivo": ruta, "ancho": imagen.get("width"), "alto": imagen.get("height")})

        etiquetas = producto.get("tags") or []
        resumen.append(
            {
                "idShopify": producto.get("id"),
                "titulo": titulo,
                "handle": handle,
                "urlShopify": f"{TIENDA}/products/{handle}",
                "tipo": producto.get("product_type") or "",
                "etiquetas": etiquetas,
                "descripcion": sin_etiquetas(producto.get("body_html", ""))[:2500],
                "opciones": opciones,
                "variantes": variantes,
                "fotos": fotos,
            }
        )
        print(f"· {titulo}")
        print(f"  handle: {handle}")
        print(f"  fotos guardadas: {len(fotos)}/{len(producto.get('images', []))}")
        print(f"  variantes: {[v['titulo'] for v in variantes][:12]}")
        print()

    os.makedirs(os.path.dirname(RESUMEN), exist_ok=True)
    with open(RESUMEN, "w", encoding="utf-8") as archivo:
        json.dump(resumen, archivo, ensure_ascii=False, indent=2)

    print(f"Resumen escrito en {RESUMEN}")
    print("IMPORTACION-OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
