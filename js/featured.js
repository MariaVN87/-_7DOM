let products_add = []

async function productData() {
  try {
    const response = await fetch("data.json")
    if (!response.ok) {
      throw new Error("Получена ошибка при обработке data.json")
    }
    const data = await response.json()
    const feturedItems = document.querySelector(".product_cards")
    data.products.forEach(({ image, name_img, name_product, product_description, price_product }) => {
      const productCard = `
         <div class="card_product">
            <div class="add-card">
               <img class="product_img" src="./image/foto/${image}" alt="${name_img}">
                  <div class="text_card">
                     <h5>${name_product}</h5>
                     <p class="product-description">${product_description}</p>
                     <p class="price-product">${price_product}</p>
               </div>
            </div>
         </div> `
      feturedItems.insertAdjacentHTML("beforeend", productCard)
    })
    const btnAdd = document.querySelectorAll(".add-card")

    btnAdd.forEach((el) => {
      el.addEventListener("click", () => {
        const btnAddCard = el.closest(".card_product")
        const product = {
          image: btnAddCard.children[0].children[0],
          price_product: btnAddCard.children[0].children[1].children[2].innerHTML,
          name_product: btnAddCard.children[0].children[1].children[0].innerHTML,
          name_img: btnAddCard.children[0].children[0].alt,
        }
        if (products_add.length === 0) {
          createWrap()
        }
        products_add.push(product)
        add()
      })
    })
  } catch (error) {
    console.error(error)
  }
}
productData()
