import CMS from './CMS.js';
import ressourceCarte from './ressourcesCarte.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

let ressource= new ressourceCarte;

//CATEGORIE CARTE ID=6

let carteCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=6");// Carte de Nation Sounds WP 
console.log(carteCMS);

let infoCarte= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=28+18&per_page=10");//Informations des lieux et des scènes
infoCarte=cms.formateur(infoCarte);
console.log(infoCarte);

// TEMPLATES

let infoConcertTemplate= await fetchRessource("./templates/carteConcertTemplate.html");//Affichage des evenements

let infoFoodTemplate= await fetchRessource("./templates/carteFoodTemplate.html");//Affichage des restaurants

let aucunConcertTemplate= await fetchRessource("./templates/aucunEvent.html");//Affichage si event=null

// DONNEES FORMATEES

let dataCarte= cms.carteData(carteCMS);//données formatées
console.log(dataCarte);

//CREATION DES OBJETS MARQUEUR (données géographique, class, icon)

const dataMarkerRegex=/marker((.|\n)+?)<\/script>/gm;

let dataMarker=carteCMS[0].content.rendered.match(dataMarkerRegex); //Données brutes des marqueurs

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
let foodLayer=L.layerGroup(food);
let wcLayer=L.layerGroup(wc);

let markerFiltre={
    "Tous": allLayer,
    "Scenes": sceneLayer,
    "Restauration": foodLayer,
    "WC": wcLayer,
}

//RECUPERATION DES DONNEES GEOGRAPHIQUES DE LA MAP

const latitudeRegex=/setView\(\[(\d*.\d*)/gm;
const longitudeRegex=/setView\(\[\d*.\d*\,(\d*.\d*)/gm;

let latitudeMap=carteCMS[0].content.rendered.match(latitudeRegex);
latitudeMap=latitudeMap[0].split('[')[1];

let longitudeMap=carteCMS[0].content.rendered.match(longitudeRegex);
longitudeMap=longitudeMap[0].split(',')[1];

//SETUP DE LA MAP ET AFFICHAGE DES LAYERS

let map = L.map('map',{
    center:[latitudeMap,longitudeMap],
    zoom: 15,
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

allLayer.addTo(map);

let layerControl=L.control.layers(markerFiltre).addTo(map);

//RECUPERATION DES INFORMATIONS SUPPLEMENTAIRES

let markerIdRegex=/05\/(.*).png/gm;

let listMarkerMap= document.getElementsByClassName('leaflet-marker-icon');
console.log(listMarkerMap);

function newListMarker(){
    for(let l=0;l<listMarkerMap.length;l++){
        let nameId=listMarkerMap[l].src.match(markerIdRegex);
        nameId=nameId[0].split('/');
        nameId=nameId[1].split('.')[0];
        listMarkerMap[l].id=nameId;

        listMarkerMap[l].addEventListener('click',()=>{
            infoLieu(listMarkerMap[l].id);
        })
    }
}
newListMarker();

//FONCTION POUR AFFICHER LES INFOS RELATIVES AUX MARQUEURS

function infoLieu(id){

    for(let t=0;t<infoCarte.length;t++){
        let todayData= new Date();
        if(infoCarte[t].type==id){ //AFFICHAGE DES INFOS SUR LES LIEUX
            let infoItem=cms.replaceTemplate(infoCarte[t],infoFoodTemplate);
            document.getElementById('conteneurInformations').innerHTML=infoItem;
        } 

        if(infoCarte[t].type=="concert"||infoCarte[t].type=="atelier"||infoCarte[t].type=="performance"){ //AFFICHAGE DES SPECTACLES EN TEMPS REEL PAR SCENE
            if(infoCarte[t].scene.toLowerCase()==id){
                console.log(infoCarte[t].dateF);
                console.log(todayData);
                if(infoCarte[t].dateF>=todayData){
                    
                    let infoItem=cms.replaceTemplate(infoCarte[t],infoConcertTemplate);
                    document.getElementById('conteneurInformations').innerHTML=infoItem;
                }
                if(infoCarte[t].dateF!=todayData){
                    document.getElementById('conteneurInformations').innerHTML=aucunConcertTemplate;
                } 
            }
        }               
    } 
}

//ADD EVENT LISTENER POUR LE CHANGEMENT DE LAYER

let btnRadio=document.getElementsByClassName('leaflet-control-layers-selector');

for(let r=0;r<btnRadio.length;r++){
    btnRadio[r].addEventListener('click',()=>{
        newListMarker();
    })
}

 