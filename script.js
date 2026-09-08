// Product data

const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Footwear",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 2999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },

    {
        id: 5,
        name: "Denim Jacket",
        category: "Fashion",
        price: 1799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },

    {
        id: 6,
        name: "Backpack",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },

    {
        id: 7,
        name: "Sports Sneakers",
        category: "Footwear",
        price: 2199,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "Accessories",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];


// Get cart from LocalStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display products

function displayProducts() {

    const container = document.getElementById("product-container");

    if (!container) return;

    const searchInput = document.getElementById("search");

    const categoryInput = document.getElementById("category");

    const search = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    const category = categoryInput
        ? categoryInput.value
        : "all";

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });


    container.innerHTML = "";


    if (filteredProducts.length === 0) {

        container.innerHTML = `
            <p>No products found.</p>
        `;

        return;
    }


    filteredProducts.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.category}</p>

                    <p class="price">
                        ₹${product.price}
                    </p>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>
        `;
    });
}


// Add product to cart

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    const existingProduct = cart.find(
        item => item.id === id
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    alert(`${product.name} added to cart!`);
}


// Save cart

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


// Update cart count

function updateCartCount() {

    const countElement =
        document.getElementById("cart-count");

    if (!countElement) return;

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    countElement.textContent = totalItems;
}


// Display cart

function displayCart() {

    const container =
        document.getElementById("cart-container");

    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="cart-total">
                <h2>Your cart is empty 🛒</h2>
                <br>
                <a href="products.html" class="btn">
                    Continue Shopping
                </a>
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    cart.forEach(item => {

        container.innerHTML += `

            <div class="cart-item">

                <div>
                    <h3>${item.name}</h3>

                    <p>₹${item.price}</p>
                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;
    });


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    container.innerHTML += `

        <div class="cart-total">

            <h2>
                Total: ₹${total}
            </h2>

            <button
                class="checkout-btn"
                onclick="checkout()"
            >
                Proceed to Checkout
            </button>

        </div>
    `;
}


// Change quantity

function changeQuantity(id, amount) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== id
        );

    }


    saveCart();

    displayCart();
}


// Remove product

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    displayCart();
}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    alert(
        "Order placed successfully! 🎉"
    );


    cart = [];

    saveCart();

    displayCart();
}


// Mobile menu

function toggleMenu() {

    const nav =
        document.querySelector(".nav-links");

    if (nav) {

        nav.classList.toggle("active");

    }
}


// Run when page loads

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        displayProducts();

        displayCart();

    }
);