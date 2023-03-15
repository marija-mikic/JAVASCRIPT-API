async function fetchAPIData() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => (console.log(data.products), showProduct(data.products)));
}
const productId = window.location.search.split("=")[1];

async function APIData() {
  fetch("https://dummyjson.com/products/" + productId)
    .then((res) => res.json())

    .then((data) => {
      console.log(data), productDetail(data);
    });
}

const global = {
  curentPage: window.location.pathname,
};
//fetchAPIData();
function init() {
  switch (global.curentPage) {
    case "/":
    case "/index.html":
      fetchAPIData();
      break;
    case "/product.html":
      APIData();
      break;
  }
}
document.addEventListener("DOMContentLoaded", init);

async function showProduct(data) {
  data.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="product.html?id=${product.id}"><img src="${product.thumbnail}" alt="${product.brand}">
          <div class="movie-info">
                <p2>${product.description}</p2>
                 
            </div>
          </a>
          <p>${product.category}</p>
          <div class="card-body">
            <h5 class="card-title">${product.brand}</h5>
            
          </div>
        `;

    document.querySelector("#popular-product").appendChild(div);
  });
}
async function productDetail(product) {
  const productId = window.location.search.split("=")[1];

  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
            <img src="${product.thumbnail}" />
          </div>
          <div>
            <h2>${product.description}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${product.title}
            </p>
            
            <p>
              ${product.category}
            </p>

           
          </div>`;
  document.querySelector("#product-details").appendChild(div);
}
