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

/* MENU */

document
.getElementById("menuBtn")
.addEventListener("click",()=>{

    document
    .getElementById("dropdownMenu")
    .classList.toggle("active");

});

/* HOME */

function goHome(){

    document
    .getElementById("content")
    .innerHTML = "";

    document
    .getElementById("mainCategories")
    .style.display = "flex";
}

/* CATEGORY */

function openCategory(category){

    document
    .getElementById("mainCategories")
    .style.display = "none";

    document
    .getElementById("dropdownMenu")
    .classList.remove("active");

    const content =
    document.getElementById("content");

    if(category === "basic"){

        content.innerHTML = `
        <h2>Basic Computers</h2>
        <br>
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
        <br>
        <button onclick="showProducts('business-stationary')">
        Stationary
        </button>

        <button onclick="showProducts('business-portable')">
        Portable
        </button>
        `;
    }

    if(category === "professional"){

        showProducts("professional");
    }
}

/* PRODUCTS */

function showProducts(category){

    let html =
    `<div class="product-grid">`;

    computers[category]
    .forEach((pc,index)=>{

        html += `

        <div class="product-card">

            <img
            src="${pc.image}"
            alt="${pc.name}">

            <div class="product-info">

                <h3>
                    ${pc.name}
                </h3>

                <div class="product-price">
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

    html += "</div>";

    document
    .getElementById("content")
    .innerHTML = html;
}

/* DETAILS */

function viewComputer(category,index){

    const pc =
    computers[category][index];

    document
    .getElementById("content")
    .innerHTML = `

    <div class="product-card">

        <img
        src="${pc.image}">

        <div
        class="product-info">

            <h2>${pc.name}</h2>

            <p>
                ${pc.description}
            </p>

            <br>

            <p><b>CPU:</b> ${pc.cpu}</p>
            <p><b>RAM:</b> ${pc.ram}</p>
            <p><b>Storage:</b> ${pc.storage}</p>
            <p><b>GPU:</b> ${pc.gpu}</p>
            <p><b>OS:</b> ${pc.os}</p>
            <p><b>Screen:</b> ${pc.screen}</p>
            <p><b>Price:</b> ${pc.price}</p>

        </div>

    </div>

    `;
}

/* SECRET LOGIN */

let secretCode = "";

document
.addEventListener(
"keydown",
(event)=>{

    if(
        event.key === "Shift"
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
        "loginModal")
        .style.display =
        "flex";

        secretCode = "";
    }

});

/* LOGIN */

function closeLogin(){

    document
    .getElementById(
    "loginModal")
    .style.display =
    "none";
}

function login(){

    const user =
    document
    .getElementById(
    "username")
    .value;

    const pass =
    document
    .getElementById(
    "password")
    .value;

    if(

       "Tech!53"

    ){

        document
        .getElementById(
        "loginModal")
        .style.display =
        "none";

        document
        .getElementById(
        "devPanel")
        .classList
        .remove(
        "hidden"
        );
    }

    else{

        alert(
        "Invalid Login"
        );
    }
}

/* ADD PC */

function addComputer(){

    const category =
    document
    .getElementById(
    "pcCategory")
    .value;

    computers[category]
    .push({

        name:
        pcName.value,

        image:
        pcImage.value,

        description:
        pcDescription.value,

        cpu:
        pcCPU.value,

        ram:
        pcRAM.value,

        storage:
        pcStorage.value,

        gpu:
        pcGPU.value,

        os:
        pcOS.value,

        screen:
        pcScreen.value,

        price:
        pcPrice.value

    });

    localStorage.setItem(
        "computers",
        JSON.stringify(
        computers
        )
    );

    alert(
    "Computer Added"
    );
}

function setLanguage(lang){}
