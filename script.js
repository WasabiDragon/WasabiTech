let currentLanguage = "en";

let computers =
JSON.parse(localStorage.getItem("computers")) || {

    "basic-stationary": [],
    "basic-portable": [],

    "business-stationary": [],
    "business-portable": [],

    "professional": []
};
let logoClicks = 0;
function openCategory(category){

    const content =
    document.getElementById("content");

    if(category === "basic"){
        content.innerHTML = `
            <h2>Basic</h2>

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
            <h2>Business</h2>

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

function showList(type){

    const content =
    document.getElementById("content");

    let html = `<h2>${type}</h2><ul>`;

    computers[type].forEach(pc=>{
        html += `<li>${pc}</li>`;
    });

    html += "</ul>";

    content.innerHTML = html;
}

document
.getElementById("devBtn")
.addEventListener("click",()=>{

    document
    .getElementById("loginModal")
    .style.display = "flex";

});

function login(){

    const user =
    document.getElementById("username").value;

    const pass =
    document.getElementById("password").value;

  if(
    user==="WasabiDragon53" &&
    pass==="Tech!53"
)

        document
        .getElementById("devPanel")
        .classList.remove("hidden");

        document
        .getElementById("loginModal")
        .style.display="none";
    }
    else{
        alert("Invalid Login");
    }
}

function addComputer(){

    const name =
    document.getElementById("pcName").value;

    const category =
    document.getElementById("pcCategory").value;

    if(name === "") return;

    computers[category].push(name);

    localStorage.setItem(
        "computers",
        JSON.stringify(computers)
    );

    document.getElementById("pcName").value="";

    alert("Computer Added");
}

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
document
.getElementById("logo")
.addEventListener("click",()=>{

    logoClicks++;

    if(logoClicks >= 5){

        document
        .getElementById("loginModal")
        .style.display = "flex";

        logoClicks = 0;
    }
});
function closeLogin(){

    document
    .getElementById("loginModal")
    .style.display = "none";
}
