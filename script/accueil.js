import CMS from './CMS.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

//RESSOURCES

const hostArticle="https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=5";
const hostConcert="https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=19&per_page=60";



let concertCMS= await cms.dataCMS(hostConcert);// Articles programmation de Nation Sounds WP 

let articleCMS= await cms.dataCMS(hostArticle);//Articles actu
console.log(articleCMS);

//FORMATAGE 

let dataConcert= cms.formateur(concertCMS);
console.log(dataConcert); //données formatées

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle);

//TEMPLATES

const artisteTemplate= await fetchRessource("/templates/carouselCard.html"); //Template du carousel artiste

const articleTemplate= await fetchRessource("/templates/articleCard.html"); 

//AFFICHAGE

function affichageCarousel(tab,template,idConteneur){  
   
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],template); 
    }
    document.getElementById(idConteneur).innerHTML=tab.join(' '); 
}

//CAROUSEL ARTISTES

let concert=[];

for (let c=0;c<dataConcert.length;c++){
    concert.push(dataConcert[c]);
}
 
affichageCarousel(dataConcert.slice(-7),artisteTemplate,'conteneurCarousel');

//ARTICLES FESTIVAL
let article=[];

for (let a=0;a<dataArticle.length;a++){
    article.push(dataArticle[a]);
}

affichageCarousel(dataArticle,articleTemplate,'articleConteneur');

cms.pageInformation("carouselCard",concert);
cms.pageInformation("articleCard",article);




