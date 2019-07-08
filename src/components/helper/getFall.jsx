import {fallUrl} from '../../routes/Url'

function handleJson(jsonString){
    let jsonData = JSON.parse(jsonString);
    let fallData = [];
    for( let val in jsonData){
        fallData.push(jsonData[val]);
    }
    localStorage.setItem('fallData',fallData);
}

function getInvade(){
    fetch(fallUrl)
    .then(response => response.json())
    .then(originData => JSON.stringify(originData))
    .then( jsonStr => handleJson(jsonStr))
    .catch( error => console.log("ooopps,error:"+error))
} 

export default getInvade;