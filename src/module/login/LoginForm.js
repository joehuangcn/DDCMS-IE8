import './LoginForm.css';
import {config} from '../../config';
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Row, Col} from 'antd';
import fetch from 'isomorphic-fetch';
import {ajaxUtil} from '../../util/AjaxUtils';
const FormItem = Form.Item;
//todo 分离成登陆页面和登陆form
function noop() {
  return false;
}
class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {      
            fetch(config.baseUrl + 'person!ajaxLogin.action', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "person.userAccount=" + values.userName +
                    "&person.passWord=" + values.password
                }).then((response) => response.json())
                    .then((responseJson) => {
                   
                        console.log("11111");
                        console.log(responseJson);
                        if (responseJson.head.stateCode === 200) {
                            global.isAuthenticated = true;
                            // setTimeout(this.props.history.push("/home"), 100);
                             setTimeout(this.props.history.replace("/main"), 100);
                        } else {
                            console.log(responseJson.head)
                            // setTimeout(this.props.router.push("/login"), 100);
                             setTimeout(this.props.history.replace("/login"), 100);
                        }
                        return null;
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            }
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
          wrapperCol: { span: 24 },
        };
       const usernameProps=getFieldProps('userName', {
                                    rules: [{required: true, message: '请输入用户名!'}],
                                });
       const passwordProps=getFieldProps('password', {
                                    rules: [{required: true, message: '请输入密码!'}],
                                })
        return (
            <div>
                <Row>
                    <Col span={8} offset={8}>
                        <h1 className="login-form-title">辽宁数据一致性管理系统</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem >
                                {(
                                    <Input  {...usernameProps} addonBefore={<span><Icon type="user"></Icon>用户名</span>} style={{width:'100%'}}/>
                                )}
                            </FormItem>
                            <FormItem >
                                {(
                                    <Input {...passwordProps} addonBefore={<span><Icon type="lock"/>密码</span>} type="password"  style={{width:'100%'}}/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm;
