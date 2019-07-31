import React from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import OldManTable from './OldManTable';
import {getOldmanData} from '../helper/getOldman';
// var fs = require('browserify-fs');
// var testData = require('../../routes/oldman.json');
// testData.forEach( data => {
//     console.log("Data.id:"+data.id+",data.telephone"+data.telephone);
// });
// let writeToOldmanJson = (dataSource) => {
//     let dataString = JSON.stringify(dataSource);
//     fs.writeFile("../../routes/oldman.json",dataString,function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("成功写入");
//     });
// }

// let oldmanLocal = (dataSource) => {
//     let dataString = JSON.stringify(dataSource);
//     localStorage.setItem("oldmanData",dataString);
//     let oldmanData = localStorage.getItem("oldmanData");
//     console.log("所获得的oldman data:"+oldmanData);
// }

// localStorage.removeItem("oldmanData");
// getOldmanData();
// console.log("get oldman:" + localStorage.getItem("oldmanData"));
// let data = [{
//     id: '001',
//     name: '老人一号',
//     tel: '4444',
//     gender: 'male',
//     editable: true,
//     first_guardian_name: '监护人一号',
//     first_guardian_tel: '1231231',
//     character: 'oldman',
//     relationship: 1,
//     avatarUrl: "/aaa",
//     smile_count: 5,
//     check_in_date: "2019-01-03",
//     check_out_date: "2018-02-14"
// },{
//     id: '002',
//     name: '老人二号',
//     tel: '4444',
//     gender: 'female',
//     first_guardian_name: '监护人二号',
//     first_guardian_tel: '123331',
//     character: 'oldman',
//     relationship: 0,
//     avatarUrl: "/bbb",
//     smile_count: 15,
//     check_in_date: "2019-01-22",
//     check_out_date: "2018-02-04"
// },{
//     id: '003',
//     name: '老人三号',
//     tel: '4444',
//     gender: 'male',
//     first_guardian_name: '监护人三号',
//     first_guardian_tel: '12323',
//     character: 'oldman',
//     relationship: 2,
//     avatarUrl: "/ccc",
//     smile_count: 6,
//     check_in_date: "2019-01-03",
//     check_out_date: "2018-05-14",
// }]

// getOldmanData();
// let data = JSON.parse(localStorage.getItem("oldmanData"));



class OldManTables extends React.Component{
    // componentDidMount() {
    //     localStorage.removeItem('oldmanData');
    //     getOldmanData();
    //     data = JSON.parse(localStorage.getItem("oldmanData"));
    // }

    render(){
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="管理信息" second="老人管理信息" />
                <Row>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="老人信息">
                                {/* <InfoTable data={data} /> */}
                                <OldManTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OldManTables;