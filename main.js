async function fetchAPIData() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then(
      (data) => (
        console.log(data.products),
        showProduct(data.products),
        wiperSlider(data.products)
      )
    );

  let itemPerPage = 10;
  let curentPage = 1;

  const pages = [];
  for (let i = 0; i < Math.ceil(fetchAPIData.length / itemPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastPage = curentPage * itemPerPage;
  const indexOfFirstPage = indexOfLastPage - itemPerPage;
  const curentItem = pages.slice(indexOfFirstPage, indexOfLastPage);
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

async function showProduct(data) {
  data.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="product.html?id=${product.id}"><img src="${product.thumbnail}" alt="${product.brand}">
          <div class="wiper-info">
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

//slider swiper

async function wiperSlider(data) {
  data.forEach((swiper) => {
    console.log(swiper);
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
      <a href="product.html?id=${swiper.id}"">
        <img src=" ${swiper.thumbnail}" alt="${swiper.title}" />
      </a>
      <p>${swiper.description}</p>
      <h3>${swiper.title}</h3>
       
  
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
