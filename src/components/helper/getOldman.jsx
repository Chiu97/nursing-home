import {oldmanUrl} from '../../routes/Url'

function getOldmanData(){
    fetch(oldmanUrl)
    .then(response => response.json())
    // .then(data => console.log('所获得老人的data:'+data))
    .then(originData => JSON.stringify(originData))
    .then( data => console.log("查看获得的老人数据:"+data))
    // .then(data => localStorage.setItem("oldmanData",data))
    .then(console.log("成功获取老人数据"))
    .catch( error => console.log("ooopps,error:"+error))
} 

export { getOldmanData };