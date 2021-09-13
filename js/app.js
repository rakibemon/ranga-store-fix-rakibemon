// Load products
const loadProducts = () => {
  /* const url = `https://fakestoreapi.com/products`;
  fetch(url) */
  fetch('../js/data.json')
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((product) => product);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <figure>
    <img class="product-image" src=${image} alt="Product Image"></img>
      </figure>
      <h3>${product.title.slice(0, 25)}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p> <i class="fas fa-star"></i> <b>${product.rating.rate}</b>/5 (${product.rating.count}) </P>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-primary text-white">Details</button></div>
      `

      ;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
// add to cart button event listener
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};
// get value from myCart table
const getInputValue = (id) => {
  const element = document.getElementById(id);
  const elementText = element.innerText
  const converted = parseFloat(elementText);
  return converted;
};
// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
loadProducts();
