let menuBtn= document.getElementById("menuBtn");
console.log(menuBtn);

let menuCollapse=document.getElementById("menuInfo");
console.log(menuCollapse);

let menuImg=document.getElementById("iconMenu");
console.log(menuImg);

function showMenu(){

    menuBtn.addEventListener('click', ()=>{

        if(menuCollapse.style.display==="flex"){
            menuCollapse.style.display="none";
            menuImg.src="../media/icons/list.svg"
            console.log(menuCollapse);
        }
        else{
            menuCollapse.style.display="flex";
            menuImg.src="./media/icons/x.svg"  
            console.log(menuCollapse);
        }
    })
    
}