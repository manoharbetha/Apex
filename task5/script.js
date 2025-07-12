<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Cart - ShopMate</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Your Cart</h1>
    <nav>
      <a href="index.html">Home</a>
    </nav>
  </header>

  <main class="cart-container" id="cart-container"></main>

  <script>
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById("cart-container");

    function updateCartDisplay() {
      container.innerHTML = cart.length
        ? cart.map((item, index) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div>
              <h3>${item.name}</h3>
              <p>₹${item.price}</p>
              <button onclick="removeItem(${index})">Remove</button>
            </div>
          </div>
        `).join("")
        : "<p>Your cart is empty.</p>";
    }

    function removeItem(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }

    updateCartDisplay();
  </script>
</body>
</html>
