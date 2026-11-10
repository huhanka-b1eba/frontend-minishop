const productElem = document.querySelector("#products");
const searchBtn = document.querySelector("#search-btn");
const loadBtn = document.querySelector("#load-btn");
const addBtn = document.querySelector("#add-btn");
const inputElem = document.querySelector("#search");
const messageElem = document.querySelector("#message");

async function getProduct(limit) {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

function renderProducts(products) {
    productElem.replaceChildren()

    products.forEach(product => {
        const articleElement = document.createElement("article");
        articleElement.classList.add("product-card");

        const imgElem = document.createElement("img");
        imgElem.classList.add("product-image");
        imgElem.src = product.thumbnail;
        imgElem.alt = product.title;

        const titleElem = document.createElement("h2");
        titleElem.classList.add("product-title");
        titleElem.innerText = product.title;

        const descriptionElem = document.createElement("p");
        descriptionElem.classList.add("product-price");
        descriptionElem.innerText = product.price;

        articleElement.append(titleElem, imgElem, descriptionElem);
        productElem.appendChild(articleElement);
    })
}

loadBtn.addEventListener("click", async () => {
    messageElem.innerText = "Loading...";
    loadBtn.disabled = true;
    try {
        const data = await getProduct(8);
        messageElem.innerText = "";
        loadBtn.disabled = false;
        renderProducts(data.products);
    } catch (error) {
        messageElem.innerText = error.message;
    }
});

async function searchProducts(query) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

searchBtn.addEventListener("click", async () => {
    try {
        const query = inputElem.value.trim();
        const data = await searchProducts(query);
        renderProducts(data.products);
    } catch (error) {
        throw new Error(error);
    }
})

async function addProduct(product) {
    const response = await fetch(`https://dummyjson.com/products/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

addBtn.addEventListener("click", async () => {
    const product = {
        title: "Gaming Mouse",
        price: 250
    }

    messageElem.innerText = "Loading...";

    try {
        const data = await addProduct(product);
        console.log(data);
        messageElem.innerText = `Товар успешно ${product.title} добавлен`;
    } catch (error) {
        messageElem.innerText = error.message;
    }
})
