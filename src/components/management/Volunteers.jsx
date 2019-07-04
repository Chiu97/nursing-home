import React from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
// import Volunteer from './Volunteer';
import InfoTable from './InfoTable';

const data = [{
    id: '001',
    name: '义工一号',
    age: 27,
    telephone: '12344',
    gender: 'male'
},{
    id: '002',
    name: '义工二号',
    age: 23,
    telephone: '12342',
    gender: 'female'
},{
    id: '003',
    name: '义工三号',
    age: 19,
    telephone: '12343',
    gender: 'male'
}]

class Volunteers extends React.Component {
    
    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="管理信息" second="义工管理信息" />
                <Row>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="义工人员" bordered={false}>
                                {/* <Volunteer /> */}
                                <InfoTable data={data} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Volunteers;