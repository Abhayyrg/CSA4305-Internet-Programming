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
            "registerMsg"
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
        "user",
        JSON.stringify(user)
    );


    alert(
        "Registration successful!"
    );


    window.location.href =
        "login.html";
}



// LOGIN

function login() {

    let username =
        document.getElementById(
            "loginUser"
        ).value;

    let password =
        document.getElementById(
            "loginPass"
        ).value;


    let user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (
        user &&
        username == user.username &&
        password == user.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "products.html";

    } else {

        document.getElementById(
            "loginMsg"
        ).innerHTML =
            "? Invalid username or password.";

    }

}



// ADD TO CART

function addToCart(name, price) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let existing =
        cart.find(
            item => item.name == name
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,
            price: price,
            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        name +
        " added to cart!"
    );

}



// DISPLAY CART

function displayCart() {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let output = "";

    let total = 0;


    cart.forEach(
        function(item, index) {

            let amount =
                item.price *
                item.quantity;

            total += amount;


            output += `

                <div class="cart-item">

                    <b>
                        ${item.name}
                    </b>

                    <p>
                        ?${item.price}
                    </p>

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                    <button
                        onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

                <hr>

            `;

        }
    );


    let cartElement =
        document.getElementById(
            "cartItems"
        );


    let totalElement =
        document.getElementById(
            "total"
        );


    if (cartElement) {

        cartElement.innerHTML =
            output ||
            "Your cart is empty.";

    }


    if (totalElement) {

        totalElement.innerHTML =
            "Total: ?" + total;

    }

}



// REMOVE ITEM

function removeItem(index) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}



// CHECKOUT

function checkout() {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    if (cart.length == 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    let address =
        prompt(
            "Enter delivery address:"
        );


    if (!address) {

        return;

    }


    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    orders.push({

        items: cart,

        address: address,

        status: "Order Confirmed",

        date:
            new Date().toLocaleDateString()

    });


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    localStorage.removeItem(
        "cart"
    );


    alert(
        "?? Order placed successfully!"
    );


    window.location.href =
        "orders.html";

}



// DISPLAY ORDERS

function displayOrders() {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    let output = "";


    orders.forEach(
        function(order, index) {

            output += `

                <div class="cart-item">

                    <h3>
                        Order #${index + 1}
                    </h3>

                    <p>
                        Date:
                        ${order.date}
                    </p>

                    <p>
                        Address:
                        ${order.address}
                    </p>

                    <p>
                        Status:
                        <b>${order.status}</b>
                    </p>

                </div>

                <hr>

            `;

        }
    );


    let element =
        document.getElementById(
            "orders"
        );


    if (element) {

        element.innerHTML =
            output ||
            "No orders found.";

    }

}



// SEARCH

function searchProducts() {

    let value =
        document.getElementById(
            "search"
        ).value.toLowerCase();


    let products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(
        function(product) {

            let text =
                product.innerText.toLowerCase();


            if (
                text.includes(value)
            ) {

                product.style.display =
                    "block";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}



// FILTER

function filterProducts() {

    let category =
        document.getElementById(
            "category"
        ).value;


    let products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(
        function(product) {

            if (
                category == "all" ||
                product.dataset.category ==
                category
            ) {

                product.style.display =
                    "block";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}



// ADMIN CUSTOMER INFORMATION

function viewCustomers() {

    let user =
        JSON.parse(
            localStorage.getItem("user")
        );


    let output;


    if (user) {

        output = `

            <h2>Customer Information</h2>

            <p>
                Name: ${user.name}
            </p>

            <p>
                Email: ${user.email}
            </p>

            <p>
                Phone: ${user.phone}
            </p>

            <p>
                Username: ${user.username}
            </p>

        `;

    } else {

        output =
            "No registered customers.";

    }


    document.getElementById(
        "adminOutput"
    ).innerHTML = output;

}



// ADMIN INVENTORY

function viewInventory() {

    document.getElementById(
        "adminOutput"
    ).innerHTML = `

        <h2>Inventory</h2>

        <p>?? Red Rose Bouquet -
        12 available</p>

        <p>?? Spring Tulip Bouquet -
        8 available</p>

        <p>?? Birthday Gift Box -
        10 available</p>

        <p>?? Chocolate Basket -
        6 available</p>

    `;

}



// ADMIN ORDERS

function viewOrders() {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    document.getElementById(
        "adminOutput"
    ).innerHTML =

        "<h2>Total Orders: " +
        orders.length +
        "</h2>";

}



// LOAD CART

if (
    document.getElementById(
        "cartItems"
    )
) {

    displayCart();

}



// LOAD ORDERS

if (
    document.getElementById(
        "orders"
    )
) {

    displayOrders();

}