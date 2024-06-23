import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE PARTENAIRE ID=27

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?categories=27&per_page=60");// Articles partenaires de Nation Sounds WP 
console.log(articleCMS);

let dataPartenaire= cms.formateur(articleCMS);//données formatées
console.log(dataPartenaire); 

let partenaireTemplate= await fetchRessource("./templates/partenaireTemplate.html"); //Template de la page programme

function affichageItem(tab,conteneur){    
    for(let i=0;i<tab.length;i++){
        tab[i]= cms.replaceTemplate(tab[i],partenaireTemplate); 
    }
    document.getElementById(conteneur).innerHTML=tab.join(' '); 
}

let institution=[];
let entreprise=[];

for(let t=0;t<dataPartenaire.length;t++){
    if(dataPartenaire[t].type=="institution"){
        institution.push(dataPartenaire[t]);
    }
    if(dataPartenaire[t].type=="entreprise"){
        entreprise.push(dataPartenaire[t]);
    }
}

affichageItem(institution,"institutionConteneur");
affichageItem(entreprise,"entrepriseConteneur");

console.log(institution);
console.log(entreprise);