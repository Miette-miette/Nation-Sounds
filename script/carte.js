import CMS from './CMS.js';
import ressourceCarte from './ressourcesCarte.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS(); 

let ressource= new ressourceCarte;

//CATEGORIE CARTE ID=26

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts?categories=26");// Carte de Nation Sounds WP 
console.log(articleCMS);

let dataCarte= cms.carteData(articleCMS);//données formatées
console.log(dataCarte); 

//RECUPERATION DES DONNEES GEOGRAPHIQUES DE LA MAP

const latitudeRegex=/setView\(\[(\d*.\d*)/gm;
const longitudeRegex=/setView\(\[\d*.\d*\,(\d*.\d*)/gm;

let latitudeMap=articleCMS[0].content.rendered.match(latitudeRegex);
latitudeMap=latitudeMap[0].split('[')[1];

let longitudeMap=articleCMS[0].content.rendered.match(longitudeRegex);
longitudeMap=longitudeMap[0].split(',')[1];


//SETUP DE LA MAP ET AFFICHAGE

let map = L.map('map').setView([latitudeMap,longitudeMap], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//CREATION DES OBJETS MARQUEUR (données géographique, class, icon)

const dataMarkerRegex=/marker((.|\n)+?)<\/script>/gm;

let dataMarker=articleCMS[0].content.rendered.match(dataMarkerRegex); //Données brutes des marqueurs
console.log(dataMarker);

let markerFormatage=[];

function formatageMarker(){
    for(let d=0;d<dataMarker.length;d++){
    let markerObj=ressource.markerObj(dataMarker[d]);
    console.log(markerObj);
    markerFormatage.push(markerObj);
    }
}
formatageMarker();
console.log(markerFormatage);

//FILTRER SELON LES CHECKBOX

let inputFiltre={ 
    "scene":true,
    "food":true,
    "wc":true,
}

console.log(inputFiltre);

function inputChange(){

    inputFiltre.scene=document.getElementById("scene").checked;
    inputFiltre.food=document.getElementById("food").checked;
    inputFiltre.wc=document.getElementById("wc").checked;
    console.log(inputFiltre);

    let tab=[];
    ressource.filtreCarte(markerFormatage,inputFiltre,tab);
    ressource.affichageMarker(tab,map)
}
 
//ADD EVENT LISTENER SUR LES CHECKBOX

let inputCarte= document.getElementsByClassName("carteInput");
console.log(inputCarte);

for(let i=0;i<inputCarte.length;i++){
    inputCarte[i].addEventListener("change",inputChange)
}







