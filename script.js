/* =====================================
   WASABITECH V2
===================================== */

let currentLanguage = "en";

let computers =
JSON.parse(
    localStorage.getItem("computers")
) || {

    "basic-stationary": [],
    "basic-portable": [],
    "business-stationary": [],
    "business-portable": [],
    "professional": []
};

/* =====================================
   SIDEBAR
===================================== */

document
.getElementById("menuBtn")
.addEventListener("click",openSidebar);

function openSidebar(){

    document
    .getElementById("sidebar")
    .classList.add("active");
}

function closeSidebar(){

    document
    .getElementById("sidebar")
    .classList.remove("active");
}

/* =====================================
   LANGUAGE
===================================== */

function setLanguage(lang){

    currentLanguage = lang;

    document
    .querySelectorAll("[data-en]")
    .forEach(element=>{

        element.textContent =
        element.getAttribute(
            "data-" + lang
        );
    });
}

/* =====================================
   HOME
===================================== */

function goHome(){

    document
    .getElementById("content")
    .innerHTML = "";

    document
    .getElementById("mainCategories")
    .style.display = "flex";
}

/* =====================================
   CATEGORYS
===================================== */

function openCategory(category){

    document
    .getElementById("mainCategories")
    .style.display = "none";

    closeSidebar();

    const content =
    document.getElementById("content");

    if(category === "basic"){

        content.innerHTML = `

        <h2>Basic Computers</h2>

        <button onclick="showProducts('basic-stationary')">
            Stationary
        </button>

        <button onclick="showProducts('basic-portable')">
            Portable
        </button>

        `;
    }

    if(category === "business"){

        content.innerHTML = `

        <h2>Business Computers</h2>

        <button onclick="showProducts('business-stationary')">
            Stationary
        </button>

        <button onclick="showProducts('business-portable')">
            Portable
        </button>

        `;
    }

    if(category === "professional"){

        showProducts(
            "professional"
        );
    }
}

/* =====================================
   PRODUCT GRID
===================================== */

function showProducts(category){

    let html =
    `<div class="product-grid">`;

    if(
        !computers[category] ||
        computers[category].length === 0
    ){

        html += `
        <p>
            No computers available.
        </p>
        `;
    }

    else{

        computers[category]
        .forEach((pc,index)=>{

            html += `

            <div class="product-card">

                <img
                src="${pc.image}"
                onerror="this.src='https://placehold.co/600x400'">

                <div
                class="product-info">

                    <h3>
                        ${pc.name}
                    </h3>

                    <div
                    class="product-price">

                        ${pc.price}
                    </div>

                    <button
                    onclick="
                    viewComputer(
                    '${category}',
                    ${index}
                    )">

                        View Details

                    </button>

                </div>

            </div>

            `;
        });
    }

    html += "</div>";

    document
    .getElementById("content")
    .innerHTML = html;
}

/* =====================================
   PRODUCT DETAILS
===================================== */

function viewComputer(
    category,
    index
){

    const pc =
    computers[category][index];

    document
    .getElementById("content")
    .innerHTML = `

    <div class="detail-card">

        <img
        src="${pc.image}"
        onerror="this.src='https://placehold.co/1000x500'">

        <div
        class="detail-content">

            <h2>
                ${pc.name}
            </h2>

            <p>
                ${pc.description}
            </p>

            <div class="specs">

                <div class="spec">
                    CPU: ${pc.cpu}
                </div>

                <div class="spec">
                    RAM: ${pc.ram}
                </div>

                <div class="spec">
                    Storage: ${pc.storage}
                </div>

                <div class="spec">
                    GPU: ${pc.gpu}
                </div>

                <div class="spec">
                    Operating System:
                    ${pc.os}
                </div>

                <div class="spec">
                    Screen Size:
                    ${pc.screen}
                </div>

                <div class="spec">
                    Price:
                    ${pc.price}
                </div>

            </div>

        </div>

    </div>

    `;
}

/* =====================================
   SECRET DEV LOGIN
===================================== */

let secretCode = "";

document
.addEventListener(
"keydown",
(event)=>{

    if(
        event.key === "Shift"
    ){

        secretCode = "SHIFT";
    }

    else if(
        secretCode === "SHIFT"
        &&
        event.key.toLowerCase()
        === "w"
    ){

        secretCode =
        "SHIFTW";
    }

    else if(
        secretCode ===
        "SHIFTW"
        &&
        event.key.toLowerCase()
        === "d"
    ){

        document
        .getElementById(
            "loginModal"
        )
        .style.display =
        "flex";

        secretCode = "";
    }

    else{

        secretCode = "";
    }
});

/* =====================================
   MODAL
===================================== */

function closeLogin(){

    document
    .getElementById(
        "loginModal"
    )
    .style.display = "none";
}

window.onclick =
function(event){

    const modal =
    document.getElementById(
        "loginModal"
    );

    if(
        event.target === modal
    ){

        closeLogin();
    }
};

/* =====================================
   LOGIN
===================================== */

function login(){

    const username =
    document
    .getElementById(
        "username"
    )
    .value
    .trim();

    const password =
    document
    .getElementById(
        "password"
    )
    .value
    .trim();

    if(

        username ===
        "WasabiDragon53"

        &&

        password ===
        "Tech!53"

    ){

        document
        .getElementById(
            "loginModal"
        )
        .style.display =
        "none";

        document
        .getElementById(
            "devPanel"
        )
        .classList
        .remove(
            "hidden"
        );

        renderEditor();
    }

    else{

        alert(
        "Invalid Login");
    }
}

/* =====================================
   ADD COMPUTER
===================================== */

function addComputer(){

    const category =
    document
    .getElementById(
        "pcCategory"
    )
    .value;

    const newPC = {

        name:
        document
        .getElementById("pcName")
        .value,

        image:
        document
        .getElementById("pcImage")
        .value,

        description:
        document
        .getElementById("pcDescription")
        .value,

        cpu:
        document
        .getElementById("pcCPU")
        .value,

        ram:
        document
        .getElementById("pcRAM")
        .value,

        storage:
        document
        .getElementById("pcStorage")
        .value,

        gpu:
        document
        .getElementById("pcGPU")
        .value,

        os:
        document
        .getElementById("pcOS")
        .value,

        screen:
        document
        .getElementById("pcScreen")
        .value,

        price:
        document
        .getElementById("pcPrice")
        .value
    };

    computers[category]
    .push(newPC);

    saveData();

    renderEditor();

    alert(
        "Computer Added"
    );
}

/* =====================================
   DELETE COMPUTER
==========   renderEditor();
}

/* =====================================
   SAVE
===================================== */

function saveData(){

    localStorage
    .setItem(

        "computers",

        JSON.stringify(
            computers
        )

    );
}

/* =====================================
   DEV CATALOG EDITOR
===================================== */

function renderEditor(){

    let html = "";

    Object.keys(
        computers
    )
    .forEach(category=>{

        computers[
        category
        ]
        .forEach(
        (
        computer,
        index
        )=>{

            html += `

            <div class="spec">

                <strong>

                ${
                computer.name
                }

                </strong>

                <br><br>

                ${category}

                <br><br>

                <button
                onclick="
                deleteComputer(
                '${category}',
                ${index}
                )">

                    Delete

                </button>

            </div>

            `;
        });
    });

    document
    .getElementById(
        "catalogEditor"
    )
    .innerHTML =
    html;
}
