import axios from 'axios';

export function request(config){
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000/api/v1',
        timeout:5000
    })
    //2.axios的拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        console.log(err)
    })

    //3.发送真正的网络请求
    return instance(config)
}