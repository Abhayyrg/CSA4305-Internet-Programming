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
        name,
        email,
        username,
        password
    };


    localStorage.setItem(
        "styleUser",
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
            localStorage.getItem(
                "styleUser"
            )
        );


    if (
        user &&
        username == user.username &&
        password == user.password
    ) {

        localStorage.setItem(
            "styleLogin",
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
            localStorage.getItem(
                "styleCart"
            )
        ) || [];


    cart.push({
        name: name,
        price: price
    });


    localStorage.setItem(
        "styleCart",
        JSON.stringify(cart)
    );


    alert(
        name +
        " added to cart!"
    );
}


// LOAD CART

function loadCart() {

    let cart =
        JSON.parse(
            localStorage.getItem(
                "styleCart"
            )
        ) || [];


    let output = "";

    let total = 0;


    cart.forEach(function(item, index) {

        output += `

            <div class="cart-item">

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ?${item.price}
                    </p>

                </div>

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


// REMOVE CART ITEM

function removeCart(index) {

    let cart =
        JSON.parse(
            localStorage.getItem(
                "styleCart"
            )
        );


    cart.splice(index, 1);


    localStorage.setItem(
        "styleCart",
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

    let pincode =
        document.getElementById(
            "pincode"
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
        pincode == "" ||
        phone == ""
    ) {

        alert(
            "Please enter all delivery details."
        );

        return;
    }


    let order = {

        id:
            Math.floor(
                10000 +
                Math.random() * 90000
            ),

        address,
        city,
        pincode,
        phone,
        payment,

        status:
            "Order Confirmed"

    };


    localStorage.setItem(
        "styleOrder",
        JSON.stringify(order)
    );


    localStorage.removeItem(
        "styleCart"
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
                "styleOrder"
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
                <strong class="success">
                    ${order.status}
                </strong>
            </p>

        </div>

    `;
}


// ADD WISHLIST

function addWishlist(name) {

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                "styleWishlist"
            )
        ) || [];


    if (!wishlist.includes(name)) {

        wishlist.push(name);

    }


    localStorage.setItem(
        "styleWishlist",
        JSON.stringify(wishlist)
    );


    alert(
        name +
        " added to wishlist!"
    );
}


// LOAD WISHLIST

function loadWishlist() {

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                "styleWishlist"
            )
        ) || [];


    let output = "";


    wishlist.forEach(function(item) {

        output += `

            <div class="cart-item">

                <h3>
                    ? ${item}
                </h3>

                <button
                    onclick="addToCart(
                    '${item}',999)">

                    Add to Cart

                </button>

            </div>

        `;

    });


    document.getElementById(
        "wishlist"
    ).innerHTML = output;
}


// SEARCH

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


// CATEGORY FILTER

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


// AUTO LOAD

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