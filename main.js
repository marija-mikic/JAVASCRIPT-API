async function fetchAPIData() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => (console.log(data.products), showProduct(data.products)));
}
//onst IMG_URL = "https://image.tmdb.org/t/p/w500 ";
const global = {
  curentPage: window.location.pathname,
};
fetchAPIData();
function init() {
  switch (global.curentPage) {
    case "/":
    case "/index.html":
      fetchAPIData();
      break;
    case "/user.html":
      console.log("User");
      break;
  }
}
document.addEventListener("DOMContentLoaded", init);

async function showProduct(data) {
  data.forEach((product) => {
    const { title, profile_path, overview, id } = product;
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
