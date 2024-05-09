import dataCMS from './dataCMS.js';
import fetchRessource from './fetchressource.js';

let articleCMS= await dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts");
    articleCMS=JSON.stringify(articleCMS);
    console.log(articleCMS);

let carouselTemplate= await fetchRessource("./templates/carouselCard.html");
console.log(carouselTemplate);

/*Remplir le template carousel card*/








