async function fetchAPIData() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => (console.log(data.products), wiperSlider(data.products)));
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
      // wiperSlider();
      fetchAPIData();
      break;
    case "/product.html":
      APIData();
      break;
  }
}
document.addEventListener("DOMContentLoaded", init);

async function productDetail(product) {
  const productId = window.location.search.split("=")[1];

  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
            <img src="${product.images[2]}" />
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

//slider swiper

async function wiperSlider(data) {
  data.forEach((swiper) => {
    console.log(swiper);
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
      <a href="product.html?id=${swiper.id}"">
        <img src=" ${swiper.images[0]}" alt="${swiper.title}" />
      </a>
      <p>${swiper.title}</p>
       
  
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}
initSwiper();

var url = "https://dummyjson.com/products";
var productData = [];
var itemsPerPage = 12;
var curentPage = 1;

async function dataTable() {
  await productTable();
  const pages = [];
  for (let i = 0; i < Math.ceil(productData.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastPage = curentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const curentItems = productData.slice(indexOfFirstPage, indexOfLastPage);
  console.log(curentItems);
  document.getElementById("popular-product").innerHTML = curentItems
    .map(
      (products) => `
         <div class="card">
    <a href="product.html?id=${products.id}"><img src="${products.images[2]}" alt="${products.brand}">
          <div class="wiper-info">
                <p2>${products.description}</p2>
                 
            </div>
          </a>
          <p>${products.category}</p>
          <div class="card-body">
            <h5 class="card-title">${products.brand}</h5>
            </div>
          </div>
    `
    )
    .join("");
}
dataTable();

async function productTable() {
  const data = await fetch(url);
  const res = await data.json();
  productData = res.products;
  console.log(productData);
}
productTable();
