import {volunteerUrl} from '../../routes/Url'

function getVolunteerData(){
    fetch(volunteerUrl)
    .then(response => response.json())
    // .then(data => console.log('所获得志愿者的data:'+data))
    .then(originData => JSON.stringify(originData))
    .then( data => console.log("查看获得的志愿者数据:"+data))
    // .then(data => localStorage.setItem("volunteerData",data))
    .then(console.log("成功获取志愿者数据"))
    .catch( error => console.log("ooopps,error:"+error))
} 

export { getVolunteerData };