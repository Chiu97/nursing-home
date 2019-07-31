import React from 'react';
import { Avatar, Button, Row, Col, Form, Input, Card } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {modify} from '../../routes/Url'

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
        inputPwdAgain: '',
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
        this.setState({inputOrigin:newInput});
    }

    handlePwdChange = (e) =>{
        let newInput = e.target.value;
        this.setState({inputPwd:newInput});
        // console.log('输入框:'+newInput);
    }

    handlePwdChangeAgain = (e) =>{
        let newInput = e.target.value;
        this.setState({inputPwdAgain:newInput});
        // console.log('输入框:'+newInput);
    }

    submitPwdChange = () => {
        const currentPwd = localStorage.getItem('currentPassword');
        // console.log('currentPwd:' + currentPwd);
        // console.log('inputOrigin' + this.state.inputOrigin)
        // console.log('newPwd'+this.state.inputPwd)
        // console.log('newPwdAgain'+this.state.inputPwdAgain)
        if(this.state.inputOrigin!==currentPwd){
            alert("输入原来的密码错误");
            return;
        }
        if(this.state.inputPwd!==this.state.inputPwdAgain){
            alert("两次输入密码不一致")
            return;
        }
        if(this.state.inputPwd===this.state.inputOrigin){
            alert("请修改不一样的密码")
            return;
        }
        const data = {
            name:localStorage.getItem("currentUser"),
            password:this.state.inputPwd,
        }
        localStorage.setItem('tempPassword',this.state.inputPwd);
        console.log("modify pwd:"+JSON.stringify(data))
        fetch(modify,{
            method:'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }).then( response => response.json())
        .then( data => {
            if(data['valid']==='done'){
                window.alert("成功修改密码");
                const newPwd = localStorage.getItem('tempPassword')
                localStorage.setItem('currentPassword',newPwd)
                localStorage.removeItem('tempPassword')
            }
        })
        .then( window.alert("已向系统提交修改密码") )
            .catch( err => window.alert("修改密码失败"));
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
                        <Col span={8} />
                        <Col span={12}>
                            <Card>
                                <Input.Password placeholder="please input your origin password" onChange={this.handlePwdOrigin.bind(this)}/>
                                <p />
                                <Input.Password placeholder="please input your new password" onChange={this.handlePwdChange.bind(this)}/>
                                <p />
                                <Input.Password placeholder="please input your new password again" onChange={this.handlePwdChangeAgain.bind(this)}/>
                                <p />
                            <Button onClick={this.submitPwdChange} style={{marginLeft:"45%"}}>确认更改</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Modify;