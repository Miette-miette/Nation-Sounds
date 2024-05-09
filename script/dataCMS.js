export default async function dataCMS(src=null){

  const xhr = new XMLHttpRequest();

  xhr.open("GET", src);
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = xhr.response;
      console.log(data);
    } 
    else {
      console.log(`Error: ${xhr.status}`);
    }
  }
}