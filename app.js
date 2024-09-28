fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.querySelector(".products");
        const searchInput = document.querySelector(".search");
        const categoriesContainer = document.querySelector(".cats");
        const minPriceInput = document.querySelector(".minPrice");
        const maxPriceInput = document.querySelector(".maxPrice");
        const filterPriceButton = document.querySelector(".filterPrice");

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
            ).join('');
        };

        // Initial product display
        displayProducts(data);

        // Search functionality
        searchInput.addEventListener('keyup', (e) => {
            const value = e.target.value.toLowerCase();
            if (value) {
                displayProducts(data.filter(item => item.name.toLowerCase().includes(value)));
            } else {
                displayProducts(data);
            }
        });

        // Set categories
        const setCategories = () => {
            const allCats = data.map(item => item.cat);
            const categories = [
                "All", ...allCats.filter((item, i) => allCats.indexOf(item) === i)
            ];

            categoriesContainer.innerHTML = categories.map((cat) => `<span class="cat">${cat}</span>`).join("");

            categoriesContainer.addEventListener("click", (e) => {
                const selectedCat = e.target.textContent;
                selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter((item) => item.cat === selectedCat));
            });
        };

        setCategories();

        // Price filtering
        filterPriceButton.addEventListener("click", () => {
            const minPrice = parseFloat(minPriceInput.value) || 0;
            const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

            displayProducts(data.filter((item) => item.price >= minPrice && item.price <= maxPrice));
        });
    });
