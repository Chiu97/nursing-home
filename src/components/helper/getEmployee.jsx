import {employeeUrl} from '../../routes/Url'

function getEmployeeData(){
    fetch(employeeUrl)
    .then(response => response.json())
    // .then(data => console.log('所获得志愿者的data:'+data))
    .then(originData => JSON.stringify(originData))
    .then(data => localStorage.setItem("employeeData",data))
        .then(console.log('成功获取工作人员数据'))
    .catch( error => console.log("ooopps,error:"+error))
} 

export { getEmployeeData };