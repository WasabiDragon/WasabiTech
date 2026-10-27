"use strict";

/* WasabiTech - catalog, language switching, and developer tools */

const translations = {
  en: {
    devTools:"Developer tools", addComputer:"Add Computer", modifyExisting:"Modify Existing", exitDev:"Exit Developer Mode",
    eyebrow:"YOUR NEXT PC STARTS HERE", heroTitle:"Find the computer that's right for you.",
    heroDescription:"Straightforward computer recommendations for school, work, and professional projects.",
    chooseCategory:"CHOOSE YOUR NEEDS", categoriesTitle:"What will you use your PC for?", basic:"Basic", business:"Business", professional:"Professional",
    basicDescription:"Everyday use, browsing, and school.", businessDescription:"Office work, multitasking, and productivity.", professionalDescription:"Programming, design, and 3D modeling.", explore:"Explore computers →",
    recommended:"OUR RECOMMENDATIONS", search:"Search computers", searchPlaceholder:"Search by name or hardware...", type:"Computer type", allTypes:"All types",
    desktop:"Desktop", laptop:"Laptop", noComputers:"No computers match your search yet.", backToCatalog:"Back to catalog",
    formIntro:"Fill in the details to add a recommendation to WasabiTech.", computerName:"Computer name *", namePlaceholder:"Example: Wasabi Office PC",
    imageUrl:"Image URL", imagePlaceholder:"https://example.com/computer.jpg", imagePreview:"Image preview will appear here.", description:"Description *",
    descriptionPlaceholder:"Explain who this computer is best for.", category:"Category *", cpu:"Processor (CPU)", ram:"Memory (RAM)", storage:"Storage", gpu:"Graphics (GPU)", os:"Operating system",
    screenSize:"Screen size", price:"Price (USD) *", cancel:"Cancel", saveComputer:"Save Computer", manageTitle:"Modify Existing Computers",
    manageIntro:"Edit computer details or remove recommendations from the catalog.", noManagedComputers:"No computers have been added yet.", footerText:"Helping you choose the right computer.",
    confirmDeleteTitle:"Remove this computer?", confirmDeleteText:"This action cannot be undone in this browser.", delete:"Delete", details:"View Details", edit:"Edit", remove:"Remove", noImage:"PC",
    results:"computer(s) found", allCategories:"All", saveSuccess:"Computer saved successfully.", deleteSuccess:"Computer removed.", invalidPrice:"Enter a valid price of zero or more.",
    invalidName:"Please enter a computer name.", invalidDescription:"Please enter a description.", imageError:"That image could not be loaded.", storageWarning:"Your browser could not save the changes. Storage may be full.",
    devEnabled:"Developer mode enabled.", devDisabled:"Developer mode disabled.", categoryBasic:"Basic", categoryBusiness:"Business", categoryProfessional:"Professional",
    specs:"Specifications", notProvided:"Not specified", priceLabel:"Price", computerType:"Type", languageLabel:"Language",
    chooseTypeTitle:"Choose your computer type", chooseTypeText:"Select a type to see matching recommendations.",
    desktopDescription:"A stationary PC for your desk, home, or office.", laptopDescription:"A portable computer for school, work, or travel.",
    loginTitle:"Developer Login", loginIntro:"Sign in to manage the WasabiTech computer catalog.",
    username:"Username", password:"Password", login:"Log In", loginError:"Incorrect username or password."
  },
  es: {
    devTools:"Herramientas de desarrollador", addComputer:"Añadir computadora", modifyExisting:"Modificar existentes", exitDev:"Salir del modo desarrollador",
    eyebrow:"TU PRÓXIMA PC COMIENZA AQUÍ", heroTitle:"Encuentra la computadora ideal para ti.",
    heroDescription:"Recomendaciones sencillas de computadoras para estudiar, trabajar y realizar proyectos profesionales.",
    chooseCategory:"ELIGE SEGÚN TUS NECESIDADES", categoriesTitle:"¿Para qué usarás tu PC?", basic:"Básica", business:"Negocios", professional:"Profesional",
    basicDescription:"Uso diario, navegación y estudios.", businessDescription:"Trabajo de oficina, multitarea y productividad.", professionalDescription:"Programación, diseño y modelado 3D.", explore:"Ver computadoras →",
    recommended:"NUESTRAS RECOMENDACIONES", search:"Buscar computadoras", searchPlaceholder:"Buscar por nombre o hardware...", type:"Tipo de computadora", allTypes:"Todos los tipos",
    desktop:"De escritorio", laptop:"Portátil", noComputers:"No hay computadoras que coincidan con tu búsqueda.", backToCatalog:"Volver al catálogo",
    formIntro:"Completa los detalles para añadir una recomendación a WasabiTech.", computerName:"Nombre de la computadora *", namePlaceholder:"Ejemplo: PC de oficina Wasabi",
    imageUrl:"URL de la imagen", imagePlaceholder:"https://ejemplo.com/computadora.jpg", imagePreview:"La vista previa aparecerá aquí.", description:"Descripción *",
    descriptionPlaceholder:"Explica para quién es ideal esta computadora.", category:"Categoría *", cpu:"Procesador (CPU)", ram:"Memoria (RAM)", storage:"Almacenamiento", gpu:"Gráficos (GPU)", os:"Sistema operativo",
    screenSize:"Tamaño de pantalla", price:"Precio (USD) *", cancel:"Cancelar", saveComputer:"Guardar computadora", manageTitle:"Modificar computadoras existentes",
    manageIntro:"Edita los detalles o elimina recomendaciones del catálogo.", noManagedComputers:"Todavía no se han añadido computadoras.", footerText:"Te ayudamos a elegir la computadora correcta.",
    confirmDeleteTitle:"¿Eliminar esta computadora?", confirmDeleteText:"Esta acción no se puede deshacer en este navegador.", delete:"Eliminar", details:"Ver detalles", edit:"Editar", remove:"Eliminar", noImage:"PC",
    results:"computadora(s) encontrada(s)", allCategories:"Todas", saveSuccess:"Computadora guardada correctamente.", deleteSuccess:"Computadora eliminada.", invalidPrice:"Introduce un precio válido de cero o más.",
    invalidName:"Introduce el nombre de la computadora.", invalidDescription:"Introduce una descripción.", imageError:"No se pudo cargar esa imagen.", storageWarning:"El navegador no pudo guardar los cambios. Puede que el almacenamiento esté lleno.",
    devEnabled:"Modo desarrollador activado.", devDisabled:"Modo desarrollador desactivado.", categoryBasic:"Básica", categoryBusiness:"Negocios", categoryProfessional:"Profesional",
    specs:"Especificaciones", notProvided:"No especificado", priceLabel:"Precio", computerType:"Tipo", languageLabel:"Idioma",
    chooseTypeTitle:"Elige el tipo de computadora", chooseTypeText:"Selecciona un tipo para ver las recomendaciones correspondientes.",
    desktopDescription:"Una PC fija para tu escritorio, hogar u oficina.", laptopDescription:"Una computadora portátil para estudiar, trabajar o viajar.",
    loginTitle:"Acceso de desarrollador", loginIntro:"Inicia sesión para administrar el catálogo de WasabiTech.",
    username:"Usuario", password:"Contraseña", login:"Iniciar sesión", loginError:"El usuario o la contraseña son incorrectos."
  }
};

/* Initial sample catalog */

const starterComputers = [
  {
    id:"sample-basic-laptop",
    name:"Everyday Student Laptop",
    image:"",
    description:"A practical starting point for browsing, school assignments, email, video calls, and everyday use.",
    category:"Basic", type:"Laptop", cpu:"Intel Core i3 or equivalent",
    ram:"8 GB", storage:"256 GB SSD", gpu:"Integrated graphics",
    os:"Windows 11", screen:"14 inches", price:399.99
  },
  {
    id:"sample-basic-desktop",
    name:"Everyday Home Desktop",
    image:"",
    description:"A simple desktop recommendation for home use, web browsing, schoolwork, and office applications.",
    category:"Basic", type:"Desktop", cpu:"AMD Ryzen 5 or equivalent",
    ram:"8 GB", storage:"512 GB SSD", gpu:"Integrated graphics",
    os:"Windows 11", screen:"", price:449.99
  },
  {
    id:"sample-business-laptop",
    name:"Business Productivity Laptop",
    image:"",
    description:"A balanced option for documents, spreadsheets, video meetings, multitasking, and working on the go.",
    category:"Business", type:"Laptop", cpu:"Intel Core i5 or equivalent",
    ram:"16 GB", storage:"512 GB SSD", gpu:"Integrated graphics",
    os:"Windows 11 Pro", screen:"15.6 inches", price:749.99
  },
  {
    id:"sample-business-desktop",
    name:"Office Productivity Desktop",
    image:"",
    description:"A dependable office computer for heavy document use, multitasking, and everyday business applications.",
    category:"Business", type:"Desktop", cpu:"AMD Ryzen 5 or equivalent",
    ram:"16 GB", storage:"1 TB SSD", gpu:"Integrated graphics",
    os:"Windows 11 Pro", screen:"", price:699.99
  },
  {
    id:"sample-pro-workstation",
    name:"Creative Workstation",
    image:"",
    description:"A higher-performance starting point for programming, graphic design, demanding creative applications, and 3D projects.",
    category:"Professional", type:"", cpu:"AMD Ryzen 7 or equivalent",
    ram:"32 GB", storage:"1 TB NVMe SSD", gpu:"Dedicated graphics card",
    os:"Windows 11 Pro", screen:"", price:1499.99
  }
];

const STORAGE_KEY = "wasabitech_catalog_v1";
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

let language = "en";
let selectedCategory = "Basic";
let developerMode = false;
let pendingDeleteId = null;
let computers = loadComputers();

function loadComputers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.warn("Could not read the WasabiTech catalog:", error);
  }

  return starterComputers.map(computer => ({ ...computer }));
}

function saveComputers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(computers));
    return true;
  } catch (error) {
    console.error(error);
    showToast(t("storageWarning"));
    return false;
  }
}

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function formatPrice(price) {
  return new Intl.NumberFormat(language === "es" ? "es-PR" : "en-US", {
    style: "currency",
    currency: "USD"
  }).format(Number(price) || 0);
}

function categoryLabel(category) {
  const key = {
    Basic: "categoryBasic",
    Business: "categoryBusiness",
    Professional: "categoryProfessional"
  }[category];

  return key ? t(key) : category;
}

function typeLabel(type) {
  return type === "Desktop" ? t("desktop") :
    type === "Laptop" ? t("laptop") : "";
}

function makeId() {
  return window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : `pc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(showToast.timeout);

  showToast.timeout = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

function safeImageUrl(value) {
  const input = String(value || "").trim();
  if (!input) return "";

  try {
    const url = new URL(input, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function imageMarkup(image, name) {
  const url = safeImageUrl(image);

  return url
    ? `<img class="computer-image" src="${escapeHTML(url)}" alt="${escapeHTML(name)}" loading="lazy">`
    : `<div class="image-fallback" aria-label="${escapeHTML(name)}">${escapeHTML(t("noImage"))}</div>`;
}

function specificationsMarkup(computer) {
  const specs = [
    [t("cpu"), computer.cpu],
    [t("ram"), computer.ram],
    [t("storage"), computer.storage],
    [t("gpu"), computer.gpu],
    [t("os"), computer.os],
    [t("screenSize"), computer.screen]
  ].filter(([, value]) => value && String(value).trim());

  return specs.length
    ? `<ul class="spec-list">${specs.map(([label, value]) =>
        `<li><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></li>`
      ).join("")}</ul>`
    : `<p class="muted-text">${escapeHTML(t("notProvided"))}</p>`;
}

/* Language */

function applyLanguage() {
  document.documentElement.lang = language;

  $$("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });

  $$("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  const languageSelect = $("#language-select");
  if (languageSelect) languageSelect.value = language;

  renderCatalog();
  renderManageList();
  updatePopupLanguage();

  if (!$("#form-page").classList.contains("hidden")) {
    updateComputerTypeField();
    $("#form-page-title").textContent =
      $("#computer-id").value ? t("edit") : t("addComputer");
  }
}

/* Catalog */

function renderCatalog() {
  const query = $("#search-input").value.trim().toLowerCase();
  const type = $("#type-filter").value;

  const names = {
    Basic: t("basic"),
    Business: t("business"),
    Professional: t("professional")
  };

  $("#catalog-title").textContent = names[selectedCategory] || selectedCategory;

  $("#catalog-subtitle").textContent =
    selectedCategory === "Basic" ? t("basicDescription") :
    selectedCategory === "Business" ? t("businessDescription") :
    t("professionalDescription");

  const typeFilter = selectedCategory === "Professional" ? "All" : type;

  const filtered = computers.filter(computer =>
    computer.category === selectedCategory &&
    [
      computer.name, computer.description, computer.cpu,
      computer.ram, computer.storage, computer.gpu, computer.os
    ].join(" ").toLowerCase().includes(query) &&
    (typeFilter === "All" || computer.type === typeFilter)
  );

  $("#results-count").textContent = `${filtered.length} ${t("results")}`;
  $("#empty-state").classList.toggle("hidden", filtered.length > 0);

  $("#computer-grid").innerHTML = filtered.map(computer => `
    <article class="computer-card">
      <div class="computer-image-wrap">
        ${imageMarkup(computer.image, computer.name)}
      </div>
      <div class="computer-card-body">
        <div class="card-badges">
          <span class="badge">${escapeHTML(categoryLabel(computer.category))}</span>
          ${computer.type
            ? `<span class="badge badge-purple">${escapeHTML(typeLabel(computer.type))}</span>`
            : ""}
        </div>
        <h3>${escapeHTML(computer.name)}</h3>
        <p class="computer-description">${escapeHTML(computer.description)}</p>
        ${specificationsMarkup(computer)}
        <div class="card-bottom">
          <span class="price">${escapeHTML(formatPrice(computer.price))}</span>
          <button class="primary-button details-button" data-id="${escapeHTML(computer.id)}">
            ${escapeHTML(t("details"))}
          </button>
        </div>
      </div>
    </article>
  `).join("");

  $("#type-filter").disabled = selectedCategory === "Professional";
  $("#type-filter").classList.toggle("hidden", selectedCategory === "Professional");

  $$(".category-card").forEach(card => {
    card.classList.toggle("active", card.dataset.category === selectedCategory);
  });

  attachImageFallbacks($("#computer-grid"));
}

function chooseCategory(category) {
  if (category === "Basic" || category === "Business") {
    openTypePopup(category);
    return;
  }

  selectedCategory = category;
  $("#type-filter").value = "All";
  renderCatalog();

  $("#catalog-list-section").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* Popups: developer login and computer type chooser */

function installWasabiPopups() {
  const style = document.createElement("style");

  style.textContent = `
    .wasabi-popup-overlay {
      position: fixed;
      inset: 0;
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(8,10,16,.84);
      backdrop-filter: blur(8px);
    }

    .wasabi-popup-overlay.hidden { display: none !important; }

    .wasabi-popup {
      box-sizing: border-box;
      width: min(620px,100%);
      padding: 28px;
      color: #f4f3fa;
      background: #20212d;
      border: 1px solid #65517f;
      border-radius: 22px;
      box-shadow: 0 25px 80px #0008;
    }

    .wasabi-popup h2 { margin: 0 0 10px; font-size: 1.8rem; }
    .wasabi-popup p { color: #c5c4d4; line-height: 1.6; }
    .wasabi-popup label { display: block; margin: 16px 0 7px; font-weight: 700; }

    .wasabi-popup input {
      box-sizing: border-box;
      width: 100%;
      padding: 13px;
      color: white;
      background: #171922;
      border: 1px solid #49485d;
      border-radius: 10px;
    }

    .wasabi-popup input:focus { outline: 2px solid #a5e65b; }

    .wasabi-popup-actions {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 22px;
    }

    .wasabi-popup button {
      padding: 12px 17px;
      color: white;
      background: #393044;
      border: 1px solid #76608e;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 700;
    }

    .wasabi-popup button:hover { filter: brightness(1.15); }

    .wasabi-popup .wasabi-primary {
      color: #17200e;
      background: #a5e65b;
      border-color: #a5e65b;
    }

    .wasabi-choice-grid {
      display: grid;
      grid-template-columns: repeat(2,minmax(0,1fr));
      gap: 16px;
      margin-top: 22px;
    }

    .wasabi-choice {
      min-height: 190px;
      padding: 22px !important;
      text-align: left;
      background: linear-gradient(145deg,#293c32,#22232e) !important;
      border: 1px solid #a5e65b !important;
      border-radius: 17px !important;
    }

    .wasabi-choice.laptop {
      background: linear-gradient(145deg,#392d4e,#22232e) !important;
      border-color: #b69aff !important;
    }

    .wasabi-choice .choice-icon {
      display: block;
      margin-bottom: 14px;
      font-size: 2.5rem;
    }

    .wasabi-choice strong {
      display: block;
      margin-bottom: 8px;
      font-size: 1.3rem;
    }

    .wasabi-choice span:last-child {
      display: block;
      color: #d0cede;
      font-weight: 400;
      line-height: 1.5;
    }

    @media (max-width:480px) {
      .wasabi-choice-grid { grid-template-columns: 1fr; }
      .wasabi-choice { min-height: 140px; }
    }
  `;

  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", `
    <div id="wasabi-login-overlay" class="wasabi-popup-overlay hidden">
      <section class="wasabi-popup" role="dialog" aria-modal="true"
               aria-labelledby="wasabi-login-title">
        <h2 id="wasabi-login-title">
          Developer <span style="color:#a5e65b">Login</span>
        </h2>
        <p id="wasabi-login-intro">Sign in to manage the WasabiTech computer catalog.</p>

        <form id="wasabi-login-form">
          <label id="wasabi-user-label" for="wasabi-dev-user">Username</label>
          <input id="wasabi-dev-user" autocomplete="username" required>

          <label id="wasabi-pass-label" for="wasabi-dev-pass">Password</label>
          <input id="wasabi-dev-pass" type="password" autocomplete="current-password" required>

          <p id="wasabi-login-error" role="alert"
             style="color:#ff8c9a;display:none"></p>

          <div class="wasabi-popup-actions">
            <button type="button" id="wasabi-login-cancel">Cancel</button>
            <button class="wasabi-primary" id="wasabi-login-submit" type="submit">Log In</button>
          </div>
        </form>
      </section>
    </div>

    <div id="wasabi-type-overlay" class="wasabi-popup-overlay hidden">
      <section class="wasabi-popup" role="dialog" aria-modal="true"
               aria-labelledby="wasabi-type-title">
        <h2 id="wasabi-type-title">Choose your computer type</h2>
        <p id="wasabi-type-description">Select a type to see matching recommendations.</p>

        <div class="wasabi-choice-grid">
          <button class="wasabi-choice" data-pc-type="Desktop">
            <span class="choice-icon">🖥️</span>
            <strong id="wasabi-desktop-title" style="color:#a5e65b">Desktop</strong>
            <span id="wasabi-desktop-description">A stationary PC for your desk, home, or office.</span>
          </button>

          <button class="wasabi-choice laptop" data-pc-type="Laptop">
            <span class="choice-icon">💻</span>
            <strong id="wasabi-laptop-title" style="color:#b69aff">Laptop</strong>
            <span id="wasabi-laptop-description">A portable computer for school, work, or travel.</span>
          </button>
        </div>

        <div class="wasabi-popup-actions">
          <button type="button" id="wasabi-type-cancel">Cancel</button>
        </div>
      </section>
    </div>
  `);

  $("#wasabi-login-cancel").addEventListener("click", closeLoginPopup);
  $("#wasabi-type-cancel").addEventListener("click", closeTypePopup);

  $("#wasabi-login-overlay").addEventListener("click", event => {
    if (event.target.id === "wasabi-login-overlay") closeLoginPopup();
  });

  $("#wasabi-type-overlay").addEventListener("click", event => {
    if (event.target.id === "wasabi-type-overlay") closeTypePopup();
  });

  $("#wasabi-login-form").addEventListener("submit", event => {
    event.preventDefault();

    const username = $("#wasabi-dev-user").value;
    const password = $("#wasabi-dev-pass").value;
    const error = $("#wasabi-login-error");

    if (username !== DEV_USERNAME || password !== DEV_PASSWORD) {
      error.textContent = t("loginError");
      error.style.display = "block";
      $("#wasabi-dev-pass").value = "";
      $("#wasabi-dev-pass").focus();
      return;
    }

    developerMode = true;
    $("#menu-toggle").classList.remove("hidden");
    closeLoginPopup();
    showToast(t("devEnabled"));
  });

  $$("#wasabi-type-overlay [data-pc-type]").forEach(button => {
    button.addEventListener("click", () => {
      $("#type-filter").value = button.dataset.pcType;
      closeTypePopup();
      renderCatalog();

      $("#catalog-list-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  updatePopupLanguage();
}

const DEV_USERNAME = "WasabiDragon53";
const DEV_PASSWORD = "Tech!53";

function updatePopupLanguage() {
  if (!$("#wasabi-login-title")) return;

  $("#wasabi-login-title").innerHTML = language === "es"
    ? 'Acceso de <span style="color:#a5e65b">desarrollador</span>'
    : 'Developer <span style="color:#a5e65b">Login</span>';

  $("#wasabi-login-intro").textContent = t("loginIntro");
  $("#wasabi-user-label").textContent = t("username");
  $("#wasabi-pass-label").textContent = t("password");
  $("#wasabi-login-cancel").textContent = t("cancel");
  $("#wasabi-login-submit").textContent = t("login");
  $("#wasabi-type-title").textContent = t("chooseTypeTitle");
  $("#wasabi-type-description").textContent = t("chooseTypeText");
  $("#wasabi-desktop-title").textContent = t("desktop");
  $("#wasabi-laptop-title").textContent = t("laptop");
  $("#wasabi-desktop-description").textContent = t("desktopDescription");
  $("#wasabi-laptop-description").textContent = t("laptopDescription");
  $("#wasabi-type-cancel").textContent = t("cancel");
}

function openLoginPopup() {
  $("#wasabi-login-error").style.display = "none";
  $("#wasabi-login-form").reset();
  $("#wasabi-login-overlay").classList.remove("hidden");
  $("#wasabi-dev-user").focus();
}

function closeLoginPopup() {
  $("#wasabi-login-overlay").classList.add("hidden");
}

function openTypePopup(category) {
  selectedCategory = category;
  $("#type-filter").value = "All";
  $("#wasabi-type-overlay").classList.remove("hidden");
  updatePopupLanguage();
}

function closeTypePopup() {
  $("#wasabi-type-overlay").classList.add("hidden");
}

/* Shortcut: press Shift, W, D in order within two seconds. */

let shortcutSequence = [];
let shortcutTimer = null;

document.addEventListener("keydown", event => {
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  if (event.target.matches("input,textarea,select")) return;

  const key = event.key.toLowerCase();

  if (key === "shift") {
    shortcutSequence = ["shift"];
  } else if (key === "w" && shortcutSequence[0] === "shift") {
    shortcutSequence.push("w");
  } else if (key === "d" && shortcutSequence.join(",") === "shift,w") {
    shortcutSequence.push("d");
    toggleDeveloperMode();
  } else if (key !== "shift") {
    shortcutSequence = [];
  }

  clearTimeout(shortcutTimer);
  shortcutTimer = setTimeout(() => shortcutSequence = [], 2000);
});

function toggleDeveloperMode() {
  if (developerMode) {
    developerMode = false;
    $("#menu-toggle").classList.add("hidden");
    closeMenu();
    showPage("catalog");
    showToast(t("devDisabled"));
  } else {
    openLoginPopup();
  }
}

function openMenu() {
  if (!developerMode) return;

  $("#dev-menu").classList.remove("hidden");
  $("#menu-overlay").classList.remove("hidden");
  $("#menu-toggle").setAttribute("aria-expanded", "true");
}

function closeMenu() {
  $("#dev-menu").classList.add("hidden");
  $("#menu-overlay").classList.add("hidden");
  $("#menu-toggle").setAttribute("aria-expanded", "false");
}

/* Page navigation */

function showPage(page) {
  const pages = {
    catalog: $("#catalog-page"),
    form: $("#form-page"),
    manage: $("#manage-page")
  };

  if (page !== "catalog" && !developerMode) {
    showToast(t("devTools"));
    return;
  }

  Object.entries(pages).forEach(([name, element]) => {
    element.classList.toggle("hidden", name !== page);
  });

  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (page === "manage") renderManageList();
}

function openAddForm() {
  $("#computer-form").reset();
  $("#computer-id").value = "";
  $("#form-page-title").textContent = t("addComputer");
  $("#image-preview").classList.add("hidden");
  $("#image-preview").removeAttribute("src");
  $("#image-preview-placeholder").classList.remove("hidden");
  updateComputerTypeField();
  showPage("form");
}

function openEditForm(id) {
  const computer = computers.find(item => item.id === id);
  if (!computer) return;

  $("#computer-id").value = computer.id;
  $("#computer-name").value = computer.name || "";
  $("#computer-image").value = computer.image || "";
  $("#computer-description").value = computer.description || "";
  $("#computer-category").value = computer.category || "Basic";
  $("#computer-type").value = computer.type || "Desktop";
  $("#computer-cpu").value = computer.cpu || "";
  $("#computer-ram").value = computer.ram || "";
  $("#computer-storage").value = computer.storage || "";
  $("#computer-gpu").value = computer.gpu || "";
  $("#computer-os").value = computer.os || "";
  $("#computer-screen").value = computer.screen || "";
  $("#computer-price").value = computer.price ?? "";

  $("#form-page-title").textContent = t("edit");
  updateComputerTypeField();
  updateImagePreview();
  showPage("form");
}

/* Computer details */

function openDetails(id) {
  const computer = computers.find(item => item.id === id);
  if (!computer) return;

  $("#detail-content").innerHTML = `
    <div class="computer-image-wrap">
      ${imageMarkup(computer.image, computer.name)}
    </div>
    <div class="card-badges">
      <span class="badge">${escapeHTML(categoryLabel(computer.category))}</span>
      ${computer.type
        ? `<span class="badge badge-purple">${escapeHTML(typeLabel(computer.type))}</span>`
        : ""}
    </div>
    <h2>${escapeHTML(computer.name)}</h2>
    <p>${escapeHTML(computer.description)}</p>
    <h3>${escapeHTML(t("specs"))}</h3>
    ${specificationsMarkup(computer)}
    <p class="price">${escapeHTML(formatPrice(computer.price))}</p>
  `;

  attachImageFallbacks($("#detail-content"));
  $("#detail-dialog").showModal();
}

function attachImageFallbacks(container) {
  if (!container) return;

  container.querySelectorAll("img.computer-image").forEach(img => {
    img.addEventListener("error", () => {
      const fallback = document.createElement("div");
      fallback.className = "image-fallback";
      fallback.textContent = t("imageError");
      img.replaceWith(fallback);
    }, { once: true });
  });
}

/* Add and edit computer form */

function updateComputerTypeField() {
  const professional = $("#computer-category").value === "Professional";

  $("#computer-type-field").classList.toggle("hidden", professional);
  $("#computer-type").required = !professional;

  if (professional) {
    $("#computer-type").value = "";
  } else if (!$("#computer-type").value) {
    $("#computer-type").value = "Desktop";
  }
}

function updateImagePreview() {
  const url = safeImageUrl($("#computer-image").value);
  const image = $("#image-preview");
  const placeholder = $("#image-preview-placeholder");

  if (!url) {
    image.classList.add("hidden");
    image.removeAttribute("src");
    placeholder.classList.remove("hidden");
    return;
  }

  image.onload = () => {
    image.classList.remove("hidden");
    placeholder.classList.add("hidden");
  };

  image.onerror = () => {
    image.classList.add("hidden");
    placeholder.textContent = t("imageError");
    placeholder.classList.remove("hidden");
  };

  image.src = url;
}

function readComputerForm() {
  const name = $("#computer-name").value.trim();
  const description = $("#computer-description").value.trim();
  const category = $("#computer-category").value;
  const type = category === "Professional" ? "" : $("#computer-type").value;
  const rawPrice = $("#computer-price").value;
  const price = Number(rawPrice);

  if (!name) {
    showToast(t("invalidName"));
    $("#computer-name").focus();
    return null;
  }

  if (!description) {
    showToast(t("invalidDescription"));
    $("#computer-description").focus();
    return null;
  }

  if (rawPrice.trim() === "" || !Number.isFinite(price) || price < 0 || price > 1000000) {
    showToast(t("invalidPrice"));
    $("#computer-price").focus();
    return null;
  }

  if (!["Basic", "Business", "Professional"].includes(category)) return null;
  if (category !== "Professional" && !["Desktop", "Laptop"].includes(type)) return null;

  const rawImage = $("#computer-image").value.trim();

  if (rawImage && !safeImageUrl(rawImage)) {
    showToast(t("imageError"));
    $("#computer-image").focus();
    return null;
  }

  return {
    id: $("#computer-id").value || makeId(),
    name,
    image: safeImageUrl(rawImage),
    description,
    category,
    type,
    cpu: $("#computer-cpu").value.trim(),
    ram: $("#computer-ram").value.trim(),
    storage: $("#computer-storage").value.trim(),
    gpu: $("#computer-gpu").value.trim(),
    os: $("#computer-os").value.trim(),
    screen: $("#computer-screen").value.trim(),
    price
  };
}

$("#computer-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!developerMode) return;

  const computer = readComputerForm();
  if (!computer) return;

  const index = computers.findIndex(item => item.id === computer.id);

  if (index >= 0) computers[index] = computer;
  else computers.unshift(computer);

  if (!saveComputers()) return;

  renderCatalog();
  renderManageList();
  showPage("catalog");
  showToast(t("saveSuccess"));
});

/* Modify existing computers */

function renderManageList() {
  if (!$("#manage-list")) return;

  const query = ($("#manage-search")?.value || "").trim().toLowerCase();

  const filtered = computers.filter(computer =>
    [
      computer.name,
      computer.description,
      computer.category,
      computer.type
    ].join(" ").toLowerCase().includes(query)
  );

  $("#manage-empty").classList.toggle("hidden", filtered.length > 0);

  $("#manage-list").innerHTML = filtered.map(computer => `
    <article class="manage-row">
      <div>
        <h3>${escapeHTML(computer.name)}</h3>
        <p>
          ${escapeHTML(categoryLabel(computer.category))}
          ${computer.type ? ` · ${escapeHTML(typeLabel(computer.type))}` : ""}
          · ${escapeHTML(formatPrice(computer.price))}
        </p>
      </div>
      <div class="manage-actions">
        <button class="small-button edit-button" data-id="${escapeHTML(computer.id)}">
          ${escapeHTML(t("edit"))}
        </button>
        <button class="danger-button delete-button" data-id="${escapeHTML(computer.id)}">
          ${escapeHTML(t("remove"))}
        </button>
      </div>
    </article>
  `).join("");
}

function requestDelete(id) {
  if (!developerMode) return;
  pendingDeleteId = id;
  $("#confirm-dialog").showModal();
}

function deleteComputer() {
  if (!developerMode || !pendingDeleteId) return;

  const originalLength = computers.length;
  computers = computers.filter(computer => computer.id !== pendingDeleteId);
  pendingDeleteId = null;

  if (computers.length === originalLength) return;
  if (!saveComputers()) return;

  $("#confirm-dialog").close();
  renderCatalog();
  renderManageList();
  showToast(t("deleteSuccess"));
}

/* Event listeners */

$("#language-select").addEventListener("change", event => {
  language = event.target.value === "es" ? "es" : "en";
  applyLanguage();
});

$("#menu-toggle").addEventListener("click", () => {
  $("#dev-menu").classList.contains("hidden") ? openMenu() : closeMenu();
});

$("#menu-overlay").addEventListener("click", closeMenu);
$("#add-page-button").addEventListener("click", openAddForm);
$("#manage-page-button").addEventListener("click", () => showPage("manage"));

$("#exit-dev-button").addEventListener("click", () => {
  developerMode = false;
  $("#menu-toggle").classList.add("hidden");
  closeMenu();
  showPage("catalog");
  showToast(t("devDisabled"));
});

$("#home-link").addEventListener("click", event => {
  event.preventDefault();
  showPage("catalog");
});

$$("[data-go-catalog]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    showPage("catalog");
  });
});

$$(".category-card").forEach(button => {
  button.addEventListener("click", () => chooseCategory(button.dataset.category));
});

$("#search-input").addEventListener("input", renderCatalog);
$("#type-filter").addEventListener("change", renderCatalog);
$("#manage-search").addEventListener("input", renderManageList);
$("#computer-category").addEventListener("change", updateComputerTypeField);
$("#computer-image").addEventListener("input", updateImagePreview);

$("#computer-grid").addEventListener("click", event => {
  const button = event.target.closest(".details-button");
  if (button) openDetails(button.dataset.id);
});

$("#close-detail").addEventListener("click", () => $("#detail-dialog").close());

$("#detail-dialog").addEventListener("click", event => {
  if (event.target === $("#detail-dialog")) $("#detail-dialog").close();
});

$("#manage-list").addEventListener("click", event => {
  const edit = event.target.closest(".edit-button");
  const remove = event.target.closest(".delete-button");

  if (edit) openEditForm(edit.dataset.id);
  if (remove) requestDelete(remove.dataset.id);
});

$("#cancel-delete").addEventListener("click", () => {
  pendingDeleteId = null;
  $("#confirm-dialog").close();
});

$("#confirm-delete").addEventListener("click", deleteComputer);

$("#confirm-dialog").addEventListener("click", event => {
  if (event.target === $("#confirm-dialog")) {
    pendingDeleteId = null;
    $("#confirm-dialog").close();
  }
});

/* Start */

installWasabiPopups();
applyLanguage();
renderCatalog();
renderManageList();
attachImageFallbacks(document);
