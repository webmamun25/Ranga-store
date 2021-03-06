// fetch url 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h3>Average rating:${product.rating.rate}</h3>
      <h3>Rating count:${product.rating.count}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick="Details(${product.id})" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// how many product selected 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  
  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

//Deatils of single product
const Details=(id)=>{
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>getData(data))
}

const getData=(data)=>{
  console.log(data)
  const header = document.getElementById('card-main').style.display="block";
  const main = document.getElementById('card-title')
  main.innerText = `card title:${data.title} `
  const des = document.getElementById('describe')
  des.innerText = `Description:${data.description}`
  const amount = document.getElementById('taka')
  amount.innerText = `Price:${data.price}`
  
}
//return value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
 
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
