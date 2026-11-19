const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
const guideSearch=document.querySelector('#guide-search');
if(guideSearch){
  const searchable=[...document.querySelectorAll('.category-tile,.resource-card')];
  guideSearch.addEventListener('input',()=>{
    const term=guideSearch.value.trim().toLowerCase();
    searchable.forEach(item=>{
      const haystack=(item.innerText+' '+(item.dataset.search||'')).toLowerCase();
      item.hidden=!!term&&!haystack.includes(term);
    });
  });
}

// Search the added help topics and guide cards without changing the original page.
const helpSearch = document.querySelector('#help-search');
if (helpSearch) {
  const searchableHelp = [...document.querySelectorAll('.help-option, .guide-card')];
  helpSearch.addEventListener('input', () => {
    const query = helpSearch.value.trim().toLowerCase();
    searchableHelp.forEach(item => {
      const text = (item.innerText + ' ' + (item.dataset.search || '')).toLowerCase();
      item.hidden = query.length > 0 && !text.includes(query);
    });
  });
}
