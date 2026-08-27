// REGISTER PATIENT

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
        "medcareUser",
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
            localStorage.getItem("medcareUser")
        );


    if (
        user &&
        username == user.username &&
        password == user.password
    ) {

        localStorage.setItem(
            "medcareLogin",
            "true"
        );

        alert("Login Successful!");

        window.location.href =
            "index.html";

    } else {

        document.getElementById(
            "loginMessage"
        ).innerHTML =
            "? Invalid username or password.";
    }
}


// SELECT DOCTOR

function selectDoctor(name) {

    localStorage.setItem(
        "selectedDoctor",
        name
    );

    window.location.href =
        "booking.html";
}


// SEARCH DOCTOR

function searchDoctor() {

    let input =
        document.getElementById(
            "doctorSearch"
        ).value.toLowerCase();

    let doctors =
        document.querySelectorAll(".doctor");


    doctors.forEach(function(doctor) {

        let text =
            doctor.innerText.toLowerCase();

        if (text.includes(input)) {

            doctor.style.display =
                "block";

        } else {

            doctor.style.display =
                "none";
        }

    });
}


// BOOK APPOINTMENT

function bookAppointment() {

    let doctor =
        document.getElementById(
            "doctor"
        ).value;

    let hospital =
        document.getElementById(
            "hospital"
        ).value;

    let date =
        document.getElementById(
            "date"
        ).value;

    let time =
        document.getElementById(
            "time"
        ).value;


    if (date == "") {

        alert(
            "Please select appointment date."
        );

        return;
    }


    let appointment = {

        doctor: doctor,

        hospital: hospital,

        date: date,

        time: time,

        status: "Confirmed"

    };


    localStorage.setItem(
        "medcareAppointment",
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
            localStorage.getItem(
                "medcareAppointment"
            )
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

            <h3>
                Dr. ${appointment.doctor}
            </h3>

            <p>
                ?? ${appointment.hospital}
            </p>

            <p>
                ?? ${appointment.date}
            </p>

            <p>
                ? ${appointment.time}
            </p>

            <p>
                Status:
                <b class="confirmed">
                    ${appointment.status}
                </b>
            </p>

            <button
                onclick="cancelAppointment()">

                Cancel Appointment

            </button>

        </div>

    `;
}


// CANCEL APPOINTMENT

function cancelAppointment() {

    localStorage.removeItem(
        "medcareAppointment"
    );

    alert(
        "Appointment Cancelled"
    );

    location.reload();
}


// CHECK-IN

function submitCheckin() {

    let name =
        document.getElementById(
            "patientName"
        ).value;

    let symptoms =
        document.getElementById(
            "symptoms"
        ).value;

    let notes =
        document.getElementById(
            "notes"
        ).value;


    if (
        name == "" ||
        symptoms == ""
    ) {

        alert(
            "Please complete the required fields."
        );

        return;
    }


    let checkin = {

        name: name,

        symptoms: symptoms,

        notes: notes

    };


    localStorage.setItem(
        "checkin",
        JSON.stringify(checkin)
    );


    document.getElementById(
        "checkinMessage"
    ).innerHTML =
        "? Check-in submitted successfully.";
}


// REVIEW

function submitReview() {

    let doctor =
        document.getElementById(
            "reviewDoctor"
        ).value;

    let rating =
        document.getElementById(
            "rating"
        ).value;

    let review =
        document.getElementById(
            "review"
        ).value;


    if (
        doctor == "" ||
        review == ""
    ) {

        alert(
            "Please complete the review."
        );

        return;
    }


    let feedback = {

        doctor: doctor,

        rating: rating,

        review: review

    };


    localStorage.setItem(
        "doctorFeedback",
        JSON.stringify(feedback)
    );


    document.getElementById(
        "reviewMessage"
    ).innerHTML =
        "? Thank you for your feedback!";
}


// HOSPITAL REGISTRATION

function registerHospital() {

    let name =
        document.getElementById(
            "hospitalName"
        ).value;

    let location =
        document.getElementById(
            "hospitalLocation"
        ).value;

    let phone =
        document.getElementById(
            "hospitalPhone"
        ).value;

    let email =
        document.getElementById(
            "hospitalEmail"
        ).value;


    if (
        name == "" ||
        location == "" ||
        phone == "" ||
        email == ""
    ) {

        alert(
            "Please fill all fields."
        );

        return;
    }


    let hospital = {

        name: name,

        location: location,

        phone: phone,

        email: email

    };


    localStorage.setItem(
        "hospital",
        JSON.stringify(hospital)
    );


    document.getElementById(
        "hospitalMessage"
    ).innerHTML =
        "? Hospital registered successfully.";
}


// LOAD APPOINTMENT

if (
    document.getElementById("appointment")
) {

    loadAppointment();

}