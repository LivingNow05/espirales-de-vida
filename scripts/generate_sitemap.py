#!/usr/bin/env python3
"""
SitemapFast Generator for Fundacion Espirales de Vida (Marinilla & Medellin, Antioquia).
Generates public/sitemap-index.xml, public/sitemap-0.xml, public/sitemap.xml, and public/robots.txt.
"""

import os
from datetime import datetime, timezone

DOMAIN = "https://espirales-de-vida.wtxw5j.easypanel.host"
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")


def generate_sitemaps() -> None:
    os.makedirs(PUBLIC_DIR, exist_ok=True)

    urls = [
        {
            "loc": f"{DOMAIN}/",
            "priority": "1.0",
            "changefreq": "daily",
            "image": f"{DOMAIN}/images/hero-marinilla.jpg",
            "title": "Fundacion Espirales de Vida · Apadrina un Nino en Marinilla y Medellin",
        },
        {
            "loc": f"{DOMAIN}/#mision",
            "priority": "0.9",
            "changefreq": "weekly",
            "image": f"{DOMAIN}/brand/logo-espirales-hd.png",
            "title": "Nuestra Mision y 4 Pilares Fundamentales en Marinilla, Antioquia",
        },
        {
            "loc": f"{DOMAIN}/#testimonio",
            "priority": "0.9",
            "changefreq": "weekly",
            "image": f"{DOMAIN}/images/hero-marinilla.jpg",
            "title": "Testimonio Real · Ex-beneficiaria de la Fundacion Espirales de Vida",
        },
        {
            "loc": f"{DOMAIN}/#frentes",
            "priority": "0.95",
            "changefreq": "weekly",
            "image": f"{DOMAIN}/images/huerta-vida.jpg",
            "title": "Tres Frentes de Transformacion: Dignidad Diaria, Parque Infantil e Infraestructura",
        },
        {
            "loc": f"{DOMAIN}/#historias",
            "priority": "0.95",
            "changefreq": "weekly",
            "image": f"{DOMAIN}/images/taller-arte.jpg",
            "title": "Historias de los 22 Ninos y Adolescentes · Apadrinamiento en Marinilla y Medellin",
        },
        {
            "loc": f"{DOMAIN}/#apadrinar",
            "priority": "0.95",
            "changefreq": "weekly",
            "image": f"{DOMAIN}/images/taller-musica.jpg",
            "title": "Programa de Padrinos, Madrinas y Alianzas Empresariales RSE (NIT 900150558-5)",
        },
        {
            "loc": f"{DOMAIN}/#empresas-medellin-oriente",
            "priority": "0.9",
            "changefreq": "weekly",
            "image": f"{DOMAIN}/images/hero-marinilla.jpg",
            "title": "Responsabilidad Social Empresarial (RSE) en Medellin, Rionegro y Marinilla",
        },
        {
            "loc": f"{DOMAIN}/#preguntas-frecuentes",
            "priority": "0.85",
            "changefreq": "monthly",
            "image": f"{DOMAIN}/brand/logo-espirales-hd.png",
            "title": "Preguntas Frecuentes sobre Donaciones y Apadrinamiento en Antioquia",
        },
        {
            "loc": f"{DOMAIN}/#contacto",
            "priority": "0.85",
            "changefreq": "monthly",
            "image": f"{DOMAIN}/images/hero-marinilla.jpg",
            "title": "Contacto y Visitas · Via El Penol Km 10, Marinilla, Antioquia",
        },
    ]

    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:xhtml="http://www.w3.org/1999/xhtml" '
        'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ]

    for item in urls:
        sitemap_lines.append("  <url>")
        sitemap_lines.append(f'    <loc>{item["loc"]}</loc>')
        sitemap_lines.append(f"    <lastmod>{TODAY}</lastmod>")
        sitemap_lines.append(f'    <changefreq>{item["changefreq"]}</changefreq>')
        sitemap_lines.append(f'    <priority>{item["priority"]}</priority>')
        if item.get("image"):
            sitemap_lines.append("    <image:image>")
            sitemap_lines.append(f'      <image:loc>{item["image"]}</image:loc>')
            sitemap_lines.append(f'      <image:title>{item["title"]}</image:title>')
            sitemap_lines.append("    </image:image>")
        sitemap_lines.append("  </url>")

    sitemap_lines.append("</urlset>\n")
    xml_content = "\n".join(sitemap_lines)

    with open(os.path.join(PUBLIC_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(xml_content)

    with open(os.path.join(PUBLIC_DIR, "sitemap-0.xml"), "w", encoding="utf-8") as f:
        f.write(xml_content)

    sitemap_index = f"""<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>{DOMAIN}/sitemap-0.xml</loc>
    <lastmod>{TODAY}</lastmod>
  </sitemap>
</sitemapindex>
"""
    with open(os.path.join(PUBLIC_DIR, "sitemap-index.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_index)

    robots_content = f"""User-agent: *
Allow: /

# SitemapFast Dual Pointers for Fundacion Espirales de Vida (Marinilla & Medellin)
Sitemap: {DOMAIN}/sitemap-index.xml
Sitemap: {DOMAIN}/sitemap.xml
"""
    with open(os.path.join(PUBLIC_DIR, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(robots_content)

    print(f"SitemapFast completado: {len(urls)} URLs generadas en {PUBLIC_DIR}")


if __name__ == "__main__":
    generate_sitemaps()
