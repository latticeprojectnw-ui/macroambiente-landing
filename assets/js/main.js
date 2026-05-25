const riskItems = [
  {
    icon: "fa-solid fa-droplet",
    title: "Humedad, residuos e infraestructura",
    text: "Condiciones externas que favorecen vectores y elevan el riesgo sanitario si no se controlan con criterio preventivo."
  },
  {
    icon: "fa-solid fa-people-arrows",
    title: "Tránsito de personas y operación diaria",
    text: "Mientras mayor circulación, mayor exposición a ingreso, dispersión y reincidencia de focos sanitarios."
  },
  {
    icon: "fa-solid fa-clipboard-check",
    title: "Fiscalizaciones, auditorías y exigencias sanitarias",
    text: "Hoy no basta con intervenir: cada acción debe dejar evidencia clara, trazable y útil frente a revisiones sanitarias, auditorías internas y requerimientos operativos."
  },
  {
    icon: "fa-solid fa-biohazard",
    title: "Vectores, enfermedades y contaminación cruzada",
    text: "Controlamos focos que pueden transportar microorganismos, comprometer superficies críticas y afectar la seguridad sanitaria de personas, productos e instalaciones."
  }
];

const serviceItems = [
  {
    icon: "fa-solid fa-bug",
    title: "Desinsectación",
    text: "Intervenciones orientadas a reducir infestación, proteger operación y sostener estándares sanitarios.",
    bullets: [
      "Control técnico según contexto",
      "Aplicación con criterio preventivo",
      "Enfoque operativo y documentable"
    ]
  },
  {
    icon: "fa-solid fa-shield-virus",
    title: "Desratización",
    text: "Control de riesgo crítico para instalaciones con exposición operativa, sanitaria o reputacional.",
    bullets: [
      "Inspección de puntos vulnerables",
      "Barreras de control y seguimiento",
      "Lectura del entorno y reincidencia"
    ]
  },
  {
    icon: "fa-solid fa-spray-can-sparkles",
    title: "Sanitización",
    text: "Refuerzo de condiciones higiénicas para contextos donde la percepción de limpieza también importa.",
    bullets: [
      "Soporte a higiene operativa",
      "Complemento útil para continuidad",
      "Aplicación clara y trazable"
    ]
  },
  {
    icon: "fa-solid fa-diagram-project",
    title: "Manejo Integrado de Plagas",
    text: "Prevención, monitoreo, control y mejora continua para reducir reincidencias y sostener ambientes operativamente seguros.",
    bullets: [
      "Visión de sistema, no solo reacción",
      "Menor fragilidad operativa",
      "Eco Friendly"
    ]
  },
  {
    icon: "fa-solid fa-dove",
    title: "Control de aves",
    text: "Mitigación de focos, residuos y deterioro visual en instalaciones con exigencia de imagen o higiene.",
    bullets: [
      "Intervención según infraestructura",
      "Reducción de impacto visible",
      "Mejor percepción del entorno"
    ]
  }
];

const timelineItems = [
  {
    title: "Inspección y lectura del entorno",
    text: "Se identifican riesgos, puntos críticos, exposición operativa y necesidades de control."
  },
  {
    title: "Definición técnica de intervención",
    text: "Se selecciona el servicio o combinación correcta según contexto, reincidencia y exigencia del cliente."
  },
  {
    title: "Ejecución y control",
    text: "Se aplica la intervención con foco en efectividad, seguridad y continuidad operativa."
  },
  {
    title: "Respaldo y seguimiento",
    text: "Se entrega soporte documental y se deja base para control continuo o próximas acciones."
  }
];

const clientItems = [
  ["GeoSupport", "./assets/clientes/geosupport.png"],
  ["Finning CAT", "./assets/clientes/finning-cat.png"],
  ["LAPLACE Educación Superior", "./assets/clientes/laplace.png"],
  ["Cabañas Palmeira San Felipe", "./assets/clientes/cabanas-palmeira.png"],
  ["Siglo Verde", "./assets/clientes/siglo-verde.png"],
  ["CENCOMEX", "./assets/clientes/cencomex.png"],
  ["Royal Canin", "./assets/clientes/royal-canin.png"],
  ["Lucas Bar", "./assets/clientes/lucas-bar.png"]
];

function mountCards(targetId, items, mapper) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = items.map(mapper).join("");
}

mountCards(
  "risk-grid",
  riskItems,
  (item) => `
    <article class="risk-card reveal">
      <div class="risk-icon"><i class="${item.icon}" aria-hidden="true"></i></div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `
);

mountCards(
  "service-track",
  [...serviceItems, ...serviceItems],
  (item) => `
    <article class="service-card">
      <div class="service-icon"><i class="${item.icon}" aria-hidden="true"></i></div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <ul>
        ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
      </ul>
    </article>
  `
);

mountCards(
  "timeline",
  timelineItems,
  (item, index) => `
    <article class="timeline-step reveal">
      <div class="step-index">${String(index + 1).padStart(2, "0")}</div>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `
);

mountCards(
  "client-track",
  [...clientItems, ...clientItems],
  ([name, src]) => `
    <div class="client-logo-card">
      <img src="${src}" alt="${name}" />
    </div>
  `
);

document.querySelectorAll(".site-nav a, .logo-container").forEach((link) => {
  link.addEventListener("click", (event) => {
    const selector = link.getAttribute("href");
    if (!selector || !selector.startsWith("#")) return;

    const target = document.querySelector(selector);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealNodes = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setCounterFinal(counter) {
  const prefix = counter.dataset.prefix || "";
  const suffix = counter.dataset.suffix || "";
  counter.textContent = prefix + Number(counter.dataset.target).toLocaleString("es-CL") + suffix;
}

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
  counters.forEach(setCounterFinal);
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target || 0);
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(target * eased);
          counter.textContent = prefix + value.toLocaleString("es-CL") + suffix;

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}
