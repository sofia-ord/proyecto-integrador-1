//filtros y cards
const productosContainer = document.querySelector(".products-container");
const menuContainer = document.querySelector(".container");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");
//toggle menu - navbar
const menuBtn = document.querySelector(".bars-menu"); //fijarme si funciona porque el profe en el ejercicio agarra un div padre.
const barsMenu = document.querySelector(".navbar__list");
//carrito de compra
const cartMenu = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
const overlay = document.querySelector(".overlay");

const successModal = document.querySelector(".add-modal");

//seccion de contacto
const contactForm = document.querySelector(".formulario");
const inputName = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const textArea = document.getElementById("mensaje");

//setear el carrito

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const createProductTemplate = (product) => {
  const { id, name, price, cardImg } = product;
  return `
    <div class="product">
              <img class="product-img" src=${cardImg} alt="${name}" />
              <div class="product-info">
                <h3>${name}</h3>
                <span>${price}</span>
              </div>

              <div class="product-btns">
                <button class="product-btn btn"
                data-id='${id}'
                data-name='${name}'
                data-price='${price}'
                data-img='${cardImg}'>Take Away</button>
              </div>
            </div>`;
};
const renderProducts = (productList) => {
  productosContainer.innerHTML += productList.map(createProductTemplate).join("");
};

//VER MAS
const isLastIndexOf = () => {
  return appState.currentIndexProducts === appState.productsLimit - 1;
};

//renderizas mas productos

const showMoreProducts = () => {
  appState.currentIndexProducts += 1;

  let { products, currentIndexProducts } = appState;
  renderProducts(products[currentIndexProducts]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

//filtros

//cambiar el estado de los filtros

const changeBtnActiveState = (selectedCategory)=>{
  const categories = [...categoriesList];
  categories.forEach((categoryBtn)=>{
    if(categoryBtn.dataset.category !== selectedCategory){
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
  
};

//cambiar el activo del filtro
const changeFilterState = (btn)=>{
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

//determinar si un filtro esta inactivo

const isInactiveFilterBtn = (element)=>{
  return(element.classList.contains("category") && !element.classList.contains("active"));
};

//funcion para cuando el  usuario toca un boton que ya esta activo (no vuelva a hacer el proceso de filtrado)
const applyFilter = (event)=>{
  const {target} = event
  if(!isInactiveFilterBtn(target)) return; //es igual a decir que hay un filtro activo es como un (- x - = +)
  productosContainer.innerHTML = "";

  changeFilterState(target)
  if(appState.activeFilter){
    renderFilteredProducts();
    appState.currentIndexProducts = 0;
    return;
  }

  renderProducts(appState.products[0]);
};

//filtrar productos y renderizarlos

const renderFilteredProducts = ()=> {
  const filteredProducts = productsContainer.filter((product) => product.category === appState.activeFilter);
  renderProducts(filteredProducts)
}

/*                                     CARRITO            */
//Menu interface
//mostrar u ocultar el menu hamburguesa y el overlay

const toggleMenu = ()=> {
  barsMenu.classList.toggle("open-menu")
  if(cartMenu.classList.contains("open-cart")){
    cartMenu.classList.remove("open-cart")
    return;
  }
  overlay.classList.toggle("show-overlay")
}

const toggleCart =()=> {
  cartMenu.classList.toggle("open-cart")
  if(barsMenu.classList.contains("open-menu")){
    barsMenu.classList.remove("open-menu")
    return;
  }
  overlay.classList.toggle("show-overlay")
}

//cerrar el menu hamburguesa y el overlay cuando se hace click en un link

const closeOnClick = (e)=>{
  if(!e.target.classList.contains("navbar__link")) return;
    barsMenu.classList.remove("open-menu")
    overlay.classList.remove("show-overlay")
};

//cerrar el menu hamburguesa, carrito y overlay cuando se hace scroll

const closeOnScroll = ()=>{
  if(!barsMenu.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")) return;
  barsMenu.classList.remove("open-menu")
  cartMenu.classList.remove("open-cart")
  overlay.classList.remove("show-overlay")
};

//cerrar el menu hamburguesa y carrito haciendo click en el overlay

const closeOnOverlayClick = ()=>{
  barsMenu.classList.remove("open-menu")
  cartMenu.classList.remove("open-cart")
  overlay.classList.remove("show-overlay")
}

//agregar items al carrito

//crear template del carrito
const createCartProductTemplate = (cartProduct) => {
  const { id, name, price, img, quantity } = cartProduct;
  return `    
    <div class="cart-item">
      <img class="cart-img" src=${img} alt="${name}" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <p class="item-bid">Precio</p>
        <span class="item-price">${price}</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>`;
};

const renderCart = ()=> {
  if(!cart.length){
  cartContainer.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }

  cartContainer.innerHTML = cart.map(createCartProductTemplate).join("")
};

//obtener el total de la compra

const getCartTotal = ()=> {
  return cart.reduce((accumulator, current)=> accumulator + Number(current.price) * current.quantity, 0)
};

// mostrar el total de la compra

const showCartTotal = ()=> {
  total.innerHTML = `$${getCartTotal().toFixed(2)}`
}

//actualizar la burbuja segun la cantidad de productos en el carrito

const renderCartBubble = ()=> {
  cartBubble.textContent = cart.reduce((acc,cur)=> acc + cur.quantity, 0)
}

// habilitar o desabilitar un boton 

const disableBtn = (btn)=> {
  if(!cart.length){
    btn.classList.add("disabled")
  } else {
    btn.classList.remove("disabled")
  }
}

// guardar el carrito en el localstorage

const saveCart = ()=> {
  localStorage.setItem("cart", JSON.stringify(cart))
}
// modificar el estado del carrito -- cuando se ejecute se van a ejecutar un monton de otras funciones

const updateCartState = ()=> {
  saveCart()
  renderCart()
  showCartTotal()
  disableBtn(buyBtn)
  disableBtn(deleteBtn)
  renderCartBubble()
}

//crear un objeto con info del producto

const createProductData = ({id,name,price,img}) => {
 return {
   id,
   name,
   price,
   img
 };
};
// saber si el producto ya existe en el carrito

const isExistingCartProduct = (product) =>{
  return cart.find((item)=> item.id === product.id)
}

// agregar una unidad a un producto que ya existe en el carrito

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct)=> cartProduct.id === product.id ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct);
}

// Crear un objeto con la  info del producto  que se quiere agregar al carrito

const createCartProduct = (product)=> {
  cart = [... cart, {...product,quantity:1}]
}

//mostrar el modal de exito al agregar o añadir un producto

const showSuccessModal = (msg)=> {
  successModal.classList.add("active-modal")
  successModal.textContent = msg
  setTimeout(()=>{
    successModal.classList.remove("active-modal")
  },1500)
} 


const addProduct = (e)=>{
  if(!e.target.classList.contains("product-btn")) return;
  const product = createProductData(e.target.dataset);
  if(isExistingCartProduct(product)){
    addUnitToProduct(product)
    showSuccessModal("Se agrego una unidad del producto al carrito")
  } else{
    createCartProduct(product)
    showSuccessModal("El producto se ha agregado al carrito")
  }
  updateCartState()
}

// agregar mas unidades a cada producto
const handlePlusBtnEvent = (id)=>{
  const existinCartProduct = cart.find((item)=> item.id === id)
  addUnitToProduct(existinCartProduct)
};

//restar unidades de productos en el carrito

const hadleMinusBtnEvent = (id)=> {
  const existinCartProduct = cart.find((item)=>item.id === id )
  if(existinCartProduct.quantity === 1){
    if(window.confirm("¿Desea eliminar el producto del carrito?")){
      removeProductFromCart(existinCartProduct)
    }
    return;
  }
  subtractProductUnit(existinCartProduct)
}

//remover producto del carrito
const removeProductFromCart = (product) =>{
  cart = cart.filter((item)=> item.id !== product.id)
  updateCartState()
}

//restar cantidad al producto

const subtractProductUnit = (product)=>{
  cart = cart.map((item) =>{
    return item.id === product.id ?
    {...item, quantity: Number(item.quantity) - 1}
    : item
  });
}

// manejar los eventos al apretar boton + o - en item del carrito

const handleQuantity = (e)=> {
  if(e.target.classList.contains("down")){
    hadleMinusBtnEvent(e.target.dataset.id)
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id)
  }

  updateCartState()
}

//vaciar el carrito

const resetCartItems = ()=>{
  cart = []
  updateCartState()
}

// completar la compra o vaciar carrito

const completeCartAction = (confirmMsg, succesMsg) =>{
  if(!cart.length) return;
  if(window.confirm(confirmMsg)){
    resetCartItems()
    alert(succesMsg)
  }
}

// mensaje de compra exitosa

const completeBuy = ()=> {
  completeCartAction("¿Desea completar su compra?","¡Gracias por su compra!")
}

// mensaje de vaciado del carrito

const deleteCart = ()=>
{
  completeCartAction("¿Desea vaciar el carrito?","¡No hay productos en el carrito!")
}

//SECCION DE CONTACTO
const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

const saveToLocalStorage = ()=> {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}
//establecer valores minimos y maximos, que el input no este vacio
const isEmpty = (input) =>{
  return !input.value.trim().length;
};

const isBetween = (input, min,max) =>{
  return input.value.length >= min && input.value.length <= max
}

const checkTextInput = (input)=>{
  let valid = false
  const minCharacters = 3
  const maxCharacters = 25

  if (isEmpty(input)) {
      showError(input, "Este campo es obligatorio")
      return;
  }

  if (!isBetween(input,minCharacters,maxCharacters)){
      showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`)
      return;
  }

  showSuccess(input)
  valid = true
  return valid;
}
//establecer los caracteres que se pueden utilizar - y que no sea un input vacio.
const isEmailValid = (input)=> {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim())
}

const checkEmail = (input)=> {
  let valid = false
  if(isEmpty(input)){
      showError(input, "El email es obligatorio")
      return;
  }
  if(!isEmailValid(input)){
      showError(input, "El email no es valido")
      return;
  }
  showSuccess(input)
  valid = true
  return valid;
}

// que el area de texto no este vacia - establecer un min y max de caracteres
const isEmptyTextArea = (textArea) => {
  return !textArea.value.trim().length;
}

const isBetweenTextArea = (textArea, min,max) =>{
  return textArea.value.length >= min && textArea.value.length <= max
}

const checkTexArea = (textArea)=>{
  let valid = false
  const minCharacters = 5
  const maxCharacters = 144

  if (isEmpty(textArea)) {
      showError(textArea, "Este campo es obligatorio")
      return;
  }

  if (!isBetweenTextArea(textArea,minCharacters,maxCharacters)){
      showError(textArea, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`)
      return;
  }

  showSuccess(textArea)
  valid = true
  return valid;
}
//Mostrar error en input - exito en input
const showError = (input,message)=>{
  const formField = input.parentElement
  formField.classList.remove("success")
  formField.classList.add("error")
  const error = formField.querySelector("small")
  error.style.display = "block"
  error.textContent = message
}

const showSuccess = (input)=>{
  const formField = input.parentElement
  formField.classList.remove("error")
  formField.classList.add("succes")
  const error = formField.querySelector("small")
  error.textContent = ""
}

// Mostrar error y exito en textArea

const showErrorTextArea = (textArea,message)=>{
  const formField = textArea.parentElement
  formField.classList.remove("success")
  formField.classList.add("error")
  const error = formField.querySelector("small")
  error.style.display = "block"
  error.textContent = message
}
const showSuccessTextArea = (textArea)=>{
  const formField = textArea.parentElement
  formField.classList.remove("error")
  formField.classList.add("succes")
  const error = formField.querySelector("small")
  error.textContent = ""
}

const validateContactForm = (e)=> {
  e.preventDefault()

  let isNameValid = checkTextInput(inputName);
  let isEmailValid = checkEmail(inputEmail);
  let isTextAreaValid = checkTexArea(textArea);

  let isValidContactForm = isNameValid && isEmailValid && isTextAreaValid;

  if(isValidContactForm) {
    contacts.push({
      name:inputName.value,
      email:inputEmail.value,
      textArea:textArea.value
    })
    saveToLocalStorage(contacts)
    alert("Tu mensaje se ha enviado con exito, recibiras una respuesta en tu correo")
    window.location.href = "home.html"
  }
}
//funcion inicializadora
const init = ()=>{
  renderProducts(appState.products[0])
  showMoreBtn.addEventListener("click", showMoreProducts)
  categoriesContainer.addEventListener("click", applyFilter)
  cartBtn.addEventListener("click", toggleCart)
  menuBtn.addEventListener("click", toggleMenu)
  window.addEventListener("scroll", closeOnScroll)
  barsMenu.addEventListener("click",closeOnClick)
  overlay.addEventListener("click", closeOnOverlayClick)
  document.addEventListener("DOMContentLoaded", renderCart)
  document.addEventListener("DOMContentLoaded", showCartTotal)
  productosContainer.addEventListener("click",addProduct)
  cartContainer.addEventListener("click", handleQuantity)
  buyBtn.addEventListener("click",completeBuy)
  deleteBtn.addEventListener("click",deleteCart)
  disableBtn(buyBtn)
  disableBtn(deleteBtn)
  renderCartBubble(cart)

  //seccion contacto
  contactForm.addEventListener("submit",validateContactForm);
  inputName.addEventListener("input",()=>checkTextInput(inputName))
  inputEmail.addEventListener("input",()=>checkEmail(inputEmail))
  textArea.addEventListener("textarea", ()=>checkTexArea(textArea))
}

init()