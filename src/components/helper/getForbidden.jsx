import {forbiddenUrl} from '../../routes/Url'

function handleJson(jsonString){
    let jsonData = JSON.parse(jsonString);
    let forbiddenData = [];
    for( let val in jsonData){
        forbiddenData.push(jsonData[val]);
    }
    localStorage.setItem('forbiddenData',forbiddenData);
}

function getInvade(){
    fetch(forbiddenUrl)
    .then(response => response.json())
    .then(originData => JSON.stringify(originData))
    .then( jsonStr => handleJson(jsonStr))
    .catch( error => console.log("ooopps,error:"+error))
} 

export default getInvade;