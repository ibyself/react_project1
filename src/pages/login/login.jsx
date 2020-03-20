import React, { Component } from 'react'
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './css/login.less'
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
export default class Login extends Component {
    login=async (values)=>{
        const {username,password}=values
        let result=await reqLogin(username,password)
        if(result.status===0){
            const user=result.data
            storageUtils.saveUser(user)
            memoryUtils.user=user
            this.props.history.replace('/')
            message.success('登录成功')
        }else{
            message.error(result.msg)
        }
    }
    
    validator=async(rule, value)=>{
        // console.log(value,rule)
        const length=value && value.length
        const pwdReg=/^[a-zA-Z0-9_]+$/
        if(!value){
            throw new Error('必须输入密码')
        }else if(length<4){
            throw new Error('密码必须大于4位')
        }else if(length>12){
            throw new Error('密码必须小于12位')
        }else if(!pwdReg.test(value)){
            throw new Error('密码必须是英文、数字或下划线组成')
        }
    }
    render() {
        const user=memoryUtils.user
        if(user._id){
            return <Redirect to='/'/>
        }
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
                        onFinish={this.login}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '必须输入用户名',
                                    whitespace:true
                                },
                                {
                                    min:4,
                                    message:'用户名必须大于4位'
                                },
                                {
                                    max:12,
                                    message:'用户名必须小于12位'
                                },
                                {
                                    pattern:/^[a-zA-Z0-9_]+$/,
                                    message:'用户名必须是英文、数字或下划线组成'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                //自定义表单效验规则
                                {validator:this.validator}
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                       

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
        
                        </Form.Item>
                    </Form>


                </div>
            </div>
        )
    }
}
