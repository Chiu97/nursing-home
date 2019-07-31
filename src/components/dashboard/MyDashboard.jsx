import React from 'react';
import { Row, Col, Card, Timeline, Icon, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import CustomChart from './CareEchart'
import {releaseVideo} from '../../routes/Url';
import {videoFeed} from '../../routes/Url';
import {PieReact} from "./oldmanChart";
import getChartData from "../helper/getChartData";
import UpdateOption from "../helper/updateOption";
const VideoZone = ({videoConnect}) => {
    if(videoConnect){
        return <div> <img src={videoFeed}/> </div>
    }else{
        return <div>视频已关闭</div>
    }
}

class MyDashboard extends React.Component{
    state = {
        videoConnect: true,
        smileData: String(localStorage.getItem('smileData')).split(','),
        fallData: String(localStorage.getItem('fallData')).split(','),
        invadeData: String(localStorage.getItem('invadeData')).split(','),
        forbiddenData: String(localStorage.getItem('forbiddenData')).split(',')
    }


    videoControll = () => {
        let connectState = this.state.videoConnect;
        if(this.state.videoConnect){
            fetch(releaseVideo)
            .then( resp => resp)
            .catch( err => console.log(err));
        }
        connectState = !connectState;
        this.setState({ videoConnect:connectState });
    }

    // componentDidUpdate() {
    //     setTimeout(this.triggerChange,10000)
    // }

    triggerChange = () => {
        // console.log('play:'+this.state.play);
        getChartData();
        const newSmileData= String(localStorage.getItem('smileData')).split(',');
        const newFallData= String(localStorage.getItem('fallData')).split(',');
        const newInvadeData= String(localStorage.getItem('invadeData')).split(',');
        const newForbiddenData= String(localStorage.getItem('forbiddenData')).split(',');
        this.setState({smileData:newSmileData,fallData:newFallData,invadeData:newInvadeData,forbiddenData:newForbiddenData});
        // this.setState({date:new Date()})
    }


    render(){
        // return (
        //                         <div>
        //                             <PieReact
        //                                 smileData = {String(localStorage.getItem('smileData')).split(',')}
        //                                 fallData = {String(localStorage.getItem('fallData')).split(',')}
        //                                 invadeData = {String(localStorage.getItem('invadeData')).split(',')}
        //                                 forbiddenData = {String(localStorage.getItem('forbiddenData')).split(',')}
        //                             />
        //                         </div>
        // );
        return(
            <div>

                <BreadcrumbCustom />
                <Row gutter={12}>
                    <div>
                        <Card>
                            <Col span={5} />
                            <Col span={13}>
                                <div>
                                    <Card>
                                        <VideoZone videoConnect={this.state.videoConnect}/>
                                    </Card>
                                </div>
                            </Col>
                            <Col span={5} >
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
                            {/*<CustomChart />*/}
                            <div>
                                <PieReact
                                    smileData = {this.state.smileData}
                                    fallData = {this.state.fallData}
                                    invadeData = {this.state.invadeData}
                                    forbiddenData = {this.state.forbiddenData}
                                />
                            </div>
                        </Card>
                    </div>
                </Row>
            </div>
        );
    }
}

export default MyDashboard;