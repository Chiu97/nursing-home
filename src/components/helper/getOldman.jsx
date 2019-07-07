import Url from '../../routes/Url'

const oldmanURL = Url + '/oldperson_required'; 
function getOldmanData(){
    fetch(oldmanURL)
    .then(response => response.json())
    // .then(data => console.log('所获得老人的data:'+data))
    .then(originData => JSON.stringify(originData))
    .then(data => localStorage.setItem("oldmanData",data))
    .then(console.log("成功获取老人数据"))
    .catch( error => console.log("ooopps,error:"+error))
} 

export { getOldmanData };