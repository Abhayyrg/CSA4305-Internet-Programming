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
        "techUser",
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
            localStorage.getItem("techUser")
        );


    if (
        user &&
        username == user.username &&
        password == user.password
    ) {

        localStorage.setItem(
            "techLogin",
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


// ADD TO CART

function addToCart(name, price) {

    let cart =
        JSON.parse(
            localStorage.getItem("techCart")
        ) || [];


    cart.push({

        name: name,

        price: price

    });


    localStorage.setItem(
        "techCart",
        JSON.stringify(cart)
    );


    alert(
        name + " added to cart!"
    );
}


// LOAD CART

function loadCart() {

    let cart =
        JSON.parse(
            localStorage.getItem("techCart")
        ) || [];


    let output = "";

    let total = 0;


    cart.forEach(function(item, index) {

        output += `

            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>?${item.price}</p>

                <button
                    onclick="removeCart(${index})">

                    Remove

                </button>

            </div>

        `;


        total += item.price;

    });


    document.getElementById(
        "cartItems"
    ).innerHTML = output;


    document.getElementById(
        "total"
    ).innerHTML = total;
}


// REMOVE FROM CART

function removeCart(index) {

    let cart =
        JSON.parse(
            localStorage.getItem("techCart")
        );


    cart.splice(index, 1);


    localStorage.setItem(
        "techCart",
        JSON.stringify(cart)
    );


    loadCart();
}


// CHECKOUT

function checkout() {

    window.location.href =
        "checkout.html";
}


// PLACE ORDER

function placeOrder() {

    let address =
        document.getElementById(
            "address"
        ).value;

    let city =
        document.getElementById(
            "city"
        ).value;

    let phone =
        document.getElementById(
            "phone"
        ).value;

    let payment =
        document.getElementById(
            "payment"
        ).value;


    if (
        address == "" ||
        city == "" ||
        phone == ""
    ) {

        alert(
            "Please fill delivery details."
        );

        return;
    }


    let order = {

        id:
            Math.floor(
                10000 +
                Math.random() *
                90000
            ),

        address: address,

        city: city,

        phone: phone,

        payment: payment,

        status: "Order Confirmed"

    };


    localStorage.setItem(
        "techOrder",
        JSON.stringify(order)
    );


    localStorage.removeItem(
        "techCart"
    );


    alert(
        "Order placed successfully!"
    );


    window.location.href =
        "orders.html";
}


// LOAD ORDERS

function loadOrders() {

    let order =
        JSON.parse(
            localStorage.getItem(
                "techOrder"
            )
        );


    if (!order) {

        document.getElementById(
            "orders"
        ).innerHTML =
            "No orders found.";

        return;
    }


    document.getElementById(
        "orders"
    ).innerHTML = `

        <div class="order">

            <h3>
                Order #${order.id}
            </h3>

            <p>
                Delivery:
                ${order.address},
                ${order.city}
            </p>

            <p>
                Payment:
                ${order.payment}
            </p>

            <p>
                Status:
                <b class="success">
                    ${order.status}
                </b>
            </p>

        </div>

    `;
}


// WISHLIST

function addWishlist(name) {

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                "techWishlist"
            )
        ) || [];


    wishlist.push(name);


    localStorage.setItem(
        "techWishlist",
        JSON.stringify(wishlist)
    );


    alert(
        name + " added to wishlist!"
    );
}


// LOAD WISHLIST

function loadWishlist() {

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                "techWishlist"
            )
        ) || [];


    let output = "";


    wishlist.forEach(function(item) {

        output += `

            <div class="cart-item">

                ?? ${item}

            </div>

        `;

    });


    document.getElementById(
        "wishlist"
    ).innerHTML = output;
}


// SEARCH PRODUCTS

function searchProducts() {

    let input =
        document.getElementById(
            "search"
        ).value.toLowerCase();


    let products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(function(product) {

        let text =
            product.innerText.toLowerCase();


        product.style.display =
            text.includes(input)
            ? "block"
            : "none";

    });
}


// FILTER PRODUCTS

function filterProducts() {

    let category =
        document.getElementById(
            "category"
        ).value;


    let products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(function(product) {

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

    });
}


// LOAD REQUIRED DATA

if (
    document.getElementById(
        "cartItems"
    )
) {

    loadCart();

}


if (
    document.getElementById(
        "orders"
    )
) {

    loadOrders();

}


if (
    document.getElementById(
        "wishlist"
    )
) {

    loadWishlist();

}