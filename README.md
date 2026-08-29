# landing_mimbre_bienal_2

Landing de crowdfunding — Endémica Crea × Révélations 2027 (Grand Palais, París).

Sitio estático (HTML/CSS/JS, sin build ni dependencias). Diseño basado en la
referencia Nicepage "Minimalist Modern Interior" (paleta carbón/sage) y copy
verbatim de `Crowdfunding.docx`.

## Estructura

```
index.html                 toda la página: header, 10 secciones + progreso/presupuesto, footer
css/style.css               diseño (tokens de color/tipografía al inicio del archivo)
js/main.js                  lee config/, arma progreso, presupuesto, tracking de Mercado Pago, compartir
config/campaign.config.js   ÚNICO archivo a editar para actualizar montos/fechas/links
assets/img/hero/            poster del hero + textura de mimbre
assets/img/angel/           retrato de Angel para "La historia"
assets/img/obra/            piezas de la colección Inteligencia Artesanal
assets/img/proceso/         fotos de proceso de tejido
```

## Para editar montos, fecha límite, Mercado Pago, Meta Pixel o videos

Editar **solo** `config/campaign.config.js`. Los montos en `null` se muestran
como `$[monto]` hasta reemplazarse por cifras reales.

- `mercadoPagoUrl`: ya apunta al link real (`link.mercadopago.cl/endemicacrea`).
- `metaPixelId`: reemplazar `PIXEL_ID_AQUI` y descomentar el snippet en el
  `<head>` de `index.html` cuando esté disponible.
- `videoLinks`: pegar el link real de cada hito FONDART (2020/2023/2024)
  cuando exista; mientras tanto el hito muestra "Video próximamente".
- `raisedAmount` / `goalAmount` / `budget[].amount`: cifras reales de la
  campaña.

## Pendientes explícitos

- [ ] Montos reales de los niveles de mecenazgo (hoy: `$X`)
- [ ] Fecha límite y cifras de progreso reales
- [ ] Meta Pixel ID real
- [ ] Links de video de cada hito FONDART
- [ ] Copy EN/FR (fase posterior)
- [ ] Fotos/video definitivos del hero y galería (hoy: fotos reales de la
      obra y del proceso ya disponibles; pendiente sesión fotográfica
      completa de 28 fotos compartida por Drive)

## Para ver el sitio localmente

```
python3 -m http.server 8000
```

y abrir `http://localhost:8000`.
