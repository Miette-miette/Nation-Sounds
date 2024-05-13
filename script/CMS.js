export default function CMS(){

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

this.formateur=function(articleCMS){
    const captureP= /^<p\s+([a-z]+="[A-z]+")*\s*>(.*)<\/p>$/mg;
    const captureJPG= /src="(.*\.jpg)"/mg;
    let dataGlobale=[];
    
    
    for(let m=0;m<articleCMS.length;m++){
        let matches=articleCMS[m].content.rendered.matchAll(captureP);
        let dataConcert={};
    
        let img=articleCMS[m].content.rendered.match(captureJPG);
        img=img[0].split('"')[1];
       
        let title=articleCMS[m].title.rendered;

        let tag=articleCMS[m].tags;
    
        dataConcert["src"]=img;
        dataConcert["title"]=title;
        dataConcert["tags"]=tag;
        console.log(tag);
        
    
        for (const match of matches) {
            
            let contenuConcert=match[2];
            
            let classeConcert= match[1].split('"');
            
            dataConcert[classeConcert[1]]=contenuConcert;
        }
    
        dataGlobale.push(dataConcert);
    }
    
    return dataGlobale
  }

  this.replaceTemplate=function(data,template){
    
    template=template.replace(`%tags%`, data.tags)
    template=template.replace(`%src%`, data.src);
    template=template.replace(`%title%`, data.title);
    template=template.replace(`%date%`, data.date);
    template=template.replace(`%scene%`, data.scene);
    template=template.replace(`%heure%`, data.heure);
        
    console.log(template);   

    return template;
    
  }
    

 }

 


