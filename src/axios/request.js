// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import { Message } from 'element-ui';
import router from '../router/index'

const instance = axios.create({
    baseURL: 'http://124.221.67.34:3009',
    timeout: 100 * 1000, // 请求时间超过100s就报超时错误（来自axios）
    headers: { 'Content-Type': 'application/json' },
})

function errorHandle ({ data, status }) {
    // 与后台约定403为登录过期
    if (data.status === 401)
    {
        Message.error(data.message)
        return
    }
    if (data.message == '身份认证失败！')
    {
        Message.error('登录过期，请重新登录')
        router.push('/login')
        return
    }
    Message.error(`${data.message}`)
}

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

instance.interceptors.response.use(
    res => {
        // console.log('请求拦截器成功：', res);
        const { data } = res
        if (res.status === 200 && data.status !== 0) errorHandle(res)
        console.log('请求到的数据：', data);
        return data;
    }, err => { //这里的error.response 和 res 格式一样，只是 status 不是200
        // console.log('请求拦截器失败：', err, err.response);
        err.response && errorHandle(err.response)
        return Promise.reject(err)
    })

export default instance;
