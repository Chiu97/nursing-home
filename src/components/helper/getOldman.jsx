import {oldmanUrl} from '../../routes/Url'

function getOldmanData(){
    fetch(oldmanUrl)
    .then(response => response.json())
    // .then(data => console.log('所获得老人的data:'+data))
    .then(originData => JSON.stringify(originData))
    .then(data => localStorage.setItem("oldmanData",data))
        .then(console.log('成功获取老人数据'))
        // .then( console.log('getOldman.jsx:'+localStorage.getItem("oldmanData")))
    .catch( error => console.log("ooopps,error:"+error))
} 

export { getOldmanData };