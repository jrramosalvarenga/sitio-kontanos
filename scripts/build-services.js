const fs = require("fs");
const path = require("path");
const SERVICES = require("../assets/js/services-data.js");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "servicios");

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function head(title, description, canonicalUrl, jsonLd) {
  return `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${canonicalUrl}">

<meta property="og:type" content="website">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:site_name" content="Kontanos">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="https://kontanos.com/assets/img/og-share.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="https://kontanos.com/assets/img/og-share.png">
<meta property="og:locale" content="es_HN">
<meta name="theme-color" content="#1E293B">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
</head>`;
}

function header() {
  return `<!-- ===================== HEADER ===================== -->
<div id="scroll-progress" class="fixed inset-x-0 top-0 z-[60] h-1 origin-left scale-x-0 bg-accent transition-transform duration-150 ease-out" aria-hidden="true"></div>
<header id="header" class="fixed inset-x-0 top-0 z-50 bg-white shadow-md transition-all duration-300">
  <nav class="container-page flex h-20 items-center justify-between" aria-label="Navegación principal">
    <a href="/" class="flex items-center gap-2.5 font-heading text-xl font-bold text-ink" id="brand-link">
      <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark text-white">
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M12 2 20 6v7c0 1.5-.7 2.8-1.8 3.6l-4.8 4.2c-.8.7-2 .7-2.8 0l-4.8-4.2C4.7 15.8 4 14.5 4 13V6l8-4Zm1.4 18.6 4.8-4.2c.7-.6 1.2-1.5 1.4-2.4-1 .3-2.1.3-3.2-.2-.7.9-1.6 1.6-2.7 2l-.3.1-.3-.1c-1.1-.4-2-1.1-2.7-2-1.1.5-2.2.5-3.2.2.2.9.7 1.8 1.4 2.4l4.8 4.2c.2.2.6.2.8 0Z"/></svg>
      </span>
      Kontanos
    </a>

    <div class="hidden items-center gap-8 lg:flex" id="desktop-links">
      <a href="/#servicios" class="nav-link">Servicios</a>
      <a href="/#nosotros" class="nav-link">Nosotros</a>
      <a href="/#proceso" class="nav-link">Proceso</a>
      <a href="/#contacto" class="nav-link">Contacto</a>
    </div>

    <div class="flex items-center gap-3">
      <a href="/#contacto" class="js-open-chat hidden btn-primary sm:inline-flex !px-5 !py-2.5">Solicitar información</a>
      <button id="menu-btn" type="button" class="flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
        <svg id="icon-open" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        <svg id="icon-close" viewBox="0 0 24 24" class="hidden h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
    </div>
  </nav>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden lg:hidden" role="dialog" aria-modal="true" aria-label="Menú móvil">
    <div class="container-page flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 mx-4 mb-4">
      <a href="/#servicios" class="rounded-lg px-4 py-3 font-semibold text-ink hover:bg-surface">Servicios</a>
      <a href="/#nosotros" class="rounded-lg px-4 py-3 font-semibold text-ink hover:bg-surface">Nosotros</a>
      <a href="/#proceso" class="rounded-lg px-4 py-3 font-semibold text-ink hover:bg-surface">Proceso</a>
      <a href="/#contacto" class="rounded-lg px-4 py-3 font-semibold text-ink hover:bg-surface">Contacto</a>
      <a href="/#contacto" class="js-open-chat btn-primary mt-2 w-full">Solicitar información</a>
    </div>
  </div>
</header>`;
}

function footer() {
  return `<!-- ===================== FOOTER ===================== -->
<footer class="bg-ink py-16 text-white/70">
  <div class="container-page">
    <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
      <div class="lg:col-span-2">
        <a href="/" class="flex items-center gap-2.5 font-heading text-xl font-bold text-white">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
          </span>
          Kontanos
        </a>
        <p class="mt-4 max-w-sm text-sm leading-relaxed">
          Plataformas TIC, sistemas de gestión, páginas web, e-commerce, puntos de venta y desarrollo de software a la medida para hacer crecer tu negocio.
        </p>
        <div class="mt-6 flex gap-3">
          <a href="#" aria-label="Kontanos en LinkedIn" class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10 hover:text-white">
            <svg viewBox="0 0 24 24" class="h-4.5 w-4.5" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8h-4V9Z"/></svg>
          </a>
          <a href="#" aria-label="Kontanos en Instagram" class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10 hover:text-white">
            <svg viewBox="0 0 24 24" class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>
          </a>
          <a href="#" aria-label="Kontanos en WhatsApp" class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10 hover:text-white">
            <svg viewBox="0 0 24 24" class="h-4.5 w-4.5" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.36A10 10 0 1 0 12 2Zm0 18.2a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.08.8.82-3-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-white">Navegación</h4>
        <ul class="mt-4 space-y-3 text-sm">
          <li><a href="/#inicio" class="transition-colors hover:text-white">Inicio</a></li>
          <li><a href="/#servicios" class="transition-colors hover:text-white">Servicios</a></li>
          <li><a href="/#nosotros" class="transition-colors hover:text-white">Nosotros</a></li>
          <li><a href="/#proceso" class="transition-colors hover:text-white">Proceso</a></li>
          <li><a href="/#contacto" class="transition-colors hover:text-white">Contacto</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-heading text-sm font-bold uppercase tracking-wider text-white">Servicios</h4>
        <ul class="mt-4 space-y-3 text-sm">
          ${SERVICES.slice(0, 5)
            .map((s) => `<li><a href="/servicios/${s.slug}/" class="transition-colors hover:text-white">${escapeHtml(s.value)}</a></li>`)
            .join("\n          ")}
        </ul>
      </div>
    </div>

    <div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
      <p>&copy; <span id="year"></span> Kontanos. Todos los derechos reservados.</p>
      <p>Diseñado con enfoque en resultados.</p>
    </div>
  </div>
</footer>`;
}

function chatWidget() {
  return `<!-- ===================== CHAT DE SERVICIOS GUIADO ===================== -->
<button id="chat-launcher" type="button" class="chat-launcher" aria-haspopup="dialog" aria-expanded="false" aria-controls="chat-panel" aria-label="Abrir chat de servicios">
  <svg id="chat-launcher-icon-open" viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>
  <svg id="chat-launcher-icon-close" viewBox="0 0 24 24" class="hidden h-7 w-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
</button>

<div id="chat-panel" class="chat-panel hidden" role="dialog" aria-modal="false" aria-labelledby="chat-title">
  <div class="flex shrink-0 items-center justify-between gap-3 bg-gradient-to-br from-primary to-primary-dark px-5 py-4 text-white">
    <div>
      <p id="chat-title" class="font-heading text-sm font-bold">Asistente Kontanos</p>
      <p class="text-xs text-white/70">Te ayudamos a encontrar tu solución</p>
    </div>
    <button id="chat-close" type="button" class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white" aria-label="Cerrar chat">
      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
  </div>

  <div id="chat-body" class="flex-1 space-y-3 overflow-y-auto bg-surface p-4"></div>

  <div class="shrink-0 border-t border-border bg-white px-4 py-2.5 text-center">
    <button id="chat-restart" type="button" class="text-xs font-semibold text-ink-soft transition-colors hover:text-primary">Reiniciar conversación</button>
  </div>
</div>

<script src="/assets/js/services-data.js"></script>
<script src="/assets/js/main.js"></script>`;
}

function serviceIcon(service, sizeClass) {
  return `<svg viewBox="0 0 24 24" class="${sizeClass}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${service.icon}"/></svg>`;
}

function servicePage(service) {
  const title = `${service.value} | Kontanos`;
  const description = `${service.shortDesc} Servicio de Kontanos en Catacamas, Olancho, Honduras.`;
  const canonicalUrl = `https://kontanos.com/servicios/${service.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.value,
    name: service.value,
    description: service.shortDesc,
    url: canonicalUrl,
    areaServed: "HN",
    provider: {
      "@type": "ProfessionalService",
      name: "Kontanos",
      url: "https://kontanos.com/",
      telephone: "+50495925617",
    },
  };

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  const hasVideo = fs.existsSync(path.join(ROOT, "assets", "video", "servicios", service.slug + ".mp4"));
  const heroMedia = hasVideo
    ? `<video muted loop playsinline preload="auto" poster="/assets/img/servicios/${service.slug}-poster.webp" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover">
      <source src="/assets/video/servicios/${service.slug}.mp4" type="video/mp4">
    </video>
    <div class="pointer-events-none absolute inset-0 bg-black/40"></div>
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 to-transparent"></div>`
    : `<div class="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl"></div>`;

  return `<!DOCTYPE html>
<html lang="es">
${head(title, description, canonicalUrl, jsonLd)}
<body class="antialiased">

<a href="#contenido" class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded-lg focus:bg-primary focus:text-white focus:px-4 focus:py-2">Saltar al contenido principal</a>

${header()}

<main id="contenido">
  <!-- ===================== SERVICE HERO ===================== -->
  <section class="relative flex min-h-[70vh] items-center overflow-hidden bg-ink pt-20 pb-20">
    ${heroMedia}
    <div class="container-page relative">
      <a href="/#servicios" class="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 6 5 12l6 6M5 12h14"/></svg>
        Volver a servicios
      </a>
      <div class="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white">
        ${serviceIcon(service, "h-8 w-8")}
      </div>
      <h1 class="font-heading mt-6 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">${escapeHtml(service.value)}</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">${escapeHtml(service.shortDesc)}</p>
      <div class="mt-8 flex flex-col gap-4 sm:flex-row">
        <button type="button" class="js-open-chat-service btn-primary" data-service="${escapeHtml(service.value)}">
          Preguntar en el asistente
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
        <a href="/?servicio=${encodeURIComponent(service.value)}#contacto" class="btn-secondary">Solicitar información</a>
      </div>
    </div>
  </section>

  <!-- ===================== QUÉ INCLUYE ===================== -->
  <section class="bg-white py-20 lg:py-24">
    <div class="container-page grid gap-12 lg:grid-cols-2">
      <div class="reveal">
        <span class="section-eyebrow">Qué incluye</span>
        <h2 class="font-heading mt-5 text-2xl font-bold text-ink sm:text-3xl">Así trabajamos ${escapeHtml(service.value.toLowerCase())}</h2>
        <ul class="mt-8 space-y-4">
          ${service.features
            .map(
              (f) => `<li class="flex items-start gap-3">
            <svg viewBox="0 0 24 24" class="mt-0.5 h-6 w-6 shrink-0 text-primary" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>
            <span class="text-ink-soft">${escapeHtml(f)}</span>
          </li>`
            )
            .join("\n          ")}
        </ul>
      </div>

      <div class="reveal rounded-3xl border border-border bg-surface p-8 lg:p-10">
        <h3 class="font-heading text-xl font-bold text-ink">¿Listo para empezar?</h3>
        <p class="mt-3 text-ink-soft">Cuéntanos tu proyecto y te ayudamos a definir el alcance correcto para <strong class="text-ink">${escapeHtml(service.value)}</strong>, sin compromiso.</p>
        <div class="mt-6 flex flex-col gap-3">
          <a href="/?servicio=${encodeURIComponent(service.value)}#contacto" class="btn-primary w-full">Ir al formulario de contacto</a>
          <a href="https://wa.me/50495925617?text=${encodeURIComponent("Hola, me gustaría más información sobre " + service.value + ".")}" target="_blank" rel="noopener" class="btn-outline w-full">Escribir por WhatsApp</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== OTROS SERVICIOS ===================== -->
  <section class="bg-surface py-20 lg:py-24">
    <div class="container-page">
      <h2 class="font-heading text-2xl font-bold text-ink sm:text-3xl">Otros servicios</h2>
      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${otherServices
          .map(
            (s) => `<a href="/servicios/${s.slug}/" class="group service-card">
          <span class="service-icon">${serviceIcon(s, "h-7 w-7")}</span>
          <h3 class="font-heading text-lg font-bold text-ink">${escapeHtml(s.value)}</h3>
          <p class="text-sm leading-relaxed text-ink-soft">${escapeHtml(s.shortDesc)}</p>
        </a>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>
</main>

${footer()}

${chatWidget()}
</body>
</html>
`;
}

function hubPage() {
  const title = "Servicios | Kontanos";
  const description = "Explora los servicios de Kontanos: plataformas TIC, páginas web, e-commerce, puntos de venta, desarrollo de sistemas y más, en Catacamas, Honduras.";
  const canonicalUrl = "https://kontanos.com/servicios/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://kontanos.com/servicios/${s.slug}/`,
      name: s.value,
    })),
  };

  return `<!DOCTYPE html>
<html lang="es">
${head(title, description, canonicalUrl, jsonLd)}
<body class="antialiased">

<a href="#contenido" class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded-lg focus:bg-primary focus:text-white focus:px-4 focus:py-2">Saltar al contenido principal</a>

${header()}

<main id="contenido">
  <section class="relative overflow-hidden bg-ink pt-36 pb-20 lg:pt-44 lg:pb-24">
    <div class="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl"></div>
    <div class="container-page relative text-center">
      <span class="section-eyebrow !bg-white/10 !text-white">Lo que hacemos</span>
      <h1 class="font-heading mt-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Todos nuestros servicios</h1>
      <p class="mt-4 mx-auto max-w-2xl text-lg text-white/70">Cubrimos todo el ciclo tecnológico de tu empresa: desde la infraestructura hasta la experiencia de tus clientes.</p>
    </div>
  </section>

  <section class="bg-surface py-20 lg:py-24">
    <div class="container-page">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${SERVICES.map(
          (s) => `<a href="/servicios/${s.slug}/" class="group service-card">
          <span class="service-icon">${serviceIcon(s, "h-7 w-7")}</span>
          <h2 class="font-heading text-lg font-bold text-ink">${escapeHtml(s.value)}</h2>
          <p class="text-sm leading-relaxed text-ink-soft">${escapeHtml(s.shortDesc)}</p>
        </a>`
        ).join("\n        ")}
      </div>
    </div>
  </section>
</main>

${footer()}

${chatWidget()}
</body>
</html>
`;
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

fs.writeFileSync(path.join(OUT_DIR, "index.html"), hubPage());

for (const service of SERVICES) {
  const dir = path.join(OUT_DIR, service.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), servicePage(service));
}

console.log(`Generated ${SERVICES.length} service pages + hub in ${OUT_DIR}`);
