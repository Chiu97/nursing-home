import React from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import InfoTable from './InfoTable';

const data = [{
    id: '001',
    name: '管理员一号',
    age: 51,
    telephone: '123',
    gender: 'male'
},{
    id: '002',
    name: '管理员二号',
    age: 23,
    telephone: '2131',
    gender: 'female'
},{
    id: '003',
    name: '管理员三号',
    age: 61,
    telephone: '432',
    gender: 'male'
}]

const Administrators = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="管理信息" second="管理员信息" />
        <Row>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="管理员信息">
                        <InfoTable data={data} />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default Administrators;