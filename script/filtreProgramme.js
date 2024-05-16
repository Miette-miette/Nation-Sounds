export default function filtreProgramme(){

    // Filtrage par jour et tri par scene (A-Z)
    this.filtreJour=function(data,jour,tabJour){
        for (let d=0;d<data.length;d++){
            if (data[d].dateF==jour){
                
                tabJour.push(data[d]);
                tabJour.sort((a,b)=>(a.scene<b.scene)?1:-1)//trier par scene  
                 
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

    
}