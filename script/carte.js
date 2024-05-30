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

//Récuperation des données de latitude et longitude de la carte

const latitudeRegex=/setView\(\[(\d*.\d*)/gm;
const longitudeRegex=/setView\(\[\d*.\d*\,(\d*.\d*)/gm;

let latitudeMap=articleCMS[0].content.rendered.match(latitudeRegex);
latitudeMap=latitudeMap[0].split('[')[1];
console.log(latitudeMap);

let longitudeMap=articleCMS[0].content.rendered.match(longitudeRegex);
longitudeMap=longitudeMap[0].split(',')[1];
console.log(longitudeMap);
 
//SETUP DE LA MAP ET AFFICHAGE

let map = L.map('map').setView([latitudeMap,longitudeMap], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//AFFICHAGE DES MARQUEURS



//CONFIGURER LES MARQUEURS: AVOIR UNE VARIABLE CHAQUE SCENE

let markersTab=[];


const dataMarkerRegex=/marker((.|\n)+?)<\/script>/gm;

let dataMarker=articleCMS[0].content.rendered.match(dataMarkerRegex); //Tableau des différents marqueurs
console.log(dataMarker);

const latMarkerRegex=/marker\(\n( )*\[(\d*.\d*)/gm;
const lonMarkerRegex=/marker\(\n( )*\[(\d*.\d*\,\d*.\d*)/gm;

for (let m=0;m<dataMarker.length;m++){

    let markerObj={};

    let latMarker=dataMarker[m].match(latMarkerRegex);
    latMarker=latMarker[0].split('[')[1];
    console.log(latMarker); 
    
    let lonMarker=dataMarker[m].match(lonMarkerRegex);
    lonMarker=lonMarker[0].split(',')[1];
    console.log(lonMarker); 

    markerObj["latitude"]=latMarker;
    markerObj["longitude"]=lonMarker;

    markersTab.push(markerObj);
    console.log(markerObj);

}

console.log(markersTab);


for (let t=0;t<markersTab.length;t++){
    let marker = L.marker([markersTab[t].latitude,markersTab[t].longitude]).addTo(map);
}