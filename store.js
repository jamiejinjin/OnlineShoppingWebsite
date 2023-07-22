var removeCartButtons = document.getElementsByClassName("btn-danger");
for(var i=0;i<removeCartButtons.length;i++){
    var removeButton = removeCartButtons[i];
    removeButton.addEventListener('click',removeCartItem)
}

var quantityInput = document.getElementsByClassName('cart-quantity-input');
for(var i=0;i<quantityInput.length;i++){
    var quantityinput = quantityInput[i];
    quantityinput.addEventListener('change',quantityChanged)
}

var addToCartButtons = document.getElementsByClassName('shop-item-button');
for(var i=0;i<addToCartButtons.length;i++){
    var addButton = addToCartButtons[i];
    addButton.addEventListener('click',addToCartClicked);
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)

function purchaseClicked(){
    alert("Thank you for your purchase");
    var cartItems= document.getElementsByClassName('cart-items')[0];
    console.log(cartItems.childNodes)
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    };
    updateCartTotal();
}

function addToCartClicked(e){
    var addToCart = e.target;
    var shopItem = addToCart.parentElement.parentElement;
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    var itemTitle = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var itemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    addItemToCart(image,itemTitle,itemPrice);
    updateCartTotal();
}

function addItemToCart(image,itemTitle,itemPrice){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRowContents = `
    <div class="cart-item cart-column">
         <img class="cart-item-image" src="${image}" width="100" height="100">
         <span class="cart-item-title">${itemTitle}</span>
    </div>
    <span class="cart-price cart-column">${itemPrice}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
   </div>`

    var itemName = cartItems.getElementsByClassName('cart-item-title');
    for(var i=0;i<itemName.length;i++){
    if(itemName[i].innerText==itemTitle){
        alert('You have added this item before');
        return
    }}

   cartRow.innerHTML = cartRowContents;
   cartItems.append(cartRow);
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function removeCartItem(e){
    var clickedBTN = e.target;
    clickedBTN.parentElement.parentElement.remove();
    updateCartTotal();
}


function quantityChanged(e){
    var inputnum = e.target;
    if(inputnum.value<=0 || isNaN(inputnum.value)){
        inputnum.value=1;
    }
    updateCartTotal();
}


function updateCartTotal(){
    var total=0;
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    // console.log(cartItemsContainer)
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    for(i=0;i<cartRows.length;i++){
      var priceElement= cartRows[i].getElementsByClassName('cart-price')[0];
      var quantity= cartRows[i].getElementsByClassName('cart-quantity-input')[0].value;
      var price = parseFloat(priceElement.innerText.replace('$',''));
      total = total+ (quantity*price);
    }
    
    total= Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total;
}
