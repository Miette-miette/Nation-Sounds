export default function CMS(){

//Fonction pour recuperer les données du CMS

  this.dataCMS=async function(src=null){
      let promise = fetch(src)
        .then((res) => res.json())
        .catch(error => {
          console.log(error);
          return {};
        })
        .then((res) => res);
    
    return await promise; 
  }

//Fonction pour formater les données du CMS en un nouvel objet

  this.formateur=function(articleCMS){
      const captureP= /^<p\s+([a-z]+="[A-z]+")*\s*>(.*)<\/p>$/mg; //Capture des paragraphe des articles
      const captureJPG= /src="(.*\.jpg)"/mg;// Capture de l'image
      const captureDivArticle=/<div\s+(.*=".*")>(.*)\n(<p>(.*\n*)*?)<\/div>/gm;
      let dataGlobale=[];
      
      
      for(let m=0;m<articleCMS.length;m++){

          let matches=articleCMS[m].content.rendered.matchAll(captureP);
          let dataConcert={};

      
          let img=articleCMS[m].content.rendered.match(captureJPG);
          img=img[0].split('"')[1];
        
          let title=articleCMS[m].title.rendered;

          let tag=articleCMS[m].tags;

          let article=articleCMS[m].content.rendered.match(captureDivArticle);  

          dataConcert["src"]=img;
          dataConcert["title"]=title;
          dataConcert["tags"]=tag;
          dataConcert["corps"]=article;
          
          for (const match of matches) { //Récupération des classes de l'article pour creer les objets
              
              let contenuConcert=match[2];
              
              let classeConcert= match[1].split('"');
              
              dataConcert[classeConcert[1]]=contenuConcert;
          }
      
          dataGlobale.push(dataConcert);
      }
      return dataGlobale
    }

    //Fonction pour recuperer les données de la carte

    this.carteData=function(articleCMS){

      for(let c=0;c<articleCMS.length;c++){
        let carteData={};

        let content=articleCMS[c].content.rendered;

        carteData["content"]=content;

        return carteData;
      }
    }

    //Fonction pour remplir les templates 

    this.replaceTemplate=function(data,template){

      template=template.replace(`%id%`, data.title)
      template=template.replace(`%lieu%`, data.lieu)
      template=template.replace(`%src%`, data.src);
      template=template.replace(`%title%`, data.title);
      template=template.replace(`%date%`, data.date);
      template=template.replace(`%scene%`, data.scene);
      template=template.replace(`%heure%`, data.heure);
      template=template.replace(`%chapeau%`, data.chapeau)
      template=template.replace(`%description%`, data.description);
      template=template.replace(`%article%`, data.corps);
      template=template.replace(`%iconS%`, data.iconScene);
      return template;
    } 

    //Foction pour recuperer les data à partir du titre
    
    this.progItemFromTitle= function(data,title){

      for (let i=0;i<data.length;i++){
          if(title==data[i].title){
            console.log(data[i]);
              return data[i];
          }
      }     
    }  

    //Fonction pour generer la page informations

    this.pageInformation=function(classItem,data){
      let cardItem=document.getElementsByClassName(classItem);

      for (let i=0;i<cardItem.length;i++){
        cardItem[i].addEventListener('click',()=>{
          console.log("click");
            localStorage.setItem('infoItem', JSON.stringify(this.progItemFromTitle(data,cardItem[i].id)))
            window.open('./information.html','_self');
        })
      }
    }
}
 


