export default function ressourceCarte(){

    //Creation objet icon

    this.iconObj=function(url,longueur,largeur){
        let icon=L.icon({
            iconUrl:url, 
            iconSize: [longueur,largeur],
        })
        console.log(icon);
    return icon;
    }

    this.markerObj=function(dataMarker){

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
    }
}