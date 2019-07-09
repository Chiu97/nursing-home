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
        inputPwd: '',
        inputOrigin: '',
        rightPwd: false,
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

    handlePwdOrigin = (e) =>{
        let newInput = e.target.value;
        this.setState({'inputOrigin':newInput});
    }

    handlePwdChange = (e) =>{
        let newInput = e.target.value;
        this.setState({inputPwd:newInput});
        // console.log('输入框:'+newInput);
    }

    submitPwdChange = () => {
        const currentPwd = localStorage.getItem('currentPassword');
        if(this.state.inputOrigin!==currentPwd){
            alert("输入原来的密码错误");
            return;
        }
        const data = {
            id:localStorage.getItem("currentUser"),
            password:this.state.inputPwd,
        }
        fetch('url',{
            method:'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }).then( response => response.json())
        .then( data => console.log(data))
        .then( window.alert("成功修改密码") );
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom />
                <div>
                    {/* <Row> */}
                        {/* <Col span={10} /> */}
                        {/* <Col span={12}>
                        {console.log('link:'+avatarList['0'])}
                            <Avatar src={avatarList[this.state.aLink]} alt="......" size={64}>
                            {console.log(localStorage.getItem("Avatar"))}
                                Chiu
                            </Avatar>
                            <Button size="default" style={{marginLeft:'20px'}} onClick={this.changeAvatar}>
                                Change
                            </Button>
                            <Button size="default" type="primary" onClick={this.saveAvatar}>
                                Save
                            </Button>
                        </Col>   */}
                    {/* </Row> */}
                    <Row>
                        <Col span={10} />
                        <Col span={12}>
                            <Input.Password placeholder="please input your origin password" />
                            <Input.Password placeholder="please input your new password" onChange={this.handlePwdChange.bind(this)}/>
                            <Button onClick={this.submitPwdChange}>确认更改</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Modify;