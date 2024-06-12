import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

//RESSOURCES

let concertCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?categories=18&per_page=60");// Articles programmation de Nation Sounds WP 

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?categories=29");//Articles actu

//FORMATAGE 

let dataConcert= cms.formateur(concertCMS);
console.log(dataConcert); //données formatées

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle);

//TEMPLATES

let artisteTemplate= await fetchRessource("./templates/carouselCard.html"); //Template du carousel artiste

let articleTemplate= await fetchRessource("./templates/articleCard.html"); 

//AFFICHAGE

function affichageCarousel(tab,template,idConteneur){  
   
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],template); 
    }
    document.getElementById(idConteneur).innerHTML=tab.join(' '); 
}

//CAROUSEL ARTISTES

let artistes=[];

for (let c=0;c<dataConcert.length;c++){
    if(dataConcert[c].type=="concert"){
        artistes.push(dataConcert[c]);      
    }     
}
console.log(artistes);  
affichageCarousel(artistes.slice(-7),artisteTemplate,'conteneurCarousel');

//ARTICLES FESTIVAL

let article=[];

for(let a=0;a<dataArticle.length;a++){
    article.push(dataArticle[a]);
}
affichageCarousel(article,articleTemplate,'articleConteneur');




