$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
    })

});

// Button Action 
let  btn = document.querySelector('#button');
let option = document.querySelector('#movies-cards');
var flag = 0 ;

btn.addEventListener('click',function(){
    if(flag == 0){
        option.style.display = "flex";
        btn.innerHTML = "Back";
        flag = 1;
    }
    else
    {
        flag = 1;
        option.style.display = "none";
        btn.innerHTML = "Next";
        flag = 0;
    }


})
