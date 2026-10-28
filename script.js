
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#080d16">
    <title>Computer Catalog | WasabiTech</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="script.js" defer></script>
</head>
<body>
    <header class="site-header">
        <a class="brand" href="index.html">
            <span class="brand-mark">W</span>
            <span><span class="wasabi">Wasabi</span><span class="tech">Tech</span></span>
        </a>

        <nav class="main-nav">
            <a href="index.html" data-i18n="navHome">Home</a>
            <a class="active" href="computers.html" data-i18n="navComputers">Computers</a>
            <a href="index.html#about" data-i18n="navAbout">About</a>
            <a href="index.html#support" data-i18n="navSupport">Support</a>
        </nav>

        <div class="header-actions">
            <button class="language-button" id="languageToggle" type="button">EN <span>|</span> ES</button>
        </div>
    </header>

    <main class="catalog-main">
        <a class="back-link" href="index.html" data-i18n="backHome">← Back to Home</a>

        <section class="catalog-heading">
            <p class="eyebrow" data-i18n="catalogEyebrow">FIND YOUR MATCH</p>
            <h1 data-i18n="catalogTitle">Computer Catalog</h1>
            <p data-i18n="catalogText">Browse categories, compare specifications, and find the computer that fits your needs.</p>
        </section>

        <section class="category-grid" aria-label="Computer categories">
            <button class="category-card basic" type="button" data-category="Basic">
                <span class="category-symbol">⌂</span>
                <strong data-i18n="basic">Basic</strong>
                <span data-i18n="basicDesc">For everyday use and simple tasks.</span>
                <b data-i18n="viewComputers">View Computers →</b>
            </button>

            <button class="category-card business" type="button" data-category="Business">
                <span class="category-symbol">▤</span>
                <strong data-i18n="business">Business</strong>
                <span data-i18n="businessDesc">For productivity, office work, and multitasking.</span>
                <b data-i18n="viewComputers">View Computers →</b>
            </button>

            <button class="category-card professional" type="button" data-category="Professional">
                <span class="category-symbol">✧</span>
                <strong data-i18n="professional">Professional</strong>
                <span data-i18n="professionalDesc">For creators, developers, and power users.</span>
                <b data-i18n="viewComputers">View Computers →</b>
            </button>
        </section>

        <section class="catalog-results" id="catalogResults">
            <div class="section-title-row">
                <div>
                    <p class="eyebrow" data-i18n="catalogSelection">THE COLLECTION</p>
                    <h2 id="resultsTitle" data-i18n="featuredComputers">Featured Computers</h2>
                </div>
                <button class="text-button" id="clearFilters" type="button" data-i18n="clearFilters">Clear Filters</button>
            </div>

            <div class="catalog-tools">
                <input id="searchInput" type="search" placeholder="Search computers..." data-i18n-placeholder="searchPlaceholder" aria-label="Search computers">
                <select id="brandFilter" aria-label="Brand filter">
                    <option value="">All Brands</option>
                </select>
                <select id="priceFilter" aria-label="Price filter">
                    <option value="" data-i18n="allPrices">All Prices</option>
                    <option value="500" data-i18n="under500">Under $500</option>
                    <option value="1000" data-i18n="under1000">Under $1,000</option>
                    <option value="1001" data-i18n="over1000">$1,001 and up</option>
                </select>
                <select id="sortFilter" aria-label="Sort computers">
                    <option value="featured" data-i18n="sortFeatured">Featured</option>
                    <option value="price-asc" data-i18n="sortLow">Price: Low to High</option>
                    <option value="price-desc" data-i18n="sortHigh">Price: High to Low</option>
                    <option value="name" data-i18n="sortName">Name</option>
                </select>
            </div>

            <div class="active-filters" id="activeFilters"></div>
            <div class="computer-grid" id="computerGrid"></div>

            <div class="empty-state" id="emptyState" hidden>
                <h3 data-i18n="noResults">No computers match those filters.</h3>
                <p>Try changing your search or clearing the filters.</p>
            </div>
        </section>

        <section class="manage-section" id="manage" hidden>
            <p class="eyebrow">DEVELOPER AREA</p>
            <h2 data-i18n="manageTitle">Manage Catalog</h2>
            <p class="muted" data-i18n="storageNote">Changes are saved to the shared WasabiTech catalog.</p>

            <div id="manageList" class="manage-list"></div>
            <button class="button button-primary" id="addComputerButton" type="button" data-i18n="addComputer">+ Add Computer</button>

            <form id="computerForm" class="editor-form" hidden>
                <h3 id="editorTitle" data-i18n="editorAdd">Add Computer</h3>
                <input id="editId" type="hidden">

                <div class="form-grid">
                    <label>
                        <span data-i18n="computerName">Computer Name</span>
                        <input id="computerName" required maxlength="100">
                    </label>
                    <label>
                        <span data-i18n="brand">Brand</span>
                        <input id="computerBrand" required maxlength="80">
                    </label>
                    <label>
                        <span data-i18n="category">Category</span>
                        <select id="computerCategory" required>
                            <option value="Basic">Basic</option>
                            <option value="Business">Business</option>
                            <option value="Professional">Professional</option>
                        </select>
                    </label>
                    <label>
                        <span data-i18n="type">Type</span>
                        <select id="computerType" required>
                            <option value="Desktop">Desktop</option>
                            <option value="Workstation">Workstation</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Tablet">Tablet</option>
                        </select>
                    </label>
                    <label>
                        <span data-i18n="price">Price (USD)</span>
                        <input id="computerPrice" type="number" min="0" step="0.01" required>
                    </label>
                    <label>
                        <span data-i18n="cpu">CPU</span>
                        <input id="computerCPU">
                    </label>
                    <label>
                        <span data-i18n="ram">RAM</span>
                        <input id="computerRAM">
                    </label>
                    <label>
                        <span data-i18n="storage">Storage</span>
                        <input id="computerStorage">
                    </label>
                    <label>
                        <span data-i18n="gpu">GPU</span>
                        <input id="computerGPU">
                    </label>
                    <label>
                        <span data-i18n="os">Operating System</span>
                        <input id="computerOS">
                    </label>
                    <label>
                        <span data-i18n="screen">Screen Size</span>
                        <input id="computerScreen" placeholder="15.6 inches">
                    </label>
                    <label class="wide">
                        <span data-i18n="imageUrl">Image URL</span>
                        <input id="computerImage" type="url" placeholder="https://example.com/computer.jpg">
                        <img id="imagePreview" class="image-preview" alt="Computer image preview" hidden>
                    </label>
                    <label class="wide">
                        <span data-i18n="description">Description</span>
                        <textarea id="computerDescription" rows="3"></textarea>
                    </label>
                </div>

                <div class="form-actions">
                    <button class="button button-primary" type="submit" data-i18n="saveComputer">Save Computer</button>
                    <button class="button button-secondary" id="cancelEditor" type="button" data-i18n="cancel">Cancel</button>
                </div>
            </form>
        </section>
    </main>

    <footer class="site-footer">
        <a class="brand footer-brand" href="index.html">
            <span class="brand-mark">W</span>
            <span>
                <span class="wasabi">Wasabi</span><span class="tech">Tech</span>
                <small data-i18n="footerTagline">Tech for a better tomorrow.</small>
            </span>
        </a>
        <div class="footer-links">
            <a href="index.html" data-i18n="navHome">Home</a>
            <a href="computers.html" data-i18n="navComputers">Computers</a>
        </div>
    </footer>

    <dialog class="modal" id="typeDialog">
        <div class="modal-card">
            <button class="modal-close" type="button" data-close-dialog aria-label="Close">×</button>
            <p class="eyebrow" data-i18n="chooseTypeEyebrow">FIND YOUR SETUP</p>
            <h2 id="typeDialogTitle" data-i18n="chooseType">Choose your computer type</h2>
            <p id="typeDialogText" data-i18n="chooseTypeText">Choose the setup that fits your needs.</p>
            <div class="type-choice-grid" id="typeChoiceGrid">
                <button class="type-choice" type="button" data-setup-choice="Stationary">
                    <span class="type-choice-icon">▣</span>
                    <strong data-i18n="stationary">Stationary</strong>
                    <span data-i18n="stationaryDesc">Computers designed to stay in one place.</span>
                </button>
                <button class="type-choice" type="button" data-setup-choice="Mobile">
                    <span class="type-choice-icon">▱</span>
                    <strong data-i18n="mobile">Mobile</strong>
                    <span data-i18n="mobileDesc">Computers you can take with you.</span>
                </button>
            </div>
        </div>
    </dialog>

    <dialog class="modal" id="detailDialog">
        <div class="modal-card detail-card">
            <button class="modal-close" type="button" data-close-dialog aria-label="Close">×</button>
            <div id="detailContent"></div>
        </div>
    </dialog>

    <dialog class="modal" id="loginDialog">
        <form class="modal-card" id="loginForm">
            <button class="modal-close" type="button" data-close-dialog aria-label="Close">×</button>
            <p class="eyebrow">WASABITECH</p>
            <h2 data-i18n="adminLogin">Developer Login</h2>
            <p class="muted" data-i18n="loginNote">Log in with your authorized administrator email and password.</p>

            <label for="adminEmail">Administrator Email</label>
            <input id="adminEmail" type="email" autocomplete="username" required>

            <label for="adminPassword" data-i18n="password">Password</label>
            <input id="adminPassword" type="password" autocomplete="current-password" required>

            <p class="form-error" id="loginError" role="alert"></p>
            <button class="button button-primary full-width" type="submit" data-i18n="login">Log In</button>
        </form>
    </dialog>

    <aside class="admin-menu" id="adminMenu" hidden>
        <strong>Developer Tools</strong>
        <a href="#manage" data-i18n="manageComputers">Manage Computers</a>
        <button type="button" id="exitDeveloperMode" data-i18n="exitDev">Exit Developer Mode</button>
    </aside>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>
</body>
</html>

