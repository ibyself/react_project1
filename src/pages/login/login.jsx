import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './css/login.less'
export default class Login extends Component {
    
    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="" />
                    <h1>后台管理系统</h1>
                </header>
                <div className='login-content'>
                    <h3>用户登录</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                       

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
        
                        </Form.Item>
                    </Form>


                </div>
            </div>
        )
    }
}
