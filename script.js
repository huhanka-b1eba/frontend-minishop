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

