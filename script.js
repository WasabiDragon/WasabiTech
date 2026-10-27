
"use strict";

/*
  WasabiTech Version 5
  Static website for GitHub Pages.
  Catalog data is stored in the visitor's browser using Local Storage.

  IMPORTANT:
  Client-side credentials are not secure authentication.
*/

const STORAGE_KEY = "wasabitech_v5_computers";
const LANGUAGE_KEY = "wasabitech_v5_language";

// Demo-only credentials. Do not use for a public production admin system.
const ADMIN_USERNAME = "WasabiDragon53";
const ADMIN_PASSWORD = "Tech!53";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const translations = {
  en: {
    eyebrow: "YOUR NEXT COMPUTER STARTS HERE",
    heroTitle: "Find the right computer for you.",
    heroText: "Explore computers for everyday tasks, business, and professional workloads.",
    browse: "Browse Catalog",
    catalogEyebrow: "THE WASABITECH CATALOG",
    catalogTitle: "Explore Computers",
    searchLabel: "Search computers",
    searchPlaceholder: "Search computers...",
    all: "All Computers",
    basic: "Basic",
    business: "Business",
    professional: "Professional",
    allTypes: "All Types",
    stationary: "Stationary",
    portable: "Portable",
    noResults: "No computers found",
    trySearch: "Try another search or category.",
    footer: "Find your next computer with confidence.",
    loginTitle: "Developer Login",
    loginDescription: "Sign in to manage the computer catalog.",
    username: "Username",
    password: "Password",
    loginButton: "Log In",
    adminMenu: "Catalog Administration",
    addComputer: "＋ Add Computer",
    manageCatalog: "Manage Existing Computers",
    computerName: "Computer Name *",
    imageUrl: "Image URL",
    description: "Description",
    storage: "Storage *",
    operatingSystem: "Operating System *",
    screenSize: "Screen Size",
    price: "Price (USD) *",
    category: "Category *",
    type: "Type *",
    imagePreview: "Image preview will appear here",
    cancel: "Cancel",
    saveComputer: "Save Computer",
    manageTitle: "Manage Catalog",
    manageDescription: "Edit or remove computers from your catalog.",
    viewDetails: "View Details",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this computer?",
    loginError: "Incorrect username or password.",
    loginSuccess: "Developer mode activated.",
    logoutSuccess: "Logged out of developer mode.",
    saved: "Computer saved successfully.",
    deleted: "Computer deleted.",
    invalidImage: "Enter a valid HTTP or HTTPS image URL.",
    invalidPrice: "Enter a price greater than zero.",
    requiredFields: "Please complete all required fields.",
    noComputers: "Your catalog is empty.",
    results: "computers found",
    categoryLabel: "Category",
    typeLabel: "Type",
    cpu: "CPU",
    ram: "RAM",
    gpu: "GPU",
    os: "Operating System",
    screen: "Screen Size",
    storageLabel: "Storage",
    notSpecified: "Not specified",
    professionalType: "Professional",
    adminOnly: "Please log in to access administration.",
    imageError: "Image could not be loaded.",
    confirmLogout: "Logout",
    editComputer: "Edit Computer",
    imageAlt: "Computer product image",
    unknown: "Unknown"
  },
  es: {
    eyebrow: "TU PRÓXIMA COMPUTADORA COMIENZA AQUÍ",
    heroTitle: "Encuentra la computadora ideal para ti.",
    heroText: "Explora computadoras para uso diario, negocios y tareas profesionales.",
    browse: "Ver catálogo",
    catalogEyebrow: "EL CATÁLOGO WASABITECH",
    catalogTitle: "Explora computadoras",
    searchLabel: "Buscar computadoras",
    searchPlaceholder: "Buscar computadoras...",
    all: "Todas las computadoras",
    basic: "Básica",
    business: "Negocios",
    professional: "Profesional",
    allTypes: "Todos los tipos",
    stationary: "De escritorio",
    portable: "Portátil",
    noResults: "No se encontraron computadoras",
    trySearch: "Prueba otra búsqueda o categoría.",
    footer: "Encuentra tu próxima computadora con confianza.",
    loginTitle: "Acceso de desarrollador",
    loginDescription: "Inicia sesión para administrar el catálogo.",
    username: "Usuario",
    password: "Contraseña",
    loginButton: "Iniciar sesión",
    adminMenu: "Administración del catálogo",
    addComputer: "＋ Añadir computadora",
    manageCatalog: "Administrar computadoras",
    computerName: "Nombre de la computadora *",
    imageUrl: "URL de la imagen",
    description: "Descripción",
    storage: "Almacenamiento *",
    operatingSystem: "Sistema operativo *",
    screenSize: "Tamaño de pantalla",
    price: "Precio (USD) *",
    category: "Categoría *",
    type: "Tipo *",
    imagePreview: "La vista previa aparecerá aquí",
    cancel: "Cancelar",
    saveComputer: "Guardar computadora",
    manageTitle: "Administrar catálogo",
    manageDescription: "Edita o elimina computadoras del catálogo.",
    viewDetails: "Ver detalles",
    edit: "Editar",
    delete: "Eliminar",
    confirmDelete: "¿Seguro que quieres eliminar esta computadora?",
    loginError: "Usuario o contraseña incorrectos.",
    loginSuccess: "Modo desarrollador activado.",
    logoutSuccess: "Sesión de desarrollador cerrada.",
    saved: "Computadora guardada correctamente.",
    deleted: "Computadora eliminada.",
    invalidImage: "Introduce una URL de imagen HTTP o HTTPS válida.",
    invalidPrice: "Introduce un precio mayor que cero.",
    requiredFields: "Completa todos los campos obligatorios.",
    noComputers: "El catálogo está vacío.",
    results: "computadoras encontradas",
    categoryLabel: "Categoría",
    typeLabel: "Tipo",
    cpu: "Procesador",
    ram: "RAM",
    gpu: "Tarjeta gráfica",
    os: "Sistema operativo",
    screen: "Tamaño de pantalla",
    storageLabel: "Almacenamiento",
    notSpecified: "No especificado",
    professionalType: "Profesional",
    adminOnly: "Inicia sesión para administrar el catálogo.",
    imageError: "No se pudo cargar la imagen.",
    confirmLogout: "Cerrar sesión",
    editComputer: "Editar computadora",
    imageAlt: "Imagen del producto",
    unknown: "Desconocido"
  }
};

const sampleComputers = [
  {
    id: "sample-basic-desktop",
    name: "Everyday Desktop",
    image: "",
    description: "A practical computer for browsing, email, streaming, and everyday tasks.",
    cpu: "Intel Core i3",
    ram: "8GB",
    storage: "512GB SSD",
    gpu: "Integrated Graphics",
    os: "Windows 11 Home",
    screen: '24"',
    price: 499,
    category: "Basic",
    subcategory: "Stationary"
  },
  {
    id: "sample-basic-laptop",
    name: "Everyday Laptop",
    image: "",
    description: "A portable computer for schoolwork, web browsing, and everyday productivity.",
    cpu: "AMD Ryzen 5",
    ram: "8GB",
    storage: "512GB SSD",
    gpu: "Integrated Graphics",
    os: "Windows 11 Home",
    screen: '15.6"',
    price: 649,
    category: "Basic",
    subcategory: "Portable"
  },
  {
    id: "sample-business-desktop",
    name: "Business Desktop",
    image: "",
    description: "A dependable desktop for office applications, documents, and multitasking.",
    cpu: "Intel Core i5",
    ram: "16GB",
    storage: "1TB SSD",
    gpu: "Integrated Graphics",
    os: "Windows 11 Pro",
    screen: '27"',
    price: 999,
    category: "Business",
    subcategory: "Stationary"
  },
  {
    id: "sample-business-laptop",
    name: "Business Laptop",
    image: "",
    description: "A portable workstation for meetings, spreadsheets, and office productivity.",
    cpu: "Intel Core i5",
    ram: "16GB",
    storage: "512GB SSD",
    gpu: "Integrated Graphics",
    os: "Windows 11 Pro",
    screen: '14"',
    price: 899,
    category: "Business",
    subcategory: "Portable"
  },
  {
    id: "sample-professional",
    name: "Dell Precision 3680",
    image: "",
    description: "A powerful workstation for programming, graphic design, engineering, and demanding creative projects.",
    cpu: "Intel Core i7-14700",
    ram: "32GB",
    storage: "1TB SSD",
    gpu: "RTX 4070",
    os: "Windows 11 Pro",
    screen: '27"',
    price: 2199,
    category: "Professional",
    subcategory: ""
  }
];

let computers = loadComputers();
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) === "es" ? "es" : "en";
let selectedCategory = "All";
let selectedSubcategory = "All";
let isAdmin = false;
let keyboardSequence = [];
let toastTimer;

// ---------- General helpers ----------

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function safeImageURL(value) {
  const url = String(value || "").trim();

  if (!url) return "";

  try {
    const parsed = new URL(url, window.location.href);

    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.href;
    }
  } catch {
    return "";
  }

  return "";
}

function money(value) {
  return new Intl.NumberFormat(
    currentLanguage === "es" ? "es-PR" : "en-US",
    { style: "currency", currency: "USD" }
  ).format(Number(value) || 0);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function openDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog && !dialog.open) dialog.showModal();
}

function closeDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog?.open) dialog.close();
}

// ---------- Local Storage ----------

function loadComputers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.warn("WasabiTech could not read saved catalog data.", error);
  }

  return sampleComputers.map((computer) => ({ ...computer }));
}

function saveComputers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(computers));
    return true;
  } catch (error) {
    console.error("WasabiTech could not save the catalog.", error);
    showToast("Could not save data in this browser.");
    return false;
  }
}

// ---------- Language switching ----------

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  $("#language-select").value = currentLanguage;

  $$("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  $$("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  $$("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  renderCatalog();
  renderManageList();
  updateImagePreview();
}

$("#language-select").addEventListener("change", (event) => {
  currentLanguage = event.target.value === "es" ? "es" : "en";

  try {
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  } catch {
    // The language still works for this page even if storage is unavailable.
  }

  applyTranslations();
});

// ---------- Product rendering ----------

function getFilteredComputers() {
  const query = $("#search-input").value.trim().toLowerCase();

  return computers.filter((computer) => {
    const categoryMatch =
      selectedCategory === "All" || computer.category === selectedCategory;

    const subcategoryMatch =
      selectedCategory === "Professional" ||
      selectedSubcategory === "All" ||
      computer.subcategory === selectedSubcategory;

    const searchable = [
      computer.name,
      computer.description,
      computer.cpu,
      computer.ram,
      computer.storage,
      computer.gpu,
      computer.category,
      computer.subcategory
    ].join(" ").toLowerCase();

    return categoryMatch && subcategoryMatch && searchable.includes(query);
  });
}

function imageMarkup(computer, detail = false) {
  const url = safeImageURL(computer.image);
  const wrapperClass = detail ? "detail-image" : "product-image";

  if (!url) {
    return `<div class="${wrapperClass}">
      <div class="image-placeholder">WT</div>
    </div>`;
  }

  const alt = escapeHTML(computer.name || t("imageAlt"));

  return `<div class="${wrapperClass}">
    <img src="${escapeHTML(url)}"
      alt="${alt}"
      loading="lazy"
      referrerpolicy="no-referrer"
      onerror="this.style.display='none';this.parentElement.innerHTML='<div class=&quot;image-placeholder&quot;>WT</div>';">
  </div>`;
}

function renderCatalog() {
  const grid = $("#product-grid");
  const filtered = getFilteredComputers();

  grid.innerHTML = filtered.map((computer) => {
    const categoryLabel = t(computer.category.toLowerCase());
    const subcategoryLabel = computer.category === "Professional"
      ? t("professionalType")
      : t((computer.subcategory || "stationary").toLowerCase());

    return `
      <article class="product-card">
        ${imageMarkup(computer)}
        <div class="product-info">
          <div class="product-badges">
            <span class="product-badge">${escapeHTML(categoryLabel)}</span>
            <span class="product-badge purple">${escapeHTML(subcategoryLabel)}</span>
          </div>
          <h3>${escapeHTML(computer.name)}</h3>
          <p class="product-description">${escapeHTML(computer.description || "")}</p>
          <div class="product-bottom">
            <span class="product-price">${money(computer.price)}</span>
            <button class="primary-button" data-view="${escapeHTML(computer.id)}">
              ${escapeHTML(t("viewDetails"))}
            </button>
          </div>
        </div>
      </article>`;
  }).join("");

  $("#empty-state").hidden = filtered.length > 0;
  $("#results-count").textContent = `${filtered.length} ${t("results")}`;
}

$("#search-input").addEventListener("input", renderCatalog);

$("#category-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;
  selectedSubcategory = "All";

  $$("#category-tabs [data-category]").forEach((tab) => {
    tab.classList.toggle("active", tab === button);
  });

  const showSubcategories =
    selectedCategory === "Basic" || selectedCategory === "Business";

  $("#subcategory-filters").hidden = !showSubcategories;

  $$("[data-subcategory]").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.subcategory === "All");
  });

  renderCatalog();
});

$("#subcategory-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-subcategory]");
  if (!button) return;

  selectedSubcategory = button.dataset.subcategory;

  $$("[data-subcategory]").forEach((chip) => {
    chip.classList.toggle("active", chip === button);
  });

  renderCatalog();
});

$("#product-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) showComputerDetails(button.dataset.view);
});

$("#home-link").addEventListener("click", (event) => {
  event.preventDefault();

  selectedCategory = "All";
  selectedSubcategory = "All";
  $("#search-input").value = "";

  $$("#category-tabs [data-category]").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === "All");
  });

  $("#subcategory-filters").hidden = true;
  renderCatalog();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function showComputerDetails(id) {
  const computer = computers.find((item) => item.id === id);
  if (!computer) return;

  const specs = [
    [t("cpu"), computer.cpu],
    [t("ram"), computer.ram],
    [t("storageLabel"), computer.storage],
    [t("gpu"), computer.gpu],
    [t("os"), computer.os],
    [t("screen"), computer.screen],
    [t("categoryLabel"), t(computer.category.toLowerCase())],
    ...(computer.category !== "Professional"
      ? [[t("typeLabel"), t((computer.subcategory || "stationary").toLowerCase())]]
      : [])
  ];

  $("#details-content").innerHTML = `
    ${imageMarkup(computer, true)}
    <p class="eyebrow">WASABITECH</p>
    <h2>${escapeHTML(computer.name)}</h2>
    <p class="detail-description">${escapeHTML(computer.description || "")}</p>
    <div class="detail-price">${money(computer.price)}</div>
    <div class="spec-list">
      ${specs.map(([label, value]) => `
        <div class="spec-item">
          <span>${escapeHTML(label)}</span>
          <strong>${escapeHTML(value || t("notSpecified"))}</strong>
        </div>`).join("")}
    </div>`;

  openDialog("details-dialog");
}

// ---------- Dialog close buttons ----------

$$("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.dataset.close));
});

$$("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

// ---------- Developer mode ----------

function setAdminMode(enabled) {
  isAdmin = enabled;

  $("#menu-toggle").hidden = !enabled;
  $("#logout-button").hidden = !enabled;
  $("#developer-login").hidden = enabled;

  if (!enabled) closeAdminMenu();
}

$("#developer-login").addEventListener("click", () => {
  $("#login-error").textContent = "";
  openDialog("login-dialog");
});

$("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = $("#username").value;
  const password = $("#password").value;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    $("#login-error").textContent = t("loginError");
    return;
  }

  setAdminMode(true);
  $("#login-form").reset();
  closeDialog("login-dialog");
  showToast(t("loginSuccess"));
});

$("#logout-button").addEventListener("click", () => {
  setAdminMode(false);
  showToast(t("logoutSuccess"));
});

function handleDeveloperSequence(event) {
  if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;

  // Expected sequence: Shift, then W, then D.
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const now = Date.now();

  keyboardSequence = keyboardSequence.filter((entry) => now - entry.time < 3000);
  keyboardSequence.push({ key, time: now });
  keyboardSequence = keyboardSequence.slice(-3);

  const sequence = keyboardSequence.map((entry) => entry.key).join(",");

  if (sequence === "Shift,w,d") {
    keyboardSequence = [];

    if (!isAdmin) {
      $("#login-error").textContent = "";
      openDialog("login-dialog");
    }
  }
}

document.addEventListener("keydown", handleDeveloperSequence);

// ---------- Admin menu ----------

function openAdminMenu() {
  if (!isAdmin) {
    showToast(t("adminOnly"));
    return;
  }

  $("#admin-menu").hidden = false;
  $("#menu-backdrop").hidden = false;
  document.body.classList.add("menu-open");
}

function closeAdminMenu() {
  $("#admin-menu").hidden = true;
  $("#menu-backdrop").hidden = true;
  document.body.classList.remove("menu-open");
}

$("#menu-toggle").addEventListener("click", openAdminMenu);
$("#menu-close").addEventListener("click", closeAdminMenu);
$("#menu-backdrop").addEventListener("click", closeAdminMenu);

$("#add-computer-toggle").addEventListener("click", () => {
  $("#admin-category-links").hidden = !$("#admin-category-links").hidden;
});

$("#admin-category-links").addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-category]");
  if (!button) return;

  const category = button.dataset.adminCategory;
  closeAdminMenu();
  openComputerEditor(null, category);
});

$("#manage-catalog-button").addEventListener("click", () => {
  closeAdminMenu();
  renderManageList();
  openDialog("manage-dialog");
});

// ---------- Add/edit computers ----------

function openComputerEditor(id = null, defaultCategory = "Basic") {
  if (!isAdmin) {
    showToast(t("adminOnly"));
    return;
  }

  $("#computer-form").reset();
  $("#computer-form-error").textContent = "";
  $("#computer-id").value = "";

  const computer = id
    ? computers.find((item) => item.id === id)
    : null;

  if (id && !computer) return;

  $("#editor-title").textContent = computer ? t("editComputer") : t("addComputer");

  $("#computer-id").value = computer?.id || "";
  $("#computer-name").value = computer?.name || "";
  $("#computer-image").value = computer?.image || "";
  $("#computer-description").value = computer?.description || "";
  $("#computer-cpu").value = computer?.cpu || "";
  $("#computer-ram").value = computer?.ram || "";
  $("#computer-storage").value = computer?.storage || "";
  $("#computer-gpu").value = computer?.gpu || "";
  $("#computer-os").value = computer?.os || "";
  $("#computer-screen").value = computer?.screen || "";
  $("#computer-price").value = computer?.price ?? "";
  $("#computer-category").value = computer?.category || defaultCategory;
  $("#computer-subcategory").value = computer?.subcategory || "Stationary";

  updateSubcategoryField();
  updateImagePreview();
  openDialog("computer-dialog");
}

$("#computer-category").addEventListener("change", updateSubcategoryField);

function updateSubcategoryField() {
  const category = $("#computer-category").value;
  const professional = category === "Professional";

  $("#computer-subcategory-field").hidden = professional;
  $("#computer-subcategory").required = !professional;
}

$("#computer-image").addEventListener("input", updateImagePreview);

function updateImagePreview() {
  const container = $("#image-preview");
  const rawURL = $("#computer-image").value.trim();
  const url = safeImageURL(rawURL);

  if (!rawURL) {
    container.textContent = t("imagePreview");
    return;
  }

  if (!url) {
    container.textContent = t("invalidImage");
    return;
  }

  container.innerHTML = "";

  const img = document.createElement("img");
  img.src = url;
  img.alt = t("imageAlt");

  img.onerror = () => {
    container.textContent = t("imageError");
  };

  container.appendChild(img);
}

$("#computer-form").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isAdmin) {
    showToast(t("adminOnly"));
    return;
  }

  const name = $("#computer-name").value.trim();
  const imageRaw = $("#computer-image").value.trim();
  const image = safeImageURL(imageRaw);
  const description = $("#computer-description").value.trim();
  const cpu = $("#computer-cpu").value.trim();
  const ram = $("#computer-ram").value.trim();
  const storage = $("#computer-storage").value.trim();
  const gpu = $("#computer-gpu").value.trim();
  const os = $("#computer-os").value.trim();
  const screen = $("#computer-screen").value.trim();
  const price = Number($("#computer-price").value);
  const category = $("#computer-category").value;
  const subcategory = category === "Professional"
    ? ""
    : $("#computer-subcategory").value;

  if (imageRaw && !image) {
    $("#computer-form-error").textContent = t("invalidImage");
    return;
  }

  if (!name || !category || !cpu || !ram || !storage || !os) {
    $("#computer-form-error").textContent = t("requiredFields");
    return;
  }

  if (!Number.isFinite(price) || price <= 0) {
    $("#computer-form-error").textContent = t("invalidPrice");
    return;
  }

  const id = $("#computer-id").value || (
    window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `computer-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );

  const computer = {
    id,
    name,
    image,
    description,
    cpu,
    ram,
    storage,
    gpu,
    os,
    screen,
    price,
    category,
    subcategory
  };

  const existingIndex = computers.findIndex((item) => item.id === id);

  if (existingIndex >= 0) {
    computers[existingIndex] = computer;
  } else {
    computers.push(computer);
  }

  if (!saveComputers()) return;

  closeDialog("computer-dialog");
  renderCatalog();
  renderManageList();
  showToast(t("saved"));
});

// ---------- Manage, edit, and delete ----------

function renderManageList() {
  const list = $("#manage-list");
  if (!list) return;

  if (computers.length === 0) {
    list.textContent = t("noComputers");
    return;
  }

  list.innerHTML = computers.map((computer) => `
    <div class="manage-item">
      <div>
        <h3>${escapeHTML(computer.name)}</h3>
        <p>${escapeHTML(t(computer.category.toLowerCase()))} · ${money(computer.price)}</p>
      </div>
      <div class="manage-actions">
        <button class="secondary-button" data-edit="${escapeHTML(computer.id)}">${escapeHTML(t("edit"))}</button>
        <button class="danger-button" data-delete="${escapeHTML(computer.id)}">${escapeHTML(t("delete"))}</button>
      </div>
    </div>`).join("");
}

$("#manage-list").addEventListener("click", (event) => {
  if (!isAdmin) {
    showToast(t("adminOnly"));
    return;
  }

  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");

  if (editButton) {
    const id = editButton.dataset.edit;
    closeDialog("manage-dialog");
    openComputerEditor(id);
    return;
  }

  if (deleteButton) {
    const id = deleteButton.dataset.delete;

    if (!window.confirm(t("confirmDelete"))) return;

    const previousComputers = computers;
    computers = computers.filter((computer) => computer.id !== id);

    if (!saveComputers()) {
      computers = previousComputers;
      return;
    }

    renderCatalog();
    renderManageList();
    showToast(t("deleted"));
  }
});

// ---------- Initial setup ----------

function initialize() {
  applyTranslations();

  $("#category-tabs [data-category='All']").classList.add("active");
  $("#subcategory-filters").hidden = true;
  $("#admin-menu").hidden = true;
  $("#menu-backdrop").hidden = true;
  $("#computer-subcategory-field").hidden = false;

  renderCatalog();
}

initialize();
