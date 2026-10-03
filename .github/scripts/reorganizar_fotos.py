#!/usr/bin/env python3
"""Reorganiza las fotos importadas de Shopify a nombres claros (img/<id>-N.jpg).

Solo copia las fotos que cada página usa de verdad, las reescala a 1000 px
y las guarda en JPEG de calidad 80 (igual que el resto de la web).
"""
import os
import sys

sys.path.insert(0, "/tmp/venv/lib/python3.13/site-packages")
from PIL import Image  # noqa: E402

ORIGEN = "web/img/tienda"
DESTINO = "web/img"
MAX_LADO = 1000
CALIDAD = 80

# producto: [(origen, destino), ...]  ← orden = galería
MAPA = {
    "pendientes": [
        ("tws-wireless-earphone-comfortable-wear-l-1.jpg", "pendientes-1.jpg"),  # naranja, héroe
        ("tws-wireless-earphone-comfortable-wear-l-2.jpg", "pendientes-2.jpg"),  # modelo con los auriculares
        ("tws-wireless-earphone-comfortable-wear-l-6.jpg", "pendientes-3.jpg"),  # blanco
        ("tws-wireless-earphone-comfortable-wear-l-4.jpg", "pendientes-4.jpg"),  # detalle de la funda
        ("tws-wireless-earphone-comfortable-wear-l-8.jpg", "pendientes-5.jpg"),  # negro
        ("tws-wireless-earphone-comfortable-wear-l-3.jpg", "pendientes-6.jpg"),  # batería / funda abierta
        ("tws-wireless-earphone-comfortable-wear-l-5.jpg", "pendientes-7.jpg"),  # blanco con cadena
    ],
    "olevs": [
        ("olevs-3613-oem-luxury-original-logo-man--1.jpg", "olevs-1.jpg"),   # esfera azul
        ("olevs-3613-oem-luxury-original-logo-man--6.jpg", "olevs-2.jpg"),   # los 5 colores
        ("olevs-3613-oem-luxury-original-logo-man--3.jpg", "olevs-3.jpg"),   # en la muñeca
        ("olevs-3613-oem-luxury-original-logo-man--7.jpg", "olevs-4.jpg"),   # dorado
        ("olevs-3613-oem-luxury-original-logo-man--2.jpg", "olevs-5.jpg"),   # negro macro
        ("olevs-3613-oem-luxury-original-logo-man--5.jpg", "olevs-6.jpg"),   # acero
        ("olevs-3613-oem-luxury-original-logo-man--8.jpg", "olevs-7.jpg"),   # dorado macro
    ],
    "vormor": [
        ("vormor-m1-free-1-year-subscription-digit-1.jpg", "vormor-1.jpg"),  # producto + app
        ("vormor-m1-free-1-year-subscription-digit-3.jpg", "vormor-3.jpg"),  # transcripción
        ("vormor-m1-free-1-year-subscription-digit-5.jpg", "vormor-5.jpg"),  # llamada en tiempo real
        ("vormor-m1-free-1-year-subscription-digit-6.jpg", "vormor-6.jpg"),  # escenarios
        ("vormor-m1-free-1-year-subscription-digit-4.jpg", "vormor-4.jpg"),  # el aparato
    ],
    "power": [
        ("hot-selling-large-capacity-power-bank-10-1.jpg", "power-1.jpg"),   # gris, héroe
        ("hot-selling-large-capacity-power-bank-10-3.jpg", "power-3.jpg"),   # carga 100 W
        ("hot-selling-large-capacity-power-bank-10-4.jpg", "power-4.jpg"),   # 45 W verde
        ("hot-selling-large-capacity-power-bank-10-5.jpg", "power-5.jpg"),   # certificados
        ("hot-selling-large-capacity-power-bank-10-6.jpg", "power-6.jpg"),   # camuflaje
        ("hot-selling-large-capacity-power-bank-10-2.jpg", "power-2.jpg"),   # uso exterior
    ],
    "handfan": [
        ("brand-distribution-handfan-2025-40oz-fan-7.jpg", "handfan-1.jpg"),  # azul, héroe
        ("brand-distribution-handfan-2025-40oz-fan-1.jpg", "handfan-2.jpg"),  # rosa con caja
        ("brand-distribution-handfan-2025-40oz-fan-3.jpg", "handfan-3.jpg"),  # despiece con etiquetas
        ("brand-distribution-handfan-2025-40oz-fan-8.jpg", "handfan-4.jpg"),  # 24 h frío / 6 h calor
        ("brand-distribution-handfan-2025-40oz-fan-6.jpg", "handfan-5.jpg"),  # en el coche
        ("brand-distribution-handfan-2025-40oz-fan-2.jpg", "handfan-6.jpg"),  # premios 2025
    ],
    "urban": [
        ("custom-logo-reflective-magnetic-gym-bag--1.jpg", "urban-1.jpg"),  # negro, héroe
        ("custom-logo-reflective-magnetic-gym-bag--4.jpg", "urban-4.jpg"),  # los tres imanes
        ("custom-logo-reflective-magnetic-gym-bag--3.jpg", "urban-3.jpg"),  # despiece / bolsillos
        ("custom-logo-reflective-magnetic-gym-bag--2.jpg", "urban-2.jpg"),  # en el gimnasio
        ("custom-logo-reflective-magnetic-gym-bag--5.jpg", "urban-5.jpg"),  # de pie
        ("custom-logo-reflective-magnetic-gym-bag--7.jpg", "urban-7.jpg"),  # capacidad
    ],
    "estrella": [
        ("3d-printed-pla-modern-art-star-for-penta-5.jpg", "estrella-1.jpg"),  # verde, héroe
        ("3d-printed-pla-modern-art-star-for-penta-1.jpg", "estrella-2.jpg"),  # los colores
        ("3d-printed-pla-modern-art-star-for-penta-4.jpg", "estrella-4.jpg"),  # lila
        ("3d-printed-pla-modern-art-star-for-penta-8.jpg", "estrella-8.jpg"),  # azul
        ("3d-printed-pla-modern-art-star-for-penta-7.jpg", "estrella-7.jpg"),  # rojo
        ("3d-printed-pla-modern-art-star-for-penta-3.jpg", "estrella-3.jpg"),  # pagando en el datáfono
        ("3d-printed-pla-modern-art-star-for-penta-2.jpg", "estrella-5.jpg"),  # en la tienda
    ],
    "almohada": [
        ("anjuny-breathable-ergonomic-butterfly-me-3.jpg", "almohada-1.jpg"),  # gris oscuro, héroe
        ("anjuny-breathable-ergonomic-butterfly-me-6.jpg", "almohada-3.jpg"),  # enrollada
        ("anjuny-breathable-ergonomic-butterfly-me-7.jpg", "almohada-4.jpg"),  # gris claro
        ("anjuny-breathable-ergonomic-butterfly-me-2.jpg", "almohada-2.jpg"),  # azul
        ("anjuny-breathable-ergonomic-butterfly-me-4.jpg", "almohada-5.jpg"),  # uso / puntos de apoyo
        ("anjuny-breathable-ergonomic-butterfly-me-1.jpg", "almohada-6.jpg"),  # doble
        ("anjuny-breathable-ergonomic-butterfly-me-8.jpg", "almohada-7.jpg"),  # blanca
    ],
}


def main():
    total = 0
    for producto, pares in MAPA.items():
        for origen, destino in pares:
            ruta_origen = os.path.join(ORIGEN, origen)
            ruta_destino = os.path.join(DESTINO, destino)
            imagen = Image.open(ruta_origen).convert("RGB")
            imagen.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)
            imagen.save(ruta_destino, "JPEG", quality=CALIDAD, optimize=True, progressive=True)
            kb = os.path.getsize(ruta_destino) / 1024
            print(f"{producto:11s} {destino:18s} {imagen.size[0]}x{imagen.size[1]:<5} {kb:6.1f} KB  ← {origen}")
            total += 1
    print(f"\n{total} fotos listas en {DESTINO}/")


if __name__ == "__main__":
    main()
