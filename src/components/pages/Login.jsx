
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita';
import { Link } from 'react-router-dom';
import Url from '../../routes/Url';

const FormItem = Form.Item;

class Login extends React.Component {
    state = {
        wrongPassword: false,
    }
    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/app/dashboard/index');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const { setAlitaState } = this.props;
                const sendToServer = {
                    "id": values.userName,
                    "password": values.password
                }
                const loginUrl = Url + '/login';
                console.log('loginUrl:'+loginUrl);
                fetch(loginUrl,{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(sendToServer)
                }
                    ).then(resp => resp.json())
                    .then(data => data["niubi"])
                    .then(niubi => {
                        if(niubi==='done'){
                            this.setState({wrongPassword:false})
                            console.log('niubi done');
                            setAlitaState({ funcName: 'admin', stateName: 'auth'});
                        }else if(niubi==='error'){
                            this.setState({wrongPassword:true});
                            console.log('error');
                        }
                    })
                    ;
                // console.log(res);
                // if(res==='done'){
                //     console.log('??????');
                //     setAlitaState({ funcName: 'admin', stateName: 'auth'});
                // }
                if (values.userName === 'admin' && values.password === 'admin') setAlitaState({ funcName: 'admin', stateName: 'auth' });
                if (values.userName === 'guest' && values.password === 'guest') setAlitaState({ funcName: 'guest', stateName: 'auth' });
            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        let promtMsg = "";
        console.log('wrongPassword:'+this.state.wrongPassword);
        if(this.state.wrongPassword)
            promtMsg = "账户名或密码错误";
        else
            promtMsg = "";
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>Care  Sign In</span>
                        <PwaInstaller />
                    </div>
                    <span style={{ color : 'red' }}>{promtMsg}</span>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span >或<Link to="/register"> 现在就去注册! </Link></span>
                                <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth'])(Form.create()(Login));