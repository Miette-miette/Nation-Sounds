import CMS from './CMS.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let infoTemplate= await fetchRessource("./templates/informationTemplate.html"); //Template de la page info
console.log(infoTemplate);

let data=JSON.parse(localStorage.getItem('progItem'));
console.log(data);

document.getElementById('information').innerHTML=cms.replaceTemplate(data,infoTemplate);