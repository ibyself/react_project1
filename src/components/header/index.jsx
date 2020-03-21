import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/link-button'
import menuList from '../../config/menuConfig'
import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import './index.less'
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
    }
    /**
     * 退出登录
     */
    logout = () => {
        Modal.confirm({
            title: '确认退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=>{
                console.log('OK')
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel:() =>{
                console.log('Cancel')
            },
        })
    }
    /**
     * 获取title
     */
    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem) {
                    title = cItem.title
                }
            }
        })    
        return title 
    }
    /**
  * 获取天气信息
  */
    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('江西')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000)
        this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    render() {
        const { currentTime, dayPictureUrl, weather } = this.state
        const user = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className="header-top">
                    欢迎，{user.username}&nbsp;&nbsp;
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)