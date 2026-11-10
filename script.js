const productElem = document.querySelector("#products");
const searchBtn = document.querySelector("#search-btn");
const loadBtn = document.querySelector("#load-btn");
const addBtn = document.querySelector("#add-btn");

async function getProduct(limit) {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

function renderProducts(products) {

    products.forEach(product => {
        const articleElement = document.createElement("article");
        articleElement.classList.add("product-card");

        const imgElem = document.createElement("img");
        imgElem.classList.add("product-image");
        imgElem.src = product.thumbnail;
        imgElem.alt = product.title;

        const titleElem = document.createElement("h2");
        titleElem.classList.add("product-title");
        titleElem.innerText = product.name;

        const descriptionElem = document.createElement("p");
        descriptionElem.classList.add("product-price");
        descriptionElem.innerText = product.price;


    })
}

