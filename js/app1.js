
class UI {
    
    static remove (e) {
        if(e.target.parentElement.classList.contains('cart-item-remove'))
       {
        const cart = document.querySelector('#cart');
        let item = e.target.parentElement.parentElement;
        cart.removeChild(item);
        let tt = [];
        UI.showTotals (tt);    
      }
    }
    static showTotals (tt) {
        tt = [] ;
       let items = document.querySelectorAll('.cart-item-price');
       items.forEach((item) => {
           tt.push(parseFloat(item.textContent));

       })
       let itemNumber = tt.length;    
       const totalsMoney =  tt.reduce(function(tt,item){
           tt += item;
           return tt
       },0)
       const finalMoney = totalsMoney.toFixed(2);
       if (itemNumber === 0) {
           document.querySelector('#cart-total').textContent = '0.00';
           document.querySelector('.item-total').textContent = '0.00';    
           document.querySelector('#item-count').textContent = '0';   
   
       }
       document.querySelector('#cart-total').textContent = finalMoney;    
       document.querySelector('.item-total').textContent = finalMoney;    
       document.querySelector('#item-count').textContent = itemNumber;    
            
   }
}


(function  () {
 const cartInfo = document.querySelector('#cart-info');
 const cart = document.querySelector('#cart');
 
 cartInfo.addEventListener('click' ,() => {
    cart.classList.toggle('show-cart');
 })
}) ();

function Cart (item) {
    var item = {};
    const cartBtn = document.querySelectorAll('.store-item-icon');
    cartBtn.forEach(function (btn) {
        btn.addEventListener('click' , e => {
            //console.log(e.target);
            if(e.target.parentElement.classList.contains('store-item-icon')) {
                
                let fullPath = e.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf("img") + 3;
                let partPath = fullPath.slice(pos);
                let name = e.target.parentElement.parentElement.nextElementSibling
                .children[0].children[0].textContent;

                let price = e.target.parentElement.parentElement.nextElementSibling
                .children[0].children[1].textContent;

                finalPrice = price.slice(1).trim();
                item.img = `./img-cart/${partPath}`;
                item.name = name;
                item.price = finalPrice;
                const alert = document.querySelector('.alert-houssem');
                alert.classList.add ('display-block');
                document.querySelector('.alert-message').textContent = ` ${item.name} added with succes `;
                setTimeout(() => {
                    alert.classList.remove('display-block');  
                },4000)
                
                let cartItem = document.createElement('div');
                cartItem.classList.add(
                    'cart-item',
                    'd-flex',
                    'justify-content-between',
                    'text-capitalize',
                    'my-3'
                    );

                cartItem.innerHTML = 
                    `
                        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                        <div class="item-text">

                        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                        <span>$</span>
                        <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                        </div>
                        <a href="#" id='cart-item-remove' class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                        </a>
                    `;  
            let cart = document.querySelector('#cart');
            let totale = document.querySelector('.cart-total-container');
            
            cart.insertBefore(cartItem,totale);

            UI.showTotals (totale);    
            
            
            }
        })
    }) 
    
   }
   Cart();

   (function () {
       const clearChart = document.querySelector('#clear-cart');
       clearChart.addEventListener('click',() => {
          document.querySelector('#cart-total').textContent = '0.00';
          document.querySelector('.item-total').textContent = '0.00';    
          document.querySelector('#item-count').textContent = '0';
          const cart = document.querySelector('#cart');
          let items = document.querySelectorAll('.cart-item');
          items.forEach((item) => {
          cart.removeChild(item);
          })
       })
        
   }) ()

   const cart = document.querySelector('.cart');
   cart.addEventListener('click', e => {
       UI.remove(e);
   })
   





   document.querySelector('#search-item').addEventListener('keyup',(e) => {
       e.preventDefault();
       
       let items = document.querySelectorAll('.store-item') ;
       items.forEach((item) => {
          var itemName = document.querySelector('#search-item').value;
          let kk = item.children[0].children[1].children[0].children[0].textContent ;
          if (kk.indexOf(itemName)>-1 ) {
            item.style.display = '';
            enableScroll()
          }
          else {
            item.style.display = 'none'; 
            disableScroll();
            
          }
          
   })
})
function disableScroll() { 
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
  
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
} 
  
function enableScroll() { 
    window.onscroll = function() {}; 
} 
