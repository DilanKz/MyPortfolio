let loader=document.getElementById("preLoader");
let toggleButton=document.getElementById("toggleButton");
let navMenu=document.getElementById("navMenu");

window.addEventListener("load",function (){
    loader.style.display= "none";
})

let toggle=false;
toggleButton.addEventListener('click',function (){
   if (toggle===false){
       toggleButton.className = 'fa-solid fa-x';
       navMenu.style.transform = 'translate(3.5vh, 3vh)';
       toggle = true;
   }else if (toggle===true){
       toggleButton.className = 'fa-solid fa-bars';
       navMenu.style.transform = 'translate(3.5vh, -50vh)';
       toggle = false;
   }
});
