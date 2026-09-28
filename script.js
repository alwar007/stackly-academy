
document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu"), mobile=document.querySelector(".mobile-nav");
  if(menu) menu.addEventListener("click",()=>mobile.classList.toggle("open"));

  // Hero slider
  const slides=[...document.querySelectorAll(".slide")], dots=[...document.querySelectorAll(".dot")];
  let current=0, timer;
  function show(i){
    if(!slides.length) return;
    current=(i+slides.length)%slides.length;
    slides.forEach((s,n)=>s.classList.toggle("active",n===current));
    dots.forEach((d,n)=>d.classList.toggle("active",n===current));
  }
  function auto(){clearInterval(timer);timer=setInterval(()=>show(current+1),5000)}
  dots.forEach((d,i)=>d.addEventListener("click",()=>{show(i);auto()}));
  document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>{show(current+1);auto()}));
  document.querySelectorAll("[data-prev]").forEach(b=>b.addEventListener("click",()=>{show(current-1);auto()}));
  show(0); auto();

  // Scroll reveal
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

  // FAQ
  document.querySelectorAll(".faq-q").forEach(q=>q.addEventListener("click",()=>q.parentElement.classList.toggle("open")));

  // GPA demo calculator
  const calc=document.querySelector("#gpaCalc");
  if(calc) calc.addEventListener("submit",e=>{
    e.preventDefault();
    const marks=[...calc.querySelectorAll("input")].map(x=>Number(x.value)||0);
    const avg=marks.reduce((a,b)=>a+b,0)/(marks.length||1);
    const g=Math.min(10,Math.max(0,(avg/10))).toFixed(2);
    document.querySelector("#gpaResult").textContent=g;
  });

  // Forms are demo-only, no accidental navigation.
  document.querySelectorAll("form[data-demo]").forEach(f=>f.addEventListener("submit",e=>{
    e.preventDefault(); alert("Thanks! Your request has been recorded for this demo.");
  }));
});
