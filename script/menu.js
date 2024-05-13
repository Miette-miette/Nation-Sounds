let menuBtn= document.getElementById("menuBtn");

let menuCollapse=document.getElementById("menuInfo");

let menuImg=document.getElementById("iconMenu");


function showMenu(){

    menuBtn.addEventListener('click', ()=>{

        if(menuCollapse.style.display==="flex"){
            menuCollapse.style.display="none";
            menuImg.src="../media/icons/list.svg";     
        }
        else{
            menuCollapse.style.display="flex";
            menuImg.src="./media/icons/x.svg"  
        }
    })
    
}