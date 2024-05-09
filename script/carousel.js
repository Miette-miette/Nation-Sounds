import dataCMS from './dataCMS.js';
import fetchRessource from './fetchressource.js';

let data= await dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts");
console.log(data);

let carouselTemplate= await fetchRessource("./templates/carouselCard.html");
console.log(carouselTemplate);

/*Remplir le template carousel card*/








