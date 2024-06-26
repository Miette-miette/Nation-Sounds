import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE PROGRAMATION ID=18

let articleCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=14&per_page=60");// Articles programmation de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= cms.formateur(articleCMS);//données formatées
console.log(dataArticle); 

let progTemplate= await fetchRessource("./templates/programmeTemplate.html"); //Template de la page programme

let progFiltre={//DONNEES DES FILTRES
    
    "jour": "tous" ,
    "heure": 14,
    "lieux":"tous", 
    "type":"tous",  
}

let iconeScene={
    "Euphorie":"./media/euphorie.png",
    "Fusion":"./media/fusion.png",
    "Reverie":"./media/reverie.png",
    "Patio":"./media/le patio.png",
    "Prisme":"./media/prisme.png",
    "Resonance":"./media/resonance.png",

}

//Fonction AFFICHAGE

function affichageItem(tab){  
   
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],progTemplate); 
    }
    document.getElementById('progConteneur').innerHTML=tab.join(' '); 
}

//ADD EVENT LISTENER POUR GENERER LA PAGE INFO

function storageData(){
    let progItem=document.getElementsByClassName("progItem");

    for (let p=0;p<progItem.length;p++){
        console.log(progItem[p].id);
        progItem[p].addEventListener('click',()=>{
            localStorage.setItem('progItem', JSON.stringify(cms.progItemFromTitle(dataArticle,progItem[p].id)))
            window.open('./information.html','_self');
        })
    }
}

//Affichage ALL

let all=[];

for (let a=0;a<dataArticle.length;a++){
        let sceneName=Object.keys(iconeScene);
        let sceneImg=Object.values(iconeScene);
        console.log(sceneName);
        for(let s=0;s<sceneName.length;s++){
            if(dataArticle[a].scene==sceneName[s]){
            dataArticle[a]["iconScene"]=sceneImg[s];
            console.log(dataArticle[a]);
        }
        
        
    }
    
    all.push(dataArticle[a]);   
}
affichageItem(all);
cms.pageInformation("progItem",dataArticle);

//Fonction FILTRAGE 

function filtrageItem(data,progFiltre){
    let progTab=[];
    
    filtre.filtreAll(data,progFiltre,progTab)
    
    affichageItem(progTab);
    cms.pageInformation("progItem",data);
    console.log(progTab);
    
}

//RECUPERER LES DONNEES DES INPUTS

function filtreChange(){

    //JOUR
    progFiltre.jour=document.getElementById("jour").value;

    //HEURE
    progFiltre.heure=document.getElementById("heure").value;

    //LIEU
    progFiltre.lieux=document.getElementById("lieu").value;

    //TYPE
    progFiltre.type=document.getElementById("type").value;

    console.log(progFiltre);
    //FILTRAGE 
    filtrageItem(dataArticle,progFiltre);

}

//ADD EVENT LISTENER SUR LES SELECTS ET INPUTS

function setup(){

    //Recuperation des input
    let onchangeElem= document.getElementById('heure');
    onchangeElem.addEventListener('change',filtreChange);
    
    //Recuperation des select
    let onchangeSelect= document.getElementsByTagName('select');
    for (let s=0;s<onchangeSelect.length;s++){
      onchangeSelect[s].addEventListener('change',filtreChange);
    } 
  }

setup();


function showFiltre(){

    let progFiltreConteneur=document.getElementById('filtreTitre');
    console.log(progFiltreConteneur);

    let filtre=document.getElementsByClassName('filtreConteneur');
    console.log(filtre);

    let imgFleche=document.getElementsByClassName('voirPlus');
    console.log(imgFleche);

    progFiltreConteneur.addEventListener('click', ()=>{
        for(let f=0;f<filtre.length;f++){
       
            if(filtre[f].style.display==="flex"){
                filtre[f].style.display="none";
                imgFleche[0].style.rotate="82deg";
            }
            else{
                filtre[f].style.display="flex";
                imgFleche[0].style.rotate="265deg";
            } 
        }  
    })
            
        
}
showFiltre();
