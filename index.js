import { products } from "./data.js";
const body = document.querySelector("body");
const container = document.querySelector(".container");

const storeContainer = document.querySelector(".store-container");
const quantity = document.getElementById("quantity");
const cartContainer = document.querySelector(".cart-container");
const secondCart = document.querySelector(".second-cart");
let globale = 0;

let listProducts = [];

//***************************************************************


function afficherProduit(products) {
  storeContainer.innerHTML = "";
  products.forEach((element) => {
    storeContainer.innerHTML += `<div class="item grid-item">
<img data-img="${element.preview}" class="computers computers-css" src=${element.preview} alt="" />
<div class="dat">
  <div class="names">${element.name}</div>
  <div class="prices">${element.price}</div>
  <div class="btn-add-to-cart">
    <button class="btn-add">Add to Cart</button>
  </div>
  <div class="stars"></div>
</div>
</div>`;
  });
}
afficherProduit(products);
const btnAdd = document.querySelectorAll(".btn-add");
const dat = document.querySelectorAll(".dat");
const names = document.querySelectorAll(".names");
const prices = document.querySelectorAll(".prices");
const btnAddToCart = document.querySelectorAll(".btn-add-to-cart");
const stars = document.querySelectorAll(".stars");
const computers = document.querySelectorAll(".computers");
const computersCss = document.querySelectorAll(".computers-css");
const gridItems = document.querySelectorAll(".grid-item");
const divImage = document.querySelectorAll(".div-image");

const list = document.querySelector(".list");
const listCart = document.querySelector(".list-cart");
const total = document.querySelector(".total");





const tab = [];
let index = 1;
let count = 0;
let somme = 0;
// ========================== INITIALISATION DE LOCALE STORAGE ===========================

if (!localStorage.getItem("keyTab")) {
  localStorage.setItem("keyTab",JSON.stringify(tab));
}
if (!localStorage.getItem("keyCount")) {
  localStorage.setItem("keyCount",JSON.stringify(count));
}
let countProduct = JSON.parse(localStorage.getItem("keyCount"));

let tabP = JSON.parse(localStorage.getItem("keyTab"));

//======================== METTRE A JOUR LOCALE STORAGE =======================
 function updateLStorageProduct() {
  localStorage.setItem('keyTab', JSON.stringify(tabP));
  localStorage.setItem('keyCount', JSON.stringify(countProduct));
} 
//======================== FONCTION POUR AFFICHER LA LISTE DES PRODUITS =======================
function afficherList(tabP) {
  secondCart.innerHTML ="";
  tabP.forEach(element => {
    secondCart.innerHTML += `<div class="ma-list">
    <img class="img-list" src="${element.imageCommande}" alt="" />
    <div class="nom-prix">
      <span>${element.nomCommande}</span>
      <p>${element.prixCommande} F x ${element.quantite} = ${element.prixCommande * element.quantite} F</p>
    </div>
      <img class="corbeille" src="images/corbeille.png" alt="" />
    </div>
    `;
        });
       
        tabP.forEach(element => {
          total.innerHTML = `${element.prixCommande * element.quantite}`
})

};
afficherList(tabP)
//===============FONCTION DIV ALERT AJOUT PRODUIT================================

function showCount() {
  quantity.textContent = countProduct;
}


//===============================================
btnAdd.forEach((elementAddCart) => {
  elementAddCart.addEventListener("click", () => {
    const nameProduct =elementAddCart.parentElement.parentElement.querySelector(".names").textContent;
    const priceProduct =elementAddCart.parentElement.parentElement.querySelector(".prices").textContent;
const imageProduct = elementAddCart.parentElement.parentElement.parentElement.querySelector('img').getAttribute("src");
    const commande = {
      nomCommande: nameProduct,
      prixCommande: priceProduct,
      imageCommande: imageProduct,
      quantite: index
    };
    let existeProduit = tabP.find((element) => element.nomCommande == commande.nomCommande);
    if (existeProduit) {
      existeProduit.countProduct++;
      countProduct++
      updateLStorageProduct()
      afficherList(tabP)
      updateTotal()
      showCount()
    } else {
      tabP.push(commande);
      countProduct++
      updateLStorageProduct()
      afficherList(tabP)
      updateTotal()
      showCount();
    }

  });
});
updateLStorageProduct()
showCount()

const maList = document.querySelector(".ma-list");
const openShopping = document.querySelector(".cart");
/* const clearCart = document.querySelector(".clear-cart");
clearCart.addEventListener("click", () => {
  maList.style.display = "none";
}); */
const clearCart = document.querySelector(".clear-cart");

if (clearCart) {
  clearCart.addEventListener("click", () => {
    maList.style.display = "none";
  });
}

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
/* const closeShopping = document.querySelector(".close-shopping");
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
}); */
const closeShopping = document.querySelector(".close-shopping");
if (closeShopping) {
  closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
  });
}

/* const corbeille = document.querySelector(".corbeille");
corbeille.addEventListener("click", () => {
  maList.style.display = "none";
}); */
let indexSrc = Object.entries(tabP);
const corbeille = document.querySelectorAll(".corbeille");
corbeille.forEach(element => {
if (element) {
  element.addEventListener("click", (e) => {
let ligne = e.target.parentElement;
/* ligne.remove(); */
let srcImage = ligne.querySelector('img').getAttribute("src");
let existeSrc = tabP.find(item => item.imageCommande === srcImage);


  });
}
});

/*  function zoomImage() {
  computers.forEach(element => {
    element.addEventListener('click', ()=>{
     const zoomer = body.innerHTML= `<img class="zoom" src=${element}></img>
      </div>`;
      console.log(zoomer);
    })
  });
}
zoomImage()
 */
//################ FONCTION POUR ZOOMER LES IMAGES###########
function zoomImage() {
  computers.forEach(element => {
    element.addEventListener('click', () => {
      const zoomer = document.createElement('div');
      zoomer.className = 'zoomer';
      zoomer.innerHTML = `<img class="zoom" src="${element.src}" alt="" />
                          <span class="close-zoom">Fermer</span>`;
      body.appendChild(zoomer);
     

      const closeZoom = document.querySelector('.close-zoom');
      closeZoom.addEventListener('click', () => {
        body.removeChild(zoomer);
      });
    });
  });
}

zoomImage();
//################ FONCTION POUR FILTRER LES IMAGES ###########
const searchBar = document.getElementById('search');
const searchBtn = document.getElementById('search_submit');
const all = document.getElementById('all');
const asus = document.getElementById('asus');
const lenovo = document.getElementById('lenovo');
const samsung = document.getElementById('samsung');
const macbook = document.getElementById('macbook');
const alienware = document.getElementById('alienware');



    all.addEventListener('click', ()=>{ 
      afficherProduit(products)  
      })
  

//AFFICHER ASUS
  let computerAsus =products.filter(function (e) {
    return e.Num == "Asus";
  });

    asus.addEventListener('click', ()=>{  
      afficherProduit(computerAsus) 
      })

  //AFFICHER LENOVO
  let computerLenovo =products.filter(function (e) {
    return e.Num == "Lenovo";
  });

    lenovo.addEventListener('click', ()=>{   
      afficherProduit(computerLenovo) 
      })


    //AFFICHER SAMSUNG
    let computerSamsung =products.filter(function (e) {
      return e.Num == "Samsung";
    });

      samsung.addEventListener('click', ()=>{ 
        afficherProduit(computerSamsung)   
        })

 
      //AFFICHER MACBOOK
  let computerMacBook =products.filter(function (e) {
    return e.Num == "MacBook";
  });
 
    macbook.addEventListener('click', ()=>{  
      afficherProduit(computerMacBook) 
      })
 

    //AFFICHER ALIENWARE
    let computerAlienware =products.filter(function (e) {
      return e.Num == "Alienware";
    });
      alienware.addEventListener('click', ()=>{   
        afficherProduit(computerAlienware) 
        })
   //################ FONCTION POUR FILTRER BAR DE RECHERCHE ###########
   searchBtn.addEventListener('click', ()=>{   
     if (searchBar.value  == "mac" || searchBar.value  == "Mac" || searchBar.value  == "MAC") {
      afficherProduit(computerMacBook) 
     }else if (searchBar.value  == "alienware" || searchBar.value  == "Alienware" || searchBar.value  == "ALIENWARE"){
      afficherProduit(computerAlienware)
     }else if (searchBar.value  == "samsung" || searchBar.value  == "Samsung" || searchBar.value  == "SAMSUNG"){
      afficherProduit(computerSamsung) 
     }else if (searchBar.value  == "lenovo" || searchBar.value  == "Lenovo" || searchBar.value  == "LENOVO"){
      afficherProduit(computerLenovo); 
     }else if (searchBar.value  == "asus" || searchBar.value  == "Asus" || searchBar.value  == "ASUS"){
      afficherProduit(computerAsus); 
     }
    })
    //__________________________CHAT GPT______________________
// ... (your existing code)

const totalSpan = document.querySelector(".total");

// Function to calculate and update the total
function updateTotal() {
  let totalPrice = 0;
  tabP.forEach((element) => {
    totalPrice += element.prixCommande * element.quantite;

    totalPrice.forEach((element)=>{
      totalSpan.textContent += element;
    })
  });

  
}

// Event listener for the "CLEAR CART" button
clearCart.addEventListener("click", () => {
  // Clear the local storage and reset the total
  localStorage.removeItem("keyTab");
  localStorage.removeItem("keyCount");
  tabP = [];
  countProduct = 0;
  quantity.textContent = countProduct;
  totalSpan.textContent = 0;
  updateLStorageProduct();
  afficherList(tabP);
  updateTotal(totalPrice)
});

// Event listener for the "EXPLORE" button in the cart
const exploreBtn = document.querySelector(".btn-explore");
exploreBtn.addEventListener("click", () => {
  // Hide the shopping cart and update the total
  body.classList.remove("active");
  updateTotal();
  
});

// Event listener for the "REMOVE" button in the cart
secondCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("corbeille")) {
    // Remove the product from the cart array and update the total
    const srcImage = e.target.parentElement.querySelector('img').getAttribute("src");
    const indexToRemove = tabP.findIndex((item) => item.imageCommande === srcImage);
    tabP.splice(indexToRemove, 1);
    countProduct--;
    updateLStorageProduct();
    afficherList(tabP);
    quantity.textContent = countProduct;
    updateTotal();
    updateTotal(totalPrice)
  }
});

// Function to initialize the total when the page loads
function initializeTotal() {
  let totalPrice = 0;
  tabP.forEach((element) => {
    totalPrice += element.prixCommande * element.quantite;
  });

  totalSpan.textContent = totalPrice;
}

// Call the initialization function
initializeTotal();

// ... (your existing code)

   

