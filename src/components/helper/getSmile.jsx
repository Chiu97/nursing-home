import {smileUrl} from '../../routes/Url'

function handleJson(jsonString){
    let jsonData = JSON.parse(jsonString);
    let smileData = [];
    for( let val in jsonData){
        // console.log(val + ',' + jsonData[val]);
        smileData.push(jsonData[val]);
    }
    localStorage.setItem('smileData',smileData);
}

function getSmile(){
    fetch(smileUrl)
    .then(response => response.json())
    .then(originData => JSON.stringify(originData))
    // .then( data => console.log("查看获得的微笑数据:"+data))
    .then( jsonStr => handleJson(jsonStr))
    // .then(console.log("成功获取微笑数据"))
    .catch( error => console.log("ooopps,error:"+error))
} 

export default getSmile;