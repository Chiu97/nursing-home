import Url from '../../routes/Url'

const dataUrl = Url + '/volunteer_required'; 
function getVolunteer(){
    fetch(dataUrl)
    .then(response => response.json())
    // .then(data => console.log('所获得志愿者的data:'+data))
    .then(originData => JSON.stringify(originData))
    .then(data => localStorage.setItem("volunteer",data))
    .then(console.log("成功获取志愿者数据"))
    .catch( error => console.log("ooopps,error:"+error))
} 

export { getVolunteer };