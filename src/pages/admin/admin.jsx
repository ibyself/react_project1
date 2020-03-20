import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
const { Header, Footer, Sider, Content } = Layout
export default class Admin extends Component {
    
    render() {
        const user = memoryUtils.user
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header style={{ height: '80px' }}>Header</Header>
                    <Content style={{ backgroundColor: 'white' }}>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
