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

//CREATION DES OBJETS MARQUEUR (données géographique, class, icon)

const dataMarkerRegex=/marker((.|\n)+?)<\/script>/gm;

let dataMarker=articleCMS[0].content.rendered.match(dataMarkerRegex); //Données brutes des marqueurs
console.log(dataMarker);

let all=[];
let scene=[];
let food=[];
let wc=[];

function formatageMarker(){
    for(let d=0;d<dataMarker.length;d++){
        let markerObj=ressource.markerFormatage(dataMarker[d]);
        let markerAll = L.marker([markerObj.latitude,markerObj.longitude],{icon: markerObj.img}).bindPopup(markerObj.bulle);
        all.push(markerAll);  
        console.log(markerObj);

        if(markerObj.class=="scene"){
            let markerScene = L.marker([markerObj.latitude,markerObj.longitude],{icon: markerObj.img}).bindPopup(markerObj.bulle);
            scene.push(markerScene);  
        }
        if(markerObj.class=="food"){
            let markerFood = L.marker([markerObj.latitude,markerObj.longitude],{icon: markerObj.img}).bindPopup(markerObj.bulle);
            food.push(markerFood);
        }
        if(markerObj.class=="wc"){
            let markerWc = L.marker([markerObj.latitude,markerObj.longitude],{icon: markerObj.img}).bindPopup(markerObj.bulle);
            wc.push(markerWc);
        }
    }
}
formatageMarker();

let allLayer=L.layerGroup(all);
let sceneLayer=L.layerGroup(scene);
console.log(sceneLayer);
let foodLayer=L.layerGroup(food);
console.log(foodLayer);
let wcLayer=L.layerGroup(wc);
console.log(wcLayer);

let overlayMap={
    "Tous": allLayer,
    "Scenes": sceneLayer,
    "Restauration": foodLayer,
    "WC": wcLayer,
}
console.log(overlayMap);

//RECUPERATION DES DONNEES GEOGRAPHIQUES DE LA MAP

const latitudeRegex=/setView\(\[(\d*.\d*)/gm;
const longitudeRegex=/setView\(\[\d*.\d*\,(\d*.\d*)/gm;

let latitudeMap=articleCMS[0].content.rendered.match(latitudeRegex);
latitudeMap=latitudeMap[0].split('[')[1];

let longitudeMap=articleCMS[0].content.rendered.match(longitudeRegex);
longitudeMap=longitudeMap[0].split(',')[1];

//SETUP DE LA MAP ET AFFICHAGE

let map = L.map('map',{
    center:[latitudeMap,longitudeMap],
    zoom: 15,
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

let layerControl=L.control.layers(overlayMap).addTo(map);

/*let layerTousRadio=document.getElementsByClassName('leaflet-control-layers-selector')[0];
layerTousRadio.checked=true;
console.log(layerTousRadio)*/


