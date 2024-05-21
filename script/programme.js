import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE CONCERT ID=18

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?per_page=60");// Articles programmation de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle); //données formatées

let progTemplate= await fetchRessource("./templates/programmeTemplate.html"); //Template de la page programme

//Fonction affichage

function affichageItem(tab){  
   
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],progTemplate); 
    }
    document.getElementById('progConteneur').innerHTML=tab.join(' '); 
}

//FAIRE UN FILTRE GLOBAL AVEC TOUT LES PARAM

/*let progFiltre={
    "jour":[
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
        }
    ],

    "horaire":{
        min:"14:00",
        max:"00:02",
    },

    "lieux":["Euphorie","Fusion","Reverie","Resonance","Prisme","Patio"],
    
    "type":["concert","performance","atelier"],
    
}*/

//Affichage de tout les evenements

let all=[];

for (let a=0;a<dataArticle.length;a++){
    all.push(dataArticle[a]);   
}
affichageItem(all);

//Fonction filtrage par jour

let jour=[
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

let selectLieu=document.getElementById("lieu");
console.log(lieux);

selectLieu.addEventListener('change', ()=>{
    for (let l=0;l<lieux.length;l++){
        console.log(lieux[l]);
        if(selectLieu.value==lieux[l]){
            console.log("wesh");
            progLieu(lieux[l]);
            break;
        }
    }
})

// Fonction filtrage par type

let type=["concert","performance","atelier"]





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

