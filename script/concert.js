import CMS from './CMS.js';
import fetchRessource from './fetchressource.js';

let cms= new CMS();

let articleCMS= await cms.dataCMS("http://localhost/nation-sounds/wp-json/wp/v2/posts");
console.log(articleCMS);

let dataArticle= await cms.formateur(articleCMS);
console.log(dataArticle); //données formatées

let concertTemplate= await fetchRessource("./templates/concertTemplate.html");
console.log(concertTemplate);




/* NUMERO DE TAGS */

/*13=vendredi*/
/*4=samedi*/
/*9=dimanche*/


/*22=euphorie*/
/*15=reverie*/
/*3=prisme*/
/*23=resonnance*/
/*21=fusion*/


/*template*/

let concertItem=[];

for (let c=0;c<dataArticle.length;c++){
    let data=dataArticle[c];
    console.log(data);
    let templateItem= cms.replaceTemplate(data,concertTemplate); 
    concertItem.push(templateItem)
}
console.log(concertItem);

document.getElementById('euphorie').innerHTML=concertItem.join(' ');


/*Filtrage par scene et par jour*/

let tag= dataArticle.tags;

let scene=dataArticle.scene;



/*if scene= value de class scene =afficher*/

const tagEuphorie= 22;
const tagReverie= 15;
const tagPrisme=3;
const tagResonnance=23;
const tagFusion=21

for (let s=0;s<concertItem.length;s++){
    console.log(document.getElementsByClassName('Euphorie'));
    if (concertItem[s]=="Euphorie"){
        console.log(concertItem[s].class);
    }
}


/*if tag=class de l'input = afficher*/


/*for (v=0;v<tag.length;v++){
    if tag[v]==13{

    }
}*/







/*Nouveau tableau à afficher*/
















