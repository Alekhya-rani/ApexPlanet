const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const renderTodos = ()=>{
  todoList.innerHTML = '';
  todos.forEach((task,i)=>{
    const li = document.createElement('li'); li.textContent = task;
    const btn = document.createElement('button'); btn.textContent = '✖';
    btn.onclick = ()=>{ todos.splice(i,1); updateTodos(); };
    li.appendChild(btn); todoList.appendChild(li);
  });
};
const updateTodos = ()=>{ localStorage.setItem('todos',JSON.stringify(todos)); renderTodos(); };
todoForm.onsubmit = e=>{ e.preventDefault(); todos.push(todoInput.value); todoInput.value=''; updateTodos(); };
renderTodos();

// Products Data and Filter/Sort
const products = [
  { name:'Laptop', category:'electronics', price:1200, img:'../images/image1.jpeg' },
  { name:'Headphones', category:'electronics', price:200, img:'../images/image2.jpeg' },
  { name:'Fridge', category:'electronics', price:15, img:'../images/image3.jpeg' },
  { name:'Washing machine', category:'electronics', price:25, img:'../images/image4.jpeg' },
  { name:'Smart Watch', category:'electronics', price:150, img:'../images/image5.jpeg' },
  { name:'keyboard', category:'electronics', price:75, img:'../images/image6.jpeg' },
  { name:'Mouse', category:'electronics', price:75, img:'../images/image7.jpeg' },
  { name:'Micro oven', category:'electronics', price:75, img:'../images/image8.jpeg' },
  { name:'Air conditioner', category:'electronics', price:75, img:'../images/image9.jpeg' },
  { name:'Printer', category:'electronics', price:75, img:'../images/image10.jpeg' },
  { name:'Harry Potter', category:'books', price:75, img:'../images/image11.jpeg' },
  { name:'To Kill a Mockingbird', category:'books', price:75, img:'../images/image12.jpeg' },
  { name:'The Diary of a Young Girl', category:'books', price:75, img:'../images/image13.jpeg' },
  { name:'Pride and Prejudice', category:'books', price:75, img:'../images/image14.jpeg' },
  { name:'1984', category:'books', price:75, img:'../images/image15.jpeg' },
  { name:'The Great Gatsby', category:'books', price:75, img:'../images/image16.jpeg' },
  { name:'Animal Farm', category:'books', price:75, img:'../images/image17.jpeg' },
  { name:'The Little Prince', category:'books', price:75, img:'../images/image18.jpeg' },
  { name:'The Hobbit', category:'books', price:75, img:'../images/image19.jpeg' },
  { name:'The Twilight Saga', category:'books', price:75, img:'../images/image20.jpeg' },
  { name:'Sunglasses', category:'accessories', price:75, img:'../images/image21.jpeg' },
  { name:'Gloves/Socks', category:'accessories', price:75, img:'../images/image22.jpeg' },
  { name:'Hair Accessories', category:'accessories', price:75, img:'../images/image23.jpeg' },
  { name:'Hats', category:'accessories', price:75, img:'../images/image24.jpeg' },
  { name:'Handbag/Purse', category:'accessories', price:75, img:'../images/image25.jpeg' },
  { name:'Scarf', category:'accessories', price:75, img:'../images/image26.jpeg' },
  { name:'Belt', category:'accessories', price:75, img:'../images/image27.jpeg' },
  { name:'Watch', category:'accessories', price:75, img:'../images/image28.jpeg' },
  { name:'Jwellery', category:'accessories', price:75, img:'../images/image29.jpeg' },
  { name:'Ear rings', category:'accessories', price:75, img:'../images/image30.jpeg' }
];
const listEl = document.getElementById('product-list');
const filterEl = document.getElementById('filter-category');
const sortEl = document.getElementById('sort-price');
const renderProducts = ()=>{
  let filtered = products.filter(p=>filterEl.value==='all'||p.category===filterEl.value);
  if(sortEl.value==='asc') filtered.sort((a,b)=>a.price-b.price);
  if(sortEl.value==='desc') filtered.sort((a,b)=>b.price-a.price);
  listEl.innerHTML = '';
  filtered.forEach(p=>{
    const div = document.createElement('div'); div.className='product-card';
    div.innerHTML = `<img src="${p.img}" alt="${p.name}"/><h3>${p.name}</h3><p>$${p.price}</p>`;
    listEl.appendChild(div);
  });
};
filterEl.onchange = renderProducts; sortEl.onchange = renderProducts; renderProducts();
// SECTION-SHOW/HIDE NAVIGATION
// Also catch the hero "See My Work" link
document.querySelectorAll('.nav-menu a, .hero-content .primary-btn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    // Hide all sections
    document.querySelectorAll('main .section, main .hero').forEach(sec => {
      sec.style.display = 'none';
    });
    // Determine target ID from href
    const targetID = link.getAttribute('href').substring(1);
    // Show the matching section (or hero for #about)
    const toShow = document.getElementById(targetID)
                 || document.querySelector(`.${targetID}`); 
    if (toShow) toShow.style.display = '';
  });
});

// Initialize: hide everything but hero/about on page load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('main .section').forEach(sec => sec.style.display = 'none');
  document.getElementById('about').style.display = ''; 
});
