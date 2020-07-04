class Item {
    constructor(name,price,image,total,nbrItem) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.total = total;
        this.nbrItem = nbrItem;
    }
}

class UI {
    
    static display () {
       const local = Storage.getLocal();
       local.forEach((i)=>this.addToCart(i));
    }
    static ini(el) {
        
       const item = []; 

       let image = el.children[0].children[0].src;
       image=  image.slice(image.indexOf('img')+3);
       image = `./img-cart${image}`;
      

       let name = el.children[1].children[0].children[0].innerHTML;
       
       let price =  el.children[1].children[0].children[1].children[0].innerHTML;
       
       item.price = price;
       item.image = image;
       item.name = name;
       
       this.addToCart(item);
       this.showTotal();
       item.nbrItem = document.querySelector('#item-count').innerHTML ;
       item.total= document.querySelector('.item-total').innerHTML;
       const houssem = new Item(item.name,item.price,item.image,item.total,item.nbrItem);
       Storage.addToLocal(houssem);
       console.log(houssem);
       
      
    }
    static addToCart(item) {

       
        let cartItem = document.createElement('div');
        cartItem.classList.add(
            'cart-item',
            'd-flex',
            'justify-content-between',
            'text-capitalize',
            'my-3'
            );
       
        cartItem.innerHTML = `
        <img src="${item.image}" class="img-fluid rounded-circle" id="item-img" alt="">
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
    let total = document.querySelector('.cart-total-container');
    
    cart.insertBefore(cartItem,total); 
   
    


    
    
    
    }
    static showTotal() {
    const totals = [] ;
    let totalPrice = 0;
     const items= document.querySelectorAll('.cart-item-price') ;
     items.forEach((price) => {
     totals.push(price.textContent);
     totalPrice += parseFloat(price.textContent);
     
         
     })
     document.querySelector('#item-count').innerHTML = `${totals.length}`;
     document.querySelector('.item-total').innerHTML = `${totalPrice}.00`;
     document.querySelector('#cart-total').innerHTML = `${totalPrice}.00`;
     
    }
}

class Storage {
    static getLocal () {
        let local;
        if(localStorage.getItem('local') === null) {
         local = [] ;
        }
        else {
            local = JSON.parse(localStorage.getItem('local'));
        }
        
        return local ;
    }
    static addToLocal (item) {
        const local = this.getLocal();
        
        
        local.push(item);
        
        localStorage.setItem('local', JSON.stringify(local));
    }
}



// events 
// open cart event
document.addEventListener('DOMContentLoaded',()=> UI.display());

const cartInfo = document.querySelector('#cart-info');
const cart = document.querySelector('.cart');
cartInfo.addEventListener('click',() => {
    cart.classList.toggle('show-cart');
})

const cards = document.querySelectorAll('.card');
cards.forEach( (card) => {
    card.addEventListener ('click', (e)=> {
        if(e.target.classList.contains('fa-shopping-cart')) {
            UI.ini(card);
            
        }
        
        
    })
})


 