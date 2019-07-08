import React from 'react';
import { Row, Col, Card, Timeline, Icon, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import CareEchart from './CareEchart'

const VideoZone = ({videoConnect}) => {
    if(videoConnect){
        return <div> 视频正在播放 </div>
    }else{
        return <div> 视频已关闭 </div>
    }
}

class MyDashboard extends React.Component{
    state = {
        videoConnect: false
    }


    videoControll = () => {
        let connectState = this.state.videoConnect;
        connectState = !connectState;
        this.setState({ videoConnect:connectState });
    }


    render(){
        return(
            <div>
                <BreadcrumbCustom />
                <Row gutter={12}>
                    <div>
                        <Card>
                            <Col span={6} />
                            <Col span={12}>
                                <div>
                                    <Card>
                                        <VideoZone videoConnect={this.state.videoConnect}/>
                                    </Card>
                                </div>
                            </Col>
                            <Col span={6} >
                                <div>
                                    <Button type="primary" onClick={this.videoControll}>开/关</Button>
                                </div>
                            </Col>
                        </Card>
                    </div>
                </Row>
                <Row gutter={10}>
                    <div>
                        <Card>
                            <CareEchart />
                        </Card>
                    </div>
                </Row>
            </div>
        );
    }
}

export default MyDashboard;