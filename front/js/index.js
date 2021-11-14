// const test = document.querySelector("#test");
// const items = document.querySelector(".items");

// function createProduct(data, i) {

//     /* creation parent a */

//     const a = document.createElement("a");
//     items.appendChild(a);

//     /* creation parent article */

//     const article = document.createElement("article");
//     a.appendChild(article);

//     /* creation enfants article */

//     const imgArticle = document.createElement("img");
//     const titreArticle = document.createElement("h3");
//     const descriptionArticle = document.createElement("p");

//     article.appendChild(imgArticle);
//     article.appendChild(titreArticle);
//     article.appendChild(descriptionArticle);

//     imgArticle.src = data[i].imageUrl;
//     imgArticle.alt = "photo du meuble";

//     titreArticle.className = "productName";
//     titreArticle.textContent = data[i].name;

//     descriptionArticle.className = "productDescription";
//     descriptionArticle.textContent = data[i].description;
// }

function getDataFromApi() {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
       
        data.map((product) => {
          
          document.querySelector(".items").innerHTML += `
              <a href=./product.html?id=${product._id}>
                  <article>
                    <img src=${product.imageUrl} alt=${product.altTxt}>
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}
                  </article>
              </a>`;
        });
      });
  }

 getDataFromApi();
