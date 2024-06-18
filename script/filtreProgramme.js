export default function filtreProgramme(){

    // Filtrage par jour et tri par scene (A-Z)
    this.filtreJour=function(data,jour,tabJour){
        for (let d=0;d<data.length;d++){
            if (data[d].date==jour){   
                tabJour.push(data[d]);
                tabJour.sort((a,b)=>(a.scene>b.scene)?1:-1)//trier par scene      
            }   
        } console.log(tabJour, "affichage jour");
    }

    //Filtrage par scene et tri par heure

    this.filtreScene=function(tabJour,scene,tabScene){
        for(let t=0;t<tabJour.length;t++){
            if(tabJour[t].scene==scene){
                tabScene.push(tabJour[t])
                tabScene.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)) //trier par heure 
                
            }
        }console.log(tabScene, "affichage scene");
    }

    //Filtrage par type et par heure

    this.filtreType=function(tabData,type,tabType){
        for(let t=0;t<tabData.length;t++){
            if(tabData[t].type==type){
                tabType.push(tabData[t])
                tabType.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)) //trier par heure 
                
            }
        }console.log(tabType, "affichage type");
    }

    //Filtrage par heure

    this.filtreHeure=function(tabData,heure,tabHeure){
        for(let h=0;h<tabData.length;h++){
            if(tabData[h].heureF>=heure ){
                tabHeure.push(tabData[h])
                tabHeure.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)) //trier par heure 
                
            }
        }console.log(tabHeure, "affichage heure");
    }


    //FILTRAGE DYNAMIQUE POUR PAGE PROGRAMATION

    this.filtreAll=function(data,filtre,tab){
        for(let a=0;a<data.length;a++){

            let jourRegex=/(^\w+)/gm;

            let jourSelected=data[a].date.match(jourRegex);//Recuperer seulement le jour sur l'element date de data 
            console.log(jourSelected);

            if((jourSelected[0]==filtre.jour|| filtre.jour=="Tous")&&(data[a].heureF>=filtre.heure) ){ //FILTRAGE PAR DONNEES TEMPORELLES

                if((data[a].scene==filtre.lieux || filtre.lieux=="Tous") && (data[a].type==filtre.type || filtre.type=="Tous")){ //FILTRAGE PAR LIEUX ET TYPE
                    tab.push(data[a]);
                }
            }

            tab.sort((a,b)=>(a.scene>b.scene)?1:-1);
            tab.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)); 
            console.log(tab);
            
        }
    }  
}