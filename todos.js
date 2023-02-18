const adder=document.querySelector('.add');
const ul=document.querySelector('.list-group');
const list=document.querySelector('.list-group-item');
const search=document.querySelector('.search input');
const searchForm=document.querySelector('.search');
const warning=document.querySelector('.popup');
const warningText=document.querySelector('.popup_text');

//add new todo. Line 20 i.e. adder.reset is to reset the "add todo" input box to empty default.
adder.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e);
  const todo = adder.add.value.trim();
  if(todo.length){
  const li=document.createElement('li');
  li.innerHTML=`<span>${todo}</span>
  <i class="delete fa-solid fa-trash-can"></i>`;
  li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');
  ul.append(li);
  adder.reset();
  } 
});

//remove todo and popup(from lines 28 to 37, only line 32 is needed for "remove todo" functionality..the rest is for the popup)
ul.addEventListener('click',e=>{
  console.log(e.target);
  if(e.target.tagName==="I"){
      warning.classList.remove('d-none');
      warningText.innerHTML=`Do you really want to delete the "${e.target.parentElement.textContent.trim()}" todo`;
      warning.addEventListener('click',evnt=>{
        if(evnt.target.classList.contains('yes')){
          e.target.parentElement.remove();
          warning.classList.add('d-none');
        }else{
          warning.classList.add('d-none');
        }
      }); 
    }
});

//search todo(1. We chain and apply filter method first and then the forEach method second
//            2. not (!) symbol because we want the list items which DO NOT contain the search term, so it becomes easier for us to hide/not show them when searched for.)
search.addEventListener('keyup',e=>{
  const term= search.value.trim().toLowerCase();
  Array.from(ul.children).filter( todo => !todo.textContent.toLowerCase().includes(term)).forEach( item => item.classList.add('filtered'));
  Array.from(ul.children).filter( todo => todo.textContent.toLowerCase().includes(term)).forEach( item => item.classList.remove('filtered'));
});

//prevent refresh on pressing enter inside search box
searchForm.addEventListener('submit', e=> {
  e.preventDefault();
});