// MOBILE NAV TOGGLE
const navToggle = document.getElementById('navToggle'),
      navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('show'));

// PRODUCT DATA
const products = [
  { id:1,  name:'Wireless Headphones',        desc:'Noise‑cancelling over‑ear headphones',           price:199.99, img:'../images/image2.jpeg' },
  { id:2,  name:'Smart Watch',                desc:'Fitness tracking smartwatch',                    price:149.99, img:'../images/image5.jpeg' },
  { id:3,  name:'Gaming Mouse',               desc:'Ergonomic RGB gaming mouse',                     price:59.99,  img:'../images/image7.jpeg' },
  { id:4,  name:'Mechanical Keyboard',        desc:'RGB backlit mechanical keyboard',                price:89.99,  img:'../images/image6.jpeg' },
  { id:5,  name:'4K Monitor',                 desc:'Ultra HD 27-inch monitor',                       price:329.99, img:'../images/monitor.jpeg' },
  { id:6,  name:'USB-C Hub',                  desc:'7‑in‑1 aluminum USB-C hub',                      price:49.99,  img:'../images/usb.jpg' },
  { id:7,  name:'Bluetooth Speaker',          desc:'Portable waterproof speaker',                    price:79.99,  img:'../images/speaker.jpeg' },
  { id:8,  name:'Webcam 1080p',               desc:'Full HD streaming webcam',                       price:69.99,  img:'../images/webcam.jpeg' },
  { id:9,  name:'External SSD 1TB',           desc:'High‑speed portable SSD',                        price:119.99, img:'../images/ssd.jpeg' },
  { id:10, name:'Laptop Stand',               desc:'Adjustable aluminum laptop stand',               price:39.99,  img:'../images/stand.jpg' },
  { id:11, name:'Wireless Charger',           desc:'Qi‑certified fast wireless charger pad',         price:29.99,  img:'../images/charger.jpeg' },
  { id:12, name:'Noise‑Cancelling Earbuds',   desc:'True wireless noise‑cancelling earbuds',         price:129.99, img:'../images/buds.jpeg' },
  { id:13, name:'Action Camera 4K',           desc:'Waterproof 4K action camera',                    price:99.99,  img:'../images/actioncam.jpeg' },
  { id:14, name:'Drone with Camera',          desc:'Foldable drone with HD camera',                  price:249.99, img:'../images/drone.jpeg' },
  { id:15, name:'Smart Light Bulb',           desc:'Wi‑Fi enabled color‑changing bulb',              price:24.99,  img:'../images/bulb.jpeg' },
  { id:16, name:'Fitness Tracker',            desc:'Heart‑rate & sleep monitoring band',             price:59.99,  img:'../images/fitnesstracker.jpeg' },
  { id:17, name:'Portable Projector',         desc:'Mini pocket‑sized projector',                    price:179.99, img:'../images/projector.jpeg' },
  { id:18, name:'E‑Reader',                   desc:'6‑inch e‑ink display e‑reader',                  price:89.99,  img:'../images/ereader.jpeg' },
  { id:19, name:'Gaming Chair',               desc:'Ergonomic racing style chair',                   price:199.99, img:'../images/chair.jpeg' },
  { id:20, name:'Desk Lamp with USB',         desc:'LED desk lamp with USB charging port',           price:34.99,  img:'../images/desklamp.jpg' },
  { id:21, name:'Smart Thermostat',           desc:'Programmable Wi‑Fi thermostat',                  price:149.99, img:'../images/thermostat.jpeg' },
  { id:22, name:'Robot Vacuum',               desc:'Automatic robot vacuum cleaner',                 price:299.99, img:'../images/vacuum.jpeg' },
  { id:23, name:'Electric Toothbrush',        desc:'Rechargeable sonic toothbrush',                  price:49.99,  img:'../images/toothbrush.jpeg' },
  { id:24, name:'Smart Doorbell',             desc:'Video doorbell with motion detection',           price:99.99,  img:'../images/doorbell.jpeg' },
  { id:25, name:'VR Headset',                 desc:'Immersive virtual reality headset',              price:299.99, img:'../images/vr.jpg' },
  { id:26, name:'Wireless Keyboard',          desc:'Slim Bluetooth keyboard',                        price:59.99,  img:'../images/image6.jpeg' },
  { id:27, name:'Portable Power Bank',        desc:'20000mAh fast‑charge power bank',                price:39.99,  img:'../images/powerbank.jpeg' },
  { id:28, name:'Smart Glasses',              desc:'AR‑enabled smart glasses',                       price:349.99, img:'../images/glasses.jpeg' },
  { id:29, name:'Gaming Console',             desc:'Next‑gen home gaming console',                   price:499.99, img:'../images/console.jpeg' },
  { id:30, name:'Smart Home Hub',             desc:'Voice‑controlled home automation hub',           price:129.99, img:'../images/hub2.jpeg' }
];


// RENDER PRODUCTS
const productsEl = document.getElementById('products');
function renderProducts() {
  productsEl.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <button data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    productsEl.appendChild(card);
  });
}
renderProducts();

// PRODUCT MODAL
const modal = document.getElementById('productModal'),
      modalImg = document.getElementById('modalImg'),
      modalName = document.getElementById('modalName'),
      modalDesc = document.getElementById('modalDesc'),
      modalPrice = document.getElementById('modalPrice'),
      addToCartBtn = document.getElementById('addToCartBtn'),
      modalClose = document.getElementById('modalClose');
let currentProduct = null;

productsEl.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = +e.target.dataset.id;
    const prod = products.find(p => p.id === id);
    currentProduct = prod;
    modalImg.src = prod.img;
    modalName.textContent = prod.name;
    modalDesc.textContent = prod.desc;
    modalPrice.textContent = prod.price.toFixed(2);
    modal.style.display = 'flex';
  }
});
modalClose.addEventListener('click', () => modal.style.display = 'none');

// CART LOGIC
const cartToggle = document.getElementById('cartToggle'),
      cartPreview = document.getElementById('cartPreview'),
      cartItemsEl = document.getElementById('cartItems'),
      cartCount = document.getElementById('cartCount'),
      cartTotal = document.getElementById('cartTotal');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - $${(item.price*item.qty).toFixed(2)}`;
    cartItemsEl.appendChild(li);
  });
  cartCount.textContent = cart.reduce((sum,i)=>sum+i.qty,0);
  cartTotal.textContent = total.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(cart));
}

cartToggle.addEventListener('click', () => cartPreview.style.display = cartPreview.style.display === 'block' ? 'none' : 'block');

// ADD TO CART
addToCartBtn.addEventListener('click', () => {
  const p = currentProduct;
  const existing = cart.find(i => i.id === p.id);
  if (existing) existing.qty++;
  else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  updateCart();
  modal.style.display = 'none';
});

// INITIALIZE CART
updateCart();

// BACK TO TOP
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

// CONTACT FORM (simple alert)
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for contacting us!');
  e.target.reset();
});
