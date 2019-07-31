import React from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import InfoTable from './InfoTable';

// let data = [{
//     id: '001',
//     name: '工作人员一号',
//     age: 51,
//     tel: '11',
//     hire_date: '2019-04-02',
//     gender: 'male'
// },{
//     id: '002',
//     name: '工作人员二号',
//     age: 23,    hire_date: '2019-03-04',
//     tel: '11',
//     gender: 'female'
// },{
//     id: '003',
//     name: '工作人员三号',
//     age: 61,
//     tel: '11',
//     hire_date: '2019-07-22',
//     gender: 'male'
// }]
const Employees = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="管理信息" second="管理员信息" />
        <Row>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="管理员信息">
                        <InfoTable character={'2'} />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default Employees;