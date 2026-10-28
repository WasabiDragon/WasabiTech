
/* =========================================
   WASABITECH — SUPABASE DATABASE VERSION
   ========================================= */

(() => {
    "use strict";

    const SUPABASE_URL = "https://vklrhqcueuflwxudppsl.supabase.co";
    const SUPABASE_KEY = "sb_publishable_F-ICpD4OXE-JDdYqOmm-zA_50OYw_6I";

    const STORAGE_KEY = "wasabitech_language";
    const DEV_KEY = "wasabitech_developer";

    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    if (!window.supabase) {
        console.error("Supabase library did not load.");
        return;
    }

    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let language = localStorage.getItem(STORAGE_KEY) || "en";
    let developerMode = false;
    let activeCategory = "";
    let activeType = "";
    let selectedCategory = "";
    let computers = [];
    let toastTimeout;
    let shortcutStep = 0;
    let shortcutTimer;
    let loading = true;

    const translations = {
        en: {
            navHome: "Home",
            navComputers: "Computers",
            navAbout: "About",
            navSupport: "Support",
            heroEyebrow: "TECHNOLOGY THAT FITS YOUR LIFE",
            heroTitle: "Your next computer starts here.",
            heroText: "Discover computers for every need, from everyday browsing to professional-grade performance.",
            exploreComputers: "Explore Computers",
            benefit1: "Reliable",
            benefit1Text: "Built to last, backed by care.",
            benefit2: "Powerful",
            benefit2Text: "Performance you can count on.",
            benefit3: "Great Value",
            benefit3Text: "Great technology for your budget.",
            aboutEyebrow: "A BETTER WAY TO CHOOSE",
            aboutTitle: "Find the right computer for your world.",
            aboutText: "Compare options, explore specifications, and find a computer that fits the way you work, learn, and create.",
            browseCatalog: "Browse the Catalog →",
            footerTagline: "Tech for a better tomorrow.",
            backHome: "← Back to Home",
            catalogEyebrow: "FIND YOUR MATCH",
            catalogTitle: "Computer Catalog",
            catalogText: "Browse categories, compare specifications, and find the computer that fits your needs.",
            searchPlaceholder: "Search computers...",
            allBrands: "All Brands",
            allPrices: "All Prices",
            under500: "Under $500",
            under1000: "Under $1,000",
            over1000: "$1,001 and up",
            sortFeatured: "Featured",
            sortLow: "Price: Low to High",
            sortHigh: "Price: High to Low",
            sortName: "Name",
            basic: "Basic",
            basicDesc: "For everyday use and simple tasks.",
            business: "Business",
            businessDesc: "For productivity, office work, and multitasking.",
            professional: "Professional",
            professionalDesc: "For creators, developers, and power users.",
            viewComputers: "View Computers →",
            chooseTypeEyebrow: "FIND YOUR SETUP",
            chooseType: "Choose your computer type",
            chooseTypeText: "First, choose Stationary or Mobile.",
            stationary: "Stationary",
            stationaryDesc: "Desktop computers and workstations.",
            mobile: "Mobile",
            mobileDesc: "Laptops and tablets.",
            desktop: "Desktop",
            desktopDesc: "Power and flexibility.",
            workstation: "Workstation",
            workstationDesc: "High-performance professional computing.",
            laptop: "Laptop",
            laptopDesc: "Performance on the go.",
            tablet: "Tablet",
            tabletDesc: "Portable computing with a touchscreen.",
            catalogSelection: "THE COLLECTION",
            featuredComputers: "Featured Computers",
            clearFilters: "Clear Filters",
            noResults: "No computers match those filters.",
            manageTitle: "Manage Catalog",
            addComputer: "+ Add Computer",
            storageNote: "Changes are saved to the shared WasabiTech catalog.",
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
            adminLogin: "Developer Login",
            loginNote: "Log in with your administrator email and password.",
            password: "Password",
            login: "Log In",
            manageComputers: "Manage Computers",
            exitDev: "Exit Developer Mode",
            loginFailed: "Login failed. Check your email and password.",
            loginSuccess: "Developer mode activated.",
            devExited: "Developer mode deactivated.",
            addSuccess: "Computer added to the shared catalog.",
            editSuccess: "Computer updated.",
            deleteSuccess: "Computer deleted.",
            confirmDelete: "Delete this computer?",
            edit: "Edit",
            delete: "Delete",
            details: "Details",
            specifications: "Specifications",
            noDescription: "No description provided.",
            showing: "Showing",
            computers: "computers",
            invalidForm: "Please complete all required fields.",
            editorAdd: "Add Computer",
            editorEdit: "Edit Computer",
            imagePlaceholder: "Image not available",
            loading: "Loading computers...",
            loadError: "Could not load the catalog. Please refresh the page.",
            saveError: "Could not save changes. Check your login and database permissions.",
            loginRequired: "Please log in to Developer Mode first."
        },

        es: {
            navHome: "Inicio",
            navComputers: "Computadoras",
            navAbout: "Acerca de",
            navSupport: "Ayuda",
            heroEyebrow: "TECNOLOGÍA PARA TU VIDA",
            heroTitle: "Tu próxima computadora comienza aquí.",
            heroText: "Descubre computadoras para cada necesidad, desde tareas cotidianas hasta trabajo profesional.",
            exploreComputers: "Explorar computadoras",
            benefit1: "Confiable",
            benefit1Text: "Diseñada para durar.",
            benefit2: "Potente",
            benefit2Text: "Rendimiento en el que puedes confiar.",
            benefit3: "Buen precio",
            benefit3Text: "Tecnología excelente para tu presupuesto.",
            aboutEyebrow: "UNA MEJOR FORMA DE ELEGIR",
            aboutTitle: "Encuentra la computadora ideal para ti.",
            aboutText: "Compara opciones, explora especificaciones y encuentra una computadora que se adapte a tu forma de trabajar, aprender y crear.",
            browseCatalog: "Explorar catálogo →",
            footerTagline: "Tecnología para un mañana mejor.",
            backHome: "← Volver al inicio",
            catalogEyebrow: "ENCUENTRA TU OPCIÓN",
            catalogTitle: "Catálogo de computadoras",
            catalogText: "Explora categorías, compara especificaciones y encuentra la computadora ideal para ti.",
            searchPlaceholder: "Buscar computadoras...",
            allBrands: "Todas las marcas",
            allPrices: "Todos los precios",
            under500: "Menos de $500",
            under1000: "Menos de $1,000",
            over1000: "$1,001 o más",
            sortFeatured: "Destacadas",
            sortLow: "Precio: menor a mayor",
            sortHigh: "Precio: mayor a menor",
            sortName: "Nombre",
            basic: "Básica",
            basicDesc: "Para el uso diario y tareas sencillas.",
            business: "Negocios",
            businessDesc: "Para productividad, oficina y multitarea.",
            professional: "Profesional",
            professionalDesc: "Para creadores, programadores y usuarios avanzados.",
            viewComputers: "Ver computadoras →",
            chooseTypeEyebrow: "ENCUENTRA TU EQUIPO",
            chooseType: "Elige el tipo de computadora",
            chooseTypeText: "Primero, elige entre Stationary o Mobile.",
            stationary: "Estacionaria",
            stationaryDesc: "Computadoras de escritorio y estaciones de trabajo.",
            mobile: "Móvil",
            mobileDesc: "Portátiles y tabletas.",
            desktop: "Escritorio",
            desktopDesc: "Potencia y flexibilidad.",
            workstation: "Estación de trabajo",
            workstationDesc: "Alto rendimiento para trabajo profesional.",
            laptop: "Portátil",
            laptopDesc: "Rendimiento donde vayas.",
            tablet: "Tableta",
            tabletDesc: "Computación portátil con pantalla táctil.",
            catalogSelection: "LA COLECCIÓN",
            featuredComputers: "Computadoras destacadas",
            clearFilters: "Limpiar filtros",
            noResults: "Ninguna computadora coincide con esos filtros.",
            manageTitle: "Administrar catálogo",
            addComputer: "+ Añadir computadora",
            storageNote: "Los cambios se guardan en el catálogo compartido de WasabiTech.",
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
            adminLogin: "Acceso de desarrollador",
            loginNote: "Inicia sesión con tu correo y contraseña de administrador.",
            password: "Contraseña",
            login: "Iniciar sesión",
            manageComputers: "Administrar computadoras",
            exitDev: "Salir del modo desarrollador",
            loginFailed: "No se pudo iniciar sesión. Verifica tu correo y contraseña.",
            loginSuccess: "Modo desarrollador activado.",
            devExited: "Modo desarrollador desactivado.",
            addSuccess: "Computadora añadida al catálogo compartido.",
            editSuccess: "Computadora actualizada.",
            deleteSuccess: "Computadora eliminada.",
            confirmDelete: "¿Eliminar esta computadora?",
            edit: "Editar",
            delete: "Eliminar",
            details: "Detalles",
            specifications: "Especificaciones",
            noDescription: "No hay descripción disponible.",
            showing: "Mostrando",
            computers: "computadoras",
            invalidForm: "Completa los campos obligatorios.",
            editorAdd: "Añadir computadora",
            editorEdit: "Editar computadora",
            imagePlaceholder: "Imagen no disponible",
            loading: "Cargando computadoras...",
            loadError: "No se pudo cargar el catálogo. Recarga la página.",
            saveError: "No se pudieron guardar los cambios. Verifica tu sesión y permisos.",
            loginRequired: "Inicia sesión en el modo desarrollador primero."
        }
    };

    const starterComputers = [
        {
            name: "EverydayBook 15", brand: "Lenovo",
            category: "Basic", type: "Laptop", price: 449,
            cpu: "Intel Core i3", ram: "8 GB",
            storage: "256 GB SSD", gpu: "Integrated Graphics",
            os: "Windows 11", screen: "15.6 inches", image: "",
            description: "A practical laptop for browsing, schoolwork, video calls, and everyday tasks."
        },
        {
            name: "HomeDesk S", brand: "HP",
            category: "Basic", type: "Desktop", price: 399,
            cpu: "Intel Core i3", ram: "8 GB",
            storage: "512 GB SSD", gpu: "Integrated Graphics",
            os: "Windows 11", screen: "Not included", image: "",
            description: "An affordable desktop for everyday computing, homework, and home use."
        },
        {
            name: "ThinkBook Pro 14", brand: "Lenovo",
            category: "Business", type: "Laptop", price: 899,
            cpu: "Intel Core i5", ram: "16 GB",
            storage: "512 GB SSD", gpu: "Integrated Graphics",
            os: "Windows 11 Pro", screen: "14 inches", image: "",
            description: "A productivity-focused laptop suited to office work, meetings, and multitasking."
        },
        {
            name: "OfficeTower 5", brand: "Dell",
            category: "Business", type: "Desktop", price: 799,
            cpu: "Intel Core i5", ram: "16 GB",
            storage: "1 TB SSD", gpu: "Integrated Graphics",
            os: "Windows 11 Pro", screen: "Not included", image: "",
            description: "A dependable office desktop designed for documents, spreadsheets, and business applications."
        },
        {
            name: "CreatorBook 16", brand: "ASUS",
            category: "Professional", type: "Laptop", price: 1799,
            cpu: "Intel Core i7", ram: "32 GB",
            storage: "1 TB SSD", gpu: "NVIDIA GeForce RTX 4060",
            os: "Windows 11", screen: "16 inches", image: "",
            description: "A powerful laptop for programming, creative applications, and demanding workloads."
        },
        {
            name: "StudioTower X", brand: "Custom Build",
            category: "Professional", type: "Desktop", price: 2199,
            cpu: "AMD Ryzen 9", ram: "32 GB",
            storage: "2 TB NVMe SSD", gpu: "NVIDIA GeForce RTX 4070",
            os: "Windows 11", screen: "Not included", image: "",
            description: "A high-performance desktop for 3D modeling, design, programming, and intensive creative work."
        }
    ];

    function t(key) {
        return translations[language]?.[key] || translations.en[key] || key;
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        })[char]);
    }

    function showToast(message) {
        const toast = $("#toast");
        if (!toast) {
            console.log(message);
            return;
        }

        toast.textContent = message;
        toast.classList.add("visible");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => toast.classList.remove("visible"), 3500);
    }

    function formatPrice(price) {
        return new Intl.NumberFormat(language === "es" ? "es-PR" : "en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(Number(price) || 0);
    }

    function categoryLabel(category) {
        const keys = {
            Basic: "basic",
            Business: "business",
            Professional: "professional"
        };
        return keys[category] ? t(keys[category]) : category || "";
    }

    function typeLabel(type) {
        const keys = {
            Desktop: "desktop",
            Workstation: "workstation",
            Laptop: "laptop",
            Tablet: "tablet"
        };
        return keys[type] ? t(keys[type]) : type || "";
    }

    function normalizeComputer(row) {
        return {
            ...row,
            id: String(row.id),
            price: Number(row.price) || 0,
            name: row.name || "",
            brand: row.brand || "",
            category: row.category || "Basic",
            type: row.type || "Laptop",
            cpu: row.cpu || "",
            ram: row.ram || "",
            storage: row.storage || "",
            gpu: row.gpu || "",
            os: row.os || "",
            screen: row.screen || "",
            image: row.image || "",
            description: row.description || ""
        };
    }

    async function loadComputers() {
        loading = true;
        renderComputers();

        const { data, error } = await db
            .from("computers")
            .select("*")
            .order("created_at", { ascending: false });

        loading = false;

        if (error) {
            console.error("Supabase catalog load error:", error);
            computers = [];
            renderComputers();
            showToast(t("loadError"));
            return false;
        }

        computers = (data || []).map(normalizeComputer);
        updateBrandOptions();
        renderComputers();
        renderManageList();
        return true;
    }

    async function seedStarterComputersIfEmpty() {
        const { count, error } = await db
            .from("computers")
            .select("id", { count: "exact", head: true });

        if (error) {
            console.error("Could not check existing computers:", error);
            return;
        }

        if (count !== 0) return;

        const { error: insertError } = await db
            .from("computers")
            .insert(starterComputers);

        if (insertError) {
            console.error("Could not add starter computers:", insertError);
            showToast(t("saveError"));
            return;
        }

        await loadComputers();
    }

    function updateBrandOptions() {
        const select = $("#brandFilter");
        if (!select) return;

        const selected = select.value;
        const brands = [...new Set(computers.map(pc => pc.brand).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b));

        select.innerHTML =
            `<option value="">${escapeHTML(t("allBrands"))}</option>` +
            brands.map(brand =>
                `<option value="${escapeHTML(brand)}">${escapeHTML(brand)}</option>`
            ).join("");

        if (brands.includes(selected)) select.value = selected;
    }

    function getFilteredComputers() {
        const search = ($("#searchInput")?.value || "").trim().toLowerCase();
        const brand = $("#brandFilter")?.value || "";
        const price = $("#priceFilter")?.value || "";
        const sort = $("#sortFilter")?.value || "featured";

        let results = computers.filter(pc => {
            const searchable = [
                pc.name, pc.brand, pc.category, pc.type, pc.cpu,
                pc.ram, pc.storage, pc.gpu, pc.os, pc.description
            ].join(" ").toLowerCase();

            if (search && !searchable.includes(search)) return false;
            if (brand && pc.brand !== brand) return false;
            if (activeCategory && pc.category !== activeCategory) return false;
            if (activeType && pc.type !== activeType) return false;

            if (price === "500" && pc.price >= 500) return false;
            if (price === "1000" && pc.price >= 1000) return false;
            if (price === "1001" && pc.price < 1001) return false;

            return true;
        });

        if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
        if (sort === "name") results.sort((a, b) => a.name.localeCompare(b.name));

        return results;
    }

    function renderComputers() {
        const grid = $("#computerGrid");
        if (!grid) return;

        if (loading) {
            grid.innerHTML = `<p>${escapeHTML(t("loading"))}</p>`;
            if ($("#emptyState")) $("#emptyState").hidden = true;
            return;
        }

        const results = getFilteredComputers();

        grid.innerHTML = results.map(pc => {
            const image = pc.image
                ? `<img class="computer-image" src="${escapeHTML(pc.image)}" alt="${escapeHTML(pc.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.hidden=false">`
                : "";

            return `
                <article class="computer-card">
                    <div class="computer-image-wrap">
                        ${image}
                        <span class="computer-placeholder" ${pc.image ? "hidden" : ""} aria-hidden="true">⌘</span>
                    </div>
                    <div class="computer-card-body">
                        <div class="computer-badges">
                            <span class="computer-badge">${escapeHTML(categoryLabel(pc.category))}</span>
                            <span class="computer-badge type">${escapeHTML(typeLabel(pc.type))}</span>
                        </div>
                        <h3>${escapeHTML(pc.name)}</h3>
                        <p class="computer-description">${escapeHTML(pc.description || t("noDescription"))}</p>
                        <ul class="spec-list">
                            <li><span>${escapeHTML(t("cpu"))}</span><span>${escapeHTML(pc.cpu || "—")}</span></li>
                            <li><span>${escapeHTML(t("ram"))}</span><span>${escapeHTML(pc.ram || "—")}</span></li>
                            <li><span>${escapeHTML(t("storage"))}</span><span>${escapeHTML(pc.storage || "—")}</span></li>
                        </ul>
                        <div class="computer-card-footer">
                            <span class="computer-price">${formatPrice(pc.price)}</span>
                            <button class="details-button" type="button" data-details-id="${escapeHTML(pc.id)}">${escapeHTML(t("details"))}</button>
                        </div>
                    </div>
                </article>`;
        }).join("");

        if ($("#emptyState")) $("#emptyState").hidden = results.length > 0;

        const title = $("#resultsTitle");
        if (title) {
            title.textContent = activeCategory
                ? categoryLabel(activeCategory)
                : t("featuredComputers");
        }

        const chips = $("#activeFilters");
        if (chips) {
            const labels = [];
            if (activeCategory) labels.push(categoryLabel(activeCategory));
            if (activeType) labels.push(typeLabel(activeType));
            chips.innerHTML = labels.map(label =>
                `<span class="filter-chip">${escapeHTML(label)}</span>`
            ).join("");
        }

        $$(".category-card").forEach(card => {
            card.classList.toggle("selected", card.dataset.category === activeCategory);
        });
    }

    function openDetails(id) {
        const pc = computers.find(item => String(item.id) === String(id));
        if (!pc) return;

        const dialog = $("#detailDialog");
        const content = $("#detailContent");
        if (!dialog || !content) return;

        const image = pc.image
            ? `<img class="detail-image" src="${escapeHTML(pc.image)}" alt="${escapeHTML(pc.name)}">`
            : `<span class="computer-placeholder" aria-hidden="true">⌘</span>`;

        const specs = [
            [t("brand"), pc.brand],
            [t("category"), categoryLabel(pc.category)],
            [t("type"), typeLabel(pc.type)],
            [t("cpu"), pc.cpu],
            [t("ram"), pc.ram],
            [t("storage"), pc.storage],
            [t("gpu"), pc.gpu],
            [t("os"), pc.os],
            [t("screen"), pc.screen]
        ].filter(([, value]) => value);

        content.innerHTML = `
            <div class="detail-layout">
                <div class="detail-image-wrap">${image}</div>
                <div>
                    <p class="eyebrow">${escapeHTML(categoryLabel(pc.category))}</p>
                    <h2>${escapeHTML(pc.name)}</h2>
                    <p>${escapeHTML(pc.description || t("noDescription"))}</p>
                    <p class="detail-price">${formatPrice(pc.price)}</p>
                    <h3>${escapeHTML(t("specifications"))}</h3>
                    <div class="detail-specs">
                        ${specs.map(([label, value]) => `
                            <div class="detail-spec">
                                <span>${escapeHTML(label)}</span>
                                <span>${escapeHTML(value)}</span>
                            </div>`).join("")}
                    </div>
                </div>
            </div>`;

        if (!dialog.open) dialog.showModal();
    }

    function renderManageList() {
        const list = $("#manageList");
        if (!list) return;

        list.innerHTML = computers.map(pc => `
            <div class="manage-item">
                <div class="manage-item-info">
                    <strong>${escapeHTML(pc.name)}</strong>
                    <small>${escapeHTML(pc.brand)} · ${escapeHTML(categoryLabel(pc.category))} · ${escapeHTML(typeLabel(pc.type))} · ${formatPrice(pc.price)}</small>
                </div>
                <div class="manage-item-actions">
                    <button class="small-button" type="button" data-edit-id="${escapeHTML(pc.id)}">${escapeHTML(t("edit"))}</button>
                    <button class="small-button delete" type="button" data-delete-id="${escapeHTML(pc.id)}">${escapeHTML(t("delete"))}</button>
                </div>
            </div>`).join("");
    }

    function updateDeveloperUI() {
        if ($("#adminMenu")) $("#adminMenu").hidden = !developerMode;
        if ($("#manage")) $("#manage").hidden = !developerMode;
        if (developerMode) renderManageList();
    }

    function ensureEmailField() {
        const form = $("#loginForm");
        const password = $("#adminPassword");
        if (!form || !password || $("#adminEmail")) return;

        const label = document.createElement("label");
        label.htmlFor = "adminEmail";
        label.textContent = "Administrator Email";

        const email = document.createElement("input");
        email.id = "adminEmail";
        email.type = "email";
        email.autocomplete = "username";
        email.required = true;

        password.parentNode.insertBefore(label, password);
        password.parentNode.insertBefore(email, password);
    }

    function openLogin() {
        ensureEmailField();

        const dialog = $("#loginDialog");
        const error = $("#loginError");
        if (error) error.textContent = "";

        if (dialog && !dialog.open) dialog.showModal();
        setTimeout(() => $("#adminEmail")?.focus(), 0);
    }

    async function handleLogin(event) {
        event.preventDefault();
        ensureEmailField();

        const email = ($("#adminEmail")?.value || "").trim();
        const password = $("#adminPassword")?.value || "";
        const error = $("#loginError");

        if (error) error.textContent = "";

        const { data, error: loginError } = await db.auth.signInWithPassword({
            email,
            password
        });

        if (loginError || !data.user) {
            console.error("Supabase login error:", loginError);
            if (error) error.textContent = t("loginFailed");
            return;
        }

        developerMode = true;
        sessionStorage.setItem(DEV_KEY, "true");

        const dialog = $("#loginDialog");
        if (dialog?.open) dialog.close();

        updateDeveloperUI();
        showToast(t("loginSuccess"));

        await loadComputers();
        await seedStarterComputersIfEmpty();
    }

    async function exitDeveloperMode() {
        await db.auth.signOut();
        developerMode = false;
        sessionStorage.removeItem(DEV_KEY);
        updateDeveloperUI();
        showToast(t("devExited"));
    }

    function resetEditor() {
        const form = $("#computerForm");
        if (!form) return;

        form.reset();
        if ($("#editId")) $("#editId").value = "";
        if ($("#imagePreview")) {
            $("#imagePreview").hidden = true;
            $("#imagePreview").removeAttribute("src");
        }
        if ($("#editorTitle")) $("#editorTitle").textContent = t("editorAdd");
        form.hidden = true;
    }

    // Add Workstation and Tablet to the admin dropdown if they are missing.
    function ensureComputerTypeOptions() {
        const select = $("#computerType");
        if (!select) return;

        const types = [
            ["Desktop", "Desktop"],
            ["Workstation", "Workstation"],
            ["Laptop", "Laptop"],
            ["Tablet", "Tablet"]
        ];

        types.forEach(([value, label]) => {
            if (![...select.options].some(option => option.value === value)) {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = label;
                select.appendChild(option);
            }
        });
    }

    function editComputer(id) {
        const pc = computers.find(item => String(item.id) === String(id));
        if (!pc) return;

        const form = $("#computerForm");
        if (!form) return;

        ensureComputerTypeOptions();
        form.hidden = false;

        $("#editId").value = pc.id;
        $("#computerName").value = pc.name;
        $("#computerBrand").value = pc.brand;
        $("#computerCategory").value = pc.category;
        $("#computerType").value = pc.type;
        $("#computerPrice").value = pc.price;
        $("#computerCPU").value = pc.cpu;
        $("#computerRAM").value = pc.ram;
        $("#computerStorage").value = pc.storage;
        $("#computerGPU").value = pc.gpu;
        $("#computerOS").value = pc.os;
        $("#computerScreen").value = pc.screen;
        $("#computerImage").value = pc.image;
        $("#computerDescription").value = pc.description;
        $("#editorTitle").textContent = t("editorEdit");

        const preview = $("#imagePreview");
        if (preview) {
            preview.hidden = !pc.image;
            if (pc.image) preview.src = pc.image;
            else preview.removeAttribute("src");
        }

        form.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function getComputerFromForm() {
        return {
            name: $("#computerName").value.trim(),
            brand: $("#computerBrand").value.trim(),
            category: $("#computerCategory").value,
            type: $("#computerType").value,
            price: Number($("#computerPrice").value),
            cpu: $("#computerCPU").value.trim(),
            ram: $("#computerRAM").value.trim(),
            storage: $("#computerStorage").value.trim(),
            gpu: $("#computerGPU").value.trim(),
            os: $("#computerOS").value.trim(),
            screen: $("#computerScreen").value.trim(),
            image: $("#computerImage").value.trim(),
            description: $("#computerDescription").value.trim()
        };
    }

    async function saveComputerFromForm(event) {
        event.preventDefault();

        if (!developerMode) {
            showToast(t("loginRequired"));
            return;
        }

        const form = $("#computerForm");
        if (!form.reportValidity()) {
            showToast(t("invalidForm"));
            return;
        }

        const editId = $("#editId").value;
        const computer = getComputerFromForm();

        if (!computer.name || !computer.brand ||
            !Number.isFinite(computer.price) || computer.price < 0) {
            showToast(t("invalidForm"));
            return;
        }

        const saveButton = form.querySelector('[type="submit"]');
        if (saveButton) saveButton.disabled = true;

        let result;

        if (editId) {
            result = await db
                .from("computers")
                .update(computer)
                .eq("id", editId)
                .select()
                .single();
        } else {
            result = await db
                .from("computers")
                .insert(computer)
                .select()
                .single();
        }

        if (saveButton) saveButton.disabled = false;

        if (result.error) {
            console.error("Supabase save error:", result.error);
            showToast(t("saveError"));
            return;
        }

        await loadComputers();
        resetEditor();
        showToast(editId ? t("editSuccess") : t("addSuccess"));
    }

    async function deleteComputer(id) {
        if (!developerMode) {
            showToast(t("loginRequired"));
            return;
        }

        if (!confirm(t("confirmDelete"))) return;

        const { error } = await db
            .from("computers")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Supabase delete error:", error);
            showToast(t("saveError"));
            return;
        }

        await loadComputers();
        showToast(t("deleteSuccess"));
    }

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

    // STEP 1: Choose Stationary or Mobile.
    function openTypeDialog(category) {
        selectedCategory = category;

        const dialog = $("#typeDialog");
        const title = $("#typeDialogTitle");
        const buttons = $$("[data-computer-type]");

        if (!dialog || buttons.length < 2) {
            console.error("The type dialog needs at least two [data-computer-type] buttons.");
            return;
        }

        if (title) {
            title.textContent = `${categoryLabel(category)} — ${t("chooseType")}`;
        }

        const options = [
            {
                type: "Stationary",
                label: t("stationary"),
                description: t("stationaryDesc")
            },
            {
                type: "Mobile",
                label: t("mobile"),
                description: t("mobileDesc")
            }
        ];

        buttons.slice(0, 2).forEach((button, index) => {
            const option = options[index];
            button.dataset.computerType = option.type;
            button.innerHTML = `
                <strong>${escapeHTML(option.label)}</strong>
                <span>${escapeHTML(option.description)}</span>
            `;
        });

        dialog.dataset.selectionStep = "formFactor";

        if (!dialog.open) dialog.showModal();
    }

    // STEP 2: Choose the actual device type.
    // Then filter the catalog.
    function chooseType(type) {
        const dialog = $("#typeDialog");
        const title = $("#typeDialogTitle");
        const buttons = $$("[data-computer-type]");

        if (type === "Stationary" || type === "Mobile") {
            if (!dialog || buttons.length < 2) return;

            const options = type === "Stationary"
                ? [
                    {
                        type: "Desktop",
                        label: t("desktop"),
                        description: t("desktopDesc")
                    },
                    {
                        type: "Workstation",
                        label: t("workstation"),
                        description: t("workstationDesc")
                    }
                ]
                : [
                    {
                        type: "Laptop",
                        label: t("laptop"),
                        description: t("laptopDesc")
                    },
                    {
                        type: "Tablet",
                        label: t("tablet"),
                        description: t("tabletDesc")
                    }
                ];

            if (title) {
                title.textContent =
                    `${categoryLabel(selectedCategory)} — ${t(type === "Stationary" ? "stationary" : "mobile")}`;
            }

            buttons.slice(0, 2).forEach((button, index) => {
                const option = options[index];
                button.dataset.computerType = option.type;
                button.innerHTML = `
                    <strong>${escapeHTML(option.label)}</strong>
                    <span>${escapeHTML(option.description)}</span>
                `;
            });

            dialog.dataset.selectionStep = "deviceType";
            return;
        }

        activeCategory = selectedCategory;
        activeType = type;

        if (dialog?.open) dialog.close();

        renderComputers();
        $("#catalogResults")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function setLanguage(nextLanguage) {
        language = nextLanguage === "es" ? "es" : "en";
        localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.lang = language;

        $$("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;
            if (t(key)) element.textContent = t(key);
        });

        $$("[data-i18n-placeholder]").forEach(element => {
            element.placeholder = t(element.dataset.i18nPlaceholder);
        });

        const toggle = $("#languageToggle");
        if (toggle) {
            toggle.innerHTML = language === "en"
                ? 'EN <span>|</span> ES'
                : 'ES <span>|</span> EN';
        }

        updateBrandOptions();
        renderComputers();
        renderManageList();

        // Refresh the first-step options if the dialog is open.
        const dialog = $("#typeDialog");
        if (dialog?.open && dialog.dataset.selectionStep === "formFactor") {
            openTypeDialog(selectedCategory);
        }
    }

    function setupEvents() {
        ensureEmailField();
        ensureComputerTypeOptions();

        $("#languageToggle")?.addEventListener("click", () => {
            setLanguage(language === "en" ? "es" : "en");
        });

        document.addEventListener("keydown", event => {
            if (!event.shiftKey) {
                shortcutStep = 0;
                return;
            }

            const key = event.key.toLowerCase();

            if (key === "w") {
                shortcutStep = 1;
                clearTimeout(shortcutTimer);
                shortcutTimer = setTimeout(() => shortcutStep = 0, 1800);
                return;
            }

            if (key === "d" && shortcutStep === 1) {
                shortcutStep = 0;
                clearTimeout(shortcutTimer);

                if (developerMode) {
                    if ($("#adminMenu")) {
                        $("#adminMenu").hidden = !$("#adminMenu").hidden;
                    }
                } else {
                    openLogin();
                }
            }
        });

        $("#loginForm")?.addEventListener("submit", handleLogin);

        $$("[data-close-dialog]").forEach(button => {
            button.addEventListener("click", () => {
                button.closest("dialog")?.close();
            });
        });

        $("#exitDeveloperMode")?.addEventListener("click", exitDeveloperMode);

        $$(".category-card").forEach(card => {
            card.addEventListener("click", () => {
                const category = card.dataset.category;
                if (!category) return;

                if (category === "Professional") {
                    activeCategory = category;
                    activeType = "";
                    renderComputers();
                    $("#catalogResults")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                } else {
                    openTypeDialog(category);
                }
            });
        });

        // Delegation keeps the new button choices working after each step.
        $("#typeDialog")?.addEventListener("click", event => {
            const button = event.target.closest("[data-computer-type]");
            if (button) chooseType(button.dataset.computerType);
        });

        ["searchInput", "brandFilter", "priceFilter", "sortFilter"].forEach(id => {
            const element = $("#" + id);
            if (!element) return;

            element.addEventListener(
                id === "searchInput" ? "input" : "change",
                renderComputers
            );
        });

        $("#clearFilters")?.addEventListener("click", clearFilters);

        $("#computerGrid")?.addEventListener("click", event => {
            const button = event.target.closest("[data-details-id]");
            if (button) openDetails(button.dataset.detailsId);
        });

        $("#addComputerButton")?.addEventListener("click", () => {
            if (!developerMode) {
                showToast(t("loginRequired"));
                return;
            }

            resetEditor();
            ensureComputerTypeOptions();

            if ($("#computerForm")) $("#computerForm").hidden = false;
            if ($("#editorTitle")) $("#editorTitle").textContent = t("editorAdd");

            $("#computerForm")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        $("#cancelEditor")?.addEventListener("click", resetEditor);
        $("#computerForm")?.addEventListener("submit", saveComputerFromForm);

        $("#manageList")?.addEventListener("click", event => {
            const editButton = event.target.closest("[data-edit-id]");
            const deleteButton = event.target.closest("[data-delete-id]");

            if (editButton) editComputer(editButton.dataset.editId);
            if (deleteButton) deleteComputer(deleteButton.dataset.deleteId);
        });

        $("#computerImage")?.addEventListener("input", event => {
            const preview = $("#imagePreview");
            if (!preview) return;

            const url = event.target.value.trim();

            if (!url) {
                preview.hidden = true;
                preview.removeAttribute("src");
                return;
            }

            preview.onload = () => preview.hidden = false;
            preview.onerror = () => preview.hidden = true;
            preview.src = url;
        });
    }

    async function init() {
        setupEvents();
        setLanguage(language);
        updateDeveloperUI();

        await loadComputers();

        const { data: sessionData } = await db.auth.getSession();

        if (sessionData.session) {
            // Database RLS policies remain the authority for write permissions.
            developerMode = sessionStorage.getItem(DEV_KEY) === "true";
            updateDeveloperUI();
        }

        if (location.hash === "#manage" && developerMode) {
            $("#manage")?.scrollIntoView({ behavior: "smooth" });
        }
    }

    init();
})();
