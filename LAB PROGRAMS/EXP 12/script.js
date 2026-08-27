// =============================
// LOGIN
// =============================

function login() {

    let username =
        document.getElementById("username").value.trim();

    let password =
        document.getElementById("password").value;

    let message =
        document.getElementById("message");


    // Check empty fields
    if (username === "" || password === "") {

        message.innerHTML =
            "? Please enter username and password.";

        message.style.color = "red";

        return;
    }


    // Get registered user
    let savedUser =
        localStorage.getItem("user");


    // Check whether user exists
    if (savedUser === null) {

        message.innerHTML =
            "? No registered user found. Please register first.";

        message.style.color = "red";

        return;
    }


    // Convert JSON string into object
    let user =
        JSON.parse(savedUser);


    // Check username and password
    if (
        username === user.username &&
        password === user.password
    ) {

        message.innerHTML =
            "? Login successful!";

        message.style.color = "green";


        // Save login status
        localStorage.setItem(
            "loggedIn",
            "true"
        );


        // Redirect to search page
        setTimeout(function() {

            window.location.href =
                "search.html";

        }, 1000);

    } else {

        message.innerHTML =
            "? Invalid username or password.";

        message.style.color = "red";
    }
}


// =============================
// REGISTER
// =============================

function register() {

    let name =
        document.getElementById("name").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let username =
        document.getElementById("regUsername").value.trim();

    let password =
        document.getElementById("regPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    let message =
        document.getElementById("regMessage");


    // Empty field validation
    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        username === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.innerHTML =
            "? Please fill all fields.";

        message.style.color = "red";

        return;
    }


    // Email validation
    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        message.innerHTML =
            "? Enter a valid email address.";

        message.style.color = "red";

        return;
    }


    // Phone validation
    let phonePattern =
        /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {

        message.innerHTML =
            "? Phone number must contain 10 digits.";

        message.style.color = "red";

        return;
    }


    // Password validation
    if (password.length < 6) {

        message.innerHTML =
            "? Password must contain at least 6 characters.";

        message.style.color = "red";

        return;
    }


    // Confirm password
    if (password !== confirmPassword) {

        message.innerHTML =
            "? Passwords do not match.";

        message.style.color = "red";

        return;
    }


    // Create user object
    let user = {

        name: name,

        email: email,

        phone: phone,

        username: username,

        password: password

    };


    // Store user
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    // Show success
    message.innerHTML =
        "? Registration successful!";

    message.style.color = "green";


    // Go to login page
    setTimeout(function() {

        window.location.href =
            "index.html";

    }, 1000);
}


// =============================
// SEARCH FLIGHT
// =============================

function searchFlight() {

    let from =
        document.getElementById("from").value;

    let to =
        document.getElementById("to").value;


    if (from === "" || to === "") {

        alert(
            "Please enter source and destination."
        );

        return;
    }


    document.getElementById("results").innerHTML = `

        <div class="card">

            <h2>Available Flights</h2>

            <h3>?? SkyBook Airlines</h3>

            <p>${from} ? ${to}</p>

            <p>Departure: 08:30 AM</p>

            <p>Arrival: 11:30 AM</p>

            <p>Available Seats: 36</p>

            <p>Fare: ?5,500</p>

            <a href="booking.html">
                <button>Book Now</button>
            </a>

        </div>

    `;
}


// =============================
// CONTINUE TO PAYMENT
// =============================

function continuePayment() {

    let name =
        document.getElementById("passenger").value;

    let seat =
        document.getElementById("seat").value;


    if (name === "") {

        alert("Please enter passenger name.");

        return;
    }


    localStorage.setItem(
        "passenger",
        name
    );

    localStorage.setItem(
        "seat",
        seat
    );


    window.location.href =
        "payment.html";
}


// =============================
// PAYMENT
// =============================

function makePayment() {

    let pnr =
        Math.floor(
            100000000 +
            Math.random() * 900000000
        );


    localStorage.setItem(
        "pnr",
        pnr
    );


    alert(
        "Payment Successful!\nPNR: " + pnr
    );


    window.location.href =
        "ticket.html";
}


// =============================
// CANCEL TICKET
// =============================

function cancelTicket() {

    let pnr =
        document.getElementById("cancelPNR").value;

    let savedPNR =
        localStorage.getItem("pnr");


    if (pnr === savedPNR) {

        localStorage.removeItem("pnr");


        document.getElementById(
            "cancelResult"
        ).innerHTML = `

            <div class="success">

                <h3>Ticket Cancelled</h3>

                <p>PNR: ${pnr}</p>

                <p>Refund Amount: ?4,400</p>

            </div>

        `;

    } else {

        alert("Invalid PNR.");

    }
}