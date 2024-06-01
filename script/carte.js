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

//Récuperation des données de latitude et longitude de la carte

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

//CONFIGURER LES MARQUEURS: TRANSFORMER EN FONCTION ET METTRE DANS RESSOURCE

let markersTab=[];

const dataMarkerRegex=/marker((.|\n)+?)<\/script>/gm;

let dataMarker=articleCMS[0].content.rendered.match(dataMarkerRegex); //Tableau des différents marqueurs
console.log(dataMarker);

const latMarkerRegex=/marker\(\n( )*\[(\d*.\d*)/gm;
const lonMarkerRegex=/marker\(\n( )*\[(\d*.\d*\,\d*.\d*)/gm;
const imgMarkerRegex=/"iconUrl":(.*).png/gm;
const antislashRegex=/\\/gm;
const sizeRegex=/"iconSize":"(.*).."/gm;
const bulleRegex=/unescape\('(.*)'\)/gm;
const titleRegex=/"title":"(.*?),"/gm;

for (let m=0;m<dataMarker.length;m++){

    let markerObj={};

    //Latitude

    let latMarker=dataMarker[m].match(latMarkerRegex);
    latMarker=latMarker[0].split('[')[1]; 
    markerObj["latitude"]=latMarker;

    //Longitude
    
    let lonMarker=dataMarker[m].match(lonMarkerRegex);
    lonMarker=lonMarker[0].split(',')[1]; 
    markerObj["longitude"]=lonMarker;

    //Title

    let classMarker=dataMarker[m].match(titleRegex);
    classMarker=classMarker[0].split(':')[1]; 
    classMarker=classMarker.split('"')[1]; 
    console.log(classMarker);

    //URL icon
   
    let imgMarker=dataMarker[m].match(imgMarkerRegex);
    imgMarker=imgMarker[0].split(':"')[1];
    imgMarker=imgMarker.replace(antislashRegex,"")

    //Size icon

    let sizeMarker=dataMarker[m].match(sizeRegex);
    sizeMarker=sizeMarker[0].split(':"')[1];

    let longueur=sizeMarker.split(',')[0];
    let largeur=sizeMarker.split(',')[1];
    largeur=largeur.split('"')[0];

    markerObj["img"]=ressource.iconObj(imgMarker,longueur,largeur);

    //Bulle icon

    let bulle=dataMarker[m].match(bulleRegex);
    bulle=bulle[0].split('\'')[1];
    console.log(bulle);

    markerObj["bulle"]=bulle;

    markersTab.push(markerObj);
}
console.log(markersTab);

//TRI DES LAYERS

let sceneLayer=[];
let wcLayer=[];
let foodLayer=[];

//RECUPERER LE TITLE POUR CHAQUE OBJET ET TRIER DANS LES TABLEAUX
//SUPPRIMER LE MARKER TAB ET AFFICHER LES 4 TABLEAUX SIMULTANEMENT 
//FILTRER SELON LA SELECTION

//AFFICHAGE DES MARQUEURS 

for (let t=0;t<markersTab.length;t++){
    let marker = L.marker([markersTab[t].latitude,markersTab[t].longitude],{icon: markersTab[t].img}).addTo(map).bindPopup(markersTab[t].bulle);
}