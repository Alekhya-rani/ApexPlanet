/* script.js */
// --- Quiz Logic ---
const quizData = [
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets","Computer Style Syntax","Creative Styling System","Colorful Style Setup"], answer: 0 },
    { question: "Which method adds a new element in JavaScript?", options: ["appendChild","attachChild","pushChild","newChild"], answer: 0 },
    { question: "What symbol is used for IDs in CSS?", options: ["#",".","*","$"], answer: 0 },
    { question: "Which HTML tag is used to include JavaScript?", options: ["<script>","<js>","<code>","<javascript>"], answer: 0 },
    { question: "Which property is used to change font size in CSS?", options: ["font-size","text-size","font-style","text-style"], answer: 0 },
    { question: "What is the correct syntax for referring to an external script called 'script.js'?", options: ["<script src=\"script.js\"></script>","<script href=\"script.js\"></script>","<js src=\"script.js\"></js>","<script file=\"script.js\"></script>"], answer: 0 },
    { question: "Which HTML attribute specifies an alternate text for an image?", options: ["alt","title","src","longdesc"], answer: 0 },
    { question: "How do you call a function named 'myFunction' in JavaScript?", options: ["myFunction()","call myFunction()","call function myFunction()","execute myFunction()"], answer: 0 },
    { question: "Which CSS property controls the text color?", options: ["color","text-color","font-color","fgcolor"], answer: 0 },
    { question: "Which JavaScript keyword declares a variable?", options: ["let","var","const","All of the above"], answer: 3 }
  ];
  let currentQ = 0, score = 0;
  const quizContainer = document.getElementById('quiz-container'), nextBtn = document.getElementById('next-btn'), scoreContainer = document.getElementById('score-container');
  function loadQuestion(){ const q = quizData[currentQ]; let html = `<div class="question">${q.question}</div><ul class="options">`; q.options.forEach((opt,i)=> html+=`<li><label><input type="radio" name="option" value="${i}">${opt}</label></li>`); html+='</ul>'; quizContainer.innerHTML=html; }
  nextBtn.addEventListener('click', ()=>{ const selected = document.querySelector('input[name="option"]:checked'); if(selected){ if(parseInt(selected.value)===quizData[currentQ].answer) score++; currentQ++; if(currentQ<quizData.length) loadQuestion(); else{ quizContainer.innerHTML=''; nextBtn.style.display='none'; scoreContainer.textContent=`Your score: ${score}/${quizData.length}`; } }});
  loadQuestion();
  
  const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtnCarousel = document.querySelector('.carousel-control.prev');
const nextBtnCarousel = document.querySelector('.carousel-control.next');
let currentIndex = 0;

function moveSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
}

prevBtnCarousel.addEventListener('click', () => {
  currentIndex = (currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  moveSlide(currentIndex);
});
nextBtnCarousel.addEventListener('click', () => {
  currentIndex = (currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  moveSlide(currentIndex);
});

  
  // --- Fetch Weather ---
  document.getElementById('weatherForm').addEventListener('submit', e=>{ e.preventDefault(); const city = document.getElementById('cityInput').value.trim(); fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(res=>res.json()).then(loc=>{ if(!loc.results) throw 'City not found'; const {latitude, longitude} = loc.results[0]; return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`); })
    .then(res=>res.json()).then(data=>{ const w = data.current_weather; document.getElementById('weatherResult').innerHTML = `<p><strong>${w.temperature}°C</strong> at wind speed ${w.windspeed} km/h</p>`; }).catch(err=>{ document.getElementById('weatherResult').textContent = err; }); });
  