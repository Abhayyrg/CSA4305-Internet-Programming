// REGISTER

function register() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (name == "" || email == "" ||
        username == "" || password == "") {

        document.getElementById("message").innerHTML =
            "Please fill all fields";

        return;
    }

    let user = {
        name: name,
        email: email,
        username: username,
        password: password
    };

    localStorage.setItem(
        "cakeUser",
        JSON.stringify(user)
    );

    alert("Registration Successful!");

    window.location.href = "login.html";
}


// LOGIN

function login() {

    let username =
        document.getElementById("loginUser").value;

    let password =
        document.getElementById("loginPass").value;

    let user =
        JSON.parse(localStorage.getItem("cakeUser"));

    if (user &&
        username == user.username &&
        password == user.password) {

        alert("Login Successful!");

        localStorage.setItem("loggedIn", "true");

        window.location.href = "index.html";

    } else {

        document.getElementById(
            "loginMessage"
        ).innerHTML =
            "Invalid username or password";
    }
}


// ADD TO CART

function addToCart(name, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart!");
}


// DISPLAY CART

function loadCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let output = "";
    let total = 0;

    cart.forEach(function(item, index) {

        output += `
            <p>
                ${item.name} - ?${item.price}
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </p>
        `;

        total += item.price;
    });

    document.getElementById("cartItems").innerHTML =
        output;

    document.getElementById("total").innerHTML =
        total;
}


// REMOVE CART ITEM

function removeItem(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart"));

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}


// CHECKOUT

function checkout() {

    window.location.href =
        "order.html";
}


// PLACE ORDER

function placeOrder() {

    let address =
        document.getElementById("address").value;

    let city =
        document.getElementById("city").value;

    let phone =
        document.getElementById("phone").value;

    if (address == "" ||
        city == "" ||
        phone == "") {

        alert("Please enter delivery details");

        return;
    }

    let order = {

        id: Math.floor(
            1000 + Math.random() * 9000
        ),

        address: address,

        city: city,

        phone: phone,

        status: "Order Confirmed"

    };

    localStorage.setItem(
        "order",
        JSON.stringify(order)
    );

    localStorage.removeItem("cart");

    alert(
        "Order placed successfully!"
    );

    window.location.href =
        "myorders.html";
}


// DISPLAY ORDER

function loadOrders() {

    let order =
        JSON.parse(localStorage.getItem("order"));

    if (!order) {

        document.getElementById("orders").innerHTML =
            "No orders found.";

        return;
    }

    document.getElementById("orders").innerHTML = `

        <div class="order">

            <h3>Order #${order.id}</h3>

            <p>
                Address: ${order.address}
            </p>

            <p>
                City: ${order.city}
            </p>

            <p>
                Phone: ${order.phone}
            </p>

            <p>
                Status:
                <b>${order.status}</b>
            </p>

        </div>
    `;
}


// SEARCH CAKE

function searchCake() {

    let input =
        document.getElementById("search")
        .value.toLowerCase();

    let cakes =
        document.querySelectorAll(".product");

    cakes.forEach(function(cake) {

        let name =
            cake.querySelector("h3").innerText
            .toLowerCase();

        cake.style.display =
            name.includes(input)
            ? "block"
            : "none";
    });
}


// FILTER CAKE

function filterCake() {

    let category =
        document.getElementById("category").value;

    let cakes =
        document.querySelectorAll(".product");

    cakes.forEach(function(cake) {

        if (category == "all" ||
            cake.dataset.category == category) {

            cake.style.display = "block";

        } else {

            cake.style.display = "none";
        }
    });
}


// LOAD CART WHEN CART PAGE OPENS

if (document.getElementById("cartItems")) {
    loadCart();
}


// LOAD ORDERS WHEN ORDER PAGE OPENS

if (document.getElementById("orders")) {
    loadOrders();
}