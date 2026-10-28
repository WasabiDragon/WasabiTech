
(() => {
  "use strict";

  const SUPABASE_URL = "https://vklrhqcueuflwxudppsl.supabase.co";
  const SUPABASE_KEY = "sb_publishable_F-ICpD4OXE-JDdYqOmm-zA_50OYw_6I";
  const TABLE = "computers";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const state = {
    computers: [],
    language: localStorage.getItem("wasabitech-language") || "en",
    selectedCategory: "",
    selectedType: "",
    admin: false,
    editingId: null,
    shortcutStage: 0,
    shortcutTimer: null
  };

  const translations = {
    en: {
      navHome: "Home",
      navComputers: "Computers",
      navAbout: "About",
      navSupport: "Support",
      backHome: "← Back to Home",
      catalogEyebrow: "FIND YOUR MATCH",
      catalogTitle: "Computer Catalog",
      catalogText: "Browse categories, compare specifications, and find the computer that fits your needs.",
      basic: "Basic",
      business: "Business",
      professional: "Professional",
      basicDesc: "For everyday use and simple tasks.",
      businessDesc: "For productivity, office work, and multitasking.",
      professionalDesc: "For creators, developers, and power users.",
      viewComputers: "View Computers →",
      catalogSelection: "THE COLLECTION",
      featuredComputers: "Featured Computers",
      clearFilters: "Clear Filters",
      searchPlaceholder: "Search computers...",
      allPrices: "All Prices",
      under500: "Under $500",
      under1000: "Under $1,000",
      over1000: "$1,001 and up",
      sortFeatured: "Featured",
      sortLow: "Price: Low to High",
      sortHigh: "Price: High to Low",
      sortName: "Name",
      noResults: "No computers match those filters.",
      chooseTypeEyebrow: "FIND YOUR SETUP",
      chooseType: "Choose your computer type",
      chooseTypeText: "Choose how you want to use your computer.",
      stationary: "Stationary",
      stationaryDesc: "A computer setup that stays in one place.",
      mobile: "Mobile",
      mobileDesc: "A computer you can take with you.",
      desktop: "Desktop",
      desktopDesc: "Power and flexibility.",
      workstation: "Workstation",
      workstationDesc: "For demanding professional workloads.",
      laptop: "Laptop",
      laptopDesc: "Performance on the go.",
      tablet: "Tablet",
      tabletDesc: "Portable and lightweight.",
      back: "Back",
      manageTitle: "Manage Catalog",
      storageNote: "Changes are saved to the shared WasabiTech catalog.",
      addComputer: "+ Add Computer",
      editorAdd: "Add Computer",
      editorEdit: "Edit Computer",
      computerName: "Computer Name",
      brand: "Brand",
      category: "Category",
      type: "Type",
      price: "Price (USD)",
      cpu: "CPU",
      ram: "RAM",
      storage: "Storage",
      gpu: "GPU",
      os: "Operating System",
      screen: "Screen Size",
      imageUrl: "Image URL",
      description: "Description",
      saveComputer: "Save Computer",
      cancel: "Cancel",
      footerTagline: "Tech for a better tomorrow.",
      adminLogin: "Developer Login",
      loginNote: "Log in with your authorized administrator email and password.",
      password: "Password",
      login: "Log In",
      manageComputers: "Manage Computers",
      exitDev: "Exit Developer Mode",
      viewDetails: "View Details",
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
      allBrands: "All Brands",
      priceUnavailable: "Price unavailable"
    },
    es: {
      navHome: "Inicio",
      navComputers: "Computadoras",
      navAbout: "Acerca de",
      navSupport: "Soporte",
      backHome: "← Volver al inicio",
      catalogEyebrow: "ENCUENTRA TU OPCIÓN",
      catalogTitle: "Catálogo de computadoras",
      catalogText: "Explora categorías, compara especificaciones y encuentra la computadora ideal.",
      basic: "Básica",
      business: "Negocios",
      professional: "Profesional",
      basicDesc: "Para el uso diario y tareas sencillas.",
      businessDesc: "Para productividad, oficina y multitarea.",
      professionalDesc: "Para creadores, desarrolladores y usuarios avanzados.",
      viewComputers: "Ver computadoras →",
      catalogSelection: "LA COLECCIÓN",
      featuredComputers: "Computadoras destacadas",
      clearFilters: "Limpiar filtros",
      searchPlaceholder: "Buscar computadoras...",
      allPrices: "Todos los precios",
      under500: "Menos de $500",
      under1000: "Menos de $1,000",
      over1000: "$1,001 en adelante",
      sortFeatured: "Destacadas",
      sortLow: "Precio: menor a mayor",
      sortHigh: "Precio: mayor a menor",
      sortName: "Nombre",
      noResults: "Ninguna computadora coincide con esos filtros.",
      chooseTypeEyebrow: "ENCUENTRA TU EQUIPO",
      chooseType: "Elige tu computadora",
      chooseTypeText: "Elige cómo deseas utilizar tu computadora.",
      stationary: "Estacionaria",
      stationaryDesc: "Un equipo que permanece en un solo lugar.",
      mobile: "Móvil",
      mobileDesc: "Una computadora que puedes llevar contigo.",
      desktop: "Computadora de escritorio",
      desktopDesc: "Potencia y flexibilidad.",
      workstation: "Estación de trabajo",
      workstationDesc: "Para tareas profesionales exigentes.",
      laptop: "Portátil",
      laptopDesc: "Rendimiento para llevar contigo.",
      tablet: "Tableta",
      tabletDesc: "Portátil y ligera.",
      back: "Volver",
      manageTitle: "Administrar catálogo",
      storageNote: "Los cambios se guardan en el catálogo compartido de WasabiTech.",
      addComputer: "+ Añadir computadora",
      editorAdd: "Añadir computadora",
      editorEdit: "Editar computadora",
      computerName: "Nombre de la computadora",
      brand: "Marca",
      category: "Categoría",
      type: "Tipo",
      price: "Precio (USD)",
      cpu: "Procesador",
      ram: "Memoria RAM",
      storage: "Almacenamiento",
      gpu: "Tarjeta gráfica",
      os: "Sistema operativo",
      screen: "Tamaño de pantalla",
      imageUrl: "URL de imagen",
      description: "Descripción",
      saveComputer: "Guardar computadora",
      cancel: "Cancelar",
      footerTagline: "Tecnología para un mañana mejor.",
      adminLogin: "Acceso de desarrollador",
      loginNote: "Inicia sesión con tu correo y contraseña de administrador autorizados.",
      password: "Contraseña",
      login: "Iniciar sesión",
      manageComputers: "Administrar computadoras",
      exitDev: "Salir del modo desarrollador",
      viewDetails: "Ver detalles",
      noDescription: "No hay una descripción disponible.",
      loading: "Cargando computadoras...",
      loadError: "No se pudieron cargar las computadoras. Actualiza la página.",
      loginError: "No se pudo iniciar sesión. Verifica tu correo y contraseña.",
      loginSuccess: "Sesión iniciada correctamente.",
      saveError: "No se pudo guardar la computadora.",
      saveSuccess: "Computadora guardada correctamente.",
      deleteConfirm: "¿Seguro que deseas eliminar esta computadora?",
      deleteError: "No se pudo eliminar la computadora.",
      deleteSuccess: "Computadora eliminada.",
      logoutError: "No se pudo cerrar la sesión.",
      noAdminPermission: "Tu cuenta no tiene permiso para administrar computadoras.",
      allBrands: "Todas las marcas",
      priceUnavailable: "Precio no disponible"
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
    if (!Number.isFinite(amount)) return t("priceUnavailable");

    return new Intl.NumberFormat(
      state.language === "es" ? "es-PR" : "en-US",
      { style: "currency", currency: "USD" }
    ).format(amount);
  }

  function categoryLabel(category) {
    const keys = {
      Basic: "basic",
      Business: "business",
      Professional: "professional"
    };
    return t(keys[category]) || category || "";
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

  function showDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.hidden = false;
    }
  }

  function hideDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;

    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.hidden = true;
    }
  }

  // ---------------------------------------------------------
  // Language
  // ---------------------------------------------------------

  function updateLanguage() {
    document.documentElement.lang = state.language;

    $$("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    $$("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    const languageButton = $("#languageToggle");
    if (languageButton) {
      languageButton.innerHTML = state.language === "en"
        ? 'EN <span>|</span> ES'
        : 'EN <span>|</span> ES';
      languageButton.setAttribute(
        "aria-label",
        state.language === "en" ? "Switch to Spanish" : "Cambiar a inglés"
      );
    }

    refreshBrandFilter();
    renderComputers();
    renderManagementList();
  }

  $("#languageToggle")?.addEventListener("click", () => {
    state.language = state.language === "en" ? "es" : "en";
    localStorage.setItem("wasabitech-language", state.language);
    updateLanguage();
  });

  // ---------------------------------------------------------
  // Category and type selection
  // ---------------------------------------------------------

  function openCategory(category) {
    state.selectedCategory = category;
    state.selectedType = "";

    if (category === "Professional") {
      hideDialog("typeDialog");
      applyFilters(category, "");
      return;
    }

    $("#typeDialogTitle").textContent = t("chooseType");
    $("#typeDialogText").textContent = t("chooseTypeText");

    $("#typeChoiceGrid").hidden = false;
    $("#stationaryChoiceGrid").hidden = true;
    $("#mobileChoiceGrid").hidden = true;
    $("#typeDialogBack").hidden = true;

    showDialog("typeDialog");
  }

  function openMobilityChoice(mobility) {
    state.selectedType = mobility;

    $("#typeChoiceGrid").hidden = true;
    $("#stationaryChoiceGrid").hidden = mobility !== "Stationary";
    $("#mobileChoiceGrid").hidden = mobility !== "Mobile";
    $("#typeDialogBack").hidden = false;

    $("#typeDialogTitle").textContent = t(
      mobility === "Stationary" ? "stationary" : "mobile"
    );
    $("#typeDialogText").textContent = t(
      mobility === "Stationary" ? "stationaryDesc" : "mobileDesc"
    );
  }

  function applyFilters(category, type) {
    state.selectedCategory = category || "";
    state.selectedType = type || "";

    if ($("#searchInput")) $("#searchInput").value = "";
    if ($("#brandFilter")) $("#brandFilter").value = "";
    if ($("#priceFilter")) $("#priceFilter").value = "";
    if ($("#sortFilter")) $("#sortFilter").value = "featured";

    renderComputers();

    $(".catalog-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  $$(".category-card[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      openCategory(button.dataset.category);
    });
  });

  $("#typeChoiceGrid")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-computer-mode]");
    if (button) openMobilityChoice(button.dataset.computerMode);
  });

  $("#stationaryChoiceGrid")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-computer-type]");
    if (!button) return;

    const type = button.dataset.computerType;
    const category = state.selectedCategory;

    hideDialog("typeDialog");
    applyFilters(category, type);
  });

  $("#mobileChoiceGrid")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-computer-type]");
    if (!button) return;

    const type = button.dataset.computerType;
    const category = state.selectedCategory;

    hideDialog("typeDialog");
    applyFilters(category, type);
  });

  $("#typeDialogBack")?.addEventListener("click", () => {
    $("#typeChoiceGrid").hidden = false;
    $("#stationaryChoiceGrid").hidden = true;
    $("#mobileChoiceGrid").hidden = true;
    $("#typeDialogBack").hidden = true;
    $("#typeDialogTitle").textContent = t("chooseType");
    $("#typeDialogText").textContent = t("chooseTypeText");
    state.selectedType = "";
  });

  // ---------------------------------------------------------
  // Filtering and rendering
  // ---------------------------------------------------------

  function getFilteredComputers() {
    const search = ($("#searchInput")?.value || "").trim().toLowerCase();
    const brand = $("#brandFilter")?.value || "";
    const priceFilter = $("#priceFilter")?.value || "";
    const sort = $("#sortFilter")?.value || "featured";

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

      const matchesSearch = !search || searchable.includes(search);
      const matchesBrand = !brand || computer.brand === brand;
      const matchesCategory = !state.selectedCategory ||
        computer.category === state.selectedCategory;
      const matchesType = !state.selectedType ||
        computer.type === state.selectedType;

      let matchesPrice = true;
      const price = Number(computer.price);

      if (priceFilter === "500") matchesPrice = price < 500;
      if (priceFilter === "1000") matchesPrice = price < 1000;
      if (priceFilter === "1001") matchesPrice = price >= 1001;

      return matchesSearch && matchesBrand && matchesCategory &&
        matchesType && matchesPrice;
    });

    if (sort === "price-asc") {
      list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price-desc") {
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

    if (emptyState) emptyState.hidden = list.length > 0;

    const title = $("#resultsTitle");
    if (title) {
      if (state.selectedCategory === "Professional") {
        title.textContent = state.language === "es"
          ? "Computadoras profesionales"
          : "Professional Computers";
      } else if (state.selectedCategory) {
        title.textContent = categoryLabel(state.selectedCategory);
        if (state.selectedType) title.textContent += ` — ${typeLabel(state.selectedType)}`;
      } else {
        title.textContent = t("featuredComputers");
      }
    }
  }

  $("#searchInput")?.addEventListener("input", renderComputers);
  $("#brandFilter")?.addEventListener("change", renderComputers);
  $("#priceFilter")?.addEventListener("change", renderComputers);
  $("#sortFilter")?.addEventListener("change", renderComputers);

  $("#clearFilters")?.addEventListener("click", () => {
    if ($("#searchInput")) $("#searchInput").value = "";
    if ($("#brandFilter")) $("#brandFilter").value = "";
    if ($("#priceFilter")) $("#priceFilter").value = "";
    if ($("#sortFilter")) $("#sortFilter").value = "featured";

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

    const dialog = $("#detailDialog");
    const content = $("#detailContent");
    if (!dialog || !content) return;

    const fields = [
      ["brand", computer.brand],
      ["category", categoryLabel(computer.category)],
      ["type", typeLabel(computer.type)],
      ["price", formatPrice(computer.price)],
      ["cpu", computer.cpu],
      ["ram", computer.ram],
      ["storage", computer.storage],
      ["gpu", computer.gpu],
      ["os", computer.os],
      ["screen", computer.screen]
    ];

    content.innerHTML = `
      <h2>${escapeHTML(computer.name)}</h2>
      ${computer.image
        ? `<img src="${escapeHTML(computer.image)}" alt="${escapeHTML(computer.name)}" style="max-width:100%;max-height:300px;object-fit:contain" onerror="this.style.display='none'">`
        : ""}
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

    showDialog("detailDialog");
  });

  // ---------------------------------------------------------
  // Supabase catalog
  // ---------------------------------------------------------

  async function checkAdminSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Could not check administrator session:", error);
      return;
    }

    state.admin = Boolean(data.session);
    updateAdminVisibility();
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

  // ---------------------------------------------------------
  // Administrator login
  // ---------------------------------------------------------

  $("#loginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = $("#adminEmail")?.value.trim();
    const password = $("#adminPassword")?.value;
    const errorElement = $("#loginError");

    if (errorElement) errorElement.textContent = "";

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      console.error("Login error:", error);
      if (errorElement) errorElement.textContent = t("loginError");
      return;
    }

    state.admin = true;
    updateAdminVisibility();
    hideDialog("loginDialog");
    renderManagementList();
    notify(t("loginSuccess"));
  });

  function updateAdminVisibility() {
    const manage = $("#manage");
    const adminMenu = $("#adminMenu");

    if (manage) manage.hidden = !state.admin;
    if (adminMenu) adminMenu.hidden = !state.admin;
  }

  $("#exitDeveloperMode")?.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      notify(t("logoutError"));
      return;
    }

    state.admin = false;
    state.editingId = null;
    updateAdminVisibility();
    resetComputerForm();
    await loadComputers();
  });

  // Developer shortcut: Shift+W, then D.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $$(".modal").forEach((dialog) => {
        if (typeof dialog.close === "function" && dialog.open) dialog.close();
        else dialog.hidden = true;
      });
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
      showDialog("loginDialog");
    } else if (event.key !== "Shift") {
      state.shortcutStage = 0;
    }
  });

  // ---------------------------------------------------------
  // Catalog management
  // ---------------------------------------------------------

  function renderManagementList() {
    const container = $("#manageList");
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
          <div>${escapeHTML(categoryLabel(computer.category))} - ${escapeHTML(typeLabel(computer.type))} - ${escapeHTML(formatPrice(computer.price))}</div>
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

    if ($("#editId")) $("#editId").value = "";

    const title = $("#editorTitle");
    if (title) title.textContent = t("editorAdd");

    const imagePreview = $("#imagePreview");
    if (imagePreview) {
      imagePreview.hidden = true;
      imagePreview.removeAttribute("src");
    }
  }

  $("#addComputerButton")?.addEventListener("click", () => {
    resetComputerForm();
    if ($("#computerForm")) $("#computerForm").hidden = false;
    if ($("#editorTitle")) $("#editorTitle").textContent = t("editorAdd");
  });

  $("#cancelEditor")?.addEventListener("click", resetComputerForm);

  $("#manageList")?.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-edit-computer]");
    const deleteButton = event.target.closest("[data-delete-computer]");

    if (editButton) {
      const computer = state.computers.find(
        (item) => String(item.id) === editButton.dataset.editComputer
      );
      if (!computer) return;

      state.editingId = computer.id;
      if ($("#computerForm")) $("#computerForm").hidden = false;
      if ($("#editorTitle")) $("#editorTitle").textContent = t("editorEdit");

      const fields = {
        editId: "id",
        computerName: "name",
        computerBrand: "brand",
        computerCategory: "category",
        computerType: "type",
        computerPrice: "price",
        computerCPU: "cpu",
        computerRAM: "ram",
        computerStorage: "storage",
        computerGPU: "gpu",
        computerOS: "os",
        computerScreen: "screen",
        computerImage: "image",
        computerDescription: "description"
      };

      Object.entries(fields).forEach(([id, field]) => {
        const input = document.getElementById(id);
        if (input) input.value = computer[field] ?? "";
      });

      updateImagePreview();
      $("#computerForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (deleteButton) {
      if (!window.confirm(t("deleteConfirm"))) return;

      const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq("id", deleteButton.dataset.deleteComputer);

      if (error) {
        console.error("Delete error:", error);
        notify(`${t("deleteError")} ${error.message}`);
        return;
      }

      notify(t("deleteSuccess"));
      await loadComputers();
    }
  });

  function updateImagePreview() {
    const input = $("#computerImage");
    const preview = $("#imagePreview");
    if (!input || !preview) return;

    const url = input.value.trim();
    if (!url) {
      preview.hidden = true;
      preview.removeAttribute("src");
      return;
    }

    preview.src = url;
    preview.hidden = false;
  }

  $("#computerImage")?.addEventListener("input", updateImagePreview);

  $("#computerForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!state.admin) {
      notify(t("noAdminPermission"));
      return;
    }

    const valueOf = (id) => document.getElementById(id)?.value.trim() ?? "";

    const computer = {
      name: valueOf("computerName"),
      brand: valueOf("computerBrand"),
      category: valueOf("computerCategory"),
      type: valueOf("computerType"),
      price: Number(valueOf("computerPrice")),
      cpu: valueOf("computerCPU"),
      ram: valueOf("computerRAM"),
      storage: valueOf("computerStorage"),
      gpu: valueOf("computerGPU"),
      os: valueOf("computerOS"),
      screen: valueOf("computerScreen"),
      image: valueOf("computerImage"),
      description: valueOf("computerDescription")
    };

    const submitButton = $("#computerForm button[type='submit']");
    if (submitButton) submitButton.disabled = true;

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

    if (submitButton) submitButton.disabled = false;

    if (result.error) {
      console.error("Save error:", result.error);
      notify(`${t("saveError")} ${result.error.message}`);
      return;
    }

    notify(t("saveSuccess"));
    resetComputerForm();
    await loadComputers();
  });

  // ---------------------------------------------------------
  // Modal close buttons
  // ---------------------------------------------------------

  $$("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (!dialog) return;

      if (typeof dialog.close === "function" && dialog.open) dialog.close();
      else dialog.hidden = true;
    });
  });

  $$(".modal").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;

      if (typeof dialog.close === "function" && dialog.open) dialog.close();
      else dialog.hidden = true;
    });
  });

  // ---------------------------------------------------------
  // Initialize
  // ---------------------------------------------------------

  async function init() {
    updateLanguage();
    updateAdminVisibility();
    await checkAdminSession();
    await loadComputers();
  }

  init().catch((error) => {
    console.error("WasabiTech initialization error:", error);
  });
})();
