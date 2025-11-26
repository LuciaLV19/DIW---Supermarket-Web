const thumbnail = document.querySelectorAll(".thumbnail");
const imageMain = document.querySelector(".image-main");
const cards = document.querySelectorAll(".card-img");

// Coloca las imagenes de fondo en las tarjetas
cards.forEach(card => {
  const imgName = card.dataset.img;
  card.style.backgroundImage = `url('source/${imgName}')`;
});

let cart = [];

// Coloca las imagenes de fondo en las tarjetas
thumbnail.forEach(img => {
    img.addEventListener("click", () =>{
        imageMain.src = img.src;
        thumbnail.forEach(img => img.classList.remove("active"));
        img.classList.add("active");
    })
});

/**
 * Maneja los datos del que se agregan al carrito.
 * @param {HTMLButtonElement} button El botón de agregar al carrito.
 */
function handleAddToCart(button) {
    const quantityInput = button.closest(".purchase-options").querySelector(".quantity-input");

    const productName = button.closest(".product-info").querySelector(".product-title-detail").textContent;
    const productPrice = parseFloat(button.closest(".product-info").querySelector(".current-price").textContent.replace('€','').trim());
    const productQuantity = parseInt(quantityInput.value);
    addToCart({productName, productPrice, productQuantity});
}

/**
 * Actualiza la cantidad de productos en el carrito.
 */
function updateCart() {
    document.querySelector(".cart-count").textContent = cart.length;
}

/**
 * Añade un producto al carrito y actualiza la cantidad.
 * @param {Object} product The product to add to the cart.
 */
function addToCart(product) {
    cart.push(product);
    updateCart();
    console.log(cart);
}

// Maneja el clic en el botón de agregar al carrito
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    const original = button.textContent;
    button.addEventListener("click", () => {
        handleAddToCart(button);

        if (button.dataset.timeoutId) {
            clearTimeout(Number(button.dataset.timeoutId));
        }

        button.textContent = "¡Añadido! ✓";
        button.style.background = "#28a745";

        button.dataset.timeoutId = setTimeout(() => {
            button.textContent = original;
            button.style.background = "#e63946";
        },1000);
    });
})



