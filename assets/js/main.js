(function () {
  "use strict";

  // Hero background video: skip autoplay for users who prefer reduced motion
  // (they'll see the static poster frame instead).
  var heroVideo = document.getElementById("hero-video");
  if (heroVideo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.play().catch(function () {});
  }

  var header = document.getElementById("header");
  var brandLink = document.getElementById("brand-link");
  var desktopLinks = document.querySelectorAll("#desktop-links .nav-link");
  var menuBtn = document.getElementById("menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var iconOpen = document.getElementById("icon-open");
  var iconClose = document.getElementById("icon-close");

  function setHeaderScrolled(scrolled) {
    if (scrolled) {
      header.classList.add("bg-white", "shadow-md");
      header.classList.remove("bg-transparent");
      brandLink.classList.remove("text-white");
      brandLink.classList.add("text-ink");
      desktopLinks.forEach(function (link) {
        link.classList.remove("text-white/80");
      });
      menuBtn.classList.remove("text-white");
      menuBtn.classList.add("text-ink");
    } else {
      header.classList.remove("bg-white", "shadow-md");
      brandLink.classList.add("text-white");
      brandLink.classList.remove("text-ink");
      menuBtn.classList.add("text-white");
      menuBtn.classList.remove("text-ink");
    }
  }

  var scrollProgress = document.getElementById("scroll-progress");
  function onScroll() {
    setHeaderScrolled(window.scrollY > 24);
    if (scrollProgress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      scrollProgress.style.transform = "scaleX(" + ratio + ")";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // Highlight the nav link matching the section currently in view
  var sections = document.querySelectorAll("main section[id]");
  var allNavLinks = document.querySelectorAll(".nav-link");
  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          allNavLinks.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("text-primary", isActive);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  // Mobile menu toggle
  var menuOpen = false;
  function toggleMenu(open) {
    menuOpen = open;
    mobileMenu.classList.toggle("hidden", !open);
    iconOpen.classList.toggle("hidden", open);
    iconClose.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  menuBtn.addEventListener("click", function () {
    toggleMenu(!menuOpen);
  });
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      toggleMenu(false);
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal, .reveal-card");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Contact form
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("submit-btn");
  var submitLabel = document.getElementById("submit-label");

  function showFieldError(field, show) {
    var msg = form.querySelector('.error-msg[data-for="' + field.name + '"]');
    field.classList.toggle("border-red-500", show);
    field.classList.toggle("border-border", !show);
    if (msg) msg.classList.toggle("hidden", !show);
  }

  function validate() {
    var valid = true;
    var nombre = form.querySelector("#nombre");
    var email = form.querySelector("#email");
    var mensaje = form.querySelector("#mensaje");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre.value.trim()) {
      showFieldError(nombre, true);
      valid = false;
    } else {
      showFieldError(nombre, false);
    }

    if (!emailPattern.test(email.value.trim())) {
      showFieldError(email, true);
      valid = false;
    } else {
      showFieldError(email, false);
    }

    if (!mensaje.value.trim()) {
      showFieldError(mensaje, true);
      valid = false;
    } else {
      showFieldError(mensaje, false);
    }

    return valid;
  }

  function setStatus(type, text) {
    statusEl.textContent = text;
    statusEl.classList.remove("hidden", "bg-emerald-50", "text-emerald-700", "bg-red-50", "text-red-700");
    if (type === "success") {
      statusEl.classList.add("bg-emerald-50", "text-emerald-700");
    } else {
      statusEl.classList.add("bg-red-50", "text-red-700");
    }
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        setStatus("error", "Revisa los campos marcados antes de continuar.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-70", "cursor-not-allowed");
      submitLabel.textContent = "Enviando...";

      var formData = new FormData(form);

      fetch("https://formspree.io/f/mljrbryz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            setStatus("success", "Gracias, hemos recibido tu mensaje. Te contactaremos pronto.");
            form.reset();
          } else {
            setStatus("error", "No se pudo enviar el mensaje. Intenta nuevamente o escríbenos directo por correo.");
          }
        })
        .catch(function () {
          setStatus("error", "No se pudo enviar el mensaje. Intenta nuevamente o escríbenos directo por correo.");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
          submitLabel.textContent = "Enviar mensaje";
        });
    });
  }

  // Chat de servicios guiado
  var SERVICES = (window.SERVICES || []).concat([
    { slug: "otro", value: "Otro", shortDesc: "Cuéntanos tu necesidad específica y diseñamos contigo la solución adecuada para tu negocio.", features: [] },
  ]);

  function findService(value) {
    for (var i = 0; i < SERVICES.length; i++) {
      if (SERVICES[i].value === value) return SERVICES[i];
    }
    return null;
  }

  var NODES = {
    start: {
      bot: "¡Hola! 👋 Soy el asistente virtual de Kontanos. ¿En qué te puedo ayudar hoy?",
      options: [
        { label: "Quiero ver todos los servicios", next: "services" },
        { label: "No estoy seguro qué necesito", next: "qualify" },
      ],
    },
    services: {
      bot: "Estos son nuestros servicios. Elige el que más te interese:",
      options: SERVICES.map(function (s) {
        return { label: s.value, next: "detail:" + s.value };
      }).concat([{ label: "‹ Volver", next: "start" }]),
    },
    qualify: {
      bot: "Cuéntame un poco más sobre tu situación:",
      options: [
        { label: "Estoy iniciando un negocio o marca", next: "detail:Páginas Web" },
        { label: "Quiero vender en línea", next: "detail:E-commerce" },
        { label: "Necesito ordenar inventario, ventas o finanzas", next: "detail:Administración de Negocio" },
        { label: "Necesito un sistema o software a la medida", next: "detail:Desarrollo de Sistemas" },
        { label: "Quiero una charla o capacitación en tecnología/IA", next: "detail:Conferencistas (Tecnología e IA)" },
        { label: "Otro / no estoy seguro", next: "detail:Otro" },
        { label: "‹ Volver", next: "start" },
      ],
    },
  };

  function resolveNode(id) {
    if (id.indexOf("detail:") === 0) {
      var serviceName = id.slice("detail:".length);
      var svc = findService(serviceName);
      var desc = svc ? svc.shortDesc : "Cuéntanos tu necesidad específica y diseñamos contigo la solución adecuada.";
      return {
        bot: desc + " ¿Quieres solicitar información sobre este servicio?",
        options: [
          { label: "Sí, quiero información", action: "goToForm", service: serviceName },
          { label: "Hablar con un especialista (WhatsApp)", action: "openWhatsApp", service: serviceName },
          { label: "Ver otros servicios", next: "services" },
        ],
      };
    }
    return NODES[id];
  }

  var chatLauncher = document.getElementById("chat-launcher");
  var chatPanel = document.getElementById("chat-panel");
  var chatClose = document.getElementById("chat-close");
  var chatRestart = document.getElementById("chat-restart");
  var chatBody = document.getElementById("chat-body");
  var launcherIconOpen = document.getElementById("chat-launcher-icon-open");
  var launcherIconClose = document.getElementById("chat-launcher-icon-close");
  var chatIsOpen = false;
  var currentOptionsWrap = null;

  function scrollChatToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addBotBubble(text) {
    var el = document.createElement("div");
    el.className = "chat-bubble-bot";
    el.textContent = text;
    chatBody.appendChild(el);
    scrollChatToBottom();
  }

  function addUserBubble(text) {
    var el = document.createElement("div");
    el.className = "chat-bubble-user";
    el.textContent = text;
    chatBody.appendChild(el);
    scrollChatToBottom();
  }

  function clearOptions() {
    if (currentOptionsWrap && currentOptionsWrap.parentNode) {
      currentOptionsWrap.parentNode.removeChild(currentOptionsWrap);
    }
    currentOptionsWrap = null;
  }

  function addOptions(options) {
    var wrap = document.createElement("div");
    wrap.className = "flex flex-col gap-2";
    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chat-option";
      btn.textContent = opt.label;
      btn.addEventListener("click", function () {
        handleOptionClick(opt);
      });
      wrap.appendChild(btn);
    });
    chatBody.appendChild(wrap);
    currentOptionsWrap = wrap;
    scrollChatToBottom();
  }

  function showNode(id) {
    var node = resolveNode(id);
    if (!node) return;
    addBotBubble(node.bot);
    addOptions(node.options);
  }

  function handleOptionClick(opt) {
    clearOptions();
    addUserBubble(opt.label);
    setTimeout(function () {
      if (opt.action === "goToForm") {
        goToForm(opt.service);
        return;
      }
      if (opt.action === "openWhatsApp") {
        openWhatsApp(opt.service);
        return;
      }
      showNode(opt.next);
    }, 350);
  }

  function openWhatsApp(serviceName) {
    closeChat();
    var phone = "50495925617";
    var text = "Hola, me gustaría hablar con un especialista sobre el servicio de " + serviceName + ".";
    var url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
  }

  function selectServiceOption(serviceName) {
    var select = document.getElementById("servicio");
    if (!select) return;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].text === serviceName) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  function goToForm(serviceName) {
    closeChat();
    var contacto = document.getElementById("contacto");
    if (!contacto) {
      window.location.href = "/?servicio=" + encodeURIComponent(serviceName) + "#contacto";
      return;
    }
    selectServiceOption(serviceName);
    contacto.scrollIntoView({ behavior: "smooth" });
    var nombreInput = document.getElementById("nombre");
    if (nombreInput) {
      setTimeout(function () {
        nombreInput.focus({ preventScroll: true });
      }, 600);
    }
  }

  function resetChat(nodeId) {
    chatBody.innerHTML = "";
    currentOptionsWrap = null;
    showNode(nodeId || "start");
  }

  function openChat(nodeId) {
    chatIsOpen = true;
    chatPanel.classList.remove("hidden");
    chatLauncher.setAttribute("aria-expanded", "true");
    chatLauncher.setAttribute("aria-label", "Cerrar chat de servicios");
    launcherIconOpen.classList.add("hidden");
    launcherIconClose.classList.remove("hidden");
    if (nodeId) {
      resetChat(nodeId);
    } else if (!chatBody.children.length) {
      resetChat();
    }
  }

  function closeChat() {
    chatIsOpen = false;
    chatPanel.classList.add("hidden");
    chatLauncher.setAttribute("aria-expanded", "false");
    chatLauncher.setAttribute("aria-label", "Abrir chat de servicios");
    launcherIconOpen.classList.remove("hidden");
    launcherIconClose.classList.add("hidden");
  }

  chatLauncher.addEventListener("click", function () {
    if (chatIsOpen) {
      closeChat();
    } else {
      openChat();
    }
  });
  chatClose.addEventListener("click", closeChat);
  chatRestart.addEventListener("click", function () {
    resetChat();
  });

  document.querySelectorAll(".js-open-chat").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openChat();
    });
  });

  document.querySelectorAll(".js-open-chat-service").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var service = btn.getAttribute("data-service");
      openChat(service ? "detail:" + service : "start");
    });
  });

  // Si venimos de una subpágina de servicio con ?servicio=..., preselecciona el formulario.
  var urlServiceParam = new URLSearchParams(window.location.search).get("servicio");
  if (urlServiceParam) {
    selectServiceOption(urlServiceParam);
  }
})();
