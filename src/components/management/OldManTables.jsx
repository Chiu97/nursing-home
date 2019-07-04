import React from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import OldManTable from './OldManTable';
// import InfoTable from './InfoTable';

const data = [{
    id: '001',
    name: '老人一号',
    age: 47,
    telephone: '12340',
    gender: 'male',
    editable: true,
    firstguardian: '监护人一号',
    phoneOfFirstGuardian: '1231231',
    character: 'oldman',
},{
    id: '002',
    name: '老人二号',
    age: 233,
    telephone: '12342',
    gender: 'female',
    firstguardian: '监护人二号',
    phoneOfFirstGuardian: '123331',
    character: 'oldman',
},{
    id: '003',
    name: '老人三号',
    age: 99,
    telephone: '12343',
    gender: 'male',
    firstguardian: '监护人三号',
    phoneOfFirstGuardian: '12323',
    character: 'oldman',
}]

const OldManTables = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="管理信息" second="老人管理信息" />
        <Row>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="老人信息">
                        {/* <InfoTable data={data} /> */}
                        <OldManTable data={data} />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default OldManTables;