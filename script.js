/* ==========================================
   WASABITECH V3
========================================== */

let currentLanguage = "en";

/* ==========================================
   COMPUTER DATABASE
========================================== */

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

/* ==========================================
   HAMBURGER MENU
========================================== */

document
.getElementById("menuBtn")
.addEventListener("click",()=>{

    document
    .getElementById("devDropdown")
    .classList
    .toggle("active");

});

/* ==========================================
   DEV MENU
========================================== */

function toggleAddComputerMenu(){

    document
    .getElementById(
        "addComputerMenu"
    )
    .classList
    .toggle(
        "active"
    );
}

function showDevCategory(category){

    const select =
    document.getElementById(
        "pcCategory"
    );

    if(
        category === "basic"
    ){

        select.value =
        "basic-stationary";
    }

    else if(
        category === "business"
    ){

        select.value =
        "business-stationary";
    }

    else{

        select.value =
        "professional";
    }

}

/* ==========================================
   LANGUAGE
========================================== */

function setLanguage(lang){

    currentLanguage = lang;

    document
    .querySelectorAll(
        "[data-en]"
    )
    .forEach(element=>{

        element.textContent =
        element.getAttribute(
            "data-" + lang
        );

    });

}

/* ==========================================
   MAIN CATEGORYS
========================================== */

function openCategory(category){

    document
    .getElementById(
        "mainCategories"
    )
    .style.display =
    "none";

    const content =
    document.getElementById(
        "content"
    );

    if(
        category === "basic"
    ){

        content.innerHTML = `

        <h2>
            Basic Computers
        </h2>

        <br>

        <button
        onclick="
        showProducts(
        'basic-stationary'
        )">

            Stationary

        </button>

        <button
        onclick="
        showProducts(
        'basic-portable'
        )">

            Portable

        </button>

        `;
    }

    if(
        category === "business"
    ){

        content.innerHTML = `

        <h2>
            Business Computers
        </h2>

        <br>

        <button
        onclick="
        showProducts(
        'business-stationary'
        )">

            Stationary

        </button>

        <button
        onclick="
        showProducts(
        'business-portable'
        )">

            Portable

        </button>

        `;
    }

    if(
        category ===
        "professional"
    ){

        showProducts(
            "professional"
        );
    }
}

/* ==========================================
   PRODUCT DISPLAY
========================================== */

function showProducts(category){

    let html =
    `<div class="product-grid">`;

    if(
        computers[category]
        .length === 0
    ){

        html += `

        <p>
            No computers available.
        </p>

        `;
    }

    else{

        computers[category]
        .forEach(
        (pc,index)=>{

            html += `

            <div
            class="product-card">

                <img
                src="${pc.image}"
                alt="${pc.name}">

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
    .getElementById(
        "content"
    )
    .innerHTML =
    html;
}

/* ==========================================
   PRODUCT DETAILS
========================================== */

function viewComputer(
    category,
    index
){

    const pc =
    computers[category][index];

    document
    .getElementById(
        "content"
    )
    .innerHTML = `

    <div class="detail-card">

        <img
        src="${pc.image}"
        alt="${pc.name}">

        <div
        class="detail-content">

            <h2>
                ${pc.name}
            </h2>

            <p>
                ${pc.description}
            </p>

            <br>

            <p>
                <strong>
                CPU:
                </strong>

                ${pc.cpu}
            </p>

            <p>
                <strong>
                RAM:
                </strong>

                ${pc.ram}
            </p>

            <p>
                <strong>
                Storage:
                </strong>

                ${pc.storage}
            </p>

            <p>
                <strong>
                GPU:
                </strong>

                ${pc.gpu}
            </p>

            <p>
                <strong>
                Operating System:
                </strong>

                ${pc.os}
            </p>

            <p>
                <strong>
                Screen:
                </strong>

                ${pc.screen}
            </p>

            <p>
                <strong>
                Price:
                </strong>

                ${pc.price}
            </p>

        </div>

    </div>

    `;
}

/* ==========================================
   SECRET DEV LOGIN
   SHIFT -> W -> D
========================================== */

let secretCode = "";

document
.addEventListener(
"keydown",
(event)=>{

    if(
        event.key ===
        "Shift"
    ){

        secretCode =
        "SHIFT";
    }

    else if(

        secretCode ===
        "SHIFT"

        &&

        event.key
        .toLowerCase()
        === "w"

    ){

        secretCode =
        "SHIFTW";
    }

    else if(

        secretCode ===
        "SHIFTW"

        &&

        event.key
        .toLowerCase()
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

/* ==========================================
   LOGIN WINDOW
========================================== */

function closeLogin(){

    document
    .getElementById(
        "loginModal"
    )
    .style.display =
    "none";

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

/* ==========================================
   LOGIN
========================================== */

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

        document
        .getElementById(
            "menuBtn"
        )
        .classList
        .remove(
            "hidden"
        );

        renderEditor();

        alert(
            "Developer Mode Activated"
        );
    }

    else{

        alert(
            "Invalid Username or Password"
        );
    }
}

/* ==========================================
   ADD COMPUTER
========================================== */

function addComputer(){

    const category =
    document
    .getElementById(
        "pcCategory"
    )
    .Name"
        )
        .value,

        image:
        document
        .getElementById(
            "pcImage"
        )
        .value,

        description:
        document
        .getElementById(
            "pcDescription"
        )
        .value,

        cpu:
        document
        .getElementById(
            "pcCPU"
        )
        .value,

        ram:
        document
        .getElementById(
            "pcRAM"
        )
        .value,

        storage:
        document
        .getElementById(
            "pcStorage"
        )
        .value,

        gpu:
        document
        .getElementById(
            "pcGPU"
        )
        .value,

        os:
        document
        .getElementById(
            "pcOS"
        )
        .value,

        screen:
        document
        .getElementById(
            "pcScreen"
        )
        .value,

        price:
        document
        .getElementById(
            "pcPrice"
        )
        .value

    };

    computers[category]
    .push(
        newComputer
    );

    saveData();

    renderEditor();

    alert(
        "Computer Added"
    );
}

/* ==========================================
   DELETE COMPUTER
========================================== */

function deleteComputer(
    category,
    index
){

    computers[category]
    .splice(
        index,
        1
    );

    saveData();

    renderEditor();
}

/* ==========================================
   SAVE DATA
========================================== */

function saveData(){

    localStorage
    .setItem(

        "computers",

        JSON.stringify(
            computers
        )

    );
}

/* ==========================================
   DEV EDITOR
========================================== */

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

            <div class="editor-item">

                <strong>
                    ${computer.name}
                </strong>

                <br>

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
