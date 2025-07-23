// style.js

// Highlight active navigation link
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav .links a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = "#ffcb77";
            link.style.textDecoration = "underline";
        }
    });

    // Attach Click Events to Products (only on products.html)
    if (window.location.pathname.includes("products.html")) {
        const products = document.querySelectorAll(".product");
        products.forEach(product => {
            product.addEventListener("click", () => {
                const productName = product.querySelector("h3").textContent.trim();
                showRecipe(productName);
            });
        });
    }

    // Initialize cart display
    updateCart();
});

// 🧁 Recipe Data
const recipes = {
    "Chocolate Cake": `<h3>Chocolate Cake Recipe</h3>...`, // Truncated for brevity
    "Croissants": `<h3>Croissants Recipe</h3>...`,
    "Macarons": `<h3>Macarons Recipe</h3>...`,
    "Red Velvet Cake": `<h3>Red Velvet Cake Recipe</h3>...`,
    "Donuts": `<h3>Donuts Recipe</h3>...`,
    "Cupcakes": `<h3>Cupcakes Recipe</h3>...`,
    "Kaju Katli": `<h3>Kaju Katli Recipe</h3>...`,
    "Dual Forest Cake": `<h3>Dual Forest Cake Recipe</h3>...`,
    "Chocolate Trifle Cake": `<h3>Chocolate Trifle Cake Recipe</h3>...`,
    "Pinata": `<h3>Pinata Recipe</h3>...`,
    "Cookies": `<h3>Cookies Recipe</h3>...`,
    "Cream Roll": `<h3>Cream Roll Recipe</h3>...`
};

// 🍰 Show Recipe Modal
function showRecipe(recipeName) {
    const recipeContent = recipes[recipeName];
    if (!recipeContent) {
        alert("Recipe not found.");
        return;
    }

    const recipeModal = document.createElement("div");
    recipeModal.style.position = "fixed";
    recipeModal.style.top = "0";
    recipeModal.style.left = "0";
    recipeModal.style.width = "100%";
    recipeModal.style.height = "100%";
    recipeModal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    recipeModal.style.color = "white";
    recipeModal.style.padding = "20px";
    recipeModal.style.overflowY = "auto";
    recipeModal.style.zIndex = "1000";

    const recipeBox = document.createElement("div");
    recipeBox.style.backgroundColor = "#3b1f2b";
    recipeBox.style.padding = "20px";
    recipeBox.style.borderRadius = "10px";
    recipeBox.style.maxWidth = "600px";
    recipeBox.style.margin = "50px auto";

    recipeBox.innerHTML = recipeContent;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.marginTop = "20px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.backgroundColor = "#ff6f61";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";

    closeButton.addEventListener("click", () => {
        recipeModal.remove();
    });

    recipeBox.appendChild(closeButton);
    recipeModal.appendChild(recipeBox);
    document.body.appendChild(recipeModal);
}

// 🛒 Cart & Payment
let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartTotal = document.getElementById("cart-total");
    if (cartTotal) {
        cartTotal.innerText = `Total: ₹${total}`;
    }
}

function payNow() {
    if (total === 0) {
        alert("Your cart is empty!");
        return;
    }

    const options = {
        key: "rzp_test_YourTestKeyHere", // 🔁 Replace with your Razorpay test key
        amount: total * 100, // Razorpay accepts paisa (₹1 = 100)
        currency: "INR",
        name: "Sweet Treats Bakery",
        description: "Order Payment",
        handler: function (response) {
            alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
            cart = [];
            total = 0;
            updateCart();
        },
        prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999"
        },
        theme: {
            color: "#F37254"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}
