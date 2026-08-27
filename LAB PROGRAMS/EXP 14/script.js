// REGISTER

function register() {

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let phone =
        document.getElementById("phone").value;

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;


    if (
        name == "" ||
        email == "" ||
        phone == "" ||
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
        phone: phone,
        username: username,
        password: password

    };


    localStorage.setItem(
        "beautyUser",
        JSON.stringify(user)
    );


    alert("Registration Successful!");

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
            localStorage.getItem("beautyUser")
        );


    if (
        user &&
        username == user.username &&
        password == user.password
    ) {

        alert("Login Successful!");

        localStorage.setItem(
            "beautyLoggedIn",
            "true"
        );

        window.location.href =
            "index.html";

    } else {

        document.getElementById(
            "loginMessage"
        ).innerHTML =
            "? Invalid username or password.";
    }
}


// SELECT SERVICE

function selectService(service) {

    localStorage.setItem(
        "selectedService",
        service
    );

    window.location.href =
        "booking.html";
}


// BOOK APPOINTMENT

function bookAppointment() {

    let service =
        document.getElementById("service").value;

    let stylist =
        document.getElementById("stylist").value;

    let date =
        document.getElementById("date").value;

    let time =
        document.getElementById("time").value;

    let payment =
        document.getElementById("payment").value;


    if (date == "") {

        alert("Please select a date.");

        return;
    }


    let appointment = {

        service: service,

        stylist: stylist,

        date: date,

        time: time,

        payment: payment,

        status: "Confirmed"

    };


    localStorage.setItem(
        "appointment",
        JSON.stringify(appointment)
    );


    alert(
        "Appointment booked successfully!"
    );


    window.location.href =
        "appointments.html";
}


// DISPLAY APPOINTMENT

function loadAppointment() {

    let appointment =
        JSON.parse(
            localStorage.getItem("appointment")
        );


    if (!appointment) {

        document.getElementById(
            "appointment"
        ).innerHTML =
            "No appointments found.";

        return;
    }


    document.getElementById(
        "appointment"
    ).innerHTML = `

        <div class="appointment">

            <h3>${appointment.service}</h3>

            <p>
                Stylist: ${appointment.stylist}
            </p>

            <p>
                Date: ${appointment.date}
            </p>

            <p>
                Time: ${appointment.time}
            </p>

            <p>
                Payment: ${appointment.payment}
            </p>

            <p>
                Status:
                <b class="confirmed">
                    ${appointment.status}
                </b>
            </p>

            <button onclick="cancelAppointment()">
                Cancel Appointment
            </button>

        </div>

    `;
}


// CANCEL APPOINTMENT

function cancelAppointment() {

    localStorage.removeItem(
        "appointment"
    );

    alert(
        "Appointment Cancelled"
    );

    location.reload();
}


// FEEDBACK

function submitFeedback() {

    let feedback =
        document.getElementById(
            "feedback"
        ).value;


    if (feedback == "") {

        alert("Please enter feedback.");

        return;
    }


    document.getElementById(
        "feedbackMessage"
    ).innerHTML =
        "? Thank you for your feedback!";

    document.getElementById(
        "feedbackMessage"
    ).style.color = "green";
}


// LOAD APPOINTMENT PAGE

if (
    document.getElementById("appointment")
) {

    loadAppointment();

}