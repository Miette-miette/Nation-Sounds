const menuBtn= document.getElementById("menuBtn");

const menuCollapse=document.getElementById("menuInfo");

const menuImg=document.getElementById("iconMenu");


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