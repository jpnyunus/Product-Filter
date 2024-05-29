fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.querySelector(".products");
        const searchInput = document.querySelector(".search");
        const categoriesContainer = document.querySelector(".cats");
        const priceRange = document.querySelector(".priceRange");
        const priceValue = document.querySelector(".priceValue");

        const displayProducts = (filteredProducts) => {
            productsContainer.innerHTML = filteredProducts.map(
                (product) =>
                `
                <div class="product">
                    <img src=${product.img} alt="">
                    <span class="name">${product.name}</span>
                    <span class="priceText">$${product.price}</span>
                </div>
                `
            ).join('')
        }

        displayProducts(data);

        searchInput.addEventListener('keyup', (e) => {
            const value = e.target.value.toLowerCase();

            if (value) {
                displayProducts(data.filter(item => item.name.toLowerCase().includes(value)));
            } else {
                displayProducts(data);
            }
        });

        const setCategories = () => {
            const allCats = data.map(item => item.cat);
            const categories = [
                "All", ...allCats.filter((item, i) => {
                return allCats.indexOf(item) === i;
                })
            ];

            categoriesContainer.innerHTML = categories.map((cat) => `<span class="cat">${cat}</span>`).join("");

            categoriesContainer.addEventListener("click", (e) => {
                const selectedCat = e.target.textContent;

                selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter((item) => item.cat === selectedCat));
            });
        }

        setCategories();

        const setPrices = () => {
            const priceList = data.map(item => item.price);
            const minPrice = Math.min(...priceList);
            const maxPrice = Math.max(...priceList);

            priceRange.min = minPrice;
            priceRange.max = maxPrice;
            priceRange.value = maxPrice;
            priceValue.textContent = "$" + maxPrice;

            priceRange.addEventListener("input", (e) => {
                priceValue.textContent = "$" + e.target.value;
                displayProducts(data.filter((item) => item.price <= e.target.value));
            });
        }

        setPrices();
    });
