/* ==========================
   WASABITECH SCRIPT
========================== */

let currentLanguage = "en";

/* ==========================
   COMPUTER DATABASE
========================== */

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

/* ==========================
   CATEGORY NAVIGATION
========================== */

function openCategory(category){

    const content =
    document.getElementById("content");

    if(category === "basic"){

        content.innerHTML = `

            <h2>Basic Computers</h2>

            <button onclick="showList('basic-stationary')">
                Stationary
            </button>

            <button onclick="showList('basic-portable')">
                Portable
            </button>

        `;
    }

    if(category === "business"){

        content.innerHTML = `

            <h2>Business Computers</h2>

            <button onclick="showList('business-stationary')">
                Stationary
            </button>

            <button onclick="showList('business-portable')">
                Portable
            </button>

        `;
    }

    if(category === "professional"){

        showList("professional");
    }
}

/* ==========================
   SHOW COMPUTER LIST
========================== */

function showList(type){

    const content =
    document.getElementById("content");

    let title =
    type
    .replaceAll("-"," ")
    .replace(/\b\w/g, c => c.toUpperCase());

    let html = `<h2>${title}</h2><ul>`;

    if(computers[type].length === 0){

        html += `
            <li>No computers available.</li>
        `;
    }

    computers[type].forEach(pc => {

        html += `
            <li>${pc}</li>
        `;
    });

    html += "</ul>";

    content.innerHTML = html;
}

/* ==========================
   LANGUAGE SWITCH
========================== */

function setLanguage(lang){

    currentLanguage = lang;

    document
    .querySelectorAll("[data-en]")
    .forEach(element => {

        element.textContent =
        element.getAttribute(
            "data-" + lang
        );
    });
}

/* ==========================
   SECRET DEV MODE
   SHIFT + W + D
========================== */

let secretCode = "";

document.addEventListener("keydown",(event)=>{

    if(event.key === "Shift"){

        secretCode = "SHIFT";
    }

    else if(
        secretCode === "SHIFT" &&
        event.key.toLowerCase() === "w"
    ){

        secretCode = "SHIFTW";
    }

    else if(
        secretCode === "SHIFTW" &&
        event.key.toLowerCase() === "d"
    ){

        document
        .getElementById("loginModal")
        .style.display = "flex";

        secretCode = "";
    }

    else{

        secretCode = "";
    }
});

/* ==========================
   CLOSE LOGIN
========================== */

function closeLogin(){

    document
    .getElementById("loginModal")
    .style.display = "none";
}

/* ==========================
   LOGIN
========================== */

function login(){

    const user =
    document.getElementById("username")
    .value
    .trim();

    const pass =
    document.getElementById("password")
    .value
    .trim();

    if(
        user === "WasabiDragon53" &&
        pass === "Tech!53"
    ){

        document
        .getElementById("loginModal")
        .style.display = "none";

        document
        .getElementById("devPanel")
        .classList.remove("hidden");

        alert("Developer Mode Activated");
    }

    else{

        alert(
            "Invalid Username or Password"
        );
    }
}

/* ==========================
   ADD COMPUTER
========================== */

function addComputer(){

    const name =
    document
    .getElementById("pcName")
    .value
    .trim();

    const category =
    document
    .getElementById("pcCategory")
    .value;

    if(name === ""){

        alert(
            "Please enter a computer name."
        );

        return;
    }

    computers[category].push(name);

    localStorage.setItem(
        "computers",
        JSON.stringify(computers)
    );

    document
    .getElementById("pcName")
    .value = "";

    alert(
        "Computer Added Successfully"
    );
}

/* ==========================
   CLOSE MODAL IF CLICKING
   OUTSIDE OF IT
========================== */

window.onclick = function(event){

    const modal =
    document.getElementById("loginModal");

    if(event.target === modal){

        closeLogin();
    }
};
