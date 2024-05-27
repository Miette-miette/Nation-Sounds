import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE CONCERT ID=19

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?categories=19&per_page=40");// Articles Categorie Concert de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle); //données formatées

let concertTemplate= await fetchRessource("./templates/concertTemplate.html"); //Template de la page concert

let tabScenes=["Euphorie","Fusion","Reverie","Resonance","Prisme"];

//Objet jour avec ID 

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

//Fonction d'affichage par scenes

function affichageScenes(tabJour){ 
    for (let j=0;j<tabScenes.length;j++){
        let scene=[];
        filtre.filtreScene(tabJour,tabScenes[j],scene)
        for(let i=0;i<scene.length;i++){
            scene[i]= cms.replaceTemplate(scene[i],concertTemplate);
        }
    document.getElementById(tabScenes[j].toLowerCase()).innerHTML=scene.join(' ');
    console.log(tabScenes[j].toLowerCase());
    }
}

//Fonction filtrage par jour

function concertJour(jour){
    let tabJour=[];
    filtre.filtreJour(dataArticle,jour,tabJour);
    affichageScenes(tabJour);
}

//AddEventListener sur les inputs jour

for (let c=0;c<jour.length;c++){
    let inputJour=document.getElementById(jour[c].idJour)
    inputJour.addEventListener('click', ()=> concertJour(jour[c].date))
}
concertJour(jour[0].date);