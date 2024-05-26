import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?per_page=60");// Articles programmation de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= cms.formateur(articleCMS);//données formatées
console.log(dataArticle); 

let progTemplate= await fetchRessource("./templates/programmeTemplate.html"); //Template de la page programme

let progFiltre={//DONNEES DES FILTRES
    
   "jour": "" ,
     
    "heure": 14,

    "lieux":"tous",
    
    "type":"tous",  
}

//Fonction AFFICHAGE

function affichageItem(tab){  
   
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],progTemplate); 
    }
    document.getElementById('progConteneur').innerHTML=tab.join(' '); 
}

//Affichage ALL

let all=[];

for (let a=0;a<dataArticle.length;a++){
    all.push(dataArticle[a]);   
}
affichageItem(all);



//Fonction FILTRAGE 

function filtrageItem(data,progFiltre){
    let progTab=[];
    
    filtre.filtreAll(data,progFiltre,progTab)
    console.log(progTab);
    affichageItem(progTab);
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





















//CATEGORIE CONCERT ID=18

    //IDEE POUR UTILISER LES CATEGORIES

 /*selectJour.addEventListener('change', ()=>{
   for (let j=0;j<jour.length;j++){
              
        let jourId=jour[j].idJour;

        if(selectJour.value==jourId){ 

            articleCMS=cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?category=vendredi&per_page=40"); //vendredi
            console.log(articleCMS);
            let articleJour=cms.formateur(articleCMS);
            console.log(articleJour);
            affichageItem(articleJour);
            break;
        }}
    })*/

//CODE QUI MARCHE MAIS PAS OPTI

//Fonction filtrage par jour

/*let jour=[
    {
        date:new Date(2024, 0o6, 26),
        idJour:"vendredi"
    },
    {
        date:new Date(2024, 0o6, 27),
        idJour:"samedi"
    },
    {
        date:new Date(2024, 0o6, 28),
        idJour:"dimanche"
    },
    ];

function progJour(jour){//Fonction de filtrage des datas du CMS + fonction d'affichage
    let tabJour=[];
    filtre.filtreJour(dataArticle,jour,tabJour);
    affichageItem(tabJour);
}

//AddEventListener JOUR

let selectJour=document.getElementById("jour");

selectJour.addEventListener('change', ()=>{
   for (let j=0;j<jour.length;j++){       
        let jourId=jour[j].idJour;
        if(selectJour.value==jourId){ 
            progJour(jour[j].date);
            break;
        }
    }
})

// Fonction filtrage par lieux

let lieux=["Euphorie","Fusion","Reverie","Resonance","Prisme","Patio"];

function progLieu(lieu){
    let tabLieu=[];
    filtre.filtreScene(dataArticle,lieu,tabLieu);
    affichageItem(tabLieu);
}

//AddEventListener LIEU

let selectLieu=document.getElementById("lieu");
console.log(lieux);

selectLieu.addEventListener('change', ()=>{
    for (let l=0;l<lieux.length;l++){
        if(selectLieu.value==lieux[l]){
            progLieu(lieux[l]);
            break;
        }
    }
})

// Fonction filtrage par type

let type=["concert","performance","atelier"];

function progType(type){
    let tabType=[]; 
    filtre.filtreType(dataArticle,type,tabType);
    console.log(tabType);
    affichageItem(tabType);
}

//AddEventListener TYPE

let selectType=document.getElementById("type");

selectType.addEventListener('change', ()=>{ 
    for (let t=0;t<type.length;t++){  
        if(selectType.value==type[t]){
            progType(type[t]);
            break;
        }
    }
})

// Fonction filtrage par heure

function progHeure(heure){
    let tabHeure=[]; 
    filtre.filtreHeure(dataArticle,heure,tabHeure);
    console.log(tabHeure);
    affichageItem(tabHeure);
}

//AddEventListener HEURE

let inputHeure=document.getElementById("heure");

inputHeure.addEventListener('change',()=>{
    progHeure(inputHeure.value);
    console.log(inputHeure.value);
})*/

