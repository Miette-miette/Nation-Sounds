export default async function dataCMS(src=null){


  const xhr = new XMLHttpRequest();

  xhr.open("GET", src);
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = xhr.response;
      console.log(data);
      console.log(data[1].title,"titre");
      console.log(data[1].id,"id");
      console.log(data[1].content,"content");
      console.log(JSON.stringify(data[1].content),"content");
      return data;
    } 
    else {
      console.log(`Error: ${xhr.status}`);
    }
  }
}