document.addEventListener('DOMContentLoaded',()=>{
  const y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
});