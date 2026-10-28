"use strict";

/* =========================================================
   WasabiTech — Main JavaScript
   Preserves the existing design and Supabase integration.
   ========================================================= */

/* -------------------- SUPABASE -------------------- */

const SUPABASE_URL = "https://vklrhqcueuflwxudppsl.supabase.co";
const SUPABASE_KEY = "sb_publishable_F-ICpD4OXE-JDdYqOmm-zA_50OYw_6I";

const supabaseClient =
    window.supabase && window.supabase.createClient
        ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
        : null;

/* -------------------- HELPERS -------------------- */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);

const formatPrice = value =>
    Number(value || 0).toLocaleString(
        language === "es" ? "es-PR" : "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }
    );

const normalize = value => String(value || "").trim().toLowerCase();

/* -------------------- STATE -------------------- */

let language = localStorage.getItem("wasabitech-language") || "en";

let computers = [];
let activeCategory = "";
let activeType = "";
let selectedCategory = "";
let selectedComputerId = null;
let editingComputerId = null;
let isDeveloperMode = false;
let currentUser = null;

/* -------------------- TRANSLATIONS -------------------- */

const translations = {
    en: {
        home: "Home",
        computers: "Computers",
        manage: "Manage",
        language: "ES",

        heroTitle: "Find the right computer for you",
        heroText: "Explore computers for every need and budget.",
        browseComputers: "Browse Computers",

        chooseCategory: "Choose a Category",
        basicTitle: "Basic",
        basicDescription: "Everyday computing and essential tasks.",
        businessTitle: "Business",
        businessDescription: "Productivity, work, and professional use.",
        professionalTitle: "Professional",
        professionalDescription: "High-performance systems for demanding work.",

        chooseDevice: "Choose a Device Type",
        chooseType: "Choose a Device",
        chooseTypeText: "First, choose whether you want a stationary or mobile computer.",

        stationary: "Stationary",
        stationaryDesc: "A computer designed to stay in one place.",
        mobile: "Mobile",
        mobileDesc: "A computer you can easily take with you.",

        desktop: "Desktop",
        desktopDesc: "A traditional desktop computer.",
        workstation: "Workstation",
        workstationDesc: "A powerful system for demanding professional tasks.",
        laptop: "Laptop",
        laptopDesc: "A portable computer for work and everyday use.",
        tablet: "Tablet",
        tabletDesc: "A compact touchscreen computer.",

        searchPlaceholder: "Search computers...",
        allBrands: "All Brands",
        allPrices: "All Prices",
        sortFeatured: "Featured",
        sortPriceLow: "Price: Low to High",
        sortPriceHigh: "Price: High to Low",
        sortName: "Name: A to Z",

        results: "Computers",
        noResults: "No computers found.",
        noResultsText: "Try changing your search or filters.",
        clearFilters: "Clear Filters",
        viewDetails: "View Details",
        specifications: "Specifications",
        brand: "Brand",
        price: "Price",
        type: "Type",
        category: "Category",
        description: "Description",
        close: "Close",

        loginTitle: "Developer Login",
        email: "Email",
        password: "Password",
        login: "Log In",
        logout: "Exit Developer Mode",
        addComputer: "Add Computer",
        editComputer: "Edit Computer",
        deleteComputer: "Delete",
        saveComputer: "Save Computer",
        cancel: "Cancel",
        computerName: "Computer Name",
        computerBrand: "Brand",
        computerPrice: "Price",
        computerCategory: "Category",
        computerType: "Device Type",
        computerImage: "Image URL",
        computerDescription: "Description",
        computerSpecs: "Specifications",
        requiredFields: "Please complete the required fields.",
        loginFailed: "Login failed. Check your email and password.",
        saved: "Computer saved successfully.",
        deleted: "Computer deleted.",
        deleteConfirm: "Are you sure you want to delete this computer?",
        loading: "Loading computers...",
        loadError: "Unable to load computers. Please try again.",
        connectionError: "Unable to connect to the database.",
        adminTitle: "Computer Management",
        noManageItems: "No computers to manage yet.",
        developerMode: "Developer Mode",
        imagePlaceholder: "https://example.com/image.jpg",
        descriptionPlaceholder: "Describe this computer...",
        specsPlaceholder: "Enter specifications...",
        allCategories: "All Categories",
        basic: "Basic",
        business: "Business",
        professional: "Professional",
        desktopType: "Desktop",
        laptopType: "Laptop",
        workstationType: "Workstation",
        tabletType: "Tablet"
    },

    es: {
        home: "Inicio",
        computers: "Computadoras",
        manage: "Administrar",
        language: "EN",

        heroTitle: "Encuentra la computadora ideal para ti",
        heroText: "Explora computadoras para cada necesidad y presupuesto.",
        browseComputers: "Ver Computadoras",

        chooseCategory: "Elige una Categoría",
        basicTitle: "Básica",
        basicDescription: "Computación diaria y tareas esenciales.",
        businessTitle: "Negocios",
        businessDescription: "Productividad, trabajo y uso profesional.",
        professionalTitle: "Profesional",
        professionalDescription: "Equipos de alto rendimiento para tareas exigentes.",

        chooseDevice: "Elige un Tipo de Dispositivo",
        chooseType: "Elige un Dispositivo",
        chooseTypeText: "Primero, elige si quieres una computadora fija o móvil.",

        stationary: "Fija",
        stationaryDesc: "Una computadora diseñada para permanecer en un lugar.",
        mobile: "Móvil",
        mobileDesc: "Una computadora que puedes llevar contigo fácilmente.",

        desktop: "Computadora de Escritorio",
        desktopDesc: "Una computadora de escritorio tradicional.",
        workstation: "Estación de Trabajo",
        workstationDesc: "Un equipo potente para tareas profesionales exigentes.",
        laptop: "Laptop",
        laptopDesc: "Una computadora portátil para trabajar y usar a diario.",
        tablet: "Tableta",
        tabletDesc: "Una computadora compacta con pantalla táctil.",

        searchPlaceholder: "Buscar computadoras...",
        allBrands: "Todas las Marcas",
        allPrices: "Todos los Precios",
        sortFeatured: "Destacados",
        sortPriceLow: "Precio: Menor a Mayor",
        sortPriceHigh: "Precio: Mayor a Menor",
        sortName: "Nombre: A a Z",

        results: "Computadoras",
        noResults: "No se encontraron computadoras.",
        noResultsText: "Intenta cambiar tu búsqueda o los filtros.",
        clearFilters: "Limpiar Filtros",
        viewDetails: "Ver Detalles",
        specifications: "Especificaciones",
        brand: "Marca",
        price: "Precio",
        type: "Tipo",
        category: "Categoría",
        description: "Descripción",
        close: "Cerrar",

        loginTitle: "Acceso de Desarrollador",
        email: "Correo Electrónico",
        password: "Contraseña",
        login: "Iniciar Sesión",
        logout: "Salir del Modo Desarrollador",
        addComputer: "Añadir Computadora",
        editComputer: "Editar Computadora",
        deleteComputer: "Eliminar",
        saveComputer: "Guardar Computadora",
        cancel: "Cancelar",
        computerName: "Nombre de la Computadora",
        computerBrand: "Marca",
        computerPrice: "Precio",
        computerCategory: "Categoría",
        computerType: "Tipo de Dispositivo",
        computerImage: "URL de Imagen",
        computerDescription: "Descripción",
        computerSpecs: "Especificaciones",
        requiredFields: "Completa los campos obligatorios.",
        loginFailed: "No se pudo iniciar sesión. Verifica tu correo y contraseña.",
        saved: "Computadora guardada correctamente.",
        deleted: "Computadora eliminada.",
        deleteConfirm: "¿Seguro que quieres eliminar esta computadora?",
        loading: "Cargando computadoras...",
        loadError: "No se pudieron cargar las computadoras. Inténtalo de nuevo.",
        connectionError: "No se pudo conectar con la base de datos.",
        adminTitle: "Administración de Computadoras",
        noManageItems: "Todavía no hay computadoras para administrar.",
        developerMode: "Modo Desarrollador",
        imagePlaceholder: "https://ejemplo.com/imagen.jpg",
        descriptionPlaceholder: "Describe esta computadora...",
        specsPlaceholder: "Introduce las especificaciones...",
        allCategories: "Todas las Categorías",
        basic: "Básica",
        business: "Negocios",
        professional: "Profesional",
        desktopType: "Computadora de Escritorio",
        laptopType: "Laptop",
        workstationType: "Estación de Trabajo",
        tabletType: "Tableta"
    }
};

const t = key =>
    translations[language]?.[key] ??
    translations.en[key] ??
    key;

/* -------------------- DEVICE TYPE LABELS -------------------- */

function typeLabel(type) {
    const labels = {
        Desktop: "desktop",
        Laptop: "laptop",
        Workstation: "workstation",
        Tablet: "tablet"
    };

    return t(labels[type] || type);
}

function categoryLabel(category) {
    const labels = {
        Basic: "basic",
        Business: "business",
        Professional: "professional"
    };

    return t(labels[category] || category);
}

/* -------------------- LANGUAGE -------------------- */

function setLanguage(nextLanguage) {
    language = nextLanguage === "es" ? "es" : "en";

    localStorage.setItem("wasabitech-language", language);
    document.documentElement.lang = language;

    $$("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        if (key && t(key)) element.textContent = t(key);
    });

    $$("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    $$("[data-i18n-title]").forEach(element => {
        element.title = t(element.dataset.i18nTitle);
    });

    ensureDeviceTypeOptions();
    updateFilterOptions();
    renderComputers();
    renderManageList();

    const dialog = $("#typeDialog");
    if (dialog?.open && selectedCategory) {
        openTypeDialog(selectedCategory);
    }
}

/* -------------------- DEVICE EDITOR OPTIONS -------------------- */

function ensureDeviceTypeOptions() {
    const select = $("#computerType");
    if (!select) return;

    const existing = new Set(
        Array.from(select.options).map(option => option.value)
    );

    const types = [
        ["Desktop", "desktopType"],
        ["Laptop", "laptopType"],
        ["Workstation", "workstationType"],
        ["Tablet", "tabletType"]
    ];

    types.forEach(([value, labelKey]) => {
        let option = Array.from(select.options).find(
            item => item.value === value
        );

        if (!option) {
            option = document.createElement("option");
            option.value = value;
            select.appendChild(option);
        }

        option.textContent = t(labelKey);
    });
}

/* -------------------- CATEGORY / TYPE DIALOG -------------------- */

function openTypeDialog(category) {
    selectedCategory = category;

    const dialog = $("#typeDialog");
    const title = $("#typeDialogTitle");
    const grid = $(".type-choice-grid", dialog);

    if (!dialog || !grid) return;

    if (title) {
        title.textContent =
            `${categoryLabel(category)} — ${t("chooseDevice")}`;
    }

    grid.innerHTML = `
        <button class="type-choice" type="button"
            data-computer-mode="Stationary">
            <span class="type-choice-icon" aria-hidden="true">S</span>
            <span class="type-choice-title">${escapeHTML(t("stationary"))}</span>
            <span class="type-choice-description">${escapeHTML(t("stationaryDesc"))}</span>
        </button>

        <button class="type-choice" type="button"
            data-computer-mode="Mobile">
            <span class="type-choice-icon" aria-hidden="true">M</span>
            <span class="type-choice-title">${escapeHTML(t("mobile"))}</span>
            <span class="type-choice-description">${escapeHTML(t("mobileDesc"))}</span>
        </button>
    `;

    if (!dialog.open) dialog.showModal();
}

function showDeviceChoices(mode) {
    const dialog = $("#typeDialog");
    const title = $("#typeDialogTitle");
    const grid = $(".type-choice-grid", dialog);

    if (!grid) return;

    const stationary = mode === "Stationary";

    if (title) {
        title.textContent =
            `${categoryLabel(selectedCategory)} — ${t("chooseType")}`;
    }

    const options = stationary
        ? [
            {
                value: "Desktop",
                label: "desktop",
                description: "desktopDesc",
                icon: "D"
            },
            {
                value: "Workstation",
                label: "workstation",
                description: "workstationDesc",
                icon: "W"
            }
        ]
        : [
            {
                value: "Laptop",
                label: "laptop",
                description: "laptopDesc",
                icon: "L"
            },
            {
                value: "Tablet",
                label: "tablet",
                description: "tabletDesc",
                icon: "T"
            }
        ];

    grid.innerHTML = options.map(option => `
        <button class="type-choice" type="button"
            data-computer-type="${option.value}">
            <span class="type-choice-icon" aria-hidden="true">${option.icon}</span>
            <span class="type-choice-title">${escapeHTML(t(option.label))}</span>
            <span class="type-choice-description">${escapeHTML(t(option.description))}</span>
        </button>
    `).join("");
}

function chooseType(type) {
    activeCategory = selectedCategory;
    activeType = type;

    const dialog = $("#typeDialog");
    if (dialog?.open) dialog.close();

    renderComputers();

    const results = $("#resultsTitle") || $("#computerGrid");
    results?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* -------------------- DATABASE -------------------- */

async function loadComputers() {
    if (!supabaseClient) {
        showToast(t("connectionError"));
        return;
    }

    const grid = $("#computerGrid");
    if (grid) {
        grid.innerHTML = `<p class="loading-message">${escapeHTML(t("loading"))}</p>`;
    }

    const { data, error } = await supabaseClient
        .from("computers")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("Error loading computers:", error);
        if (grid) {
            grid.innerHTML = `<p class="error-message">${escapeHTML(t("loadError"))}</p>`;
        }
        return;
    }

    computers = data || [];
    updateFilterOptions();
    renderComputers();
    renderManageList();
}

/* -------------------- FILTER OPTIONS -------------------- */

function updateFilterOptions() {
    const brandSelect = $("#brandFilter");
    if (brandSelect) {
        const selected = brandSelect.value;
        const brands = [...new Set(
            computers.map(pc => pc.brand).filter(Boolean)
        )].sort((a, b) => a.localeCompare(b));

        brandSelect.innerHTML =
            `<option value="">${escapeHTML(t("allBrands"))}</option>` +
            brands.map(brand =>
                `<option value="${escapeHTML(brand)}">${escapeHTML(brand)}</option>`
            ).join("");

        if (brands.includes(selected)) brandSelect.value = selected;
    }

    const priceSelect = $("#priceFilter");
    if (priceSelect) {
        const selected = priceSelect.value;
        priceSelect.innerHTML = `
            <option value="">${escapeHTML(t("allPrices"))}</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="2000+">$2,000+</option>
        `;
        priceSelect.value = selected;
    }

    const sortSelect = $("#sortFilter");
    if (sortSelect) {
        const selected = sortSelect.value;
        sortSelect.innerHTML = `
            <option value="featured">${escapeHTML(t("sortFeatured"))}</option>
            <option value="price-low">${escapeHTML(t("sortPriceLow"))}</option>
            <option value="price-high">${escapeHTML(t("sortPriceHigh"))}</option>
            <option value="name">${escapeHTML(t("sortName"))}</option>
        `;
        sortSelect.value = selected || "featured";
    }
}

/* -------------------- FILTERING -------------------- */

function getFilteredComputers() {
    const search = normalize($("#searchInput")?.value);
    const brand = $("#brandFilter")?.value || "";
    const priceRange = $("#priceFilter")?.value || "";
    const sort = $("#sortFilter")?.value || "featured";

    let filtered = computers.filter(pc => {
        const matchesSearch = !search || [
            pc.name,
            pc.brand,
            pc.description,
            pc.type,
            pc.category
        ].some(value => normalize(value).includes(search));

        const matchesCategory =
            !activeCategory || pc.category === activeCategory;

        const matchesType =
            !activeType || pc.type === activeType;

        const matchesBrand = !brand || pc.brand === brand;

        let matchesPrice = true;
        const price = Number(pc.price || 0);

        if (priceRange === "0-500") {
            matchesPrice = price < 500;
        } else if (priceRange === "500-1000") {
            matchesPrice = price >= 500 && price < 1000;
        } else if (priceRange === "1000-2000") {
            matchesPrice = price >= 1000 && price < 2000;
        } else if (priceRange === "2000+") {
            matchesPrice = price >= 2000;
        }

        return matchesSearch &&
            matchesCategory &&
            matchesType &&
            matchesBrand &&
            matchesPrice;
    });

    if (sort === "price-low") {
        filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price-high") {
        filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sort === "name") {
        filtered.sort((a, b) =>
            String(a.name || "").localeCompare(String(b.name || ""))
        );
    }

    return filtered;
}

/* -------------------- COMPUTER CARDS -------------------- */

function renderComputers() {
    const grid = $("#computerGrid");
    const emptyState = $("#emptyState");
    const resultsTitle = $("#resultsTitle");

    if (!grid) return;

    const filtered = getFilteredComputers();

    if (resultsTitle) {
        const parts = [];

        if (activeCategory) parts.push(categoryLabel(activeCategory));
        if (activeType) parts.push(typeLabel(activeType));

        resultsTitle.textContent =
            parts.length ? parts.join(" — ") : t("results");
    }

    grid.innerHTML = filtered.map(pc => {
        const image = pc.image_url || pc.image || "";
        const name = escapeHTML(pc.name || "Computer");
        const brand = escapeHTML(pc.brand || "");
        const description = escapeHTML(pc.description || "");
        const imageHTML = image
            ? `<img src="${escapeHTML(image)}" alt="${name}" loading="lazy">`
            : "";

        return `
            <article class="computer-card">
                <div class="computer-card-image">
                    ${imageHTML}
                </div>
                <div class="computer-card-content">
                    <p class="computer-brand">${brand}</p>
                    <h3>${name}</h3>
                    <p class="computer-description">${description}</p>
                    <div class="computer-card-meta">
                        <span class="computer-type">${escapeHTML(typeLabel(pc.type))}</span>
                        <span class="computer-price">${escapeHTML(formatPrice(pc.price))}</span>
                    </div>
                    <button class="view-details-btn" type="button"
                        data-computer-details="${escapeHTML(pc.id)}">
                        ${escapeHTML(t("viewDetails"))}
                    </button>
                </div>
            </article>
        `;
    }).join("");

    if (emptyState) {
        emptyState.hidden = filtered.length !== 0;
        emptyState.textContent = filtered.length
            ? ""
            : `${t("noResults")} ${t("noResultsText")}`;
    }

    updateActiveFilters();
}

function updateActiveFilters() {
    const container = $("#activeFilters");
    if (!container) return;

    const filters = [];

    if (activeCategory) filters.push(categoryLabel(activeCategory));
    if (activeType) filters.push(typeLabel(activeType));

    const search = $("#searchInput")?.value;
    if (search) filters.push(search);

    const brand = $("#brandFilter")?.value;
    if (brand) filters.push(brand);

    container.innerHTML = filters.map(filter =>
        `<span class="active-filter">${escapeHTML(filter)}</span>`
    ).join("");
}

/* -------------------- COMPUTER DETAILS -------------------- */

function showComputerDetails(id) {
    const pc = computers.find(item => String(item.id) === String(id));
    const dialog = $("#detailDialog");
    const content = $("#detailContent");

    if (!pc || !dialog || !content) return;

    const image = pc.image_url || pc.image || "";
    const specs = pc.specifications || pc.specs || "";

    content.innerHTML = `
        <div class="detail-layout">
            ${image ? `
                <div class="detail-image">
                    <img src="${escapeHTML(image)}"
                        alt="${escapeHTML(pc.name || "Computer")}">
                </div>
            ` : ""}

            <div class="detail-information">
                <h2>${escapeHTML(pc.name || "")}</h2>
                <p class="detail-price">${escapeHTML(formatPrice(pc.price))}</p>

                <p><strong>${escapeHTML(t("brand"))}:</strong>
                    ${escapeHTML(pc.brand || "—")}</p>

                <p><strong>${escapeHTML(t("category"))}:</strong>
                    ${escapeHTML(categoryLabel(pc.category || ""))}</p>

                <p><strong>${escapeHTML(t("type"))}:</strong>
                    ${escapeHTML(typeLabel(pc.type || ""))}</p>

                <h3>${escapeHTML(t("description"))}</h3>
                <p>${escapeHTML(pc.description || "—")}</p>

                <h3>${escapeHTML(t("specifications"))}</h3>
                <p>${escapeHTML(specs || "—")}</p>
            </div>
        </div>
    `;

    if (!dialog.open) dialog.showModal();
}

/* -------------------- DEVELOPER MODE -------------------- */

function showToast(message) {
    const toast = $("#toast");

    if (!toast) {
        console.log(message);
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function openLoginDialog() {
    const dialog = $("#loginDialog");
    if (dialog && !dialog.open) dialog.showModal();
}

async function loginDeveloper(event) {
    event?.preventDefault();

    const email = $("#adminEmail")?.value.trim();
    const password = $("#adminPassword")?.value;
    const errorElement = $("#loginError");

    if (errorElement) errorElement.textContent = "";

    if (!supabaseClient) {
        if (errorElement) errorElement.textContent = t("connectionError");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("Login error:", error);
        if (errorElement) errorElement.textContent = t("loginFailed");
        return;
    }

    currentUser = data.user;
    isDeveloperMode = true;

    const dialog = $("#loginDialog");
    if (dialog?.open) dialog.close();

    document.body.classList.add("developer-mode");

    const manageSection = $("#manage");
    if (manageSection) manageSection.hidden = false;

    renderManageList();
    showToast(t("developerMode"));
}

async function logoutDeveloper() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }

    currentUser = null;
    isDeveloperMode = false;

    document.body.classList.remove("developer-mode");

    const manageSection = $("#manage");
    if (manageSection) manageSection.hidden = true;

    showToast(t("logout"));
}

/* -------------------- COMPUTER MANAGEMENT -------------------- */

function renderManageList() {
    const list = $("#manageList");
    if (!list) return;

    if (!isDeveloperMode) {
        list.innerHTML = "";
        return;
    }

    if (!computers.length) {
        list.innerHTML = `<p>${escapeHTML(t("noManageItems"))}</p>`;
        return;
    }

    list.innerHTML = computers.map(pc => `
        <div class="manage-item">
            <div class="manage-item-info">
                <strong>${escapeHTML(pc.name || "")}</strong>
                <span>${escapeHTML(pc.brand || "")}</span>
                <span>${escapeHTML(categoryLabel(pc.category || ""))} — ${escapeHTML(typeLabel(pc.type || ""))}</span>
                <span>${escapeHTML(formatPrice(pc.price))}</span>
            </div>
            <div class="manage-item-actions">
                <button type="button" data-edit-computer="${escapeHTML(pc.id)}">
                    ${escapeHTML(t("editComputer"))}
                </button>
                <button type="button" data-delete-computer="${escapeHTML(pc.id)}">
                    ${escapeHTML(t("deleteComputer"))}
                </button>
            </div>
        </div>
    `).join("");
}

function openComputerForm(pc = null) {
    const form = $("#computerForm");
    if (!form) return;

    editingComputerId = pc ? pc.id : null;
    form.reset();

    ensureDeviceTypeOptions();

    const title = $("#computerFormTitle");
    if (title) {
        title.textContent = pc ? t("editComputer") : t("addComputer");
    }

    if (pc) {
        const fields = {
            computerName: pc.name,
            computerBrand: pc.brand,
            computerPrice: pc.price,
            computerCategory: pc.category,
            computerType: pc.type,
            computerImage: pc.image_url || pc.image,
            computerDescription: pc.description,
            computerSpecs: pc.specifications || pc.specs
        };

        Object.entries(fields).forEach(([id, value]) => {
            const element = $("#" + id);
            if (element && value != null) element.value = value;
        });
    }

    const dialog = $("#computerFormDialog");
    if (dialog && !dialog.open) dialog.showModal();
}

async function saveComputer(event) {
    event?.preventDefault();

    if (!supabaseClient || !isDeveloperMode) return;

    const name = $("#computerName")?.value.trim();
    const brand = $("#computerBrand")?.value.trim();
    const price = Number($("#computerPrice")?.value || 0);
    const category = $("#computerCategory")?.value;
    const type = $("#computerType")?.value;
    const image = $("#computerImage")?.value.trim();
    const description = $("#computerDescription")?.value.trim();
    const specs = $("#computerSpecs")?.value.trim();

    if (!name || !brand || !category || !type) {
        showToast(t("requiredFields"));
        return;
    }

    const payload = {
        name,
        brand,
        price,
        category,
        type,
        image_url: image || null,
        description: description || "",
        specifications: specs || ""
    };

    let result;

    if (editingComputerId !== null) {
        result = await supabaseClient
            .from("computers")
            .update(payload)
            .eq("id", editingComputerId);
    } else {
        result = await supabaseClient
            .from("computers")
            .insert([payload]);
    }

    if (result.error) {
        console.error("Save error:", result.error);
        showToast(result.error.message || t("loadError"));
        return;
    }

    const dialog = $("#computerFormDialog");
    if (dialog?.open) dialog.close();

    await loadComputers();
    showToast(t("saved"));
}

async function deleteComputer(id) {
    if (!isDeveloperMode || !supabaseClient) return;
    if (!window.confirm(t("deleteConfirm"))) return;

    const { error } = await supabaseClient
        .from("computers")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Delete error:", error);
        showToast(error.message || t("loadError"));
        return;
    }

    await loadComputers();
    showToast(t("deleted"));
}

/* -------------------- CLEAR FILTERS -------------------- */

function clearFilters() {
    activeCategory = "";
    activeType = "";
    selectedCategory = "";

    if ($("#searchInput")) $("#searchInput").value = "";
    if ($("#brandFilter")) $("#brandFilter").value = "";
    if ($("#priceFilter")) $("#priceFilter").value = "";
    if ($("#sortFilter")) $("#sortFilter").value = "featured";

    renderComputers();
}

/* -------------------- EVENTS -------------------- */

function setupEvents() {
    ensureDeviceTypeOptions();

    /* Category selection */
    $$(".category-card[data-category]").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            if (category === "Professional") {
                activeCategory = "Professional";
                activeType = "";
                selectedCategory = "";
                renderComputers();

                const results = $("#resultsTitle") || $("#computerGrid");
                results?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                return;
            }

            openTypeDialog(category);
        });
    });

    /* Delegated selection handler for dynamically created dialog buttons */
    $("#typeDialog")?.addEventListener("click", event => {
        const modeButton = event.target.closest("[data-computer-mode]");
        const typeButton = event.target.closest("[data-computer-type]");

        if (modeButton) {
            showDeviceChoices(modeButton.dataset.computerMode);
            return;
        }

        if (typeButton) {
            chooseType(typeButton.dataset.computerType);
        }
    });

    /* Close buttons for dialogs */
    $$("[data-close-dialog]").forEach(button => {
        button.addEventListener("click", () => {
            const dialog = button.closest("dialog");
            if (dialog?.open) dialog.close();
        });
    });

    /* Search and filters */
    ["searchInput", "brandFilter", "priceFilter", "sortFilter"].forEach(id => {
        const element = $("#" + id);
        if (!element) return;

        element.addEventListener(
            id === "searchInput" ? "input" : "change",
            renderComputers
        );
    });

    $("#clearFilters")?.addEventListener("click", clearFilters);

    /* Computer details */
    $("#computerGrid")?.addEventListener("click", event => {
        const button = event.target.closest("[data-computer-details]");
        if (button) showComputerDetails(button.dataset.computerDetails);
    });

    /* Language toggle */
    $("#languageToggle")?.addEventListener("click", () => {
        setLanguage(language === "en" ? "es" : "en");
    });

    /* Developer login */
    $("#loginForm")?.addEventListener("submit", loginDeveloper);

    /* Developer mode shortcut: Shift+W, then Shift+D */
    let shortcutStage = 0;

    document.addEventListener("keydown", event => {
        if (!event.shiftKey) {
            shortcutStage = 0;
            return;
        }

        const key = event.key.toLowerCase();

        if (shortcutStage === 0 && key === "w") {
            shortcutStage = 1;
            return;
        }

        if (shortcutStage === 1 && key === "d") {
            shortcutStage = 0;

            if (isDeveloperMode) {
                const manageSection = $("#manage");
                manageSection?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                openLoginDialog();
            }

            return;
        }

        shortcutStage = key === "w" ? 1 : 0;
    });

    /* Admin menu */
    $("#adminMenu")?.addEventListener("click", () => {
        if (!isDeveloperMode) {
            openLoginDialog();
        } else {
            $("#manage")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });

    $("#exitDeveloperMode")?.addEventListener("click", logoutDeveloper);

    /* Add computer */
    $("#addComputerButton")?.addEventListener("click", () => {
        openComputerForm();
    });

    $("#computerForm")?.addEventListener("submit", saveComputer);

    /* Manage-list actions */
    $("#manageList")?.addEventListener("click", event => {
        const editButton = event.target.closest("[data-edit-computer]");
        const deleteButton = event.target.closest("[data-delete-computer]");

        if (editButton) {
            const pc = computers.find(
                item => String(item.id) === editButton.dataset.editComputer
            );

            if (pc) openComputerForm(pc);
            return;
        }

        if (deleteButton) {
            deleteComputer(deleteButton.dataset.deleteComputer);
        }
    });
}

/* -------------------- INITIALIZATION -------------------- */

document.addEventListener("DOMContentLoaded", async () => {
    setupEvents();
    setLanguage(language);

    const manageSection = $("#manage");
    if (manageSection) manageSection.hidden = true;

    await loadComputers();

    /* Restore an existing Supabase session if one exists */
    if (supabaseClient) {
        const { data } = await supabaseClient.auth.getSession();

        if (data?.session?.user) {
            currentUser = data.session.user;
            isDeveloperMode = true;
            document.body.classList.add("developer-mode");

            if (manageSection) manageSection.hidden = false;
            renderManageList();
        }
    }
});
