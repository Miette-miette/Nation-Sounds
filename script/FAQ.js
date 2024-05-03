let question= document.getElementsByClassName("question");
console.log(question);

let reponse=document.getElementsByClassName("reponse");
console.log(reponse);

function showQuestion(){

for(let f=0;f<question.length;f++){
    question[f].addEventListener('click', ()=>{
        console.log(question[f]);


           if(reponse[f].style.display==="flex"){
                reponse[f].style.display="none";
                console.log(reponse);
            }
            else{
                reponse[f].style.display="flex";  
                console.log(reponse);
            } 
        })

        
    }
    
}