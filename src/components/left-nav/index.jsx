import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons'
import './index.less'
import logo from '../../assets/images/logo.png'
const { SubMenu } = Menu
class LeftNav extends Component {

    render() {
        let selectKey=this.props.location.pathname
        return (
            <div className='left-nav'>
                <Link className='left-nav-link' to='/home'>
                    <img src={logo} alt="" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    selectedKeys={[selectKey]}
                    mode="inline"
                    theme="dark">
                    <Menu.Item key="/home">
                        <HomeOutlined />
                        <span>首页</span>
                    </Menu.Item>
                    
                    <SubMenu
                        key="/products"
                        title={
                            <span>
                                <AppstoreOutlined />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <BarsOutlined/>
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <ToolOutlined/>
                            <span>商品管理</span>
                        </Menu.Item>
                       
                    </SubMenu>
                    <Menu.Item key="/user">
                        <UserOutlined />
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="/rote">
                        <SafetyOutlined />
                        <span>角色管理</span>
                    </Menu.Item>
                    <SubMenu
                        key="/charts"
                        title={
                            <span>
                                <AreaChartOutlined />
                                <span>图形图表</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/charts/bar">
                            <BarChartOutlined/>
                            <span>柱形图</span>
                        </Menu.Item>
                        <Menu.Item key="/charts/linect">
                            <LineChartOutlined/>
                            <span>折线图</span>
                        </Menu.Item>
                        <Menu.Item key="/charts/pie">
                            <PieChartOutlined/> 
                            <span>饼图</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)