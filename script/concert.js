import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts");// Articles de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= await cms.formateur(articleCMS);
console.log(dataArticle); //données formatées

let concertTemplate= await fetchRessource("./templates/concertTemplate.html"); //Template de la page concert


//Filtrage par scene et par jour AJOUTER ADD EVENT LISTENER

//Fonction d'affichage par scenes

function affichageScenes(tabJour){
    //EUPHORIE
    let euphorie=[];
    filtre.filtreScene(tabJour,"Euphorie",euphorie)
    for(let i=0;i<euphorie.length;i++){
        euphorie[i]= cms.replaceTemplate(euphorie[i],concertTemplate);
    }
    document.getElementById('euphorie').innerHTML=euphorie.join(' ');

    //FUSION
    let fusion=[];
    filtre.filtreScene(tabJour,"Fusion",fusion)
    for(let i=0;i<fusion.length;i++){
        fusion[i]= cms.replaceTemplate(fusion[i],concertTemplate);
    }
    document.getElementById('fusion').innerHTML=fusion.join(' ');

    //REVERIE
    let reverie=[];
    filtre.filtreScene(tabJour,"Reverie",reverie)
    for(let i=0;i<reverie.length;i++){
        reverie[i]= cms.replaceTemplate(reverie[i],concertTemplate);
    }
    document.getElementById('reverie').innerHTML=reverie.join(' ');

    //RESONANCE
    let resonance=[];
    filtre.filtreScene(tabJour,"Resonance",resonance)
    for(let i=0;i<resonance.length;i++){
        resonance[i]= cms.replaceTemplate(resonance[i],concertTemplate);
    }
    document.getElementById('resonance').innerHTML=resonance.join(' ');

    //PRISME
    let prisme=[];
    filtre.filtreScene(tabJour,"Prisme",prisme)
    for(let i=0;i<prisme.length;i++){
        prisme[i]= cms.replaceTemplate(prisme[i],concertTemplate);
    }
    document.getElementById('prisme').innerHTML=prisme.join(' ');
}


//Vendredi

let vendredi=new Date(2024, 0o6, 26);
let tabVendredi=[];

function concertVendredi(){

    filtre.filtreJour(dataArticle,vendredi,tabVendredi);
    affichageScenes(tabVendredi);

}
concertVendredi();

//Samedi

let samedi=new Date(2024, 0o6, 27);
let tabSamedi=[];

function concertSamedi(){
    filtre.filtreJour(dataArticle,samedi,tabSamedi);
    affichageScenes(tabSamedi);
}


//Dimanche

let dimanche= new Date(2024, 0o6, 28);
let tabDimanche=[];

function concertDimanche(){
    filtre.filtreJour(dataArticle,dimanche,tabDimanche)
    affichageScenes(tabSamedi);
}













