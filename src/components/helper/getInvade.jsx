import {invadeUrl} from '../../routes/Url'

function handleJson(jsonString){
    let jsonData = JSON.parse(jsonString);
    let invadeData = [];
    for( let val in jsonData){
        invadeData.push(String(jsonData[val]));
    }
    localStorage.setItem('invadeData',invadeData);
}

function getInvade(){
    fetch(invadeUrl)
    .then(response => response.json())
    .then(originData => JSON.stringify(originData))
    .then( jsonStr => handleJson(jsonStr))
    .catch( error => console.log("ooopps,error:"+error))
} 

export default getInvade;