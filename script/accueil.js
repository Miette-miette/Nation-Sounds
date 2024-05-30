import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?categories=18&per_page=60");// Articles programmation de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle); //données formatées

let artisteTemplate= await fetchRessource("./templates/carouselCard.html"); //Template du carousel artiste

//CAROUSEL ARTISTES

//Fonction Affichage

function affichageCarousel(tab){  
   
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],artisteTemplate); 
    }
    document.getElementById('conteneurCarousel').innerHTML=tab.join(' '); 
}

//Recuperer les 6 derniers artistes enregistrés

let artistes=[];

for (let a=0;a<dataArticle.length;a++){
    if(dataArticle[a].type=="concert"){
        artistes.push(dataArticle[a]); 
         
    }     
}
console.log(artistes);  
affichageCarousel(artistes.slice(-6));

