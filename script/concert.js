import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE CONCERT ID=19

const articleCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=19&per_page=60");// Articles Categorie Concert de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle); //données formatées

const concertTemplate= await fetchRessource("./templates/concertTemplate.html"); //Template de la page concert

const tabScenes=["Euphorie","Fusion","Reverie","Resonance","Prisme"];

//Objet jour avec ID 

let jour=[
    {
        date:"Vendredi 26 juillet",
        idJour:"vendredi"
    },
    {
        date:"Samedi 27 juillet",
        idJour:"samedi"
    },
    {
        date:"Dimanche 28 juillet",
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