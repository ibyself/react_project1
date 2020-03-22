import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
export const reqLogin=(username,password)=>ajax.post('/login',{username,password})
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/weather/v1/?district_id=341300&output=json&ak=nVE2D4P7aWFuG55NBm1wvQ6WYdX1NBzt`
        jsonp(url,{},(error,data)=>{
            if(!error&&data.error===0){
                const{dayPictureUrl, weather} =data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error('获取天气信息失败')
            }
        })
    })
}