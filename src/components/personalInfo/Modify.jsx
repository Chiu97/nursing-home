import React from 'react';
import { Avatar, Button, Row, Col, Form, Input } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';

const avatarList = [
    'https://github.com/Chiu97/CARE/blob/master/src/style/imgs/a1.jpg?raw=true',
    'https://github.com/Chiu97/CARE/blob/master/src/style/imgs/a2.jpeg?raw=true',
    'https://github.com/Chiu97/CARE/blob/master/src/style/imgs/a3.png?raw=true',
    'https://github.com/Chiu97/CARE/blob/master/src/style/imgs/a4.jpeg?raw=true'
]
class Modify extends React.Component{
    state = {
        aLink: '0',
    }

    changeAvatar = () => {
        let num = parseInt(this.state.aLink);
        num = (num + 1) % 4;
        const newAlink = String(num);
        this.setState({aLink: newAlink});
    }

    saveAvatar = () => {
        const saveLink = this.state.aLink;
        localStorage.setItem("myAvatar", saveLink);
        window.location.reload();
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom />
                <div>
                    <Row>
                        <Col span={10} />
                        <Col span={12}>
                        {console.log('link:'+avatarList['0'])}
                            <Avatar src={avatarList[this.state.aLink]} alt="å¤´åƒ�å¼‚å¸¸" size={64}>
                            {console.log(localStorage.getItem("Avatar"))}
                                Chiu
                            </Avatar>
                            <Button size="default" style={{marginLeft:'20px'}} onClick={this.changeAvatar}>
                                Change
                            </Button>
                            <Button size="default" type="primary" onClick={this.saveAvatar}>
                                Save
                            </Button>
                        </Col>  
                    </Row>
                </div>
            </div>
        )
    }
}

export default Modify;