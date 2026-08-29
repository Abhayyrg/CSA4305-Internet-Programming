// AGENT REGISTRATION

function registerAgent() {

    let name =
        document.getElementById(
            "agentName").value;

    let email =
        document.getElementById(
            "agentEmail").value;

    let phone =
        document.getElementById(
            "agentPhone").value;

    let username =
        document.getElementById(
            "agentUsername").value;

    let password =
        document.getElementById(
            "agentPassword").value;


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
            "? Fill all fields.";

        return;

    }


    let agent = {

        name: name,
        email: email,
        phone: phone,
        username: username,
        password: password,
        approved: false

    };


    localStorage.setItem(
        "agent",
        JSON.stringify(agent)
    );


    alert(
        "Agent registered successfully!"
    );


    window.location.href =
        "login.html";

}


// LOGIN

function login() {

    let role =
        document.getElementById(
            "loginRole").value;

    let username =
        document.getElementById(
            "loginUsername").value;

    let password =
        document.getElementById(
            "loginPassword").value;


    // ADMIN LOGIN

    if (
        role == "admin" &&
        username == "admin" &&
        password == "admin123"
    ) {

        window.location.href =
            "admin.html";

        return;

    }


    // AGENT LOGIN

    if (role == "agent") {

        let agent =
            JSON.parse(
                localStorage.getItem(
                    "agent"
                )
            );


        if (
            agent &&
            username == agent.username &&
            password == agent.password
        ) {

            if (!agent.approved) {

                alert(
                    "Waiting for admin approval."
                );

                return;

            }

            window.location.href =
                "agent.html";

            return;

        }

    }


    // USER LOGIN

    if (
        role == "user" &&
        username == "user" &&
        password == "user123"
    ) {

        window.location.href =
            "user.html";

        return;

    }


    document.getElementById(
        "loginMessage"
    ).innerHTML =
        "? Invalid login details.";

}


// POLICY SEARCH

function searchPolicies() {

    let search =
        document.getElementById(
            "policySearch"
        ).value.toLowerCase();


    let policies =
        document.querySelectorAll(
            ".policy"
        );


    policies.forEach(function(policy) {

        let text =
            policy.innerText.toLowerCase();


        if (
            text.includes(search)
        ) {

            policy.style.display =
                "block";

        } else {

            policy.style.display =
                "none";

        }

    });

}


// POLICY FILTER

function filterPolicies() {

    let type =
        document.getElementById(
            "policyType"
        ).value;


    let policies =
        document.querySelectorAll(
            ".policy"
        );


    policies.forEach(function(policy) {

        if (
            type == "all" ||
            policy.dataset.type == type
        ) {

            policy.style.display =
                "block";

        } else {

            policy.style.display =
                "none";

        }

    });

}


// APPLY POLICY

function applyPolicy(policy) {

    localStorage.setItem(
        "myPolicy",
        policy
    );


    alert(
        policy +
        " application submitted!"
    );

}


// CREATE CUSTOMER

function createCustomer() {

    let name =
        prompt(
            "Enter customer name:"
        );


    if (!name) {

        return;

    }


    let customers =
        JSON.parse(
            localStorage.getItem(
                "customers"
            )
        ) || [];


    customers.push(name);


    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );


    alert(
        "Customer added successfully!"
    );


    viewCustomers();

}


// VIEW CUSTOMERS

function viewCustomers() {

    let customers =
        JSON.parse(
            localStorage.getItem(
                "customers"
            )
        ) || [];


    let output = "";


    customers.forEach(
        function(customer, index) {

            output +=
                `<p>
                    ${index + 1}.
                    ${customer}
                </p>`;

        }
    );


    let element =
        document.getElementById(
            "customerList"
        );


    if (element) {

        element.innerHTML =
            output ||
            "No customers added.";

    }

}


// SEND SMS

function sendSMS() {

    alert(
        "?? SMS Alert sent to customer!"
    );

}


// VIEW USER POLICY

function viewPolicies() {

    let policy =
        localStorage.getItem(
            "myPolicy"
        );


    if (policy) {

        document.getElementById(
            "myPolicy"
        ).innerHTML =
            "Active Policy: " +
            policy;

    } else {

        alert(
            "No active policy found."
        );

    }

}


// PREMIUM PAYMENT

function payPremium() {

    alert(
        "?? Premium payment page opened."
    );

}


// ALERTS

function showAlerts() {

    alert(
        "?? Reminder: Your insurance premium is due soon!"
    );

}


// ADMIN VIEW AGENTS

function showAgents() {

    let agent =
        JSON.parse(
            localStorage.getItem(
                "agent"
            )
        );


    let element =
        document.getElementById(
            "agentList"
        );


    if (
        agent &&
        element
    ) {

        element.innerHTML = `

            <p>
                ????? ${agent.name}
            </p>

            <p>
                ?? ${agent.email}
            </p>

            <p>
                ?? ${agent.phone}
            </p>

            <p>
                Status:
                ${
                    agent.approved
                    ? "Approved"
                    : "Pending"
                }
            </p>

        `;

    }

}


// APPROVE AGENT

function approveAgent() {

    let agent =
        JSON.parse(
            localStorage.getItem(
                "agent"
            )
        );


    if (!agent) {

        alert(
            "No agent registration found."
        );

        return;

    }


    agent.approved = true;


    localStorage.setItem(
        "agent",
        JSON.stringify(agent)
    );


    alert(
        "? Agent approved successfully!"
    );


    showAgents();

}


// REPORT

function generateReport() {

    alert(
        "?? Insurance report generated successfully!"
    );

}