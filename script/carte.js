import CMS from './CMS.js';
import ressourceCarte from './ressourcesCarte.js';
import fetchRessource from './fetchRessource.js';

let cms= new CMS(); 

let ressource= new ressourceCarte();

//CATEGORIE CARTE ID=6

const carteCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=6");// Carte de Nation Sounds WP 
console.log(carteCMS);

let infoCarte= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=10+14&per_page=80");//Informations des lieux et des scènes
infoCarte=cms.formateur(infoCarte);
console.log(infoCarte);

// TEMPLATES

const infoConcertTemplate= await fetchRessource("./templates/carteConcertTemplate.html");//Affichage des evenements

const infoFoodTemplate= await fetchRessource("./templates/carteFoodTemplate.html");//Affichage des restaurants

const aucunConcertTemplate= await fetchRessource("./templates/aucunEvent.html");//Affichage si event=null

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
        let marker = L.marker([markerObj.latitude,markerObj.longitude],{icon: markerObj.img}).bindPopup(markerObj.bulle);
        switch(markerObj.class){
            case "scene":
                scene.push(marker);

            case "food":
                food.push(marker);

            case "wc":
                wc.push(marker);
        }
        all.push(marker);  
        console.log(markerObj);

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

L.control.layers(markerFiltre).addTo(map);

//RECUPERATION DES INFORMATIONS SUPPLEMENTAIRES

let markerIdRegex=/06\/(.*).png/gm;

let listMarkerMap= document.getElementsByClassName('leaflet-marker-icon');
console.log(listMarkerMap);

function newListMarker(){
    /*listMarkerMap.forEach((marker)=>{
        let nameId=marker.src.match(markerIdRegex);
        console.log(nameId);
        nameId=nameId[0].split('/');
        nameId=nameId[1].split('.')[0];
        marker.id=nameId;

        marker.addEventListener('click',()=>{
            infoLieu(marker.id);
        })
    })*/

    for(let l=0;l<listMarkerMap.length;l++){
        let nameId=listMarkerMap[l].src.match(markerIdRegex);
        console.log(nameId);
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

    const conteneurInfo=document.getElementById('conteneurInformations');

    for(let t=0;t<infoCarte.length;t++){
        let todayDate= new Date();
        if(infoCarte[t].type==id){ //AFFICHAGE DES INFOS SUR LES LIEUX
            let infoItem=cms.replaceTemplate(infoCarte[t],infoFoodTemplate);
            conteneurInfo.innerHTML=infoItem;
            conteneurInfo.style.backgroundColor="beige";
        } 

        if(infoCarte[t].type=="concert"||infoCarte[t].type=="atelier"||infoCarte[t].type=="performance"){ //AFFICHAGE DES SPECTACLES EN TEMPS REEL PAR SCENE
            if(infoCarte[t].scene.toLowerCase()==id){
                let infoDate=new Date(infoCarte[t].dateF);
                console.log(todayDate);

                if(infoDate<=todayDate){
                    let infoItem=cms.replaceTemplate(infoCarte[t],infoConcertTemplate);
                    conteneurInfo.innerHTML=infoItem;
                    conteneurInfo.style.backgroundColor="#8f505e";
                    break;
                }
                else{
                    conteneurInfo.innerHTML=aucunConcertTemplate;
                    conteneurInfo.style.backgroundColor="beige";
                } 
            }
        }               
    } 
}

//ADD EVENT LISTENER POUR LE CHANGEMENT DE LAYER

const btnRadio=document.getElementsByClassName('leaflet-control-layers-selector');

for(let i=0;i<btnRadio.length;i++){
    btnRadio[i].addEventListener('click',()=>{
        newListMarker();
    })
}


/*
btnRadio.forEach(function(btn){
    btn.addEventListener('click',()=>{
        newListMarker();
    })
})

    
}*/
