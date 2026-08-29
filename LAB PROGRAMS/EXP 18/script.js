// REGISTER

function register() {

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;


    if (
        name == "" ||
        email == "" ||
        username == "" ||
        password == ""
    ) {

        document.getElementById(
            "registerMessage"
        ).innerHTML =
            "? Please fill all fields.";

        return;
    }


    let user = {

        name: name,
        email: email,
        username: username,
        password: password

    };


    localStorage.setItem(
        "homeUser",
        JSON.stringify(user)
    );


    alert(
        "Registration Successful!"
    );

    window.location.href =
        "login.html";
}


// LOGIN

function login() {

    let username =
        document.getElementById(
            "loginUsername"
        ).value;

    let password =
        document.getElementById(
            "loginPassword"
        ).value;


    let user =
        JSON.parse(
            localStorage.getItem(
                "homeUser"
            )
        );


    if (
        user &&
        username == user.username &&
        password == user.password
    ) {

        localStorage.setItem(
            "homeLogin",
            "true"
        );

        alert(
            "Login Successful!"
        );

        window.location.href =
            "dashboard.html";

    } else {

        document.getElementById(
            "loginMessage"
        ).innerHTML =
            "? Invalid username or password.";

    }

}


// SAVE SEARCH

function saveSearch() {

    let location =
        document.getElementById(
            "location"
        ).value;

    let type =
        document.getElementById(
            "propertyType"
        ).value;

    let price =
        document.getElementById(
            "maxPrice"
        ).value;


    let search = {

        location: location,
        type: type,
        price: price

    };


    localStorage.setItem(
        "homeSearch",
        JSON.stringify(search)
    );


    alert(
        "Search criteria saved!"
    );


    window.location.href =
        "properties.html";
}


// FILTER PROPERTIES

function filterProperties() {

    let search =
        document.getElementById(
            "propertySearch"
        ).value.toLowerCase();

    let type =
        document.getElementById(
            "typeFilter"
        ).value;


    let properties =
        document.querySelectorAll(
            ".property-card"
        );


    properties.forEach(function(property) {

        let location =
            property.dataset.location;

        let category =
            property.dataset.type;


        let locationMatch =
            location.includes(search);

        let typeMatch =
            type == "all" ||
            category == type;


        if (
            locationMatch &&
            typeMatch
        ) {

            property.style.display =
                "block";

        } else {

            property.style.display =
                "none";

        }

    });

}


// SAVE PROPERTY

function saveProperty(name) {

    let saved =
        JSON.parse(
            localStorage.getItem(
                "homeSaved"
            )
        ) || [];


    if (!saved.includes(name)) {

        saved.push(name);

    }


    localStorage.setItem(
        "homeSaved",
        JSON.stringify(saved)
    );


    alert(
        name +
        " saved successfully!"
    );
}


// LOAD SAVED PROPERTIES

function loadSaved() {

    let saved =
        JSON.parse(
            localStorage.getItem(
                "homeSaved"
            )
        ) || [];


    let output = "";


    saved.forEach(function(property) {

        output += `

            <div class="saved-item">

                <h3>
                    ?? ${property}
                </h3>

                <button
                    onclick="removeSaved(
                    '${property}')">

                    Remove

                </button>

            </div>

        `;

    });


    let element =
        document.getElementById(
            "savedProperties"
        );


    if (element) {

        element.innerHTML =
            output ||
            "No saved properties.";

    }

}


// REMOVE SAVED PROPERTY

function removeSaved(name) {

    let saved =
        JSON.parse(
            localStorage.getItem(
                "homeSaved"
            )
        ) || [];


    saved =
        saved.filter(
            item => item != name
        );


    localStorage.setItem(
        "homeSaved",
        JSON.stringify(saved)
    );


    loadSaved();
}


// LOAD SEARCH

function loadSearch() {

    let search =
        JSON.parse(
            localStorage.getItem(
                "homeSearch"
            )
        );


    let element =
        document.getElementById(
            "savedSearch"
        );


    if (
        element &&
        search
    ) {

        element.innerHTML = `

            <p>
                ?? Location:
                ${search.location}
            </p>

            <p>
                ?? Type:
                ${search.type}
            </p>

            <p>
                ?? Maximum Price:
                ?${search.price}
            </p>

        `;

    }

}


// USE SAVED SEARCH

function useSavedSearch() {

    let search =
        JSON.parse(
            localStorage.getItem(
                "homeSearch"
            )
        );


    if (!search) {

        alert(
            "No saved search found."
        );

        return;
    }


    window.location.href =
        "properties.html";
}


// GOOGLE MAPS

function openMap() {

    window.open(
        "https://www.google.com/maps/search/?api=1&query=Chennai,Tamil+Nadu",
        "_blank"
    );

}


// SCHEDULE VISIT

function scheduleVisit() {

    alert(
        "Property visit request submitted!"
    );

}


// CONTACT AGENT

function contactAgent() {

    alert(
        "Agent contact request sent!"
    );

}


// AGENT SEARCH

function searchAgents() {

    let input =
        document.getElementById(
            "agentSearch"
        ).value.toLowerCase();


    let agents =
        document.querySelectorAll(
            ".agent"
        );


    agents.forEach(function(agent) {

        let text =
            agent.innerText.toLowerCase();


        agent.style.display =
            text.includes(input)
            ? "block"
            : "none";

    });

}


// EMI CALCULATOR

function calculateEMI() {

    let principal =
        Number(
            document.getElementById(
                "loan"
            ).value
        );

    let rate =
        Number(
            document.getElementById(
                "interest"
            ).value
        ) / 12 / 100;

    let months =
        Number(
            document.getElementById(
                "years"
            ).value
        ) * 12;


    if (
        principal <= 0 ||
        rate <= 0 ||
        months <= 0
    ) {

        alert(
            "Enter valid values."
        );

        return;
    }


    let emi =
        principal *
        rate *
        Math.pow(
            1 + rate,
            months
        ) /
        (
            Math.pow(
                1 + rate,
                months
            ) - 1
        );


    document.getElementById(
        "emiResult"
    ).innerHTML =
        "Monthly EMI: ?" +
        Math.round(emi);
}


// AUTO LOAD

if (
    document.getElementById(
        "savedProperties"
    )
) {

    loadSaved();

}


if (
    document.getElementById(
        "savedSearch"
    )
) {

    loadSearch();

}