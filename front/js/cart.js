let cart;
let totalPrice = 0;
let totalPriceCart = document.querySelector("#totalPrice");
const priceProduct = document.querySelectorAll(".priceProduct");

//Fonction qui supprime un élément du panier
function deleteItemOfCart() {

  //On récupère les éléments ".deleteItem" (les boutons de suppression) et on les stocks dans un tableau
  const deleteItem = document.querySelectorAll(".deleteItem");

  //On récupère tous les produits du panier et on les stock dans un tableau
  const itemCart = document.querySelectorAll(".cart__item");
  let index;

  //On boucle sur les éléments "supprimer"
  deleteItem.forEach(item => {

    //On ajoute un écouteur d'événement "click" sur chaque élément "supprimer"
    // le "e" représente l'évènement et permet d'accéder à l'élément clicker comme ca : e.target.value
    // e représente l'évènement "click" qui est un objet. Cet objet contient une clé "target" qui contient l'élément html sur lequel on a clické
    item.addEventListener("click", (e) => {

      //indexSupp est une variable qui stock l'index de l'élément "supprimer" dans le tableau "deleteItem"
      let indexSupp = [...deleteItem].indexOf(item);

      //Cart va stocker la valeur qui se trouve dans le localStroage avec la clé "item.dataset.id"
      cart = JSON.parse(localStorage.getItem(`${item.dataset.id}`));

      //Je récupère l'index de l'élément que je souhaite supprimé dans le tableau cart (qui contient les éléments du localStorage)
      index = cart.indexOf(item);

      //Je supprime l'élément "couleur" dans mon tableau cart
      cart.splice(index, 1)
      //Je supprime l'élément "quantité" dans mon tableau cart
      cart.splice(index, 1);

      //Je push cart dans le localStorage
      localStorage.setItem(`${item.dataset.id}`, JSON.stringify(cart));

      //If le cart est vide, alors supprime l'item dans le localStorage pour éviter d'avoir un tableau vide qui m'empêchera d'ajouter le même produit plus tard
      if (cart.length === 0) {
        localStorage.removeItem(`${item.dataset.id}`);
      } 
      
      //Je supprime l'élément du HTML pour qu'il disparaisse du panier
      itemCart[indexSupp].remove();

      //Fonction qui mets à jour le prix total
      updateTotalPrice(); 
    
    })
  })
}

function updateTotalPrice() {

  const priceProduct = document.querySelectorAll(".priceProduct");
  totalPrice = 0;

  priceProduct.forEach((price) => {
      
      totalPrice += parseInt(price.textContent);
      totalPriceCart.textContent = totalPrice;
  })  
}

function handleOnChange() {
  const inputQty = document.querySelectorAll(".itemQuantity");
  const qtyInput = document.getElementsByClassName("qty");
  const nameProduct = document.getElementsByClassName("nameProduct");
  const priceProduct = document.getElementsByClassName("priceProduct");

  inputQty.forEach(input => {

    input.addEventListener("change", (e) => {

      let index = [...inputQty].indexOf(input);
      let price = parseInt(localStorage.getItem(`${nameProduct[index].textContent}`));

      if (!localStorage.getItem(`${nameProduct[index].textContent}`)) {

        localStorage.setItem(`${nameProduct[index].textContent}`, JSON.stringify(parseInt(priceProduct[index].textContent)));
      }

      qtyInput[index].textContent = `Qté : ${e.target.value}`;
      priceProduct[index].textContent = price * parseInt(e.target.value);

      updateTotalPrice();
    }) 
  })
}

function displayProductWithSameId(index1, index2, product) {

  document.querySelector("#cart__items").innerHTML += `
  <article class="cart__item" data-id="${product._id}">
    <div class="cart__item__img">
      <img src=${product.imageUrl} alt=${product.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2 class="nameProduct">${product.name}</h2>
        <p>${cart[index1]}</p>
        <p class="priceProduct">${product.price * cart[index2]} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p class="qty">Qté : ${cart[index2]}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[index2]}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id}" >Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

  totalPrice += parseInt(`${product.price * cart[index2]} €`)
  totalPriceCart.textContent = totalPrice;

}
 
function addCartFromProduct() {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        data.map((product) => 
        {
          if (localStorage.getItem(`${product._id}`)) {

            cart = JSON.parse(localStorage.getItem(`${product._id}`));

            let nbrElements = cart.length / 2;
            let length = 0;

            for (let i = 0; i < nbrElements; i++) {

              displayProductWithSameId(length, length + 1, product);
              length += 2;
            }

          }
          
        })
      })
      
      setTimeout(function() {
         handleOnChange(); 
         deleteItemOfCart();
        }, 1000);
  }
    
  addCartFromProduct();

  setTimeout(() => {
    localStorage.clear();
  }, 300000);

 




    
  

 

