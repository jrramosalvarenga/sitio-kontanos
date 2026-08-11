(function (root) {
  "use strict";

  var SERVICES = [
    {
      slug: "plataformas-tic",
      value: "Plataformas de TICs",
      icon: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm0 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Zm3-7.5h.01M7 16.5h.01',
      shortDesc: "Infraestructura tecnológica robusta y escalable para centralizar y conectar todas las áreas de tu empresa.",
      features: [
        "Diagnóstico de tu infraestructura actual",
        "Integración de sistemas y áreas de la empresa",
        "Escalabilidad pensada para tu crecimiento futuro",
        "Monitoreo y soporte continuo",
      ],
    },
    {
      slug: "administracion-negocio",
      value: "Administración de Negocio",
      icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h1m4 0h1M9 15h1m4 0h1',
      shortDesc: "Sistemas de gestión que ordenan procesos, inventarios, finanzas y equipos en un solo lugar.",
      features: [
        "Control de inventario en tiempo real",
        "Gestión financiera y reportes claros",
        "Administración de equipos y roles",
        "Automatización de procesos repetitivos",
      ],
    },
    {
      slug: "paginas-web",
      value: "Páginas Web",
      icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.4 2.4 3.6 5.4 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3Z',
      shortDesc: "Sitios web modernos, rápidos y responsivos que representan tu marca y convierten visitantes en clientes.",
      features: [
        "Diseño responsivo para todos los dispositivos",
        "Optimización de velocidad y SEO",
        "Formularios de contacto y captura de clientes",
        "Panel de administración de contenido (opcional)",
      ],
    },
    {
      slug: "soluciones-tecnologicas",
      value: "Soluciones Tecnológicas",
      icon: 'M9.5 4.5a3 3 0 1 1 5 2.24V9h2.5A2.5 2.5 0 0 1 19.5 11.5V14h-2.24a3 3 0 1 0 0 5H19.5v.5a2.5 2.5 0 0 1-2.5 2.5h-2.5v-2.24a3 3 0 1 0-5 0V22H7a2.5 2.5 0 0 1-2.5-2.5V17H2.26a3 3 0 1 1 0-5H4.5V9.5A2.5 2.5 0 0 1 7 7h2.5V4.74Z',
      shortDesc: "Diagnóstico y soluciones a la medida para los retos específicos de tu industria y operación.",
      features: [
        "Análisis de tus procesos actuales",
        "Propuesta de solución a la medida",
        "Implementación acompañada paso a paso",
        "Capacitación a tu equipo",
      ],
    },
    {
      slug: "diseno",
      value: "Diseño",
      icon: 'm12 19 7-7 3 3-7 7-3-3Zm0 0-4 1 1-4 9.5-9.5a2.12 2.12 0 0 1 3 3L12 19Zm-7 3h6',
      shortDesc: "Diseño de marca e interfaces (UI/UX) que comunican profesionalismo y facilitan la experiencia del usuario.",
      features: [
        "Identidad de marca: logo, colores y tipografía",
        "Diseño de interfaces UI/UX",
        "Prototipos interactivos antes de desarrollar",
        "Manual de marca para uso consistente",
      ],
    },
    {
      slug: "ecommerce",
      value: "E-commerce",
      icon: 'M3 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      shortDesc: "Tiendas en línea completas, con catálogo, pagos y logística integrados para vender todos los días.",
      features: [
        "Catálogo de productos ilimitado",
        "Pasarelas de pago integradas",
        "Gestión de envíos e inventario",
        "Panel de ventas y reportes",
      ],
    },
    {
      slug: "desarrollo-sistemas",
      value: "Desarrollo de Sistemas",
      icon: 'm8 9-4 3 4 3m8-6 4 3-4 3m-3-9-2 12',
      shortDesc: "Software a medida: desde módulos internos hasta plataformas completas, con arquitectura sólida y mantenible.",
      features: [
        "Arquitectura escalable y segura",
        "Integraciones con otros sistemas (APIs)",
        "Código documentado y mantenible",
        "Soporte y evolución continua",
      ],
    },
    {
      slug: "puntos-venta",
      value: "Puntos de Venta",
      icon: 'M3 9h18M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3m-18 0v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M7 15h4',
      shortDesc: "Sistemas POS confiables para agilizar el cobro, controlar inventario y llevar el pulso de tus sucursales.",
      features: [
        "Cobro rápido y con múltiples métodos de pago",
        "Control de inventario en tiempo real",
        "Reportes de ventas por sucursal",
        "Funciona sin internet y sincroniza después",
      ],
    },
    {
      slug: "conferencistas",
      value: "Conferencistas (Tecnología e IA)",
      icon: 'M4 4h16v11H4V4Zm5 15h6m-3-4v4M9 9l2.5 2.5L15 8',
      shortDesc: "Charlas, webinars y capacitaciones a cargo de especialistas en tecnología e Inteligencia Artificial para tu equipo o evento.",
      features: [
        "Charlas presenciales o virtuales",
        "Temas a la medida de tu industria",
        "Talleres prácticos de IA aplicada",
        "Material de apoyo para los asistentes",
      ],
    },
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = SERVICES;
  } else {
    root.SERVICES = SERVICES;
  }
})(typeof window !== "undefined" ? window : this);
