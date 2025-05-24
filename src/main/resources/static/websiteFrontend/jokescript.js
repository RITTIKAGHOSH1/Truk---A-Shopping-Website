const btnElement=document.getElementById("btn")
const jokeEl=document.getElementById("joke")
const apiKey="e43L50R41zMDNdeEkHI7CQ==GgU5mz7buAbalPeQ";

const options = {
    method: "GET" ,
    headers: {
        "X-Api-Key" : apiKey,
    },
}; 

const apiURL="https://api.api-ninjas.com/v1/dadjokes";

//when we click the button , we call this funct
async function getJoke(){

try {
    jokeEl.innerText="Updating..";
btnElement.disabled=true;
btnElement.innerText="Loading.."
   const response=await fetch(apiURL,options);
   const data =await response.json();

   btnElement.disabled=false;
btnElement.innerText="Tell me another joke"
   //console.log(data[0].joke);
   jokeEl.innerText=data[0].joke; 
} catch (error) {
    jokeEl.innerText="Error, try again later.."; 
     btnElement.disabled=false;
btnElement.innerText="Tell me a joke"
    console.log(error);
}


}

btnElement.addEventListener("click",getJoke)