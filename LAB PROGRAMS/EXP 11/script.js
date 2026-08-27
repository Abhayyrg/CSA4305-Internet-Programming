function login() {

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user == "" || pass == "") {

        document.getElementById("message").innerHTML =
            "Please enter username and password";

    } else {

        alert("Login Successful");
        window.location.href = "search.html";
    }
}


function register() {

    alert("Registration Successful!");

    window.location.href = "index.html";
}


function searchTrain() {

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (from == "" || to == "") {

        alert("Enter source and destination");
        return;
    }

    document.getElementById("results").innerHTML = `

        <div class="card">

            <h2>Available Trains</h2>

            <h3>?? Chennai Express</h3>

            <p>Chennai ? Bangalore</p>

            <p>Departure: 08:00 AM</p>

            <p>Arrival: 02:00 PM</p>

            <p>Available Seats: 42</p>

            <p>Fare: ?850</p>

            <a href="booking.html">
                <button>Book Now</button>
            </a>

        </div>

    `;
}


function bookTicket() {

    let name =
        document.getElementById("passenger").value;

    if (name == "") {

        alert("Enter passenger name");
        return;
    }

    let pnr =
        Math.floor(1000000000 +
        Math.random() * 9000000000);

    alert("Payment Successful!\nPNR: " + pnr);

    localStorage.setItem("pnr", pnr);

    window.location.href = "pnr.html";
}


function checkPNR() {

    let pnr =
        document.getElementById("pnr").value;

    let savedPNR =
        localStorage.getItem("pnr");

    if (pnr == savedPNR) {

        document.getElementById("pnrResult").innerHTML = `

            <div class="success">

                <h3>PNR Status: CONFIRMED</h3>

                <p>Train: Chennai Express</p>

                <p>Seat: S12</p>

                <p>Passenger: Confirmed</p>

            </div>

        `;

    } else {

        document.getElementById("pnrResult").innerHTML =
            "<p>PNR not found</p>";
    }
}


function cancelTicket() {

    let pnr =
        document.getElementById("cancelPNR").value;

    let savedPNR =
        localStorage.getItem("pnr");

    if (pnr == savedPNR) {

        let refund = 850 * 0.80;

        localStorage.removeItem("pnr");

        document.getElementById("cancelResult").innerHTML = `

            <div class="success">

                <h3>Ticket Cancelled</h3>

                <p>PNR: ${pnr}</p>

                <p>Refund Amount: ?${refund}</p>

            </div>

        `;

    } else {

        alert("Invalid PNR");
    }
}