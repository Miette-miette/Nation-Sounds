import CMS from './CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE CONCERT ID=18

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?per_page=40");// Articles programmation de Nation Sounds WP 
console.log(articleCMS);

let dataArticle= cms.formateur(articleCMS);
console.log(dataArticle); //données formatées

let concertTemplate= await fetchRessource("./templates/concertTemplate.html"); //Template de la page concert