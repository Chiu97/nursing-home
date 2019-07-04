import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon,  Select, Row, Col, Checkbox, Button } from 'antd';
import Url from '../../routes/Url';
import { Redirect } from 'react-router-dom'
const FormItem = Form.Item;
const Option = Select.Option;


class Registers extends Component {
    state = {
        validRegister: false,
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const registerUrl = Url + '/register';
                console.log('Received values of form: ', values);
                fetch(registerUrl,{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(values)
                    }
                ).then(resp => resp.json())
                .then(data => data["valid"])
                .then(validMsg => {
                    if(validMsg==="done"){
                        this.setState({validRegister: true});
                    }else{
                        window.alert("此ID已被占用");
                    }
                })
                ;
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        if(this.state.validRegister){
            return (<Redirect to="/app/dashboard/index" />)
        }else{
        return (
        <div className="gutter-example" >
            {/* <BreadcrumbCustom  /> */}
            <Row gutter={16}>
                <Col className="gutter-row" md={8} />
                <Col className="gutter-row" md={8}>
                    <div className="gutter-box">
                        <Card title="注册表单" bordered={false}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label={(
                                        <span>
                                            ID&nbsp;
                                            <Tooltip title="请输入您想要的ID">
                                            <Icon type="question-circle-o" />
                                          </Tooltip>
                                        </span>
                                    )}
                                    hasFeedback
                                >
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入ID!', whitespace: true }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                {/* <Row style={{marginBottom:"24px", marginTop:"2px"}}>
                                    <Col md={12} />
                                    <Col md={12} >
                                        <span style={{ color:'red'}}> 您的ID已被占用 </span>
                                    </Col>
                                </Row> */}
                                <FormItem
                                    {...formItemLayout}
                                    label="密码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: '请输入密码!',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="确认密码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: '请确认你的密码!',
                                        }, {
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <Input type="password" onBlur={this.handleConfirmBlur} />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label={(
                                        <span>
                                            真实姓名&nbsp;
                                            <Tooltip title="请输入身份证上的真实姓名">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    )}
                                    hasFeedback
                                >
                                    {
                                        getFieldDecorator('real_name', {
                                            rules: [ {required: true, message: '请输入真实姓名'}],
                                        })
                                        ( <Input /> )
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="性别"
                                >
                                    {getFieldDecorator('gender', {
                                        rules: [{ required: true}],
                                    })
                                        (<Select>
                                            <Option value="male">男性</Option>
                                            <Option value="female">女性</Option>
                                        </Select>)
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="电话号码"
                                >
                                    {getFieldDecorator('telephone', {
                                        rules: [{ required: true, message: '请输入你的电话号码!' }],
                                    })
                                    (
                                        <Input />
                                    )
                                    }
                                </FormItem>
                                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                    {getFieldDecorator('agreement', {
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox>我已经阅读过 <span>协议</span></Checkbox>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
        )
                                    }
    }
}

const Register = Form.create()(Registers);

export default Register;