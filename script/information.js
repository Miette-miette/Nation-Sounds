import CMS from './CMS.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

const infoTemplate= await fetchRessource("./templates/informationTemplate.html"); //Template pour la programmation
console.log(infoTemplate);

const articleTemplate= await fetchRessource("./templates/articleTemplate.html"); //Template pour les articles

let data=JSON.parse(localStorage.getItem('infoItem'));
console.log(data);

console.log(data.chapeau);
if(!data.chapeau){
    document.getElementById('information').innerHTML=cms.replaceTemplate(data,infoTemplate);
}
else{
    document.getElementById('information').innerHTML=cms.replaceTemplate(data,articleTemplate);
}
