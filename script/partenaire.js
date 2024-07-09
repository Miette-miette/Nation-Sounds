import CMS from './CMS.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

//CATEGORIE PARTENAIRE ID=12

const articleCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=12&per_page=60");// Articles partenaires de Nation Sounds WP 
console.log(articleCMS);
const dataPartenaire= cms.formateur(articleCMS);//données formatées
console.log(dataPartenaire); 

const partenaireTemplate= await fetchRessource("./templates/partenaireTemplate.html"); //Template de la page programme

function affichageItem(tab,conteneur){ 
       
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],partenaireTemplate); 
    }
    document.getElementById(conteneur).innerHTML=tab.join(' '); 
}

let institution=[];
let entreprise=[];

for(let i=0;i<dataPartenaire.length;i++){
    if(dataPartenaire[i].type=="institution"){
        institution.push(dataPartenaire[i]);
    }
    if(dataPartenaire[i].type=="entreprise"){
        entreprise.push(dataPartenaire[i]);
    }
}

affichageItem(institution,"institutionConteneur");
affichageItem(entreprise,"entrepriseConteneur");