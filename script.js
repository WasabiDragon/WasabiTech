
(() => {
  "use strict";

  // =========================================================
  // WasabiTech - Catalog, Supabase, language, and admin tools
  // =========================================================

  const SUPABASE_URL = "https://vklrhqcueuflwxudppsl.supabase.co";
  const SUPABASE_KEY = "sb_publishable_F-ICpD4OXE-JDdYqOmm-zA_50OYw_6I";
  const TABLE = "computers";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const state = {
    computers: [],
    language: localStorage.getItem("wasabitech-language") || "en",
    selectedCategory: "Basic",
    selectedType: "",
    typeStep: "mobility",
    admin: false,
    editingId: null,
    shortcutStage: 0,
    shortcutTimer: null
  };

  const translations = {
    en: {
      home: "Home",
      computers: "Computers",
      computerCatalog: "Computer Catalog",
      catalogDescription: "Find the right computer for your needs.",
      basic: "Basic",
      business: "Business",
      professional: "Professional",
      basicDescription: "Computers for everyday use.",
      businessDescription: "Computers for work and productivity.",
      professionalDescription: "High-performance computers for demanding tasks.",
      searchLabel: "Search computers",
      searchPlaceholder: "Search by name, brand, or specifications...",
      brand: "Brand",
      allBrands: "All brands",
      category: "Category",
      allCategories: "All categories",
      deviceType: "Device type",
      allTypes: "All types",
      desktop: "Desktop",
      workstation: "Workstation",
      laptop: "Laptop",
      tablet: "Tablet",
      stationary: "Stationary",
      mobile: "Mobile",
      sortBy: "Sort by",
      recommended: "Recommended",
      priceLowHigh: "Price: low to high",
      priceHighLow: "Price: high to low",
      nameAZ: "Name: A–Z",
      availableComputers: "Available Computers",
      clearFilters: "Clear filters",
      noComputers: "No computers match your search.",
      chooseCategory: "Choose a category",
      chooseCategoryDescription: "What will you use your computer for?",
      chooseDevice: "Choose your device",
      chooseDeviceDescription: "Choose how you want to use your computer.",
      chooseDeviceType: "Choose a device type",
      chooseDeviceTypeDescription: "Select the type of computer you want.",
      developerLogin: "Developer Login",
      email: "Email",
      password: "Password",
      login: "Log in",
      manageComputers: "Manage Computers",
      addComputer: "Add computer",
      logout: "Log out",
      computerInformation: "Computer Information",
      computerName: "Name",
      price: "Price",
      cpu: "CPU",
      ram: "RAM",
      storage: "Storage",
      gpu: "GPU",
      operatingSystem: "Operating system",
      screen: "Screen",
      imageUrl: "Image URL",
      description: "Description",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      viewDetails: "View details",
      noDescription: "No description available.",
      loading: "Loading computers...",
      loadError: "Could not load computers. Please refresh the page.",
      loginError: "Login failed. Check your email and password.",
      loginSuccess: "Login successful.",
      saveError: "Could not save the computer.",
      saveSuccess: "Computer saved successfully.",
      deleteConfirm: "Are you sure you want to delete this computer?",
      deleteError: "Could not delete the computer.",
      deleteSuccess: "Computer deleted.",
      logoutError: "Could not log out.",
      noAdminPermission: "Your account does not have permission to manage computers.",
      noResults: "No computers found.",
      professionalTitle: "Professional Computers"
    },
    es: {
      home: "Inicio",
      computers: "Computadoras",
      computerCatalog: "Catálogo de computadoras",
      catalogDescription: "Encuentra la computadora ideal para ti.",
      basic: "Básica",
      business: "Negocios",
      professional: "Profesional",
      basicDescription: "Computadoras para el uso diario.",
      businessDescription: "Computadoras para el trabajo y la productividad.",
      professionalDescription: "Computadoras de alto rendimiento para tareas exigentes.",
      searchLabel: "Buscar computadoras",
      searchPlaceholder: "Buscar por nombre, marca o especificaciones...",
      brand: "Marca",
      allBrands: "Todas las marcas",
      category: "Categoría",
      allCategories: "Todas las categorías",
      deviceType: "Tipo de dispositivo",
      allTypes: "Todos los tipos",
      desktop: "Escritorio",
      workstation: "Estación de trabajo",
      laptop: "Portátil",
      tablet: "Tableta",
      stationary: "Estacionaria",
      mobile: "Móvil",
      sortBy: "Ordenar por",
      recommended: "Recomendado",
      priceLowHigh: "Precio: menor a mayor",
      priceHighLow: "Precio: mayor a menor",
      nameAZ: "Nombre: A–Z",
      availableComputers: "Computadoras disponibles",
      clearFilters: "Limpiar filtros",
      noComputers: "Ninguna computadora coincide con tu búsqueda.",
      chooseCategory: "Elige una categoría",
      chooseCategoryDescription: "¿Para qué utilizarás tu computadora?",
      chooseDevice: "Elige tu dispositivo",
      chooseDeviceDescription: "Elige cómo deseas utilizar tu computadora.",
      chooseDeviceType: "Elige el tipo de dispositivo",
      chooseDeviceTypeDescription: "Selecciona el tipo de computadora que deseas.",
      developerLogin: "Acceso de desarrollador",
      email: "Correo electrónico",
      password: "Contraseña",
      login: "Iniciar sesión",
      manageComputers: "Administrar computadoras",
      addComputer: "Añadir computadora",
      logout: "Cerrar sesión",
      computerInformation: "Información de la computadora",
      computerName: "Nombre",
      price: "Precio",
      cpu: "Procesador",
      ram: "Memoria RAM",
      storage: "Almacenamiento",
      gpu: "Tarjeta gráfica",
      operatingSystem: "Sistema operativo",
      screen: "Pantalla",
      imageUrl: "URL de imagen",
      description: "Descripción",
      save: "Guardar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Eliminar",
      viewDetails: "Ver detalles",
      noDescription: "No hay una descripción disponible.",
      loading: "Cargando computadoras...",
      loadError: "No se pudieron cargar las computadoras. Actualiza la página.",
      loginError: "No se pudo iniciar sesión. Verifica el correo y la contraseña.",
      loginSuccess: "Sesión iniciada correctamente.",
      saveError: "No se pudo guardar la computadora.",
      saveSuccess: "Computadora guardada correctamente.",
      deleteConfirm: "¿Seguro que deseas eliminar esta computadora?",
      deleteError: "No se pudo eliminar la computadora.",
      deleteSuccess: "Computadora eliminada.",
      logoutError: "No se pudo cerrar la sesión.",
      noAdminPermission: "Tu cuenta no tiene permiso para administrar computadoras.",
      noResults: "No se encontraron computadoras.",
      professionalTitle: "Computadoras profesionales"
    }
  };

  const t = (key) => translations[state.language]?.[key] || translations.en[key] || key;

  function notify(message) {
    window.alert(message);
  }

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function formatPrice(price) {
    const amount = Number(price);
    if (!Number.isFinite(amount)) return "Price unavailable";

    return new Intl.NumberFormat(
      state.language === "es" ? "es-PR" : "en-US",
      { style: "currency", currency: "USD" }
    ).format(amount);
  }

  function typeLabel(type) {
    const keys = {
      Desktop: "desktop",
      Workstation: "workstation",
      Laptop: "laptop",
      Tablet: "tablet"
    };

    return t(keys[type]) || type || "";
  }

  function categoryLabel(category) {
    const keys = {
      Basic: "basic",
      Business: "business",
      Professional: "professional"
    };

    return t(keys[category]) || category || "";
  }

  function showDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog) dialog.hidden = false;
  }

  function hideDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog) dialog.hidden = true;
  }

  // ---------------------------------------------------------
  // Language
  // ---------------------------------------------------------

  function updateLanguage() {
    document.documentElement.lang = state.language;

    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const translated = t(key);
      if (translated) element.textContent = translated;
    });

    $$("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    const languageButton = $("#languageToggle");
    if (languageButton) {
      languageButton.textContent = state.language === "en" ? "ES" : "EN";
      languageButton.setAttribute(
        "aria-label",
        state.language === "en" ? "Cambiar a español" : "Switch to English"
      );
    }

    renderComputers();
    renderManagementList();
  }

  $("#languageToggle")?.addEventListener("click", () => {
    state.language = state.language === "en" ? "es" : "en";
    localStorage.setItem("wasabitech-language", state.language);
    updateLanguage();
  });

  // ---------------------------------------------------------
  // Category and device selection
  // ---------------------------------------------------------

  function openCategory(category) {
    state.selectedCategory = category;
    state.selectedType = "";

    if (category === "Professional") {
      hideDialog("categoryDialog");
      hideDialog("typeDialog");
      applyCategory(category);
      return;
    }

    showDialog("typeDialog");
    state.typeStep = "mobility";
    renderTypeOptions();
  }

  function applyCategory(category) {
    state.selectedCategory = category;

    const categoryFilter = $("#categoryFilter");
    if (categoryFilter) {
      categoryFilter.value = category;
      categoryFilter.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const typeFilter = $("#typeFilter");
    if (typeFilter) typeFilter.value = "";

    state.selectedType = "";
    hideDialog("categoryDialog");
    hideDialog("typeDialog");
    renderComputers();

    $(".catalog-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderTypeOptions() {
    const title = $("#typeDialogTitle");
    const description = $("#typeDialogDescription");
    const options = $("#typeDialogOptions");

    if (!options) return;

    if (state.typeStep === "mobility") {
      if (title) title.textContent = t("chooseDevice");
      if (description) description.textContent = t("chooseDeviceDescription");

      options.innerHTML = `
        <button type="button" data-mobility="Stationary">${escapeHTML(t("stationary"))}</button>
        <button type="button" data-mobility="Mobile">${escapeHTML(t("mobile"))}</button>
      `;
      return;
    }

    if (title) title.textContent = t("chooseDeviceType");
    if (description) description.textContent = t("chooseDeviceTypeDescription");

    const deviceTypes = state.selectedType === "Stationary"
      ? ["Desktop", "Workstation"]
      : ["Laptop", "Tablet"];

    options.innerHTML = `
      <button type="button" data-final-type="${deviceTypes[0]}">${escapeHTML(typeLabel(deviceTypes[0]))}</button>
      <button type="button" data-final-type="${deviceTypes[1]}">${escapeHTML(typeLabel(deviceTypes[1]))}</button>
      <button type="button" data-type-back="true">${escapeHTML(state.language === "es" ? "Volver" : "Back")}</button>
    `;
  }

  // Main category cards in computers.html.
  $$("[data-open-category]").forEach((card) => {
    card.addEventListener("click", () => {
      openCategory(card.dataset.openCategory);
    });
  });

  // The category dialog buttons remain functional too.
  $$("[data-computer-category]").forEach((button) => {
    button.addEventListener("click", () => {
      openCategory(button.dataset.computerCategory);
    });
  });

  // Delegated clicks support dynamically rendered device buttons.
  $("#typeDialogOptions")?.addEventListener("click", (event) => {
    const mobilityButton = event.target.closest("[data-mobility]");
    const finalButton = event.target.closest("[data-final-type]");
    const backButton = event.target.closest("[data-type-back]");

    if (mobilityButton) {
      state.selectedType = mobilityButton.dataset.mobility;
      state.typeStep = "device";
      renderTypeOptions();
      return;
    }

    if (backButton) {
      state.typeStep = "mobility";
      state.selectedType = "";
      renderTypeOptions();
      return;
    }

    if (finalButton) {
      const type = finalButton.dataset.finalType;
      const category = state.selectedCategory;

      hideDialog("typeDialog");
      applyCategory(category);

      const typeFilter = $("#typeFilter");
      if (typeFilter) {
        typeFilter.value = type;
        typeFilter.dispatchEvent(new Event("change", { bubbles: true }));
      }

      state.selectedType = type;
      renderComputers();
    }
  });

  // ---------------------------------------------------------
  // Search, filters, and sorting
  // ---------------------------------------------------------

  function getFilteredComputers() {
    const search = ($("#searchInput")?.value || "").trim().toLowerCase();
    const brand = $("#brandFilter")?.value || "";
    const category = $("#categoryFilter")?.value || "";
    const type = $("#typeFilter")?.value || "";
    const sort = $("#sortFilter")?.value || "default";

    let list = state.computers.filter((computer) => {
      const searchable = [
        computer.name,
        computer.brand,
        computer.category,
        computer.type,
        computer.cpu,
        computer.ram,
        computer.storage,
        computer.gpu,
        computer.os,
        computer.screen,
        computer.description
      ].join(" ").toLowerCase();

      return (!search || searchable.includes(search)) &&
        (!brand || computer.brand === brand) &&
        (!category || computer.category === category) &&
        (!type || computer.type === type);
    });

    if (sort === "price-low") {
      list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price-high") {
      list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sort === "name") {
      list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    }

    return list;
  }

  function refreshBrandFilter() {
    const select = $("#brandFilter");
    if (!select) return;

    const previous = select.value;
    const brands = [...new Set(
      state.computers.map((computer) => computer.brand).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    select.innerHTML = `
      <option value="">${escapeHTML(t("allBrands"))}</option>
      ${brands.map((brand) =>
        `<option value="${escapeHTML(brand)}">${escapeHTML(brand)}</option>`
      ).join("")}
    `;

    if (brands.includes(previous)) select.value = previous;
  }

  function renderComputers() {
    const grid = $("#computerGrid");
    const emptyState = $("#emptyState");
    const count = $("#resultsCount");

    if (!grid) return;

    const list = getFilteredComputers();

    grid.innerHTML = list.map((computer) => {
      const imageMarkup = computer.image
        ? `<img src="${escapeHTML(computer.image)}" alt="${escapeHTML(computer.name)}" loading="lazy" style="width:100%;height:190px;object-fit:contain;" onerror="this.style.display='none'">`
        : "";

      return `
        <article class="computer-card">
          ${imageMarkup}
          <div class="computer-card-content">
            <p class="computer-category">${escapeHTML(categoryLabel(computer.category))}</p>
            <h3>${escapeHTML(computer.name)}</h3>
            <p>${escapeHTML(computer.brand || "")}</p>
            <p>${escapeHTML(typeLabel(computer.type))}</p>
            <p class="computer-price"><strong>${escapeHTML(formatPrice(computer.price))}</strong></p>
            <button type="button" data-view-computer="${escapeHTML(computer.id)}">
              ${escapeHTML(t("viewDetails"))}
            </button>
          </div>
        </article>
      `;
    }).join("");

    if (emptyState) emptyState.hidden = list.length !== 0;
    if (count) {
      count.textContent = state.language === "es"
        ? `${list.length} computadora(s)`
        : `${list.length} computer(s)`;
    }
  }

  ["searchInput", "brandFilter", "categoryFilter", "typeFilter", "sortFilter"].forEach((id) => {
    document.getElementById(id)?.addEventListener(
      id === "searchInput" ? "input" : "change",
      renderComputers
    );
  });

  $("#clearFilters")?.addEventListener("click", () => {
    if ($("#searchInput")) $("#searchInput").value = "";
    if ($("#brandFilter")) $("#brandFilter").value = "";
    if ($("#categoryFilter")) $("#categoryFilter").value = "";
    if ($("#typeFilter")) $("#typeFilter").value = "";
    if ($("#sortFilter")) $("#sortFilter").value = "default";

    state.selectedCategory = "";
    state.selectedType = "";
    renderComputers();
  });

  // ---------------------------------------------------------
  // Computer details
  // ---------------------------------------------------------

  $("#computerGrid")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view-computer]");
    if (!button) return;

    const computer = state.computers.find(
      (item) => String(item.id) === button.dataset.viewComputer
    );

    if (!computer) return;

    const details = $("#computerDetails");
    if (!details) return;

    const fields = [
      ["brand", computer.brand],
      ["category", categoryLabel(computer.category)],
      ["deviceType", typeLabel(computer.type)],
      ["price", formatPrice(computer.price)],
      ["cpu", computer.cpu],
      ["ram", computer.ram],
      ["storage", computer.storage],
      ["gpu", computer.gpu],
      ["operatingSystem", computer.os],
      ["screen", computer.screen]
    ];

    details.innerHTML = `
      <h2 id="computerDetailsTitle">${escapeHTML(computer.name)}</h2>
      ${computer.image ? `<img src="${escapeHTML(computer.image)}" alt="${escapeHTML(computer.name)}" style="max-width:100%;max-height:300px;object-fit:contain" onerror="this.style.display='none'">` : ""}
      <p><strong>${escapeHTML(formatPrice(computer.price))}</strong></p>
      <dl>
        ${fields.filter(([, value]) => value !== null && value !== undefined && value !== "")
          .map(([key, value]) => `
            <dt>${escapeHTML(t(key))}</dt>
            <dd>${escapeHTML(value)}</dd>
          `).join("")}
      </dl>
      <p>${escapeHTML(computer.description || t("noDescription"))}</p>
    `;

    showDialog("computerDetailsDialog");
  });

  // ---------------------------------------------------------
  // Admin login and Supabase authentication
  // ---------------------------------------------------------

  async function checkAdminSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Could not check session:", error);
      return;
    }

    state.admin = Boolean(data.session);
  }

  async function loadComputers() {
    const grid = $("#computerGrid");
    if (grid) grid.innerHTML = `<p>${escapeHTML(t("loading"))}</p>`;

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase catalog error:", error);
      if (grid) grid.innerHTML = `<p>${escapeHTML(t("loadError"))}</p>`;
      return;
    }

    state.computers = data || [];
    refreshBrandFilter();
    renderComputers();
    renderManagementList();
  }

  $("#developerLoginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = $("#developerEmail")?.value.trim();
    const password = $("#developerPassword")?.value;
    const message = $("#loginMessage");

    if (message) message.textContent = "";

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      console.error("Login error:", error);
      if (message) message.textContent = t("loginError");
      return;
    }

    // The database's RLS policies must still enforce who can write.
    state.admin = true;

    if (message) message.textContent = t("loginSuccess");

    hideDialog("developerDialog");
    showDialog("managementDialog");
    renderManagementList();
  });

  $("#logoutButton")?.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      notify(t("logoutError"));
      return;
    }

    state.admin = false;
    state.editingId = null;
    hideDialog("managementDialog");
    hideDialog("developerDialog");
    await loadComputers();
  });

  // Developer shortcut: Shift+W, then D.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $$(".modal").forEach((modal) => { modal.hidden = true; });
    }

    if (event.key === "Shift") {
      state.shortcutStage = 1;
      clearTimeout(state.shortcutTimer);
      state.shortcutTimer = setTimeout(() => {
        state.shortcutStage = 0;
      }, 1800);
      return;
    }

    if (state.shortcutStage === 1 && event.key.toLowerCase() === "w") {
      state.shortcutStage = 2;
      clearTimeout(state.shortcutTimer);
      state.shortcutTimer = setTimeout(() => {
        state.shortcutStage = 0;
      }, 1800);
      return;
    }

    if (state.shortcutStage === 2 && event.key.toLowerCase() === "d") {
      state.shortcutStage = 0;
      clearTimeout(state.shortcutTimer);
      showDialog("developerDialog");
    } else if (event.key !== "Shift") {
      state.shortcutStage = 0;
    }
  });

  // ---------------------------------------------------------
  // Admin catalog CRUD
  // ---------------------------------------------------------

  function renderManagementList() {
    const container = $("#managementList");
    if (!container) return;

    if (!state.admin) {
      container.innerHTML = "";
      return;
    }

    if (!state.computers.length) {
      container.innerHTML = `<p>${escapeHTML(t("noResults"))}</p>`;
      return;
    }

    container.innerHTML = state.computers.map((computer) => `
      <div class="management-item" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 0;border-bottom:1px solid rgba(150,150,150,.3)">
        <div>
          <strong>${escapeHTML(computer.name)}</strong>
          <div>${escapeHTML(categoryLabel(computer.category))} · ${escapeHTML(typeLabel(computer.type))} · ${escapeHTML(formatPrice(computer.price))}</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" data-edit-computer="${escapeHTML(computer.id)}">${escapeHTML(t("edit"))}</button>
          <button type="button" data-delete-computer="${escapeHTML(computer.id)}">${escapeHTML(t("delete"))}</button>
        </div>
      </div>
    `).join("");
  }

  function resetComputerForm() {
    const form = $("#computerForm");
    if (!form) return;

    form.reset();
    form.hidden = true;
    state.editingId = null;

    const idField = $("#computerId");
    if (idField) idField.value = "";

    const message = $("#computerFormMessage");
    if (message) message.textContent = "";
  }

  $("#addComputerButton")?.addEventListener("click", () => {
    resetComputerForm();

    const form = $("#computerForm");
    if (form) form.hidden = false;

    const title = $("#computerFormTitle");
    if (title) title.textContent = t("addComputer");
  });

  $("#cancelComputerButton")?.addEventListener("click", resetComputerForm);

  $("#managementList")?.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-edit-computer]");
    const deleteButton = event.target.closest("[data-delete-computer]");

    if (editButton) {
      const computer = state.computers.find(
        (item) => String(item.id) === editButton.dataset.editComputer
      );

      if (!computer) return;

      state.editingId = computer.id;

      const form = $("#computerForm");
      if (form) form.hidden = false;

      const title = $("#computerFormTitle");
      if (title) title.textContent = t("edit");

      const fieldMap = {
        computerId: "id",
        computerName: "name",
        computerBrand: "brand",
        computerCategory: "category",
        computerType: "type",
        computerPrice: "price",
        computerCpu: "cpu",
        computerRam: "ram",
        computerStorage: "storage",
        computerGpu: "gpu",
        computerOs: "os",
        computerScreen: "screen",
        computerImage: "image",
        computerDescription: "description"
      };

      Object.entries(fieldMap).forEach(([elementId, field]) => {
        const element = document.getElementById(elementId);
        if (element) element.value = computer[field] ?? "";
      });

      return;
    }

    if (deleteButton) {
      if (!window.confirm(t("deleteConfirm"))) return;

      const id = deleteButton.dataset.deleteComputer;
      const { error } = await supabase.from(TABLE).delete().eq("id", id);

      if (error) {
        console.error("Delete error:", error);
        notify(t("deleteError"));
        return;
      }

      notify(t("deleteSuccess"));
      await loadComputers();
    }
  });

  $("#computerForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = $("#computerFormMessage");
    if (message) message.textContent = "";

    const valueOf = (id) => document.getElementById(id)?.value.trim() ?? "";

    const computer = {
      name: valueOf("computerName"),
      brand: valueOf("computerBrand"),
      category: valueOf("computerCategory"),
      type: valueOf("computerType"),
      price: Number(valueOf("computerPrice")),
      cpu: valueOf("computerCpu"),
      ram: valueOf("computerRam"),
      storage: valueOf("computerStorage"),
      gpu: valueOf("computerGpu"),
      os: valueOf("computerOs"),
      screen: valueOf("computerScreen"),
      image: valueOf("computerImage"),
      description: valueOf("computerDescription")
    };

    const saveButton = $("#saveComputerButton");
    if (saveButton) saveButton.disabled = true;

    let result;

    if (state.editingId !== null) {
      result = await supabase
        .from(TABLE)
        .update(computer)
        .eq("id", state.editingId);
    } else {
      result = await supabase
        .from(TABLE)
        .insert(computer);
    }

    if (saveButton) saveButton.disabled = false;

    if (result.error) {
      console.error("Save error:", result.error);
      if (message) message.textContent = `${t("saveError")} ${result.error.message}`;
      return;
    }

    if (message) message.textContent = t("saveSuccess");

    resetComputerForm();
    await loadComputers();
  });

  // ---------------------------------------------------------
  // Modal close buttons and backdrop
  // ---------------------------------------------------------

  $$("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      hideDialog(button.dataset.closeDialog);
    });
  });

  $$(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.hidden = true;
    });
  });

  // ---------------------------------------------------------
  // Initialize
  // ---------------------------------------------------------

  async function init() {
    updateLanguage();
    await checkAdminSession();
    await loadComputers();
  }

  init().catch((error) => {
    console.error("WasabiTech initialization error:", error);
  });
})();
