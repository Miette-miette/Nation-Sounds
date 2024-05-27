import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE CARTE ID=26

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?categories=26");// Carte de Nation Sounds WP 
console.log(articleCMS);

let dataCarte= cms.carteData(articleCMS);//données formatées
console.log(dataCarte); 



document.getElementById('carteConteneur').innerHTML=Object.values(dataCarte).join(' '); 


